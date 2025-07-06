import { useEffect, useState } from 'react'
import { Package, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../../../shared/components/layout/Layout'
import { listarMeusProdutos } from '../../../../shared/services/produtoService'
import { getMinhasDoacoes } from '../../../../shared/services/doacaoService'
import type { Produto, Doacao } from '../../../../shared/types/shared.types'
import { useAuth } from '../../../auth/hooks/useAuth'
import { FullPageLoader } from '../../../../shared/components/ui/FullPageLoader'

export function DoadorHome() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [produtos, setProdutos] = useState<Produto[]>([])
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)

  const carregarDados = async () => {
    try {
      const produtosData = await listarMeusProdutos()
      const doacoesData = await getMinhasDoacoes()
      setProdutos(produtosData)
      setDoacoes(doacoesData.doacoes)
    } catch (error) {
      console.error('Erro ao carregar dados do resumo:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  if (loading) return <FullPageLoader />

  return (
    <Layout>
      <div className="p-6 space-y-8">
        {/* Cabeçalho */}
        <div>
          <h1 className="text-2xl font-bold text-green-800">
            Olá, {user?.nome || 'Doador'}! 👋
          </h1>
          <p className="text-gray-600">
            Bem-vindo de volta! Acompanhe o impacto das suas doações e mantenha seus produtos atualizados.
          </p>
        </div>

        {/* Resumo das Atividades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border rounded-xl p-4 bg-green-50 flex items-center gap-4">
            <Package className="text-green-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-green-900">{produtos.length}</p>
              <p className="text-sm text-gray-600">Produtos cadastrados</p>
            </div>
          </div>

          <div className="border rounded-xl p-4 bg-red-50 flex items-center gap-4">
            <Heart className="text-red-700 w-6 h-6" />
            <div>
              <p className="text-xl font-bold text-red-900">{doacoes.length}</p>
              <p className="text-sm text-gray-600">Doações realizadas</p>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/produtos/doador')}
            className="border rounded-xl p-4 bg-white hover:bg-green-50 transition text-left"
          >
            <p className="font-medium text-green-800">Gerenciar Produtos</p>
            <p className="text-sm text-gray-600">Visualize e cadastre novos alimentos</p>
          </button>

          <button
            onClick={() => navigate('/doacoes/doador')}
            className="border rounded-xl p-4 bg-white hover:bg-green-50 transition text-left"
          >
            <p className="font-medium text-green-800">Minhas Doações</p>
            <p className="text-sm text-gray-600">Acompanhe suas entregas realizadas</p>
          </button>

          <button
            onClick={() => navigate('/produtos/doador')}
            className="border rounded-xl p-4 bg-white hover:bg-green-50 transition text-left"
          >
            <p className="font-medium text-green-800">Cadastrar Produto</p>
            <p className="text-sm text-gray-600">Adicione novos itens ao estoque</p>
          </button>
        </div>
      </div>
    </Layout>
  )
}
