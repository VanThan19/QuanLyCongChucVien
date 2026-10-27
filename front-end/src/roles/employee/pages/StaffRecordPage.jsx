import { useState } from 'react'
import { FileDown, Printer } from 'lucide-react'
import PageHeader from '@/shared/components/PageHeader'
import StaffRecordDocument from '../components/StaffRecordDocument'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Lý lịch viên chức', icon: 'profile', current: true },
]

const printStyle = `
  @media print {
    body,
    .page-canvas {
      background: white !important;
      background-image: none !important;
      color: #0f172a !important;
    }
    .no-print {
      display: none !important;
    }
    table {
      page-break-inside: auto;
    }
    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
    @page {
      margin: 14mm;
    }
  }
`

export default function StaffRecordPage() {
  const [notice, setNotice] = useState('')

  function printRecord() {
    window.print()
  }

  function exportPdf() {
    setNotice('Trong hộp thoại in, chọn Lưu dưới dạng PDF.')
    window.print()
  }

  return (
    <div className="page-canvas min-h-screen">
      <style>{printStyle}</style>
      <div className="no-print">
        <PageHeader items={breadcrumbs} />
      </div>
      <main className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <div className="no-print mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-semibold text-slate-800">Hồ sơ viên chức</p>
              <p className="mt-1 text-xs text-slate-500">
                Bản tổng hợp theo mẫu 2C · Sử dụng lệnh in để lưu thành PDF
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportPdf}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand hover:bg-blue-50 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Xuất PDF
              </button>
              <button
                type="button"
                onClick={printRecord}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e3a8a] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                In lý lịch
              </button>
            </div>
          </div>

          {notice ? (
            <p
              role="status"
              className="no-print mb-4 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900"
            >
              {notice}
            </p>
          ) : null}

          <StaffRecordDocument />
        </div>
      </main>
    </div>
  )
}
