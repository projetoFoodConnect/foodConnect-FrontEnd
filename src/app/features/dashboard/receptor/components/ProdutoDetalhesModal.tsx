import { X, ShoppingCart } from "lucide-react"
import type { Produto } from "../../../../shared/types/shared.types"

interface Props {
  produto: Produto
  onClose: () => void
  onReservar: () => void
}

export function ProdutoDetalhesModal({ produto, onClose, onReservar }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
          🧺 Detalhes do Produto
        </h2>

        <img
          src={produto.imagemUrl || produto.imagem || "/sem-imagem.png"}
          alt={produto.descricao}
          className="w-full h-48 object-cover rounded mb-4"
        />

        <p className="text-sm text-gray-600"><strong>Descrição:</strong> {produto.descricao}</p>
        <p className="text-sm text-gray-600"><strong>Quantidade:</strong> {produto.quantidade} {produto.unidade}</p>
        <p className="text-sm text-gray-600"><strong>Tipo:</strong> {produto.tipo}</p>
        <p className="text-sm text-gray-600">
          <strong>Postado em:</strong> {new Date(produto.dataPostagem).toLocaleDateString('pt-BR')}
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onReservar}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
          >
            <ShoppingCart size={16} /> Reservar
          </button>
        </div>
      </div>
    </div>
  )
}
