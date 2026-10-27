import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '@/shared/components/PageHeader'
import ForeignLanguageForm from '../components/ForeignLanguageForm'
import ForeignLanguageTable from '../components/ForeignLanguageTable'
import { languageLevels, languageRecordsMock, sortLanguageRecords } from '../data/foreignLanguages'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Ngoại ngữ', icon: 'profile', current: true },
]

const emptyDraft = {
  id: '',
  language: '',
  level: '',
  issuer: '',
  year: '',
}

function validate(draft) {
  const errors = {}
  const currentYear = new Date().getFullYear()
  if (!draft.language.trim()) errors.language = 'Nhập tên ngoại ngữ.'
  if (!draft.level) errors.level = 'Chọn trình độ.'
  else if (!languageLevels.includes(draft.level)) errors.level = 'Trình độ không hợp lệ.'
  if (!draft.issuer.trim()) errors.issuer = 'Nhập nơi cấp chứng chỉ.'
  if (!draft.year) errors.year = 'Nhập năm cấp.'
  else if (!/^\d{4}$/.test(draft.year)) errors.year = 'Năm cấp gồm 4 chữ số.'
  else if (Number(draft.year) < 1950 || Number(draft.year) > currentYear) {
    errors.year = 'Năm cấp không hợp lệ.'
  }
  return errors
}

export default function ForeignLanguagePage() {
  const [records, setRecords] = useState(languageRecordsMock)
  const [draft, setDraft] = useState(null)
  const [errors, setErrors] = useState({})
  const [pendingDeleteId, setPendingDeleteId] = useState('')
  const [notice, setNotice] = useState('')
  const rows = sortLanguageRecords(records)

  function openCreate() {
    setErrors({})
    setNotice('')
    setPendingDeleteId('')
    setDraft({ ...emptyDraft })
  }

  function openEdit(record) {
    setErrors({})
    setNotice('')
    setPendingDeleteId('')
    setDraft({ ...record })
  }

  function closeForm() {
    setDraft(null)
    setErrors({})
  }

  function saveRecord(event) {
    event.preventDefault()
    const cleaned = {
      ...draft,
      language: draft.language.trim(),
      issuer: draft.issuer.trim(),
      year: draft.year.trim(),
    }
    const nextErrors = validate(cleaned)
    if (Object.keys(nextErrors).length > 0) {
      setDraft(cleaned)
      setErrors(nextErrors)
      return
    }

    if (cleaned.id) {
      setRecords((current) => current.map((record) => (record.id === cleaned.id ? cleaned : record)))
      setNotice('Đã cập nhật thông tin ngoại ngữ.')
    } else {
      setRecords((current) => [...current, { ...cleaned, id: crypto.randomUUID() }])
      setNotice('Đã thêm thông tin ngoại ngữ.')
    }
    setDraft(null)
    setErrors({})
  }

  function confirmDelete(id) {
    setRecords((current) => current.filter((record) => record.id !== id))
    setPendingDeleteId('')
    setNotice('Đã xóa thông tin ngoại ngữ.')
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Cập nhật thông tin ngoại ngữ</h1>
              <p className="mt-1 text-sm text-slate-500">Chứng chỉ ngoại ngữ theo trình độ A, B, C, D hoặc tương đương</p>
            </div>
            <button
              type="button"
              onClick={openCreate}
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

          <section className="overflow-hidden rounded-md border border-[#e6e8ee] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <ForeignLanguageTable
              records={rows}
              pendingDeleteId={pendingDeleteId}
              onEdit={openEdit}
              onAskDelete={setPendingDeleteId}
              onConfirmDelete={confirmDelete}
              onCancelDelete={() => setPendingDeleteId('')}
            />
          </section>
        </div>
      </main>

      {draft ? (
        <ForeignLanguageForm
          draft={draft}
          errors={errors}
          onChange={(next) => {
            setDraft(next)
            setErrors({})
          }}
          onSubmit={saveRecord}
          onClose={closeForm}
        />
      ) : null}
    </div>
  )
}
