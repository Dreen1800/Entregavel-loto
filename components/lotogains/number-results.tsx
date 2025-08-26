"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ChevronDown, Sparkles } from "lucide-react"
import { Lottery } from './types'

interface NumberResultsProps {
  lottery: Lottery
  generatedNumbers: number[]
  specialNumbers: number[]
  nextDrawDate: string
  prizeAmount: string
  isLoading: boolean
  cooldownSeconds: number
  turboActive: boolean
  showAddresses: boolean
  onToggleAddresses: () => void
  onGenerateMore: () => void
  formatCooldownTime: (seconds: number) => string
}

export function NumberResults({
  lottery,
  generatedNumbers,
  specialNumbers,
  nextDrawDate,
  prizeAmount,
  isLoading,
  cooldownSeconds,
  turboActive,
  showAddresses,
  onToggleAddresses,
  onGenerateMore,
  formatCooldownTime
}: NumberResultsProps) {
  return (
    <Card className="mt-6 border-lime-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 via-yellow-400 to-lime-400"></div>
      <CardHeader className="text-center relative">
        <CardTitle className="text-lime-500 text-2xl mb-4 relative">
          🎉 Vos Numéros Porte-Bonheur !
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-lime-400 to-yellow-400 rounded-full"></div>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-2">
          {nextDrawDate}
        </p>
        <p className="text-sm text-muted-foreground">
          Jackpot actuel : <span className="font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-lg">{prizeAmount}</span>
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute -top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-300 to-transparent"></div>
          <div className="flex flex-wrap justify-center gap-3 mb-6 py-4">
            {generatedNumbers.map((num, index) => (
              <div
                key={index}
                className="relative w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-in zoom-in duration-300 border-2 border-lime-500 hover:scale-110 hover:-translate-y-2 hover:rotate-12 transition-transform cursor-pointer"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  boxShadow: '0 5px 15px rgba(255, 215, 0, 0.3), 0 0 0 3px rgba(34, 197, 94, 0.1)'
                }}
              >
                {num}
                <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full -z-10 blur-sm opacity-50"></div>
              </div>
            ))}
            {specialNumbers.map((num, index) => (
              <div
                key={`special-${index}`}
                className="relative w-14 h-14 bg-gradient-to-br from-lime-400 to-lime-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-in zoom-in duration-300 border-2 border-yellow-400 hover:scale-110 hover:-translate-y-2 hover:rotate-12 transition-transform cursor-pointer"
                style={{ 
                  animationDelay: `${(generatedNumbers.length + index) * 100}ms`,
                  boxShadow: '0 5px 15px rgba(34, 197, 94, 0.3), 0 0 0 3px rgba(255, 215, 0, 0.1)'
                }}
              >
                {num}
                <div className="absolute -inset-1 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full -z-10 blur-sm opacity-50"></div>
              </div>
            ))}
          </div>
        </div>

        {lottery.links.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Faites vos jeux en ligne :
            </h3>
            <div className="flex flex-wrap gap-2">
              {lottery.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={onGenerateMore}
          disabled={isLoading || (cooldownSeconds > 0 && !turboActive)}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 text-base mb-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Génération...
            </div>
          ) : cooldownSeconds > 0 && !turboActive ? (
            `Attendez ${formatCooldownTime(cooldownSeconds)}`
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              GÉNÉRER PLUS DE NUMÉROS
            </div>
          )}
        </Button>

        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={onToggleAddresses}
            className="w-full flex items-center justify-between hover:bg-lime-50 hover:border-lime-300"
          >
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adresses de points de vente
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${showAddresses ? "rotate-180" : ""}`} />
          </Button>

          {showAddresses && (
            <div className="space-y-2 p-4 bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-950/20 dark:to-green-950/20 rounded-lg border border-lime-200">
              {lottery.addresses.map((address, index) => (
                <div key={index} className="flex items-start gap-3 text-sm p-2 rounded bg-white/50 dark:bg-black/10 border-l-2 border-lime-400">
                  <MapPin className="h-4 w-4 text-lime-500 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{address}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative mt-6 pt-6">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-lime-400 via-yellow-400 to-lime-400"></div>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Ces numéros sont générés à partir d'algorithmes probabilistes.
            <br />
            Jouer doit rester un plaisir - jouez de manière responsable !<br />
            Les chances de gain sont minimes - misez avec modération.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
