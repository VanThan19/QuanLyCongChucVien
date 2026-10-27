import { Download, Eye, Trash2 } from 'lucide-react'
import { fileExtension, formatUploadDate } from '../data/digitalFiles'

export default function DigitalFileTable({
  files,
  pendingDeleteId,
  onView,
  onDownload,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}) {
  if (files.length === 0) {
    return <p className="px-5 py-8 text-center text-sm text-slate-500">Chưa có hồ sơ số hóa.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 text-sm text-slate-500">
            <th className="px-5 py-3 font-medium">Tên file</th>
            <th className="w-36 px-3 py-3 font-medium whitespace-nowrap">Loại file</th>
            <th className="w-36 px-3 py-3 font-medium whitespace-nowrap">Ngày tải lên</th>
            <th className="w-48 px-3 py-3 font-medium whitespace-nowrap">Người tải lên</th>
            <th className="w-64 px-5 py-3 text-right font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            const confirming = pendingDeleteId === file.id
            const extension = fileExtension(file.name)
            return (
              <tr key={file.id} className="border-b border-slate-100 align-top last:border-b-0">
                <td className="px-5 py-3 text-sm font-medium text-slate-900">
                  <span>{file.name}</span>
                  {extension ? (
                    <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-500">
                      {extension}
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-3 text-sm whitespace-nowrap text-slate-700">{file.category}</td>
                <td className="px-3 py-3 text-sm whitespace-nowrap text-slate-700">
                  {formatUploadDate(file.uploadedAt)}
                </td>
                <td className="px-3 py-3 text-sm text-slate-700">{file.uploader}</td>
                <td className="px-5 py-3 text-right">
                  {confirming ? (
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-slate-500">Xóa tệp này?</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={onCancelDelete}
                          className="text-xs font-medium text-slate-500 hover:text-slate-800"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={() => onConfirmDelete(file.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => onView(file)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                      >
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        Xem
                      </button>
                      <button
                        type="button"
                        onClick={() => onDownload(file)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        Tải xuống
                      </button>
                      <button
                        type="button"
                        onClick={() => onAskDelete(file.id)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Xóa
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
