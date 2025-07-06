import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { getHomePathByPerfil } from '../../../shared/utils/redirectByPerfil'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
    const { login, user } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [lembrar, setLembrar] = useState(false)
    const [erro, setErro] = useState('')
    const irCadastro = () => navigate('/register')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro('')

        try {
            await login({ email, senha })
            if (user && user.perfilUsuario) {
                navigate(getHomePathByPerfil(user.perfilUsuario))
            }
        } catch (err) {
            console.error(err)
            setErro('E-mail ou senha inválidos.')
        }
    }

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4">
            {/* Logo e título */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-green-800">FoodConnect</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Conectando doadores e beneficiários para um mundo sem desperdício
                </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md space-y-6 border border-gray-100">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">Bem-vindo de volta</h2>
                    <p className="text-sm text-gray-500">Entre na sua conta para continuar</p>
                </div>

                {erro && (
                    <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded">{erro}</div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* E-mail */}
                    <div>
                        <label className="text-sm font-medium">E-mail</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <Mail size={16} />
                            </span>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border rounded-md px-10 py-2 text-sm focus:ring-2 focus:ring-green-600"
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="text-sm font-medium">Senha</label>
                        <div className="relative mt-1">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <Lock size={16} />
                            </span>
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full border rounded-md px-10 py-2 text-sm pr-10 focus:ring-2 focus:ring-green-600"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Lembrar e Esqueci */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={lembrar}
                                onChange={(e) => setLembrar(e.target.checked)}
                            />
                            Lembrar de mim
                        </label>
                        <a href="#" className="text-green-700 hover:underline">Esqueci minha senha</a>
                    </div>

                    {/* Botão Entrar */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white rounded-md py-2 font-medium flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} />
                        Entrar
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Não tem uma conta?{' '}
                    <a onClick={irCadastro} className="text-green-700 hover:underline font-medium">
                        Cadastre-se
                    </a>
                </p>
            </div>
        </div>
    )
}
