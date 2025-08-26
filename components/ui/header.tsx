"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/ui/auth-modal"
import { Moon, Sun, ArrowLeft, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { signOut } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  showThemeToggle?: boolean
  showBackButton?: boolean
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, title = "LotoGains", subtitle = "Votre chance commence ici", showThemeToggle = true, showBackButton, ...props }, ref) => {
    const { theme, setTheme } = useTheme()
    const { user, loading } = useAuth()
    const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()
    
    // Determinar se deve mostrar o botão de volta automaticamente
    const shouldShowBackButton = showBackButton !== undefined ? showBackButton : pathname !== "/"

    const handleSignOut = async () => {
      try {
        const { error } = await signOut()
        if (error) {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: error.message,
          })
        } else {
          toast({
            title: "Déconnexion réalisée!",
            description: "Vous avez été déconnecté avec succès",
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Une erreur inattendue s'est produite",
        })
      }
    }

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
          className
        )}
        {...props}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center">
            {shouldShowBackButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => router.back()}
                className="mr-3"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Retour</span>
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-primary">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!loading && user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.email}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleSignOut}
                  title="Sortir"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sortir</span>
                </Button>
              </div>
            ) : !loading ? (
              <AuthModal>
                <Button variant="ghost" size="icon" title="Connexion">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Connexion</span>
                </Button>
              </AuthModal>
            ) : null}
            
            {showThemeToggle && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Basculer le thème</span>
              </Button>
            )}
          </div>
        </div>
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
