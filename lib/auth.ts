import { supabase } from './supabase/client'

export interface User {
  id: string
  email: string
  name: string
  loto_gains_10x_access: boolean
  loto_turbo_access: boolean
  created_at: string
}

export interface AuthState {
  user: User | null
  loading: boolean
}

// Sistema de login direto com email (sem senha)
export const signInWithEmail = async (email: string, name?: string) => {
  try {
    // Primeiro, verificar se o usuário já existe na tabela users
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (selectError && selectError.code !== 'PGRST116') {
      return { data: null, error: selectError, user: null }
    }

    let userData: User

    if (existingUser) {
      // Usuário já existe
      userData = existingUser
    } else {
      // Criar novo usuário
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{
          email,
          name: name || email.split('@')[0], // Usar parte do email como nome padrão
          loto_gains_10x_access: false,
          loto_turbo_access: false
        }])
        .select()
        .single()

      if (insertError) {
        return { data: null, error: insertError, user: null }
      }

      userData = newUser
    }

    // Simular login salvando no localStorage (sem autenticação real por enquanto)
    localStorage.setItem('currentUser', JSON.stringify(userData))
    
    return { data: { user: userData }, error: null, user: userData }
  } catch (error: any) {
    return { data: null, error, user: null }
  }
}

export const signOut = async () => {
  try {
    localStorage.removeItem('currentUser')
    return { error: null }
  } catch (error: any) {
    return { error }
  }
}

export const getCurrentUser = (): User | null => {
  try {
    if (typeof window === 'undefined') return null
    const userData = localStorage.getItem('currentUser')
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

export const updateUser = async (userId: string, updates: Partial<User>) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (!error && data) {
      // Atualizar localStorage
      localStorage.setItem('currentUser', JSON.stringify(data))
    }

    return { data, error }
  } catch (error: any) {
    return { data: null, error }
  }
}

// Função para buscar dados atualizados do usuário no banco
export const refreshUserFromDatabase = async (email: string) => {
  try {
    console.log('🔄 Buscando dados atualizados do usuário:', email)
    
    const { data: updatedUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('❌ Erro ao buscar usuário:', error)
      return { data: null, error }
    }

    if (updatedUser) {
      // Atualizar localStorage com dados frescos
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      console.log('✅ Dados do usuário atualizados:', {
        email: updatedUser.email,
        loto_gains_10x_access: updatedUser.loto_gains_10x_access,
        loto_turbo_access: updatedUser.loto_turbo_access
      })
      
      // Disparar evento para notificar componentes
      window.dispatchEvent(new CustomEvent('userUpdated'))
      
      return { data: updatedUser, error: null }
    }

    return { data: null, error: { message: 'Usuário não encontrado' } }
  } catch (error: any) {
    console.error('💥 Erro ao buscar dados do banco:', error)
    return { data: null, error }
  }
}