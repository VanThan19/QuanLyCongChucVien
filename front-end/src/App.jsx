import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import { adminRoutes } from '@/roles/admin/routes'
import { employeeRoutes } from '@/roles/employee/routes'
import LegacyProfileRedirect from '@/roles/employee/pages/LegacyProfileRedirect'
import { hrManagerRoutes } from '@/roles/hr-manager/routes'
import { hrOfficerRoutes } from '@/roles/hr-officer/routes'
import { unitManagerRoutes } from '@/roles/unit-manager/routes'
import { AuthProvider } from '@/shared/auth/AuthProvider'
import HomePage from '@/shared/pages/HomePage'
import LoginPage from '@/shared/pages/login/LoginPage'

function AppRoutes() {
  return useRoutes([
    { path: '/dang-nhap', element: <LoginPage /> },
    { path: '/', element: <HomePage /> },
    adminRoutes,
    hrManagerRoutes,
    unitManagerRoutes,
    hrOfficerRoutes,
    employeeRoutes,
    { path: '/ho-so-ca-nhan', element: <LegacyProfileRedirect /> },
    { path: '/ho-so-ca-nhan/:sectionId', element: <LegacyProfileRedirect /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ])
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
