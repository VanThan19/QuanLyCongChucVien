import { useEffect, useId } from 'react'
import { X } from 'lucide-react'
import { trainingForms } from '../data/trainingHistory'

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

export default function TrainingRecordForm({ draft, errors, onChange, onSubmit, onClose }) {
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
            {isEdit ? 'Sửa quá trình đào tạo' : 'Thêm quá trình đào tạo'}
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
          <Field label={<Label text="Tên trường" required />} error={errors.schoolName} className="sm:col-span-2">
            <input
              name="schoolName"
              autoFocus
              value={draft.schoolName}
              onChange={(event) => update('schoolName', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.schoolName ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field
            label={<Label text="Chuyên ngành đào tạo, bồi dưỡng" required />}
            error={errors.major}
            className="sm:col-span-2"
          >
            <input
              name="major"
              value={draft.major}
              onChange={(event) => update('major', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.major ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field label={<Label text="Từ tháng/năm" required />} error={errors.startMonth}>
            <input
              name="startMonth"
              type="month"
              value={draft.startMonth}
              onChange={(event) => update('startMonth', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.startMonth ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field label="Đến tháng/năm" error={errors.endMonth}>
            <input
              name="endMonth"
              type="month"
              value={draft.endMonth}
              onChange={(event) => update('endMonth', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.endMonth ? 'border-red-400' : ''}`}
            />
          </Field>
          <Field label={<Label text="Hình thức đào tạo" required />} error={errors.trainingForm}>
            <select
              name="trainingForm"
              value={draft.trainingForm}
              onChange={(event) => update('trainingForm', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.trainingForm ? 'border-red-400' : ''}`}
            >
              <option value="">Chọn</option>
              {trainingForms.map((form) => (
                <option key={form} value={form}>
                  {form}
                </option>
              ))}
            </select>
          </Field>
          <Field label={<Label text="Văn bằng, chứng chỉ, trình độ" required />} error={errors.credential}>
            <input
              name="credential"
              value={draft.credential}
              onChange={(event) => update('credential', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.credential ? 'border-red-400' : ''}`}
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

function Label({ text, required = false }) {
  return (
    <>
      {text}
      {required ? <span className="text-red-600"> *</span> : null}
    </>
  )
}
