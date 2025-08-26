"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ArrowLeft } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
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
    const router = useRouter()
    const pathname = usePathname()
    
    // Determinar se deve mostrar o botão de volta automaticamente
    const shouldShowBackButton = showBackButton !== undefined ? showBackButton : pathname !== "/"

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between p-4">
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
      </header>
    )
  }
)
Header.displayName = "Header"

export { Header }
