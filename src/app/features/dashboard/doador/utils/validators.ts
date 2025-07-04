import type { ProdutoForm } from "../../../../shared/types/produto.types"

export const validarProdutoForm = (produto: ProdutoForm): string[] => {
  const erros: string[] = []

  if (!produto.descricao || produto.descricao.trim().length < 2) {
    erros.push('Descrição deve conter pelo menos 2 caracteres.')
  }

  if (!produto.quantidade || produto.quantidade <= 0) {
    erros.push('Quantidade deve ser maior que zero.')
  }

  if (!produto.unidade) {
    erros.push('Unidade de medida é obrigatória.')
  }

  if (!produto.tipo) {
    erros.push('Tipo de produto é obrigatório.')
  }

  return erros
}