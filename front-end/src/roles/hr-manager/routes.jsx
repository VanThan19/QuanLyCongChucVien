import HrManagerHome from './pages/HrManagerHome'

export const hrManagerRoutes = {
  path: 'hr-manager',
  children: [{ index: true, element: <HrManagerHome /> }],
}
