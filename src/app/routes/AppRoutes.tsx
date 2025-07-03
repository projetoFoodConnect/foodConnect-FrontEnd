import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/contexts/AuthContext'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import AdminDashboard from '../features/dashboard/pages/AdminDashboard'
import BeneficiarioDashboard from '../features/dashboard/pages/BeneficiarioDashboard'
import DoadorDashboard from '../features/dashboard/pages/DoadorDashboard'

// function DashboardRouter() {
//   const { user } = useAuth()

//   if (!user) return <Navigate to="/login" replace />

//   switch (user.perfilUsuario) {
//     case 'DOADOR':
//       return <DoadorDashboard />
//     case 'BENEFICIARIO':
//       return <BeneficiarioDashboard />
//     case 'ADMINISTRADOR':
//       return <AdminDashboard />
//     default:
//       return <Navigate to="/login" replace />
//   }
// }

export default function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
          }
        />

        <Route path="/dashboard" element={<DoadorDashboard />} />

        {/* Qualquer rota inválida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
