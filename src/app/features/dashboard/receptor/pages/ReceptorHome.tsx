import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, CalendarCheck, Clock } from 'lucide-react'

import { Layout } from '../../../../shared/components/layout/Layout'
import { useAuth } from '../../../auth/contexts/AuthContext'
import { getMinhasDoacoes } from '../../../../shared/services/doacaoService'
import type { Doacao } from '../../../../shared/types/shared.types'

export default function ReceptorHome() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [doacoes, setDoacoes] = useState<Doacao[]>([])

  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await getMinhasDoacoes()
        setDoacoes(data.doacoes) 
      } catch (error) {
        console.error('Erro ao carregar doações:', error)
      }
    }

    carregar()
  }, [])

  const recebidas = doacoes.filter((d) => d.status === 'RECEBIDA').length
  const pendentes = doacoes.filter((d) => d.status === 'PENDENTE').length
  const total = doacoes.length

  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* Cabeçalho */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Olá, {user?.nome || 'Receptor'}! 👋
          </h1>
          <p className="text-gray-500">Bem-vindo de volta ao FoodConnect. Aqui está um resumo das suas atividades:</p>
        </div>

        {/* Resumo das Atividades */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border rounded-xl p-4 bg-green-50 flex items-center gap-4">
            <Package className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-green-900">{total}</p>
              <p className="text-sm text-gray-600">Reservas realizadas</p>
            </div>
          </div>

          <div className="border rounded-xl p-4 bg-green-50 flex items-center gap-4">
            <CalendarCheck className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-green-900">{recebidas}</p>
              <p className="text-sm text-gray-600">Reservas recebidas</p>
            </div>
          </div>

          <div className="border rounded-xl p-4 bg-green-50 flex items-center gap-4">
            <Clock className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-green-900">{pendentes}</p>
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
