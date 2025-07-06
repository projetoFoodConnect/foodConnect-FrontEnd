interface Props {
    tipoSelecionado: string
    onTipoChange: (tipo: string) => void
}

const opcoes = ['TODOS', 'FRUTA', 'VERDURA', 'LEGUME', 'NÃO-PERECÍVEL']

export function ProdutoFiltro({ tipoSelecionado, onTipoChange }: Props) {
    return (
        <div className="mb-4">
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por categoria:
            </label>
            <select
                value={tipoSelecionado}
                onChange={(e) => onTipoChange(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded"
            >
                {opcoes.map((tipo) => (
                    <option key={tipo} value={tipo}>
                        {tipo === 'TODOS' ? 'Todos os tipos' : tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>

        </div>
    )
}
