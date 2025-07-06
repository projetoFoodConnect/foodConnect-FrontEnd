import type { UnidadeMedida, TipoProduto } from "./enums"


export interface Produto {
  _count: any
  idProduto: string
  dataPostagem: string
  status: string
  doacoes: any
  imagem: string
  id: string
  descricao: string
  quantidade: number
  unidade: UnidadeMedida
  tipo: TipoProduto
  imagemUrl?: string
  createdAt: string
  donoId: string
  donoNome: string
  donoOrganizacao: string
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