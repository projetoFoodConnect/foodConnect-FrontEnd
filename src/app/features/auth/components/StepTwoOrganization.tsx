import { useState } from 'react'
import type { FormDataCadastro, Endereco } from '../types/auth.types'


interface StepTwoOrganizationProps {
  formData: FormDataCadastro
  atualizarDados: (data: Partial<FormDataCadastro>) => void
  onContinuar: () => void
  onVoltar: () => void
}

export default function StepTwoOrganization({
  formData,
  atualizarDados,
  onContinuar,
  onVoltar
}: StepTwoOrganizationProps) {
  const [erro, setErro] = useState('')

  function handleChange<K extends keyof Endereco>(field: K, value: Endereco[K]) {
    atualizarDados({
      endereco: {
        ...formData.endereco,
        [field]: value
      }
    })
  }

  const handleSubmit = () => {
    const { nomeOrganizacao, endereco } = formData

    if (
      !nomeOrganizacao ||
      !endereco?.rua ||
      !endereco?.numero ||
      !endereco?.bairro ||
      !endereco?.cidade ||
      !endereco?.estado
    ) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }

    setErro('')
    onContinuar()
  }

  return (
    <div className="space-y-6">
      <div className='text-center'>
        <h2 className="text-xl font-semibold">Dados da Organização</h2>
        <p className="text-sm text-gray-500">Informações básicas</p>
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      {/* Nome da Organização */}
      <div>
        <label className="text-sm font-medium">Nome da Organização *</label>
        <input
          type="text"
          placeholder="Ex: ONG Esperança"
          value={formData.nomeOrganizacao || ''}
          onChange={(e) => atualizarDados({ nomeOrganizacao: e.target.value })}
          className="w-full mt-1 border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Endereço */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm">Endereço da Organização</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Rua *</label>
            <input
              type="text"
              placeholder="Rua, Avenida..."
              value={formData.endereco?.rua || ''}
              onChange={(e) => handleChange('rua', e.target.value)}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Número *</label>
            <input
              type="text"
              value={formData.endereco?.numero || ''}
              onChange={(e) => handleChange('numero', e.target.value)}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Bairro *</label>
            <input
              type="text"
              value={formData.endereco?.bairro || ''}
              onChange={(e) => handleChange('bairro', e.target.value)}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Cidade *</label>
            <input
              type="text"
              value={formData.endereco?.cidade || ''}
              onChange={(e) => handleChange('cidade', e.target.value)}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Estado *</label>
            <input
              type="text"
              value={formData.endereco?.estado || ''}
              onChange={(e) => handleChange('estado', e.target.value)}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between pt-4">
        <button type="button" onClick={onVoltar} className="text-sm text-gray-700 hover:underline">
          ← Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md font-medium"
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}
