import { BadgeCheck, XCircle } from 'lucide-react'

type ProdutoCardProps = {
  imagem: string
  descricao: string
  tipo: string
  quantidade: number
  unidade: string
  reservas?: number
  dataCadastro: string
  status: string
  onClick?: () => void
}

export function ProdutoCard({
  imagem,
  descricao,
  tipo,
  quantidade,
  unidade,
  reservas,
  dataCadastro,
  status,
  onClick,
}: ProdutoCardProps) {
  const formatarData = (data: string) =>
    new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const statusLabel = {
    DISPONIVEL: { texto: 'Disponível', cor: 'text-green-600', icone: <BadgeCheck size={14} /> },
    INDISPONIVEL: { texto: 'Indisponível', cor: 'text-gray-500', icone: <XCircle size={14} /> },
    DOADO: { texto: 'Doado', cor: 'text-blue-600', icone: '✔️' },
  }

  const statusAtual = statusLabel[status as keyof typeof statusLabel] || {
    texto: 'Desconhecido',
    cor: 'text-red-600',
    icone: '❓',
  }

  return (
    <div
      onClick={onClick}
      className="bg-white shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <img
        src={imagem || '/sem-imagem.png'}
        alt={descricao}
        className="w-full h-36 object-cover rounded-md mb-2"
      />

      <h3 className="text-lg font-semibold text-green-800">{descricao}</h3>

      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
        {tipo}
      </span>

      <p className="text-sm text-gray-600 mt-1">
        {quantidade} {unidade}
      </p>

      {typeof reservas === 'number' && (
        <p className="text-sm text-gray-600">{reservas} reservas</p>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Cadastrado em {formatarData(dataCadastro)}
      </p>

      <p className={`text-sm font-medium mt-1 flex items-center gap-1 ${statusAtual.cor}`}>
        {statusAtual.icone} {statusAtual.texto}
      </p>
    </div>
  )
}
