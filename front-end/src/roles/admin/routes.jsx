import AdminHome from './pages/AdminHome'

export const adminRoutes = {
  path: 'admin',
  children: [{ index: true, element: <AdminHome /> }],
}
