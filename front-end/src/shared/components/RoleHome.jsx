import { Link } from 'react-router-dom'
import PageHeader from '@/shared/components/PageHeader'

export default function RoleHome({ code, title, description }) {
  return (
    <div className="page-canvas min-h-screen">
      <PageHeader
        items={[
          { label: 'Trang chủ', to: '/', icon: 'home' },
          { label: title, icon: 'profile', current: true },
        ]}
      />
      <main className="px-4 py-8 sm:px-6">
        <section className="mx-auto max-w-2xl rounded-md border border-[#e6e8ee] bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <p className="text-sm font-medium tracking-wide text-brand">{code}</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center text-sm font-medium text-brand hover:underline"
          >
            Quay lại trang chủ
          </Link>
        </section>
      </main>
    </div>
  )
}
