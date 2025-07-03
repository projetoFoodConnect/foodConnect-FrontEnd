import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000' 

export interface LoginPayload {
  email: string
  senha: string
}

export interface LoginResponse {
  message: string
  user: {
    id: number
    nameUser: string
    email: string
    lastLogin: string
    perfilUsuario: string
  }
}

export interface ProfileResponse {
  user: {
    idUsuario: number
    nome: string
    email: string
    perfilUsuario: 'DOADOR' | 'RECEPTOR' | 'ADMINISTRADOR'
  }
}

export async function loginRequest(payload: LoginPayload): Promise<void> {
  console.log('Enviando login:', payload)
  await axios.post(`${API_BASE_URL}/api/user/login`, payload, {
    withCredentials: true,
  })
}

export interface RegisterPayload {
  nome: string
  email: string
  senha: string
  telefone: string
  endereco: string
  perfilUsuario: 'DOADOR' | 'RECEPTOR'
  nomeOrganizacao: string
}


export async function registerUser(payload: RegisterPayload): Promise<{ message: string }> {
  const response = await axios.post(`${API_BASE_URL}/api/user/register`, payload)
  return response.data
}
