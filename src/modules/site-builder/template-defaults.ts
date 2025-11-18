// Template-specific default data
export interface TemplateDefaults {
  business?: {
    name?: string;
    tagline?: string;
    description?: string;
  };
  hero?: {
    images?: string[];
    carousel_speed?: number;
    parallax_intensity?: number;
  };
  story?: {
    section_title?: string;
    chef_name?: string;
    story_text?: string;
    chef_image?: string;
  };
  awards?: {
    show_awards?: boolean;
    awards_list?: Array<{
      name: string;
      year: string;
      score?: string;
      category?: string;
    }>;
  };
  menu?: {
    menu_sections?: Array<{
      name: string;
      price: string;
      description: string;
      items: string[];
    }>;
    menu_note?: string;
  };
  gallery?: {
    gallery_images?: string[];
    gallery_layout?: string;
  };
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
    reservation_url?: string;
    social_links?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  reviews?: {
    testimonials?: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      rating: number;
      source: string;
    }>;
  };
  events?: {
    events?: Array<{
      id: string;
      title: string;
      description: string;
      date: string;
      time: string;
      price: string;
      capacity: string;
      type: string;
    }>;
  };
  newsletter?: {
    title?: string;
    description?: string;
    benefits?: string[];
  };
  hours?: {
    schedule?: {
      [key: string]: {
        lunch_start?: string;
        lunch_end?: string;
        dinner_start?: string;
        dinner_end?: string;
        closed?: boolean;
      };
    };
  };
  location?: {
    address?: string;
    city?: string;
    zipCode?: string;
    directions?: string;
  };
}

export const WINE_BAR_DEFAULTS: TemplateDefaults = {
  business: {
    name: 'Nuovo Progetto',
    tagline: '',
    description: ''
  },
  hero: {
    images: [],
    carousel_speed: 5,
    parallax_intensity: 20
  },
  // Altri defaults per wine bar...
};

export const MICHELIN_STAR_DEFAULTS: TemplateDefaults = {
  business: {
    name: 'Le Petit Étoile',
    tagline: 'Deux étoiles Michelin • Paris',
    description: 'Une expérience culinaire transcendante où chaque plat raconte une histoire'
  },
  hero: {
    images: [
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop'
    ],
    carousel_speed: 5,
    parallax_intensity: 20
  },
  story: {
    section_title: 'Notre Vision',
    chef_name: 'Chef étoilé Alexandre Dubois',
    story_text: 'Depuis quinze ans, nous cultivons l\'art de la haute gastronomie française avec une approche contemporaine qui respecte les traditions tout en embrassant l\'innovation.',
    chef_image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop'
  },
  awards: {
    show_awards: true,
    awards_list: [
      {
        name: 'Deux étoiles Michelin',
        year: '2019-2024',
        category: 'michelin'
      },
      {
        name: 'Gault & Millau',
        score: '18/20',
        year: '2024',
        category: 'guide'
      },
      {
        name: 'La Liste',
        year: '2024',
        score: 'Top 100 Mondial',
        category: 'ranking'
      },
      {
        name: 'James Beard Award',
        year: '2023',
        category: 'Outstanding Chef'
      }
    ]
  },
  menu: {
    menu_sections: [
      {
        name: 'Menu Dégustation',
        price: '€285',
        description: 'Sept services d\'exception avec accord mets et vins',
        items: [
          'Amuse-bouche • Huître Gillardeau, caviar Ossetra',
          'Entrée • Foie gras poêlé, figues confites au porto',
          'Poisson • Turbot sauvage, beurre blanc aux algues',
          'Viande • Côte de bœuf Wagyu, jus au thym',
          'Fromage • Sélection Laurent Dubois',
          'Pré-dessert • Sorbet au champagne rosé',
          'Dessert • Soufflé Grand Marnier, glace vanille'
        ]
      },
      {
        name: 'Menu Végétarien',
        price: '€225',
        description: 'Cinq services créatifs de légumes de saison',
        items: [
          'Betterave • Trois textures, chèvre de la Drôme',
          'Champignon • Cèpes, truffe noire du Périgord',
          'Légume racine • Topinambour, noisettes torréfiées',
          'Fromage • Comté 36 mois d\'affinage',
          'Dessert • Poire William, chocolat Valrhona'
        ]
      }
    ],
    menu_note: 'Allergies et intolérances ? Informez-nous, nous nous adapterons.'
  },
  gallery: {
    gallery_images: [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563379091339-03246963d258?q=80&w=2070&auto=format&fit=crop'
    ],
    gallery_layout: 'masonry'
  },
  contact: {
    address: '15 Rue Saint-Honoré, 75001 Paris',
    phone: '+33 1 42 96 59 04',
    email: 'reservation@lepetitetoile.fr',
    reservation_url: 'https://www.lepetitetoile.fr/reservations',
    social_links: {
      instagram: 'https://instagram.com/lepetitetoile_paris',
      facebook: 'https://facebook.com/lepetitetoile.officiel',
      twitter: 'https://twitter.com/lepetitetoile'
    }
  },
  reviews: {
    testimonials: [
      {
        id: '1',
        name: 'Sophie Laurent',
        role: 'Food Critic - Le Figaro',
        content: 'Une expérience gastronomique absolument transcendante. Chaque bouchée révèle la maîtrise technique et la créativité sans bornes du chef.',
        rating: 5,
        source: 'Le Figaro'
      },
      {
        id: '2',
        name: 'Marco Benedetti',
        role: 'Michelin Inspector',
        content: 'La précision de l\'exécution et l\'équilibre parfait des saveurs justifient pleinement les deux étoiles. Un incontournable de la gastronomie parisienne.',
        rating: 5,
        source: 'Guide Michelin'
      },
      {
        id: '3',
        name: 'Catherine Dubois',
        role: 'Cliente habituelle',
        content: 'Depuis des années, ce restaurant continue de nous surprendre. Le service impeccable et l\'ambiance raffinée complètent une cuisine d\'exception.',
        rating: 5,
        source: 'Google Reviews'
      }
    ]
  },
  events: {
    events: [
      {
        id: '1',
        title: 'Dîner aux Truffes d\'Alba',
        description: 'Soirée exceptionnelle dédiée au joyau de l\'automne piémontais. Menu spécialement conçu autour de la truffe blanche d\'Alba avec accord mets et vins prestigieux.',
        date: '15 Novembre 2024',
        time: '19:30',
        price: '€395',
        capacity: '16',
        type: 'Degustazione'
      },
      {
        id: '2',
        title: 'Masterclass avec le Chef',
        description: 'Découvrez les secrets de notre cuisine étoilée lors d\'une démonstration exclusive suivie d\'une dégustation commentée.',
        date: '22 Novembre 2024',
        time: '15:00',
        price: '€195',
        capacity: '12',
        type: 'Masterclass'
      }
    ]
  },
  newsletter: {
    title: 'Club des Gourmets',
    description: 'Rejoignez notre cercle exclusif d\'amateurs de haute gastronomie. Recevez en avant-première nos invitations aux événements spéciaux, nos nouveaux menus et nos collaborations exceptionnelles.',
    benefits: [
      'Réservations prioritaires pour tous nos événements',
      'Accès exclusif aux nouveaux menus avant leur lancement public',
      'Invitations aux dégustations privées avec le chef',
      'Remises sur les accords mets et vins premium',
      'Newsletter mensile avec recettes et conseils du chef'
    ]
  },
  hours: {
    schedule: {
      tuesday: {
        lunch_start: '12:00',
        lunch_end: '14:00',
        dinner_start: '19:30',
        dinner_end: '22:00',
        closed: false
      },
      wednesday: {
        lunch_start: '12:00',
        lunch_end: '14:00',
        dinner_start: '19:30',
        dinner_end: '22:00',
        closed: false
      },
      thursday: {
        lunch_start: '12:00',
        lunch_end: '14:00',
        dinner_start: '19:30',
        dinner_end: '22:00',
        closed: false
      },
      friday: {
        lunch_start: '12:00',
        lunch_end: '14:00',
        dinner_start: '19:30',
        dinner_end: '22:30',
        closed: false
      },
      saturday: {
        dinner_start: '19:30',
        dinner_end: '22:30',
        closed: false
      },
      sunday: {
        closed: true
      },
      monday: {
        closed: true
      }
    }
  },
  location: {
    address: '15 Rue Saint-Honoré',
    city: 'Paris',
    zipCode: '75001',
    directions: 'Facilement accessible en métro (lignes 1, 7, 14 - station Châtelet). Parking public Place Vendôme à 300m. Service voiturier disponible sur réservation.'
  }
};

// 🏛️ AEGEAN PEARL - DEFAULTS AUTENTICI GRECI 🏛️
export const AEGEAN_PEARL_DEFAULTS: TemplateDefaults = {
  business: {
    name: 'ΚΟΣΤΑΣ Family Restaurant',
    tagline: 'Στην αγκαλιά του Αιγαίου • Dal 1924',
    description: 'Quattro generazioni di tradizione culinaria greca nel cuore di Mykonos'
  },
  hero: {
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop', // Mykonos iconic view
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2070&auto=format&fit=crop', // Aegean sunrise
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop'  // Greek taverna
    ],
    carousel_speed: 7,
    parallax_intensity: 15
  },
  story: {
    section_title: 'ΟΙΚΟΓΕΝΕΙΑΚΗ ΙΣΤΟΡΙΑ',
    chef_name: 'Dimitris Kostas - Quarta Generazione',
    story_text: 'La nostra famiglia serve i sapori autentici dell\'Egeo dal 1924. Quello che iniziò come una piccola taverna sul porto di Mykonos, è diventato il custode delle ricette tradizionali delle Cicladi. Ogni piatto racconta la storia di quattro generazioni, dal pescatore Yannis a mio padre Nikos, fino a me che oggi porto avanti questa eredità con orgoglio e rispetto per le nostre radici.',
    chef_image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=600&auto=format&fit=crop'
  },
  awards: {
    show_awards: true,
    awards_list: [
      {
        name: 'Miglior Taverna Tradizionale',
        year: '2024',
        category: 'Tourism Awards Greece'
      },
      {
        name: 'Autentica Cucina Cicladica',
        score: 'Certificato DOP',
        year: '2023',
        category: 'Greek Gastronomy Guide'
      },
      {
        name: 'Travellers\' Choice',
        year: '2022-2024',
        score: 'Top 10 Mykonos',
        category: 'TripAdvisor'
      },
      {
        name: 'Slow Food Presídium',
        year: '2021',
        category: 'Tradizioni Culinar ie Greche'
      }
    ]
  },
  menu: {
    menu_sections: [
      {
        name: 'MEZZE TRADIZIONALI',
        price: '€12-19',
        description: 'Le ricette di nonna Maria dalle isole delle Cicladi',
        items: [
          'Dolmades Γιαγιάς • Foglie di vite di Santorini, riso alle erbe selvatiche',
          'Feta Νάξου PDO • Formaggio di capra 18 mesi, miele di timo, olive Kalamata',
          'Taramosalata Αυθεντική • Uova di carpa del Mar Nero, limoni di Sifnos',
          'Tzatziki Κρεμώδες • Yogurt di pecora, cetrioli di Tinos, aneto fresco',
          'Saganaki Φλαμπέ • Kasseri di Metsovo, flambé con ouzo di Mykonos'
        ]
      },
      {
        name: 'DAL MARE DELL\'EGEO',
        price: '€28-52',
        description: 'Pescato quotidianamente dalle nostre barche',
        items: [
          'Psari Αλάτι Μήλου • Branzino in crosta di sale rosa di Milos',
          'Chtapodi Σχάρας • Polpo dell\'Egeo alla griglia, fava di Santorini',
          'Kakavia Ψαρόσουπα • Zuppa del pescatore, 7 pesci dell\'Egeo',
          'Astakos Mykonos • Aragosta locale, grigliata con limone e origano',
          'Barbounia Ταβέρνας • Triglie rosse dell\'Egeo, alla griglia'
        ]
      },
      {
        name: 'DALLA TERRA DELLE CICLADI',
        price: '€22-48',
        description: 'Carni e verdure delle isole greche',
        items: [
          'Arni Μυκονιάτικο • Agnello di Mykonos alle erbe, patate di Naxos',
          'Kokoras Κρασάτο • Gallo alle erbe, vino di Santorini, hilopites',
          'Gemista Νηστήσιμα • Pomodori e peperoni ripieni, riso alle erbe',
          'Moussaka Παραδοσιακή • La ricetta di famiglia dal 1924'
        ]
      }
    ],
    menu_note: 'Tutti i nostri ingredienti provengono dalle isole Cicladi. Allergeni e intolleranze: informaci, adatteremo ogni piatto.'
  },
  gallery: {
    gallery_images: [
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop'
    ],
    gallery_layout: 'masonry'
  },
  contact: {
    address: 'Porto Vecchio di Mykonos, Chora 84600',
    phone: '+30 22890 24578',
    email: 'taverna@kostasrestaurant.gr',
    reservation_url: 'https://www.kostasrestaurant.gr/prenotazioni',
    social_links: {
      instagram: 'https://instagram.com/kostas_mykonos_taverna',
      facebook: 'https://facebook.com/kostasrestaurant.mykonos',
      twitter: 'https://twitter.com/kostasmykonos'
    }
  },
  reviews: {
    testimonials: [
      {
        id: '1',
        name: 'Maria Papadopoulos',
        role: 'Food Blogger - Athens Eats',
        content: 'Finalmente ho trovato l\'anima autentica di Mykonos! Da Kostas si respira ancora la Grecia di una volta, quella delle nonne e delle ricette tramandate. Il polpo alla griglia è una poesia, la feta di Naxos un sogno.',
        rating: 5,
        source: 'Athens Eats'
      },
      {
        id: '2',
        name: 'Alessandro Rossi',
        role: 'Guida Michelin Inspector',
        content: 'Quattro generazioni di tradizione che si sentono in ogni boccone. L\'agnello di Mykonos alle erbe selvatiche è un\'esperienza che va oltre il cibo: è pura autenticità greca.',
        rating: 5,
        source: 'Guida Michelin'
      },
      {
        id: '3',
        name: 'Despina Andreadis',
        role: 'Critica Gastronomica - Kathimerini',
        content: 'Στο Κωστα δεν τρώμε μόνο φαγητό, ζούμε παράδοση. Da Kostas non mangiamo solo cibo, viviamo la tradizione. Un\'oasi di autenticità nel cuore turistico di Mykonos.',
        rating: 5,
        source: 'Kathimerini'
      }
    ]
  },
  events: {
    events: [
      {
        id: '1',
        title: 'Πανηγύρι Αγίας Παρασκευής',
        description: 'Festa tradizionale greca con musica dal vivo, danze popolari e piatti della tradizione. Come una volta nelle piazze dei paesi. Sarà presente il gruppo folk "Αιγαίο Μέλος" direttamente da Naxos.',
        date: '26 Luglio 2024',
        time: '20:30',
        price: '€45 tutto incluso',
        capacity: '50',
        type: 'Festa Tradizionale'
      },
      {
        id: '2',
        title: 'Μαγειρικό Μάθημα με τη Γιαγιά',
        description: 'Lezione di cucina con nonna Eleni (92 anni!). Impara a preparare i dolmades originali e la vera moussaka. Include degustazione e ricette scritte a mano.',
        date: '15 Agosto 2024',
        time: '16:00',
        price: '€85 persona',
        capacity: '12',
        type: 'Cooking Class'
      },
      {
        id: '3',
        title: 'Ψαρονύχτα στο Λιμάνι',
        description: 'Notte di pesce fresco appena pescato. Accompagnati al porto alle 5 del mattino per vedere il rientro delle barche, poi colazione del pescatore in taverna.',
        date: 'Ogni Sabato',
        time: '05:00',
        price: '€35',
        capacity: '20',
        type: 'Esperienza Marina'
      }
    ]
  },
  newsletter: {
    title: 'Φίλοι της Παράδοσης',
    description: 'Unisciti alla famiglia di Kostas! Ricevi le nostre newsletter con ricette tradizionali, foto delle nostre giornate in taverna e inviti agli eventi speciali delle isole.',
    benefits: [
      'Ricette di famiglia tradizionali ogni mese',
      'Priorità per prenotazioni durante alta stagione',
      'Inviti esclusivi agli eventi della tradizione greca',
      'Sconti del 15% durante feste tradizionali',
      'Accesso al nostro orto per raccogliere erbe aromati che'
    ]
  },
  hours: {
    schedule: {
      monday: {
        lunch_start: '12:30',
        lunch_end: '15:30',
        dinner_start: '18:30',
        dinner_end: '24:00',
        closed: false
      },
      tuesday: {
        lunch_start: '12:30',
        lunch_end: '15:30',
        dinner_start: '18:30',
        dinner_end: '24:00',
        closed: false
      },
      wednesday: {
        lunch_start: '12:30',
        lunch_end: '15:30',
        dinner_start: '18:30',
        dinner_end: '24:00',
        closed: false
      },
      thursday: {
        lunch_start: '12:30',
        lunch_end: '15:30',
        dinner_start: '18:30',
        dinner_end: '24:00',
        closed: false
      },
      friday: {
        lunch_start: '12:30',
        lunch_end: '15:30',
        dinner_start: '18:30',
        dinner_end: '01:00',
        closed: false
      },
      saturday: {
        lunch_start: '12:30',
        lunch_end: '15:30',
        dinner_start: '18:30',
        dinner_end: '01:00',
        closed: false
      },
      sunday: {
        lunch_start: '12:30',
        lunch_end: '15:30',
        dinner_start: '18:30',
        dinner_end: '24:00',
        closed: false
      }
    }
  },
  location: {
    address: 'Porto Vecchio, Chora',
    city: 'Mykonos',
    zipCode: '84600',
    directions: 'Nel cuore del porto vecchio di Mykonos, a 2 minuti a piedi dai famosi mulini a vento. Cerca l\'insegna blu con il pellicano disegnato a mano - quello è il nostro segno dal 1924!'
  }
};

export const getTemplateDefaults = (templateStyle: string): TemplateDefaults => {
  switch (templateStyle) {
    case 'michelin_star':
      return MICHELIN_STAR_DEFAULTS;
    case 'aegean_pearl':
      return AEGEAN_PEARL_DEFAULTS; // 🏛️ AUTENTICI DEFAULTS GRECI!
    case 'wine_bar':
    default:
      return WINE_BAR_DEFAULTS;
  }
};