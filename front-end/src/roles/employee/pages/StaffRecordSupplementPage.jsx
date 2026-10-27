import { useState } from 'react'
import { ArrowLeft, Check, Clock3, Eye, FilePlus2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '@/shared/components/PageHeader'

const breadcrumbs = [
  { label: 'Trang chủ', to: '/', icon: 'home' },
  { label: 'Hồ sơ cá nhân', to: '/employee/ho-so-ca-nhan', icon: 'profile' },
  { label: 'Bổ sung lý lịch viên chức', icon: 'profile', current: true },
]

const initialRequests = [
  {
    id: 'request-2026-003',
    field: 'Thông tin liên hệ',
    currentValue: 'Số điện thoại: 0912 345 678',
    requestedValue: 'Số điện thoại: 0987 654 321',
    reason: 'Cập nhật số điện thoại đang sử dụng để thuận tiện liên hệ công tác.',
    submittedAt: '2026-10-20',
    status: 'Chờ duyệt',
    reviewerNote: '',
  },
  {
    id: 'request-2026-002',
    field: 'Quá trình đào tạo',
    currentValue: 'Chưa cập nhật chứng chỉ bồi dưỡng chuyên viên chính.',
    requestedValue: 'Bổ sung chứng chỉ bồi dưỡng chuyên viên chính, hoàn thành tháng 08/2026.',
    reason: 'Đề nghị cập nhật văn bằng, chứng chỉ mới vào hồ sơ viên chức.',
    submittedAt: '2026-09-15',
    status: 'Đã duyệt',
    reviewerNote: 'Đã đối chiếu chứng chỉ và cập nhật hồ sơ.',
  },
  {
    id: 'request-2026-001',
    field: 'Quan hệ gia đình',
    currentValue: 'Địa chỉ thường trú của mẹ: huyện Đông Anh, Hà Nội.',
    requestedValue: 'Địa chỉ thường trú của mẹ: phường Đông Hội, Hà Nội.',
    reason: 'Cập nhật địa chỉ sau khi điều chỉnh đơn vị hành chính.',
    submittedAt: '2026-08-28',
    status: 'Từ chối',
    reviewerNote: 'Vui lòng bổ sung giấy tờ xác nhận địa chỉ mới trước khi gửi lại.',
  },
]

const fields = [
  'Thông tin cá nhân',
  'Thông tin liên hệ',
  'Quá trình đào tạo',
  'Quá trình công tác',
  'Quan hệ gia đình',
  'Lịch sử chức vụ',
  'Thông tin khác',
]

const statusStyles = {
  'Chờ duyệt': 'border-amber-200 bg-amber-50 text-amber-700',
  'Đã duyệt': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'Từ chối': 'border-rose-200 bg-rose-50 text-rose-700',
}

const controlClass =
  'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/15'

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

function StatusBadge({ status }) {
  const Icon = status === 'Đã duyệt' ? Check : Clock3
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status}
    </span>
  )
}

function RequestDetails({ request, onClose }) {
  if (!request) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-detail-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand">Chi tiết yêu cầu</p>
            <h2 id="request-detail-title" className="mt-1 text-lg font-semibold text-slate-900">
              {request.field}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng chi tiết"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>
        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <StatusBadge status={request.status} />
            <span className="text-sm text-slate-500">Gửi ngày {formatDate(request.submittedAt)}</span>
          </div>
          <DetailField label="Thông tin hiện tại" value={request.currentValue} />
          <DetailField label="Nội dung đề nghị cập nhật" value={request.requestedValue} />
          <DetailField label="Lý do bổ sung" value={request.reason} />
          {request.reviewerNote ? (
            <DetailField label="Phản hồi của đơn vị duyệt" value={request.reviewerNote} />
          ) : null}
        </div>
        <footer className="flex justify-end border-t border-slate-100 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Đóng
          </button>
        </footer>
      </section>
    </div>
  )
}

function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6 text-slate-800">{value || '—'}</p>
    </div>
  )
}

export default function StaffRecordSupplementPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [notice, setNotice] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    field: '',
    currentValue: '',
    requestedValue: '',
    reason: '',
  })

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice('')
  }

  function submitRequest(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.field) nextErrors.field = 'Vui lòng chọn nhóm thông tin.'
    if (!form.requestedValue.trim()) nextErrors.requestedValue = 'Nhập nội dung đề nghị cập nhật.'
    if (!form.reason.trim()) nextErrors.reason = 'Vui lòng nêu lý do bổ sung.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setNotice('')
      return
    }

    const today = new Date()
    const submittedAt = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-')
    const request = {
      ...form,
      currentValue: form.currentValue.trim() || 'Chưa có thông tin trong hồ sơ.',
      requestedValue: form.requestedValue.trim(),
      reason: form.reason.trim(),
      submittedAt,
      status: 'Chờ duyệt',
      reviewerNote: '',
      id: `request-${Date.now()}`,
    }

    setRequests((current) => [request, ...current])
    setForm({ field: '', currentValue: '', requestedValue: '', reason: '' })
    setErrors({})
    setNotice('Yêu cầu bổ sung lý lịch đã được gửi và đang chờ duyệt.')
  }

  return (
    <div className="page-canvas min-h-screen">
      <PageHeader items={breadcrumbs} />
      <main className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <Link
              to="/employee/ho-so-ca-nhan"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Hồ sơ cá nhân
            </Link>
            <div className="mt-4">
              <p className="text-sm font-semibold text-brand">HỒ SƠ VIÊN CHỨC</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Bổ sung lý lịch viên chức
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Gửi yêu cầu cập nhật thông tin hồ sơ. Yêu cầu sẽ được đơn vị quản lý xem xét và
                phản hồi tại danh sách bên dưới.
              </p>
            </div>
          </div>

          {notice ? (
            <p
              role="status"
              className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              {notice}
            </p>
          ) : null}

          <section className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand">
                <FilePlus2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold text-slate-900">Tạo yêu cầu bổ sung</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Mô tả rõ thông tin cần cập nhật để hồ sơ được xử lý nhanh chóng.
                </p>
              </div>
            </div>

            <form onSubmit={submitRequest} noValidate className="grid gap-5 px-5 py-5 sm:px-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Nhóm thông tin cần bổ sung <span className="text-rose-600">*</span>
                  <select
                    name="field"
                    value={form.field}
                    onChange={updateForm}
                    aria-invalid={Boolean(errors.field)}
                    className={`${controlClass} ${errors.field ? 'border-rose-400' : ''}`}
                  >
                    <option value="">Chọn nhóm thông tin</option>
                    {fields.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                  {errors.field ? <FieldError>{errors.field}</FieldError> : null}
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Thông tin hiện tại (nếu có)
                  <input
                    name="currentValue"
                    value={form.currentValue}
                    onChange={updateForm}
                    placeholder="Thông tin đang lưu trong hồ sơ"
                    className={controlClass}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Nội dung đề nghị cập nhật <span className="text-rose-600">*</span>
                <textarea
                  name="requestedValue"
                  value={form.requestedValue}
                  onChange={updateForm}
                  rows={3}
                  aria-invalid={Boolean(errors.requestedValue)}
                  placeholder="Nhập nội dung mới hoặc thông tin cần bổ sung"
                  className={`${controlClass} resize-y ${errors.requestedValue ? 'border-rose-400' : ''}`}
                />
                {errors.requestedValue ? <FieldError>{errors.requestedValue}</FieldError> : null}
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Lý do bổ sung <span className="text-rose-600">*</span>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={updateForm}
                  rows={2}
                  aria-invalid={Boolean(errors.reason)}
                  placeholder="Nêu lý do cần cập nhật thông tin"
                  className={`${controlClass} resize-y ${errors.reason ? 'border-rose-400' : ''}`}
                />
                {errors.reason ? <FieldError>{errors.reason}</FieldError> : null}
              </label>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  <span className="text-rose-600">*</span> Thông tin bắt buộc
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <FilePlus2 className="h-4 w-4" aria-hidden="true" />
                  Gửi yêu cầu
                </button>
              </div>
            </form>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 className="font-semibold text-slate-900">Yêu cầu đã gửi</h2>
              <p className="text-sm text-slate-500">
                Theo dõi trạng thái và xem phản hồi cho từng yêu cầu.
              </p>
            </div>
            {requests.length ? (
              <ul className="divide-y divide-slate-100">
                {requests.map((request) => (
                  <li
                    key={request.id}
                    className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-slate-900">{request.field}</h3>
                        <StatusBadge status={request.status} />
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                        {request.requestedValue}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Gửi ngày {formatDate(request.submittedAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(request)}
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-brand hover:bg-blue-50 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none sm:self-center"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      Xem chi tiết
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-6 py-10 text-center text-sm text-slate-500">
                Chưa có yêu cầu bổ sung lý lịch nào.
              </p>
            )}
          </section>
        </div>
      </main>
      <RequestDetails request={selectedRequest} onClose={() => setSelectedRequest(null)} />
    </div>
  )
}

function FieldError({ children }) {
  return <span className="mt-1 block text-xs font-normal text-rose-600">{children}</span>
}
