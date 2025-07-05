import type { LoginPayload, LoginResponse, RegisterPayload } from '../types/auth.types'
import api from '../../../../lib/api'


export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/user/login', payload)
  return response.data
}

export async function registerUser(payload: RegisterPayload) {
  const response = await api.post('/user/register', payload)
  return response.data
}

export const logoutService = async () => {
  // usa o mesmo cliente para limpar o cookie
  await api.post('/user/logout')
}
