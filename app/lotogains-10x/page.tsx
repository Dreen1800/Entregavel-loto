"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/ui/header'
import { BottomNavigation } from '@/components/ui/bottom-navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bolt, Globe, MapPin, Ticket, Sparkles, Zap, ExternalLink, MapPinIcon } from 'lucide-react'
import { Particles } from '@/components/lotogains-10x/particles'
import { Confetti } from '@/components/lotogains-10x/confetti'

// Dados das loteries e países (adaptado do HTML original)
const locationData = {
  uk: {
    name: 'Royaume-Uni',
    flag: 'https://flagcdn.com/w80/gb.png',
    cities: ['Londres', 'Manchester', 'Birmingham', 'Liverpool', 'Édimbourg', 'Leeds', 'Glasgow', 'Bristol'],
    lotteries: [
      { 
        id: 'uk-national', 
        name: 'UK National Lottery', 
        min: 1, max: 59, count: 6, 
        specialMin: 1, specialMax: 59, specialCount: 1,
        logo: 'https://i.ibb.co/4WQ7bY7/uk-lottery.png',
        prize: '£18,700,000',
        links: [
          {name: "National Lottery", url: "https://www.national-lottery.co.uk"},
          {name: "Lotto UK", url: "https://www.lotto.uk.com"}
        ],
        addresses: [
          "Bureau de tabac 'Golden Chance', 123 Oxford Street, Londres",
          "Supérette 'Lucky Star', 45 Market Street, Manchester",
          "Magasin 'Fortune', 78 High Street, Birmingham"
        ]
      },
      { 
        id: 'euromillions', 
        name: 'EuroMillions', 
        min: 1, max: 50, count: 5, 
        specialMin: 1, specialMax: 12, specialCount: 2,
        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
        prize: '€187,000,000',
        links: [
          {name: "EuroMillions UK", url: "https://www.national-lottery.co.uk/games/euromillions"},
          {name: "LottoGo EuroMillions", url: "https://www.lottogo.com/euromillions"}
        ],
        addresses: [
          "Bureau de tabac 'Euro Dreams', 56 Victoria Road, Londres",
          "Supérette 'Millionaire', 22 King Street, Edimburgo",
          "Centro comercial 'Chance Tower', Liverpool One, Liverpool"
        ]
      }
    ]
  },
  fr: {
    name: 'France',
    flag: 'https://flagcdn.com/w80/fr.png',
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux'],
    lotteries: [
      { 
        id: 'loto', 
        name: 'Loto', 
        min: 1, max: 49, count: 5, 
        specialMin: 1, specialMax: 10, specialCount: 1,
        logo: 'https://i.ibb.co/BmVpNdq/dm.png',
        prize: '€7,500,000',
        links: [
          {name: "FDJ Loto", url: "https://www.fdj.fr/jeux/jeux-de-tirage/loto"},
          {name: "Loto Français", url: "https://www.loto.fr"}
        ],
        addresses: [
          "Tabac 'La Chance', 15 Rue de Rivoli, Paris",
          "Bureau de tabac 'Le Jackpot', 32 La Canebière, Marseille",
          "Magasin 'Fortune', 5 Place Bellecour, Lyon"
        ]
      },
      { 
        id: 'euromillions', 
        name: 'EuroMillions', 
        min: 1, max: 50, count: 5, 
        specialMin: 1, specialMax: 12, specialCount: 2,
        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
        prize: '€187,000,000',
        links: [
          {name: "FDJ EuroMillions", url: "https://www.fdj.fr/jeux/jeux-de-tirage/euromillions-my-million"},
          {name: "EuroMillions France", url: "https://www.euro-millions.fr"}
        ],
        addresses: [
          "Tabac 'Euro Dreams', 78 Avenue des Champs-Élysées, Paris",
          "Bureau de tabac 'Millionaire', 45 Rue Saint-Ferréol, Marseille",
          "Centro comercial 'Partouche', 112 Rue du Faubourg Saint-Antoine, Lyon"
        ]
      }
    ]
  },
  es: {
    name: 'Espagne',
    flag: 'https://flagcdn.com/w80/es.png',
    cities: ['Madrid', 'Barcelone', 'Valence', 'Séville', 'Bilbao', 'Malaga', 'Saragosse', 'Palma'],
    lotteries: [
      { 
        id: 'euromillions', 
        name: 'EuroMillions', 
        min: 1, max: 50, count: 5, 
        specialMin: 1, specialMax: 12, specialCount: 2,
        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
        prize: '€187,000,000',
        links: [
          {name: "EuroMillions España", url: "https://www.loteriasyapuestas.es/es/euromillones"},
          {name: "Jugar EuroMillions", url: "https://www.euromillones.com"}
        ],
        addresses: [
          "Estanco 'Suerte', 45 Gran Vía, Madrid",
          "Quiosco 'Millonario', 22 Rambla, Barcelona",
          "Centro comercial 'Fortuna', Avenida del Puerto, Valência"
        ]
      }
    ]
  }
}

interface LotteryBall {
  number: number
  isSpecial?: boolean
  delay?: number
}

export default function LotoGains10XPage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedLottery, setSelectedLottery] = useState<any>(null)
  const [turboCode, setTurboCode] = useState('')
  const [turboActive, setTurboActive] = useState(false)
  const [turboStatus, setTurboStatus] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedNumbers, setGeneratedNumbers] = useState<LotteryBall[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Memoizar a função de callback do confetti
  const handleConfettiComplete = useCallback(() => {
    setShowConfetti(false)
  }, [])

  const activateTurboMode = () => {
    if (turboCode === '71777') {
      setTurboActive(true)
      setTurboStatus('Mode Turbo activé avec succès!')
      setTimeout(() => setTurboStatus(''), 3000)
    } else {
      setTurboStatus('Code incorrect. Veuillez réessayer.')
      setTimeout(() => setTurboStatus(''), 3000)
    }
  }

  const generateRandomNumbers = (min: number, max: number, count: number): number[] => {
    const numbers: number[] = []
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min
      if (!numbers.includes(num)) {
        numbers.push(num)
      }
    }
    return numbers.sort((a, b) => a - b)
  }

  const generateNumbers = async () => {
    if (!selectedLottery) return

    setIsGenerating(true)
    setShowResults(false)

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2500))

    const mainNumbers = generateRandomNumbers(
      selectedLottery.min,
      selectedLottery.max,
      selectedLottery.count
    )

    const specialNumbers = selectedLottery.specialCount > 0 
      ? generateRandomNumbers(
          selectedLottery.specialMin,
          selectedLottery.specialMax,
          selectedLottery.specialCount
        )
      : []

    const allNumbers: LotteryBall[] = [
      ...mainNumbers.map((num, index) => ({ number: num, delay: index * 200 })),
      ...specialNumbers.map((num, index) => ({ 
        number: num, 
        isSpecial: true, 
        delay: (mainNumbers.length * 200) + (index * 200) 
      }))
    ]

    setGeneratedNumbers(allNumbers)
    setIsGenerating(false)
    setShowResults(true)
    setShowConfetti(true)
  }

  const canGenerate = selectedCountry && selectedCity && selectedLottery

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Partículas de fundo */}
      <Particles />
      
      {/* Efeito confete */}
      <Confetti 
        active={showConfetti} 
        onComplete={handleConfettiComplete} 
      />

      <Header 
        title="LotoGains 10X" 
        subtitle="Générateur de Numéros Gagnants Potentialisé" 
      />

      <main className="container mx-auto px-4 py-6 pb-20 relative z-10">
        {/* Banner IA Poderosa */}
        <Card className="mb-8 bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 animate-pulsar hover-elevate">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-accent mr-2 animate-pulse" />
              <h2 className="text-2xl font-bold text-glow">🚀 NOUVELLE IA ULTRA-PUISSANTE</h2>
            </div>
            <p className="text-lg mb-2">Algorithmes optimisés pour maximiser vos chances de gagner</p>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-accent text-accent-foreground animate-brilho">
              Résultats 10X PLUS EFFICACES
            </Badge>
          </CardContent>
        </Card>

        {/* Modo Turbo */}
        <Card className={`mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover-elevate ${turboActive ? 'turbo-active' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Bolt className={`w-6 h-6 mr-2 ${turboActive ? 'animate-pulse text-accent' : ''}`} />
              Modo Turbo
              {turboActive && <Badge className="ml-2 bg-primary text-primary-foreground animate-pulse">ATIVO</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Le Mode Turbo offre une précision 10X supérieure, 78% de chances en plus de gagner le jackpot et génère de nouveaux numéros sans temps d'attente.
            </p>
            <div className="flex gap-3">
              <Input
                placeholder="Digite o código de ativação"
                value={turboCode}
                onChange={(e) => setTurboCode(e.target.value)}
                maxLength={5}
                disabled={turboActive}
                className="flex-1"
              />
              <Button 
                onClick={activateTurboMode}
                disabled={turboActive}
                className="bg-accent text-accent-foreground hover:bg-accent/90 hover-elevate"
              >
                <Zap className="w-4 h-4 mr-2" />
                {turboActive ? 'Ativado' : 'Ativar'}
              </Button>
            </div>
            {turboStatus && (
              <div className={`mt-3 p-3 rounded-lg text-center font-semibold animate-aparecer ${
                turboActive 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'bg-destructive/20 text-destructive border border-destructive/30'
              }`}>
                {turboStatus}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Etapas de Seleção */}
        <div className="grid gap-6 mb-8">
          {/* Etapa 1: País */}
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center mr-3 font-bold animate-brilho">
                  1
                </div>
                <Globe className="w-5 h-5 mr-2" />
                Escolha seu país
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Object.entries(locationData).map(([code, country]) => (
                  <Button
                    key={code}
                    variant={selectedCountry === code ? "default" : "outline"}
                    className={`flex flex-col items-center p-4 h-auto hover-elevate transition-all duration-300 ${
                      selectedCountry === code ? 'animate-brilho' : ''
                    }`}
                    onClick={() => {
                      setSelectedCountry(code)
                      setSelectedCity('')
                      setSelectedLottery(null)
                    }}
                  >
                    <img 
                      src={country.flag} 
                      alt={country.name}
                      className="w-8 h-8 rounded mb-2 transition-transform duration-300 hover:scale-110"
                    />
                    <span className="text-xs">{country.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Etapa 2: Cidade */}
          {selectedCountry && (
            <Card className="hover-elevate animate-aparecer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center mr-3 font-bold animate-brilho">
                    2
                  </div>
                  <MapPin className="w-5 h-5 mr-2" />
                  Escolha sua cidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {locationData[selectedCountry as keyof typeof locationData].cities.map((city) => (
                    <Button
                      key={city}
                      variant={selectedCity === city ? "default" : "outline"}
                      className={`flex flex-col items-center p-4 h-auto hover-elevate transition-all duration-300 ${
                        selectedCity === city ? 'animate-brilho' : ''
                      }`}
                      onClick={() => {
                        setSelectedCity(city)
                        setSelectedLottery(null)
                      }}
                    >
                      <MapPinIcon className="w-6 h-6 mb-2 transition-transform duration-300 hover:scale-110" />
                      <span className="text-xs">{city}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 3: Loteria */}
          {selectedCity && (
            <Card className="hover-elevate animate-aparecer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center mr-3 font-bold animate-brilho">
                    3
                  </div>
                  <Ticket className="w-5 h-5 mr-2" />
                  Choisissez votre loterie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {locationData[selectedCountry as keyof typeof locationData].lotteries.map((lottery) => (
                    <Button
                      key={lottery.id}
                      variant={selectedLottery?.id === lottery.id ? "default" : "outline"}
                      className={`flex items-center justify-between p-4 h-auto hover-elevate transition-all duration-300 ${
                        selectedLottery?.id === lottery.id ? 'animate-brilho' : ''
                      }`}
                      onClick={() => setSelectedLottery(lottery)}
                    >
                      <div className="flex items-center">
                        <img 
                          src={lottery.logo} 
                          alt={lottery.name}
                          className="w-12 h-12 rounded mr-3 transition-transform duration-300 hover:scale-110"
                        />
                        <div className="text-left">
                          <div className="font-semibold">{lottery.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Jackpot atual: <span className="text-accent font-bold">{lottery.prize}</span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bouton Générer */}
        <div className="text-center mb-8">
          <Button
            onClick={generateNumbers}
            disabled={!canGenerate || isGenerating}
            className={`bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-bold rounded-xl shadow-lg transform transition-all hover:scale-105 hover-elevate ${
              canGenerate && !isGenerating ? 'animate-pulsar hover-glow' : ''
            } ${turboActive ? 'gradient-animate' : ''}`}
          >
            {isGenerating ? (
              <>
                <div className="animate-girar rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                GERANDO SEUS NÚMEROS...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                GERAR MEUS NÚMEROS
                {turboActive && <Bolt className="w-5 h-5 ml-2 animate-pulse" />}
              </>
            )}
          </Button>
        </div>

        {/* Animação de Carregamento */}
        {isGenerating && (
          <Card className="mb-8 animate-aparecer">
            <CardContent className="p-8 text-center">
              <div className="animate-girar rounded-full h-16 w-16 border-4 border-accent border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg text-accent font-semibold animate-pulse">
                Génération de vos numéros de chance...
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                {turboActive ? (
                  <span className="text-primary font-semibold">⚡ Modo Turbo Ativo - Processamento Acelerado</span>
                ) : (
                  <span>Analisando padrões probabilísticos...</span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resultados */}
        {showResults && generatedNumbers.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary animate-aparecer hover-elevate">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-primary mb-4 text-glow">
                🎉 Seus Números da Sorte!
              </CardTitle>
              <p className="text-muted-foreground">
                Prochain tirage : <span className="font-semibold">Dimanche à 20h00</span>
              </p>
              <p className="text-xl">
                Jackpot atual: <span className="text-accent font-bold animate-pulse">{selectedLottery?.prize}</span>
              </p>
              {turboActive && (
                <Badge className="mt-2 bg-primary text-primary-foreground animate-pulse">
                  ⚡ Gerado com Modo Turbo - Precisão Máxima
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {generatedNumbers.map((ball, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform transition-all animate-bola hover-elevate cursor-pointer gpu-accelerated ${
                      ball.isSpecial 
                        ? 'bg-gradient-to-r from-primary to-primary/80 hover-glow' 
                        : 'bg-gradient-to-r from-accent to-accent/80 hover-glow'
                    }`}
                    style={{
                      animationDelay: `${ball.delay}ms`,
                      animationDuration: '0.6s',
                      animationFillMode: 'both'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                    }}
                  >
                    {ball.number}
                  </div>
                ))}
              </div>

              {/* Links de Apostas */}
              <div className="bg-accent/10 rounded-lg p-4 mb-4 hover-elevate">
                <h3 className="text-lg font-semibold text-center mb-4 text-accent animate-pulse">
                  🎯 Faça suas apostas online:
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {selectedLottery?.links.map((link: any, index: number) => (
                    <Button
                      key={index}
                      asChild
                      className="bg-accent text-accent-foreground hover:bg-accent/90 hover-elevate transition-all duration-300"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Locais Físicos */}
              <div className="bg-primary/10 rounded-lg p-4 hover-elevate">
                <h3 className="text-lg font-semibold text-center mb-4 text-primary animate-pulse">
                  🏪 Pontos de venda perto de você:
                </h3>
                <ul className="space-y-2">
                  {selectedLottery?.addresses.map((address: string, index: number) => (
                    <li key={index} className="flex items-start p-2 rounded hover:bg-primary/5 transition-all duration-300">
                      <MapPinIcon className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{address}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center text-sm text-muted-foreground mt-6 space-y-1">
                <p>Estes números são gerados a partir de algoritmos probabilísticos.</p>
                <p>Jouer doit être un plaisir - jouez de manière responsable !</p>
                <p>Les chances de gagner sont minimes - pariez avec modération.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}
