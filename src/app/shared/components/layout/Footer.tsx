export function Footer() {
  return (
    <footer className="bg-white mt-8">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center text-sm text-gray-500">
        <p className="mb-2 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} FoodConnect. Todos os direitos reservados.
        </p>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <a href="/termos" className="hover:underline">Termos de uso</a>
          <a href="/privacidade" className="hover:underline">Política de privacidade</a>
        </div>
      </div>
    </footer>
  );
}