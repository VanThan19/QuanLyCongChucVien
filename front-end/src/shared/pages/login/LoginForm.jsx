import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/shared/auth/useAuth'
import CaptchaField from '@/shared/pages/login/CaptchaField'
import { createCaptchaCode } from '@/shared/pages/login/captcha'

const fieldClass = (invalid) =>
  `h-10 w-full rounded-md border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-slate-300 focus:border-[#7eb6f6] focus:ring-[#bfdbfe]'
  }`

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1 text-xs text-red-600" role="alert">
      {message}
    </p>
  )
}

export default function LoginForm({ destination }) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [captchaCode, setCaptchaCode] = useState(createCaptchaCode)
  const [captchaInput, setCaptchaInput] = useState('')
  const [errors, setErrors] = useState({})
  const [forgotNotice, setForgotNotice] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  function issueCaptcha() {
    setCaptchaCode(createCaptchaCode())
    setCaptchaInput('')
  }

  function refreshCaptcha() {
    issueCaptcha()
    setErrors((current) => ({ ...current, captcha: undefined }))
  }

  function validate() {
    const next = {}
    if (!username.trim()) next.username = 'Vui lòng nhập tài khoản.'
    if (!password) next.password = 'Vui lòng nhập mật khẩu.'
    else if (password.length < 6) next.password = 'Mật khẩu cần ít nhất 6 ký tự.'
    if (!captchaInput.trim()) next.captcha = 'Vui lòng nhập mã xác thực.'
    else if (captchaInput.trim() !== captchaCode) next.captcha = 'Mã xác thực không đúng.'
    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setForgotNotice(false)
    setFormError('')
    const nextErrors = validate()
    setErrors(nextErrors)
    if (nextErrors.captcha === 'Mã xác thực không đúng.') issueCaptcha()
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await login({ username })
      navigate(destination, { replace: true })
    } catch {
      setFormError('Không thể đăng nhập. Vui lòng thử lại.')
      refreshCaptcha()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-4">
      {formError ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {formError}
        </p>
      ) : null}

      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm text-slate-800">
          Tài khoản
        </label>
        <input
          id="username"
          name="username"
          value={username}
          disabled={submitting}
          autoFocus
          autoComplete="username"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={Boolean(errors.username)}
          aria-describedby={errors.username ? 'username-error' : undefined}
          onChange={(event) => {
            setUsername(event.target.value)
            setErrors((current) => ({ ...current, username: undefined }))
          }}
          className={fieldClass(Boolean(errors.username))}
        />
        <FieldError id="username-error" message={errors.username} />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm text-slate-800">
          Mật khẩu
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            disabled={submitting}
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            onChange={(event) => {
              setPassword(event.target.value)
              setErrors((current) => ({ ...current, password: undefined }))
            }}
            className={`${fieldClass(Boolean(errors.password))} pr-10 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden`}
          />
          <button
            type="button"
            disabled={submitting}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((current) => !current)}
            className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded text-slate-400 transition-colors hover:text-slate-600 disabled:opacity-60"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
        <FieldError id="password-error" message={errors.password} />
      </div>

      <CaptchaField
        id="captcha"
        code={captchaCode}
        value={captchaInput}
        disabled={submitting}
        error={errors.captcha}
        onChange={(next) => {
          setCaptchaInput(next)
          setErrors((current) => ({ ...current, captcha: undefined }))
        }}
        onRefresh={refreshCaptcha}
      />

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-11 w-full rounded-md bg-[#163a6b] text-[15px] font-semibold text-white transition-colors hover:bg-[#122e56] focus-visible:ring-2 focus-visible:ring-[#163a6b] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>

      <div className="text-right">
        <button
          type="button"
          onClick={() => setForgotNotice(true)}
          className="text-sm text-[#0f9488] hover:underline focus-visible:ring-2 focus-visible:ring-[#0f9488] focus-visible:outline-none"
        >
          Quên mật khẩu?
        </button>
      </div>

      {forgotNotice ? (
        <p className="rounded-md bg-teal-50 px-3 py-2 text-sm leading-6 text-teal-900" role="status">
          Vui lòng liên hệ quản trị hệ thống hoặc cán bộ nhân sự đơn vị để được cấp lại mật khẩu.
        </p>
      ) : null}

      <p className="text-xs leading-5 text-slate-500 md:hidden">
        Đăng nhập thử: tài khoản bất kỳ, mật khẩu từ 6 ký tự và đúng mã xác thực.
      </p>
    </form>
  )
}
