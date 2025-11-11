// Font premium per design award-winning
// Organizzati per categoria di ristorante e stile

export interface PremiumFont {
  family: string;
  name: string;
  category: 'luxury' | 'modern' | 'vintage' | 'artisanal' | 'experimental';
  cuisine: ('fine-dining' | 'casual' | 'wine-bar' | 'coffee' | 'steakhouse' | 'molecular' | 'japanese')[];
  weights: string[];
  description: string;
  preview: string;
  isPremium: boolean;
  googleFont?: boolean;
  rarity: 'common' | 'rare' | 'legendary';
}

export const PREMIUM_FONTS: PremiumFont[] = [
  // === LUXURY FINE DINING ===
  {
    family: 'Playfair Display',
    name: 'Playfair Display',
    category: 'luxury',
    cuisine: ['fine-dining', 'wine-bar'],
    weights: ['300', '400', '500', '600', '700', '800', '900'],
    description: 'Font serif ultra-elegante, perfetto per ristoranti stellati',
    preview: 'Eleganza Suprema',
    isPremium: true,
    googleFont: true,
    rarity: 'legendary'
  },
  {
    family: 'Cormorant Garamond',
    name: 'Cormorant Garamond',
    category: 'luxury',
    cuisine: ['fine-dining', 'wine-bar'],
    weights: ['300', '400', '500', '600', '700'],
    description: 'Serif classico con un tocco contemporaneo, ideale per alta cucina',
    preview: 'Raffinatezza Assoluta',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },
  {
    family: 'Cinzel',
    name: 'Cinzel Imperial',
    category: 'luxury',
    cuisine: ['fine-dining', 'wine-bar'],
    weights: ['400', '500', '600'],
    description: 'Ispirato alle iscrizioni romane, maestosità pura',
    preview: 'IMPERIUM',
    isPremium: true,
    googleFont: true,
    rarity: 'legendary'
  },

  // === MODERN MINIMALIST ===
  {
    family: 'Inter',
    name: 'Inter Variable',
    category: 'modern',
    cuisine: ['casual', 'molecular', 'coffee'],
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    description: 'Sans-serif perfetto per design contemporanei e minimal',
    preview: 'Modernità Pura',
    isPremium: false,
    googleFont: true,
    rarity: 'common'
  },
  {
    family: 'Poppins',
    name: 'Poppins Premium',
    category: 'modern',
    cuisine: ['casual', 'coffee'],
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    description: 'Geometrico friendly, perfetto per brand giovani',
    preview: 'Geometria Perfetta',
    isPremium: false,
    googleFont: true,
    rarity: 'common'
  },
  {
    family: 'Montserrat',
    name: 'Montserrat Extended',
    category: 'modern',
    cuisine: ['casual', 'coffee', 'steakhouse'],
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    description: 'Urban sans-serif con carattere distintivo',
    preview: 'Carattere Urbano',
    isPremium: false,
    googleFont: true,
    rarity: 'common'
  },

  // === VINTAGE & ARTISANAL ===
  {
    family: 'Abril Fatface',
    name: 'Abril Fatface',
    category: 'vintage',
    cuisine: ['wine-bar', 'casual'],
    weights: ['400'],
    description: 'Display drammatico per impatti visivi forti',
    preview: 'IMPATTO VISIVO',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },
  {
    family: 'Crimson Text',
    name: 'Crimson Text',
    category: 'vintage',
    cuisine: ['wine-bar', 'fine-dining'],
    weights: ['400', '600', '700'],
    description: 'Serif classico per atmosfere vintage raffinate',
    preview: 'Tradizione Raffinata',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },

  // === SCRIPT & HANDWRITTEN ===
  {
    family: 'Dancing Script',
    name: 'Dancing Script Premium',
    category: 'artisanal',
    cuisine: ['wine-bar', 'casual', 'coffee'],
    weights: ['400', '500', '600', '700'],
    description: 'Script elegante che simula la calligrafia a mano',
    preview: 'Eleganza Scritta',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },
  {
    family: 'Great Vibes',
    name: 'Great Vibes Luxury',
    category: 'artisanal',
    cuisine: ['wine-bar', 'fine-dining'],
    weights: ['400'],
    description: 'Script lussuoso per signature di alta classe',
    preview: 'Lusso Autentico',
    isPremium: true,
    googleFont: true,
    rarity: 'legendary'
  },
  {
    family: 'Allura',
    name: 'Allura Signature',
    category: 'artisanal',
    cuisine: ['wine-bar', 'fine-dining'],
    weights: ['400'],
    description: 'Calligrafia moderna per brand esclusivi',
    preview: 'Esclusività Moderna',
    isPremium: true,
    googleFont: true,
    rarity: 'legendary'
  },

  // === EXPERIMENTAL & FUTURISTIC ===
  {
    family: 'Orbitron',
    name: 'Orbitron Space',
    category: 'experimental',
    cuisine: ['molecular'],
    weights: ['400', '500', '600', '700', '800', '900'],
    description: 'Font futuristico per cucina molecolare e innovative',
    preview: 'FUTURO TECH',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },
  {
    family: 'Exo 2',
    name: 'Exo 2 Variable',
    category: 'experimental',
    cuisine: ['molecular', 'modern'],
    weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    description: 'Geometrico futuristico con personalità tecno',
    preview: 'Geometria Futura',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },

  // === JAPANESE & ASIAN ===
  {
    family: 'Noto Serif JP',
    name: 'Noto Serif Japanese',
    category: 'luxury',
    cuisine: ['japanese'],
    weights: ['200', '300', '400', '500', '600', '700', '900'],
    description: 'Serif giapponese di alta qualità per autenticità',
    preview: '和の美学',
    isPremium: true,
    googleFont: true,
    rarity: 'legendary'
  },
  {
    family: 'Noto Sans JP',
    name: 'Noto Sans Japanese',
    category: 'modern',
    cuisine: ['japanese'],
    weights: ['100', '300', '400', '500', '700', '900'],
    description: 'Sans-serif giapponese moderno e pulito',
    preview: 'モダン和食',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },

  // === STEAKHOUSE & MASCULINE ===
  {
    family: 'Bebas Neue',
    name: 'Bebas Neue Pro',
    category: 'modern',
    cuisine: ['steakhouse'],
    weights: ['400'],
    description: 'Sans-serif condensed strong per brand maschili',
    preview: 'FORZA PURA',
    isPremium: false,
    googleFont: true,
    rarity: 'common'
  },
  {
    family: 'Oswald',
    name: 'Oswald Extended',
    category: 'modern',
    cuisine: ['steakhouse', 'casual'],
    weights: ['200', '300', '400', '500', '600', '700'],
    description: 'Condensed versatile per impatti forti',
    preview: 'IMPATTO ROBUSTO',
    isPremium: false,
    googleFont: true,
    rarity: 'common'
  },

  // === COFFEE & ARTISANAL ===
  {
    family: 'Merriweather',
    name: 'Merriweather Premium',
    category: 'artisanal',
    cuisine: ['coffee'],
    weights: ['300', '400', '700', '900'],
    description: 'Serif friendly per brand artigianali e coffee shop',
    preview: 'Artigianalità Autentica',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  },
  {
    family: 'Lora',
    name: 'Lora Artisan',
    category: 'artisanal',
    cuisine: ['coffee', 'casual'],
    weights: ['400', '500', '600', '700'],
    description: 'Serif contemporaneo calmo e leggibile',
    preview: 'Serenità Moderna',
    isPremium: true,
    googleFont: true,
    rarity: 'rare'
  }
];

// Funzioni di utilità
export const getFontsByCategory = (category: PremiumFont['category']) => 
  PREMIUM_FONTS.filter(font => font.category === category);

export const getFontsByCuisine = (cuisine: PremiumFont['cuisine'][0]) => 
  PREMIUM_FONTS.filter(font => font.cuisine.includes(cuisine));

export const getFontsByRarity = (rarity: PremiumFont['rarity']) => 
  PREMIUM_FONTS.filter(font => font.rarity === rarity);

export const getPremiumFontsOnly = () => 
  PREMIUM_FONTS.filter(font => font.isPremium);

export const getLegendaryFonts = () => getFontsByRarity('legendary');

// Font combinations per stile di ristorante
export const FONT_COMBINATIONS = {
  'fine-dining': {
    primary: 'Playfair Display',
    secondary: 'Cormorant Garamond',
    accent: 'Cinzel'
  },
  'molecular': {
    primary: 'Orbitron',
    secondary: 'Exo 2', 
    accent: 'Inter'
  },
  'wine-bar': {
    primary: 'Dancing Script',
    secondary: 'Crimson Text',
    accent: 'Playfair Display'
  },
  'coffee': {
    primary: 'Merriweather',
    secondary: 'Lora',
    accent: 'Poppins'
  },
  'steakhouse': {
    primary: 'Bebas Neue',
    secondary: 'Oswald',
    accent: 'Montserrat'
  },
  'japanese': {
    primary: 'Noto Serif JP',
    secondary: 'Noto Sans JP',
    accent: 'Inter'
  }
};