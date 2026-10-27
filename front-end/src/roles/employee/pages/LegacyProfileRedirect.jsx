import { Navigate, useParams } from 'react-router-dom'

export default function LegacyProfileRedirect() {
  const { sectionId } = useParams()
  const target = sectionId
    ? `/employee/ho-so-ca-nhan/${sectionId}`
    : '/employee/ho-so-ca-nhan'

  return <Navigate to={target} replace />
}
