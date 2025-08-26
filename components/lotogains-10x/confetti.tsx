"use client"

import React, { useEffect, useState, useCallback } from 'react'

interface ConfettiPiece {
  id: number
  left: number
  color: string
  duration: number
  delay: number
  size: number
}

interface ConfettiProps {
  active: boolean
  onComplete?: () => void
}

export function Confetti({ active, onComplete }: ConfettiProps) {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])

  // Memoizar a função onComplete para evitar recriações
  const handleComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    if (!active) {
      setConfettiPieces([])
      return
    }

    const colors = ['#84cc16', '#eab308', '#ffffff', '#22c55e', '#f59e0b']
    const pieces: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 3 + 2, // 2s a 5s
      delay: Math.random() * 0.5, // 0s a 0.5s
      size: Math.random() * 8 + 4 // 4px a 12px
    }))

    setConfettiPieces(pieces)

    // Limpar após 5 segundos
    const timeout = setTimeout(() => {
      setConfettiPieces([])
      handleComplete()
    }, 5000)

    return () => clearTimeout(timeout)
  }, [active, handleComplete])

  if (!active || confettiPieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute rounded-full opacity-80 animate-confeti"
          style={{
            left: `${piece.left}vw`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`
          }}
        />
      ))}
    </div>
  )
}
