import { useState } from 'react'
import StepOneProfile from '../components/StepOneProfile'
import StepTwoOrganization from '../components/StepTwoOrganization'
import StepThreeContact from '../components/StepThreeContact'

type PerfilUsuario = 'DOADOR' | 'BENEFICIARIO'

interface FormData {
    perfilUsuario?: PerfilUsuario
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
    nome?: string
    email?: string
    telefone?: string
    senha?: string
    confirmarSenha?: string
    termosAceitos?: boolean
}

export default function RegisterPage() {
    const [etapaAtual, setEtapaAtual] = useState(1)
    const [formData, setFormData] = useState<FormData>({})

    const irParaProximaEtapa = () => setEtapaAtual((prev) => prev + 1)
    const voltarEtapa = () => setEtapaAtual((prev) => prev - 1)

    const atualizarDados = (novosDados: Partial<FormData>) => {
        setFormData((prev) => ({
            ...prev,
            ...novosDados,
            endereco: {
                ...prev.endereco,
                ...novosDados.endereco,
            },
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cabeçalho */}
            <header className="flex items-center justify-between px-6 py-4 bg-white">
                <a href="/"
                    className="text-sm text-gray-600 hover:text-green-700 flex items-center gap-1 disabled:opacity-50">
                    <span className="text-lg">←</span>
                    Voltar ao Login
                </a>
                <div className="flex items-center gap-2">
                    <div className="bg-green-700 p-1.5 rounded-md">
                        <img src="/FoodConnect.png" alt="Logo" className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-green-800 font-semibold text-base">FoodConnect</span>
                </div>
            </header>

            {/* Etapas do progresso */}
            <section className="bg-gray-50 py-8">
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
            </section>

            {/* Card central com conteúdo */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 my-6">
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
