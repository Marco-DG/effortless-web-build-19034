import { BuilderData } from "./InteractiveBuilder";

export const getDefaultData = (template: "trattoria" | "urban-bar" | "dolce-vita" | "craft-pub" | "wine-bar" | "fine-dining" = "wine-bar"): BuilderData => {
  const baseData: BuilderData = {
    template,
    businessName: template === "trattoria" ? "La Trattoria" : template === "urban-bar" ? "Urban Bar" : template === "dolce-vita" ? "Dolce Vita Café" : template === "craft-pub" ? "Craft Pub" : template === "wine-bar" ? "Enoteca & Wine Bar" : "Fine Dining",
    businessType: template === "trattoria" ? "restaurant" : template === "urban-bar" ? "bar" : template === "dolce-vita" ? "cafe" : template === "craft-pub" ? "pub" : "restaurant",
    logoUrl: "",
    tagline: template === "trattoria" 
      ? "Sapori Autentici della Tradizione Italiana" 
      : template === "urban-bar"
      ? "Experience the Night"
      : template === "dolce-vita"
      ? "Il Tuo Momento di Dolcezza"
      : template === "craft-pub"
      ? "Birre Artigianali. Vibes Autentiche."
      : template === "wine-bar"
      ? "Vini d'autore. Atmosfera intima."
      : "Cucina d'autore in ogni dettaglio",
    heroSlogan: template === "trattoria" 
      ? "Sapori Autentici della Tradizione Italiana" 
      : template === "urban-bar"
      ? "Experience the Night"
      : template === "dolce-vita"
      ? "Il Tuo Momento di Dolcezza"
      : template === "craft-pub"
      ? "Birre Artigianali. Vibes Autentiche."
      : template === "wine-bar"
      ? "Wine, Food & Atmosphere"
      : "Fine Dining Experience",
    heroDescription: template === "trattoria"
      ? "Dove ogni piatto racconta una storia"
      : template === "urban-bar"
      ? "Cocktails d'autore in un'atmosfera unica"
      : template === "dolce-vita"
      ? "Caffè artigianale e dolci fatti in casa"
      : template === "craft-pub"
      ? "Dove la passione per la birra incontra la tradizione"
      : template === "wine-bar"
      ? "Un luogo dedicato al gusto, tra calici e piccoli piatti"
      : "Un percorso culinario tra tecnica e materia prima",
    menuItems: template === "trattoria" ? [
      {
        id: "1",
        name: "Pasta alla Carbonara",
        description: "Guanciale croccante, uova fresche, pecorino romano DOP",
        price: "€14",
        category: "primi",
        badges: ["popolare"],
        ingredients: ["Guanciale", "Uova", "Pecorino romano", "Pepe nero"],
      },
      {
        id: "2",
        name: "Ossobuco alla Milanese",
        description: "Con risotto allo zafferano e gremolada",
        price: "€22",
        category: "secondi",
        ingredients: ["Ossobuco", "Risotto", "Zafferano", "Gremolada"],
      },
      {
        id: "3",
        name: "Tiramisù della Nonna",
        description: "Ricetta originale tramandata, fatto in casa",
        price: "€8",
        category: "dessert",
        badges: ["novità"],
        ingredients: ["Mascarpone", "Caffè espresso", "Savoiardi", "Cacao"],
      },
      {
        id: "4",
        name: "Bruschetta al Pomodoro",
        description: "Pane tostato, pomodori San Marzano, basilico fresco, aglio",
        price: "€6",
        category: "antipasti",
        badges: ["vegetariano"],
        ingredients: ["Pane", "Pomodori", "Basilico", "Aglio", "Olio EVO"],
      },
      {
        id: "5",
        name: "Tagliatelle al Ragù",
        description: "Pasta fatta in casa con ragù di carne di manzo",
        price: "€15",
        category: "primi",
        ingredients: ["Tagliatelle", "Ragù di manzo", "Pomodoro", "Vino rosso"],
      },
    ] : template === "urban-bar" ? [
      {
        id: "1",
        name: "Neon Martini",
        description: "Gin premium, vermouth dry, twist al pompelmo rosa e ghiaccio",
        price: "€14",
        category: "cocktail",
        badges: ["popolare"],
        ingredients: ["Gin", "Vermouth dry", "Pompelmo rosa"],
      },
      {
        id: "2",
        name: "Dark Paradise",
        description: "Rum invecchiato 8 anni, amaretto, sciroppo di vaniglia, ghiaccio tritato",
        price: "€16",
        category: "cocktail",
        badges: ["novità"],
        ingredients: ["Rum", "Amaretto", "Sciroppo vaniglia"],
      },
      {
        id: "3",
        name: "Mojito Tropicale",
        description: "Rum bianco, menta fresca, lime, soda e frutto della passione",
        price: "€12",
        category: "cocktail",
        ingredients: ["Rum bianco", "Menta", "Lime", "Frutto della passione"],
      },
      {
        id: "4",
        name: "Old Fashioned",
        description: "Whiskey bourbon, zucchero, angostura, scorza d'arancia",
        price: "€15",
        category: "cocktail",
        badges: ["popolare"],
        ingredients: ["Bourbon", "Zucchero", "Angostura", "Arancia"],
      },
    ] : template === "dolce-vita" ? [
      {
        id: "1",
        name: "Cappuccino Classico",
        description: "Espresso con schiuma di latte vellutata e cacao",
        price: "€3.50",
        category: "bevande",
        badges: ["popolare"],
      },
      {
        id: "2",
        name: "Croissant Artigianale",
        description: "Sfogliato con burro di qualità, cotto al momento",
        price: "€2.50",
        category: "dessert",
      },
      {
        id: "3",
        name: "Cheesecake al Limone",
        description: "Base di biscotti, crema al mascarpone e limone di Sicilia",
        price: "€5.50",
        category: "dessert",
        badges: ["novità"],
      },
    ] : template === "craft-pub" ? [
      {
        id: "1",
        name: "IPA Americana",
        description: "Luppolata, fruttata, amara al punto giusto - 6.5% ABV",
        price: "€7",
        category: "birre",
        badges: ["popolare"],
      },
      {
        id: "2",
        name: "Stout Imperiale",
        description: "Scura, cremosa, note di caffè e cioccolato - 8% ABV",
        price: "€8",
        category: "birre",
      },
    ] : template === "wine-bar" ? [
      { id: "1", name: "Tagliere Selezione", description: "Salumi e formaggi DOP", price: "€18", category: "antipasti" },
      { id: "2", name: "Calice Riserva", description: "Rosso strutturato, 2018", price: "€12", category: "bevande" },
      { id: "3", name: "Tartare di Manzo", description: "Oliva taggiasca, senape antica", price: "€16", category: "secondi" },
    ] : [
      { id: "1", name: "Capesante Scottate", description: "Crema di topinambur, limone", price: "€24", category: "antipasti" },
      { id: "2", name: "Risotto allo Champagne", description: "Oro, midollo affumicato", price: "€28", category: "primi" },
      { id: "3", name: "Filetto di Manzo", description: "Glassa al vino, patate fondenti", price: "€36", category: "secondi" },
    ],
    events: [
      {
        id: "1",
        title: "Serata Live Jazz",
        description: "Musica dal vivo con la nostra band locale",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "21:00",
        location: "Sala principale",
      },
    ],
    gallery: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        type: "image",
        caption: "Atmosfera del locale",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        type: "image",
        caption: "Piatti del giorno",
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        type: "image",
        caption: "Team in cucina",
      },
    ],
    reviews: [
      {
        id: "1",
        name: "Marco R.",
        text: template === "trattoria"
          ? "La migliore carbonara che abbia mai mangiato! Atmosfera familiare e accogliente."
          : "Atmosfera incredibile e cocktail spettacolari!",
        rating: 5,
        date: "2 settimane fa",
      },
      {
        id: "2",
        name: "Sofia M.",
        text: template === "trattoria"
          ? "Ingredienti freschi e sapori autentici. Ci torniamo sempre con piacere!"
          : "I bartender sono veri artisti. Ogni drink è una scoperta unica.",
        rating: 5,
        date: "1 mese fa",
      },
    ],
    faqs: [
      {
        id: "1",
        question: "Fate consegne a domicilio?",
        answer: "Sì, consegniamo tramite Glovo, UberEats e Deliveroo. Visita la sezione contatti per i link.",
      },
      {
        id: "2",
        question: "Avete opzioni vegane?",
        answer: "Certamente! Abbiamo diverse opzioni vegane nel nostro menu. Controlla i badge sulle voci del menu.",
      },
    ],
    blogPosts: template === "trattoria" ? [
      {
        id: "1",
        title: "Il nostro nuovo menu autunnale",
        excerpt: "Scopri i piatti della stagione con ingredienti freschi e di stagione",
        content: "Questo autunno abbiamo preparato un menu speciale con prodotti locali...",
        date: new Date().toISOString().split("T")[0],
        category: "Novità",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      },
      {
        id: "2",
        title: "La storia della nostra famiglia",
        excerpt: "Tre generazioni di passione per la cucina italiana",
        content: "La nostra storia inizia nel 1950 quando...",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        category: "Storia",
      },
    ] : [],
    address: "Via Roma 1, Milano",
    phone: "+39 02 1234567",
    email: "info@esempio.it",
    openingHours: {
      monday: { open: "12:00", close: "23:00", closed: false },
      tuesday: { open: "12:00", close: "23:00", closed: false },
      wednesday: { open: "12:00", close: "23:00", closed: false },
      thursday: { open: "12:00", close: "23:00", closed: false },
      friday: { open: "12:00", close: "23:00", closed: false },
      saturday: { open: "12:00", close: "23:00", closed: false },
      sunday: { open: "12:00", close: "23:00", closed: false },
    },
    socialLinks: {
      facebook: "",
      instagram: "",
      tripadvisor: "",
    },
    about: {
      story: template === "trattoria"
        ? "Da tre generazioni portiamo in tavola i sapori autentici della cucina italiana. Ogni ingrediente è selezionato con cura, ogni ricetta custodita gelosamente. Benvenuti nella nostra famiglia."
        : "Nel cuore della città, dove il design incontra la mixology d'eccellenza.",
      philosophy: template === "trattoria"
        ? "Crediamo nell'importanza degli ingredienti freschi e della tradizione. Ogni piatto racconta una storia di passione e dedizione."
        : "Ogni cocktail è un'opera d'arte, ogni serata un'esperienza indimenticabile.",
      values: [
        {
          title: template === "trattoria" ? "Ingredienti Freschi" : "Cocktail Signature",
          description: template === "trattoria" ? "Dal produttore alla tavola" : "Creazioni esclusive dei nostri bartender",
          icon: template === "trattoria" ? "🌾" : "🍹",
        },
        {
          title: template === "trattoria" ? "Ricette Tradizionali" : "Live DJ Set",
          description: template === "trattoria" ? "Tramandate di generazione" : "Ogni weekend musica dal vivo",
          icon: template === "trattoria" ? "👨‍🍳" : "🎵",
        },
        {
          title: template === "trattoria" ? "Passione" : "Design Unico",
          description: template === "trattoria" ? "In ogni piatto che serviamo" : "Ambiente moderno e ricercato",
          icon: template === "trattoria" ? "❤️" : "✨",
        },
      ],
    },
    newsletterEnabled: true,
    newsletterTitle: "Resta Aggiornato",
    newsletterDescription: "Iscriviti per ricevere novità, promozioni e menu stagionali",
    promoBanner: {
      enabled: true,
      title: template === "trattoria" 
        ? "Happy Hour: Aperitivo con vista 18:00-20:00"
        : template === "urban-bar"
        ? "Serata Speciale: DJ Set ogni Venerdì"
        : template === "dolce-vita"
        ? "Menu del Giorno: Piatti freschi ogni giorno"
        : "Birra del Mese: Sconto 20%",
      description: "Vieni a trovarci per scoprire le nostre offerte speciali",
      link: "#menu",
    },
    cookieBannerEnabled: true,
    deliveryLinks: {
      glovo: "https://glovoapp.com",
      uberEats: "https://ubereats.com",
      deliveroo: "https://deliveroo.it",
    },
    reservationLink: "https://thefork.it",
    sectionsOrder: ["hero","about","menu","gallery","newsletter","contact"],
    sectionsEnabled: { hero: true, about: true, menu: true, gallery: true, newsletter: true, contact: true },
  };

  return baseData;
};

