import { useEffect, useState } from 'react'
import {
  BadgeCheck,
  Clock,
  Hourglass,
  XCircle,
  Edit3,
} from 'lucide-react'
import { toast } from 'react-toastify'
import type { Doacao } from '../../../../shared/types/shared.types'
import {
  getMinhasDoacoes,
  atualizarStatusDoacao,
} from '../../../../shared/services/doacaoService'
import { cn } from '../../../../../lib/utils'
import { Layout } from '../../../../shared/components/layout/Layout'

export default function DoadorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<
    'TODOS' | 'PLANEJADA' | 'PENDENTE' | 'RECEBIDA' | 'CANCELADA'
  >('TODOS')

  // modal
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
    const mb =
      d.produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      d.receptor.nome.toLowerCase().includes(busca.toLowerCase())
    const mf = filtro === 'TODOS' || d.status === filtro
    return mb && mf
  })

  function abrirModal(d: Doacao) {
    setDoacaoSelecionada(d)
    setNovoStatus(d.status)
    setModalAberto(true)
  }

  async function salvarStatus() {
    if (!doacaoSelecionada) return
    try {
      console.log('[Front] Atualizando status para:', novoStatus)
      const resp = await atualizarStatusDoacao(doacaoSelecionada.idDoacao, novoStatus)
      console.log('[Front] Resposta da API:', resp)
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

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {(['TODOS', 'PLANEJADA', 'PENDENTE', 'RECEBIDA', 'CANCELADA'] as const).map((s) => (
              <button
                key={s}
                className={cn(
                  'px-4 py-1 rounded-full border text-sm',
                  filtro === s
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                )}
                onClick={() => setFiltro(s)}
              >
                {s === 'TODOS' ? 'Todos' : statusInfo[s]?.texto || s}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-3 pr-3 py-1 border rounded-full text-sm w-64"
          />
        </div>

        <div className="space-y-4">
          {filtradas.map((d) => {
            const info = statusInfo[d.status]
            return (
              <div
                key={d.idDoacao}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow border"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-green-800">
                      {d.produto.descricao}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {d.quantidade} {d.produto.unidade} • Coleta:{' '}
                      {new Date(d.dataPlanejada).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Destinado a: {d.receptor.nome}
                    </p>
                    <p className="text-xs text-gray-400">
                      Cadastrado em{' '}
                      {new Date(d.dataReserva).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* status */}
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                      info.cor
                    )}
                  >
                    {info.icone}
                    {info.texto}
                  </span>
                  {/* botão editar */}
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
          })}
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
                {/* se PLANEJADA, permite ir para PENDENTE */}
                {doacaoSelecionada.status === 'PLANEJADA' && (
                  <option value="PENDENTE">Pendente</option>
                )}
                {doacaoSelecionada.status === 'PENDENTE' && (
                  <>
                    <option value="RECEBIDA">Recebida</option>
                    <option value="CANCELADA">Cancelada</option>
                  </>
                )}
                {/* RECEBIDA e CANCELADA não mudam */}
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-1 rounded bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarStatus}
                  className="px-4 py-1 rounded bg-green-600 text-white"
                >
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
