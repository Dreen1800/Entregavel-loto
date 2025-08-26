"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, TrendingUp, Users, User } from "lucide-react"

const navigationItems = [
  { id: "accueil", label: "Accueil", icon: Home, path: "/" },
  { id: "actualite", label: "Fil d'actualité", icon: TrendingUp, path: "/actualite" },
  { id: "communaute", label: "Communauté", icon: Users, path: "/communaute" },
  { id: "profil", label: "Profil", icon: User, path: "/profil" },
]

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  // Determina qual tab está ativa baseado na rota atual
  const getActiveTab = () => {
    const currentItem = navigationItems.find(item => {
      if (item.path === "/" && pathname === "/") return true
      if (item.path !== "/" && pathname.startsWith(item.path)) return true
      return false
    })
    return currentItem?.id || "accueil"
  }

  const [activeTab, setActiveTab] = useState(getActiveTab())

  const handleNavigation = (item: typeof navigationItems[0]) => {
    setActiveTab(item.id)
    router.push(item.path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
