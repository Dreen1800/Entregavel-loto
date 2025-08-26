"use client"

import { ReactNode } from "react"
import { BottomNavigation } from "@/components/ui/bottom-navigation"

interface PageLayoutProps {
  children: ReactNode
  showBottomNavigation?: boolean
}

export function PageLayout({ children, showBottomNavigation = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      {showBottomNavigation && <BottomNavigation />}
    </div>
  )
}
