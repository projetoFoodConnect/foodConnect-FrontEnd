import { type UnidadeMedida, UnidadeMedidaLabels, type TipoProduto, TipoProdutoLabels, type StatusDoacao, StatusDoacaoLabels } from "../types/enums"

export const formatUnidade = (valor: UnidadeMedida) => UnidadeMedidaLabels[valor]
export const formatTipoProduto = (valor: TipoProduto) => TipoProdutoLabels[valor]
export const formatStatusDoacao = (valor: StatusDoacao) => StatusDoacaoLabels[valor]