import axios from 'axios'
import type { FormDataCadastro, LoginPayload, LoginResponse, RegisterPayload } from '../types/auth.types'

const API = 'http://localhost:3000/api'

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post(`${API}/user/login`, payload, {
    withCredentials: true,
  })
  return response.data
}

export async function registerUser(payload: RegisterPayload) {
  const response = await axios.post(`${API}/user/register`, payload)
  return response.data
}