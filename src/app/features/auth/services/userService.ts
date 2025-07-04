import axios from 'axios'
import type { User } from '../types/auth.types'

const API = 'http://localhost:3000/api'

export async function getProfile(): Promise<User> {
  const response = await axios.get<{ usuario: User }>(`${API}/user`, {
    withCredentials: true,
  })

  return response.data.usuario
}