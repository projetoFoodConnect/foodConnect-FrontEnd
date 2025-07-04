import { Pencil, Trash2, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Layout } from "../../../../shared/components/layout/Layout"
import type { Doacao } from "../../../../shared/types/shared.types"
import { formatDate } from "../../../../shared/utils/date"
import { formatStatusDoacao } from "../../../../shared/utils/formatters"
import { cancelarDoacao, editarDoacao, getMinhasDoacoes, marcarComoRecebida } from "../../../../shared/services/doacaoService"

export function DoadorDoacoes() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([])

  const carregar = async () => {
    try {
      const data = await getMinhasDoacoes()
      const ordenado = data.sort(
        (a, b) => new Date(b.dataColeta).getTime() - new Date(a.dataColeta).getTime()
      )
      setDoacoes(ordenado)
    } catch (err) {
      console.error('Erro ao buscar doações:', err)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const handleRecebida = async (id: string) => {
    await marcarComoRecebida(id)
    await carregar()
  }

  const handleCancelar = async (id: string) => {
    const motivo = prompt('Informe o motivo do cancelamento:')
    if (!motivo) return
    await cancelarDoacao(id, motivo)
    await carregar()
  }

  const handleEditar = async (doacao: Doacao) => {
    const novaQtd = prompt('Nova quantidade:', doacao.quantidade.toString())
    const novaData = prompt('Nova data (aaaa-mm-dd):', doacao.dataColeta.slice(0, 10))
    if (!novaQtd || !novaData) return
    await editarDoacao(doacao.id, {
      quantidade: Number(novaQtd),
      dataColeta: novaData
    })
    await carregar()
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Minhas Doações</h1>
          <p className="text-sm text-gray-500">Acompanhe suas doações e atualize seu status.</p>
        </div>

        {doacoes.length === 0 ? (
          <p className="text-gray-500">Nenhuma doação encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doacoes.map((d) => (
              <div key={d.id} className="border rounded-xl p-4 bg-white shadow-sm">
                <h3 className="text-lg font-bold text-green-800">{d.produtoDescricao}</h3>
                <p className="text-sm text-gray-600">Quantidade: {d.quantidade}</p>
                <p className="text-sm text-gray-600">Data de coleta: {formatDate(d.dataColeta)}</p>
                <p className="text-sm text-gray-500">Status: {formatStatusDoacao(d.status)}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditar(d)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Pencil className="w-4 h-4" /> Editar
                  </button>
                  <button
                    onClick={() => handleCancelar(d.id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Cancelar
                  </button>
                  {d.status === 'PLANEJADA' && (
                    <button
                      onClick={() => handleRecebida(d.id)}
                      className="flex items-center gap-1 text-sm text-green-700 hover:underline"
                    >
                      <CheckCircle className="w-4 h-4" /> Marcar como recebida
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}