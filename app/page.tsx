"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/ui/header"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { AuthModal } from "@/components/ui/auth-modal"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Lock } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated, refreshUserFromDB } = useAuth()
  // Refresh automático ao carregar a página
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      console.log('🔄 Fazendo refresh automático dos dados do usuário...')
      refreshUserFromDB()
    }
  }, [isAuthenticated, user?.email])

  const handlePremiumAccess = (productPath: string, hasAccess: boolean, productType?: 'lotogains' | 'lototurbo') => {
    console.log('🎯 handlePremiumAccess chamado:', { productPath, hasAccess, productType })
    
    if (!isAuthenticated) {
      // Se não está logado, mostrar modal de login
      return
    }
    
    if (hasAccess) {
      // Se tem acesso, navegar para o produto
      router.push(productPath)
    } else {
      // Se não tem acesso, redirecionar para compra
      console.log('🛒 Redirecionando para compra...')
      
      const purchaseLinks = {
        'lotogains': 'https://pay.hotmart.com/Q101524388K',
        'lototurbo': 'https://pay.hotmart.com/R101540125D?off=lhy6d68y'
      }
      
      if (productType && purchaseLinks[productType]) {
        const url = purchaseLinks[productType]
        console.log('🔗 URL de compra:', url)
        
        try {
          const newWindow = window.open(url, '_blank')
          if (!newWindow) {
            console.log('⚠️ Popup bloqueado, usando location.href')
            window.location.href = url
          } else {
            console.log('✅ Nova aba aberta com sucesso')
          }
        } catch (error) {
          console.error('❌ Erro ao redirecionar:', error)
          window.location.href = url
        }
      } else {
        // Fallback para alert se não conseguir identificar o produto
        alert('Este produto está bloqueado. Entre em contato para liberar o acesso premium.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header showBackButton={false} />


      {/* Main Content */}
      <main className="pb-20 px-4">
        {/* Featured Product */}
        <section className="py-6">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  En vedette
                </Badge>
                <span className="text-2xl font-bold text-primary">50M €</span>
              </div>
              <CardTitle className="text-2xl">LotoGains</CardTitle>
              <CardDescription>Le plus gros prix de l'histoire vous attend</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/lotogains.png"
                alt="LotoGains"
                className="w-full h-full object-cover rounded-lg mb-4"
              />
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => router.push("/lotogains")}
              >
                Jouer Maintenant
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* LotoGains 10X Premium Card */}
        <section className="py-6">
          <Card className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 mb-6 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  🚀 LotoGains 10X
                </CardTitle>
                <Badge className="bg-accent text-accent-foreground animate-pulse">
                  NOUVEAU
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/10x.png"
                alt="LotoGains 10X"
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <CardDescription className="mb-4 text-base">
                ⚡ Générateur de numéros alimenté par une IA ultra-puissante. 
                Mode Turbo disponible pour 10X plus de précision et 78% de chances de gagner en plus !
              </CardDescription>
              {!isAuthenticated ? (
                <AuthModal>
                  <Button className="w-full bg-gradient-to-r from-accent to-primary text-white hover:from-accent/90 hover:to-primary/90 transition-all duration-300">
                    🎯 Essayer Maintenant
                  </Button>
                </AuthModal>
              ) : (
                <div className="relative">
                  <Button 
                    className={`w-full bg-gradient-to-r transition-all duration-300 ${
                      user?.loto_gains_10x_access 
                        ? 'from-accent to-primary text-white hover:from-accent/90 hover:to-primary/90' 
                        : 'from-gray-400 to-gray-500 text-gray-200 cursor-pointer hover:from-gray-500 hover:to-gray-600'
                    }`}
                    onClick={(e) => {
                      console.log('🛒 Botão LotoGains 10X clicado!')
                      console.log('👤 Usuário:', user?.email)
                      console.log('🔐 Acesso LotoGains:', user?.loto_gains_10x_access)
                      handlePremiumAccess("/lotogains-10x", user?.loto_gains_10x_access || false, 'lotogains')
                    }}
                  >
                    {user?.loto_gains_10x_access ? (
                      <>🎯 Essayer Maintenant</>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Produto Bloqueado
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* LotoTurbo Premium Card */}
        <section className="py-6">
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 mb-6 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  ⚡ LotoTurbo
                </CardTitle>
                <Badge className="bg-green-500 text-white animate-pulse">
                  RAPIDE
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/lototurbo.png"
                alt="LotoTurbo"
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <CardDescription className="mb-4 text-base">
                🚀 Résultats ultra-rapides toutes les 5 minutes ! 
                Système de génération instantanée avec technologie avancée pour une agilité maximale !
              </CardDescription>
              {!isAuthenticated ? (
                <AuthModal>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                    ⚡ Jouer Turbo
                  </Button>
                </AuthModal>
              ) : (
                <div className="relative">
                  <Button 
                    className={`w-full bg-gradient-to-r transition-all duration-300 ${
                      user?.loto_turbo_access 
                        ? 'from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600' 
                        : 'from-gray-400 to-gray-500 text-gray-200 cursor-pointer hover:from-gray-500 hover:to-gray-600'
                    }`}
                    onClick={(e) => {
                      console.log('🛒 Botão LotoTurbo clicado!')
                      console.log('👤 Usuário:', user?.email)
                      console.log('🔐 Acesso LotoTurbo:', user?.loto_turbo_access)
                      handlePremiumAccess("/loto-turbo", user?.loto_turbo_access || false, 'lototurbo')
                    }}
                  >
                    {user?.loto_turbo_access ? (
                      <>⚡ Jouer Turbo</>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Produto Bloqueado
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Bonus01 - Jackpots Instantâneos */}
        <section className="py-6">
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 mb-6 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  🎰 Jackpots Instantanés
                </CardTitle>
                <Badge className="bg-yellow-500 text-white animate-pulse">
                  CHAUD
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/jackpots.png"
                alt="Jackpots Instantanés"
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <CardDescription className="mb-4 text-base">
                💰 Accès direct aux plus gros jackpots du monde ! 
                EuroMillions, Powerball et plus - tout en un seul endroit avec des informations mises à jour !
              </CardDescription>
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                onClick={() => router.push("/bonus01")}
              >
                🎯 Voir les Jackpots
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Bonus02 - Alerta Ganhante */}
        <section className="py-6">
          <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 mb-6 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  🔔 Alerte Gagnante
                </CardTitle>
                <Badge className="bg-blue-500 text-white animate-pulse">
                  TEMPS RÉEL
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/alerte.png"
                alt="Alerte Gagnante"
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <CardDescription className="mb-4 text-base">
                📱 Système d'alertes intelligent ! 
                Enregistrez vos billets et recevez des notifications instantanées quand vous gagnez !
              </CardDescription>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                onClick={() => router.push("/bonus02")}
              >
                🚨 Activer les Alertes
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Bonus03 - Atualizações Diárias */}
        <section className="py-6">
          <Card className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-indigo-500/30 mb-6 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                  📊 Mises à Jour Quotidiennes
                </CardTitle>
                <Badge className="bg-indigo-500 text-white animate-pulse">
                  QUOTIDIEN
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <img
                src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/mises%20a.png"
                alt="Mises à Jour Quotidiennes"
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <CardDescription className="mb-4 text-base">
                📈 Tableau de bord complet avec toutes les informations ! 
                Prochains tirages, classements des jackpots et actualités mises à jour quotidiennement !
              </CardDescription>
              <Button 
                className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300"
                onClick={() => router.push("/bonus03")}
              >
                📊 Voir le Tableau de Bord
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
