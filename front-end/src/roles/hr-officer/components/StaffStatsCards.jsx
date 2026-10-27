import { AlertCircle, CheckCircle2, Clock, Users } from 'lucide-react'

export default function StaffStatsCards({ staffList }) {
  const total = staffList.length
  const completeCount = staffList.filter((s) => s.profileStatus === 'Đầy đủ').length
  const pendingCount = staffList.filter((s) => s.profileStatus === 'Cần bổ sung').length
  const updatingCount = staffList.filter((s) => s.profileStatus === 'Đang cập nhật').length

  const stats = [
    {
      label: 'Tổng số cán bộ',
      value: total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      label: 'Hồ sơ đầy đủ',
      value: completeCount,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
    {
      label: 'Cần bổ sung',
      value: pendingCount,
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      label: 'Đang cập nhật',
      value: updatingCount,
      icon: Clock,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-100',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className={`flex items-center gap-3.5 rounded-2xl border ${stat.borderColor} bg-white p-4 shadow-xs transition hover:shadow-sm`}
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bgColor}`}>
              <Icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              <p className="text-xl font-bold tracking-tight text-slate-900 mt-0.5">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

