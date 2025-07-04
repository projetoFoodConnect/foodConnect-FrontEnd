import api from "../../../lib/api"
import type { Doacao } from "../types/shared.types"

export const getMinhasDoacoes = async (): Promise<Doacao[]> => {
  const { data } = await api.get('/doacoes/user')
  return data
}

export const editarDoacao = async (id: string, payload: Partial<Doacao>) => {
  await api.put(`/doacao/${id}`, payload)
}

export const cancelarDoacao = async (id: string, justificativa: string) => {
  await api.put(`/doacao/${id}/cancelar`, { justificativa })
}

export const marcarComoRecebida = async (id: string) => {
  await api.put(`/doacao/${id}/recebida`)
}