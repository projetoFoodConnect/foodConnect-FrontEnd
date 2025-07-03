import { useState } from 'react'

interface StepTwoOrganizationProps {
  formData: {
    nomeOrganizacao?: string
    tipoOrganizacao?: string
    endereco?: {
      cep?: string
      rua?: string
      numero?: string
      complemento?: string
      bairro?: string
      cidade?: string
      estado?: string
    }
  }
  atualizarDados: (data: Partial<StepTwoOrganizationProps['formData']>) => void
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

  const handleChange = (field: string, value: string) => {
    atualizarDados({
      ...formData,
      endereco: {
        ...formData.endereco,
        [field]: value
      }
    })
  }

  const handleSubmit = () => {
    const { nomeOrganizacao, tipoOrganizacao, endereco } = formData
    if (
      !nomeOrganizacao ||
      !tipoOrganizacao ||
      !endereco?.cep ||
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
      <div>
        <h2 className="text-xl font-semibold">Dados da Organização</h2>
        <p className="text-sm text-gray-500">Informações básicas</p>
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      {/* Nome + tipo */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Nome da Organização *</label>
          <input
            type="text"
            placeholder="Ex: Restaurante Sabor & Arte"
            value={formData.nomeOrganizacao || ''}
            onChange={(e) => atualizarDados({ nomeOrganizacao: e.target.value })}
            className="w-full mt-1 border rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tipo de Organização *</label>
          <select
            value={formData.tipoOrganizacao || ''}
            onChange={(e) => atualizarDados({ tipoOrganizacao: e.target.value })}
            className="w-full mt-1 border rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">Selecione uma opção</option>
            <option value="ONG">ONG</option>
            <option value="Igreja">Igreja</option>
            <option value="Instituição Pública">Instituição Pública</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      {/* Endereço */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm">Endereço da Organização</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">CEP *</label>
            <input
              type="text"
              placeholder="00000-000"
              value={formData.endereco?.cep || ''}
              onChange={(e) => handleChange('cep', e.target.value)}
              className="w-full mt-1 border rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Endereço *</label>
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
            <label className="text-sm font-medium">Complemento</label>
            <input
              type="text"
              value={formData.endereco?.complemento || ''}
              onChange={(e) => handleChange('complemento', e.target.value)}
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
          Continuar →
        </button>
      </div>
    </div>
  )
}
