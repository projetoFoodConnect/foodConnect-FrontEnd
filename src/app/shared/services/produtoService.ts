import api from "../../../lib/api"
import type { ProdutoForm } from "../types/produto.types"

// Lista os produtos do usuário logado (DOADOR)
export const listarMeusProdutosService = async () => {
  console.log('[listarMeusProdutos] Iniciando requisição GET /produto/user')
  const response = await api.get('/produto/user')
  return response.data
}

// Lista os produtos disponíveis para todos (RECEPTOR)
export const listarProdutosDisponiveisService = async () => {
  console.log('[listarProdutosDisponiveis] GET /produto/DISPONIVEL')
  const response = await api.get('/produto/DISPONIVEL')
  return response.data
}

// Cadastra novo produto
export const cadastrarProdutoService = async (form: ProdutoForm) => {
  const payload = {
    ...form,
    imagem: form.imagem || 'sem imagem',
  }
  console.log('[cadastrarProduto] Enviando payload:', payload)
  const response = await api.post('/produto/cadastrar', payload)
  console.log('[cadastrarProduto] Produto cadastrado com sucesso:', response.data)
  return response.data
}

// Atualiza um produto
export const atualizarProdutoService = async (id: number, form: ProdutoForm) => {
  const response = await api.put(`/produto/${id}`, form)
  return response.data
}

// Remove (desativa) um produto
export const deletarProdutoService = async (id: number) => {
  const response = await api.put(`/produto/delete/${id}`)
  return response.data
}
