import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/contexts/AuthContext'

import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'

import { DoadorHome } from '../features/dashboard/doador/pages/DoadorHome'
import { DoadorProdutos } from '../features/dashboard/doador/pages/DoadorProdutos'
import { DoadorDoacoes } from '../features/dashboard/doador/pages/DoadorDoacoes'
import { PrivateRoute } from './PrivateRoute'
import { ReceptorProdutos } from '../features/dashboard/receptor/pages/ReceptorProdutos'
import { ReceptorDoacoes } from '../features/dashboard/receptor/pages/ReceptorDoacoes'
import { ReceptorHome } from '../features/dashboard/receptor/pages/ReceptorHome'


export default function AppRoutes() {
    const { isAuthenticated, user } = useAuth()

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />
                    }
                />

                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />}
                />

                {/* Redireciona /home conforme o perfil */}
                <Route
                    path="/home"
                    element={
                        isAuthenticated ? (
                            user?.perfilUsuario === 'DOADOR' ? (
                                <Navigate to="/home/doador" replace />
                            ) : user?.perfilUsuario === 'RECEPTOR' ? (
                                <Navigate to="/home/beneficiario" replace />
                            ) : (
                                <Navigate to="/home/admin" replace />
                            )
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                />

                {/* Rotas do DOADOR */}
                <Route
                    path="/home/doador"
                    element={
                        <PrivateRoute>
                            <DoadorHome />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/produtos/doador"
                    element={
                        <PrivateRoute>
                            <DoadorProdutos />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doacoes/doador"
                    element={
                        <PrivateRoute>
                            <DoadorDoacoes />
                        </PrivateRoute>
                    }
                />

                {/* Rotas do RECEPTOR */}
                <Route
                    path="/home/beneficiario"
                    element={
                        <PrivateRoute>
                            <ReceptorHome />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/produtos/beneficiario"
                    element={
                        <PrivateRoute>
                            <ReceptorProdutos />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/doacoes/beneficiario"
                    element={
                        <PrivateRoute>
                            <ReceptorDoacoes />
                        </PrivateRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}