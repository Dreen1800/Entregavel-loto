import { useEffect, useState } from 'react'
import { getCurrentUser, User } from '@/lib/auth'

export interface PremiumAccess {
  hasLotoGains10x: boolean
  hasLotoTurbo: boolean
  user: User | null
}

export const PURCHASE_LINKS = {
  lotoGains10x: 'https://pay.hotmart.com/Q101524388K',
  lotoTurbo: 'https://pay.hotmart.com/R101540125D?off=lhy6d68y'
}

export const usePremiumAccess = () => {
  const [access, setAccess] = useState<PremiumAccess>({
    hasLotoGains10x: false,
    hasLotoTurbo: false,
    user: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    console.log('👤 Usuário atual:', user)
    
    const hasLotoGains10x = user?.loto_gains_10x_access === true
    const hasLotoTurbo = user?.loto_turbo_access === true
    
    console.log('🔐 Acessos verificados:', {
      hasLotoGains10x,
      hasLotoTurbo,
      loto_gains_10x_access: user?.loto_gains_10x_access,
      loto_turbo_access: user?.loto_turbo_access
    })
    
    setAccess({
      hasLotoGains10x,
      hasLotoTurbo,
      user
    })
    setLoading(false)
  }, [])

  const redirectToPurchase = (product: 'lotoGains10x' | 'lotoTurbo') => {
    const url = PURCHASE_LINKS[product]
    console.log('🔗 Redirecionando para:', url)
    
    try {
      // Tentar window.open primeiro
      const opened = window.open(url, '_blank', 'noopener,noreferrer')
      
      if (!opened || opened.closed || typeof opened.closed == 'undefined') {
        // Se o popup foi bloqueado, usar window.location
        console.log('⚠️ Popup bloqueado, usando location.href')
        window.location.href = url
      }
    } catch (error) {
      console.error('❌ Erro ao redirecionar:', error)
      // Fallback final
      window.location.href = url
    }
  }

  return {
    ...access,
    loading,
    redirectToPurchase
  }
}

export const requireLotoGains10xAccess = () => {
  const { hasLotoGains10x, redirectToPurchase } = usePremiumAccess()
  
  if (!hasLotoGains10x) {
    redirectToPurchase('lotoGains10x')
    return false
  }
  
  return true
}

export const requireLotoTurboAccess = () => {
  const { hasLotoTurbo, redirectToPurchase } = usePremiumAccess()
  
  if (!hasLotoTurbo) {
    redirectToPurchase('lotoTurbo')
    return false
  }
  
  return true
}