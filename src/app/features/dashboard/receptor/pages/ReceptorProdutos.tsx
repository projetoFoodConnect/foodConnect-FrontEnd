import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { listarProdutosDisponiveisService } from '../../../../shared/services/produtoService'
import { useAuth } from '../../../auth/contexts/AuthContext'
import type { Produto } from '../../../../shared/types/shared.types'
import { Layout } from '../../../../shared/components/layout/Layout'

export function ReceptorProdutos() {
  useAuth()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const data = await listarProdutosDisponiveisService()
        setProdutos(data)
      } catch (err) {
        console.error('Erro ao buscar produtos disponíveis:', err)
      }
    }

    fetchProdutos()
  }, [])

  const produtosFiltrados = produtos.filter((p) => {
    const nomeMatch = p.descricao.toLowerCase().includes(busca.toLowerCase())
    const tipoMatch = filtroTipo ? p.tipo === filtroTipo : true
    return nomeMatch && tipoMatch
  })

  const tipos = ['FRUTA', 'VERDURA', 'LEGUME', 'NÃO-PERECÍVEL']

 return (
  <Layout>
    <div className="p-6 space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-green-800">Catálogo de Produtos</h2>
        <p className="text-sm text-gray-600">Encontre e reserve alimentos disponíveis</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute top-2.5 left-3 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="pl-10 pr-4 py-2 w-full border rounded-md text-sm"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm w-full sm:w-48"
        >
          <option value="">Todos os tipos</option>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      {/* Lista de produtos */}
      {produtosFiltrados.length === 0 ? (
        <p className="text-gray-600">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={produto.imagem || '/sem-imagem.png'}
                alt={produto.descricao}
                className="w-full h-36 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-green-800">{produto.descricao}</h3>
              <p className="text-sm text-gray-600">{produto.quantidade} {produto.unidade}</p>
              <p className="text-xs text-gray-500 mt-1">Tipo: {produto.tipo}</p>
              <button
                onClick={() => alert(`Reservar ${produto.descricao}`)}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-1 text-sm"
              >
                Reservar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </Layout>
)
}