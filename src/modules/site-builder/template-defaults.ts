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