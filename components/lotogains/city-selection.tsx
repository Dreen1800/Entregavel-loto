"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, ChevronRight } from "lucide-react"

interface CitySelectionProps {
  cities: string[]
  onSelectCity: (city: string) => void
  onBack: () => void
}

export function CitySelection({ cities, onSelectCity, onBack }: CitySelectionProps) {
  return (
    <Card className="border-lime-200">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1 hover:bg-lime-100">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
        <CardTitle className="text-lime-600 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          2. Choisissez votre ville
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {cities.map((city) => (
          <div
            key={city}
            onClick={() => onSelectCity(city)}
            className="group flex items-center justify-between p-3 rounded-lg border hover:bg-lime-50 hover:border-lime-300 cursor-pointer transition-all duration-200 hover:shadow-md hover:translate-x-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-600 rounded-lg flex items-center justify-center text-white text-lg shadow-sm group-hover:shadow-md transition-shadow">
                🏙️
              </div>
              <span className="font-semibold text-foreground group-hover:text-lime-700">{city}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-lime-600 transition-colors" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
