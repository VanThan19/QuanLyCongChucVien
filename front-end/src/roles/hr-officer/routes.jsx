import HrOfficerHome from './pages/HrOfficerHome'
import StaffDirectoryPage from './pages/StaffDirectoryPage'
import StaffPersonalDetailPage from './pages/StaffPersonalDetailPage'

export const hrOfficerRoutes = {
  path: 'hr-officer',
  children: [
    { index: true, element: <StaffDirectoryPage /> },
    { path: 'danh-sach-can-bo', element: <StaffDirectoryPage /> },
    { path: 'danh-sach-can-bo/:staffId', element: <StaffPersonalDetailPage /> },
    { path: 'gioi-thieu', element: <HrOfficerHome /> },
  ],
}
