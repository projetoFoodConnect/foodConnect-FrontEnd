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

export function getPathByPerfil(perfil: string, base: 'home' | 'produtos' | 'doacoes') {
  const mapa: Record<string, Record<string, string>> = {
    DOADOR: {
      home: '/home/doador',
      produtos: '/produtos/doador',
      doacoes: '/doacoes/doador',
    },
    RECEPTOR: {
      home: '/home/beneficiario',
      produtos: '/produtos/beneficiario',
      doacoes: '/doacoes/beneficiario',
    },
    ADMINISTRADOR: {
      home: '/home/admin',
      produtos: '/produtos/admin',
      doacoes: '/doacoes/admin',
    },
  }

  return mapa[perfil]?.[base] || '/'
}