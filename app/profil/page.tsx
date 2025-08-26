"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/ui/header"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { useRouter } from "next/navigation"
import { Camera, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilPage() {
  const router = useRouter()

  const handleDisconnect = () => {
    // Lógica de desconexão aqui
    console.log("Desconectando usuário...")
    // router.push("/login") // Redirecionar para página de login quando existir
  }

  const handleChangePhoto = () => {
    console.log("Alterando foto...")
    // Lógica para alterar foto do perfil
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
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 px-4 py-6">
        {/* Profile Card */}
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder-user.jpg" alt="Photo de profil" />
                  <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
                    T
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
                Cliquez sur l'icône de l'appareil photo pour changer votre photo
              </p>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Nom
                </label>
                <div>
                  <span className="text-lg font-medium">teste</span>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <div>
                  <span className="text-lg font-medium">teste@gmail.com</span>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
