import { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { getMinhasDoacoes, cancelarDoacao, editarDoacao } from '../../../../shared/services/doacaoService'
import type { Doacao } from '../../../../shared/types/shared.types'
import { formatDate } from '../../../../shared/utils/date'
import { formatStatusDoacao } from '../../../../shared/utils/formatters'
import { Layout } from '../../../../shared/components/layout/Layout'

export function ReceptorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])

  const carregarDoacoes = async () => {
    try {
      const data = await getMinhasDoacoes()
      setDoacoes(data)
    } catch (err) {
      console.error('Erro ao buscar doações:', err)
    }
  }

  useEffect(() => {
    carregarDoacoes()
  }, [])

  const handleCancelar = async (id: string) => {
    const motivo = prompt('Informe o motivo do cancelamento:')
    if (!motivo) return
    await cancelarDoacao(id, motivo)
    await carregarDoacoes()
  }

  const handleEditar = async (doacao: Doacao) => {
    const novaQtd = prompt('Nova quantidade:', doacao.quantidade.toString())
    const novaData = prompt('Nova data de coleta (aaaa-mm-dd):', doacao.dataColeta.slice(0, 10))
    if (!novaQtd || !novaData) return
    await editarDoacao(doacao.id, {
      quantidade: Number(novaQtd),
      dataColeta: novaData,
    })
    await carregarDoacoes()
  }

 return (
  <Layout>
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-green-800">Minhas Reservas</h2>
      <p className="text-sm text-gray-600">Acompanhe suas coletas agendadas e passadas</p>

      {doacoes.length === 0 ? (
        <p className="text-gray-600">Nenhuma reserva encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doacoes.map((d) => (
            <div
              key={d.id}
              className="border rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-green-800">{d.produtoDescricao}</h3>
                <p className="text-sm text-gray-600">Qtd: {d.quantidade}</p>
                <p className="text-sm text-gray-600">Data coleta: {formatDate(d.dataColeta)}</p>
                <p className="text-sm text-gray-600">Status: {formatStatusDoacao(d.status)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Doador: {d.donoNome} ({d.donoOrganizacao})
                </p>
              </div>

              {d.status === 'PLANEJADA' && (
                <div className="flex gap-3 mt-3 text-sm">
                  <button
                    onClick={() => handleEditar(d)}
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <Pencil className="w-4 h-4" /> Editar
                  </button>
                  <button
                    onClick={() => handleCancelar(d.id)}
                    className="flex items-center gap-1 text-red-600 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </Layout>
)
}