import axios from 'axios'

const API_BASE_URL = 'https://foodconnect-api.onrender.com' 

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
  const response = await axios.post(`${API_BASE_URL}/user/login`, payload, {
    withCredentials: true, 
  })
  return response.data
}
