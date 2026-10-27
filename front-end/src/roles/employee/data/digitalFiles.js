export const fileCategories = ['Bằng cấp', 'Quyết định', 'Giấy tờ', 'Khác']

export const CURRENT_UPLOADER = 'Nguyễn Thị Lan Anh'

const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp']

export function sortDigitalFiles(files) {
  return [...files].sort(
    (left, right) => right.uploadedAt.localeCompare(left.uploadedAt) || left.name.localeCompare(right.name, 'vi'),
  )
}

export function formatUploadDate(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return value
  return `${day}/${month}/${year}`
}

export function fileExtension(name) {
  const extension = name.split('.').pop()
  if (!extension || extension === name) return ''
  return extension.toUpperCase()
}

export function isAllowedFile(file) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  return allowedExtensions.includes(extension)
}

export const digitalFilesMock = [
  {
    id: 'identity-card',
    name: 'CCCD_Nguyen_Thi_Lan_Anh.pdf',
    category: 'Giấy tờ',
    uploadedAt: '2021-04-20',
    uploader: 'Nguyễn Thị Lan Anh',
    previewText:
      'CĂN CƯỚC CÔNG DÂN\nSố: 001186012345\nHọ và tên: Nguyễn Thị Lan Anh\nNgày cấp: 20/04/2021\nNơi cấp: Cục Cảnh sát quản lý hành chính về trật tự xã hội',
  },
  {
    id: 'appointment-2020',
    name: 'QD_789_QĐ-SNV.pdf',
    category: 'Quyết định',
    uploadedAt: '2020-03-10',
    uploader: 'Trần Minh Đức',
    previewText:
      'QUYẾT ĐỊNH\nSố: 789/QĐ-SNV\nVề việc bổ nhiệm chức danh Chuyên viên chính\nÔng/Bà: Nguyễn Thị Lan Anh\nĐơn vị: Phòng Công chức - Viên chức, Sở Nội vụ thành phố Hà Nội\nHiệu lực: 15/03/2020',
  },
  {
    id: 'master-degree',
    name: 'Bang_thac_si_luat.pdf',
    category: 'Bằng cấp',
    uploadedAt: '2018-11-05',
    uploader: 'Nguyễn Thị Lan Anh',
    previewText:
      'BẰNG THẠC SĨ\nNgành: Luật hiến pháp và luật hành chính\nNgười được cấp: Nguyễn Thị Lan Anh\nCơ sở đào tạo: Đại học Luật Hà Nội\nNăm cấp: 2018',
  },
  {
    id: 'bachelor-degree',
    name: 'Bang_cu_nhan_luat.pdf',
    category: 'Bằng cấp',
    uploadedAt: '2008-07-20',
    uploader: 'Phòng Tổ chức cán bộ',
    previewText:
      'BẰNG CỬ NHÂN\nNgành: Luật\nNgười được cấp: Nguyễn Thị Lan Anh\nCơ sở đào tạo: Đại học Luật Hà Nội\nNăm cấp: 2008',
  },
]
