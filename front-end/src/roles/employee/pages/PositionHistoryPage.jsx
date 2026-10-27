import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '@/shared/components/PageHeader'
import PositionHistoryForm from '../components/PositionHistoryForm'
import PositionHistoryTable from '../components/PositionHistoryTable'
import { positionRecordsMock, sortPositionRecords } from '../data/positionHistory'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Lịch sử chức vụ', icon: 'profile', current: true },
]

const emptyDraft = {
  id: '',
  position: '',
  organization: '',
  fromDate: '',
  toDate: '',
  decisionNumber: '',
  decisionDate: '',
}

function validate(draft) {
  const errors = {}
  if (!draft.position.trim()) errors.position = 'Nhập chức danh, chức vụ.'
  if (!draft.organization.trim()) errors.organization = 'Nhập đơn vị công tác.'
  if (!draft.fromDate) errors.fromDate = 'Chọn từ ngày.'
  if (draft.toDate && draft.fromDate && draft.toDate < draft.fromDate) {
    errors.toDate = 'Đến ngày không được trước từ ngày.'
  }
  if (!draft.decisionNumber.trim()) errors.decisionNumber = 'Nhập số quyết định.'
  if (!draft.decisionDate) errors.decisionDate = 'Chọn ngày quyết định.'
  else if (draft.fromDate && draft.decisionDate > draft.fromDate) {
    errors.decisionDate = 'Ngày quyết định không được sau từ ngày.'
  }
  return errors
}

export default function PositionHistoryPage() {
  const [records, setRecords] = useState(positionRecordsMock)
  const [draft, setDraft] = useState(null)
  const [errors, setErrors] = useState({})
  const [pendingDeleteId, setPendingDeleteId] = useState('')
  const [notice, setNotice] = useState('')
  const rows = sortPositionRecords(records)

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
      position: draft.position.trim(),
      organization: draft.organization.trim(),
      decisionNumber: draft.decisionNumber.trim(),
    }
    const nextErrors = validate(cleaned)
    if (Object.keys(nextErrors).length > 0) {
      setDraft(cleaned)
      setErrors(nextErrors)
      return
    }

    if (cleaned.id) {
      setRecords((current) => current.map((record) => (record.id === cleaned.id ? cleaned : record)))
      setNotice('Đã cập nhật lịch sử chức vụ.')
    } else {
      setRecords((current) => [...current, { ...cleaned, id: crypto.randomUUID() }])
      setNotice('Đã thêm lịch sử chức vụ.')
    }
    setDraft(null)
    setErrors({})
  }

  function confirmDelete(id) {
    setRecords((current) => current.filter((record) => record.id !== id))
    setPendingDeleteId('')
    setNotice('Đã xóa lịch sử chức vụ.')
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Lịch sử chức vụ, chức danh, đơn vị công tác
              </h1>
              <p className="mt-1 text-sm text-slate-500">Quyết định bổ nhiệm, điều động, luân chuyển</p>
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
            <PositionHistoryTable
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
        <PositionHistoryForm
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
