import { useState } from 'react'
import { Pencil, Save, X } from 'lucide-react'
import PageHeader from '@/shared/components/PageHeader'
import PortraitPhoto from '../components/PortraitPhoto'
import ProfileFormField from '../components/ProfileFormField'
import ProfileFormSection from '../components/ProfileFormSection'
import { personalProfileMock, personalProfileSections } from '../data/personalProfileForm'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Thông tin cá nhân', icon: 'profile', current: true },
]

function validate(draft) {
  const errors = {}
  if (!draft.fullName.trim()) {
    errors.fullName = 'Nhập họ và tên khai sinh.'
  }
  return errors
}

export default function PersonalInfoPage() {
  const [profile, setProfile] = useState(personalProfileMock)
  const [draft, setDraft] = useState(personalProfileMock)
  const [editing, setEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')

  const values = editing ? draft : profile

  function startEditing() {
    setDraft({ ...profile })
    setErrors({})
    setNotice('')
    setEditing(true)
  }

  function cancelEditing() {
    setDraft({ ...profile })
    setErrors({})
    setEditing(false)
  }

  function updateField(name, value) {
    setDraft((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function saveProfile(event) {
    event.preventDefault()
    const cleaned = Object.fromEntries(
      Object.entries(draft).map(([key, value]) => [key, key === 'portrait' ? value : value.trim()]),
    )
    const nextErrors = validate(cleaned)
    if (Object.keys(nextErrors).length > 0) {
      setDraft(cleaned)
      setErrors(nextErrors)
      const firstName = Object.keys(nextErrors)[0]
      document.getElementById(`profile-${firstName}`)?.focus()
      return
    }

    setProfile(cleaned)
    setDraft(cleaned)
    setEditing(false)
    setErrors({})
    setNotice('Đã lưu thông tin hồ sơ cá nhân.')
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-5 sm:px-6">
        <form className="mx-auto max-w-6xl" onSubmit={saveProfile}>
          <div className="sticky top-0 z-10 -mx-4 mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-[#f7f8fb]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Hồ sơ cá nhân</h1>
              <p className="mt-1 text-sm text-slate-500">
                {profile.fullName} · Mẫu lý lịch 2C-BNV/2008
              </p>
            </div>
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#1e3a8a]"
                  >
                    <Save className="h-4 w-4" aria-hidden="true" />
                    Lưu
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={startEditing}
                  className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#1e3a8a]"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>

          {notice ? (
            <p
              role="status"
              className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              {notice}
            </p>
          ) : null}

          <div className="space-y-4">
            {personalProfileSections.map((section, index) => (
              <ProfileFormSection
                key={section.id}
                index={index}
                title={section.title}
                aside={
                  section.id === 'personal' ? (
                    <PortraitPhoto
                      value={values.portrait ?? ''}
                      editing={editing}
                      error={errors.portrait}
                      onChange={(next) => updateField('portrait', next)}
                      onError={(message) => setErrors((current) => ({ ...current, portrait: message }))}
                    />
                  ) : null
                }
              >
                {section.fields.map((field) => (
                  <ProfileFormField
                    key={field.name}
                    field={field}
                    value={values[field.name] ?? ''}
                    editing={editing}
                    error={errors[field.name]}
                    onChange={updateField}
                  />
                ))}
              </ProfileFormSection>
            ))}
          </div>
        </form>
      </main>
    </div>
  )
}
