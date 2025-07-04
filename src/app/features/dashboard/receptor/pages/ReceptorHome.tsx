import { Package, CalendarCheck, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../auth/contexts/AuthContext'
import { Layout } from '../../../../shared/components/layout/Layout'

export function ReceptorHome() {
  const { user } = useAuth()
  const navigate = useNavigate()

return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* Cabeçalho */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Olá, {user?.nome || 'Receptor'}!👋
          </h1>
          <p className="text-gray-600">Encontre e reserve alimentos disponíveis para sua instituição</p>
        </div>

        {/* Resumo das Atividades */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border rounded-xl p-4 bg-green-50 flex items-center gap-4">
            <Package className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-green-900">112</p>
              <p className="text-sm text-gray-600">Produtos disponíveis</p>
            </div>
          </div>

          <div className="border rounded-xl p-4 bg-green-50 flex items-center gap-4">
            <CalendarCheck className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-green-900">34</p>
              <p className="text-sm text-gray-600">Reservas este mês</p>
            </div>
          </div>

          <div className="border rounded-xl p-4 bg-green-50 flex items-center gap-4">
            <Clock className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-green-900">5</p>
              <p className="text-sm text-gray-600">Pendentes de coleta</p>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/produtos/beneficiario')}
            className="border rounded-xl p-4 bg-white hover:bg-green-50 transition text-left"
          >
            <p className="font-medium text-green-800">Ver Produtos</p>
            <p className="text-sm text-gray-600">Veja os alimentos disponíveis</p>
          </button>

          <button
            onClick={() => navigate('/doacoes/beneficiario')}
            className="border rounded-xl p-4 bg-white hover:bg-green-50 transition text-left"
          >
            <p className="font-medium text-green-800">Ver Reservas</p>
            <p className="text-sm text-gray-600">Acompanhe suas coletas agendadas</p>
          </button>

          <button
            onClick={() => navigate('/doacoes/beneficiario')}
            className="border rounded-xl p-4 bg-white hover:bg-green-50 transition text-left"
          >
            <p className="font-medium text-green-800">Histórico de Coletas</p>
            <p className="text-sm text-gray-600">Veja todas as coletas realizadas</p>
          </button>
        </div>
      </div>
    </Layout>
  )
}