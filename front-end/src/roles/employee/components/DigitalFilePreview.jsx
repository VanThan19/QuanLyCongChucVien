import { useEffect, useId } from 'react'
import { X } from 'lucide-react'
import { formatUploadDate } from '../data/digitalFiles'

function isImage(file) {
  return Boolean(file.objectUrl) && (file.mime?.startsWith('image/') || /\.(jpe?g|png|webp)$/i.test(file.name))
}

function isPdf(file) {
  return Boolean(file.objectUrl) && (file.mime === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))
}

export default function DigitalFilePreview({ file, onClose, onDownload }) {
  const titleId = useId()
  const showImage = isImage(file)
  const showPdf = isPdf(file) && !showImage

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-md bg-white shadow-[0_20px_50px_rgba(15,23,42,0.2)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold break-all text-slate-900">
            {file.name}
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

        <div className="overflow-y-auto px-5 py-5">
          <dl className="grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-slate-500">Loại file</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{file.category}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Ngày tải lên</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{formatUploadDate(file.uploadedAt)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Người tải lên</dt>
              <dd className="mt-0.5 font-medium text-slate-900">{file.uploader}</dd>
            </div>
          </dl>

          {showImage ? (
            <img src={file.objectUrl} alt={file.name} className="mt-5 max-h-80 w-full rounded-md object-contain" />
          ) : null}

          {showPdf ? (
            <iframe title={file.name} src={file.objectUrl} className="mt-5 h-96 w-full rounded-md border border-slate-200" />
          ) : null}

          {!showImage && !showPdf ? (
            <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Nội dung bản ghi</p>
              <p className="mt-3 text-sm whitespace-pre-wrap text-slate-800">
                {file.previewText || 'Không xem trước được định dạng này. Hãy tải tệp xuống để mở.'}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={() => onDownload(file)}
            className="rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1e3a8a]"
          >
            Tải xuống
          </button>
        </div>
      </section>
    </div>
  )
}
