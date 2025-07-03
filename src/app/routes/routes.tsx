import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import DoadorDashboard from '../features/dashboard/pages/DoadorDashboard'
import { useAuth } from '../features/auth/contexts/AuthContext'
import AdminDashboard from '../features/dashboard/pages/AdminDashboard'
import BeneficiarioDashboard from '../features/dashboard/pages/BeneficiarioDashboard'

function DashboardRouter() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/" replace />

  switch (user.perfilUsuario) {
    case 'DOADOR':
      return <DoadorDashboard />
    case 'RECEPTOR':
      return <BeneficiarioDashboard />
    case 'ADMINISTRADOR':
      return <AdminDashboard />
    default:
      return <Navigate to="/" replace />
  }
}

export default function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardRouter />} />
      </Routes>
    </BrowserRouter>
  )
}
