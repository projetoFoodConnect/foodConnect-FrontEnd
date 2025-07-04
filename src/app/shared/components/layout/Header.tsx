import {
    ChevronDown,
    Heart,
    Package,
    UserCircle,
    Building2,
    Home,
    LogOut,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../features/auth/contexts/AuthContext'

export function Header() {

    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }
    const location = useLocation()

    const isActive = (path: string) => {
        return location.pathname.startsWith(path)
    }
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 py-5 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center gap-2 text-green-800 font-bold text-xl">
                    <Heart className="w-6 h-6 fill-green-800" />
                    <span>FoodConnect</span>
                </div>

                {/* Navegação */}
                <nav className="hidden md:flex items-center gap-6 text-base">
                    <a
                        href="/home"
                        className={`flex items-center gap-1 px-2 py-1 rounded 
                        ${isActive('/home') ? 'bg-green-50 text-green-800 border border-green-200' : 'text-gray-700 hover:text-green-800'}`}
                    >
                        <Home className="w-5 h-5" /> Home
                    </a>
                    <a
                        href="/produtos/doador"
                        className={`flex items-center gap-1 px-2 py-1 rounded 
                        ${isActive('/produtos') ? 'bg-green-50 text-green-800 border border-green-200' : 'text-gray-700 hover:text-green-800'}`}
                    >
                        <Package className="w-5 h-5" /> Produtos
                    </a>
                    <a
                        href="/doacoes"
                        className={`flex items-center gap-1 px-2 py-1 rounded
                        ${isActive('/doacoes') ? 'bg-green-50 text-green-800 border border-green-200' : 'text-gray-700 hover:text-green-800'}`}
                    >
                        <Heart className="w-5 h-5" /> Doações
                    </a>
                </nav>

                {/* Ações à direita */}
                <div className="flex items-center gap-4">
                    {/* Papel do usuário */}
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        <Building2 className="w-5 h-5" /> Doador
                    </div>

                    {/* Notificações */}
                    {/* <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </div> */}

                    {/* Usuário */}
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
            </div>
        </header >
    )
}
