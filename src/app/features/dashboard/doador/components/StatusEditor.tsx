import { useState } from 'react'
import type { Doacao } from '../../../../shared/types/shared.types'
import { toast } from 'react-toastify'
import { atualizarStatusDoacao } from '../../../../shared/services/doacaoService'

interface Props {
  doacao: Doacao
  onClose: () => void
  onAtualizado: () => void
}

export function StatusEditor({ doacao, onClose, onAtualizado }: Props) {
  const [quantidade, setQuantidade] = useState(doacao.quantidade)
  const [data, setData] = useState(doacao.dataPlanejada.split('T')[0])
  const [loading, setLoading] = useState(false)

  const handleSalvar = async () => {
    setLoading(true)
    try {
      const dataComHora = new Date(`${data}T12:00:00`).toISOString()
      await atualizarStatusDoacao(doacao.idDoacao, 'ATUALIZADA', quantidade, dataComHora)
      toast.success('Doação atualizada com sucesso!')
      onAtualizado()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar a doação.')
    } finally {
      setLoading(false)
    }
  }

  const handleRecebida = async () => {
    setLoading(true)
    try {
      await atualizarStatusDoacao(doacao.idDoacao, 'RECEBIDA')
      toast.success('Doação marcada como recebida.')
      onAtualizado()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao marcar como recebida.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelar = async () => {
    if (!confirm('Tem certeza que deseja cancelar esta doação?')) return
    setLoading(true)
    try {
      await atualizarStatusDoacao(doacao.idDoacao, 'CANCELADA')
      toast.success('Doação cancelada.')
      onAtualizado()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cancelar a doação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4">Editar Doação</h2>

        <div className="mb-4">
          <label className="text-sm">Quantidade:</label>
          <p className='text-xs text-gray-400 mb-1'>Só pode ser alterada para um número menor.</p>
          <input
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm">Data planejada:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={handleRecebida}
          disabled={loading}
          className="w-full mb-4 bg-green-100 text-green-700 hover:bg-green-200 text-sm py-2 rounded font-medium"
        >
          Marcar como Recebida
        </button>

        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={handleCancelar}
            disabled={loading}
            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancelar Doação
          </button>

          <button
            onClick={handleSalvar}
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}