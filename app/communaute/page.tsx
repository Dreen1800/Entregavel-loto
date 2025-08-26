"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/ui/header"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, Image as ImageIcon, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

export default function CommunautePage() {
  const router = useRouter()
  const [newPost, setNewPost] = useState("")

  const handlePublish = () => {
    if (newPost.trim()) {
      console.log("Publicando post:", newPost)
      setNewPost("")
      // Lógica para publicar o post
    }
  }

  const handleLike = (postId: string) => {
    console.log("Curtindo post:", postId)
    // Lógica para curtir post
  }

  const handleComment = (postId: string) => {
    console.log("Comentando no post:", postId)
    // Lógica para comentar
  }

  const communityPosts = [
    {
      id: "1",
      author: "Sylvie Beaudoin",
      avatar: "S",
      date: "23 août à 12:33",
      content: "Est-ce que ce programme n'est que pour les européens ou du Canada on peut y avoir accès",
      likes: 2,
      comments: 1,
      isLiked: false
    },
    {
      id: "2", 
      author: "Lutgarde JAMAER",
      avatar: "L",
      date: "23 août à 05:59",
      content: "Belgique",
      likes: 0,
      comments: 0,
      isLiked: false
    },
    {
      id: "3",
      author: "Antoine Dupont",
      avatar: "https://ppyxcanzwxsbsrokvpky.supabase.co/storage/v1/object/public/app-assets/posts/avatars/1755840059866.jpg",
      date: "22 août à 02:21",
      content: "Je me suis inscrit sur LotoGains sans imaginer ce qui allait se passer... Quelques semaines plus tard, mes gains ont été si élevés que j'ai réalisé un rêve de longue date : conduire ma propre Mercedes-Benz Classe S. Si j'ai pu le faire, vous le pouvez aussi !",
      likes: 0,
      comments: 0,
      isLiked: false,
      hasImage: true,
      image: "https://ppyxcanzwxsbsrokvpky.supabase.co/storage/v1/object/public/app-assets/posts/images/1755840059608.jpg"
    },
    {
      id: "4",
      author: "Jean Dupont",
      avatar: "/placeholder-user.jpg",
      date: "22 août à 02:16",
      content: "Je viens juste d'entrer sur LotoGains. Je fais mes paris en ce moment même, souhaitez-moi bonne chance !",
      likes: 1,
      comments: 0,
      isLiked: false
    },
    {
      id: "5",
      author: "Louis Fontaine",
      avatar: "L",
      date: "22 août à 02:14",
      content: "Me mes premiers 7000 euros sont déjà partis. J'ai acheté l'accès à LotoGains il y a seulement 7 jours.",
      likes: 1,
      comments: 0,
      isLiked: false,
      hasImage: true,
      image: "https://ppyxcanzwxsbsrokvpky.supabase.co/storage/v1/object/public/app-assets/posts/images/1755839670724.jpg"
    },
    {
      id: "6",
      author: "Pierre Dubois",
      avatar: "/placeholder-user.jpg",
      date: "21 août à 00:17",
      content: "ENFIN!\nAprès 5 jours d'essai, j'ai réussi. Mon premier prix à la loterie. J'ai hâte d'offrir un nouveau téléphone portable à ma fille.",
      likes: 2,
      comments: 0,
      isLiked: false
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header showBackButton={false} />

      {/* Main Content */}
      <main className="pb-20 px-4">
        {/* Page Title */}
        <section className="py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Communauté
            </h1>
            <p className="text-muted-foreground">
              Partagez vos expériences et connectez-vous avec d'autres joueurs
            </p>
          </div>
        </section>

        {/* Create Post Section */}
        <section className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" alt="Votre photo" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    T
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="À quoi pensez-vous?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px] resize-none border-0 bg-muted/30 focus-visible:ring-1"
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ImageIcon className="h-4 w-4 mr-2" />
                    </Button>
                    <Button 
                      onClick={handlePublish}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Publier
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Community Posts */}
        <section className="space-y-4">
          {communityPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                {/* Post Header */}
                <div className="flex items-start gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    {post.avatar.startsWith('/') ? (
                      <AvatarImage src={post.avatar} alt={post.author} />
                    ) : null}
                    <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                      {post.avatar.startsWith('/') ? post.author.charAt(0) : post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{post.author}</h4>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                  
                  {/* Post Image */}
                  {post.hasImage && (
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post image"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${
                      post.isLiked ? 'text-red-500' : 'text-muted-foreground'
                    } hover:text-red-500`}
                  >
                    <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{post.likes}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleComment(post.id)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Load More Section */}
        <section className="py-8 text-center">
          <Button variant="outline" className="px-8">
            Charger plus de posts
          </Button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
