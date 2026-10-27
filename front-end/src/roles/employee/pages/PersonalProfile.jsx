import PageHeader from '@/shared/components/PageHeader'
import ProfileCard from '../components/ProfileCard'
import { profileSections } from '../data/profileSections'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile', current: true },
]

export default function PersonalProfile() {
  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-5 sm:px-5 lg:px-6">
        <h1 className="sr-only">Hồ sơ cá nhân</h1>
        <section
          aria-label="Các mục hồ sơ"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {profileSections.map((section) => (
            <ProfileCard
              key={section.id}
              title={section.title}
              to={section.path}
              icon={section.icon}
            />
          ))}
        </section>
      </main>
    </div>
  )
}
