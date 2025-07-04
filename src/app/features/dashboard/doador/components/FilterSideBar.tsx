type FilterSidebarProps = {
  categorias: string[]
  status?: string[]
  onCategoriaChange: (categoria: string) => void
  selectedCategorias: string[]
}

export function FilterSidebar({ categorias, selectedCategorias, onCategoriaChange }: FilterSidebarProps) {
  return (
    <aside className="w-full sm:w-64 p-4 border rounded-xl bg-white h-fit">
      <h4 className="font-bold text-gray-800 mb-2">Filtros</h4>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Categorias</p>
        {categorias.map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 mb-1">
            <input
              type="checkbox"
              checked={selectedCategorias.includes(cat)}
              onChange={() => onCategoriaChange(cat)}
              className="form-checkbox text-green-600"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Pode adicionar filtro de status se quiser depois */}
    </aside>
  )
}
