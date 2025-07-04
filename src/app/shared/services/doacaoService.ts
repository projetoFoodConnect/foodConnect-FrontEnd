import api from "../../../lib/api"
import type { Doacao } from "../types/shared.types"

type MinhasDoacoesResponse = {
  doacoes: Doacao[]
}

interface NovaDoacaoPayload {
  idProduto: string
  quantidade: number
  dataPlanejada: string 
}

export async function registrarDoacao(payload: NovaDoacaoPayload) {
  try {
    const response = await api.post("/doacao", payload, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error("[registrarDoacao] Erro ao registrar doação:", error)
    throw error
  }
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

export async function atualizarStatusDoacao(idDoacao: number, novoStatus: string) {
  try {
    if (novoStatus === 'CANCELADA') {
      console.log(`Chamando PUT /doacao/${idDoacao}/cancelar`)
      return await api.put(`/doacao/${idDoacao}/cancelar`, null, { withCredentials: true })
    } else {
      console.log(`Chamando PUT /doacao/${idDoacao}`, { status: novoStatus })
      return await api.put(`/doacao/${idDoacao}`, { status: novoStatus }, { withCredentials: true })
    }
  } catch (error) {
    console.error('[atualizarStatusDoacao] Erro:', error)
    throw error
  }
}
