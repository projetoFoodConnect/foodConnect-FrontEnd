import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/contexts/AuthContext'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import { DoadorHome } from '../features/dashboard/doador/pages/DoadorHome'
import { PrivateRoute } from './PrivateRoute'

import { getPathByPerfil } from '../shared/utils/redirectByPerfil'
import ReceptorProdutos from '../features/dashboard/receptor/pages/ReceptorProdutos'
import ReceptorDoacoes from '../features/dashboard/receptor/pages/ReceptorDoacoes'
import ReceptorHome from '../features/dashboard/receptor/pages/ReceptorHome'
import { DoadorProdutos } from '../features/dashboard/doador/pages/DoadorProdutos'
import DoadorDoacoes from '../features/dashboard/doador/pages/DoadorDoacoes'
import PerfilPage from '../features/dashboard/common/pages/PerfilPage'

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial = Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Redirecionamento de perfil */}
        <Route
          path="/home"
          element={
            isAuthenticated && user?.perfilUsuario
              ? <Navigate to={getPathByPerfil(user.perfilUsuario, 'home')} replace />
              : null
          }
        />

        <Route
          path="/produtos"
          element={
            isAuthenticated && user?.perfilUsuario
              ? <Navigate to={getPathByPerfil(user.perfilUsuario, 'produtos')} replace />
              : null
          }
        />
        <Route
          path="/doacoes"
          element={
            isAuthenticated && user?.perfilUsuario
              ? <Navigate to={getPathByPerfil(user.perfilUsuario, 'doacoes')} replace />
              : null
          }
        />

        <Route path='/perfil' element={<PrivateRoute><PerfilPage /></PrivateRoute>} />

        <Route path="/register" element={<RegisterPage />} />
        {/* Rotas do DOADOR */}
        <Route path="/home/doador" element={<PrivateRoute><DoadorHome /></PrivateRoute>} />
        <Route path="/produtos/doador" element={<PrivateRoute><DoadorProdutos /></PrivateRoute>} />
        <Route path="/doacoes/doador" element={<PrivateRoute><DoadorDoacoes /></PrivateRoute>} />

        {/* Rotas do RECEPTOR */}
        <Route path="/home/beneficiario" element={<PrivateRoute><ReceptorHome /></PrivateRoute>} />
        <Route path="/produtos/beneficiario" element={<PrivateRoute><ReceptorProdutos /></PrivateRoute>} />
        <Route path="/doacoes/beneficiario" element={<PrivateRoute><ReceptorDoacoes /></PrivateRoute>} />


        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}