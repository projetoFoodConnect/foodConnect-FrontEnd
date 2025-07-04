interface Props {
  termo: string
  onChange: (valor: string) => void
}

export function ProdutoSearch({ termo, onChange }: Props) {
  return (
    <input
      type="text"
      value={termo}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar produto..."
      className="rounded p-2 border w-full"
    />
  )
}