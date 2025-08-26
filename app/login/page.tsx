'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithEmail } from '@/lib/auth'
import { useAuth } from '@/hooks/use-auth'
import { Loader2, Mail, LogIn, User } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const { user, loading: authLoading, refreshUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      alert('Veuillez saisir votre email')
      return
    }

    if (isNewUser && !name.trim()) {
      alert('Veuillez saisir votre nom')
      return
    }

    setLoading(true)

    try {
      const { data, error, user: userData } = await signInWithEmail(email, name)
      
      if (error) {
        alert(`Erreur: ${error.message}`)
      } else if (userData) {
        refreshUser()
        router.push('/')
      }
    } catch (error: any) {
      alert('Une erreur inattendue s\'est produite')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">Accès</h1>
            <p className="text-sm text-muted-foreground">Saisissez votre email pour vous connecter</p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Connexion Directe
              </CardTitle>
              <CardDescription>
                Connectez-vous directement avec votre email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newUser"
                    checked={isNewUser}
                    onChange={(e) => setIsNewUser(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="newUser" className="text-sm">
                    Je suis un nouvel utilisateur
                  </Label>
                </div>

                {isNewUser && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Votre nom complet"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={isNewUser}
                      />
                    </div>
                  </div>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connexion...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Se connecter
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Aucun mot de passe requis ! Connectez-vous directement avec votre email
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}