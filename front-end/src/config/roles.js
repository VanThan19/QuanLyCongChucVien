export const ROLES = [
  {
    code: 'ADMIN',
    title: 'Quản trị hệ thống',
    description: 'Quản lý hệ thống, đơn vị, tài khoản và phân quyền',
    path: '/admin',
  },
  {
    code: 'HR_MANAGER',
    title: 'Quản lý nhân sự',
    description: 'Quản lý nghiệp vụ nhân sự và báo cáo theo phạm vi được cấp',
    path: '/hr-manager',
  },
  {
    code: 'UNIT_MANAGER',
    title: 'Quản lý đơn vị',
    description: 'Quản lý, xem xét hồ sơ trong đơn vị mình',
    path: '/unit-manager',
  },
  {
    code: 'HR_OFFICER',
    title: 'Cán bộ nhân sự',
    description: 'Nhập liệu, cập nhật và quản lý hồ sơ theo phạm vi được cấp',
    path: '/hr-officer',
  },
  {
    code: 'EMPLOYEE',
    title: 'Cán bộ, viên chức',
    description: 'Xem hồ sơ cá nhân và gửi yêu cầu cập nhật',
    path: '/employee/ho-so-ca-nhan',
  },
]
