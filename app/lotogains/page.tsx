"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { ArrowLeft, Home, TrendingUp, Users, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

// Import sidebar components
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"

// Import components
import { ConfettiAnimation, LuckAnimation } from "@/components/lotogains/animations"
import { TurboMode } from "@/components/lotogains/turbo-mode"
import { ProgressSteps } from "@/components/lotogains/progress-steps"
import { CountrySelection } from "@/components/lotogains/country-selection"
import { CitySelection } from "@/components/lotogains/city-selection"
import { LotterySelection } from "@/components/lotogains/lottery-selection"
import { NumberResults } from "@/components/lotogains/number-results"
import { LotoGainsFooter } from "@/components/lotogains/footer"

// Import data and types
import { countries, locationData, lotteryPrizes } from "@/components/lotogains/data"
import { Lottery, Confetti } from "@/components/lotogains/types"
import { 
  generateRandomNumbers, 
  getNextDrawDate, 
  formatCooldownTime, 
  createConfetti as createConfettiUtil 
} from "@/components/lotogains/utils"

export default function LotoGainsPage() {
  const router = useRouter()
  
  // Main state
  const [step, setStep] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedLottery, setSelectedLottery] = useState<Lottery | null>(null)
  
  // Number generation state
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([])
  const [specialNumbers, setSpecialNumbers] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  
  // Turbo mode state
  const [turboCode, setTurboCode] = useState("")
  const [turboActive, setTurboActive] = useState(false)
  const [turboMessage, setTurboMessage] = useState("")
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  
  // UI state
  const [showAddresses, setShowAddresses] = useState(false)
  const [showLuckAnimation, setShowLuckAnimation] = useState(false)
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Effects
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (cooldownSeconds > 0) {
      interval = setInterval(() => {
        setCooldownSeconds((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [cooldownSeconds])

  // Load saved selections from localStorage
  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry')
    const savedCity = localStorage.getItem('selectedCity')
    const savedLottery = localStorage.getItem('selectedLottery')
    const savedTurboMode = localStorage.getItem('turboMode')
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (savedTheme) {
      setTheme(savedTheme)
    }

    if (savedTurboMode === 'active') {
      setTurboActive(true)
      setTurboMessage('Mode Turbo activé avec succès!')
      setCooldownSeconds(0)
      setTimeout(() => setTurboMessage(''), 3000)
    }

    if (savedCountry && locationData[savedCountry]) {
      setSelectedCountry(savedCountry)
      setStep(2)
      
      if (savedCity && locationData[savedCountry].cities.includes(savedCity)) {
        setSelectedCity(savedCity)
        setStep(3)
        
        if (savedLottery && locationData[savedCountry].lotteries.some(l => l.id === savedLottery)) {
          const lottery = locationData[savedCountry].lotteries.find(l => l.id === savedLottery)
          if (lottery) {
            setSelectedLottery(lottery)
          }
        }
      }
    }
  }, [])



  // Handlers
  const handleGenerateNumbers = async () => {
    if (!selectedLottery) return

    // Start cooldown timer
    if (!turboActive) {
      setCooldownSeconds(300) // 5 minutes
    }

    // Show luck animation
    setShowLuckAnimation(true)
    setIsLoading(true)
    setShowResults(false)

    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Hide luck animation
    setShowLuckAnimation(false)

    const mainNumbers = generateRandomNumbers(selectedLottery.min, selectedLottery.max, selectedLottery.count)

    const specials =
      selectedLottery.specialCount > 0
        ? generateRandomNumbers(selectedLottery.specialMin, selectedLottery.specialMax, selectedLottery.specialCount)
        : []

    setGeneratedNumbers(mainNumbers)
    setSpecialNumbers(specials)
    setIsLoading(false)
    setShowResults(true)

    // Create confetti effect
    const newConfetti = createConfettiUtil()
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 5000)
  }

  const activateTurboMode = () => {
    if (turboCode === "71777") {
      setTurboActive(true)
      setTurboMessage("Mode Turbo activé avec succès!")
      setCooldownSeconds(0)
      localStorage.setItem('turboMode', 'active')
      setTimeout(() => setTurboMessage(""), 3000)
    } else {
      setTurboMessage("Code incorrect. Veuillez réessayer.")
      setTimeout(() => setTurboMessage(""), 3000)
    }
  }

  const selectCountry = (countryCode: string) => {
    setSelectedCountry(countryCode)
    setSelectedCity("")
    setSelectedLottery(null)
    setShowResults(false)
    setStep(2)
    localStorage.setItem('selectedCountry', countryCode)
    localStorage.removeItem('selectedCity')
    localStorage.removeItem('selectedLottery')
  }

  const selectCity = (city: string) => {
    setSelectedCity(city)
    setSelectedLottery(null)
    setShowResults(false)
    setStep(3)
    localStorage.setItem('selectedCity', city)
    localStorage.removeItem('selectedLottery')
  }

  const selectLottery = (lottery: Lottery) => {
    setSelectedLottery(lottery)
    localStorage.setItem('selectedLottery', lottery.id)
  }

  const navigateBack = (targetStep: number) => {
    setStep(targetStep)
    if (targetStep === 1) {
      setSelectedCountry("")
      setSelectedCity("")
      setSelectedLottery(null)
      setShowResults(false)
      localStorage.removeItem('selectedCountry')
      localStorage.removeItem('selectedCity')
      localStorage.removeItem('selectedLottery')
    } else if (targetStep === 2) {
      setSelectedCity("")
      setSelectedLottery(null)
      setShowResults(false)
      localStorage.removeItem('selectedCity')
      localStorage.removeItem('selectedLottery')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Sidebar navigation items
  const sidebarItems = [
    { id: "home", label: "Accueil", icon: Home, href: "/" },
    { id: "trending", label: "Tendances", icon: TrendingUp, href: "#" },
    { id: "community", label: "Communauté", icon: Users, href: "#" },
    { id: "profile", label: "Profil", icon: User, href: "#" },
    { id: "settings", label: "Paramètres", icon: Settings, href: "#" },
  ]

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-background text-foreground flex w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">LG</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">LotoGains</h2>
                <p className="text-xs text-muted-foreground">Votre chance commence ici</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={item.id === "home"}
                          onClick={() => {
                            if (item.href === "/") {
                              router.push("/")
                            }
                          }}
                        >
                          <a href={item.href} className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Background Effects (only confetti and luck animation) */}
          <ConfettiAnimation confetti={confetti} />
          <LuckAnimation show={showLuckAnimation} />

          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-primary">LotoGains</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="text-lg hover:rotate-12 transition-transform"
                >
                  🌓
                </Button>
              </div>
              <div className="w-16" />
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto p-4 max-w-6xl">
            <ProgressSteps step={step} />

            <TurboMode
              turboCode={turboCode}
              setTurboCode={setTurboCode}
              turboActive={turboActive}
              turboMessage={turboMessage}
              onActivate={activateTurboMode}
            />

            {/* Step 1: Country Selection */}
            {step === 1 && (
              <CountrySelection 
                countries={countries} 
                onSelectCountry={selectCountry} 
              />
            )}

            {/* Step 2: City Selection */}
            {step === 2 && selectedCountry && (
              <CitySelection
                cities={locationData[selectedCountry]?.cities || []}
                onSelectCity={selectCity}
                onBack={() => navigateBack(1)}
              />
            )}

            {/* Step 3: Lottery Selection */}
            {step === 3 && selectedCountry && (
              <LotterySelection
                lotteries={locationData[selectedCountry]?.lotteries || []}
                selectedLottery={selectedLottery}
                onSelectLottery={selectLottery}
                onBack={() => navigateBack(2)}
              />
            )}

            {/* Generate Button */}
            {selectedLottery && (
              <div className="mt-6">
                <Button
                  onClick={handleGenerateNumbers}
                  disabled={isLoading || (cooldownSeconds > 0 && !turboActive)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 text-lg"
                >
                  {isLoading
                    ? "Génération de vos numéros de chance..."
                    : cooldownSeconds > 0 && !turboActive
                      ? `Attendez ${formatCooldownTime(cooldownSeconds)}`
                      : "GÉNÉRER MES NUMÉROS"}
                </Button>
              </div>
            )}

            {/* Results */}
            {showResults && selectedLottery && (
              <NumberResults
                lottery={selectedLottery}
                generatedNumbers={generatedNumbers}
                specialNumbers={specialNumbers}
                nextDrawDate={getNextDrawDate(selectedLottery)}
                prizeAmount={lotteryPrizes[selectedLottery.id]}
                isLoading={isLoading}
                cooldownSeconds={cooldownSeconds}
                turboActive={turboActive}
                showAddresses={showAddresses}
                onToggleAddresses={() => setShowAddresses(!showAddresses)}
                onGenerateMore={handleGenerateNumbers}
                formatCooldownTime={formatCooldownTime}
              />
            )}

            <LotoGainsFooter />
          </main>
        </SidebarInset>
        
        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>
    </SidebarProvider>
  )
}
