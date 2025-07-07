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
  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(',', '.')
    if (/^\d*\.?\d*$/.test(valor)) {
      setQuantidade(valor === '' ? 0 : Number(valor))
    }
  }
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white rounded-md p-8 w-full max-w-lg shadow-2xl border border-gray-200 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Fechar modal"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        <h2 className="text-2xl font-extrabold mb-6 text-gray-700 flex items-center gap-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          Reservar: <span className="truncate">{produto.descricao}</span>
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade <span className="text-xs text-gray-400">(máx. {produto.quantidade})</span>
          </label>
          <input
            type="number"
            min={1}
            max={produto.quantidade}
            value={quantidade}
            onChange={handleQuantidadeChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de retirada
          </label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            min={hoje}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleReservar}
            className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
