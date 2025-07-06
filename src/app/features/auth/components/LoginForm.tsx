import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

const handleSubmit = async () => {
  try {
    console.log('Iniciando login...')
    await login({ email, senha }) 
    console.log('Login bem-sucedido')
    navigate('/home')
  } catch (error) {
    console.error('Erro no login:', error)
    setErro('Email ou senha inválidos')
  }
}


  return (
    <div className="space-y-4">
      {erro && <p className="text-red-600 text-sm">{erro}</p>}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full border rounded px-4 py-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-700 text-white px-4 py-2 rounded w-full"
      >
        Entrar
      </button>
    </div>
  )
}
