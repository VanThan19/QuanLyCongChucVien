import { useEffect, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import PageHeader from '@/shared/components/PageHeader'
import DigitalFilePreview from '../components/DigitalFilePreview'
import DigitalFileTable from '../components/DigitalFileTable'
import DigitalFileUpload from '../components/DigitalFileUpload'
import { CURRENT_UPLOADER, digitalFilesMock, sortDigitalFiles } from '../data/digitalFiles'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Hồ sơ số hóa', icon: 'profile', current: true },
]

function todayIso() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function downloadFile(file) {
  const anchor = document.createElement('a')
  let temporaryUrl = ''
  if (file.objectUrl) {
    anchor.href = file.objectUrl
    anchor.download = file.name
  } else {
    const blob = new Blob([file.previewText || file.name], { type: 'text/plain;charset=utf-8' })
    temporaryUrl = URL.createObjectURL(blob)
    anchor.href = temporaryUrl
    anchor.download = file.name.replace(/\.[^.]+$/, '') + '.txt'
  }
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  if (temporaryUrl) URL.revokeObjectURL(temporaryUrl)
}

export default function DigitalFilePage() {
  const [files, setFiles] = useState(digitalFilesMock)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [pendingDeleteId, setPendingDeleteId] = useState('')
  const [notice, setNotice] = useState('')
  const objectUrls = useRef(new Set())
  const rows = sortDigitalFiles(files)

  useEffect(() => {
    const urls = objectUrls.current
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  function addFile({ category, file }) {
    const objectUrl = URL.createObjectURL(file)
    objectUrls.current.add(objectUrl)
    setFiles((current) => [
      {
        id: crypto.randomUUID(),
        name: file.name,
        category,
        uploadedAt: todayIso(),
        uploader: CURRENT_UPLOADER,
        mime: file.type,
        objectUrl,
        previewText: '',
      },
      ...current,
    ])
    setUploading(false)
    setNotice('Đã tải lên hồ sơ.')
  }

  function confirmDelete(id) {
    const target = files.find((file) => file.id === id)
    if (target?.objectUrl) {
      URL.revokeObjectURL(target.objectUrl)
      objectUrls.current.delete(target.objectUrl)
    }
    setFiles((current) => current.filter((file) => file.id !== id))
    if (preview?.id === id) setPreview(null)
    setPendingDeleteId('')
    setNotice('Đã xóa hồ sơ số hóa.')
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Hồ sơ số hóa</h1>
              <p className="mt-1 text-sm text-slate-500">Bằng cấp, quyết định và giấy tờ đính kèm</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setNotice('')
                setPendingDeleteId('')
                setUploading(true)
              }}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#1e3a8a]"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Tải lên
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
            <DigitalFileTable
              files={rows}
              pendingDeleteId={pendingDeleteId}
              onView={setPreview}
              onDownload={downloadFile}
              onAskDelete={setPendingDeleteId}
              onConfirmDelete={confirmDelete}
              onCancelDelete={() => setPendingDeleteId('')}
            />
          </section>
        </div>
      </main>

      {uploading ? <DigitalFileUpload onClose={() => setUploading(false)} onSubmit={addFile} /> : null}
      {preview ? (
        <DigitalFilePreview file={preview} onClose={() => setPreview(null)} onDownload={downloadFile} />
      ) : null}
    </div>
  )
}
