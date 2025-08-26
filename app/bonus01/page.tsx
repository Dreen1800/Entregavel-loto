"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  Coins, 
  Calendar,
  PieChart,
  StickyNote,
  ExternalLink,
  RefreshCw,
  Wand2,
  Quote,
  Globe,
  Flame,
  Euro,
  Flag
} from "lucide-react"

interface JackpotData {
  lottery: string
  jackpot: number
  date: string
  probability: string
  link: string
  notes: string
  category: string[]
  source: string
}

const jackpotData: JackpotData[] = [
  {
    lottery: "EuroMillions",
    jackpot: 250000000,
    date: "2025-08-22",
    probability: "1 sur 139 838 160",
    link: "https://www.euro-millions.com",
    notes: "Jackpot record à gagner - Le plus gros jackpot européen",
    category: ["high", "europe"],
    source: "Loterías y Apuestas del Estado"
  },
  {
    lottery: "Powerball",
    jackpot: 100000000,
    date: "2025-08-24",
    probability: "1 sur 292 201 338",
    link: "https://www.powerball.com",
    notes: "Tirage spécial de fin de semaine - Jackpot en croissance",
    category: ["high", "international"],
    source: "Estimations basées sur les tendances récentes"
  },
  {
    lottery: "La Primitiva",
    jackpot: 55000000,
    date: "2025-08-23",
    probability: "1 sur 139 838 160",
    link: "https://www.loteriasyapuestas.es/en/la-primitiva",
    notes: "Cagnotte garantie - Tirage hebdomadaire",
    category: ["national"],
    source: "Loterías y Apuestas del Estado"
  },
  {
    lottery: "Mega Millions",
    jackpot: 40000000,
    date: "2025-08-21",
    probability: "1 sur 302 575 350",
    link: "https://www.megamillions.com",
    notes: "Double rollover - Opportunité intéressante",
    category: ["international"],
    source: "Estimations basées sur les tendances récentes"
  },
  {
    lottery: "SuperEnalotto",
    jackpot: 35000000,
    date: "2025-08-24",
    probability: "1 sur 622 614 630",
    link: "https://www.superenalotto.it",
    notes: "Jackpot en croissance - Loterie italienne",
    category: ["europe"],
    source: "Site officiel SuperEnalotto"
  },
  {
    lottery: "El Gordo de la Primitiva",
    jackpot: 9800000,
    date: "2025-08-25",
    probability: "1 sur 100 000",
    link: "https://www.loteriasyapuestas.es/en/el-gordo-de-la-primitiva",
    notes: "Tirage hebdomadaire - Gains fréquents",
    category: ["national"],
    source: "Loterías y Apuestas del Estado"
  },
  {
    lottery: "Bonoloto",
    jackpot: 2500000,
    date: "2025-08-21",
    probability: "1 sur 13 983 816",
    link: "https://www.loteriasyapuestas.es/en/bonoloto",
    notes: "Tirage quotidien - Bonnes chances de gain",
    category: ["national"],
    source: "Loterías y Apuestas del Estado"
  },
  {
    lottery: "Lotería Nacional",
    jackpot: 600000,
    date: "2025-08-23",
    probability: "1 sur 100 000",
    link: "https://www.loteriasyapuestas.es/en/loteria-nacional",
    notes: "Tirage traditionnel espagnol - Histoire riche",
    category: ["national"],
    source: "Loterías y Apuestas del Estado"
  },
  {
    lottery: "EuroDreams",
    jackpot: 20000,
    date: "2025-08-22",
    probability: "1 sur 6",
    link: "https://www.euro-millions.com/eurodreams",
    notes: "Nouveau jeu européen - Gains mensuels garantis",
    category: ["europe"],
    source: "Loterías y Apuestas del Estado"
  }
]

const categories = [
  { id: "all", label: "Toutes", icon: Globe },
  { id: "high", label: "Haut potentiel", icon: Flame },
  { id: "europe", label: "Européennes", icon: Euro },
  { id: "national", label: "Nationales", icon: Flag },
  { id: "international", label: "Internationales", icon: Globe }
]

export default function Bonus01Page() {
  const [filteredData, setFilteredData] = useState<JackpotData[]>(jackpotData)
  const [activeCategory, setActiveCategory] = useState("all")
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const sortedData = [...jackpotData].sort((a, b) => b.jackpot - a.jackpot)
    setFilteredData(sortedData)
  }, [])

  const formatJackpot = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} Md€`
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} M€`
    } else {
      return `${amount.toLocaleString()} €`
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const filterByCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    if (categoryId === "all") {
      setFilteredData([...jackpotData].sort((a, b) => b.jackpot - a.jackpot))
    } else {
      const filtered = jackpotData.filter(item => 
        item.category.includes(categoryId)
      ).sort((a, b) => b.jackpot - a.jackpot)
      setFilteredData(filtered)
    }
  }

  const updateData = () => {
    setLastUpdate(new Date())
    // Simulate data update with small random variations
    const updatedData = jackpotData.map(lottery => ({
      ...lottery,
      jackpot: Math.random() > 0.7 ? 
        Math.round(lottery.jackpot * (1 + (Math.random() * 0.1 - 0.02))) : 
        lottery.jackpot
    }))
    
    const sortedData = updatedData.sort((a, b) => b.jackpot - a.jackpot)
    setFilteredData(sortedData)
  }

  const topOpportunities = filteredData.slice(0, 4)
  const featuredJackpots = filteredData.slice(4, 8)

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title="LotoGains — Jackpots Instantanés"
        subtitle="En un seul clic, vous aurez accès aux loteries les plus convoitées du pays"
      />

      <div className="container mx-auto p-4 space-y-6">
        {/* Highlight Box */}
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg text-center">
          <p className="flex items-center justify-center gap-2">
            <Quote className="h-4 w-4" />
            Sua chance de transformar um simples clique em uma vitória incrível começa aqui.
            <Quote className="h-4 w-4" />
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Jackpots Ativos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">250M€</div>
              <div className="text-sm text-muted-foreground">Maior Jackpot</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Dias de Atualização</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            )
          })}
        </div>

        {/* Last Update */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              <RefreshCw className="h-4 w-4 inline mr-2" />
              Última atualização: {lastUpdate.toLocaleDateString('pt-BR')} às {lastUpdate.toLocaleTimeString('pt-BR')}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4 inline mr-2" />
              Próxima atualização automática: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={updateData} size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <Wand2 className="h-4 w-4 mr-2" />
                Mode Démo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Opportunities */}
        <div>
          <h2 className="text-2xl font-bold text-center text-primary mb-6 relative">
            Melhores Oportunidades do Momento
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto mt-2 rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topOpportunities.map((jackpot, index) => (
              <Card key={index} className="relative hover-elevate">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 rounded-t-lg"></div>
                {jackpot.jackpot >= 20000000 && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                    <Flame className="h-3 w-3 mr-1" />
                    Potencial Alto
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-primary">{jackpot.lottery}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-2xl font-bold text-primary">
                    <Coins className="h-6 w-6 mr-2" />
                    {formatJackpot(jackpot.jackpot)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <strong>Data do sorteio:</strong> {formatDate(jackpot.date)}
                    </p>
                    <p className="flex items-center">
                      <PieChart className="h-4 w-4 mr-2" />
                      <strong>Probabilidade:</strong> {jackpot.probability}
                    </p>
                    <p className="flex items-start">
                      <StickyNote className="h-4 w-4 mr-2 mt-0.5" />
                      <strong>Notas:</strong> {jackpot.notes}
                    </p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => window.open(jackpot.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visitar Site Oficial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Jackpots */}
        {featuredJackpots.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center text-primary mb-6 relative">
              Jackpots Que Não Pode Perder
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/50 mx-auto mt-2 rounded-full"></div>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredJackpots.map((jackpot, index) => (
                <Card key={index} className="relative hover-elevate">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50 rounded-t-lg"></div>
                  {jackpot.jackpot >= 20000000 && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      <Flame className="h-3 w-3 mr-1" />
                      Potencial Alto
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-primary">{jackpot.lottery}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-2xl font-bold text-primary">
                      <Coins className="h-6 w-6 mr-2" />
                      {formatJackpot(jackpot.jackpot)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <strong>Data do sorteio:</strong> {formatDate(jackpot.date)}
                      </p>
                      <p className="flex items-center">
                        <PieChart className="h-4 w-4 mr-2" />
                        <strong>Probabilidade:</strong> {jackpot.probability}
                      </p>
                      <p className="flex items-start">
                        <StickyNote className="h-4 w-4 mr-2 mt-0.5" />
                        <strong>Notas:</strong> {jackpot.notes}
                      </p>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => window.open(jackpot.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visitar Site Oficial
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <Card>
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong className="text-destructive">Aviso importante:</strong> Estas informações são fornecidas apenas para fins informativos. 
              Os valores dos jackpots e as datas dos sorteios podem mudar. Recomendamos sempre verificar as informações diretamente nos sites oficiais das loterias.
            </p>
            <p>Fonte dos dados: Sites oficiais das loterias (Loterías y Apuestas del Estado, EuroMillions, etc.)</p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
