import { useEffect, useState } from 'react'
import { getMinhasDoacoes, atualizarStatusDoacao } from '../../../../shared/services/doacaoService'
import type { Doacao } from '../../../../shared/types/shared.types'
import { BadgeCheck, Clock, Hourglass, XCircle, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { cn } from '../../../../../lib/utils'
import { Layout } from '../../../../shared/components/layout/Layout'

export default function ReceptorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const statusInfo = {
    PLANEJADA: { texto: 'Planejado', cor: 'bg-emerald-100 text-emerald-800', icone: <Clock size={14}/> },
    PENDENTE:  { texto: 'Pendente',  cor: 'bg-yellow-100 text-yellow-800', icone: <Hourglass size={14}/> },
    RECEBIDA:  { texto: 'Recebido',  cor: 'bg-green-100 text-green-800', icone: <BadgeCheck size={14}/> },
    CANCELADA: { texto: 'Cancelado', cor: 'bg-red-100 text-red-800', icone: <XCircle size={14}/> },
  }

  const carregar = async () => {
    const { doacoes } = await getMinhasDoacoes()
    // Transição automática PLANEJADA → PENDENTE
    const agora = new Date()
    for (const d of doacoes) {
      if (d.status === 'PLANEJADA' && new Date(d.dataPlanejada) < agora) {
        await atualizarStatusDoacao(d.idDoacao, 'PENDENTE')
      }
    }
    const atualizadas = await getMinhasDoacoes()
    setDoacoes(atualizadas.doacoes)
  }

  useEffect(() => { carregar() }, [])

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

   return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Minhas Doações</h1>
        <p className="text-sm text-muted-foreground mb-6">Gerencie todos os produtos reservados aqui</p>

        {doacoes.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="space-y-4">
            {doacoes.map((d) => {
              const info = statusInfo[d.status]
              return (
                <div key={d.idDoacao} className="flex items-center justify-between bg-white p-4 rounded shadow border">
                  <div>
                    <h2 className="font-semibold">{d.produto.descricao}</h2>
                    <p className="text-sm text-gray-600">
                      {d.quantidade} {d.produto.unidade} • Coleta: {new Date(d.dataPlanejada).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1', info.cor)}>
                      {info.icone} {info.texto}
                    </span>
                    {d.status !== 'RECEBIDA' && d.status !== 'CANCELADA' && (
                      <button
                        onClick={() => handleCancelar(d.idDoacao)}
                        disabled={loadingId === d.idDoacao}
                        className="p-2 rounded hover:bg-gray-100"
                        title="Cancelar doação"
                      >
                        <X size={16} className="text-red-600" />
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