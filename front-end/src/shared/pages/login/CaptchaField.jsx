import { RefreshCw } from 'lucide-react'
import { useEffect, useRef } from 'react'

const WIDTH = 112
const HEIGHT = 40

function paintCaptcha(canvas, code) {
  const ratio = window.devicePixelRatio || 1
  const context = canvas.getContext('2d')
  canvas.width = WIDTH * ratio
  canvas.height = HEIGHT * ratio
  context.setTransform(ratio, 0, 0, ratio, 0, 0)

  context.fillStyle = '#eceff3'
  context.fillRect(0, 0, WIDTH, HEIGHT)

  for (let index = 0; index < 3; index += 1) {
    context.strokeStyle = 'rgba(185, 28, 28, 0.16)'
    context.lineWidth = 1
    context.beginPath()
    context.moveTo(4, 8 + index * 11)
    context.bezierCurveTo(WIDTH * 0.3, 4 + index * 8, WIDTH * 0.7, 30 - index * 6, WIDTH - 4, 12 + index * 7)
    context.stroke()
  }

  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = '700 20px "Segoe UI", sans-serif'

  const gap = WIDTH / code.length
  ;[...code].forEach((character, index) => {
    context.save()
    const x = gap * (index + 0.5)
    const y = HEIGHT / 2 + (index % 2 === 0 ? -1 : 1)
    context.translate(x, y)
    context.rotate((index % 2 === 0 ? -1 : 1) * 0.1)
    context.fillStyle = index % 2 === 0 ? '#dc2626' : '#be123c'
    context.fillText(character, 0, 0)
    context.restore()
  })
}

export default function CaptchaField({ id, code, value, onChange, onRefresh, error, disabled }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) paintCaptcha(canvasRef.current, code)
  }, [code])

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-slate-800">
        Mã xác thực
      </label>
      <div className="@container">
        <div className="flex flex-col gap-2 @[300px]:flex-row @[300px]:items-center">
          <input
            id={id}
            name="captcha"
            value={value}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Nhập mã xác thực"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(event) => onChange(event.target.value.replace(/\s/g, ''))}
            className={`h-10 w-full min-w-0 rounded-md border px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 placeholder:italic focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 @[300px]:flex-1 ${
              error
                ? 'border-red-400 bg-white focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 bg-[#eceff3] focus:border-[#7eb6f6] focus:bg-white focus:ring-[#bfdbfe]'
            }`}
          />
          <div className="flex items-center gap-2">
            <canvas
              ref={canvasRef}
              width={WIDTH}
              height={HEIGHT}
              role="img"
              aria-label={`Mã xác thực gồm ${code.split('').join(' ')}`}
              className="h-10 w-[112px] shrink-0 rounded-sm"
            />
            <button
              type="button"
              onClick={onRefresh}
              disabled={disabled}
              aria-label="Đổi mã xác thực"
              className="grid h-10 w-9 shrink-0 place-items-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
