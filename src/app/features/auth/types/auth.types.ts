export type PerfilUsuario = 'DOADOR' | 'RECEPTOR'

export interface Endereco {
  rua?: string
  numero?: string
  bairro?: string
  cidade?: string
  estado?: string
}

export interface FormDataCadastro {
  nome?: string
  email?: string
  endereco?: Endereco
  telefone?: string
  senha?: string
  confirmarSenha?: string
  termosAceitos?: boolean
  perfilUsuario?: PerfilUsuario
  nomeOrganizacao?: string
}
