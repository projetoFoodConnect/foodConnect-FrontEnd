import { Check, HandHelping, PackageSearch } from 'lucide-react'
import type { JSX } from 'react'
import type { FormDataCadastro, PerfilUsuario } from '../types/auth.types'


interface StepOneProfileProps {
  formData: FormDataCadastro
  atualizarDados: (data: Partial<FormDataCadastro>) => void
  onContinuar: () => void
}

export default function StepOneProfile({ formData, atualizarDados, onContinuar }: StepOneProfileProps) {
  const selecionado = formData.perfilUsuario

  const CardPerfil = ({
    tipo,
    titulo,
    descricao,
    icone,
    isSelecionado
  }: {
    tipo: PerfilUsuario
    titulo: string
    descricao: string[]
    icone: JSX.Element
    isSelecionado: boolean
  }) => (
    <button
      type="button"
      onClick={() => atualizarDados({ perfilUsuario: tipo })}
      className={`flex flex-col items-start w-full border rounded-xl p-4 text-left shadow-sm transition hover:border-green-700 ${
        isSelecionado ? 'border-green-700 bg-green-50' : 'border-gray-300 bg-white'
      }`}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center gap-2 text-green-800 font-semibold">
          {icone}
          {titulo}
        </div>
        {isSelecionado && <Check className="text-green-700" />}
      </div>
      <ul className="text-sm text-gray-600 pl-6 list-disc">
        {descricao.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </button>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Tipo de Conta</h2>
        <p className="text-sm text-gray-500">Escolha seu perfil</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <CardPerfil
          tipo="DOADOR"
          titulo="Sou Doador"
          descricao={[
            'Cadastrar produtos disponíveis',
            'Gerenciar doações',
            'Acompanhar entregas',
            'Relatórios de impacto',
          ]}
          icone={<PackageSearch size={20} />}
          isSelecionado={selecionado === 'DOADOR'}
        />
        <CardPerfil
          tipo="RECEPTOR"
          titulo="Sou Beneficiário"
          descricao={[
            'Buscar produtos disponíveis',
            'Reservar doações',
            'Agendar coletas',
            'Histórico de recebimentos',
          ]}
          icone={<HandHelping size={20} />}
          isSelecionado={selecionado === 'RECEPTOR'}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onContinuar}
          disabled={!selecionado}
          className={`bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-md flex items-center gap-2 transition ${
            !selecionado ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continuar →
        </button>
      </div>

      <p className="text-sm text-center text-gray-600">
        Já tem uma conta?{' '}
        <a href="/" className="text-green-700 hover:underline font-medium">
          Fazer login
        </a>
      </p>
    </div>
  )
}
