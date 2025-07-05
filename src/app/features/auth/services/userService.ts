import api from '../../../../lib/api'
import type { User } from '../types/auth.types'

export async function getProfile(): Promise<User> {
  const response = await api.get<{ usuario: User }>('/user', {
    withCredentials: true,
  })

  return response.data.usuario
}