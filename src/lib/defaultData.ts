import { BuilderData, TemplateType } from "@/types/builder";

export const getDefaultData = (template: TemplateType = "wine-bar"): BuilderData => {
  const baseData: BuilderData = {
    template,
    businessName: template === "wine-bar" ? "Enoteca & Wine Bar" : template === "fine-dining" ? "Fine Dining" : "La Trattoria",
    businessType: template === "wine-bar" ? "restaurant" : template === "fine-dining" ? "restaurant" : "restaurant",
    logoUrl: "",
    logoMode: "image",
    logoText: "",
    logoFont: "",
    tagline: template === "wine-bar"
      ? "Vini d'autore. Atmosfera intima."
      : template === "fine-dining"
      ? "Cucina d'autore in ogni dettaglio"
      : "Sapori Autentici della Tradizione Italiana",
    heroSlogan: template === "wine-bar"
      ? "Wine, Food & Atmosphere"
      : template === "fine-dining"
      ? "Fine Dining Experience"
      : "Sapori Autentici della Tradizione Italiana",
    heroDescription: template === "wine-bar"
      ? "Un luogo dedicato al gusto, tra calici e piccoli piatti"
      : template === "fine-dining"
      ? "Un percorso culinario tra tecnica e materia prima"
      : "Dove ogni piatto racconta una storia",
    heroImageUrl: template === "wine-bar"
      ? "https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop"
      : template === "fine-dining"
      ? "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
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
      imageUrl:
        template === "wine-bar"
          ? "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop"
          : template === "fine-dining"
          ? "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      heading:
        template === "wine-bar"
          ? "La nostra enoteca"
          : template === "fine-dining"
          ? "La nostra storia"
          : "La nostra trattoria",
      text:
        template === "trattoria"
          ? "Da tre generazioni portiamo in tavola i sapori autentici della cucina italiana. Ogni ingrediente è selezionato con cura, ogni ricetta custodita gelosamente. Benvenuti nella nostra famiglia."
          : template === "fine-dining"
          ? "Un percorso culinario che unisce tecnica, materia prima e ricerca in un ambiente elegante."
          : "Selezione curata di etichette e piccoli produttori. Calore, intimità e piatti pensati per accompagnare il calice.",
    },
    newsletterEnabled: true,
    newsletterTitle: "Resta Aggiornato",
    newsletterDescription: "Iscriviti per ricevere novità, promozioni e menu stagionali",
    promoBanner: {
      enabled: true,
      title: template === "trattoria" 
        ? "Happy Hour: Aperitivo con vista 18:00-20:00"
        : template === "fine-dining"
        ? "Menu Degustazione: 7 portate stagionali"
        : "Happy Hour: Aperitivo con vista 18:00-20:00",
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
    fontFamily: "Inter",
    fontPrimary: "Inter",
    fontSecondary: "Playfair Display",
    singlePage: true,
  };

  return baseData;
};

