import { Navigate } from 'react-router-dom'
import type { JSX } from 'react/jsx-runtime'
import { useAuth } from '../features/auth/hooks/useAuth'

interface PrivateRouteProps {
  children: JSX.Element
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return <Navigate to="/" replace />
  if (!user) return null 

  return children
}
