import { useState } from 'react'
import { toast } from 'react-toastify'
import type { Produto } from '../../../../shared/types/shared.types'

interface Props {
  produto: Produto | null
  onClose: () => void
  onReservarConfirmado: (quantidade: number, dataPlanejada: string) => void
}

function ajustarDataParaFuso(dateStr: string): string {
  const [ano, mes, dia] = dateStr.split('-').map(Number)
  const dataCorrigida = new Date(ano, mes - 1, dia)
  return dataCorrigida.toISOString()
}

export function ReservaModal({ produto, onClose, onReservarConfirmado }: Props) {
  const [quantidade, setQuantidade] = useState<number>(produto?.quantidade || 1)
  const [data, setData] = useState('')

  if (!produto) return null

  const handleReservar = () => {
    if (!data || quantidade <= 0 || quantidade > produto.quantidade) {
      toast.error('Preencha os campos corretamente.')
      return
    }

    const dataCorrigida = ajustarDataParaFuso(data)
    onReservarConfirmado(quantidade, dataCorrigida)
    toast.success('Reserva solicitada com sucesso!')
    onClose()
  }

  const hoje = new Date().toISOString().split('T')[0]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Reservar: {produto.descricao}</h2>

        <label className="text-sm">Quantidade (máx. {produto.quantidade}):</label>
        <input
          type="number"
          min={1}
          max={produto.quantidade}
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          className="w-full border rounded px-2 py-1 mb-4"
        />

        <label className="text-sm">Data de retirada:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          min={hoje}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button
            onClick={handleReservar}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
