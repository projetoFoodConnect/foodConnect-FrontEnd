import { createContext, useContext, useState, type ReactNode } from 'react'
import type { LoginPayload } from '../services/authService'
import { type UserProfile, getUserProfile } from '../services/userService'
import { loginRequest } from '../services/authService'


interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)

  const login = async (payload: LoginPayload) => {
  await loginRequest(payload)
  const perfil = await getUserProfile()
  setUser(perfil)
}

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}

