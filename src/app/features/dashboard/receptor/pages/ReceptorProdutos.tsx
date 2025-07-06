import { useEffect, useState } from 'react'
import type { Produto } from '../../../../shared/types/shared.types'
import { listarTodosProdutosDisponiveis } from '../../../../shared/services/produtoService'
import { registrarDoacao } from '../../../../shared/services/doacaoService'
import { toast } from 'react-toastify'
import { Layout } from '../../../../shared/components/layout/Layout'
import { ReservaModal } from '../components/ReservaModal'

export default function ReceptorProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const carregarProdutos = async () => {
    try {
      const data = await listarTodosProdutosDisponiveis()
      setProdutos(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
  }


  useEffect(() => {
    carregarProdutos()
  }, [])

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-1">Produtos Disponíveis</h1>
        <p className="text-sm text-muted-foreground mb-6">Escolha um produto para reservar</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {produtos.length === 0 ? (
            <p className="text-sm text-gray-500 col-span-full text-center">
              Nenhum produto disponível no momento.
            </p>
          ) : (
            produtos.map((produto) => (
              <div
                key={produto.idProduto}
                className="rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <img
                  src={produto.imagem || '/sem-imagem.png'}
                  alt={produto.descricao}
                  className="w-full h-36 object-cover rounded-md mb-2"
                />

                <h3 className="text-lg font-semibold text-green-800">{produto.descricao}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  {produto.tipo}
                </span>

                <p className="text-sm text-gray-600 mt-1">
                  {produto.quantidade} {produto.unidade}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Doador:{' '}
                  {produto.donoOrganizacao || produto.donoNome || 'Organização desconhecida'}
                </p>

                <button
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  disabled={loadingId === produto.idProduto}
                  onClick={() => setProdutoSelecionado(produto)}
                >
                  {loadingId === produto.idProduto ? 'Reservando...' : 'Reservar'}
                </button>
              </div>
            ))
          )}
        </div>

        {produtoSelecionado && (
          <ReservaModal
            produto={produtoSelecionado}
            onClose={() => setProdutoSelecionado(null)}
            onReservado={carregarProdutos}
          />
        )}
      </div>
    </Layout>
  )
}
