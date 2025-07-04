import { useEffect, useState } from 'react'
import { listarTodosProdutosDisponiveis } from '../../../../shared/services/produtoService'
import type { Produto } from '../../../../shared/types/shared.types'
import { toast } from 'react-toastify'
import { Layout } from '../../../../shared/components/layout/Layout'

export default function ReceptorProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(false)

  const carregarProdutos = async () => {
    try {
      const data = await listarTodosProdutosDisponiveis()
      setProdutos(data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    }
  }

  const handleReservar = async (produto: Produto) => {
    try {
      setLoading(true)
      await registrarDoacao({
        idProduto: produto.idProduto,
        idDoador: produto.donoId,
        quantidade: produto.quantidade,
        dataPlanejada: new Date(),
      })

      toast.success('Reserva realizada com sucesso!')
      carregarProdutos()
    } catch (error) {
      console.error('Erro ao reservar produto:', error)
      toast.error('Erro ao reservar produto.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  return (
    <Layout>

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Produtos Disponíveis</h1>

        {produtos.length === 0 ? (
          <p className="text-gray-500">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {produtos.map((produto) => (
              <div key={produto.idProduto} className="bg-white border rounded-lg shadow-sm p-4 flex flex-col">
                <img
                  src={produto.imagem || '/sem-imagem.png'}
                  alt={produto.descricao}
                  className="h-36 w-full object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold text-green-800">{produto.descricao}</h2>
                <p className="text-sm text-gray-600">
                  {produto.quantidade} {produto.unidade} • {produto.tipo}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Doador: {produto.donoId || 'Organização desconhecida'}
                </p>
                <button
                  onClick={() => handleReservar(produto)}
                  disabled={loading}
                  className="mt-auto bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  {loading ? 'Reservando...' : 'Reservar'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
