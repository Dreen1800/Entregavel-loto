"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/ui/auth-modal"
import { PageLayout } from "@/components/layout/page-layout"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Lock } from "lucide-react"
import { useEffect, useState } from "react"

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated, refreshUserFromDB } = useAuth()
  // Actualisation automatique lors du chargement de la page
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      console.log('🔄 Actualisation automatique des données utilisateur...')
      refreshUserFromDB()
    }
  }, [isAuthenticated, user?.email])

  const handlePremiumAccess = (productPath: string, hasAccess: boolean, productType?: 'lotogains' | 'lototurbo') => {
    console.log('🎯 handlePremiumAccess chamado:', { productPath, hasAccess, productType })
    
    if (!isAuthenticated) {
      // Si pas connecté, afficher le modal de connexion
      return
    }
    
    if (hasAccess) {
      // Si accès disponible, naviguer vers le produit
      router.push(productPath)
    } else {
      // Si pas d'accès, rediriger vers l'achat
      console.log('🛒 Redirection vers l\'achat...')
      
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
        // Solution de repli si impossible d'identifier le produit
        alert('Ce produit est bloqué. Contactez-nous pour débloquer l\'accès premium.')
      }
    }
  }

  return (
    <PageLayout 
      title="LotoGains"
      subtitle="Votre chance commence ici"
      showBackButton={false}
      containerClass="max-w-6xl mx-auto px-4"
    >
        {/* Hero Section - Featured Product */}
        <section className="py-6">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 max-w-4xl mx-auto">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <img
                  src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/lotogains.png"
                  alt="LotoGains"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <p className="text-muted-foreground">
                    Le générateur de numéros le plus avancé pour maximiser vos chances de gagner.
                  </p>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => router.push("/lotogains")}
                  >
                    Jouer Maintenant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Premium Products Grid */}
        <section className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* LotoGains 10X Premium Card */}
            <Card className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
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
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <CardDescription className="mb-4">
                  ⚡ Générateur IA ultra-puissante. Mode Turbo pour 10X plus de précision !
                </CardDescription>
                {!isAuthenticated ? (
                  <AuthModal>
                    <Button className="w-full bg-gradient-to-r from-accent to-primary text-white hover:from-accent/90 hover:to-primary/90 transition-all duration-300">
                      🎯 Essayer
                    </Button>
                  </AuthModal>
                ) : (
                  <Button 
                    className={`w-full bg-gradient-to-r transition-all duration-300 ${
                      user?.loto_gains_10x_access 
                        ? 'from-accent to-primary text-white hover:from-accent/90 hover:to-primary/90' 
                        : 'from-gray-400 to-gray-500 text-gray-200 cursor-pointer hover:from-gray-500 hover:to-gray-600'
                    }`}
                    onClick={() => {
                      handlePremiumAccess("/lotogains-10x", user?.loto_gains_10x_access || false, 'lotogains')
                    }}
                  >
                    {user?.loto_gains_10x_access ? (
                      <>🎯 Essayer Maintenant</>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Produit Bloqué
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* LotoTurbo Premium Card */}
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
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
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <CardDescription className="mb-4">
                  🚀 Résultats ultra-rapides toutes les 5 minutes ! Technologie avancée.
                </CardDescription>
                {!isAuthenticated ? (
                  <AuthModal>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300">
                      ⚡ Jouer Turbo
                    </Button>
                  </AuthModal>
                ) : (
                  <Button 
                    className={`w-full bg-gradient-to-r transition-all duration-300 ${
                      user?.loto_turbo_access 
                        ? 'from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600' 
                        : 'from-gray-400 to-gray-500 text-gray-200 cursor-pointer hover:from-gray-500 hover:to-gray-600'
                    }`}
                    onClick={() => {
                      handlePremiumAccess("/loto-turbo", user?.loto_turbo_access || false, 'lototurbo')
                    }}
                  >
                    {user?.loto_turbo_access ? (
                      <>⚡ Jouer Turbo</>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Produit Bloqué
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Bonus Features Grid */}
        <section className="py-6">
          <h2 className="text-2xl font-bold text-center mb-6">Fonctionnalités Bonus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Bonus01 - Jackpots Instantâneos */}
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    🎰 Jackpots
                  </CardTitle>
                  <Badge className="bg-yellow-500 text-white animate-pulse text-xs">
                    CHAUD
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <img
                  src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/jackpots.png"
                  alt="Jackpots Instantanés"
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <CardDescription className="mb-4 text-sm">
                  💰 Accès direct aux plus gros jackpots du monde !
                </CardDescription>
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 text-sm"
                  onClick={() => router.push("/bonus01")}
                >
                  🎯 Voir Jackpots
                </Button>
              </CardContent>
            </Card>

            {/* Bonus02 - Alerta Ganhante */}
            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    🔔 Alertes
                  </CardTitle>
                  <Badge className="bg-blue-500 text-white animate-pulse text-xs">
                    TEMPS RÉEL
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <img
                  src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/alerte.png"
                  alt="Alerte Gagnante"
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <CardDescription className="mb-4 text-sm">
                  📱 Système d'alertes intelligent pour vos billets !
                </CardDescription>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm"
                  onClick={() => router.push("/bonus02")}
                >
                  🚨 Alertes
                </Button>
              </CardContent>
            </Card>

            {/* Bonus03 - Atualizações Diárias */}
            <Card className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border-indigo-500/30 hover:shadow-xl transition-all duration-300 md:col-span-2 xl:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                    📊 Dashboard
                  </CardTitle>
                  <Badge className="bg-indigo-500 text-white animate-pulse text-xs">
                    QUOTIDIEN
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <img
                  src="https://ynmtotqvrymcrizsofdx.supabase.co/storage/v1/object/public/imagens/products/mises%20a.png"
                  alt="Mises à Jour Quotidiennes"
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <CardDescription className="mb-4 text-sm">
                  📈 Tableau de bord avec toutes les informations mises à jour !
                </CardDescription>
                <Button 
                  className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 text-sm"
                  onClick={() => router.push("/bonus03")}
                >
                  📊 Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
    </PageLayout>
  )
}
