import { ArrowLeft, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/shared/components/PageHeader'
import { formatStaffDate, staffDirectoryMock } from '../data/staffDirectory'

function ProfileField({ label, value }) {
  return (
    <div className="border-b border-slate-100 py-3 last:border-b-0">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-900">{value || '—'}</dd>
    </div>
  )
}

export default function StaffPersonalDetailPage() {
  const { staffId } = useParams()
  const staff = staffDirectoryMock.find((record) => record.id === staffId)

  if (!staff) return <Navigate to="/hr-officer" replace />

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader
        items={[
          { label: 'Trang chủ', to: '/', icon: 'home' },
          { label: 'Danh sách cán bộ', to: '/hr-officer', icon: 'profile' },
          { label: staff.fullName, icon: 'profile', current: true },
        ]}
      />
      <main className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/hr-officer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Quay lại danh sách cán bộ
          </Link>

          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="flex flex-col gap-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-5 py-6 sm:flex-row sm:items-center sm:px-7">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-brand">
                <UserRound className="h-8 w-8" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-brand">{staff.id}</p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {staff.fullName}
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  {staff.currentPosition} · {staff.unit}
                </p>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/15">
                Hồ sơ {staff.profileStatus.toLocaleLowerCase('vi')}
              </span>
            </header>

            <div className="grid gap-8 px-5 py-6 sm:grid-cols-2 sm:px-7">
              <section aria-labelledby="personal-info-title">
                <h2 id="personal-info-title" className="mb-2 font-semibold text-slate-900">
                  Thông tin cá nhân
                </h2>
                <dl>
                  <ProfileField label="Mã cán bộ" value={staff.id} />
                  <ProfileField label="Họ và tên" value={staff.fullName} />
                  <ProfileField label="Ngày sinh" value={formatStaffDate(staff.dateOfBirth)} />
                  <ProfileField label="Giới tính" value={staff.gender} />
                  <ProfileField label="Quê quán" value={staff.hometown} />
                  <ProfileField label="Trình độ chuyên môn" value={staff.qualification} />
                </dl>
              </section>

              <section aria-labelledby="work-info-title">
                <h2 id="work-info-title" className="mb-2 font-semibold text-slate-900">
                  Thông tin công tác
                </h2>
                <dl>
                  <ProfileField label="Chức vụ hiện tại" value={staff.currentPosition} />
                  <ProfileField label="Đơn vị công tác" value={staff.unit} />
                  <ProfileField label="Trạng thái hồ sơ" value={staff.profileStatus} />
                </dl>
                <h2 className="mb-2 mt-6 font-semibold text-slate-900">Thông tin liên hệ</h2>
                <div className="space-y-3 pt-2">
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                    {staff.email}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                    {staff.phone}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-700">
                    <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                    {staff.hometown}
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
