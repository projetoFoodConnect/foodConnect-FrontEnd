import { useEffect, useState } from 'react'
import {
  Clock,
  Hourglass,
  BadgeCheck,
  Search,
  X,
  Pencil,
  CalendarDays,
} from 'lucide-react'
import { toast } from 'react-toastify'
import { getMinhasDoacoes } from '../../../../shared/services/doacaoService'
import { Layout } from '../../../../shared/components/layout/Layout'
import type { Doacao } from '../../../../shared/types/shared.types'
import { cn } from '../../../../../lib/utils'
import { FullPageLoader } from '../../../../shared/components/ui/FullPageLoader'
import { StatusEditor } from '../components/StatusEditor'

export default function DoadorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'TODOS' | Doacao['status']>('TODOS')
  const [loading, setLoading] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [doacaoSelecionada, setDoacaoSelecionada] = useState<Doacao | null>(null)

  const carregar = async () => {
    try {
      const { doacoes } = await getMinhasDoacoes()
      setDoacoes(doacoes)
    } catch (error) {
      console.error('Erro ao carregar doações:', error)
      toast.error('Erro ao carregar doações.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  // const handleStatusChange = async (id: number, novoStatus: Doacao['status']) => {
  //   setLoadingId(id)
  //   try {
  //     await atualizarStatusDoacao(id, novoStatus)
  //     toast.success('Status atualizado com sucesso!')
  //     await carregar()
  //   } catch (error) {
  //     toast.error('Erro ao atualizar status.')
  //   } finally {
  //     setLoadingId(null)
  //   }
  // }

  const filtradas = doacoes.filter((d) => {
    const matchBusca = d.produto.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'TODOS' || d.status === filtro
    return matchBusca && matchFiltro
  })

  if (loading) return <FullPageLoader />

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Minhas Doações</h1>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar doações..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-400 rounded-sm text-sm w-full"
            />
          </div>
        </div>

        <div className="mb-4 flex gap-2 flex-wrap">
          {(['TODOS', 'PLANEJADA', 'PENDENTE', 'RECEBIDA', 'CANCELADA'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFiltro(status)}
              className={cn(
                'px-4 py-1 border border-gray-300 rounded text-sm',
                filtro === status
                  ? 'bg-green-600 text-white border-green-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              )}
            >
              {status === 'TODOS' ? 'Todos' : status}
            </button>
          ))}
        </div>

        {filtradas.length === 0 ? (
          <p className="text-center text-sm text-gray-500 mt-4">Nenhuma doação encontrada.</p>
        ) : (
          <div className="grid gap-4">
            {filtradas.map((d) => (
              <div
                key={d.idDoacao}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4"
              >
                <div className="flex-1 ">
                  <h2 className="text-lg font-semibold text-green-800">
                    {d.produto.descricao}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {d.quantidade} {d.produto.unidade} • Coleta: {new Date(d.dataPlanejada).toLocaleDateString('pt-BR')}
                  </p>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    <CalendarDays size={14} />
                    Reservado em {new Date(d.dataReserva).toLocaleDateString('pt-BR')}
                    </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Destinado a: {d.receptor?.nome || 'Desconhecido'}
                  </p>
                </div>

                {/* STATUS badge */}
                <div className="self-start mt-1 md:mt-0 flex flex-col items-center">
                  <span
                    className={cn(
                      'flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full',
                      d.status === 'PLANEJADA' && 'bg-emerald-100 text-emerald-800',
                      d.status === 'PENDENTE' && 'bg-yellow-100 text-yellow-800',
                      d.status === 'RECEBIDA' && 'bg-green-100 text-green-800',
                      d.status === 'CANCELADA' && 'bg-red-100 text-red-800'
                    )}
                  >
                    {d.status === 'PLANEJADA' && <Clock size={14} />}
                    {d.status === 'PENDENTE' && <Hourglass size={14} />}
                    {d.status === 'RECEBIDA' && <BadgeCheck size={14} />}
                    {d.status === 'CANCELADA' && <X size={14} />}
                    {d.status === 'PLANEJADA' && 'Planejado'}
                    {d.status === 'PENDENTE' && 'Pendente'}
                    {d.status === 'RECEBIDA' && 'Entregue'}
                    {d.status === 'CANCELADA' && 'Cancelada'}
                  </span>
                  <button
                    onClick={() => {
                      setDoacaoSelecionada(d)
                      setModalAberto(true)
                    }}
                    className="text-gray-500 hover:text-gray-700 mt-2 text-xs flex items-center gap-1"
                  >
                    <Pencil size={14} />
                    Editar
                  </button>
                </div>
                {modalAberto && doacaoSelecionada && (
                  <StatusEditor
                    doacao={doacaoSelecionada}
                    onClose={() => setModalAberto(false)}
                    onAtualizado={carregar}
                  />
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
