import { BuilderData } from "./InteractiveBuilder";

export const getDefaultData = (template: "trattoria" | "urban-bar" | "dolce-vita" | "craft-pub" = "trattoria"): BuilderData => {
  const baseData: BuilderData = {
    template,
    businessName: template === "trattoria" ? "La Trattoria" : template === "urban-bar" ? "Urban Bar" : template === "dolce-vita" ? "Dolce Vita Café" : "Craft Pub",
    businessType: template === "trattoria" ? "restaurant" : template === "urban-bar" ? "bar" : template === "dolce-vita" ? "cafe" : "pub",
    logoUrl: "",
    tagline: template === "trattoria" 
      ? "Sapori Autentici della Tradizione Italiana" 
      : template === "urban-bar"
      ? "Experience the Night"
      : template === "dolce-vita"
      ? "Il Tuo Momento di Dolcezza"
      : "Birre Artigianali. Vibes Autentiche.",
    heroSlogan: template === "trattoria" 
      ? "Sapori Autentici della Tradizione Italiana" 
      : template === "urban-bar"
      ? "Experience the Night"
      : template === "dolce-vita"
      ? "Il Tuo Momento di Dolcezza"
      : "Birre Artigianali. Vibes Autentiche.",
    heroDescription: template === "trattoria"
      ? "Dove ogni piatto racconta una storia"
      : template === "urban-bar"
      ? "Cocktails d'autore in un'atmosfera unica"
      : template === "dolce-vita"
      ? "Caffè artigianale e dolci fatti in casa"
      : "Dove la passione per la birra incontra la tradizione",
    menuItems: template === "trattoria" ? [
      {
        id: "1",
        name: "Pasta alla Carbonara",
        description: "Guanciale, uova, pecorino romano",
        price: "€12",
        category: "primi",
        badges: ["popolare"],
      },
      {
        id: "2",
        name: "Ossobuco alla Milanese",
        description: "Con risotto allo zafferano",
        price: "€18",
        category: "secondi",
      },
      {
        id: "3",
        name: "Tiramisù della Nonna",
        description: "Ricetta originale, fatto in casa",
        price: "€7",
        category: "dessert",
        badges: ["novità"],
      },
    ] : template === "urban-bar" ? [
      {
        id: "1",
        name: "Neon Martini",
        description: "Gin, vermouth dry, twist al pompelmo rosa",
        price: "€14",
        category: "cocktail",
        badges: ["popolare"],
      },
      {
        id: "2",
        name: "Dark Paradise",
        description: "Rum invecchiato, amaretto, sciroppo di vaniglia",
        price: "€16",
        category: "cocktail",
        badges: ["novità"],
      },
    ] : [],
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
    gallery: [],
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
    blogPosts: [],
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
  };

  return baseData;
};

