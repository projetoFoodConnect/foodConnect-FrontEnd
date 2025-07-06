import { Layout } from "../layout/Layout";

export function FullPageLoader() {
    return (
        <Layout>

            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100/70 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3 animate-pulse">
                    <div className="w-10 h-10 border-4 border-green-900 border-t-transparent rounded-full animate-spin shadow-lg" />
                    <span className="text-green-900 text-lg font-medium">Carregando...</span>
                </div>
            </div>
        </Layout>
    )
}