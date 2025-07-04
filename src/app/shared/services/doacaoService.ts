import api from "../../../lib/api"
import type { Doacao } from "../types/shared.types"

type MinhasDoacoesResponse = {
  doacoes: Doacao[]
}

export async function getMinhasDoacoes(): Promise<MinhasDoacoesResponse> {
  const response = await api.get('/doacoes/user', { withCredentials: true })
  return response.data 
}

export const editarDoacao = async (idDoacao: string, payload: Partial<Doacao>) => {
  await api.put(`/doacao/${idDoacao}`, payload)
}

export const cancelarDoacao = async (idDoacao: string, justificativa: string) => {
  await api.put(`/doacao/${idDoacao}/cancelar`, { justificativa })
}

export const marcarComoRecebida = async (idDoacao: string) => {
  await api.put(`/doacao/${idDoacao}/recebida`)
}