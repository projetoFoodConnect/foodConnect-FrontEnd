export function Footer() {
  return (
    <footer className="bg-white mt-8">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p className="mb-2 md:mb-0">© {new Date().getFullYear()} FoodConnect. Todos os direitos reservados.</p>
        <div className="flex space-x-4">
          <a href="/termos" className="hover:underline">Termos de uso</a>
          <a href="/privacidade" className="hover:underline">Política de privacidade</a>
        </div>
      </div>
    </footer>
  )
}