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

export async function atualizarStatusDoacao(
  idDoacao: number,
  novoStatus?: string,
  quantidade?: number,
  dataPlanejada?: string
) {
  try {
    // Se for apenas CANCELAR
    if (novoStatus === 'CANCELADA') {
      return await api.put(`/doacao/${idDoacao}/cancelar`, null, {
        withCredentials: true,
      })
    }

    // Se for marcar como RECEBIDA
    if (novoStatus === 'RECEBIDA') {
      return await api.put(
        `/doacao/${idDoacao}`,
        { status: 'RECEBIDA' },
        { withCredentials: true }
      )
    }

    // Se não for CANCELADA nem RECEBIDA, assume que é edição simples (quantidade / data)
    const payload: any = {}
    if (quantidade !== undefined) payload.quantidade = quantidade
    if (dataPlanejada) payload.dataPlanejada = dataPlanejada

    // ⚠️ se nenhum campo foi alterado, não faz requisição
    if (Object.keys(payload).length === 0) {
      throw new Error('Nada para atualizar.')
    }

    return await api.put(`/doacao/${idDoacao}`, payload, {
      withCredentials: true,
    })
  } catch (error) {
    console.error('[atualizarStatusDoacao] Erro:', error)
    throw error
  }
}