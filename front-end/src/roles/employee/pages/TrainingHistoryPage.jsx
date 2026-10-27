import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '@/shared/components/PageHeader'
import TrainingRecordForm from '../components/TrainingRecordForm'
import TrainingRecordTable from '../components/TrainingRecordTable'
import { sortTrainingRecords, trainingRecordsMock } from '../data/trainingHistory'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Quá trình đào tạo', icon: 'profile', current: true },
]

const emptyDraft = {
  id: '',
  schoolName: '',
  major: '',
  startMonth: '',
  endMonth: '',
  trainingForm: '',
  credential: '',
}

function validate(draft) {
  const errors = {}
  if (!draft.schoolName.trim()) errors.schoolName = 'Nhập tên trường.'
  if (!draft.major.trim()) errors.major = 'Nhập chuyên ngành đào tạo, bồi dưỡng.'
  if (!draft.startMonth) errors.startMonth = 'Chọn tháng bắt đầu.'
  if (draft.endMonth && draft.startMonth && draft.endMonth < draft.startMonth) {
    errors.endMonth = 'Tháng kết thúc phải sau tháng bắt đầu.'
  }
  if (!draft.trainingForm) errors.trainingForm = 'Chọn hình thức đào tạo.'
  if (!draft.credential.trim()) errors.credential = 'Nhập văn bằng, chứng chỉ, trình độ.'
  return errors
}

export default function TrainingHistoryPage() {
  const [records, setRecords] = useState(trainingRecordsMock)
  const [draft, setDraft] = useState(null)
  const [errors, setErrors] = useState({})
  const [pendingDeleteId, setPendingDeleteId] = useState('')
  const [notice, setNotice] = useState('')
  const rows = sortTrainingRecords(records)

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
      schoolName: draft.schoolName.trim(),
      major: draft.major.trim(),
      credential: draft.credential.trim(),
    }
    const nextErrors = validate(cleaned)
    if (Object.keys(nextErrors).length > 0) {
      setDraft(cleaned)
      setErrors(nextErrors)
      return
    }

    if (cleaned.id) {
      setRecords((current) => current.map((record) => (record.id === cleaned.id ? cleaned : record)))
      setNotice('Đã cập nhật quá trình đào tạo.')
    } else {
      setRecords((current) => [...current, { ...cleaned, id: crypto.randomUUID() }])
      setNotice('Đã thêm quá trình đào tạo.')
    }
    setDraft(null)
    setErrors({})
  }

  function confirmDelete(id) {
    setRecords((current) => current.filter((record) => record.id !== id))
    setPendingDeleteId('')
    setNotice('Đã xóa quá trình đào tạo.')
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Quá trình đào tạo</h1>
              <p className="mt-1 text-sm text-slate-500">Mẫu lý lịch 2C-BNV/2008</p>
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
            <TrainingRecordTable
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
        <TrainingRecordForm
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
