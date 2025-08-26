import { Lottery } from './types'

export const generateRandomNumbers = (min: number, max: number, count: number): number[] => {
  const numbers: number[] = []
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  return numbers.sort((a, b) => a - b)
}

export const getNextDrawDate = (lottery: Lottery): string => {
  const now = new Date()
  const today = now.getDay() // 0=Sunday, 1=Monday,...,6=Saturday
  const currentHour = now.getHours()
  
  // Calculate days until next draw
  let daysUntilNextDraw = lottery.drawDay - today
  
  // If draw time has passed today or it's another day
  if (daysUntilNextDraw < 0 || (daysUntilNextDraw === 0 && currentHour >= lottery.drawHour)) {
    daysUntilNextDraw += 7
  }
  
  // Create next draw date
  const nextDraw = new Date(now)
  nextDraw.setDate(now.getDate() + daysUntilNextDraw)
  nextDraw.setHours(lottery.drawHour, 0, 0, 0)
  
  // Format date
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  return `Prochain tirage : ${nextDraw.toLocaleDateString('fr-FR', options)}`
}

export const formatCooldownTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
}

export const createParticles = () => {
  const colors = ['#FFD700', '#00C853', '#FFFFFF', '#FFC400', '#009624']
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 5 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))
}

export const createConfetti = () => {
  const colors = ['#00C853', '#FFD700', '#FFFFFF', '#009624', '#FFC400']
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
  }))
}
