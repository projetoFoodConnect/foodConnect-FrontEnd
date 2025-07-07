import type { TipoProduto, UnidadeMedida } from "./enums"

export type Produto = {
  id: null | undefined
  _count: any
  idProduto: number
  descricao: string
  quantidade: number
  imagem?: string
  unidade: UnidadeMedida
  tipo: TipoProduto
  status: string
  dataPostagem: string 
  doador: {
    idUsuario: number
    nome: string
    nomeOrganizacao: string
  }
}


export type Doacao = {
  idDoacao: number
  status: 'PLANEJADA' | 'PENDENTE' | 'RECEBIDA' | 'CANCELADA'
  quantidade: number
  dataReserva: string
  dataPlanejada: string
  produto: {
    quantidade: number
    descricao: string
    tipo: string
    unidade: string
  }
  receptor: {
    nome: string
    email: string
  }
  doador: {
    idUsuario: number | undefined
    nome: string
    email: string
    nomeOrganizacao: string
  }
}

export type StatusProduto = {
  DISPONIVEL: 'DISPONIVEL',
  INDISPONIVEL: 'INDISPONIVEL',
  DOADO: 'DOADO',
}