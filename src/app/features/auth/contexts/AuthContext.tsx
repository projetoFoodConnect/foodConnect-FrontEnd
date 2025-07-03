import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { loginRequest } from '../services/authService'
import { getProfile } from '../services/userService'
import type { User, LoginPayload } from '../types/auth.types'


interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (payload: LoginPayload) => {
    await loginRequest(payload)
    const userData = await getProfile()
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    // Tenta buscar o perfil do usuário ao carregar o app (mantém login se o cookie ainda for válido)
    const fetchUser = async () => {
      try {
        const userData = await getProfile()
        setUser(userData)
      } catch (err) {
        setUser(null) // token inválido ou não logado
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook de acesso
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return context
}
