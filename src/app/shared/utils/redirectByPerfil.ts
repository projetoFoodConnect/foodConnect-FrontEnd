export function getHomePathByPerfil(perfil: string): string {
  switch (perfil) {
    case 'DOADOR':
      return '/home/doador'
    case 'RECEPTOR':
      return '/home/beneficiario'
    case 'ADMINISTRADOR':
      return '/home/admin'
    default:
      return '/'
  }
}

export function getProdutosPathByPerfil(perfil: string): string {
  switch (perfil) {
    case 'DOADOR':
      return '/produtos/doador'
    case 'RECEPTOR':
      return '/produtos/beneficiario'
    case 'ADMINISTRADOR':
      return '/produtos/admin'
    default:
      return '/'
  }
}

export function getDoacoesPathByPerfil(perfil: string): string {
  switch (perfil) {
    case 'DOADOR':
      return '/doacoes/doador'
    case 'RECEPTOR':
      return '/doacoes/beneficiario'
    case 'ADMINISTRADOR':
      return '/doacoes/admin'
    default:
      return '/'
  }
}