import { BadgeCheck, XCircle, CalendarDays, Package, Pencil, Trash2, X } from 'lucide-react'
import type { Produto } from '../../../../shared/types/shared.types'
import type { JSX } from 'react'

interface Props {
  produto: Produto | null
  onClose: () => void
  onEditar: (produto: Produto) => void
  onExcluir: (idProduto: string) => Promise<void>
}

export function ProdutoDetalhesModal({ produto, onClose, onEditar, onExcluir }: Props) {
  if (!produto) return null

  const formatarData = (data: string) =>
    new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  const statusInfo: Record<'DISPONIVEL' | 'INDISPONIVEL' | 'DOADO', { texto: string; cor: string; icon: JSX.Element }> = {
    DISPONIVEL: { texto: 'Disponível', cor: 'text-green-600', icon: <BadgeCheck size={18} /> },
    INDISPONIVEL: { texto: 'Indisponível', cor: 'text-gray-500', icon: <XCircle size={18} /> },
    DOADO: { texto: 'Doado', cor: 'text-blue-600', icon: <CalendarDays size={18} /> },
  }

  const status = statusInfo[produto.status as keyof typeof statusInfo] || {
    texto: 'Desconhecido',
    cor: 'text-red-600',
    icon: <XCircle size={18} />,
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-4 sm:p-6 relative shadow-lg
        max-h-[95vh] overflow-y-auto
        sm:max-h-[90vh]
        ">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-500 hover:text-red-600"
        >
          <X size={20} />
        </button>

        {/* Título */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Package className="text-green-700" />
          <h2 className="text-lg sm:text-xl font-semibold text-green-800">Detalhes do Produto</h2>
        </div>

        {/* Conteúdo */}
        <div className="space-y-3">
          <img
            src={produto.imagem || '/sem-imagem.png'}
            alt={produto.descricao}
            className="w-full h-40 sm:h-48 object-cover rounded-md"
          />

          <div>
            <p className="text-xs sm:text-sm text-gray-500">Descrição:</p>
            <p className="font-medium text-gray-800 text-sm sm:text-base">{produto.descricao}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <p>
              Quantidade: <span className="font-medium">{produto.quantidade}</span>
            </p>
            <p>
              Unidade: <span className="font-medium">{produto.unidade}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <p>Tipo:</p>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {produto.tipo}
            </span>
          </div>

          <div className="text-xs sm:text-sm text-gray-600">
            <p>Cadastrado em: {formatarData(produto.dataPostagem)}</p>
          </div>

          <div className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${status.cor}`}>
            {status.icon}
            {status.texto}
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
          <button
            onClick={() => onExcluir(String(produto.idProduto))}
            className="flex items-center justify-center gap-1 px-4 py-2 text-xs sm:text-sm text-white bg-red-600 rounded hover:bg-red-700 w-full sm:w-auto"
          >
            <Trash2 size={16} /> Excluir
          </button>
          <button
            onClick={() => onEditar(produto)}
            className="flex items-center justify-center gap-1 px-4 py-2 text-xs sm:text-sm text-white bg-green-700 rounded hover:bg-green-800 w-full sm:w-auto"
          >
            <Pencil size={16} /> Editar
          </button>
        </div>
      </div>
    </div>
  )
}
