import { useEffect, useState } from 'react'
import { getProfile, updateProfile, deleteAccount } from '../../../auth/services/userService'

import { toast } from 'react-toastify'
import type { User } from '../../../auth/types/auth.types'
import { Layout } from '../../../../shared/components/layout/Layout'
import { FullPageLoader } from '../../../../shared/components/ui/FullPageLoader'

export default function PerfilPage() {
    const [form, setForm] = useState<User | null>(null)
    const [original, setOriginal] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getProfile()
                setForm(user)
                setOriginal(user)
            } catch (err) {
                toast.error('Erro ao carregar perfil')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!form) return
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            if (!form) return
            await updateProfile(form)
            toast.success('Perfil atualizado com sucesso!')
            setOriginal(form)
        } catch (err) {
            toast.error('Erro ao atualizar perfil')
        }
    }

    const handleCancel = () => {
        setForm(original)
    }

    const handleDelete = async () => {
        if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
            try {
                await deleteAccount()
                toast.success('Conta excluída com sucesso.')
                window.location.href = '/' // ou logout()
            } catch (err) {
                toast.error('Erro ao excluir conta')
            }
        }
    }

    if (loading) return <FullPageLoader/>
    if (!form) return

    return (
        <Layout>

            <div className="max-w-2xl mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold mb-1">Perfil</h1>
                <p className="text-gray-500 mb-6">Gerencie as informações da sua conta</p>

                <div className="bg-white  rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-2">Informações Pessoais</h2>
                    <p className='text-gray-500 mb-4'>Altere as informações abaixo para atualizar seu perfil.</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Nome</label>
                            <input
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                disabled
                                className="w-full border px-3 py-2 rounded bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Telefone</label>
                            <input
                                name="telefone"
                                value={form.telefone || ''}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Organização</label>
                            <input
                                name="nomeOrganizacao"
                                value={form.nomeOrganizacao || ''}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                            Salvar
                        </button>
                    </div>
                </div>

                <div className="mt-6 border border-red-200 bg-red-50 p-6 rounded">
                    <h3 className="text-red-700 font-semibold mb-1">Excluir Conta</h3>
                    <p className="text-sm text-red-600 mb-4">
                        Ao excluir sua conta, não será possível reverter essa ação.
                    </p>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Excluir Conta
                    </button>
                </div>
            </div>
        </Layout>
    )
}
