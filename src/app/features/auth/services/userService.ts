import api from '../../../../lib/api'
import type { User } from '../types/auth.types'

export async function getProfile(): Promise<User> {
  const response = await api.get<{ usuario: User }>('/user', {
    withCredentials: true,
  })

  return response.data.usuario
}

export async function updateProfile(payload: Partial<User>) {
  return await api.put('/user/update', payload, { withCredentials: true })
}

export async function deleteAccount() {
  return await api.put('/user/delete', { withCredentials: true })
}

