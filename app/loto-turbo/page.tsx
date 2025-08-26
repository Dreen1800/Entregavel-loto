"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/ui/header"
import { PageLayout } from "@/components/layout/page-layout"
import { Bolt, ChartLine, Rocket, Key, Cog, RotateCcw, Star, Copy, Check, Lock, ShoppingCart, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePremiumAccess } from '@/hooks/use-premium-access'

// Componente de partículas douradas usando classes do globals.css
function GoldenParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 3,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particula gpu-accelerated"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Componente de animação de carregamento usando classes do globals.css
function LoadingAnimation({ active }: { active: boolean }) {
  const [stars, setStars] = useState<Array<{
    id: number;
    tx: number;
    ty: number;
    size: number;
    delay: number;
  }>>([])

  useEffect(() => {
    if (active) {
      const newStars = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        tx: Math.random() * 300 - 150,
        ty: Math.random() * 300 - 150,
        size: Math.random() * 1.5 + 0.5,
        delay: i * 100
      }))
      setStars(newStars)
    }
  }, [active])

  if (!active) return null

  return (
    <div className="h-56 flex items-center justify-center relative">
      <div className="w-20 h-20 border-4 border-accent/20 border-t-accent rounded-full animate-girar shadow-lg shadow-accent/20 gpu-accelerated" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-accent opacity-0 animate-pulse gpu-accelerated"
          style={{
            fontSize: `${star.size * 2}rem`,
            animationDelay: `${star.delay}ms`,
            animationDuration: '1s',
            transform: `translate(${star.tx}px, ${star.ty}px) scale(1.5)`,
          }}
        >
          <Star className="w-6 h-6 fill-current" />
        </div>
      ))}
    </div>
  )
}

// Componente de código de ativação usando classes do globals.css
function ActivationCode({ visible, code }: { visible: boolean; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Échec de la copie du code:', err)
      // Solution de repli pour les navigateurs plus anciens
      const textArea = document.createElement('textarea')
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!visible) return null

  return (
    <div className="animate-aparecer bg-gradient-to-br from-accent/10 to-accent/5 p-10 rounded-2xl border border-accent/20 shadow-lg gpu-accelerated">
      <h2 className="text-2xl font-bold text-white mb-6 text-center text-glow">
        Votre code d'activation premium
      </h2>
      <div className="text-center">
        <div className="text-6xl font-black p-6 border-2 border-accent rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground inline-block relative overflow-hidden shadow-lg animate-brilho turbo-active">
          {code}
        </div>
        
        {/* Botão de copiar */}
        <div className="mt-6">
          <Button
            onClick={handleCopyCode}
            className={cn(
              "px-6 py-3 rounded-full font-semibold transition-all duration-300",
              copied 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105"
            )}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Code Copié !
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                Copier le Code
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="mt-6 bg-card p-5 rounded-xl border-l-4 border-accent shadow-inner">
        <strong className="block text-white mb-3 text-lg text-glow">
          Instructions d'utilisation :
        </strong>
        <p className="text-muted-foreground leading-relaxed">
          Copiez ce code exclusif et accédez à l'application Loto Gains. Dans la section "Mode Turbo", 
          collez ce code pour activer instantanément toutes les fonctionnalités premium. 
          Ce code est valide pour une seule activation.
        </p>
      </div>
    </div>
  )
}

export default function LotoTurboPage() {
  const { hasLotoTurbo, user, loading, redirectToPurchase } = usePremiumAccess()
  const [isLoading, setIsLoading] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [activationCode, setActivationCode] = useState("71777")
  const [buttonText, setButtonText] = useState("Générer mon code exclusif")

  const benefits = [
    {
      icon: Bolt,
      title: "Précision 10X",
      description: "Notre algorithme exclusif augmente la précision de génération de numéros gagnants de 10 fois."
    },
    {
      icon: ChartLine,
      title: "+78% de chances",
      description: "Augmentation vérifiée de 78% de chances de gagner le jackpot avec la technologie Turbo."
    },
    {
      icon: Rocket,
      title: "Génération instantanée",
      description: "N'attendez plus entre les générations. Obtenez vos numéros en temps réel."
    }
  ]

  const handleGenerateCode = () => {
    setIsLoading(true)
    setShowCode(false)
    setButtonText("Génération en cours...")

    setTimeout(() => {
      setIsLoading(false)
      setShowCode(true)
      setButtonText("Générer un nouveau code")
      
      // Scroll suave até o código
      setTimeout(() => {
        const codeElement = document.getElementById('activation-code')
        if (codeElement) {
          codeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }, 3000)
  }

  // Componente de bloqueio para usuários sem acesso
  const PremiumBlockedContent = () => (
    <PageLayout>
      <GoldenParticles />
      
      <div className="relative z-10">
        <Header 
          title="LotoTurbo"
          subtitle="Activez le mode turbo pour multiplier vos chances de gain"
        />

        <div className="max-w-2xl mx-auto p-6 relative z-20">
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/30">
            <CardContent className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Lock className="w-12 h-12 text-accent" />
              </div>
              
              <h2 className="text-3xl font-bold text-accent mb-4">Acesso Premium Necessário</h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                O LotoTurbo é uma ferramenta premium que potencializa suas chances com códigos 
                de ativação exclusivos. Adquira o acesso para desbloquear o modo turbo.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center text-accent">
                  <Bolt className="w-5 h-5 mr-2" />
                  <span>Precisão 10X superior</span>
                </div>
                <div className="flex items-center justify-center text-accent">
                  <ChartLine className="w-5 h-5 mr-2" />
                  <span>+78% de chances de ganhar</span>
                </div>
                <div className="flex items-center justify-center text-accent">
                  <Rocket className="w-5 h-5 mr-2" />
                  <span>Geração instantânea</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('🛒 Botão clicado - LotoTurbo')
                  console.log('🔗 Redirecionando para: https://pay.hotmart.com/R101540125D?off=lhy6d68y')
                  
                  // Tentar múltiplas formas de redirecionamento
                  try {
                    const url = 'https://pay.hotmart.com/R101540125D?off=lhy6d68y'
                    console.log('Tentando window.open...')
                    const newWindow = window.open(url, '_blank')
                    
                    if (!newWindow) {
                      console.log('window.open falhou, tentando location.href...')
                      window.location.href = url
                    } else {
                      console.log('window.open funcionou!')
                    }
                  } catch (error) {
                    console.error('Erro:', error)
                    window.location.href = 'https://pay.hotmart.com/R101540125D?off=lhy6d68y'
                  }
                }}
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 rounded-xl font-bold transform transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
                style={{ border: 'none', outline: 'none' }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adquirir LotoTurbo
              </button>

              <p className="text-sm text-muted-foreground mt-4">
                {user ? `Logado como: ${user.email}` : 'Faça login para verificar seu acesso'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )

  // Mostrar loading
  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Verificando acesso...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  // Mostrar bloqueio se não tem acesso
  if (!hasLotoTurbo) {
    return <PremiumBlockedContent />
  }

  return (
    <PageLayout>
      <GoldenParticles />
      
      <div className="relative z-10">
        <Header 
          title="LotoTurbo"
          subtitle="Activez le mode turbo pour multiplier vos chances de gain"
        />

        <div className="max-w-4xl mx-auto p-6 relative z-20">
          <Card className="overflow-hidden shadow-2xl border-0 bg-card/95 backdrop-blur-sm gpu-accelerated">
            {/* Header da página */}
            <div className="text-center p-10 border-b border-border/50">
              <div className="mb-6">
                <img
                  src="/placeholder-logo.png"
                  alt="LotoTurbo"
                  className="w-full h-full max-w-72 h-auto mx-auto transition-transform duration-500 hover:scale-105 hover:drop-shadow-lg"
                />
              </div>
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent text-glow">
                LotoTurbo
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Activez le mode turbo pour multiplier vos chances de gain
              </p>
            </div>

            <CardContent className="p-10">
              {/* Descrição */}
              <div className="text-center mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed px-5">
                  Découvrez la puissance exclusive du <span className="font-semibold text-accent text-glow">Mode Turbo</span> qui 
                  révolutionne votre expérience de jeu. Générez votre code d'activation unique pour débloquer 
                  des fonctionnalités premium qui maximiseront vos chances de succès.
                </p>
              </div>

              {/* Benefícios */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <Card key={index} className="group hover-elevate hover-glow border border-accent/20 hover:border-accent transition-all duration-500 overflow-hidden relative gpu-accelerated">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <CardContent className="p-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-pulsar">
                          <Icon className="w-9 h-9 text-accent group-hover:text-accent-foreground transition-colors duration-500" />
                        </div>
                        <h3 className="text-xl font-bold text-accent mb-4 text-glow">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Botão de geração */}
              <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-8 rounded-2xl border border-dashed border-accent/50 animate-pulsar">
                  <Button
                    onClick={handleGenerateCode}
                    disabled={isLoading}
                    className={cn(
                      "px-12 py-6 text-lg font-bold uppercase tracking-wider rounded-full",
                      "bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent",
                      "text-accent-foreground shadow-lg hover:shadow-xl hover:scale-105",
                      "transition-all duration-300 relative overflow-hidden",
                      "hover:shadow-accent/25 turbo-active gpu-accelerated gradient-animate"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <Cog className="w-6 h-6 mr-3 animate-spin" />
                        {buttonText}
                      </>
                    ) : showCode ? (
                      <>
                        <RotateCcw className="w-6 h-6 mr-3" />
                        {buttonText}
                      </>
                    ) : (
                      <>
                        <Key className="w-6 h-6 mr-3" />
                        {buttonText}
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Animação de carregamento */}
              <LoadingAnimation active={isLoading} />

              {/* Código de ativação */}
              <div id="activation-code">
                <ActivationCode visible={showCode} code={activationCode} />
              </div>
            </CardContent>

            {/* Footer */}
            <div className="text-center p-8 border-t border-border/50 bg-muted/30">
              <p className="text-muted-foreground">
                LotoTurbo &copy; 2025-2026 - Tous droits réservés | Solution brevetée
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
