"use client"
import { Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  badge: string
  badgeVariant: "default" | "secondary" | "destructive" | "outline"
}

export function ProductCard({ id, title, subtitle, description, image, badge, badgeVariant }: ProductCardProps) {
  const router = useRouter()

  const handlePlayClick = () => {
    if (id === "loto-gains") {
      router.push("/lotogains")
    } else {
      // For other products, you can add their respective routes here
      console.log(`Navigate to ${id}`)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handlePlayClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          <Play className="h-4 w-4 mr-2" />
          Jogar Agora
        </Button>
      </CardFooter>
    </Card>
  )
}
