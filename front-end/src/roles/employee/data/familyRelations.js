export const familyGroups = [
  {
    id: 'self',
    title: 'Về bản thân',
    description: 'Cha, mẹ, vợ hoặc chồng, con, anh chị em ruột',
    relations: ['Cha', 'Mẹ', 'Vợ', 'Chồng', 'Con', 'Anh ruột', 'Chị ruột', 'Em ruột'],
  },
  {
    id: 'spouse',
    title: 'Về bên vợ/chồng',
    description: 'Cha, mẹ, anh chị em ruột',
    relations: ['Cha', 'Mẹ', 'Anh ruột', 'Chị ruột', 'Em ruột'],
  },
]

const relationRank = {
  Cha: 0,
  Mẹ: 1,
  Vợ: 2,
  Chồng: 3,
  Con: 4,
  'Anh ruột': 5,
  'Chị ruột': 6,
  'Em ruột': 7,
}

export function sortFamilyMembers(members) {
  return [...members].sort((left, right) => {
    const byRelation = (relationRank[left.relation] ?? 99) - (relationRank[right.relation] ?? 99)
    if (byRelation !== 0) return byRelation
    const byYear = (Number(left.birthYear) || 0) - (Number(right.birthYear) || 0)
    if (byYear !== 0) return byYear
    return left.fullName.localeCompare(right.fullName, 'vi')
  })
}

export const familyMembersMock = [
  {
    id: 'self-father',
    groupId: 'self',
    relation: 'Cha',
    fullName: 'Nguyễn Văn Hòa',
    birthYear: '1958',
    details:
      'Quê quán: xã Đông Hội, huyện Đông Anh, thành phố Hà Nội. Nguyên cán bộ Sở Nông nghiệp và Phát triển nông thôn. Đã mất năm 2019.',
  },
  {
    id: 'self-mother',
    groupId: 'self',
    relation: 'Mẹ',
    fullName: 'Trần Thị Mai',
    birthYear: '1960',
    details:
      'Quê quán: xã Đông Hội, huyện Đông Anh, thành phố Hà Nội. Nguyên giáo viên, đã nghỉ hưu. Nơi ở: cùng hộ khẩu thường trú.',
  },
  {
    id: 'self-spouse',
    groupId: 'self',
    relation: 'Chồng',
    fullName: 'Lê Minh Đức',
    birthYear: '1984',
    details:
      'Quê quán: huyện Hoài Đức, thành phố Hà Nội. Kỹ sư xây dựng, Công ty CP Đầu tư xây dựng số 1. Nơi ở: cùng nơi ở hiện nay.',
  },
  {
    id: 'self-child',
    groupId: 'self',
    relation: 'Con',
    fullName: 'Lê Nguyễn Khánh An',
    birthYear: '2014',
    details: 'Học sinh. Nơi ở: cùng bố mẹ tại quận Đống Đa, thành phố Hà Nội.',
  },
  {
    id: 'self-sister',
    groupId: 'self',
    relation: 'Chị ruột',
    fullName: 'Nguyễn Thị Hằng',
    birthYear: '1983',
    details:
      'Quê quán: xã Đông Hội, huyện Đông Anh, thành phố Hà Nội. Giáo viên Trường THCS Đông Hội. Nơi ở: huyện Đông Anh.',
  },
  {
    id: 'spouse-father',
    groupId: 'spouse',
    relation: 'Cha',
    fullName: 'Lê Văn Sơn',
    birthYear: '1956',
    details:
      'Quê quán: huyện Hoài Đức, thành phố Hà Nội. Nguyên công nhân, đã nghỉ hưu. Nơi ở: huyện Hoài Đức.',
  },
  {
    id: 'spouse-mother',
    groupId: 'spouse',
    relation: 'Mẹ',
    fullName: 'Phạm Thị Nga',
    birthYear: '1959',
    details: 'Quê quán: huyện Hoài Đức, thành phố Hà Nội. Nội trợ. Nơi ở: huyện Hoài Đức.',
  },
  {
    id: 'spouse-sibling',
    groupId: 'spouse',
    relation: 'Em ruột',
    fullName: 'Lê Minh Quân',
    birthYear: '1988',
    details: 'Nhân viên ngân hàng. Nơi ở: quận Cầu Giấy, thành phố Hà Nội.',
  },
]
