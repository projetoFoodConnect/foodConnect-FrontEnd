import { createContext, useContext, useState } from 'react'
import { login as loginRequest, type LoginPayload, type LoginResponse } from '../services/authService'

interface AuthContextType {
  user: LoginResponse['user'] | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)

  const login = async (payload: LoginPayload) => {
    const response = await loginRequest(payload)
    setUser(response.user)
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
