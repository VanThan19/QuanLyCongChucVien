import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '@/shared/pages/login/LoginForm'
import LoginSupport from '@/shared/pages/login/LoginSupport'
import SystemMark from '@/shared/pages/login/SystemMark'

function LoginBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-8 left-[7%] h-24 w-20 -rotate-12 rounded-lg bg-[#0d3b84]/35" />
      <div className="absolute top-[16%] left-[3%] h-16 w-14 rotate-6 rounded-md bg-[#3b78c9]/25" />
      <div className="absolute top-[30%] left-[10%] h-20 w-16 rotate-12 rounded-md bg-[#0c3474]/25" />
      <div className="absolute -bottom-10 left-[18%] h-36 w-28 rotate-6 rounded-2xl bg-[#0c3474]/30" />
      <div className="absolute top-1/2 right-[4%] h-[460px] w-[460px] -translate-y-1/2 rounded-full border-[72px] border-white/10" />
      <div className="absolute right-[16%] bottom-[12%] h-20 w-16 -rotate-12 rounded-lg bg-white/10" />
    </div>
  )
}

export default function LoginPage() {
  const location = useLocation()
  const requested = location.state?.from?.pathname
  const destination = requested && requested !== '/dang-nhap' ? requested : '/'

  useEffect(() => {
    const previous = document.title
    document.title = 'Đăng nhập | Hệ thống quản lý hồ sơ Công chức – Viên chức'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <div className="relative flex min-h-dvh flex-col bg-gradient-to-br from-[#1e5cb5] via-[#18509f] to-[#123f84]">
      <LoginBackdrop />
      <main className="relative flex flex-1 flex-col px-4 py-8">
        <section className="m-auto grid w-full max-w-[440px] overflow-hidden rounded-lg bg-white shadow-[0_22px_55px_rgba(8,24,64,0.28)] md:max-w-[880px] md:grid-cols-2">
          <div className="px-6 py-9 sm:px-10 sm:py-10">
            <SystemMark />
            <h1 className="mx-auto mt-3 max-w-[280px] text-center text-[13.5px] leading-5 font-semibold tracking-[0.04em] text-[#1e3a8a] uppercase">
              Hệ thống quản lý hồ sơ
              <span className="mt-0.5 block">Công chức – Viên chức</span>
            </h1>
            <LoginForm destination={destination} />
          </div>
          <LoginSupport />
        </section>
      </main>
      <footer className="relative pb-6 text-center text-sm text-white/90">
        © Hệ thống quản lý hồ sơ Công chức – Viên chức
      </footer>
    </div>
  )
}
