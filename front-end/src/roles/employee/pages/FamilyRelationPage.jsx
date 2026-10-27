import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '@/shared/components/PageHeader'
import FamilyMemberForm from '../components/FamilyMemberForm'
import FamilyMemberTable from '../components/FamilyMemberTable'
import { familyGroups, familyMembersMock, sortFamilyMembers } from '../data/familyRelations'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Quan hệ gia đình', icon: 'profile', current: true },
]

const emptyDraft = {
  id: '',
  groupId: 'self',
  relation: '',
  fullName: '',
  birthYear: '',
  details: '',
}

function validate(draft) {
  const errors = {}
  if (!draft.relation) errors.relation = 'Chọn mối quan hệ.'
  if (!draft.fullName.trim()) errors.fullName = 'Nhập họ và tên.'
  if (draft.birthYear && !/^\d{4}$/.test(draft.birthYear)) {
    errors.birthYear = 'Năm sinh gồm 4 chữ số.'
  } else if (draft.birthYear) {
    const year = Number(draft.birthYear)
    if (year < 1900 || year > 2026) errors.birthYear = 'Năm sinh không hợp lệ.'
  }
  return errors
}

export default function FamilyRelationPage() {
  const [members, setMembers] = useState(familyMembersMock)
  const [draft, setDraft] = useState(null)
  const [errors, setErrors] = useState({})
  const [pendingDeleteId, setPendingDeleteId] = useState('')
  const [notice, setNotice] = useState('')

  function openCreate(groupId = 'self') {
    setErrors({})
    setNotice('')
    setPendingDeleteId('')
    setDraft({ ...emptyDraft, groupId })
  }

  function openEdit(member) {
    setErrors({})
    setNotice('')
    setPendingDeleteId('')
    setDraft({ ...member })
  }

  function closeForm() {
    setDraft(null)
    setErrors({})
  }

  function saveMember(event) {
    event.preventDefault()
    const cleaned = {
      ...draft,
      fullName: draft.fullName.trim(),
      details: draft.details.trim(),
      birthYear: draft.birthYear.trim(),
    }
    const nextErrors = validate(cleaned)
    if (Object.keys(nextErrors).length > 0) {
      setDraft(cleaned)
      setErrors(nextErrors)
      return
    }

    if (cleaned.id) {
      setMembers((current) => current.map((member) => (member.id === cleaned.id ? cleaned : member)))
      setNotice('Đã cập nhật người thân.')
    } else {
      setMembers((current) => [...current, { ...cleaned, id: crypto.randomUUID() }])
      setNotice('Đã thêm người thân.')
    }
    setDraft(null)
    setErrors({})
  }

  function confirmDelete(id) {
    setMembers((current) => current.filter((member) => member.id !== id))
    setPendingDeleteId('')
    setNotice('Đã xóa người thân.')
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Quan hệ gia đình</h1>
              <p className="mt-1 text-sm text-slate-500">Mẫu lý lịch 2C-BNV/2008</p>
            </div>
            <button
              type="button"
              onClick={() => openCreate('self')}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#1e3a8a]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Thêm mới
            </button>
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
            {familyGroups.map((group, index) => {
              const rows = sortFamilyMembers(members.filter((member) => member.groupId === group.id))
              return (
                <section
                  key={group.id}
                  className="overflow-hidden rounded-md border border-[#e6e8ee] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                >
                  <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-brand">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">{group.title}</h2>
                        <p className="text-xs text-slate-500">{group.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openCreate(group.id)}
                      className="text-sm font-medium text-brand hover:underline"
                    >
                      Thêm vào nhóm
                    </button>
                  </header>
                  <FamilyMemberTable
                    members={rows}
                    pendingDeleteId={pendingDeleteId}
                    onEdit={openEdit}
                    onAskDelete={setPendingDeleteId}
                    onConfirmDelete={confirmDelete}
                    onCancelDelete={() => setPendingDeleteId('')}
                  />
                </section>
              )
            })}
          </div>
        </div>
      </main>

      {draft ? (
        <FamilyMemberForm
          draft={draft}
          errors={errors}
          onChange={(next) => {
            setDraft(next)
            setErrors({})
          }}
          onSubmit={saveMember}
          onClose={closeForm}
        />
      ) : null}
    </div>
  )
}
