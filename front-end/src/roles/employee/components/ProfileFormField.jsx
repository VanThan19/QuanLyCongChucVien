const spanClass = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  6: 'md:col-span-6',
}

const controlClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20'

function formatDate(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return value
  return `${day}/${month}/${year}`
}

function displayValue(field, value) {
  if (!value) return ''
  if (field.type === 'date') return formatDate(value)
  if (field.suffix) return `${value} ${field.suffix}`
  return value
}

export default function ProfileFormField({ field, value, editing, error, onChange }) {
  const inputId = `profile-${field.name}`
  const shown = displayValue(field, value)
  const options = field.options ?? []
  const selectOptions = value && !options.includes(value) ? [value, ...options] : options

  return (
    <div className={spanClass[field.span] ?? spanClass[3]}>
      <label htmlFor={inputId} className="mb-1.5 block text-sm text-slate-500">
        {field.label}
        {editing && field.required ? <span className="text-red-600"> *</span> : null}
      </label>

      {editing ? (
        <FieldControl
          id={inputId}
          field={field}
          value={value}
          options={selectOptions}
          invalid={Boolean(error)}
          onChange={onChange}
        />
      ) : (
        <p className={`text-sm whitespace-pre-wrap ${shown ? 'font-medium text-slate-900' : 'text-slate-400'}`}>
          {shown || '—'}
        </p>
      )}

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

function FieldControl({ id, field, value, options, invalid, onChange }) {
  const className = `${controlClass} ${invalid ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`
  const handleChange = (event) => onChange(field.name, event.target.value)

  if (field.type === 'textarea') {
    return (
      <textarea
        id={id}
        name={field.name}
        rows={3}
        value={value}
        onChange={handleChange}
        className={className}
      />
    )
  }

  if (field.type === 'select') {
    return (
      <select id={id} name={field.name} value={value} onChange={handleChange} className={className}>
        <option value="">Chọn</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      id={id}
      name={field.name}
      type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
      value={value}
      step={field.step}
      min={field.type === 'number' ? '0' : undefined}
      onChange={handleChange}
      className={className}
    />
  )
}
