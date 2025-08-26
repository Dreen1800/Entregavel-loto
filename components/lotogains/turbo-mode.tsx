"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bolt } from "lucide-react"

interface TurboModeProps {
  turboCode: string
  setTurboCode: (code: string) => void
  turboActive: boolean
  turboMessage: string
  onActivate: () => void
}

export function TurboMode({ 
  turboCode, 
  setTurboCode, 
  turboActive, 
  turboMessage, 
  onActivate 
}: TurboModeProps) {
  return (
    <Card className="mb-6 border-lime-200 bg-gradient-to-r from-lime-50 to-green-50 dark:from-lime-950 dark:to-green-950">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lime-600">
          <Bolt className="h-5 w-5" />
          Mode Turbo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Le Mode Turbo offre une précision 10X supérieure, 78% de chances en plus de gagner le jackpot et génère de
          nouveaux numéros sans temps d'attente.
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="Entrez le code d'activation"
            value={turboCode}
            onChange={(e) => setTurboCode(e.target.value)}
            maxLength={5}
            disabled={turboActive}
            className="flex-1"
          />
          <Button 
            onClick={onActivate} 
            disabled={turboActive} 
            className="bg-lime-500 hover:bg-lime-600"
          >
            Activer
          </Button>
        </div>
        {turboMessage && (
          <p className={`text-sm ${turboMessage.includes("succès") ? "text-green-600" : "text-red-600"}`}>
            {turboMessage}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
