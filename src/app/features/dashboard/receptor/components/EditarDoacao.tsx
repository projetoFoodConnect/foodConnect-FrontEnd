import { useState } from "react"
import { X, Save, CheckCircle, Trash2, Pencil } from "lucide-react"
import { toast } from "react-toastify"
import type { Doacao } from "../../../../shared/types/shared.types"
import { cancelarDoacao, editarDoacao, marcarComoRecebida } from "../../../../shared/services/doacaoService"

interface Props {
    doacao: Doacao
    onClose: () => void
    onAtualizado: () => void
}

export function EditarDoacao({ doacao, onClose, onAtualizado }: Props) {
    const [quantidade, setQuantidade] = useState(doacao.quantidade)
    const [dataColeta, setDataColeta] = useState(doacao.dataPlanejada.slice(0, 10))
    const [loading, setLoading] = useState(false)

    const atualizar = async () => {
        setLoading(true)
        try {
            const payload: any = {}

            if (quantidade !== doacao.quantidade) {
                payload.quantidade = quantidade
            }

            if (dataColeta !== doacao.dataPlanejada.slice(0, 10)) {
                payload.dataPlanejada = `${dataColeta}T12:00:00` // evita fuso errado
            }

            if (Object.keys(payload).length === 0) {
                toast.info("Nenhuma alteração detectada.")
                setLoading(false)
                return
            }

            await editarDoacao(doacao.idDoacao, payload)

            toast.success("Doação atualizada com sucesso!")
            onAtualizado()
            onClose()
        } catch (err) {
            toast.error("Erro ao atualizar doação.")
        } finally {
            setLoading(false)
        }
    }


    const cancelar = async () => {
        if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return
        setLoading(true)
        try {
            await cancelarDoacao(doacao.idDoacao)
            toast.error("Doação cancelada.")
            onAtualizado()
            onClose()
        } catch (err) {
            toast.error("Erro ao cancelar doação.")
        } finally {
            setLoading(false)
        }
    }

    const atualizarRecebida = async () => {
        if (!confirm("Tem certeza que deseja marcar esta doação como recebida?")) return
        setLoading(true)
        try {
            await marcarComoRecebida(doacao.idDoacao)
            toast.success("Doação marcada como recebida com sucesso.")
            onAtualizado()
            onClose()
        } catch (err) {
            toast.error("Erro ao marcar doação como recebida.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X />
                </button>

                <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
                    <Pencil size={20} />
                    Editar Doação
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Data de Coleta</label>
                        <input
                            type="date"
                            className="w-full border rounded px-3 py-2 text-sm"
                            value={dataColeta}
                            onChange={(e) => setDataColeta(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Quantidade</label>
                        <p className="text-xs text-gray-500">Somente alterar para um número menor do que o atual.</p>
                        <input
                            type="number"
                            min={1}
                            className="w-full border rounded px-3 py-2 text-sm"
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between gap-2">
                    <button
                        onClick={cancelar}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 rounded"
                    >
                        <Trash2 size={20} /> Cancelar Doação
                    </button>

                    <div className="flex gap-2">
                        {doacao.status === "PENDENTE" && (
                            <button
                                onClick={atualizarRecebida}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
                            >
                                <CheckCircle size={24} /> Marcar como Recebida
                            </button>
                        )}

                        <button
                            onClick={() => atualizar()}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                        >
                            <Save size={16} /> Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
