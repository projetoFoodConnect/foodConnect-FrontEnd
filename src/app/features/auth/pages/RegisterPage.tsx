import { useState } from 'react'
import StepOneProfile from '../components/StepOneProfile'
import StepTwoOrganization from '../components/StepTwoOrganization'
import StepThreeContact from '../components/StepThreeContact'
import type { FormDataCadastro } from '../types/auth.types'

export function RegisterPage() {
  const [etapaAtual, setEtapaAtual] = useState(1)
  const [formData, setFormData] = useState<FormDataCadastro>({
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  })
  const irParaProximaEtapa = () => setEtapaAtual((prev) => prev + 1)
  const voltarEtapa = () => setEtapaAtual((prev) => prev - 1)

  const atualizarDados = (novosDados: Partial<FormDataCadastro>) => {
    setFormData((prev) => ({
      ...prev,
      ...novosDados,
      endereco: {
        ...prev.endereco,
        ...novosDados.endereco
      }
    }))
  }


  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      {/* Header com logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">FoodConnect</h1>
        <p className="text-sm text-gray-600">
          Conectando doadores e beneficiários para um mundo sem desperdício
        </p>
      </div>

      {/* Card central */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 space-y-8">
        {/* Etapas do progresso */}
        <div className="flex justify-center items-center gap-6">
          {[1, 2, 3].map((etapa, i) => (
            <div key={etapa} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${etapa === etapaAtual
                    ? 'bg-green-700 text-white'
                    : etapa < etapaAtual
                      ? 'bg-green-200 text-green-800'
                      : 'bg-green-100 text-green-800'}`}
              >
                {etapa}
              </div>
              <div className="text-xs text-center">
                <div className="font-medium">
                  {etapa === 1 && 'Tipo de Conta'}
                  {etapa === 2 && 'Dados da Organização'}
                  {etapa === 3 && 'Informações de Contato'}
                </div>
                <div className="text-gray-500">
                  {etapa === 1 && 'Escolha seu perfil'}
                  {etapa === 2 && 'Informações básicas'}
                  {etapa === 3 && 'Dados pessoais'}
                </div>
              </div>
              {i < 2 && <div className="w-10 h-px bg-green-200" />}
            </div>
          ))}
        </div>

        {/* Formulário de Etapas */}
        {etapaAtual === 1 && (
          <StepOneProfile
            formData={formData}
            atualizarDados={atualizarDados}
            onContinuar={irParaProximaEtapa}
          />
        )}
        {etapaAtual === 2 && (
          <StepTwoOrganization
            formData={formData}
            atualizarDados={atualizarDados}
            onContinuar={irParaProximaEtapa}
            onVoltar={voltarEtapa}
          />
        )}
        {etapaAtual === 3 && (
          <StepThreeContact
            formData={formData}
            atualizarDados={atualizarDados}
            onVoltar={voltarEtapa}
          />
        )}
      </div>
    </div>
  )
}
