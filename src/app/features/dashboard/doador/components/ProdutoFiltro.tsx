import type { TipoProduto } from "../../../../shared/types/enums"


interface Props {
  filtro: TipoProduto | 'TODOS'
  onChange: (valor: TipoProduto | 'TODOS') => void
}

export function ProdutoFiltro({ filtro, onChange }: Props) {
  return (
    <select value={filtro} onChange={(e) => onChange(e.target.value as any)} className="rounded p-1">
      <option value="TODOS">Todos os tipos</option>
      <option value="FRUTA">Frutas</option>
      <option value="VERDURA">Verduras</option>
      <option value="LEGUME">Legumes</option>
      <option value="NAO_PERECIVEL">Não Perecíveis</option>
    </select>
  )
}