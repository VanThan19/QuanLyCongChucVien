import { FileText, Home, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/shared/auth/useAuth'

const crumbIcons = {
  home: Home,
  profile: FileText,
}

export default function PageHeader({ items }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/dang-nhap', { replace: true })
  }

  return (
    <header className="border-t-[3px] border-brand bg-[#f3f4f6] shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <nav aria-label="Breadcrumb" className="flex h-[52px] items-center justify-between gap-3 px-3 sm:px-4">
        <ol className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {items.map((item) => {
            const Icon = crumbIcons[item.icon] ?? FileText
            const content = (
              <>
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>{item.label}</span>
              </>
            )

            return (
              <li key={item.label} className="flex items-center">
                {item.current ? (
                  <span
                    aria-current="page"
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-800"
                  >
                    {content}
                  </span>
                ) : (
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm transition-colors hover:text-brand"
                  >
                    {content}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
        {user ? (
          <div className="flex shrink-0 items-center gap-2">
            {user.username ? (
              <span className="hidden max-w-40 truncate text-sm text-slate-600 md:inline">{user.username}</span>
            ) : null}
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Đăng xuất"
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-slate-600 transition-colors hover:bg-white hover:text-brand"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
