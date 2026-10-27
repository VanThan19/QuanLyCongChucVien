export function sortPositionRecords(records) {
  return [...records].sort((left, right) => left.fromDate.localeCompare(right.fromDate))
}

export function formatDate(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return value
  return `${day}/${month}/${year}`
}

export const positionRecordsMock = [
  {
    id: 'recruitment-2009',
    position: 'Chuyên viên',
    organization: 'Phòng Tổ chức cán bộ, Sở Nội vụ thành phố Hà Nội',
    fromDate: '2009-09-01',
    toDate: '2015-02-28',
    decisionNumber: '1234/QĐ-SNV',
    decisionDate: '2009-08-25',
  },
  {
    id: 'transfer-2015',
    position: 'Chuyên viên',
    organization: 'Phòng Công chức - Viên chức, Sở Nội vụ thành phố Hà Nội',
    fromDate: '2015-03-01',
    toDate: '2020-03-14',
    decisionNumber: '456/QĐ-SNV',
    decisionDate: '2015-02-20',
  },
  {
    id: 'principal-2020',
    position: 'Chuyên viên chính',
    organization: 'Phòng Công chức - Viên chức, Sở Nội vụ thành phố Hà Nội',
    fromDate: '2020-03-15',
    toDate: '',
    decisionNumber: '789/QĐ-SNV',
    decisionDate: '2020-03-10',
  },
]
