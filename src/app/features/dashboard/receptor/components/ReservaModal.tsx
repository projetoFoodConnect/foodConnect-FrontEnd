import { useState } from 'react'
import { toast } from 'react-toastify'
import { registrarDoacao } from '../../../../shared/services/doacaoService'
import type { Produto } from '../../../../shared/types/shared.types'

interface ReservaModalProps {
  produto: Produto
  onClose: () => void
  onReservado: () => void
}

export function ReservaModal({ produto, onClose, onReservado }: ReservaModalProps) {
  const [quantidade, setQuantidade] = useState(produto.quantidade)
  const [dataPlanejada, setDataPlanejada] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReservar = async () => {
    if (!dataPlanejada) {
      toast.error('Informe a data da retirada')
      return
    }

    if (quantidade <= 0 || quantidade > produto.quantidade) {
      toast.error('Quantidade inválida')
      return
    }

    try {
      setLoading(true)
      await registrarDoacao({
        idProduto: produto.idProduto,
        quantidade,
        dataPlanejada,
      })
      toast.success('Reserva realizada com sucesso!')
      onReservado()
      onClose()
    } catch (error) {
      toast.error('Erro ao reservar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-green-800">
          Reservar: {produto.descricao}
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Quantidade desejada</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            min={1}
            max={produto.quantidade}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">Disponível: {produto.quantidade}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700">Data da retirada</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={dataPlanejada}
            onChange={(e) => setDataPlanejada(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleReservar}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Reservando...' : 'Confirmar Reserva'}
          </button>
        </div>
      </div>
    </div>
  )
}
