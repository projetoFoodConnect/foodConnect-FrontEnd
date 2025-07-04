import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { BadgeCheck, XCircle, Eye, Pencil, Trash2 } from 'lucide-react'
import type { Produto } from '../../../../shared/types/shared.types'

interface ProdutoDetalhesModalProps {
  produto: Produto
  onClose: () => void
  onEditar: (produto: Produto) => void
  onExcluir: (produto: Produto) => void
}

export function ProdutoDetalhesModal({ produto, onClose, onEditar, onExcluir }: ProdutoDetalhesModalProps) {
  const formatarData = (data: string) =>
    new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  const statusLabel = {
    DISPONIVEL: { texto: 'Disponível para doação', cor: 'text-green-600', icone: <BadgeCheck size={16} /> },
    INDISPONIVEL: { texto: 'Indisponível', cor: 'text-gray-500', icone: <XCircle size={16} /> },
    DOADO: { texto: 'Produto doado', cor: 'text-blue-600', icone: <Eye size={16} /> },
  }

  const statusAtual = statusLabel[produto.status as keyof typeof statusLabel] || {
    texto: 'Status desconhecido',
    cor: 'text-red-600',
    icone: <XCircle size={16} />,
  }

  return (
    <Modal onClose={onClose} title="Detalhes do Produto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <img
            src={produto.imagem || '/sem-imagem.png'}
            alt={produto.descricao}
            className="w-full h-60 object-cover rounded-md"
          />

          <div className="mt-4 bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-bold text-gray-800">Informações Básicas</h3>
            <p className="text-sm text-gray-600">ID do Produto: <strong>#{produto.id}</strong></p>
            <p className="text-sm text-gray-600">Categoria: <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">{produto.tipo}</span></p>
            <p className="text-sm text-gray-600">Quantidade: <strong>{produto.quantidade} {produto.unidade}</strong></p>
          </div>

          <div className="mt-4 bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-bold text-gray-800">Status Atual</h3>
            <p className={`text-sm mt-1 font-medium flex items-center gap-2 ${statusAtual.cor}`}>
              {statusAtual.icone} {statusAtual.texto}
            </p>
            <p className="text-xs text-gray-500 mt-1">Atualizado em {formatarData(produto.createdAt)}</p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{produto.descricao}</h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-blue-600" />
              <div>
                <p className="text-sm font-semibold">Data de Cadastro</p>
                <p className="text-sm text-gray-600">{formatarData(produto.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-green-600" />
              <div>
                <p className="text-sm font-semibold">Quantidade Cadastrada</p>
                <p className="text-sm text-gray-600">{produto.quantidade} {produto.unidade} disponíveis para doação</p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-bold text-gray-800">Reservas e Interesse</h3>
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-purple-600" />
              <div>
                <p className="text-sm font-semibold">Reservas Ativas</p>
                <p className="text-sm text-gray-600">3 pessoas interessadas</p>
              </div>
            </div>
            <p className="text-xs text-purple-800 bg-purple-100 px-3 py-2 rounded-lg">
              Este produto tem interesse de beneficiários. Entre em contato com os interessados para coordenar a doação.
            </p>
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={() => onEditar(produto)} variant="default" className="flex items-center gap-2">
              <Pencil size={16} /> Editar Produto
            </Button>
            <Button onClick={() => onExcluir(produto)} variant="destructive" className="flex items-center gap-2">
              <Trash2 size={16} /> Excluir
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
