export function FullPageLoader() {
  return (
    <div className="flex items-center justify-center h-[70vh] text-gray-500 text-sm">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent animate-spin rounded-full" />
        <p>Carregando...</p>
      </div>
    </div>
  )
}