import type { UnidadeMedida, TipoProduto } from "./enums"

export interface ProdutoForm {
  descricao: string
  quantidade: number
  unidade: UnidadeMedida
  tipo: TipoProduto
  imagem: File | null
}