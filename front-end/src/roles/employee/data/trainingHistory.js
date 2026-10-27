export const trainingForms = [
  'Chính quy',
  'Tại chức',
  'Chuyên tu',
  'Liên thông',
  'Tập trung',
  'Không tập trung',
  'Từ xa',
  'Bồi dưỡng',
]

export function sortTrainingRecords(records) {
  return [...records].sort((left, right) => left.startMonth.localeCompare(right.startMonth))
}

export function formatMonthYear(value) {
  if (!value) return ''
  const [year, month] = value.split('-')
  if (!year || !month) return value
  return `${month}/${year}`
}

export const trainingRecordsMock = [
  {
    id: 'law-bachelor',
    schoolName: 'Đại học Luật Hà Nội',
    major: 'Luật học',
    startMonth: '2004-09',
    endMonth: '2008-06',
    trainingForm: 'Chính quy',
    credential: 'Cử nhân Luật',
  },
  {
    id: 'law-master',
    schoolName: 'Học viện Khoa học xã hội',
    major: 'Luật hiến pháp và luật hành chính',
    startMonth: '2015-10',
    endMonth: '2017-10',
    trainingForm: 'Chính quy',
    credential: 'Thạc sĩ Luật hiến pháp và luật hành chính',
  },
  {
    id: 'political-theory',
    schoolName: 'Học viện Chính trị quốc gia Hồ Chí Minh',
    major: 'Lý luận chính trị',
    startMonth: '2018-03',
    endMonth: '2018-08',
    trainingForm: 'Tập trung',
    credential: 'Cao cấp lý luận chính trị',
  },
  {
    id: 'state-management',
    schoolName: 'Học viện Hành chính Quốc gia',
    major: 'Quản lý nhà nước',
    startMonth: '2019-04',
    endMonth: '2019-07',
    trainingForm: 'Tập trung',
    credential: 'Chứng chỉ Cao cấp quản lý nhà nước',
  },
]
