import { Link } from 'react-router-dom'
import { ROLES } from '@/config/roles'
import PageHeader from '@/shared/components/PageHeader'

export default function HomePage() {
  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={[{ label: 'Trang chủ', to: '/', icon: 'home', current: true }]} />
      <main className="px-4 py-8 sm:px-6">
        <section className="mx-auto max-w-5xl">
          <p className="text-sm font-medium tracking-wide text-brand uppercase">
            Quản lý Công chức – Viên chức
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Chọn quyền làm việc</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Mỗi quyền có thư mục giao diện và chức năng riêng. Chọn một quyền để vào khu vực
            tương ứng.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ROLES.map((role) => (
              <Link
                key={role.code}
                to={role.path}
                className="flex min-h-[168px] flex-col rounded-md border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_8px_20px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-[0_14px_28px_rgba(30,64,175,0.14)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                <span className="text-xs font-semibold tracking-wide text-brand">{role.code}</span>
                <span className="mt-3 text-lg font-semibold text-slate-900">{role.title}</span>
                <span className="mt-2 text-sm leading-6 text-slate-600">{role.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
