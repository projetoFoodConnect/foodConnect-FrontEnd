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
        <p className="text-sm text-gray-600 mb-4">
          Acompanhe e gerencie todas as suas atividades de doação
        </p>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {(['TODOS', 'PLANEJADA', 'PENDENTE', 'RECEBIDA', 'CANCELADA'] as const).map((s) => (
              <button
                key={s}
                className={cn(
                  'px-4 py-1 rounded-full border text-sm',
                  filtroStatus === s
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
                onClick={() => setFiltroStatus(s)}
              >
                {s === 'TODOS' ? 'Todos' : statusInfo[s]?.texto || s}
              </button>
            ))}
          </div>

          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as any)}
            className="border px-3 py-2 rounded-md text-sm"
          >
            {tiposProduto.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo === 'TODOS' ? 'Todos os tipos' : tipo}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por produto ou nome"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full text-sm w-full"
            />
          </div>
        </div>

        {/* Lista de doações */}
        <div className="space-y-4">
          {filtradas.length === 0 ? (
            <p className="text-center text-sm text-gray-500">Nenhuma doação encontrada.</p>
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
                      {d.quantidade} {d.produto.unidade} • Coleta: {new Date(d.dataPlanejada).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Destinado a: {d.receptor.nome}
                    </p>
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
                      {info.icone}
                      {info.texto}
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
        </div>

        {/* Modal */}
        {modalAberto && doacaoSelecionada && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Editar Status</h3>

              <select
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
                className="w-full border rounded p-2 mb-4"
              >
                {doacaoSelecionada.status === 'PLANEJADA' && (
                  <option value="PENDENTE">Pendente</option>
                )}
                {doacaoSelecionada.status === 'PENDENTE' && (
                  <>
                    <option value="RECEBIDA">Recebida</option>
                    <option value="CANCELADA">Cancelada</option>
                  </>
                )}
              </select>

              <div className="flex justify-end gap-3">
                <button onClick={() => setModalAberto(false)} className="px-4 py-1 bg-gray-200 rounded">
                  Cancelar
                </button>
                <button onClick={salvarStatus} className="px-4 py-1 bg-green-600 text-white rounded">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
