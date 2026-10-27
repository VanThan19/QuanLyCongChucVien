export default function StaffStatusBadge({ status }) {
  const config = {
    'Đầy đủ': {
      bg: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      dot: 'bg-emerald-500',
    },
    'Cần bổ sung': {
      bg: 'bg-amber-50 text-amber-700 ring-amber-600/20',
      dot: 'bg-amber-500',
    },
    'Đang cập nhật': {
      bg: 'bg-blue-50 text-blue-700 ring-blue-600/20',
      dot: 'bg-blue-500',
    },
  }

  const current = config[status] || {
    bg: 'bg-slate-50 text-slate-700 ring-slate-600/20',
    dot: 'bg-slate-400',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${current.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${current.dot}`} aria-hidden="true" />
      {status}
    </span>
  )
}

