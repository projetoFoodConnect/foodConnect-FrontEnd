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
  }
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post(`${API_BASE_URL}/api/user/login`, payload, {
    withCredentials: true, 
  })
  return response.data
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
