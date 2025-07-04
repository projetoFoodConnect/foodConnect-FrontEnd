import { ProdutoCard } from '../components/ProdutoCard'
import { ProdutoFiltro } from '../components/ProdutoFiltro'
import { ProdutoSearch } from '../components/ProdutoSearch'
import { ProdutoForm } from '../components/ProdutoForm'
import {
  listarMeusProdutos,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto
} from '../services/produtoService'

import { useEffect, useState } from 'react'

import type { Produto } from '../../../../shared/types/shared.types'
import { Layout } from '../../../../shared/components/layout/Layout'

export function DoadorProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'TODOS' | Produto['tipo']>('TODOS')
  const [modoForm, setModoForm] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  const carregarProdutos = async () => {
    try {
      const data = await listarMeusProdutos()
      const ordenado = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setProdutos(ordenado)
    } catch (error) {
      console.error('[DoadorProdutos] Erro ao carregar produtos:', error)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  const produtosFiltrados = produtos.filter((p) => {
    const matchBusca = p.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'TODOS' || p.tipo === filtro
    return matchBusca && matchFiltro
  })

  const handleCadastrar = async (form: any) => {
    await cadastrarProduto(form)
    await carregarProdutos()
    setModoForm(false)
  }

  const handleAtualizar = async (form: any) => {
    if (!produtoSelecionado) return
    await atualizarProduto(produtoSelecionado.id, form)
    await carregarProdutos()
    setModoForm(false)
    setProdutoSelecionado(null)
  }

  const handleExcluir = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      await deletarProduto(id)
      await carregarProdutos()
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Meus Produtos</h1>
            <p className="text-sm text-gray-500">Visualize, edite ou remova seus produtos disponíveis.</p>
          </div>

          <button
            onClick={() => {
              setProdutoSelecionado(null)
              setModoForm(true)
            }}
            className="bg-green-700 text-white font-medium px-4 py-2 rounded hover:bg-green-800"
          >
            + Novo Produto
          </button>
        </div>

        {/* Busca e Filtro */}
        <div className="flex flex-col sm:flex-row gap-4">
          <ProdutoSearch termo={busca} onChange={setBusca} />
          <ProdutoFiltro filtro={filtro} onChange={setFiltro} />
        </div>

        {/* Formulário */}
        {modoForm && (
          <ProdutoForm
            initialData={
              produtoSelecionado
                ? {
                    descricao: produtoSelecionado.descricao,
                    quantidade: produtoSelecionado.quantidade,
                    unidade: produtoSelecionado.unidade,
                    tipo: produtoSelecionado.tipo,
                    imagem: null
                  }
                : undefined
            }
            onSubmit={produtoSelecionado ? handleAtualizar : handleCadastrar}
            onCancel={() => {
              setModoForm(false)
              setProdutoSelecionado(null)
            }}
          />
        )}

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtosFiltrados.length === 0 ? (
            <p className="text-gray-500">Nenhum produto encontrado.</p>
          ) : (
            produtosFiltrados.map((produto) => (
              <ProdutoCard
                key={produto.id}
                produto={produto}
                onEditar={(p) => {
                  setProdutoSelecionado(p)
                  setModoForm(true)
                }}
                onExcluir={handleExcluir}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}