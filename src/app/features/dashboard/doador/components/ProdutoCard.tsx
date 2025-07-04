import type { Produto } from "../../../../shared/types/shared.types"
import { formatDate } from "../../../../shared/utils/date"
import { formatTipoProduto, formatUnidade } from "../../../../shared/utils/formatters"

interface Props {
  produto: Produto
  onEditar: (produto: Produto) => void
  onExcluir: (id: string) => void
}

export function ProdutoCard({ produto, onEditar, onExcluir }: Props) {
  return (
    <div className="border rounded-xl shadow p-4 flex flex-col gap-2 bg-white">
      {produto.imagemUrl && (
        <img src={produto.imagemUrl} alt={produto.descricao} className="h-40 object-cover rounded-lg" />
      )}

      <div className="font-bold text-lg">{produto.descricao}</div>
      <div>Tipo: {formatTipoProduto(produto.tipo)}</div>
      <div>
        Quantidade: {produto.quantidade} {formatUnidade(produto.unidade)}
      </div>
      <div className="text-sm text-gray-500">Cadastrado em: {formatDate(produto.createdAt)}</div>

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onEditar(produto)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => onExcluir(produto.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  )
}