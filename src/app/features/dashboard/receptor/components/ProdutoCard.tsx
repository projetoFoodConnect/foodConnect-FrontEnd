import { useState } from "react"
import type { Produto } from "../../../../shared/types/shared.types"
import { ProdutoDetalhesModal } from "./ProdutoDetalhesModal"


interface Props {
  produto: Produto
  onReservar: () => void
}

export function ProdutoCard({ produto, onReservar }: Props) {
  const [abrirDetalhes, setAbrirDetalhes] = useState(false)

  return (
    <>
      <div
        onClick={() => setAbrirDetalhes(true)}
        className="bg-white rounded shadow hover:shadow-md transition cursor-pointer "
      >
        <img
          src={produto.imagemUrl || produto.imagem || "/sem-imagem.png"}
          alt={produto.descricao}
          className="w-full h-40 object-cover rounded-t"
        />
        <div className="p-3">
          <h2 className="font-bold text-green-800">{produto.descricao}</h2>
          <p className="text-sm text-gray-500">
            {produto.quantidade} {produto.unidade} • {produto.tipo}
          </p>
          <p className="text-xs text-gray-400">
            Postado em: {new Date(produto.dataPostagem).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {abrirDetalhes && (
        <ProdutoDetalhesModal
            produto={produto}
            onClose={() => setAbrirDetalhes(false)}
            onReservar={() => {
                onReservar()
                setAbrirDetalhes(false)
            }}
        />
      )}
    </>
  )
}
