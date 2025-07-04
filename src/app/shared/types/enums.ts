export type UnidadeMedida = 'KG' | 'L' | 'UNIDADE'
export type TipoProduto = 'FRUTA' | 'VERDURA' | 'LEGUME' | 'NAO_PERECIVEL'
export type StatusDoacao = 'PLANEJADA' | 'PENDENTE' | 'RECEBIDA'

export const UnidadeMedidaLabels: Record<UnidadeMedida, string> = {
  KG: 'Kg',
  L: 'Litros',
  UNIDADE: 'Unidade'
}

export const TipoProdutoLabels: Record<TipoProduto, string> = {
  FRUTA: 'Fruta',
  VERDURA: 'Verdura',
  LEGUME: 'Legume',
  NAO_PERECIVEL: 'Não Perecível'
}

export const StatusDoacaoLabels: Record<StatusDoacao, string> = {
  PLANEJADA: 'Planejada',
  PENDENTE: 'Pendente',
  RECEBIDA: 'Recebida'
}