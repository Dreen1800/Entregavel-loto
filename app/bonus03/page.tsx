"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/ui/header"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar,
  Trophy,
  Coins,
  Filter,
  Clock,
  Zap,
  Flame,
  Star,
  Newspaper,
  Info,
  RefreshCw
} from "lucide-react"

interface LotteryInfo {
  name: string
  date: string
  time: string
  jackpot: string
  country: string
  countdown: string
}

interface NewsItem {
  title: string
  source: string
  time: string
  tags: string[]
}

const upcomingDraws: LotteryInfo[] = [
  {
    name: "EuroMillions",
    date: "15/12/2023",
    time: "20:30",
    jackpot: "85M€",
    country: "Europa",
    countdown: "Em 2 dias"
  },
  {
    name: "Powerball",
    date: "14/12/2023",
    time: "04:00",
    jackpot: "130M€",
    country: "Estados Unidos",
    countdown: "Amanhã"
  },
  {
    name: "Loto Francês",
    date: "13/12/2023",
    time: "20:30",
    jackpot: "5M€",
    country: "França",
    countdown: "Hoje"
  }
]

const jackpotRankings = [
  { lottery: "Powerball", jackpot: "130 000 000 €", status: "🔥 Elevado", statusType: "danger" },
  { lottery: "EuroMillions", jackpot: "85 000 000 €", status: "🔥 Elevado", statusType: "danger" },
  { lottery: "Mega Millions", jackpot: "65 000 000 €", status: "Médio", statusType: "warning" },
  { lottery: "SuperEnalotto", jackpot: "45 000 000 €", status: "Médio", statusType: "warning" },
  { lottery: "Loto Francês", jackpot: "5 000 000 €", status: "Baixo", statusType: "success" }
]

const hotNews: NewsItem[] = [
  {
    title: "Recorde histórico para o jackpot Powerball!",
    source: "LotoAtualidades",
    time: "Há 2 horas",
    tags: ["Powerball", "Recorde", "Jackpot"]
  },
  {
    title: "Um ganhador sortudo leva 50 milhões no Loto Francês",
    source: "France Loto Info",
    time: "Ontem",
    tags: ["Loto", "França", "Ganhador"]
  },
  {
    title: "Estratégias vencedoras para o EuroMillions",
    source: "Jeux de Hasard Magazine",
    time: "Há 3 dias",
    tags: ["EuroMillions", "Estratégia", "Conselhos"]
  }
]

export default function Bonus03Page() {
  const [filters, setFilters] = useState({
    country: "",
    lottery: "",
    minJackpot: ""
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      alert("Os dados foram atualizados com sucesso!")
    }, 1500)
  }

  const applyFilters = () => {
    let message = "Filtros aplicados: "
    if (filters.country && filters.country !== "all") message += `País: ${filters.country}, `
    if (filters.lottery && filters.lottery !== "all") message += `Loteria: ${filters.lottery}, `
    if (filters.minJackpot) message += `Jackpot mín: ${filters.minJackpot}€`
    
    if ((!filters.country || filters.country === "all") && 
        (!filters.lottery || filters.lottery === "all") && 
        !filters.minJackpot) {
      message = "Todos os filtros foram redefinidos"
    }
    
    alert(message)
  }

  const getStatusBadgeVariant = (statusType: string) => {
    switch (statusType) {
      case "danger": return "destructive"
      case "warning": return "secondary"
      case "success": return "default"
      default: return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title="LotoGains — Atualizações Diárias"
        subtitle="Todas as informações que você precisa para seus jogos de loteria favoritos, atualizadas diariamente"
      />

      <div className="container mx-auto p-4 space-y-6">
        {/* Highlight Box */}
        <div className="bg-accent/20 border-l-4 border-accent p-4 rounded-lg text-center">
          <p className="flex items-center justify-center gap-2">
            <Star className="h-4 w-4" />
            Sua chance de ficar atualizado e encontrar as melhores oportunidades começa aqui.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                <Calendar className="h-4 w-4" />
                Próximo sorteio
              </div>
              <div className="text-xl font-bold">EuroMillions</div>
              <div className="text-sm text-muted-foreground">
                Sexta-feira 20:30 • <Badge variant="secondary">Em 2 dias</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                <Trophy className="h-4 w-4" />
                Maior jackpot
              </div>
              <div className="text-xl font-bold">130 000 000 €</div>
              <div className="text-sm text-muted-foreground">
                Powerball • <Badge variant="destructive">🔥 Recorde</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                <Coins className="h-4 w-4" />
                Melhor oportunidade
              </div>
              <div className="text-xl font-bold">Loto Francês</div>
              <div className="text-sm text-muted-foreground">
                Relação de chances favorável • <Badge variant="default">Recomendado</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros simples
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="countryFilter">País</Label>
                <Select value={filters.country} onValueChange={(value) => setFilters({...filters, country: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os países" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os países</SelectItem>
                    <SelectItem value="França">França</SelectItem>
                    <SelectItem value="Europa">Europa</SelectItem>
                    <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                    <SelectItem value="Espanha">Espanha</SelectItem>
                    <SelectItem value="Itália">Itália</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lotteryFilter">Loteria</Label>
                <Select value={filters.lottery} onValueChange={(value) => setFilters({...filters, lottery: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as loterias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as loterias</SelectItem>
                    <SelectItem value="EuroMillions">EuroMillions</SelectItem>
                    <SelectItem value="Powerball">Powerball</SelectItem>
                    <SelectItem value="Loto">Loto Francês</SelectItem>
                    <SelectItem value="Mega Millions">Mega Millions</SelectItem>
                    <SelectItem value="SuperEnalotto">SuperEnalotto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jackpotFilter">Jackpot mín (€)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 10000000"
                  value={filters.minJackpot}
                  onChange={(e) => setFilters({...filters, minJackpot: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={applyFilters} className="w-full md:w-auto">
              Aplicar filtros
            </Button>
          </CardContent>
        </Card>

        {/* Refresh Button */}
        <div className="text-center">
          <Button onClick={handleRefresh} disabled={isRefreshing} size="lg">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? "Actualisation..." : "Actualiser maintenant"}
          </Button>
        </div>

        {/* Upcoming Draws */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Próximos sorteios importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingDraws.map((draw, index) => (
                <Card key={index} className="hover-elevate transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="font-bold text-primary mb-2">{draw.name}</div>
                    <div className="flex items-center gap-1 text-primary font-semibold mb-3">
                      <Zap className="h-4 w-4" />
                      {draw.countdown}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="font-semibold">Data:</span> {draw.date}</div>
                      <div><span className="font-semibold">Hora:</span> {draw.time}</div>
                      <div><span className="font-semibold">Jackpot:</span> {draw.jackpot}</div>
                      <div><span className="font-semibold">País:</span> {draw.country}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Jackpot Rankings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              Jackpots mais importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold bg-primary text-primary-foreground">Loteria</th>
                    <th className="text-left p-3 font-semibold bg-primary text-primary-foreground">Jackpot</th>
                    <th className="text-left p-3 font-semibold bg-primary text-primary-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jackpotRankings.map((item, index) => (
                    <tr key={index} className="border-b even:bg-muted/20">
                      <td className="p-3">{item.lottery}</td>
                      <td className="p-3 font-bold text-primary">{item.jackpot}</td>
                      <td className="p-3">
                        <Badge variant={getStatusBadgeVariant(item.statusType)}>
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Hot News */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Notícias quentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotNews.map((news, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="font-bold mb-2">{news.title}</div>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Newspaper className="h-3 w-3" />
                      {news.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {news.time}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {news.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Como usar este painel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 list-decimal list-inside">
              <li><strong>Verifique os próximos sorteios</strong> - Consulte a seção "Próximos sorteios" para não perder nenhuma data importante.</li>
              <li><strong>Monitore os jackpots</strong> - A seção "Jackpots" mostra os maiores prêmios do momento.</li>
              <li><strong>Leia as notícias</strong> - Mantenha-se informado com as últimas novidades em "Notícias quentes".</li>
              <li><strong>Use os filtros</strong> - Refine os resultados por país ou tipo de loteria, se necessário.</li>
              <li><strong>Actualisez régulièrement</strong> - Cliquez sur "Actualiser maintenant" pour avoir les informations les plus récentes.</li>
            </ol>
            <p className="mt-4 font-semibold text-primary">
              É simples assim! Nenhum conhecimento técnico é necessário.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card>
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2 mb-2">
              <Info className="h-4 w-4" />
              Os dados apresentados aqui são apenas para fins informativos. Não garantimos 100% de precisão.
            </p>
            <p>
              Por favor, sempre verifique as informações nas fontes oficiais antes de participar de qualquer jogo de loteria.
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
