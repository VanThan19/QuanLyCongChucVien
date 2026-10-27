import { useEffect, useId, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { fileCategories, isAllowedFile } from '../data/digitalFiles'

const MAX_FILE_BYTES = 10 * 1024 * 1024

export default function DigitalFileUpload({ onClose, onSubmit }) {
  const titleId = useId()
  const inputRef = useRef(null)
  const [category, setCategory] = useState('')
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  function chooseFile(nextFile) {
    if (!nextFile) return
    setFile(nextFile)
    setErrors((current) => ({ ...current, file: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!category) nextErrors.category = 'Chọn loại file.'
    if (!file) nextErrors.file = 'Chọn tệp cần tải lên.'
    else if (!isAllowedFile(file)) nextErrors.file = 'Chỉ tải lên PDF, Word hoặc ảnh.'
    else if (file.size > MAX_FILE_BYTES) nextErrors.file = 'Tệp vượt quá 10 MB.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit({ category, file })
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4">
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-md bg-white shadow-[0_20px_50px_rgba(15,23,42,0.2)]"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-slate-900">
            Tải hồ sơ lên
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

        <div className="space-y-4 px-5 py-5">
          <label className="block text-sm text-slate-500">
            Loại file
            <span className="text-red-600"> *</span>
            <select
              name="category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value)
                setErrors((current) => ({ ...current, category: undefined }))
              }}
              className={`mt-1.5 w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${
                errors.category ? 'border-red-400' : 'border-slate-200'
              }`}
            >
              <option value="">Chọn loại file</option>
              {fileCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.category ? <span className="mt-1 block text-xs text-red-600">{errors.category}</span> : null}
          </label>

          <div>
            <p className="mb-1.5 text-sm text-slate-500">
              Tệp đính kèm
              <span className="text-red-600"> *</span>
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault()
                setDragging(false)
                chooseFile(event.dataTransfer.files?.[0])
              }}
              className={`flex w-full flex-col items-center rounded-md border border-dashed px-4 py-8 text-center transition ${
                dragging ? 'border-brand bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-brand'
              }`}
            >
              <Upload className="h-5 w-5 text-brand" aria-hidden="true" />
              <span className="mt-2 text-sm font-medium text-slate-800">
                {file ? file.name : 'Kéo thả hoặc bấm để chọn tệp'}
              </span>
              <span className="mt-1 text-xs text-slate-500">PDF, Word, JPG, PNG. Tối đa 10 MB.</span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => {
                chooseFile(event.target.files?.[0])
                event.target.value = ''
              }}
            />
            {errors.file ? <p className="mt-1 text-xs text-red-600">{errors.file}</p> : null}
          </div>
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
            Tải lên
          </button>
        </div>
      </form>
    </div>
  )
}
