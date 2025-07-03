import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export interface UserProfile {
  idUsuario: number
  nome: string
  email: string
  perfilUsuario: 'DOADOR' | 'RECEPTOR' | 'ADMINISTRADOR'
  nomeOrganizacao?: string
  endereco?: string
  dataCadastro?: string
  lastLogin?: string
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await axios.get(`${API_BASE_URL}/api/user`, {
    withCredentials: true
  })
  return response.data.user
}