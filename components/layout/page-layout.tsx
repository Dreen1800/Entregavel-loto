"use client"

import { ReactNode } from "react"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { Header } from "@/components/ui/header"

interface PageLayoutProps {
  children: ReactNode
  showBottomNavigation?: boolean
  showHeader?: boolean
  title?: string
  subtitle?: string
  showBackButton?: boolean
  containerClass?: string
}

export function PageLayout({ 
  children, 
  showBottomNavigation = true,
  showHeader = true,
  title,
  subtitle,
  showBackButton,
  containerClass = "max-w-6xl mx-auto px-4"
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <Header 
          title={title}
          subtitle={subtitle}
          showBackButton={showBackButton}
        />
      )}
      
      <main className={`pb-20 lg:pb-8 ${containerClass}`}>
        {children}
      </main>
      
      {showBottomNavigation && <BottomNavigation />}
    </div>
  )
}
