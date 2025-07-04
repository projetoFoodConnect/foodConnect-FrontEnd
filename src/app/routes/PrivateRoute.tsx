import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/contexts/AuthContext'

interface Props {
  children: JSX.Element
}

export function PrivateRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/" replace />
}