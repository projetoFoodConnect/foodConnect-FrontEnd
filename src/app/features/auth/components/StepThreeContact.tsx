import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface StepThreeContactProps {
  formData: {
    nome?: string
    email?: string
    telefone?: string
    senha?: string
    confirmarSenha?: string
    termosAceitos?: boolean
  }
  atualizarDados: (data: Partial<StepThreeContactProps['formData']>) => void
  onVoltar: () => void
}

export default function StepThreeContact({ formData, atualizarDados, onVoltar }: StepThreeContactProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)
  const [erro, setErro] = useState('')

  const handleSubmit = () => {
    const { nome, email, telefone, senha, confirmarSenha, termosAceitos } = formData

    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    if (!termosAceitos) {
      setErro('Você precisa aceitar os termos de uso.')
      return
    }

    setErro('')
    // Aqui você pode chamar o serviço de cadastro
    console.log('ENVIAR PARA API:', formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Informações de Contato</h2>
        <p className="text-sm text-gray-500">Dados pessoais</p>
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <div className="space-y-4">
        {/* Nome */}
        <div>
          <label className="text-sm font-medium">Nome Completo *</label>
          <input
            type="text"
            value={formData.nome || ''}
            onChange={(e) => atualizarDados({ nome: e.target.value })}
            className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
          />
        </div>

        {/* E-mail + Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">E-mail *</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => atualizarDados({ email: e.target.value })}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Telefone *</label>
            <input
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.telefone || ''}
              onChange={(e) => atualizarDados({ telefone: e.target.value })}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Senhas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Senha *</label>
            <div className="relative">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Mínimo 8 caracteres"
                value={formData.senha || ''}
                onChange={(e) => atualizarDados({ senha: e.target.value })}
                className="w-full mt-1 border rounded-md px-4 py-2 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Confirmar Senha *</label>
            <div className="relative">
              <input
                type={mostrarConfirmar ? 'text' : 'password'}
                placeholder="Digite a senha novamente"
                value={formData.confirmarSenha || ''}
                onChange={(e) => atualizarDados({ confirmarSenha: e.target.value })}
                className="w-full mt-1 border rounded-md px-4 py-2 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {mostrarConfirmar ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Termos */}
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={formData.termosAceitos || false}
            onChange={(e) => atualizarDados({ termosAceitos: e.target.checked })}
          />
          Eu aceito os <a href="#" className="text-green-700 hover:underline font-medium">Termos de Uso</a> e a <a href="#" className="text-green-700 hover:underline font-medium">Política de Privacidade</a> da DoaçãoConnect
        </label>
      </div>

      {/* Botões */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onVoltar}
          className="text-sm text-gray-700 hover:underline"
        >
          ← Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md font-medium"
        >
          Criar Conta
        </button>
      </div>
    </div>
  )
}
