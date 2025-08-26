'use client'

import { useState, useEffect } from 'react'
import { User, getCurrentUser, refreshUserFromDatabase } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    // Listener para mudanças no localStorage (para sincronizar entre abas)
    const handleStorageChange = () => {
      const updatedUser = getCurrentUser()
      setUser(updatedUser)
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Evento customizado para atualização local
    window.addEventListener('userUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userUpdated', handleStorageChange)
    }
  }, [])

  const refreshUser = () => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    // Disparar evento para sincronizar outras partes da aplicação
    window.dispatchEvent(new CustomEvent('userUpdated'))
  }

  const refreshUserFromDB = async () => {
    const currentUser = getCurrentUser()
    if (currentUser?.email) {
      console.log('🔄 Atualizando dados do usuário do banco...')
      const result = await refreshUserFromDatabase(currentUser.email)
      if (result.data) {
        setUser(result.data)
      }
      return result
    }
    return { data: null, error: { message: 'Usuário não logado' } }
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    refreshUser,
    refreshUserFromDB
  }
}