import React, { createContext, useContext, useState } from 'react'
import { login as apiLogin, signup as apiSignup } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  const login = async creds => {
    const { token, user } = await apiLogin(creds)
    localStorage.setItem('token', token)
    setToken(token)
    setUser(user)
  }

  const signup = async creds => {
    const { token, user } = await apiSignup(creds)
    localStorage.setItem('token', token)
    setToken(token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
