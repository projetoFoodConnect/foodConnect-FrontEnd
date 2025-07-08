import { useState, type ChangeEvent } from 'react'
import { validarProdutoForm } from '../utils/validators'
import { type ProdutoForm } from '../../../../shared/types/produto.types'
import { LoadingButton } from '../../../../shared/components/ui/LoadingButton'

interface Props {
  initialData?: ProdutoForm
  onSubmit: (form: ProdutoForm) => void
  onCancel: () => void
  onExcluir: (idProduto: string) => Promise<void>
}

export function ProdutoForme({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<ProdutoForm>(
    initialData ?? {
      descricao: '',
      quantidade: 1,
      unidade: 'KG',
      tipo: 'FRUTA',
      imagem: null,
    }
  )

  const [erros, setErros] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantidade' ? Number(value) : value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((prev) => ({
        ...prev,
        imagem: e.target.files![0],
      }))
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    const errosValidacao = validarProdutoForm(form)
    if (errosValidacao.length > 0) {
      setErros(errosValidacao)
      setLoading(false)
      return
    }
    setErros([])
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-0">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md w-full max-w-md sm:max-w-xl">
        <h2 className="text-lg sm:text-xl font-bold mb-4">
          {initialData ? 'Editar Produto' : 'Cadastrar Produto'}
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Descrição*</label>
            <input
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Ex: Banana Prata"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Quantidade*</label>
              <input
                type="number"
                name="quantidade"
                value={form.quantidade}
                onChange={handleChange}
                className="w-full border rounded p-2"
                min={1}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Unidade*</label>
              <select
                name="unidade"
                value={form.unidade}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="KG">Kg</option>
                <option value="L">Litros</option>
                <option value="UNIDADE">Unidade</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Tipo de Produto*</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="FRUTA">Fruta</option>
              <option value="VERDURA">Verdura</option>
              <option value="LEGUME">Legume</option>
              <option value="NAO_PERECIVEL">Não Perecível</option>
            </select>
          </div>

          <div>
            <label className="block w-full">
              <span className="text-sm font-medium block mb-1">Imagem (opcional)</span>
              <div className="border border-dashed rounded-md p-2 hover:bg-gray-100 cursor-pointer text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label className="cursor-pointer text-sm text-green-700 hover:underline">
                  Clique para selecionar uma imagem
                </label>
                {form.imagem && (
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    Arquivo selecionado: {form.imagem.name}
                  </p>
                )}
              </div>
            </label>
          </div>

          {erros.length > 0 && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              <ul className="list-disc pl-5 text-sm">
                {erros.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>

            <LoadingButton
              loading={loading}
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {initialData ? 'Salvar Alterações' : 'Cadastrar'}
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  )
}
