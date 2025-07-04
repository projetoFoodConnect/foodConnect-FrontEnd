import type { ReactNode } from "react"
import type { UnidadeMedida, TipoProduto, StatusDoacao } from "./enums"


export interface Produto {
  [x: string]: string
  id: string
  descricao: string
  quantidade: number
  unidade: UnidadeMedida
  tipo: TipoProduto
  imagemUrl?: string
  createdAt: string
  donoId: string
  donoNome?: string
  donoOrganizacao?: string
}

export interface Doacao {
  donoNome: ReactNode
  donoOrganizacao: ReactNode
  id: string
  produtoId: string
  produtoDescricao: string
  quantidade: number
  dataColeta: string
  status: StatusDoacao
  justificativaCancelamento?: string
  doadorId: string
  receptorId: string
}