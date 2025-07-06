import { useState } from 'react'
import { atualizarStatusDoacao } from '../../../../shared/services/doacaoService'
import { toast } from 'react-toastify'
import type { Doacao } from '../../../../shared/types/shared.types'

interface Props {
  id: number
  statusAtual: Doacao['status']
  quantidadeAtual: number
  onClose: () => void
  onUpdate: () => void
}

export default function ModalEditarDoacao({
  id,
  statusAtual,
  quantidadeAtual,
  onClose,
  onUpdate,
}: Props) {
  const [novoStatus, setNovoStatus] = useState<Doacao['status']>(statusAtual)
  const [quantidade, setQuantidade] = useState(quantidadeAtual)
  const [loading, setLoading] = useState(false)

  const handleSalvar = async () => {
    if (!quantidade || quantidade <= 0) {
      toast.error('Quantidade inválida.')
      return
    }

    try {
      setLoading(true)
      await atualizarStatusDoacao(id, novoStatus, quantidade)
      toast.success('Doação atualizada com sucesso!')
      onUpdate()
      onClose()
    } catch (error) {
      toast.error('Erro ao atualizar a doação.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Editar doação</h2>

        <div className="mb-4">
          <label className="text-sm block mb-1 text-gray-600">Status</label>
          <select
            className="w-full border rounded p-2"
            value={novoStatus}
            onChange={(e) => setNovoStatus(e.target.value as Doacao['status'])}
          >
            <option value="PLANEJADA">Planejada</option>
            <option value="PENDENTE">Pendente</option>
            <option value="RECEBIDA">Recebida</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm block mb-1 text-gray-600">Quantidade</label>
          <input
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 text-sm rounded border text-gray-600 hover:bg-gray-100"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-4 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  )
}
