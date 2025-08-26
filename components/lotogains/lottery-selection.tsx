"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, ChevronRight } from "lucide-react"
import { Lottery } from './types'

interface LotterySelectionProps {
  lotteries: Lottery[]
  selectedLottery: Lottery | null
  onSelectLottery: (lottery: Lottery) => void
  onBack: () => void
}

export function LotterySelection({ 
  lotteries, 
  selectedLottery, 
  onSelectLottery, 
  onBack 
}: LotterySelectionProps) {
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
          <Sparkles className="h-5 w-5" />
          3. Choisissez votre loterie
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {lotteries.map((lottery) => (
          <div
            key={lottery.id}
            onClick={() => onSelectLottery(lottery)}
            className={`group flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md hover:translate-x-1 ${
              selectedLottery?.id === lottery.id
                ? "border-lime-500 bg-lime-50 dark:bg-lime-950 shadow-md"
                : "hover:bg-lime-50 hover:border-lime-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={lottery.logo || "/lottery-balls-lime-green.png"}
                  alt={lottery.name}
                  className="w-10 h-10 object-cover rounded shadow-sm group-hover:shadow-md transition-all group-hover:rotate-12 group-hover:scale-110"
                />
              </div>
              <span className="font-semibold text-foreground group-hover:text-lime-700">{lottery.name}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-lime-600 transition-colors" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
