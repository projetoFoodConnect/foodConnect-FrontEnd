import { useEffect, useState, type SetStateAction } from 'react'
import { Layout } from '../../../../shared/components/layout/Layout'
import { ProdutoFiltro } from '../components/ProdutoFiltro'
import { ProdutoSearch } from '../components/ProdutoSearch'
import {
  listarMeusProdutos,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto
} from '../../../../shared/services/produtoService'
import type { Produto } from '../../../../shared/types/shared.types'
import { ProdutoCard } from '../components/ProdutoCard'
import { toast } from 'react-toastify'
import type { ProdutoForm } from '../../../../shared/types/produto.types'
import { ProdutoForme } from '../components/ProdutoForme'
import { ProdutoDetalhesModal } from '../components/ProdutoDetalhesModal'
import { ProdutoFormModal } from '../components/ProdutoFormModal'
import { FullPageLoader } from '../../../../shared/components/ui/FullPageLoader'

export function DoadorProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'TODOS' | Produto['tipo']>('TODOS')
  const [modoForm, setModoForm] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false)
  const [loading, setLoading] = useState(true)


const carregarProdutos = async () => {
  try {
    const data = await listarMeusProdutos()
    const ordenado = data.sort((a, b) => new Date(b.dataPostagem).getTime() - new Date(a.dataPostagem).getTime())
    setProdutos(ordenado)

    if (ordenado.length > 0) {
      toast.success('Produtos carregados com sucesso!')
    } else {
      toast.error('Nenhum produto encontrado.')
    }
  } catch (error) {
    toast.error('Erro ao carregar produtos. Tente novamente.')
    console.error('[DoadorProdutos] Erro ao carregar produtos:', error)
  } finally {
    setLoading(false)
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

  const handleCadastrar = async (form: ProdutoForm) => {
    try {
      await cadastrarProduto(form)
      await carregarProdutos()
      setModoForm(false)
      toast.success('Produto cadastrado com sucesso!')
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error)
      toast.error('Erro ao cadastrar produto. Tente novamente.')
    }
  }

  const handleAtualizar = async (form: ProdutoForm) => {
    if (!produtoSelecionado) return
    await atualizarProduto(produtoSelecionado.idProduto, form)
    await carregarProdutos()
    setModoForm(false)
    setProdutoSelecionado(null)
    toast.success('Produto atualizado com sucesso!')
  }

const handleExcluir = async (idProduto: string) => {
  try {
    await deletarProduto(idProduto)
    toast.success('Produto excluído com sucesso!')
    setMostrarDetalhes(false)
    await carregarProdutos()
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    toast.error('Erro ao excluir produto.')
  }
}

  if (loading) return <FullPageLoader />

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Catálogo de Produtos</h1>
            <p className="text-sm text-gray-600">
              Gerencie seus produtos disponíveis para doação
            </p>
          </div>

          <button
            onClick={() => {
              setProdutoSelecionado(null)
              setModoForm(true)
            }}
            className="bg-green-700 hover:bg-green-800 text-white rounded-md px-4 py-2 font-medium"
          >
            + Novo Produto
          </button>
        </div>

        {/* Filtros e busca */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <ProdutoSearch termo={busca} onChange={setBusca} />
          <ProdutoFiltro filtro={filtro} onChange={setFiltro} />
        </div>

        {/* Formulário de cadastro/edição */}
        {modoForm && (
          <div className="fixed inset-0 z-50  bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-xl w-full relative">
              <button
                onClick={() => {
                  setModoForm(false)
                  setProdutoSelecionado(null)
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>

              <ProdutoForme
                initialData={produtoSelecionado ? { ...produtoSelecionado, imagem: null } : undefined}
                onSubmit={produtoSelecionado ? handleAtualizar : handleCadastrar}
                onCancel={() => {
                  setModoForm(false)
                  setProdutoSelecionado(null)
                }}
              />
            </div>
          </div>
        )}


        {/* Grade de produtos */}
        {produtosFiltrados.length === 0 ? (
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard
                key={produto.id}
                imagem={produto.imagem}
                descricao={produto.descricao}
                tipo={produto.tipo}
                quantidade={produto.quantidade}
                unidade={produto.unidade}
                reservas={produto._count?.doacoes || 0}
                dataCadastro={produto.dataPostagem}
                status={produto.status}
                onClick={() => {
                  setProdutoSelecionado(produto)
                  setMostrarDetalhes(true)
                }}
              />

            ))}

            {mostrarDetalhes && produtoSelecionado && (
              <ProdutoDetalhesModal
                produto={produtoSelecionado}
                onClose={() => setMostrarDetalhes(false)}
                onEditar={(p: SetStateAction<Produto | null>) => {
                  setProdutoSelecionado(p)
                  setMostrarDetalhes(false)
                  setModoForm(true)
                }}

                onExcluir={handleExcluir}
              />
            )}

            {/* Modal de Formulário */}
            {modoForm && (
              <ProdutoFormModal
                produto={
                  produtoSelecionado
                    ? { ...produtoSelecionado, imagem: null }
                    : undefined
                }
                onCancel={() => {
                  setModoForm(false)
                  setProdutoSelecionado(null)
                }}
                onSubmit={produtoSelecionado ? handleAtualizar : handleCadastrar}
                onExcluir={handleExcluir}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
