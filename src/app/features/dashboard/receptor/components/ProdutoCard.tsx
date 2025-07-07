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
        className="rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <img
          src={produto.imagem || produto.imagem || "/sem-imagem.png"}
          alt={produto.descricao}
          className="w-full h-36 object-cover rounded-md mb-2"
        />
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-green-800">{produto.descricao}</h2>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
            {produto.tipo}
          </span>


          <p className="text-sm text-gray-600 mt-1">
            {Number(produto.quantidade).toFixed(3).replace(/\.?0+$/, "")} {produto.unidade}
          </p>

          <p className="text-xs text-gray-600">
            Postado em: {new Date(produto.dataPostagem).toLocaleDateString('pt-BR')}
          </p>
          {produto.doador.nomeOrganizacao && (
            <p className="text-xs text-gray-600">Doador: <span className="font-medium">{produto.doador.nomeOrganizacao}</span></p>
          )}
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
