import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [lembrar, setLembrar] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await login({ email, senha })
            console.log('Resposta da API:', response)

            loginUser(response.user) // 👈 Isso vem do AuthContext
            navigate('/') // ou dashboard, dependendo do seu fluxo
        } catch (error: any) {
            console.error('Erro ao fazer login:', error)
            setErro('E-mail ou senha inválidos.')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo e cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-green-800">FoodConnect</h1>
                    <p className="text-sm text-gray-600">
                        Conectando doadores e beneficiários para um mundo sem desperdício
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-6">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-900">Bem-vindo de volta</h2>
                        <p className="text-sm text-gray-500">Entre na sua conta para continuar</p>
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    {/* E-mail */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">E-mail</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type={mostrarSenha ? 'text' : 'password'}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full pl-10 pr-10 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute right-3 top-3.5 text-gray-400"
                            >
                                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Opções */}
                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} />
                            Lembrar de mim
                        </label>
                        <button type="button" className="text-green-700 hover:underline">
                            Esqueci minha senha
                        </button>
                    </div>

                    {/* Botão entrar */}
                    <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800 text-white font-medium w-full py-2 rounded-md flex items-center justify-center gap-2 transition"
                    >
                        <LogIn className="w-5 h-5" />
                        Entrar
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        Não tem uma conta?{' '}
                        <Link to="/register" className="text-green-700 hover:underline font-medium">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
