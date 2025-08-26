"use client"

import { Particle, Confetti } from './types'

interface ParticlesBackgroundProps {
  particles: Particle[]
}

export function ParticlesBackground({ particles }: ParticlesBackgroundProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30 animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

interface ConfettiAnimationProps {
  confetti: Confetti[]
}

export function ConfettiAnimation({ confetti }: ConfettiAnimationProps) {
  if (confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="absolute w-2.5 h-2.5 rounded-full opacity-80 animate-confetti"
          style={{
            left: `${conf.left}vw`,
            backgroundColor: conf.color,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  )
}

interface LuckAnimationProps {
  show: boolean
}

export function LuckAnimation({ show }: LuckAnimationProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 opacity-100 transition-opacity duration-500">
      <div className="text-6xl mb-5 animate-bounce">🍀</div>
      <div className="text-white text-2xl font-bold text-center mb-8">
        Chargement de votre chance...
      </div>
    </div>
  )
}
