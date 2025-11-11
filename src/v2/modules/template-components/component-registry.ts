// Registry di tutti i componenti template disponibili

import { TemplateComponent, ComponentType, ComponentCategory } from './types';
import { 
  PenTool, Type, Palette, LayoutTemplate, Navigation, Monitor, Info, 
  UtensilsCrossed, Star, Clock, Utensils, Wine, Cocktail, Calendar, 
  Phone, Mail, MapPin, Camera, Video, Instagram, Users, Award,
  ShoppingCart, Gift, CreditCard, MessageSquare, Settings, BarChart3,
  Truck, Coffee, Pizza, ChefHat, BookOpen, Megaphone, Heart, Shield,
  Headphones, Globe, Zap
} from 'lucide-react';

export const COMPONENT_REGISTRY: Record<ComponentType, TemplateComponent> = {
  // BRAND & IDENTITY
  'logo': {
    id: 'logo',
    type: 'logo',
    name: 'Logo',
    description: 'Logo e identità visiva del brand',
    icon: 'PenTool',
    category: 'brand',
    isRequired: true,
    isEnabled: true,
    order: 1,
    config: {
      style: { layout: 'horizontal', alignment: 'left', spacing: 'normal', background: 'transparent', textColor: '#000000', borderRadius: 0, shadow: false, animation: 'none' },
      content: { title: '', customFields: {} },
      behavior: { hideOnMobile: false, hideOnDesktop: false },
      integrations: {}
    },
    variants: [
      { id: 'text-only', name: 'Solo Testo', description: 'Logo testuale elegante', style: 'minimal', layout: 'text', preview: '', config: {} },
      { id: 'icon-text', name: 'Icona + Testo', description: 'Logo con icona e testo', style: 'modern', layout: 'horizontal', preview: '', config: {} },
      { id: 'symbol', name: 'Solo Simbolo', description: 'Logo simbolico/iconico', style: 'bold', layout: 'icon', preview: '', config: {} }
    ]
  },

  'brand-colors': {
    id: 'brand-colors',
    type: 'brand-colors',
    name: 'Colori Brand',
    description: 'Palette colori e tema visivo',
    icon: 'Palette',
    category: 'brand',
    isRequired: true,
    isEnabled: true,
    order: 2,
    config: {
      style: { layout: 'palette', alignment: 'center', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 0, shadow: false, animation: 'none' },
      content: { customFields: { primary: '#8B4513', secondary: '#D2691E', accent: '#F4E4C1' } },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'warm', name: 'Toni Caldi', description: 'Palette con toni caldi e accoglienti', style: 'classic', layout: 'warm', preview: '', config: {} },
      { id: 'elegant', name: 'Elegante', description: 'Colori sofisticati e lussuosi', style: 'elegant', layout: 'luxury', preview: '', config: {} },
      { id: 'modern', name: 'Moderno', description: 'Palette contemporanea e pulita', style: 'modern', layout: 'clean', preview: '', config: {} }
    ]
  },

  'typography': {
    id: 'typography',
    type: 'typography',
    name: 'Tipografia',
    description: 'Font e stili di testo',
    icon: 'Type',
    category: 'brand',
    isRequired: true,
    isEnabled: true,
    order: 3,
    config: {
      style: { layout: 'font-pairing', alignment: 'left', spacing: 'normal', background: 'transparent', textColor: '#000000', borderRadius: 0, shadow: false, animation: 'none' },
      content: { customFields: { heading: 'Playfair Display', body: 'Inter', accent: 'Dancing Script' } },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'classic', name: 'Classico', description: 'Font serif eleganti e tradizionali', style: 'classic', layout: 'serif', preview: '', config: {} },
      { id: 'modern', name: 'Moderno', description: 'Font sans-serif puliti e contemporanei', style: 'modern', layout: 'sans', preview: '', config: {} },
      { id: 'artistic', name: 'Artistico', description: 'Font creativi con personalità', style: 'playful', layout: 'creative', preview: '', config: {} }
    ]
  },

  // LAYOUT & STRUCTURE
  'header': {
    id: 'header',
    type: 'header',
    name: 'Header',
    description: 'Intestazione del sito con logo e navigazione',
    icon: 'LayoutTemplate',
    category: 'structure',
    isRequired: true,
    isEnabled: true,
    order: 10,
    config: {
      style: { layout: 'horizontal', alignment: 'center', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 0, shadow: true, animation: 'none' },
      content: {},
      behavior: { hideOnMobile: false },
      integrations: {}
    },
    variants: [
      { id: 'minimal', name: 'Minimale', description: 'Header pulito e essenziale', style: 'minimal', layout: 'clean', preview: '', config: {} },
      { id: 'classic', name: 'Classico', description: 'Header tradizionale con menu orizzontale', style: 'classic', layout: 'traditional', preview: '', config: {} },
      { id: 'centered', name: 'Centrato', description: 'Logo al centro, menu ai lati', style: 'elegant', layout: 'centered', preview: '', config: {} }
    ]
  },

  'navigation': {
    id: 'navigation',
    type: 'navigation',
    name: 'Navigazione',
    description: 'Menu di navigazione principale',
    icon: 'Navigation',
    category: 'structure',
    isRequired: true,
    isEnabled: true,
    order: 11,
    config: {
      style: { layout: 'horizontal', alignment: 'center', spacing: 'normal', background: 'transparent', textColor: '#000000', borderRadius: 0, shadow: false, animation: 'fade' },
      content: {},
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'horizontal', name: 'Orizzontale', description: 'Menu orizzontale classico', style: 'classic', layout: 'horizontal', preview: '', config: {} },
      { id: 'hamburger', name: 'Hamburger', description: 'Menu mobile compatto', style: 'modern', layout: 'mobile', preview: '', config: {} },
      { id: 'sidebar', name: 'Sidebar', description: 'Menu laterale elegante', style: 'elegant', layout: 'sidebar', preview: '', config: {} }
    ]
  },

  'hero': {
    id: 'hero',
    type: 'hero',
    name: 'Sezione Hero',
    description: 'Sezione principale di apertura del sito',
    icon: 'Monitor',
    category: 'content',
    isRequired: true,
    isEnabled: true,
    order: 20,
    config: {
      style: { layout: 'fullscreen', alignment: 'center', spacing: 'spacious', background: '#f8f9fa', textColor: '#000000', borderRadius: 0, shadow: false, animation: 'fade' },
      content: { title: '', subtitle: '', description: '', buttonText: 'Scopri di più', buttonLink: '#about' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'image-bg', name: 'Sfondo Immagine', description: 'Hero con immagine di sfondo', style: 'bold', layout: 'image-background', preview: '', config: {} },
      { id: 'video-bg', name: 'Sfondo Video', description: 'Hero con video di sfondo', style: 'modern', layout: 'video-background', preview: '', config: {} },
      { id: 'minimal', name: 'Minimale', description: 'Hero pulito e semplice', style: 'minimal', layout: 'text-only', preview: '', config: {} },
      { id: 'split', name: 'Split Screen', description: 'Hero diviso immagine e testo', style: 'modern', layout: 'split', preview: '', config: {} }
    ]
  },

  'footer': {
    id: 'footer',
    type: 'footer',
    name: 'Footer',
    description: 'Piè di pagina con informazioni e link',
    icon: 'LayoutTemplate',
    category: 'structure',
    isRequired: true,
    isEnabled: true,
    order: 100,
    config: {
      style: { layout: 'columns', alignment: 'left', spacing: 'normal', background: '#2c3e50', textColor: '#ffffff', borderRadius: 0, shadow: false, animation: 'none' },
      content: {},
      behavior: {},
      integrations: { socialMedia: ['facebook', 'instagram'] }
    },
    variants: [
      { id: 'simple', name: 'Semplice', description: 'Footer minimale con info essenziali', style: 'minimal', layout: 'simple', preview: '', config: {} },
      { id: 'detailed', name: 'Dettagliato', description: 'Footer completo con sezioni multiple', style: 'classic', layout: 'detailed', preview: '', config: {} },
      { id: 'centered', name: 'Centrato', description: 'Footer con layout centrato', style: 'elegant', layout: 'centered', preview: '', config: {} }
    ]
  },

  // BUSINESS SPECIFIC
  'menu': {
    id: 'menu',
    type: 'menu',
    name: 'Menu Ristorante',
    description: 'Menu completo con piatti e prezzi',
    icon: 'UtensilsCrossed',
    category: 'business',
    isRequired: true,
    isEnabled: true,
    order: 30,
    config: {
      style: { layout: 'categories', alignment: 'left', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'none' },
      content: { title: 'Il Nostro Menu' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'classic', name: 'Classico', description: 'Menu tradizionale a lista', style: 'classic', layout: 'list', preview: '', config: {} },
      { id: 'grid', name: 'Griglia', description: 'Menu a griglia con immagini', style: 'modern', layout: 'grid', preview: '', config: {} },
      { id: 'categories', name: 'Per Categorie', description: 'Menu diviso per sezioni', style: 'elegant', layout: 'categorized', preview: '', config: {} },
      { id: 'minimal', name: 'Minimale', description: 'Menu pulito senza fronzoli', style: 'minimal', layout: 'clean', preview: '', config: {} }
    ]
  },

  'featured-dishes': {
    id: 'featured-dishes',
    type: 'featured-dishes',
    name: 'Piatti in Evidenza',
    description: 'Piatti speciali e signature del chef',
    icon: 'Star',
    category: 'business',
    isRequired: false,
    isEnabled: true,
    order: 31,
    config: {
      style: { layout: 'carousel', alignment: 'center', spacing: 'normal', background: '#f8f9fa', textColor: '#000000', borderRadius: 12, shadow: true, animation: 'slide' },
      content: { title: 'I Nostri Piatti Speciali' },
      behavior: { autoplay: true },
      integrations: {}
    },
    variants: [
      { id: 'carousel', name: 'Carousel', description: 'Slider di piatti in evidenza', style: 'modern', layout: 'carousel', preview: '', config: {} },
      { id: 'grid', name: 'Griglia', description: 'Griglia di piatti speciali', style: 'classic', layout: 'grid', preview: '', config: {} },
      { id: 'hero-style', name: 'Hero Style', description: 'Piatti in stile hero grande', style: 'bold', layout: 'hero', preview: '', config: {} }
    ]
  },

  'wine-list': {
    id: 'wine-list',
    type: 'wine-list',
    name: 'Carta dei Vini',
    description: 'Selezione di vini e bevande alcoliche',
    icon: 'Wine',
    category: 'business',
    isRequired: false,
    isEnabled: false,
    order: 32,
    config: {
      style: { layout: 'elegant', alignment: 'left', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'none' },
      content: { title: 'Carta dei Vini' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'regions', name: 'Per Regioni', description: 'Vini organizzati per regione', style: 'classic', layout: 'regions', preview: '', config: {} },
      { id: 'types', name: 'Per Tipologia', description: 'Vini per rossi, bianchi, bollicine', style: 'elegant', layout: 'types', preview: '', config: {} },
      { id: 'sommelier', name: 'Selezione Sommelier', description: 'Vini consigliati dal sommelier', style: 'elegant', layout: 'curated', preview: '', config: {} }
    ]
  },

  // CONTENT SECTIONS
  'about': {
    id: 'about',
    type: 'about',
    name: 'Chi Siamo',
    description: 'Storia e presentazione del ristorante',
    icon: 'Info',
    category: 'content',
    isRequired: false,
    isEnabled: true,
    order: 21,
    config: {
      style: { layout: 'split', alignment: 'left', spacing: 'spacious', background: '#ffffff', textColor: '#000000', borderRadius: 0, shadow: false, animation: 'fade' },
      content: { title: 'La Nostra Storia', description: '' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'story', name: 'Storia', description: 'Focus sulla storia del ristorante', style: 'classic', layout: 'story', preview: '', config: {} },
      { id: 'chef', name: 'Chef', description: 'Focus sullo chef e la sua filosofia', style: 'elegant', layout: 'chef-focus', preview: '', config: {} },
      { id: 'values', name: 'Valori', description: 'Valori e missione del ristorante', style: 'modern', layout: 'values', preview: '', config: {} }
    ]
  },

  // SOCIAL PROOF
  'reviews': {
    id: 'reviews',
    type: 'reviews',
    name: 'Recensioni',
    description: 'Recensioni e testimonianze clienti',
    icon: 'Star',
    category: 'social',
    isRequired: false,
    isEnabled: true,
    order: 40,
    config: {
      style: { layout: 'cards', alignment: 'center', spacing: 'normal', background: '#f8f9fa', textColor: '#000000', borderRadius: 12, shadow: true, animation: 'fade' },
      content: { title: 'Cosa Dicono di Noi' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'cards', name: 'Cards', description: 'Recensioni in formato card', style: 'modern', layout: 'cards', preview: '', config: {} },
      { id: 'testimonials', name: 'Testimonials', description: 'Testimonianze in evidenza', style: 'elegant', layout: 'testimonials', preview: '', config: {} },
      { id: 'ratings', name: 'Rating Focus', description: 'Focus sui rating e stelle', style: 'minimal', layout: 'ratings', preview: '', config: {} }
    ]
  },

  // INTERACTIVE
  'contact-form': {
    id: 'contact-form',
    type: 'contact-form',
    name: 'Modulo Contatti',
    description: 'Form per contattare il ristorante',
    icon: 'Mail',
    category: 'interaction',
    isRequired: false,
    isEnabled: true,
    order: 50,
    config: {
      style: { layout: 'simple', alignment: 'center', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'none' },
      content: { title: 'Contattaci' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'simple', name: 'Semplice', description: 'Form base nome, email, messaggio', style: 'minimal', layout: 'simple', preview: '', config: {} },
      { id: 'detailed', name: 'Dettagliato', description: 'Form completo con più campi', style: 'classic', layout: 'detailed', preview: '', config: {} }
    ]
  },

  'reservation-form': {
    id: 'reservation-form',
    type: 'reservation-form',
    name: 'Prenotazioni',
    description: 'Sistema di prenotazione tavoli',
    icon: 'Calendar',
    category: 'interaction',
    isRequired: false,
    isEnabled: false,
    order: 51,
    config: {
      style: { layout: 'calendar', alignment: 'center', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'none' },
      content: { title: 'Prenota un Tavolo', buttonText: 'Prenota Ora' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'inline', name: 'Inline', description: 'Form di prenotazione integrato', style: 'modern', layout: 'inline', preview: '', config: {} },
      { id: 'modal', name: 'Modal', description: 'Prenotazione in popup', style: 'elegant', layout: 'modal', preview: '', config: {} },
      { id: 'external', name: 'Esterno', description: 'Link a sistema esterno', style: 'minimal', layout: 'external', preview: '', config: {} }
    ]
  },

  // INFORMATIONAL
  'hours': {
    id: 'hours',
    type: 'hours',
    name: 'Orari',
    description: 'Orari di apertura e informazioni utili',
    icon: 'Clock',
    category: 'content',
    isRequired: false,
    isEnabled: true,
    order: 60,
    config: {
      style: { layout: 'table', alignment: 'center', spacing: 'compact', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'none' },
      content: { title: 'Orari di Apertura' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'table', name: 'Tabella', description: 'Orari in formato tabella', style: 'classic', layout: 'table', preview: '', config: {} },
      { id: 'cards', name: 'Cards', description: 'Ogni giorno in una card', style: 'modern', layout: 'cards', preview: '', config: {} },
      { id: 'minimal', name: 'Compatto', description: 'Visualizzazione compatta', style: 'minimal', layout: 'compact', preview: '', config: {} }
    ]
  },

  'location': {
    id: 'location',
    type: 'location',
    name: 'Posizione',
    description: 'Mappa e informazioni sulla posizione',
    icon: 'MapPin',
    category: 'content',
    isRequired: false,
    isEnabled: true,
    order: 61,
    config: {
      style: { layout: 'map-sidebar', alignment: 'center', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'none' },
      content: { title: 'Dove Siamo' },
      behavior: {},
      integrations: { googleMaps: true }
    },
    variants: [
      { id: 'map-focus', name: 'Focus Mappa', description: 'Mappa grande con info laterali', style: 'modern', layout: 'map-focus', preview: '', config: {} },
      { id: 'split', name: 'Divisa', description: 'Mappa e info affiancate', style: 'classic', layout: 'split', preview: '', config: {} },
      { id: 'overlay', name: 'Overlay', description: 'Info sopra la mappa', style: 'elegant', layout: 'overlay', preview: '', config: {} }
    ]
  },

  // MEDIA
  'gallery': {
    id: 'gallery',
    type: 'gallery',
    name: 'Galleria Foto',
    description: 'Raccolta di foto del ristorante e piatti',
    icon: 'Camera',
    category: 'media',
    isRequired: false,
    isEnabled: true,
    order: 41,
    config: {
      style: { layout: 'masonry', alignment: 'center', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'fade' },
      content: { title: 'La Nostra Galleria' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'masonry', name: 'Masonry', description: 'Griglia irregolare tipo Pinterest', style: 'modern', layout: 'masonry', preview: '', config: {} },
      { id: 'grid', name: 'Griglia', description: 'Griglia ordinata e simmetrica', style: 'classic', layout: 'grid', preview: '', config: {} },
      { id: 'carousel', name: 'Carousel', description: 'Slider di foto', style: 'elegant', layout: 'carousel', preview: '', config: {} }
    ]
  },

  // PROMOTIONAL
  'events': {
    id: 'events',
    type: 'events',
    name: 'Eventi',
    description: 'Eventi speciali e promozioni',
    icon: 'Calendar',
    category: 'promotion',
    isRequired: false,
    isEnabled: false,
    order: 42,
    config: {
      style: { layout: 'timeline', alignment: 'left', spacing: 'normal', background: '#f8f9fa', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'slide' },
      content: { title: 'Prossimi Eventi' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'timeline', name: 'Timeline', description: 'Eventi in ordine cronologico', style: 'modern', layout: 'timeline', preview: '', config: {} },
      { id: 'cards', name: 'Cards', description: 'Ogni evento in una card', style: 'classic', layout: 'cards', preview: '', config: {} },
      { id: 'featured', name: 'In Evidenza', description: 'Focus su evento principale', style: 'bold', layout: 'featured', preview: '', config: {} }
    ]
  },

  // SERVICES
  'delivery': {
    id: 'delivery',
    type: 'delivery',
    name: 'Delivery',
    description: 'Informazioni e link per il delivery',
    icon: 'Truck',
    category: 'business',
    isRequired: false,
    isEnabled: false,
    order: 33,
    config: {
      style: { layout: 'cta-focus', alignment: 'center', spacing: 'normal', background: '#ffffff', textColor: '#000000', borderRadius: 8, shadow: true, animation: 'none' },
      content: { title: 'Ordina a Domicilio', buttonText: 'Ordina Ora' },
      behavior: {},
      integrations: {}
    },
    variants: [
      { id: 'partners', name: 'Partner', description: 'Link a Glovo, Deliveroo, etc.', style: 'modern', layout: 'partners', preview: '', config: {} },
      { id: 'direct', name: 'Diretto', description: 'Ordini diretti dal sito', style: 'bold', layout: 'direct', preview: '', config: {} }
    ]
  },

  // TECHNICAL (sempre presenti ma nascosti)
  'seo-meta': {
    id: 'seo-meta',
    type: 'seo-meta',
    name: 'SEO Meta',
    description: 'Meta tags e ottimizzazione SEO',
    icon: 'BarChart3',
    category: 'technical',
    isRequired: true,
    isEnabled: true,
    order: 200,
    config: {
      style: { layout: 'hidden', alignment: 'left', spacing: 'normal', background: 'transparent', textColor: '#000000', borderRadius: 0, shadow: false, animation: 'none' },
      content: { title: '', description: '', customFields: {} },
      behavior: { hideOnMobile: true, hideOnDesktop: true },
      integrations: {}
    },
    variants: []
  }
};

// Funzioni di utility per il registry
export const getComponentsByCategory = (category: ComponentCategory): TemplateComponent[] => {
  return Object.values(COMPONENT_REGISTRY).filter(comp => comp.category === category);
};

export const getRequiredComponents = (): TemplateComponent[] => {
  return Object.values(COMPONENT_REGISTRY).filter(comp => comp.isRequired);
};

export const getEnabledComponents = (): TemplateComponent[] => {
  return Object.values(COMPONENT_REGISTRY).filter(comp => comp.isEnabled);
};

export const getComponentById = (id: ComponentType): TemplateComponent | undefined => {
  return COMPONENT_REGISTRY[id];
};