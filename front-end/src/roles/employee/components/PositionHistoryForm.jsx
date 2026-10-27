import { useEffect, useId } from 'react'
import { X } from 'lucide-react'

const controlClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20'

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block text-sm text-slate-500 ${className}`}>
      {label}
      {children}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  )
}

function Required({ text }) {
  return (
    <>
      {text}
      <span className="text-red-600"> *</span>
    </>
  )
}

export default function PositionHistoryForm({ draft, errors, onChange, onSubmit, onClose }) {
  const titleId = useId()
  const isEdit = Boolean(draft.id)

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  function update(name, value) {
    onChange({ ...draft, [name]: value })
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4">
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={onSubmit}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-md bg-white shadow-[0_20px_50px_rgba(15,23,42,0.2)]"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-slate-900">
            {isEdit ? 'Sửa lịch sử chức vụ' : 'Thêm lịch sử chức vụ'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            aria-label="Đóng"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
          <Field label={<Required text="Chức danh / Chức vụ" />} error={errors.position} className="sm:col-span-2">
            <input
              name="position"
              autoFocus
              value={draft.position}
              onChange={(event) => update('position', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.position ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field label={<Required text="Đơn vị công tác" />} error={errors.organization} className="sm:col-span-2">
            <input
              name="organization"
              value={draft.organization}
              onChange={(event) => update('organization', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.organization ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field label={<Required text="Từ ngày" />} error={errors.fromDate}>
            <input
              name="fromDate"
              type="date"
              value={draft.fromDate}
              onChange={(event) => update('fromDate', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.fromDate ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field label="Đến ngày" error={errors.toDate}>
            <input
              name="toDate"
              type="date"
              value={draft.toDate}
              onChange={(event) => update('toDate', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.toDate ? 'border-red-400' : ''}`}
            />
            <span className="mt-1 block text-xs text-slate-400">Để trống nếu đang giữ chức vụ.</span>
          </Field>
          <Field label={<Required text="Số quyết định" />} error={errors.decisionNumber}>
            <input
              name="decisionNumber"
              value={draft.decisionNumber}
              onChange={(event) => update('decisionNumber', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.decisionNumber ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field label={<Required text="Ngày quyết định" />} error={errors.decisionDate}>
            <input
              name="decisionDate"
              type="date"
              value={draft.decisionDate}
              onChange={(event) => update('decisionDate', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.decisionDate ? 'border-red-400' : ''}`}
            />
          </Field>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1e3a8a]"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  )
}
