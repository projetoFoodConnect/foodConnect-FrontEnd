import api from "../../../lib/api"
import type { ProdutoForm } from "../types/produto.types"
import type { Produto } from "../types/shared.types"

export async function listarMeusProdutos(): Promise<Produto[]> {
  try {
    const response = await api.get("/produto/user", { withCredentials: true })
    return response.data.produtos
  } catch (error) {
    console.error("[listarMeusProdutos] Erro:", error)
    throw error
  }
}

export async function listarTodosProdutosDisponiveis(): Promise<Produto[]> {
  try {
    console.log('[listarTodosProdutosDisponiveis] Requisição GET /produto/DISPONIVEL')
    const response = await api.get('/produto/DISPONIVEL', {
      withCredentials: true,
    })

    return response.data.produtos 
  } catch (error) {
    console.error('[listarTodosProdutosDisponiveis] Erro na requisição:', error)
    throw error
  }
}

export async function cadastrarProduto(form: ProdutoForm) {
  const formData = new FormData()
  formData.append("descricao", form.descricao)
  formData.append("quantidade", String(form.quantidade))
  formData.append("unidade", form.unidade)
  formData.append("tipo", form.tipo)

  if (form.imagem) {
    formData.append("imagem", form.imagem)
  }

  try {
    const response = await api.post("/produto/cadastrar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error("[cadastrarProduto] Erro:", error)
    throw error
  }
}

export async function atualizarProduto(
  id: string,
  form: {
    descricao: string
    quantidade: number
    unidade: string
    tipo: string
    imagem?: File | null
  }
) {
  const formData = new FormData()
  formData.append("descricao", form.descricao)
  formData.append("quantidade", String(form.quantidade))
  formData.append("unidade", form.unidade)
  formData.append("tipo", form.tipo)

  if (form.imagem) {
    formData.append("imagem", form.imagem)
  }

  try {
    const response = await api.put(`/produto/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error("[atualizarProduto] Erro:", error)
    throw error
  }
}

export async function deletarProduto(id: string) {
  try {
    const response = await api.put(`/produto/delete/${id}`, null, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error("[deletarProduto] Erro:", error)
    throw error
  }
}

export async function getProdutosPorStatus(status: string): Promise<Produto[]> {
  try {
    const response = await api.get(`/produto/${status}`, {
      withCredentials: true,
    })
    return response.data.produtos
  } catch (error) {
    console.error(`[getProdutosPorStatus] Erro ao buscar produtos com status ${status}:`, error)
    throw error
  }
}
