"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/ui/header"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Trophy, Zap, Globe } from "lucide-react"

export default function ActualitePage() {
  const router = useRouter()

  const newsItems = [
    {
      id: "lotogains-10x",
      title: "🚀 Découvrez le LotoGains 10X",
      date: "Aujourd'hui",
      badge: "NOUVEAU",
      badgeColor: "bg-gradient-to-r from-accent to-primary",
      image: "https://ppyxcanzwxsbsrokvpky.supabase.co/storage/v1/object/public/app-assets/feed/images/1755983600169.jpg",
      icon: Zap,
      sections: [
        {
          content: "Vous connaissez déjà la puissance de LotoGains… mais imaginez maintenant obtenir des résultats 10 fois plus rapides et multiplier vos chances de décrocher un jackpot millionnaire."
        },
        {
          content: "Avec LotoGains 10X, vous accédez à la version la plus avancée de notre intelligence artificielle, capable d'analyser 10 fois plus de schémas et de vous livrer des combinaisons encore plus précises pour transformer vos mises en gains réels."
        },
        {
          title: "🎯 Ce que vous gagnez avec le 10X :",
          content: "• Des résultats 10X plus rapides ⚡\n• Plus de chances de décrocher le jackpot 💰\n• Des stratégies exclusives et personnalisées 🤖\n• Un accompagnement et des tutoriels pour jouer en toute sécurité et confiance"
        },
        {
          title: "💬 Témoignage",
          content: "« J'utilisais déjà LotoGains et j'aimais beaucoup, mais quand j'ai testé le 10X j'ai été impressionné. En 3 jours, j'ai trouvé 5 numéros à la Mega Sena ! Je n'avais jamais été aussi proche d'un grand gain. » – Marcos A.",
          isTestimonial: true
        },
        {
          content: "👉 Prêt à accélérer vos résultats et à entrer définitivement dans le jeu avec intelligence ?"
        }
      ],
      cta: {
        text: "🔗 Découvrir LotoGains 10X",
        action: () => router.push("/lotogains-10x")
      }
    },
    {
      id: "nouveaux-pays",
      title: "🚀 Attention, famille LotoGains !",
      date: "Il y a 2 jours",
      badge: "EXPANSION",
      badgeColor: "bg-gradient-to-r from-blue-500 to-purple-500",
      image: "https://ppyxcanzwxsbsrokvpky.supabase.co/storage/v1/object/public/app-assets/feed/images/1755965647358.jpg",
      icon: Globe,
      sections: [
        {
          content: "Nous venons de franchir une nouvelle étape importante pour rendre notre plateforme encore plus complète : vous pouvez désormais sélectionner le Canada 🇨🇦, la Suisse 🇨🇭 et la Belgique 🇧🇪 dans la première étape de LotoGains ! 🎉"
        },
        {
          content: "Mais rassurez-vous… si votre pays n'apparaît pas encore dans la liste, ce n'est absolument pas un problème ! 😉"
        },
        {
          content: "👉 Vous n'avez pas besoin d'habiter l'un de ces pays pour utiliser LotoGains. Car aujourd'hui, il est tout à fait possible de jouer à de nombreuses loteries en ligne 💻📱, de manière simple, rapide et sécurisée, depuis n'importe quel endroit dans le monde."
        },
        {
          content: "En d'autres termes : la puissance de notre intelligence artificielle est entre vos mains, peu importe où vous vous trouvez 🌍. Il vous suffit d'accéder à la plateforme, de générer vos combinaisons et de placer vos mises en ligne — le fonctionnement est exactement le même."
        },
        {
          content: "Avec LotoGains, votre prochain grand gain ne connaît pas de frontières. ✨"
        }
      ],
      cta: {
        text: "🌍 Essayer LotoGains",
        action: () => router.push("/lotogains")
      }
    },
    {
      id: "euromillions-tirage",
      title: "✨ Bonjour famille LotoGains ! ✨",
      date: "22 août 2025",
      badge: "TIRAGE AUJOURD'HUI",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      image: "https://ppyxcanzwxsbsrokvpky.supabase.co/storage/v1/object/public/app-assets/feed/images/1755839515120.jpg",
      icon: Calendar,
      sections: [
        {
          content: "Nous sommes dans le compte à rebours pour le prochain tirage de l'EuroMillions, qui a lieu AUJOURD'HUI, vendredi 22 août 2025 — et devinez quoi ? Le jackpot redémarre à pas moins de 17 millions d'euros en jeu ! 💸🎯"
        },
        {
          content: "Oui, vous avez bien lu : après le méga gain de 250 millions d'euros remporté le 19 août, une nouvelle chance s'offre déjà à nous, et c'est le moment idéal pour mettre notre intelligence artificielle à l'épreuve."
        },
        {
          content: "Imaginez : vous, utilisant LotoGains pour générer vos combinaisons les plus stratégiques et puissantes, au lieu d'attendre comme la plupart des joueurs. Pendant que beaucoup comptent sur le hasard, vous jouez avec méthode, données et confiance 🤖."
        },
        {
          title: "🔔 Petit conseil du jour :",
          content: "prenez quelques minutes dès maintenant pour lancer le système, générer vos numéros et placer votre mise en ligne 💻📱 — simple, rapide et sécurisé. N'oubliez pas que la clôture des prises de jeu est fixée à 20h15 (heure française), donc le moment d'agir, c'est maintenant."
        },
        {
          content: "La chance peut frapper à votre porte 🍀… mais avec LotoGains, vous construisez le chemin pour qu'elle vienne à vous. Jouez avec intelligence, responsabilité et cette touche d'audace qui fait toute la différence."
        },
        {
          content: "Bonne chance, énergie positive et focus total — souvenez-vous : votre nouveau chapitre peut commencer aujourd'hui 🚀."
        }
      ],
      cta: {
        text: "🎯 Générer mes numéros",
        action: () => router.push("/lotogains")
      }
    },
    {
      id: "grande-victoire",
      title: "🇫🇷 Chers membres de la communauté LotoGains",
      date: "19 août 2025",
      badge: "GRANDE VICTOIRE",
      badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      image: "https://ppyxcanzwxsbsrokvpky.supabase.co/storage/v1/object/public/app-assets/feed/images/1755748678917.jpg",
      icon: Trophy,
      sections: [
        {
          content: "Quel moment historique ! Le dernier tirage de l'EuroMillions, qui a eu lieu le mardi 19 août 2025, a fait un gagnant en France 🥳."
        },
        {
          title: "🎯 Numéros gagnants :",
          content: "Les numéros tirés étaient : 24, 31, 34, 41, 43 et les Étoiles de la Chance : 06 et 08 ✨",
          isHighlight: true
        },
        {
          content: "Un joueur français a décroché le jackpot incroyable de 250 millions d'euros 💶, le plus grand gain de l'année !"
        },
        {
          content: "Ce résultat est une preuve vivante : tout est possible. Et la différence, c'est de jouer avec stratégie. Pendant que des millions de joueurs misent au hasard, vous, grâce à LotoGains, avez la puissance de l'intelligence artificielle 🤖 à vos côtés pour détecter les combinaisons les plus prometteuses."
        },
        {
          content: "Imaginez-vous au prochain tirage… votre billet à la main, vos numéros sortant un à un. La victoire n'est pas un rêve lointain, c'est une possibilité réelle — surtout lorsque vous utilisez les bons outils."
        },
        {
          content: "Continuez à exploiter la puissance de notre IA chaque jour, car la prochaine grande victoire pourrait bien être la vôtre 🏆."
        },
        {
          content: "Ensemble, faisons de vos prochains tirages un moment inoubliable."
        }
      ],
      cta: {
        text: "🚀 Commencer maintenant",
        action: () => router.push("/lotogains")
      }
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
              Fil d'actualité
            </h1>
            <p className="text-muted-foreground">
              Restez informé des dernières nouvelles et opportunités LotoGains
            </p>
          </div>
        </section>

        {/* News Feed */}
        <section className="space-y-6">
          {newsItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={`${item.badgeColor} text-white animate-pulse`}>
                      {item.badge}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Image */}
                  {item.image && (
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                  )}

                  {/* Content Sections */}
                  <div className="space-y-4">
                    {item.sections.map((section, index) => (
                      <div key={index} className={`space-y-2 ${
                        section.isTestimonial ? 'bg-primary/5 p-4 rounded-lg border-l-4 border-primary' :
                        section.isHighlight ? 'bg-accent/10 p-4 rounded-lg text-center font-semibold' : ''
                      }`}>
                        {section.title && (
                          <h4 className="font-semibold text-primary">{section.title}</h4>
                        )}
                        <p className={`text-sm leading-relaxed ${
                          section.isTestimonial ? 'italic' : ''
                        }`}>
                          {section.content.split('\n').map((line, lineIndex) => (
                            <span key={lineIndex}>
                              {line}
                              {lineIndex < section.content.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {item.cta && (
                    <div className="pt-4 border-t">
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                        onClick={item.cta.action}
                      >
                        {item.cta.text}
                      </Button>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-2 text-right">
                    <p className="text-xs text-muted-foreground italic">
                      Équipe LotoGains ✨
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Load More Section */}
        <section className="py-8 text-center">
          <Button variant="outline" className="px-8">
            Charger plus d'actualités
          </Button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
