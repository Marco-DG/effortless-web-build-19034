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

export const getTemplateDefaults = (templateStyle: string): TemplateDefaults => {
  switch (templateStyle) {
    case 'michelin_star':
      return MICHELIN_STAR_DEFAULTS;
    case 'wine_bar':
    default:
      return WINE_BAR_DEFAULTS;
  }
};