import { Eye, FileSearch } from 'lucide-react'
import { Link } from 'react-router-dom'
import StaffStatusBadge from './StaffStatusBadge'
import { formatStaffDate } from '../data/staffDirectory'

export default function StaffTable({ staffList }) {
  if (staffList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 mb-3">
          <FileSearch className="h-7 w-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">Không tìm thấy cán bộ phù hợp</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc điều chỉnh các bộ lọc đã chọn.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
            <th scope="col" className="px-5 py-4">Mã cán bộ</th>
            <th scope="col" className="px-4 py-4">Họ và tên</th>
            <th scope="col" className="px-4 py-4">Ngày sinh</th>
            <th scope="col" className="px-4 py-4">Giới tính</th>
            <th scope="col" className="px-4 py-4">Chức vụ hiện tại</th>
            <th scope="col" className="px-4 py-4">Đơn vị</th>
            <th scope="col" className="px-4 py-4">Trạng thái hồ sơ</th>
            <th scope="col" className="px-5 py-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {staffList.map((staff) => (
            <tr
              key={staff.id}
              className="group transition-colors duration-150 hover:bg-blue-50/60"
            >
              {/* Mã cán bộ */}
              <td className="whitespace-nowrap px-5 py-3.5">
                <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-blue-700 group-hover:bg-blue-100/70 group-hover:text-blue-800 transition-colors">
                  {staff.id}
                </span>
              </td>

              {/* Họ và tên */}
              <td className="whitespace-nowrap px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    {staff.fullName.charAt(0)}
                  </span>
                  <div>
                    <span className="font-semibold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                      {staff.fullName}
                    </span>
                    {staff.email && (
                      <span className="block text-xs text-slate-400 group-hover:text-slate-500">
                        {staff.email}
                      </span>
                    )}
                  </div>
                </div>
              </td>

              {/* Ngày sinh */}
              <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
                {formatStaffDate(staff.dateOfBirth)}
              </td>

              {/* Giới tính */}
              <td className="whitespace-nowrap px-4 py-3.5 text-sm">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                    staff.gender === 'Nam'
                      ? 'bg-sky-50 text-sky-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {staff.gender}
                </span>
              </td>

              {/* Chức vụ hiện tại */}
              <td className="px-4 py-3.5 text-sm font-medium text-slate-800">
                {staff.currentPosition}
              </td>

              {/* Đơn vị */}
              <td className="px-4 py-3.5 text-sm text-slate-600">
                {staff.unit}
              </td>

              {/* Trạng thái hồ sơ */}
              <td className="whitespace-nowrap px-4 py-3.5">
                <StaffStatusBadge status={staff.profileStatus} />
              </td>

              {/* Thao tác */}
              <td className="whitespace-nowrap px-5 py-3.5 text-right">
                <Link
                  to={`/hr-officer/danh-sach-can-bo/${staff.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-xs transition duration-150 hover:bg-blue-700 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 focus-visible:outline-none"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Xem chi tiết</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
