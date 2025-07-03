export type PerfilUsuario = 'DOADOR' | 'RECEPTOR' | 'ADMINISTRADOR'
export type StatusUsuario = 'ATIVO' | 'INATIVO'

export interface Endereco {
  cep?: string
  rua?: string
  numero?: string
  bairro?: string
  cidade?: string
  estado?: string
}

export interface FormDataCadastro {
  perfilUsuario?: PerfilUsuario
  nomeOrganizacao?: string
  nome?: string
  email?: string
  telefone?: string
  senha?: string
  confirmarSenha?: string
  termosAceitos?: boolean
  endereco?: Endereco
}

export interface RegisterPayload {
  nome: string
  email: string
  senha: string
  telefone: string
  endereco: string
  perfilUsuario: PerfilUsuario
  nomeOrganizacao?: string
}

export interface LoginPayload {
  email: string
  senha: string
}

export interface User {
  idUsuario: number
  nome: string
  email: string
  telefone: string
  endereco: string
  perfilUsuario: PerfilUsuario
  nomeOrganizacao?: string
  dataCadastro: string
  lastLogin?: string
  status: StatusUsuario
}

export interface LoginResponse {
  message: string
  user: User
}