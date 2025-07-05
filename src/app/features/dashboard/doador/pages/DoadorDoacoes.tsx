import { useEffect, useState } from 'react'
import {
  BadgeCheck,
  Clock,
  Hourglass,
  XCircle,
  Edit3,
  Search,
} from 'lucide-react'
import { toast } from 'react-toastify'
import type { Doacao } from '../../../../shared/types/shared.types'
import {
  getMinhasDoacoes,
  atualizarStatusDoacao,
} from '../../../../shared/services/doacaoService'
import { cn } from '../../../../../lib/utils'
import { Layout } from '../../../../shared/components/layout/Layout'

const tiposProduto = ['TODOS', 'FRUTA', 'VERDURA', 'LEGUME', 'NAO_PERECIVEL'] as const

export default function DoadorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<'TODOS' | 'PLANEJADA' | 'PENDENTE' | 'RECEBIDA' | 'CANCELADA'>('TODOS')
  const [filtroTipo, setFiltroTipo] = useState<(typeof tiposProduto)[number]>('TODOS')

  const [modalAberto, setModalAberto] = useState(false)
  const [doacaoSelecionada, setDoacaoSelecionada] = useState<Doacao | null>(null)
  const [novoStatus, setNovoStatus] = useState<string>('')

  const statusInfo = {
    PLANEJADA: { texto: 'Planejado', cor: 'bg-emerald-100 text-emerald-800', icone: <Clock size={14} /> },
    PENDENTE: { texto: 'Pendente', cor: 'bg-yellow-100 text-yellow-800', icone: <Hourglass size={14} /> },
    RECEBIDA: { texto: 'Recebido', cor: 'bg-green-100 text-green-800', icone: <BadgeCheck size={14} /> },
    CANCELADA: { texto: 'Cancelado', cor: 'bg-red-100 text-red-800', icone: <XCircle size={14} /> },
  }

  const carregar = async () => {
    try {
      const { doacoes } = await getMinhasDoacoes()
      setDoacoes(doacoes)
    } catch (e) {
      console.error(e)
      toast.error('Erro ao carregar doações.')
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const filtradas = doacoes.filter((d) => {
    const matchBusca =
      d.produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      d.receptor.nome.toLowerCase().includes(busca.toLowerCase())

    const matchStatus = filtroStatus === 'TODOS' || d.status === filtroStatus
    const matchTipo = filtroTipo === 'TODOS' || d.produto.tipo === filtroTipo

    return matchBusca && matchStatus && matchTipo
  })

  function abrirModal(d: Doacao) {
    setDoacaoSelecionada(d)
    setNovoStatus(d.status)
    setModalAberto(true)
  }

  async function salvarStatus() {
    if (!doacaoSelecionada) return
    try {
      await atualizarStatusDoacao(doacaoSelecionada.idDoacao, novoStatus)
      toast.success('Status atualizado!')
      setModalAberto(false)
      await carregar()
    } catch (err) {
      console.error('[Front] Erro ao atualizar status:', err)
      toast.error('Erro ao atualizar status.')
    }
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-1">Gestão de Doações</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Acompanhe e gerencie todas as suas atividades de doação
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Painel lateral de filtros */}
          <aside className="md:col-span-1 border rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-gray-700 mb-4">Filtros</h3>

            <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded mb-4 flex items-center gap-2 text-sm">
              📦 {filtradas.length} de {doacoes.length} doações
            </div>

            {/* Categorias */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Categorias</h4>
              {tiposProduto
                .filter((t) => t !== 'TODOS')
                .map((tipo) => {
                  const count = doacoes.filter((d) => d.produto.tipo === tipo).length
                  return (
                    <label key={tipo} className="flex justify-between items-center mb-1 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={filtroTipo === tipo}
                          onChange={() => setFiltroTipo(tipo)}
                        />
                        {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                    </label>
                  )
                })}
              <button
                onClick={() => setFiltroTipo('TODOS')}
                className="text-xs text-blue-500 underline mt-2"
              >
                Limpar filtro
              </button>
            </div>

            {/* Status */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Status</h4>
              {(['PLANEJADA', 'PENDENTE', 'RECEBIDA', 'CANCELADA'] as const).map((s) => {
                const count = doacoes.filter((d) => d.status === s).length
                return (
                  <label key={s} className="flex justify-between items-center mb-1 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={filtroStatus === s}
                        onChange={() => setFiltroStatus(s)}
                      />
                      {statusInfo[s].texto}
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                  </label>
                )
              })}
              <button
                onClick={() => setFiltroStatus('TODOS')}
                className="text-xs text-blue-500 underline mt-2"
              >
                Limpar filtro
              </button>
            </div>
          </aside>

          {/* Lista de doações */}
          <section className="md:col-span-3 space-y-4">
            {/* Barra de busca */}
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar por produto ou nome"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-full text-sm w-full"
              />
            </div>

            {filtradas.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">Nenhuma doação encontrada.</p>
            ) : (
              filtradas.map((d) => {
                const info = statusInfo[d.status]
                return (
                  <div
                    key={d.idDoacao}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow border"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-green-800">
                        {d.produto.descricao}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {d.quantidade} {d.produto.unidade} • Coleta:{' '}
                        {new Date(d.dataPlanejada).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-500">Destinado a: {d.receptor.nome}</p>
                      <p className="text-xs text-gray-400">
                        Registrado em {new Date(d.dataReserva).toLocaleDateString('pt-BR')}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                          info.cor
                        )}
                      >
                        {info.icone} {info.texto}
                      </span>
                      <button
                        onClick={() => abrirModal(d)}
                        className="p-2 rounded hover:bg-gray-100"
                        title="Editar status"
                      >
                        <Edit3 size={18} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </section>
        </div>
      </div>
    </Layout>
  )
}
