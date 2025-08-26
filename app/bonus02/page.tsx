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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  TrendingUp,
  Trophy,
  Search,
  RefreshCw,
  Wand2,
  Plus,
  Upload,
  Download,
  Trash2,
  Save,
  RotateCcw,
  Ticket,
  List,
  Settings,
  Info,
  VolumeX,
  Volume2,
  Shield
} from "lucide-react"

interface LotteryResult {
  lottery: string
  date: string
  numbers: string
  jackpot: number
  link: string
  status: string
}

interface UserTicket {
  lottery: string
  numbers: string
  note?: string
  matchLevel: 'none' | 'medium' | 'high'
  matchText: string
}

const demoResults: LotteryResult[] = [
  {
    lottery: "Loto",
    date: new Date().toISOString(),
    numbers: "12 24 36 42 48 + 07",
    jackpot: 4500000,
    link: "https://www.fdj.fr/jeux/resultats/loto",
    status: "Resultados oficiais"
  },
  {
    lottery: "EuroMillions",
    date: new Date(Date.now() - 86400000).toISOString(),
    numbers: "05 13 22 34 47 + 03 08",
    jackpot: 72000000,
    link: "https://www.fdj.fr/jeux/resultats/euromillions",
    status: "Resultados oficiais"
  },
  {
    lottery: "Keno",
    date: new Date(Date.now() - 172800000).toISOString(),
    numbers: "03 11 19 27 35 + 02",
    jackpot: 1200000,
    link: "https://www.fdj.fr/jeux/resultats/keno",
    status: "Resultados oficiais"
  }
]

export default function Bonus02Page() {
  const [results, setResults] = useState<LotteryResult[]>(demoResults)
  const [tickets, setTickets] = useState<UserTicket[]>([])
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertTitle, setAlertTitle] = useState("")

  // Form states
  const [newTicket, setNewTicket] = useState({
    lottery: "",
    numbers: "",
    note: ""
  })

  // Settings
  const [settings, setSettings] = useState({
    dataUrl: "",
    updateInterval: 5,
    alertThreshold: 4,
    soundEnabled: true
  })

  const showAlert = (title: string, message: string, duration = 3000) => {
    setAlertTitle(title)
    setAlertMessage(message)
    setAlertVisible(true)
    setTimeout(() => setAlertVisible(false), duration)
  }

  const formatJackpot = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours()}h${date.getMinutes().toString().padStart(2, '0')}`
  }

  const refreshData = () => {
    setLastUpdate(new Date())
    showAlert("Dados atualizados!", "Os resultados foram atualizados com sucesso")
  }

  const activateDemoMode = () => {
    setResults([...demoResults])
    setLastUpdate(new Date())
    showAlert("Modo demo ativado", "Você está usando dados de demonstração")
  }

  const addTicket = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTicket.lottery || !newTicket.numbers) {
      showAlert("Erro", "Por favor, preencha todos os campos obrigatórios")
      return
    }

    // Basic validation for number format
    const numberRegex = /^(\d{2}\s){4}\d{2}\s\+\s\d{2}$/
    if (!numberRegex.test(newTicket.numbers)) {
      showAlert("Formato inválido", 'Use o formato: "01 12 23 34 45 + 07"')
      return
    }

    const ticket: UserTicket = {
      ...newTicket,
      matchLevel: 'none',
      matchText: 'Não verificado'
    }

    setTickets([...tickets, ticket])
    setNewTicket({ lottery: "", numbers: "", note: "" })
    showAlert("Bilhete adicionado!", "Seu bilhete foi registrado com sucesso")
    checkTicketsForWins([...tickets, ticket])
  }

  const checkTicketsForWins = (ticketsToCheck = tickets) => {
    const updatedTickets = ticketsToCheck.map(ticket => {
      // Simulate win checking - 20% chance of having a match
      if (Math.random() < 0.2) {
        const matchLevels = ['2 números', '3 números', '4 números', '5 números']
        const randomMatch = matchLevels[Math.floor(Math.random() * matchLevels.length)]
        
        const matchLevel = randomMatch.includes('4') || randomMatch.includes('5') ? 'high' as const : 'medium' as const
        
        if (matchLevel === 'high') {
          showAlert("Parabéns!", `Você tem ${randomMatch} no ${ticket.lottery}`)
          if (soundEnabled) {
            // Simple notification sound simulation
            const context = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = context.createOscillator()
            const gainNode = context.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(context.destination)
            
            oscillator.type = 'sine'
            oscillator.frequency.value = 880
            gainNode.gain.value = 0.1
            
            oscillator.start()
            setTimeout(() => oscillator.stop(), 300)
          }
        }
        
        return {
          ...ticket,
          matchLevel,
          matchText: randomMatch
        }
      } else {
        return {
          ...ticket,
          matchLevel: 'none' as const,
          matchText: 'Nenhum ganho'
        }
      }
    })
    
    setTickets(updatedTickets)
  }

  const deleteSelectedTickets = () => {
    const checkboxes = document.querySelectorAll('.ticket-checkbox:checked') as NodeListOf<HTMLInputElement>
    const selectedIndexes = Array.from(checkboxes).map(cb => parseInt(cb.getAttribute('data-index') || '0'))
    
    if (selectedIndexes.length === 0) {
      showAlert("Erro", "Selecione pelo menos um bilhete para excluir")
      return
    }

    if (confirm(`Tem certeza de que deseja excluir ${selectedIndexes.length} bilhete(s)?`)) {
      const newTickets = tickets.filter((_, index) => !selectedIndexes.includes(index))
      setTickets(newTickets)
      showAlert("Sucesso", `${selectedIndexes.length} bilhete(s) excluído(s) com sucesso`)
    }
  }

  const saveSettings = () => {
    localStorage.setItem('lotoGainsSettings', JSON.stringify(settings))
    showAlert("Configurações salvas!", "Suas preferências foram salvas com sucesso")
  }

  const resetSettings = () => {
    if (confirm("Tem certeza de que deseja redefinir todas as configurações?")) {
      const defaultSettings = {
        dataUrl: "",
        updateInterval: 5,
        alertThreshold: 4,
        soundEnabled: true
      }
      setSettings(defaultSettings)
      localStorage.removeItem('lotoGainsSettings')
      showAlert("Configurações redefinidas", "Todas as configurações foram redefinidas")
    }
  }

  const filteredResults = results.filter(result =>
    result.lottery.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.numbers.includes(searchTerm)
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title="LotoGains - Alerta Ganhante"
        subtitle="Resultados em tempo real"
      />

      <div className="container mx-auto p-4 space-y-6">
        {/* Alert Banner */}
        {alertVisible && (
          <Alert className="border-primary bg-primary/10">
            <Trophy className="h-4 w-4" />
            <AlertDescription>
              <strong>{alertTitle}</strong> {alertMessage}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Como usar o LotoGains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                <div>Adicione seus bilhetes em "Meus bilhetes"</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                <div>Os resultados se atualizam automaticamente</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
                <div>Receba um alerta instantâneo quando ganhar!</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="results" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="results">Resultados</TabsTrigger>
            <TabsTrigger value="tickets">Meus bilhetes</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Results Tab */}
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Últimos resultados
                </CardTitle>
                <div className="bg-accent/20 p-3 rounded-lg">
                  <p className="text-sm flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Modo demo ativado - Dados de exemplo
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Pesquisar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Loteria</th>
                        <th className="text-left p-3 font-semibold">Data do sorteio</th>
                        <th className="text-left p-3 font-semibold">Números</th>
                        <th className="text-left p-3 font-semibold">Prêmio</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((result, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3">{result.lottery}</td>
                          <td className="p-3">{formatDate(result.date)}</td>
                          <td className="p-3 font-mono">{result.numbers}</td>
                          <td className="p-3 font-bold text-primary">{formatJackpot(result.jackpot)}</td>
                          <td className="p-3">
                            <Badge variant="outline">{result.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Última atualização: {formatDate(lastUpdate.toISOString())}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={refreshData}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Actualiser
                    </Button>
                    <Button variant="outline" onClick={activateDemoMode}>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Mode Démo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Meus bilhetes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={addTicket} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lottery">Loteria</Label>
                      <Select value={newTicket.lottery} onValueChange={(value) => setNewTicket({...newTicket, lottery: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha uma loteria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Loto">Loto</SelectItem>
                          <SelectItem value="EuroMillions">EuroMillions</SelectItem>
                          <SelectItem value="Keno">Keno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numbers">Números jogados</Label>
                      <Input
                        placeholder="Ex: 01 12 23 34 45 + 07"
                        value={newTicket.numbers}
                        onChange={(e) => setNewTicket({...newTicket, numbers: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note">Nota (opcional)</Label>
                    <Input
                      placeholder="Nota para este bilhete"
                      value={newTicket.note}
                      onChange={(e) => setNewTicket({...newTicket, note: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar este bilhete
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Meus bilhetes registrados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button variant="outline" size="sm" onClick={deleteSelectedTickets}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">
                          <Checkbox />
                        </th>
                        <th className="text-left p-3 font-semibold">Loteria</th>
                        <th className="text-left p-3 font-semibold">Números</th>
                        <th className="text-left p-3 font-semibold">Resultado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center p-8 text-muted-foreground">
                            Nenhum bilhete registrado
                          </td>
                        </tr>
                      ) : (
                        tickets.map((ticket, index) => (
                          <tr 
                            key={index} 
                            className={`border-b hover:bg-muted/50 ${ticket.matchLevel === 'high' ? 'bg-primary/10' : ''}`}
                          >
                            <td className="p-3">
                              <Checkbox className="ticket-checkbox" data-index={index} />
                            </td>
                            <td className="p-3">{ticket.lottery}</td>
                            <td className="p-3 font-mono">{ticket.numbers}</td>
                            <td className="p-3">
                              <Badge 
                                variant={ticket.matchLevel === 'high' ? 'default' : ticket.matchLevel === 'medium' ? 'secondary' : 'outline'}
                              >
                                {ticket.matchText}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dataUrl">URL dos resultados (opcional)</Label>
                  <Input
                    type="url"
                    placeholder="https://exemplo.com/resultados.json"
                    value={settings.dataUrl}
                    onChange={(e) => setSettings({...settings, dataUrl: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground">Deixe vazio para usar o modo demo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="updateInterval">Verificar a cada (minutos)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={settings.updateInterval}
                      onChange={(e) => setSettings({...settings, updateInterval: parseInt(e.target.value) || 5})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alertThreshold">Alertar a partir de</Label>
                    <Select 
                      value={settings.alertThreshold.toString()} 
                      onValueChange={(value) => setSettings({...settings, alertThreshold: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 números</SelectItem>
                        <SelectItem value="3">3 números</SelectItem>
                        <SelectItem value="4">4 números</SelectItem>
                        <SelectItem value="5">5 números</SelectItem>
                        <SelectItem value="6">5+1 números</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="soundEnabled"
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => setSettings({...settings, soundEnabled: !!checked})}
                  />
                  <Label htmlFor="soundEnabled">Ativar sons</Label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={resetSettings}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Redefinir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Informações importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Os resultados exibidos são fornecidos apenas para fins informativos. 
                  Sempre verifique os resultados oficiais nos sites das loterias antes de fazer qualquer reclamação.
                </p>
                <p>
                  O LotoGains não garante a precisão dos resultados exibidos e declina qualquer responsabilidade em caso de erro.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  )
}
