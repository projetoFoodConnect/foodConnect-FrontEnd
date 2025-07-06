import { useEffect, useState } from 'react'
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  Hourglass,
  Search,
  X,
  XCircle,
} from 'lucide-react'
import { toast } from 'react-toastify'

import { Layout } from '../../../../shared/components/layout/Layout'
import { getMinhasDoacoes, atualizarStatusDoacao } from '../../../../shared/services/doacaoService'
import type { Doacao } from '../../../../shared/types/shared.types'
import { cn } from '../../../../../lib/utils'

export function ReceptorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'TODOS' | Doacao['status']>('TODOS')
  const [loadingId, setLoadingId] = useState<number | null>(null)

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
      texto: 'Recebida',
      cor: 'bg-green-100 text-green-800',
      icone: <BadgeCheck size={14} />,
    },
    CANCELADA: {
      texto: 'Cancelada',
      cor: 'bg-red-100 text-red-800',
      icone: <XCircle size={14} />,
    },
  }

  const carregar = async () => {
    const { doacoes } = await getMinhasDoacoes()
    const agora = new Date()
    for (const d of doacoes) {
      if (d.status === 'PLANEJADA' && new Date(d.dataPlanejada) < agora) {
        await atualizarStatusDoacao(d.idDoacao, 'PENDENTE')
      }
    }
    const atualizadas = await getMinhasDoacoes()
    setDoacoes(atualizadas.doacoes)
  }

  useEffect(() => {
    carregar()
  }, [])

  const handleCancelar = async (id: number) => {
    if (!confirm('Cancelar esta doação?')) return
    setLoadingId(id)
    try {
      await atualizarStatusDoacao(id, 'CANCELADA')
      toast.success('Doação cancelada.')
      await carregar()
    } catch {
      toast.error('Erro ao cancelar.')
    } finally {
      setLoadingId(null)
    }
  }

  const filtradas = doacoes.filter((d) => {
    const matchBusca = d.produto.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtro === 'TODOS' || d.status === filtro
    return matchBusca && matchStatus
  })

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Minhas Doações</h1>
        <p className="text-sm text-muted-foreground mb-4">Acompanhe suas reservas de alimentos</p>

        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div className="flex flex-wrap gap-2">
            {(['TODOS', 'PLANEJADA', 'PENDENTE', 'RECEBIDA', 'CANCELADA'] as const).map((s) => (
              <button
                key={s}
                className={cn(
                  'px-4 py-1 rounded-sm border border-gray-200 text-sm',
                  filtro === s
                    ? 'bg-green-600 text-white border-green-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
                onClick={() => setFiltro(s)}
              >
                {s === 'TODOS' ? 'Todos' : statusInfo[s].texto}
              </button>
            ))}

            {filtro !== 'TODOS' && (
              <button
                onClick={() => setFiltro('TODOS')}
                className="text-xs px-3 py-1 rounded-sm border border-gray-300 hover:bg-gray-100 text-gray-600"
              >
                Limpar filtro
              </button>
            )}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-sm border border-gray-300 text-sm w-full"
            />
          </div>
        </div>

        {filtradas.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-6">Nenhuma doação encontrada.</p>
        ) : (
          <div className="grid gap-4">
            {filtradas.map((d) => {
              const status = statusInfo[d.status as keyof typeof statusInfo]

              return (
                <div
                  key={d.idDoacao}
                  className="flex gap-4 bg-white rounded-lg shadow-sm p-4"
                >

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-green-800">{d.produto.descricao}</h2>

                    <p className="text-sm text-gray-600">
                      {d.quantidade} {d.produto.unidade} • Coleta:{' '}
                      {new Date(d.dataPlanejada).toLocaleDateString('pt-BR')}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Doador: {d.doador.nome || 'Organização desconhecida'}
                    </p>

                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <CalendarDays size={14} />
                      Registrado em {new Date(d.dataReserva).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${status.cor}`}
                    >
                      {status.icone} {status.texto}
                    </span>

                    {d.status !== 'RECEBIDA' && d.status !== 'CANCELADA' && (
                      <button
                        onClick={() => handleCancelar(d.idDoacao)}
                        disabled={loadingId === d.idDoacao}
                        className="text-red-600 hover:text-red-800"
                        title="Cancelar"
                      >
                        <X size={16} />
                      </button>
                    )}
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
