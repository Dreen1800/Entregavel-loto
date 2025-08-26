export interface Country {
  code: string
  name: string
  flag: string
}

export interface Lottery {
  id: string
  name: string
  min: number
  max: number
  count: number
  specialMin: number
  specialMax: number
  specialCount: number
  drawDay: number
  drawHour: number
  logo: string
  addresses: string[]
  links: { name: string; url: string }[]
}

export interface LocationData {
  [key: string]: {
    cities: string[]
    lotteries: Lottery[]
  }
}

export interface Particle {
  id: number
  left: number
  top: number
  size: number
  color: string
  duration: number
  delay: number
}

export interface Confetti {
  id: number
  left: number
  color: string
}
