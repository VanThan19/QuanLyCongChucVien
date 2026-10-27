import { Navigate } from 'react-router-dom'
import DigitalFilePage from './pages/DigitalFilePage'
import FamilyRelationPage from './pages/FamilyRelationPage'
import ForeignLanguagePage from './pages/ForeignLanguagePage'
import PersonalInfoPage from './pages/PersonalInfoPage'
import PositionHistoryPage from './pages/PositionHistoryPage'
import StaffRecordPage from './pages/StaffRecordPage'
import StaffRecordSupplementPage from './pages/StaffRecordSupplementPage'
import TrainingHistoryPage from './pages/TrainingHistoryPage'
import WorkHistoryPage from './pages/WorkHistoryPage'
import PersonalProfile from './pages/PersonalProfile'
import ProfileSectionPage from './pages/ProfileSectionPage'

export const employeeRoutes = {
  path: 'employee',
  children: [
    { index: true, element: <Navigate to="ho-so-ca-nhan" replace /> },
    { path: 'ho-so-ca-nhan', element: <PersonalProfile /> },
    { path: 'ho-so-ca-nhan/thong-tin', element: <PersonalInfoPage /> },
    { path: 'ho-so-ca-nhan/quan-he-gia-dinh', element: <FamilyRelationPage /> },
    { path: 'ho-so-ca-nhan/qua-trinh-dao-tao', element: <TrainingHistoryPage /> },
    { path: 'ho-so-ca-nhan/qua-trinh-cong-tac', element: <WorkHistoryPage /> },
    { path: 'ho-so-ca-nhan/ngoai-ngu', element: <ForeignLanguagePage /> },
    { path: 'ho-so-ca-nhan/lich-su-chuc-vu', element: <PositionHistoryPage /> },
    { path: 'ho-so-ca-nhan/ho-so-so-hoa', element: <DigitalFilePage /> },
    { path: 'ho-so-ca-nhan/ly-lich-vien-chuc', element: <StaffRecordPage /> },
    { path: 'ho-so-ca-nhan/bo-sung-ly-lich', element: <StaffRecordSupplementPage /> },
    { path: 'ho-so-ca-nhan/:sectionId', element: <ProfileSectionPage /> },
  ],
}
