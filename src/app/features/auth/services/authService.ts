import type { LoginPayload, LoginResponse, RegisterPayload } from '../types/auth.types'
import api from '../../../../lib/api'

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/user/login', payload, { withCredentials: true })
  return response.data
}

export async function registerUser(payload: RegisterPayload) {
  const response = await api.post('/user/register', payload, { withCredentials: true })
  return response.data
}

export const logoutService = async () => {
  await api.post('/user/logout', { withCredentials: true })
}
