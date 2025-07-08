import { useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Heart, Package, Home, ChevronDown, UserCircle, Menu } from 'lucide-react'
import { useState } from 'react'
import { getHomePathByPerfil, getProdutosPathByPerfil, getDoacoesPathByPerfil } from '../../utils/redirectByPerfil'
import { useAuth } from '../../../features/auth/hooks/useAuth'
import Logo from '../../../assets/logo-green.png'

export function Header() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    if (!user) return null

    const perfil = user.perfilUsuario

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

    const handleMenuToggle = () => setMenuOpen((prev) => !prev)
    const handleNavigate = (path: string) => {
        navigate(path)
        setMenuOpen(false)
    }

    return (
        <header className="w-full bg-white shadow-sm px-4 md:px-6 py-3 flex justify-between items-center relative">
            {/* Logo + Marca */}
            <div
                className="font-bold text-lg cursor-pointer flex items-center gap-2"
                onClick={() => navigate(rotas.home)}
            >
                <img src={Logo} alt="Logo FoodConnect" className="ml-2 md:ml-12 w-14 h-12 md:w-18 md:h-16" />
            </div>

            {/* Mobile menu button */}
            <button
                className="md:hidden flex items-center p-2 rounded hover:bg-gray-100"
                onClick={handleMenuToggle}
                aria-label="Abrir menu"
            >
                <Menu className="w-7 h-7 text-green-800" />
            </button>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex gap-4 items-center">
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

            {/* Perfil e Logout Desktop */}
            <div className="hidden md:flex items-center gap-3">
                <button
                    onClick={() => navigate('/perfil')}
                    className="flex items-center gap-1 rounded-full px-2 py-1 hover:bg-green-50 transition text-gray-700 border border-gray-200"
                >
                    <UserCircle className="w-6 h-6 text-green-800" />
                    <ChevronDown className="w-4 h-4 text-green-700" />
                </button>

                {/* Botão Sair */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition"
                >
                    <LogOut className="w-4 h-4" />
                    Sair
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start z-50 md:hidden animate-fade-in">
                    <button
                        onClick={() => handleNavigate(rotas.home)}
                        className={`w-full flex items-center gap-2 px-5 py-3 border-b text-base ${rotaAtiva(rotas.home)
                            ? 'bg-green-100 text-green-900'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <Home size={18} />
                        Home
                    </button>
                    <button
                        onClick={() => handleNavigate(rotas.produtos)}
                        className={`w-full flex items-center gap-2 px-5 py-3 border-b text-base ${rotaAtiva(rotas.produtos)
                            ? 'bg-green-100 text-green-900'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <Package size={18} />
                        Produtos
                    </button>
                    <button
                        onClick={() => handleNavigate(rotas.doacoes)}
                        className={`w-full flex items-center gap-2 px-5 py-3 border-b text-base ${rotaAtiva(rotas.doacoes)
                            ? 'bg-green-100 text-green-900'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <Heart size={18} />
                        Doações
                    </button>
                    <button
                        onClick={() => handleNavigate('/perfil')}
                        className="w-full flex items-center gap-2 px-5 py-3 border-b text-base text-gray-700 hover:bg-green-50"
                    >
                        <UserCircle className="w-6 h-6 text-green-800" />
                        Perfil
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-5 py-3 text-base text-gray-600 hover:text-red-600"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair
                    </button>
                </div>
            )}
        </header>
    )
}
