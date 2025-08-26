"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/ui/header"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

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
              <Button 
                className="w-full bg-gradient-to-r from-accent to-primary text-white hover:from-accent/90 hover:to-primary/90 transition-all duration-300"
                onClick={() => router.push("/lotogains-10x")}
              >
                🎯 Essayer Maintenant
              </Button>
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
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                onClick={() => router.push("/loto-turbo")}
              >
                ⚡ Jouer Turbo
              </Button>
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
