import { useEffect, useState } from 'react'
import { BadgeCheck, Clock, Hourglass, Search } from 'lucide-react'
import { getMinhasDoacoes } from '../../../../shared/services/doacaoService'
import { cn } from '../../../../../lib/utils'
import type { Doacao } from '../../../../shared/types/shared.types'
import { Layout } from '../../../../shared/components/layout/Layout'


export default function DoadorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'TODOS' | 'PLANEJADA' | 'PENDENTE' | 'RECEBIDA'>('TODOS')

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
      texto: 'Recebido',
      cor: 'bg-green-100 text-green-800',
      icone: <BadgeCheck size={14} />,
    },
  }

const carregarDoacoes = async () => {
  try {
    const data = await getMinhasDoacoes()
    console.log('[DEBUG] Resposta da API:', data)
    setDoacoes(data.doacoes)
  } catch (error) {
    console.error('Erro ao carregar doações:', error)
  }
}

  useEffect(() => {
    carregarDoacoes()
  }, [])

  const doacoesFiltradas = doacoes.filter((d) => {
    const matchBusca =
      d.produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      d.receptor.nome.toLowerCase().includes(busca.toLowerCase())

    const matchFiltro = filtro === 'TODOS' || d.status === filtro
    return matchBusca && matchFiltro
  })

  return (
    <Layout>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-1">Gestão de Doações</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Acompanhe e gerencie todas as suas atividades de doação
        </p>

        {/* Filtros e busca */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {(['TODOS', 'PLANEJADA', 'PENDENTE', 'RECEBIDA'] as const).map((status) => (
              <button
                key={status}
                className={cn(
                  'px-4 py-1 rounded-full border text-sm',
                  filtro === status
                    ? 'bg-green-600 text-white border-green-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
                onClick={() => setFiltro(status)}
              >
                {status === 'TODOS' ? 'Todos' : statusInfo[status].texto}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por produto, organização..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full text-sm w-full"
            />
          </div>
        </div>

        {/* Lista de doações */}
        <div className="grid gap-4">
          {doacoesFiltradas.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">Nenhuma doação encontrada.</p>
          ) : (
            doacoesFiltradas.map((d) => {
              const status = statusInfo[d.status as keyof typeof statusInfo]

              return (
                <div key={d.idDoacao} className="flex gap-4 bg-white rounded-lg shadow-sm border p-4">
                  <img
                    src="/sem-imagem.png"
                    alt={d.produto.descricao}
                    className="w-24 h-24 object-cover rounded-md border"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-green-800">{d.produto.descricao}</h2>

                    <p className="text-sm text-gray-600">
                      {d.quantidade} {d.produto.unidade} • Coleta:{' '}
                      {new Date(d.dataPlanejada).toLocaleDateString('pt-BR')}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Destinado a: {d.receptor.nome || 'Organização desconhecida'}
                    </p>

                    <p className="text-xs text-gray-400">
                      Registrado em {new Date(d.dataReserva).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div
                    className={`px-3 py-1 text-xs font-medium rounded-full self-start ${status.cor}`}
                  >
                    <span className="flex items-center gap-1">
                      {status.icone} {status.texto}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </Layout>
  )
}
