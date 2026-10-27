import { useMemo, useState } from 'react'
import PageHeader from '@/shared/components/PageHeader'
import { staffDirectoryMock } from '../data/staffDirectory'
import StaffStatsCards from '../components/StaffStatsCards'
import StaffSearchBar from '../components/StaffSearchBar'
import StaffTable from '../components/StaffTable'
import StaffPagination from '../components/StaffPagination'

const PAGE_SIZE = 7

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Cán bộ nhân sự', to: '/hr-officer', icon: 'profile' },
  { label: 'Danh sách cán bộ', icon: 'profile', current: true },
]

export default function StaffDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [unitFilter, setUnitFilter] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  // Extract distinct list of units for dropdown filtering
  const units = useMemo(() => {
    return Array.from(new Set(staffDirectoryMock.map((staff) => staff.unit))).sort()
  }, [])

  // Filtered staff list based on search and filters
  const filteredStaff = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('vi')

    return staffDirectoryMock.filter((staff) => {
      // Search by Name or Staff ID
      const matchesSearch =
        !query ||
        staff.fullName.toLocaleLowerCase('vi').includes(query) ||
        staff.id.toLocaleLowerCase('vi').includes(query)

      // Filter by Status
      const matchesStatus = statusFilter === 'ALL' || staff.profileStatus === statusFilter

      // Filter by Unit
      const matchesUnit = unitFilter === 'ALL' || staff.unit === unitFilter

      return matchesSearch && matchesStatus && matchesUnit
    })
  }, [searchQuery, statusFilter, unitFilter])

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedStaff = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE
    return filteredStaff.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filteredStaff, safePage])

  // Reset to page 1 whenever filters change
  const handleSearchChange = (val) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (val) => {
    setStatusFilter(val)
    setCurrentPage(1)
  }

  const handleUnitFilterChange = (val) => {
    setUnitFilter(val)
    setCurrentPage(1)
  }

  return (
    <div className="page-canvas min-h-screen">
      {/* Top Navigation & Breadcrumbs */}
      <PageHeader items={breadcrumbs} />

      <main className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Title Section */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-blue-700 uppercase">
                Quản lý nhân sự & tổ chức cán bộ
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Danh sách cán bộ
              </h1>
              <p className="mt-1.5 text-sm text-slate-600">
                Tra cứu, theo dõi và quản lý thông tin hồ sơ cán bộ, công chức, viên chức trong toàn cơ quan.
              </p>
            </div>
          </div>

          {/* Statistics summary cards */}
          <StaffStatsCards staffList={staffDirectoryMock} />

          {/* Main Table Card */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
            {/* Search and Filters toolbar */}
            <StaffSearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              statusFilter={statusFilter}
              onStatusFilterChange={handleStatusFilterChange}
              unitFilter={unitFilter}
              onUnitFilterChange={handleUnitFilterChange}
              units={units}
              totalResults={filteredStaff.length}
            />

            {/* Staff Data Table */}
            <StaffTable staffList={paginatedStaff} />

            {/* Pagination Controls */}
            <StaffPagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredStaff.length}
              pageSize={PAGE_SIZE}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
