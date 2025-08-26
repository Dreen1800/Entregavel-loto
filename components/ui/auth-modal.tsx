'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithEmail } from '@/lib/auth'
import { useAuth } from '@/hooks/use-auth'
import { Loader2, Mail, LogIn, User } from 'lucide-react'

interface AuthModalProps {
  children: React.ReactNode
}

export function AuthModal({ children }: AuthModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const { refreshUser } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      alert('Por favor, digite seu email')
      return
    }

    if (isNewUser && !name.trim()) {
      alert('Por favor, digite seu nome')
      return
    }

    setLoading(true)

    try {
      const { data, error, user: userData } = await signInWithEmail(email, name)
      
      if (error) {
        alert(`Erro: ${error.message}`)
      } else if (userData) {
        refreshUser()
        setOpen(false)
        resetModal()
      }
    } catch (error: any) {
      alert('Ocorreu um erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  const resetModal = () => {
    setEmail('')
    setName('')
    setIsNewUser(false)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        setTimeout(resetModal, 200)
      }
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acesso Direto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="modal-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="modal-email"
                type="email"
                placeholder="seu@email.com"
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
              id="modal-newUser"
              checked={isNewUser}
              onChange={(e) => setIsNewUser(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="modal-newUser" className="text-sm">
              Sou novo usuário
            </Label>
          </div>

          {isNewUser && (
            <div className="space-y-2">
              <Label htmlFor="modal-name">Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="modal-name"
                  type="text"
                  placeholder="Seu nome completo"
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
                Entrando...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Sem senha necessária! Entre diretamente
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}