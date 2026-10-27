import { useEffect, useId } from 'react'
import { X } from 'lucide-react'
import { familyGroups } from '../data/familyRelations'

const controlClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20'

export default function FamilyMemberForm({ draft, errors, onChange, onSubmit, onClose }) {
  const titleId = useId()
  const group = familyGroups.find((item) => item.id === draft.groupId) ?? familyGroups[0]
  const isEdit = Boolean(draft.id)

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  function update(name, value) {
    if (name === 'groupId') {
      const nextGroup = familyGroups.find((item) => item.id === value)
      const relation = nextGroup?.relations.includes(draft.relation) ? draft.relation : ''
      onChange({ ...draft, groupId: value, relation })
      return
    }
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
            {isEdit ? 'Sửa người thân' : 'Thêm người thân'}
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
          <label className="block text-sm text-slate-500">
            Nhóm
            <select
              value={draft.groupId}
              onChange={(event) => update('groupId', event.target.value)}
              className={`${controlClass} mt-1.5`}
            >
              {familyGroups.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm text-slate-500">
            Mối quan hệ <span className="text-red-600">*</span>
            <select
              value={draft.relation}
              onChange={(event) => update('relation', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.relation ? 'border-red-400' : ''}`}
            >
              <option value="">Chọn</option>
              {group.relations.map((relation) => (
                <option key={relation} value={relation}>
                  {relation}
                </option>
              ))}
            </select>
            {errors.relation ? <span className="mt-1 block text-xs text-red-600">{errors.relation}</span> : null}
          </label>

          <label className="block text-sm text-slate-500 sm:col-span-2">
            Họ và tên <span className="text-red-600">*</span>
            <input
              autoFocus
              value={draft.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              className={`${controlClass} mt-1.5 ${errors.fullName ? 'border-red-400' : ''}`}
            />
            {errors.fullName ? <span className="mt-1 block text-xs text-red-600">{errors.fullName}</span> : null}
          </label>

          <label className="block text-sm text-slate-500">
            Năm sinh
            <input
              inputMode="numeric"
              maxLength={4}
              value={draft.birthYear}
              onChange={(event) => update('birthYear', event.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Ví dụ: 1984"
              className={`${controlClass} mt-1.5 ${errors.birthYear ? 'border-red-400' : ''}`}
            />
            {errors.birthYear ? <span className="mt-1 block text-xs text-red-600">{errors.birthYear}</span> : null}
          </label>

          <label className="block text-sm text-slate-500 sm:col-span-2">
            Thông tin chi tiết
            <textarea
              rows={4}
              value={draft.details}
              onChange={(event) => update('details', event.target.value)}
              placeholder="Quê quán, nghề nghiệp, chức vụ, đơn vị công tác, nơi ở..."
              className={`${controlClass} mt-1.5`}
            />
          </label>
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
