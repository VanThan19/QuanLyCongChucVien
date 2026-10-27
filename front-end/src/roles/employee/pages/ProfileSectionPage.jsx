import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/shared/components/PageHeader'
import { findProfileSection } from '../data/profileSections'

export default function ProfileSectionPage() {
  const { sectionId } = useParams()
  const section = findProfileSection(sectionId)

  if (!section) {
    return <Navigate to="/employee/ho-so-ca-nhan" replace />
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader
        items={[
          { label: 'Trang chủ', to: '/', icon: 'home' },
          { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
          { label: section.title, icon: 'profile', current: true },
        ]}
      />
      <main className="px-4 py-8 sm:px-6">
        <section className="mx-auto max-w-2xl rounded-md border border-[#e6e8ee] bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <h1 className="text-xl font-semibold text-slate-900">{section.title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Trang chi tiết sẽ được xây dựng ở bước tiếp theo.
          </p>
          <Link
            to="/employee/ho-so-ca-nhan"
            className="mt-6 inline-flex items-center text-sm font-medium text-brand hover:underline"
          >
            Quay lại hồ sơ cá nhân
          </Link>
        </section>
      </main>
    </div>
  )
}
