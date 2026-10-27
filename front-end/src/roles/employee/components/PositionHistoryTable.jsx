import { Pencil, Trash2 } from 'lucide-react'
import { formatDate } from '../data/positionHistory'

export default function PositionHistoryTable({
  records,
  pendingDeleteId,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}) {
  if (records.length === 0) {
    return <p className="px-5 py-8 text-center text-sm text-slate-500">Chưa có lịch sử chức vụ.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 text-sm text-slate-500">
            <th className="px-5 py-3 font-medium whitespace-nowrap">Chức danh / Chức vụ</th>
            <th className="px-3 py-3 font-medium">Đơn vị công tác</th>
            <th className="w-32 px-3 py-3 font-medium">Từ ngày</th>
            <th className="w-32 px-3 py-3 font-medium">Đến ngày</th>
            <th className="w-36 px-3 py-3 font-medium">Số quyết định</th>
            <th className="w-36 px-3 py-3 font-medium">Ngày quyết định</th>
            <th className="w-36 px-5 py-3 text-right font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const confirming = pendingDeleteId === record.id
            return (
              <tr key={record.id} className="border-b border-slate-100 align-top last:border-b-0">
                <td className="px-5 py-3 text-sm font-medium whitespace-nowrap text-slate-900">{record.position}</td>
                <td className="px-3 py-3 text-sm text-slate-700">{record.organization}</td>
                <td className="px-3 py-3 text-sm whitespace-nowrap text-slate-700">
                  {formatDate(record.fromDate)}
                </td>
                <td className="px-3 py-3 text-sm whitespace-nowrap text-slate-700">
                  {formatDate(record.toDate) || 'Đến nay'}
                </td>
                <td className="px-3 py-3 text-sm whitespace-nowrap text-slate-700">{record.decisionNumber}</td>
                <td className="px-3 py-3 text-sm whitespace-nowrap text-slate-700">
                  {formatDate(record.decisionDate)}
                </td>
                <td className="px-5 py-3 text-right">
                  {confirming ? (
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-slate-500">Xóa dòng này?</span>
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
                          onClick={() => onConfirmDelete(record.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(record)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => onAskDelete(record.id)}
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
