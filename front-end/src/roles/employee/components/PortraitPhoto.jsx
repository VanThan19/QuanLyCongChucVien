import { useId } from 'react'
import { ImagePlus, UserRound, X } from 'lucide-react'

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxBytes = 2 * 1024 * 1024

export default function PortraitPhoto({ value, editing, error, onChange, onError }) {
  const inputId = useId()

  function chooseFile(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!acceptedTypes.includes(file.type)) {
      onError('Chỉ nhận ảnh JPG, PNG hoặc WEBP.')
      return
    }

    if (file.size > maxBytes) {
      onError('Ảnh tối đa 2 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => onChange(String(reader.result || ''))
    reader.onerror = () => onError('Không đọc được ảnh. Hãy chọn lại.')
    reader.readAsDataURL(file)
  }

  return (
    <div className="w-[120px] shrink-0">
      <p className="mb-1.5 text-center text-sm leading-5 text-slate-500">
        Ảnh chân dung
        <span className="block text-xs text-slate-400">4 × 6 cm</span>
      </p>
      <div className="relative h-[180px] w-[120px] overflow-hidden rounded-md border border-slate-200 bg-slate-50">
        {value ? (
          <img src={value} alt="Ảnh chân dung 4×6" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <UserRound className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}
      </div>

      {editing ? (
        <div className="mt-2 flex flex-col gap-1.5">
          <label
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 transition hover:border-brand hover:text-brand"
          >
            <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
            Chọn ảnh
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={chooseFile}
            className="sr-only"
          />
          {value ? (
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Xóa ảnh
            </button>
          ) : null}
        </div>
      ) : null}

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
