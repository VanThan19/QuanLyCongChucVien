import {
  DigitalProfileIcon,
  FamilyRelationIcon,
  LanguageIcon,
  PersonalProfileIcon,
  PositionHistoryIcon,
  StaffRecordIcon,
  TrainingIcon,
  WorkHistoryIcon,
} from '../components/profileIcons'

export const profileSections = [
  {
    id: 'thong-tin',
    title: 'Hồ sơ cá nhân',
    path: '/employee/ho-so-ca-nhan/thong-tin',
    icon: PersonalProfileIcon,
  },
  {
    id: 'quan-he-gia-dinh',
    title: 'Quan hệ gia đình',
    path: '/employee/ho-so-ca-nhan/quan-he-gia-dinh',
    icon: FamilyRelationIcon,
  },
  {
    id: 'qua-trinh-dao-tao',
    title: 'Quá trình đào tạo',
    path: '/employee/ho-so-ca-nhan/qua-trinh-dao-tao',
    icon: TrainingIcon,
  },
  {
    id: 'qua-trinh-cong-tac',
    title: 'Quá trình công tác',
    path: '/employee/ho-so-ca-nhan/qua-trinh-cong-tac',
    icon: WorkHistoryIcon,
  },
  {
    id: 'ngoai-ngu',
    title: 'Cập nhật thông tin ngoại ngữ',
    path: '/employee/ho-so-ca-nhan/ngoai-ngu',
    icon: LanguageIcon,
  },
  {
    id: 'lich-su-chuc-vu',
    title: 'Lịch sử chức vụ, chức danh, đơn vị công tác',
    path: '/employee/ho-so-ca-nhan/lich-su-chuc-vu',
    icon: PositionHistoryIcon,
  },
  {
    id: 'ho-so-so-hoa',
    title: 'Hồ sơ số hóa',
    path: '/employee/ho-so-ca-nhan/ho-so-so-hoa',
    icon: DigitalProfileIcon,
  },
  {
    id: 'ly-lich-vien-chuc',
    title: 'Lý lịch viên chức',
    path: '/employee/ho-so-ca-nhan/ly-lich-vien-chuc',
    icon: StaffRecordIcon,
  },
  {
    id: 'bo-sung-ly-lich',
    title: 'Bổ sung lý lịch viên chức',
    path: '/employee/ho-so-ca-nhan/bo-sung-ly-lich',
    icon: StaffRecordIcon,
  },
]

export function findProfileSection(sectionId) {
  return profileSections.find((section) => section.id === sectionId)
}
