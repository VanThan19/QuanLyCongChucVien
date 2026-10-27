export function sortWorkRecords(records) {
  return [...records].sort((left, right) => left.startMonth.localeCompare(right.startMonth))
}

export function formatMonthYear(value) {
  if (!value) return ''
  const [year, month] = value.split('-')
  if (!year || !month) return value
  return `${month}/${year}`
}

export const workRecordsMock = [
  {
    id: 'officer-organization',
    startMonth: '2009-09',
    endMonth: '2015-02',
    position: 'Chuyên viên',
    organization: 'Phòng Tổ chức cán bộ, Sở Nội vụ thành phố Hà Nội',
  },
  {
    id: 'officer-civil-service',
    startMonth: '2015-03',
    endMonth: '2020-02',
    position: 'Chuyên viên',
    organization: 'Phòng Công chức - Viên chức, Sở Nội vụ thành phố Hà Nội',
  },
  {
    id: 'principal-officer',
    startMonth: '2020-03',
    endMonth: '',
    position: 'Chuyên viên chính',
    organization: 'Phòng Công chức - Viên chức, Sở Nội vụ thành phố Hà Nội',
  },
]
