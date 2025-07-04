import { useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Heart, Package, Home, ChevronDown, UserCircle } from 'lucide-react'
import { useAuth } from '../../../features/auth/contexts/AuthContext'
import { getHomePathByPerfil, getProdutosPathByPerfil, getDoacoesPathByPerfil } from '../../utils/redirectByPerfil'

export function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    if (!user) return null

    const perfil = user.perfilUsuario
    const nome = user.nome || 'Usuário'

    const rotas = {
        home: getHomePathByPerfil(perfil),
        produtos: getProdutosPathByPerfil(perfil),
        doacoes: getDoacoesPathByPerfil(perfil),
    }

    const rotaAtiva = (path: string) => location.pathname === path

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
            {/* Logo + Marca */}
            <div
                className="text-green-800 font-bold text-lg cursor-pointer flex items-center gap-2"
                onClick={() => navigate(rotas.home)}
            >
                <span className="bg-green-100 p-1 rounded-lg">
                    <Heart className="w-5 h-5 text-green-700" />
                </span>
                FoodConnect
            </div>

            {/* Navegação */}
            <nav className="flex gap-4 items-center">
                <button
                    onClick={() => navigate(rotas.home)}
                    className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md border ${rotaAtiva(rotas.home)
                            ? 'bg-green-100 text-green-900 border-green-300'
                            : 'text-gray-700 border-transparent hover:bg-gray-100'
                        }`}
                >
                    <Home size={16} />
                    Home
                </button>

                <button
                    onClick={() => navigate(rotas.produtos)}
                    className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md border ${rotaAtiva(rotas.produtos)
                            ? 'bg-green-100 text-green-900 border-green-300'
                            : 'text-gray-700 border-transparent hover:bg-gray-100'
                        }`}
                >
                    <Package size={16} />
                    Produtos
                </button>

                <button
                    onClick={() => navigate(rotas.doacoes)}
                    className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md border ${rotaAtiva(rotas.doacoes)
                            ? 'bg-green-100 text-green-900 border-green-300'
                            : 'text-gray-700 border-transparent hover:bg-gray-100'
                        }`}
                >
                    <Heart size={16} />
                    Doações
                </button>
            </nav>

            {/* Perfil e Logout */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full px-2 py-1">
                    <UserCircle className="w-6 h-6 text-green-800" />
                    <ChevronDown className="w-4 h-4 text-green-700" />
                </div>

                {/* Botão Sair */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </div>
        </header>
    )
}
