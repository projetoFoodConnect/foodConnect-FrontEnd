import { useEffect, useState } from 'react'
import { BadgeCheck, Clock, Hourglass, Search, Pencil, Building2, CalendarDays, } from 'lucide-react'
import { getMinhasDoacoes, atualizarStatusDoacao } from '../../../../shared/services/doacaoService'
import type { Doacao } from '../../../../shared/types/shared.types'
import { toast } from 'react-toastify'
import { cn } from '../../../../../lib/utils'
import { Layout } from '../../../../shared/components/layout/Layout'
import ModalEditarDoacao from '../components/ModalEditarDoacao'

export function DoadorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'TODOS' | 'PLANEJADA' | 'PENDENTE' | 'RECEBIDA'>('TODOS')
  const [editarModal, setEditarModal] = useState<null | {
    id: number
    status: Doacao['status']
    quantidade: number
  }>(null)


  const statusInfo = {
    PLANEJADA: {
      texto: 'Planejado',
      cor: 'bg-emerald-100 text-emerald-800',
      icone: <Clock size={14} />,
    },
    PENDENTE: {
      texto: 'Pendente',
      cor: 'bg-yellow-100 text-yellow-800',
      icone: <Hourglass size={14} />,
    },
    RECEBIDA: {
      texto: 'Entregue',
      cor: 'bg-green-100 text-green-800',
      icone: <BadgeCheck size={14} />,
    },
  }

  const carregarDoacoes = async () => {
    try {
      const res = await getMinhasDoacoes()
      setDoacoes(res.doacoes)
    } catch (error) {
      console.error('Erro ao buscar doações:', error)
      toast.error('Erro ao carregar doações.')
    }
  }

  useEffect(() => {
    carregarDoacoes()
  }, [])

  const doacoesFiltradas = doacoes.filter((d) => {
    const matchBusca =
      d.produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      d.receptor?.nome?.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'TODOS' || d.status === filtro
    return matchBusca && matchFiltro
  })

  const statusContador = (status: string) =>
    doacoes.filter((d) => d.status === status).length

  const handleStatusChange = async (id: number, status: Doacao['status']) => {
    try {
      await atualizarStatusDoacao(id, status)
      toast.success('Status atualizado!')
      carregarDoacoes()
    } catch {
      toast.error('Erro ao atualizar status.')
    }
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Gestão de Doações</h1>
        <p className="text-sm text-gray-500 mb-6">
          Acompanhe e gerencie todas as suas atividades de doação
        </p>

        {/* Cards de status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {(['PLANEJADA', 'PENDENTE', 'RECEBIDA'] as const).map((s) => (
            <div key={s} className={cn(
              'rounded-lg p-4 shadow-sm',
              s === 'PLANEJADA' && 'bg-emerald-50',
              s === 'PENDENTE' && 'bg-yellow-50',
              s === 'RECEBIDA' && 'bg-green-50'
            )}>
              <div className="text-sm font-medium text-gray-600">{statusInfo[s].texto}</div>
              <div className="text-2xl font-bold">{statusContador(s)}</div>
              <p className="text-xs text-gray-500 mt-1">
                {s === 'PLANEJADA' ? 'Doações agendadas' :
                  s === 'PENDENTE' ? 'Aguardando coleta' :
                    'Doações concluídas'}
              </p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 items-center mb-4">
          {(['TODOS', 'PLANEJADA', 'PENDENTE', 'RECEBIDA'] as const).map((s) => (
            <button
              key={s}
              className={cn(
                'rounded-lg p-2 shadow-sm text-sm transition',
                filtro === s
                  ? 'bg-green-900 text-gray-200 border-gray-800'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              )}
              onClick={() => setFiltro(s)}
            >
              {s === 'TODOS' ? 'Todos' : statusInfo[s].texto}{' '}
              {s !== 'TODOS' && (
                <span className="ml-1 text-xs text-green-700 bg-gray-100 rounded-full px-2 py-0.5">
                  {statusContador(s)}
                </span>
              )}
            </button>
          ))}

          {/* Busca */}
          <div className="relative ml-auto w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por produto, organização..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm w-full"
            />
          </div>
        </div>

        {/* Lista */}
        {doacoesFiltradas.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-8">Nenhuma doação encontrada.</p>
        ) : (
          <div className="grid gap-4">
            {doacoesFiltradas.map((d) => {
              const status = statusInfo[d.status as keyof typeof statusInfo]
              return (
                <div
                  key={d.idDoacao}
                  className="flex gap-4 bg-white  rounded-lg shadow-sm p-4"
                >
                  <div className="flex-1">
                    <h2 className="font-semibold text-green-800 text-sm">{d.produto.descricao}</h2>
                    <p className="text-sm text-gray-600">
                      {d.quantidade} {d.produto.unidade} • Coleta:{" "}
                      {new Date(d.dataPlanejada).toLocaleDateString('pt-BR')}
                    </p>

                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Building2 size={14} /> {d.receptor?.nome || 'Organização desconhecida'}
                    </p>

                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <CalendarDays size={14} /> Cadastrado em{" "}
                      {new Date(d.dataReserva).toLocaleDateString('pt-BR')}
                    </p>
                    {editarModal && (
                      <ModalEditarDoacao
                        id={editarModal.id}
                        statusAtual={editarModal.status}
                        quantidadeAtual={editarModal.quantidade}
                        onClose={() => setEditarModal(null)}
                        onUpdate={carregarDoacoes} />
                    )}


                    {/* Ações */}
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {(['PLANEJADA', 'PENDENTE', 'RECEBIDA'] as const).map((s) => (
                        <button
                          key={s}
                          className={cn(
                            'text-xs px-3 py-1 border rounded-full transition',
                            d.status === s
                              ? 'bg-gray-200 text-gray-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          )}
                          onClick={() => handleStatusChange(d.idDoacao, s)}
                        >
                          {statusInfo[s].texto}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${status.cor}`}>
                      {status.icone} {status.texto}
                    </span>

                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setEditarModal({ id: d.idDoacao, status: d.status, quantidade: d.quantidade })}
                    >
                      <Pencil size={16} />
                    </button>

                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}
