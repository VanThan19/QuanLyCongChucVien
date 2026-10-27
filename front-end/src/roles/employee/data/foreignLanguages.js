export const languageLevels = ['A', 'B', 'C', 'D', 'Bậc 1/6', 'Bậc 2/6', 'Bậc 3/6', 'Bậc 4/6', 'Bậc 5/6', 'Bậc 6/6']

export function sortLanguageRecords(records) {
  return [...records].sort((left, right) => {
    const byYear = left.year.localeCompare(right.year)
    if (byYear !== 0) return byYear
    return left.language.localeCompare(right.language, 'vi')
  })
}

export const languageRecordsMock = [
  {
    id: 'english-2008',
    language: 'Tiếng Anh',
    level: 'Bậc 3/6',
    issuer: 'Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội',
    year: '2008',
  },
  {
    id: 'chinese-2016',
    language: 'Tiếng Trung',
    level: 'B',
    issuer: 'Trung tâm Ngoại ngữ, Sở Nội vụ thành phố Hà Nội',
    year: '2016',
  },
]
