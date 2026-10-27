export default function StaffRecordSection({ index, title, children }) {
  const order = String(index).padStart(2, '0')

  return (
    <section className="break-inside-avoid border-t border-slate-200 pt-6 print:break-inside-auto">
      <h2 className="flex items-center gap-3 text-base font-semibold text-slate-900">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-brand">
          {order}
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export function FactList({ items }) {
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className={item.wide ? 'sm:col-span-2' : ''}>
          <dt className="text-xs text-slate-500">{item.label}</dt>
          <dd className="mt-1 text-sm font-medium whitespace-pre-wrap text-slate-900">{item.value || '—'}</dd>
        </div>
      ))}
    </dl>
  )
}

export function RecordTable({ columns, rows, emptyLabel }) {
  if (rows.length === 0) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 text-xs text-slate-500">
            {columns.map((column) => (
              <th key={column.key} className={`px-3 py-2 font-medium ${column.className ?? ''}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-slate-100 align-top break-inside-avoid last:border-b-0">
              {columns.map((column) => (
                <td key={column.key} className={`px-3 py-2.5 text-sm text-slate-700 ${column.cellClassName ?? ''}`}>
                  {row.cells[column.key] || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
