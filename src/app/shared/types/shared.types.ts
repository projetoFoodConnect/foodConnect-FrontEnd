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
  donoNome?: string
  donoOrganizacao?: string
}

export type Doacao = {
  idDoacao: number
  status: 'PLANEJADA' | 'PENDENTE' | 'RECEBIDA'
  quantidade: number
  dataReserva: string
  dataPlanejada: string
  produto: {
    descricao: string
    tipo: string
    unidade: string
  }
  receptor: {
    nome: string
    email: string
  }
  doador: {
    nome: string
    email: string
    nomeOrganizacao: string
  }
}
