import { Package, Heart, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../../../shared/components/layout/Layout'
import { useAuth } from '../../../auth/contexts/AuthContext'

export function DoadorHome() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Título e saudação */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Olá, {user?.nome || 'Doador'}! 👋
          </h1>
          <p className="text-sm text-gray-500">Bem-vindo de volta ao FoodConnect. Aqui está um resumo das suas atividades:</p>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total de Produtos */}
          <div className="bg-white border rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Produtos cadastrados</p>
              <p className="text-xl font-bold text-green-800">6</p>
            </div>
          </div>

          {/* Total de Doações */}
          <div className="bg-white border rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="w-6 h-6 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Doações realizadas</p>
              <p className="text-xl font-bold text-red-800">4</p>
            </div>
          </div>
        </div>

        {/* Acesso rápido */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/produtos/doador')}
            className="flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded hover:bg-green-800"
          >
            Ver meus produtos <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/doacoes/doador')}
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded hover:bg-red-700"
          >
            Ver minhas doações <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Layout>
  )
}