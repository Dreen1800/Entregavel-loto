"use client"

import React, { useEffect, useState, useMemo } from 'react'

interface Particle {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
  color: string
}

interface ParticlesProps {
  count?: number
  colors?: string[]
}

const DEFAULT_COLORS = ['#84cc16', '#eab308', '#ffffff']

export function Particles({ count = 40, colors }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  
  // Memoizar as cores para evitar recriação
  const particleColors = useMemo(() => colors || DEFAULT_COLORS, [colors])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 5 + 3, // 3px a 8px
      duration: Math.random() * 20 + 10, // 10s a 30s
      delay: Math.random() * 5, // 0s a 5s
      color: particleColors[Math.floor(Math.random() * particleColors.length)]
    }))
    
    setParticles(newParticles)
  }, [count, particleColors])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30 animate-flotar"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}
