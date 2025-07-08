interface Props {
    tipoSelecionado: string
    onTipoChange: (tipo: string) => void
}

const opcoes = ['TODOS', 'FRUTA', 'VERDURA', 'LEGUME', 'NÃO-PERECÍVEL']

export function ProdutoFiltro({ tipoSelecionado, onTipoChange }: Props) {
    return (
        <div className="mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Filtrar por categoria:
            </label>
            <select
                id="tipo"
                value={tipoSelecionado}
                onChange={(e) => onTipoChange(e.target.value)}
                className="border border-gray-300 px-2 py-2 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {opcoes.map((tipo) => (
                    <option key={tipo} value={tipo}>
                        {tipo === 'TODOS'
                            ? 'Todos os tipos'
                            : tipo.charAt(0) + tipo.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>
        </div>
    )
}
