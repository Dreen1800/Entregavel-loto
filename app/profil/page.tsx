"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { useAuth } from '@/hooks/use-auth'
import { signOut } from '@/lib/auth'
import { Camera, LogOut, User, Mail, Shield, Lock, CheckCircle, XCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilPage() {
  const router = useRouter()
  const { user, loading, refreshUser } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleDisconnect = async () => {
    try {
      await signOut()
      refreshUser()
      router.push('/')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  const handleChangePhoto = () => {
    console.log("Modification de la photo...")
    // Logique pour modifier la photo de profil
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null // Será redirecionado para login
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header com botão de desconexão */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Votre Profil</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDisconnect}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sortir
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 px-4 py-6">
        {/* Profile Card */}
        <Card className="max-w-md mx-auto mb-6">
          <CardContent className="pt-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder-user.jpg" alt="Photo de profil" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                
                {/* Camera Icon */}
                <button
                  onClick={handleChangePhoto}
                  className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Cliquez sur l'icône de l'appareil photo pour modifier votre photo
              </p>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nom
                </label>
                <div className="bg-muted/50 rounded-lg p-3">
                  <span className="text-lg font-medium">{user.name}</span>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <div className="bg-muted/50 rounded-lg p-3">
                  <span className="text-lg font-medium">{user.email}</span>
                </div>
              </div>

              {/* Data de Cadastro */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Membre depuis
                </label>
                <div className="bg-muted/50 rounded-lg p-3">
                  <span className="text-lg font-medium">
                    {new Date(user.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Access Card */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Accès Premium
            </CardTitle>
            <CardDescription>
              Statut de vos produits premium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* LotoGains 10X */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${user.loto_gains_10x_access ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {user.loto_gains_10x_access ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">LotoGains 10X</p>
                    <p className="text-sm text-muted-foreground">Générateur IA Premium</p>
                  </div>
                </div>
                <Badge variant={user.loto_gains_10x_access ? "default" : "secondary"}>
                  {user.loto_gains_10x_access ? "Débloqué" : "Bloqué"}
                </Badge>
              </div>

              {/* LotoTurbo */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${user.loto_turbo_access ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {user.loto_turbo_access ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">LotoTurbo</p>
                    <p className="text-sm text-muted-foreground">Résultats Rapides</p>
                  </div>
                </div>
                <Badge variant={user.loto_turbo_access ? "default" : "secondary"}>
                  {user.loto_turbo_access ? "Débloqué" : "Bloqué"}
                </Badge>
              </div>

              {(!user.loto_gains_10x_access || !user.loto_turbo_access) && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    💎 Contactez-nous pour débloquer l'accès aux produits premium
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}