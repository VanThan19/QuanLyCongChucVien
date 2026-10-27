import { Pencil, Trash2 } from 'lucide-react'

export default function FamilyMemberTable({
  members,
  pendingDeleteId,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}) {
  if (members.length === 0) {
    return (
      <p className="px-5 py-8 text-center text-sm text-slate-500">Chưa có người thân trong nhóm này.</p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-100 text-xs font-medium tracking-wide text-slate-500 uppercase">
            <th className="w-32 px-5 py-3 font-medium">Mối quan hệ</th>
            <th className="w-48 px-3 py-3 font-medium">Họ và tên</th>
            <th className="w-24 px-3 py-3 font-medium">Năm sinh</th>
            <th className="px-3 py-3 font-medium">Thông tin chi tiết</th>
            <th className="w-36 px-5 py-3 text-right font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const confirming = pendingDeleteId === member.id
            return (
              <tr key={member.id} className="border-b border-slate-100 align-top last:border-b-0">
                <td className="px-5 py-3 text-sm font-medium text-slate-900">{member.relation}</td>
                <td className="px-3 py-3 text-sm text-slate-800">{member.fullName}</td>
                <td className="px-3 py-3 text-sm text-slate-700">{member.birthYear || '—'}</td>
                <td className="px-3 py-3 text-sm leading-6 whitespace-pre-wrap text-slate-600">
                  {member.details || '—'}
                </td>
                <td className="px-5 py-3 text-right">
                  {confirming ? (
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-slate-500">Xóa người này?</span>
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
                          onClick={() => onConfirmDelete(member.id)}
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
                        onClick={() => onEdit(member)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => onAskDelete(member.id)}
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
