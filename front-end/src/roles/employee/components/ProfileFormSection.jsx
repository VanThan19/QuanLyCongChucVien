export default function ProfileFormSection({ index, title, aside, children }) {
  const order = String(index + 1).padStart(2, '0')
  const fields = (
    <div className={`grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-6 ${aside ? 'min-w-0 flex-1' : ''}`}>
      {children}
    </div>
  )

  return (
    <section className="overflow-hidden rounded-md border border-[#e6e8ee] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3">
        <span className="text-sm font-semibold text-brand">{order}</span>
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </header>
      {aside ? (
        <div className="flex flex-col gap-6 px-5 py-5 lg:flex-row lg:items-start">
          {fields}
          {aside}
        </div>
      ) : (
        <div className="px-5 py-5">{fields}</div>
      )}
    </section>
  )
}
