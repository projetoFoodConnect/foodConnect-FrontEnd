// src/app/features/dashboard/doador/services/produtoService.ts

import api from "../../../../../lib/api"
import type { Produto } from "../../../../shared/types/shared.types"
import type { ProdutoForm } from "../../../../shared/types/produto.types"


// Listar produtos do usuário
export const listarMeusProdutos = async (): Promise<Produto[]> => {
  try {
    console.log('[listarMeusProdutos] Iniciando requisição GET /produto/user')
    const response = await api.get('/produto/user')
    console.log('[listarMeusProdutos] Sucesso:', response.data)
    return response.data
  } catch (error) {
    console.error('[listarMeusProdutos] Erro na requisição:', error)
    throw error
  }
}

// Cadastrar produto
export const cadastrarProduto = async (form: ProdutoForm): Promise<void> => {
  try {
    const formData = new FormData()
    formData.append('descricao', form.descricao)
    formData.append('quantidade', form.quantidade.toString())
    formData.append('unidade', form.unidade)
    formData.append('tipo', form.tipo)
    if (form.imagem) {
      formData.append('imagem', form.imagem)
    }

    console.log('[cadastrarProduto] Enviando payload:', {
      ...form,
      imagem: form.imagem?.name || 'sem imagem',
    })

    const response = await api.post('/produto/cadastrar', formData)
    console.log('[cadastrarProduto] Produto cadastrado com sucesso:', response.data)
  } catch (error) {
    console.error('[cadastrarProduto] Erro ao cadastrar produto:', error)
    throw error
  }
}

// Atualizar produto
export const atualizarProduto = async (id: string, form: ProdutoForm): Promise<void> => {
  try {
    const formData = new FormData()
    formData.append('descricao', form.descricao)
    formData.append('quantidade', form.quantidade.toString())
    formData.append('unidade', form.unidade)
    formData.append('tipo', form.tipo)
    if (form.imagem) {
      formData.append('imagem', form.imagem)
    }

    console.log(`[atualizarProduto] Atualizando produto ${id} com dados:`, form)
    await api.put(`/produto/${id}`, formData)
  } catch (error) {
    console.error('[atualizarProduto] Erro ao atualizar produto:', error)
    throw error
  }
}

// Deletar produto (PUT, não DELETE)
export const deletarProduto = async (id: string): Promise<void> => {
  try {
    console.log(`[deletarProduto] Enviando PUT para /produto/delete/${id}`)
    await api.put(`/produto/delete/${id}`)
    console.log('[deletarProduto] Produto deletado com sucesso.')
  } catch (error) {
    console.error('[deletarProduto] Erro ao deletar produto:', error)
    throw error
  }
}
