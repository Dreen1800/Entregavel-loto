"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ChevronRight } from "lucide-react"
import { Country } from './types'

interface CountrySelectionProps {
  countries: Country[]
  onSelectCountry: (countryCode: string) => void
}

export function CountrySelection({ countries, onSelectCountry }: CountrySelectionProps) {
  return (
    <Card className="border-lime-200 bg-gradient-to-br from-lime-50/50 to-green-50/50 dark:from-lime-950/20 dark:to-green-950/20">
      <CardHeader>
        <CardTitle className="text-lime-600 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          1. Choisissez votre pays
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Les pays sont filtrés pour ceux où vous pouvez jouer en présentiel, mais vous pouvez jouer en ligne
          indépendamment de votre pays de résidence.
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {countries.map((country) => (
          <div
            key={country.code}
            onClick={() => onSelectCountry(country.code)}
            className="group flex items-center justify-between p-3 rounded-lg border hover:bg-lime-50 hover:border-lime-300 cursor-pointer transition-all duration-200 hover:shadow-md hover:translate-x-1"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={country.flag || "/placeholder.svg"}
                  alt={country.name}
                  className="w-10 h-7 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
                />
              </div>
              <span className="font-semibold text-foreground group-hover:text-lime-700">{country.name}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-lime-600 transition-colors" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
