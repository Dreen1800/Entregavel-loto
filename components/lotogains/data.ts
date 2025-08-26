import { Country, LocationData } from './types'

export const countries: Country[] = [
  { code: "fr", name: "France", flag: "https://flagcdn.com/w80/fr.png" },
  { code: "uk", name: "Royaume-Uni", flag: "https://flagcdn.com/w80/gb.png" },
  { code: "es", name: "Espagne", flag: "https://flagcdn.com/w80/es.png" },
  { code: "it", name: "Italie", flag: "https://flagcdn.com/w80/it.png" },
  { code: "de", name: "Allemagne", flag: "https://flagcdn.com/w80/de.png" },
  { code: "pt", name: "Portugal", flag: "https://flagcdn.com/w80/pt.png" },
  { code: "be", name: "Belgique", flag: "https://flagcdn.com/w80/be.png" },
  { code: "ca", name: "Canada", flag: "https://flagcdn.com/w80/ca.png" },
  { code: "ch", name: "Suisse", flag: "https://flagcdn.com/w80/ch.png" },
]

export const locationData: LocationData = {
  fr: {
    cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux"],
    lotteries: [
      {
        id: "loto",
        name: "Loto",
        min: 1,
        max: 49,
        count: 5,
        specialMin: 1,
        specialMax: 10,
        specialCount: 1,
        drawDay: 1,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Tabac 'La Chance', 15 Rue de Rivoli, Paris",
          "Bureau de tabac 'Le Jackpot', 32 La Canebière, Marseille",
          "Magasin 'Fortune', 5 Place Bellecour, Lyon",
          "Kiosque 'Gagnant', 22 Allée Jean Jaurès, Toulouse"
        ],
        links: [
          { name: "FDJ Loto", url: "https://www.fdj.fr/jeux/jeux-de-tirage/loto" },
          { name: "Loto Français", url: "https://www.loto.fr" }
        ],
      },
      {
        id: "euromillions",
        name: "EuroMillions",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 12,
        specialCount: 2,
        drawDay: 2,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Tabac 'Euro Dreams', 78 Avenue des Champs-Élysées, Paris",
          "Bureau de tabac 'Millionaire', 45 Rue Saint-Ferréol, Marseille",
          "Centre commercial 'Partouche', 112 Rue du Faubourg Saint-Antoine, Lyon",
          "Boutique 'La Fortune', 33 Rue Sainte-Catherine, Bordeaux"
        ],
        links: [
          { name: "FDJ EuroMillions", url: "https://www.fdj.fr/jeux/jeux-de-tirage/euromillions-my-million" },
          { name: "EuroMillions France", url: "https://www.euromillions.com/fr" }
        ],
      },
      {
        id: "keno",
        name: "Keno",
        min: 1,
        max: 70,
        count: 10,
        specialMin: 0,
        specialMax: 0,
        specialCount: 0,
        drawDay: 0,
        drawHour: 13,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Tabac 'Keno King', 56 Boulevard Haussmann, Paris",
          "Bar 'Le Keno', 12 Cours Honoré d'Estienne d'Orves, Marseille",
          "Café 'Keno Chance', 8 Rue de la République, Lyon"
        ],
        links: [
          { name: "FDJ Keno", url: "https://www.fdj.fr/jeux/jeux-de-tirage/keno" },
          { name: "Keno en ligne", url: "https://www.keno-fdj.fr" }
        ],
      },
      {
        id: "eurojackpot",
        name: "EuroJackpot",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 10,
        specialCount: 2,
        drawDay: 6,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Tabac 'EuroJackpot', 101 Rue de Rivoli, Paris",
          "Bureau de tabac 'Jackpot City', 28 Rue Paradis, Marseille",
          "Centre commercial 'Euro Plaza', 15 Rue de la République, Lyon"
        ],
        links: [
          { name: "EuroJackpot FDJ", url: "https://www.fdj.fr/jeux/jeux-de-tirage/eurojackpot" },
          { name: "EuroJackpot France", url: "https://www.eurojackpot.fr" }
        ],
      }
    ],
  },
  uk: {
    cities: ["Londres", "Manchester", "Birmingham", "Liverpool", "Édimbourg", "Leeds", "Glasgow", "Bristol"],
    lotteries: [
      {
        id: "uk-national",
        name: "UK National Lottery",
        min: 1,
        max: 59,
        count: 6,
        specialMin: 1,
        specialMax: 59,
        specialCount: 1,
        drawDay: 3,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Bureau de tabac 'Golden Chance', 123 Oxford Street, Londres",
          "Supérette 'Lucky Star', 45 Market Street, Manchester",
          "Magasin 'Fortune', 78 High Street, Birmingham",
          "Kiosque 'Jackpot', 22 Buchanan Street, Glasgow"
        ],
        links: [
          { name: "National Lottery", url: "https://www.national-lottery.co.uk" },
          { name: "Lotto UK", url: "https://www.lotto.uk.com" }
        ],
      },
      {
        id: "euromillions",
        name: "EuroMillions",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 12,
        specialCount: 2,
        drawDay: 2,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Bureau de tabac 'Euro Dreams', 56 Victoria Road, Londres",
          "Supérette 'Millionaire', 22 King Street, Édimbourg",
          "Centre commercial 'Chance Tower', Liverpool One, Liverpool",
          "Boutique 'Lucky Dip', 33 Park Row, Leeds"
        ],
        links: [
          { name: "EuroMillions UK", url: "https://www.euro-millions.com" },
          { name: "LottoGo", url: "https://www.lottogo.com/euromillions" }
        ],
      },
      {
        id: "thunderball",
        name: "Thunderball",
        min: 1,
        max: 39,
        count: 5,
        specialMin: 1,
        specialMax: 14,
        specialCount: 1,
        drawDay: 4,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Tabac 'Thunder Strike', 78 Regent Street, Londres",
          "Supérette 'Lightning Luck', 15 Deansgate, Manchester",
          "Magasin 'Storm Chaser', 42 Broad Street, Birmingham"
        ],
        links: [
          { name: "Thunderball Official", url: "https://www.national-lottery.co.uk/games/thunderball" },
          { name: "Play Thunderball", url: "https://www.lotto.net/thunderball" }
        ],
      },
      {
        id: "eurojackpot",
        name: "EuroJackpot",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 10,
        specialCount: 2,
        drawDay: 6,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Bureau de tabac 'EuroJackpot', 89 Piccadilly, Londres",
          "Supérette 'Jackpot Dreams', 34 Princes Street, Édimbourg",
          "Centre commercial 'Euro Plaza', 67 New Street, Birmingham"
        ],
        links: [
          { name: "EuroJackpot UK", url: "https://www.eurojackpot.org" },
          { name: "Play EuroJackpot", url: "https://www.lotto.co.uk/eurojackpot" }
        ],
      }
    ],
  },
  es: {
    cities: ["Madrid", "Barcelone", "Valence", "Séville", "Bilbao", "Malaga", "Saragosse", "Palma"],
    lotteries: [
      {
        id: "euromillions",
        name: "EuroMillions",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 12,
        specialCount: 2,
        drawDay: 2,
        drawHour: 21,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Estanco 'Suerte', 45 Gran Vía, Madrid",
          "Quiosco 'Millonario', 22 Rambla, Barcelone",
          "Centro commercial 'Fortuna', Avenida del Puerto, Valence",
          "Tienda 'El Gordo', 15 Calle Sierpes, Séville"
        ],
        links: [
          { name: "EuroMillions España", url: "https://www.loteriasyapuestas.es/es/euromillones" },
          { name: "Jugar EuroMillions", url: "https://www.euromillones.com" }
        ],
      },
      {
        id: "bonoloto",
        name: "BonoLoto",
        min: 1,
        max: 49,
        count: 6,
        specialMin: 0,
        specialMax: 0,
        specialCount: 0,
        drawDay: 0,
        drawHour: 21,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Estanco 'La Suerte', 78 Paseo de Gracia, Barcelone",
          "Quiosco 'El Gordo', 33 Calle Sierpes, Séville",
          "Centro commercial 'Loteria', Calle Luchana, Bilbao",
          "Tienda 'Bono Chance', 12 Calle Marqués de Larios, Malaga"
        ],
        links: [
          { name: "BonoLoto Oficial", url: "https://www.loteriasyapuestas.es/es/bonoloto" },
          { name: "Jugar BonoLoto", url: "https://www.bonoloto.com" }
        ],
      }
    ],
  },
  it: {
    cities: ["Rome", "Milan", "Naples", "Turin", "Palerme", "Gênes", "Bologne", "Florence"],
    lotteries: [
      {
        id: "superenalotto",
        name: "SuperEnalotto",
        min: 1,
        max: 90,
        count: 6,
        specialMin: 0,
        specialMax: 0,
        specialCount: 0,
        drawDay: 3,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Tabaccheria 'Fortuna', 45 Via del Corso, Rome",
          "Edicola 'SuperVincita', 22 Galleria Vittorio Emanuele II, Milan",
          "Bar 'Il SuperEnalotto', 15 Spaccanapoli, Naples",
          "Tabaccheria 'La Sorte', 33 Via Roma, Turin"
        ],
        links: [
          { name: "SuperEnalotto Ufficiale", url: "https://www.superenalotto.it" },
          { name: "Gioca SuperEnalotto", url: "https://www.giocosuperenalotto.com" }
        ],
      }
    ],
  },
  de: {
    cities: ["Berlin", "Munich", "Francfort", "Hambourg", "Cologne", "Stuttgart", "Düsseldorf", "Dortmund"],
    lotteries: [
      {
        id: "lotto-de",
        name: "Lotto 6aus49",
        min: 1,
        max: 49,
        count: 6,
        specialMin: 0,
        specialMax: 0,
        specialCount: 0,
        drawDay: 4,
        drawHour: 18,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Kiosk 'Glückspilz', 45 Kurfürstendamm, Berlin",
          "Tabakladen 'LottoKönig', 22 Marienplatz, Munich",
          "Kiosk 'Sechser im Lotto', 15 Zeil, Francfort",
          "Tabakladen 'Jackpot', 33 Schildergasse, Cologne"
        ],
        links: [
          { name: "Lotto Deutschland", url: "https://www.lotto.de" },
          { name: "Lotto 6aus49", url: "https://www.lotto6aus49.de" }
        ],
      }
    ],
  },
  pt: {
    cities: ["Lisbonne", "Porto", "Braga", "Setúbal", "Coimbra", "Faro", "Aveiro", "Viseu"],
    lotteries: [
      {
        id: "euromillions",
        name: "EuroMillions",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 12,
        specialCount: 2,
        drawDay: 2,
        drawHour: 21,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Quiosque 'Sorte', 45 Avenida da Liberdade, Lisbonne",
          "Tabacaria 'Milionário', 22 Rua de Santa Catarina, Porto",
          "Quiosque 'Fortuna', 15 Rua do Comércio, Braga",
          "Tabacaria 'EuroSonho', 33 Avenida 22 de Dezembro, Setúbal"
        ],
        links: [
          { name: "EuroMillions Portugal", url: "https://www.jogossantacasa.pt/web/euromillions" },
          { name: "Jogar EuroMillions", url: "https://www.euromilhoes.pt" }
        ],
      }
    ],
  },
  be: {
    cities: ["Bruxelles", "Anvers", "Gand", "Charleroi", "Liège", "Bruges", "Namur", "Louvain"],
    lotteries: [
      {
        id: "euromillions",
        name: "EuroMillions",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 12,
        specialCount: 2,
        drawDay: 2,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Bureau de tabac 'La Chance Belge', 45 Grand-Place, Bruxelles",
          "Tabac 'EuroDreams', 22 Meir, Anvers",
          "Magasin 'Fortuna', 15 Veldstraat, Gand",
          "Kiosque 'Jackpot', 33 Boulevard Tirou, Charleroi"
        ],
        links: [
          { name: "Loterie Nationale", url: "https://www.loterie-nationale.be" },
          { name: "EuroMillions Belgique", url: "https://www.euromillions.be" }
        ],
      }
    ],
  },
  ca: {
    cities: ["Toronto", "Montréal", "Vancouver", "Calgary", "Ottawa", "Edmonton", "Québec", "Winnipeg"],
    lotteries: [
      {
        id: "lotto-max",
        name: "Lotto Max",
        min: 1,
        max: 50,
        count: 7,
        specialMin: 0,
        specialMax: 0,
        specialCount: 0,
        drawDay: 3,
        drawHour: 22,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Dépanneur 'Lucky Leaf', 45 Yonge Street, Toronto",
          "Bureau de tabac 'Maple Chance', 22 Rue Sainte-Catherine, Montréal",
          "Magasin 'Golden Puck', 15 Robson Street, Vancouver",
          "Kiosque 'Hockey Luck', 33 8th Avenue SW, Calgary"
        ],
        links: [
          { name: "Lotto Max Officiel", url: "https://www.olg.ca/en/lottery/play-lotto-max.html" },
          { name: "Lotto Max Canada", url: "https://www.lottomax.ca" }
        ],
      }
    ],
  },
  ch: {
    cities: ["Zurich", "Genève", "Bâle", "Lausanne", "Berne", "Winterthour", "Lucerne", "Saint-Gall"],
    lotteries: [
      {
        id: "euromillions",
        name: "EuroMillions",
        min: 1,
        max: 50,
        count: 5,
        specialMin: 1,
        specialMax: 12,
        specialCount: 2,
        drawDay: 2,
        drawHour: 20,
        logo: "/lottery-balls-lime-green.png",
        addresses: [
          "Kiosque 'Swiss Luck', 45 Bahnhofstrasse, Zurich",
          "Tabac 'Geneva Fortune', 22 Rue du Rhône, Genève",
          "Magasin 'Basel Chance', 15 Freie Strasse, Bâle",
          "Bureau de tabac 'Lausanne Gagnant', 33 Rue de Bourg, Lausanne"
        ],
        links: [
          { name: "Loterie Suisse", url: "https://www.swisslos.ch" },
          { name: "EuroMillions Suisse", url: "https://www.euromillions.ch" }
        ],
      }
    ],
  },
}

export const lotteryPrizes: { [key: string]: string } = {
  loto: "€7,500,000",
  euromillions: "€187,000,000",
  "uk-national": "£18,700,000",
  thunderball: "£500,000",
  keno: "€250,000",
  bonoloto: "€3,200,000",
  primitiva: "€5,800,000",
  superenalotto: "€135,000,000",
  winforlife: "€4,000/mois à vie",
  "lotto-de": "€14,500,000",
  spiel77: "€777,777",
  totoloto: "€4,800,000",
  joker: "€1,500,000",
  eurojackpot: "€110,000,000",
  "lotto-be": "€5,000,000",
  "lotto-max": "CA$70,000,000",
  "swiss-lotto": "CHF8,500,000",
}
