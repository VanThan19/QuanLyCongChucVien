import { Filter, Search, X } from 'lucide-react'

export default function StaffSearchBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  unitFilter,
  onUnitFilterChange,
  units,
  totalResults,
}) {
  const hasActiveFilters = searchQuery || statusFilter !== 'ALL' || unitFilter !== 'ALL'

  function handleReset() {
    onSearchChange('')
    onStatusFilterChange('ALL')
    onUnitFilterChange('ALL')
  }

  return (
    <div className="border-b border-slate-100 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <label htmlFor="staff-search-input" className="sr-only">
            Tìm kiếm theo họ tên hoặc mã cán bộ
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="staff-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo họ tên hoặc mã cán bộ (ví dụ: CB001, Lan Anh...)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-10 pl-10 text-sm text-slate-800 placeholder-slate-400 transition hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              title="Xóa tìm kiếm"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Unit filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-slate-400 hidden sm:inline" />
            <select
              value={unitFilter}
              onChange={(e) => onUnitFilterChange(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            >
              <option value="ALL">Tất cả đơn vị</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="Đầy đủ">Đầy đủ</option>
            <option value="Cần bổ sung">Cần bổ sung</option>
            <option value="Đang cập nhật">Đang cập nhật</option>
          </select>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <X className="h-3 w-3" />
              Đặt lại
            </button>
          )}
        </div>
      </div>

      {/* Result counter status banner */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          Tìm thấy <span className="font-semibold text-blue-700">{totalResults}</span> cán bộ phù hợp
        </span>
      </div>
    </div>
  )
}

