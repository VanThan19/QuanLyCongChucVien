import UnitManagerHome from './pages/UnitManagerHome'

export const unitManagerRoutes = {
  path: 'unit-manager',
  children: [{ index: true, element: <UnitManagerHome /> }],
}
