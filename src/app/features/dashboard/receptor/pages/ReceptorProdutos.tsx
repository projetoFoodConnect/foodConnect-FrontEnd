import { useEffect, useState } from 'react'
import { listarTodosProdutosDisponiveis } from '../../../../shared/services/produtoService'
import { ProdutoCard } from '../components/ProdutoCard'
import { ProdutoFiltro } from '../components/ProdutoFiltro'
import { ReservaModal } from '../components/ReservaModal'
import { toast } from 'react-toastify'
import { registrarDoacao } from '../../../../shared/services/doacaoService'
import { Layout } from '../../../../shared/components/layout/Layout'
import type { Produto } from '../../../../shared/types/shared.types'
import { FullPageLoader } from '../../../../shared/components/ui/FullPageLoader'

export default function ReceptorProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)

  const carregarProdutos = async () => {
    try {
      const data = await listarTodosProdutosDisponiveis()
      setProdutos(data)
    } catch (error) {
      toast.error('Erro ao carregar produtos disponíveis.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    carregarProdutos()
  }, [])

const [filtroTipo, setFiltroTipo] = useState('TODOS')
const produtosFiltrados = produtos.filter((produto) => {
  const matchBusca = produto.descricao.toLowerCase().includes(busca.toLowerCase())
  const matchTipo = filtroTipo === 'TODOS' || produto.tipo === filtroTipo
  return matchBusca && matchTipo
})


  const handleReservarConfirmado = async (quantidade: number, dataPlanejada: string) => {
    if (!produtoSelecionado) return

    try {
      await registrarDoacao({
        idProduto: (produtoSelecionado.idProduto),
        quantidade,
        dataPlanejada,
      })
      
      setProdutoSelecionado(null)
      carregarProdutos()
      toast.success('Reserva realizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao reservar produto.')
    }
  }

   if (loading) return <FullPageLoader/>
  

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Produtos Disponíveis</h1>
            <p className="text-sm text-gray-500">
              Visualize os produtos disponíveis e reserve conforme sua necessidade.
            </p>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome do produto..."
            className="w-lvh h-15 border border-gray-300 px-3 py-2 rounded-md text-sm"
          />
          <ProdutoFiltro
            tipoSelecionado={filtroTipo}
            onTipoChange={(tipo) => setFiltroTipo(tipo)}
          />

        </div>

        {/* Lista de Produtos */}
        {produtosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard
                key={produto.idProduto}
                produto={produto}
                onReservar={() => setProdutoSelecionado(produto)}
              />
            ))}
          </div>
        )}

        {/* Modal de Reserva */}
        <ReservaModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
          onReservarConfirmado={handleReservarConfirmado}
        />
      </div>
    </Layout>
  )
}
