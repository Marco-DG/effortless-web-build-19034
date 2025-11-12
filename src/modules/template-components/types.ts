// Sistema modulare di componenti template

export interface TemplateComponent {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  icon: string;
  category: ComponentCategory;
  isRequired: boolean;
  isEnabled: boolean;
  order: number;
  config: ComponentConfig;
  variants: ComponentVariant[];
}

export type ComponentType = 
  // BRAND & IDENTITY
  | 'logo'
  | 'brand-colors'
  | 'typography'
  
  // LAYOUT & STRUCTURE  
  | 'header'
  | 'navigation'
  | 'hero'
  | 'footer'
  | 'sidebar'
  
  // CONTENT SECTIONS
  | 'about'
  | 'story'
  | 'team'
  | 'values'
  | 'mission'
  
  // BUSINESS SPECIFIC
  | 'menu'
  | 'menu-categories'
  | 'featured-dishes'
  | 'chef-specials'
  | 'wine-list'
  | 'cocktail-menu'
  
  // INTERACTIVE
  | 'reservation-form'
  | 'contact-form'
  | 'newsletter-signup'
  | 'table-booking'
  | 'event-booking'
  
  // SOCIAL PROOF
  | 'reviews'
  | 'testimonials'
  | 'ratings'
  | 'awards'
  | 'press-mentions'
  
  // MEDIA & VISUAL
  | 'gallery'
  | 'photo-carousel'
  | 'video-background'
  | 'instagram-feed'
  | 'virtual-tour'
  
  // INFORMATIONAL
  | 'hours'
  | 'location'
  | 'contact-info'
  | 'parking-info'
  | 'accessibility'
  | 'dress-code'
  
  // PROMOTIONAL
  | 'events'
  | 'special-offers'
  | 'happy-hour'
  | 'promotions'
  | 'announcements'
  
  // SERVICES
  | 'delivery'
  | 'takeout'
  | 'catering'
  | 'private-dining'
  | 'group-bookings'
  
  // ENGAGEMENT
  | 'blog'
  | 'news'
  | 'recipes'
  | 'cooking-tips'
  | 'chef-insights'
  
  // E-COMMERCE
  | 'online-ordering'
  | 'gift-cards'
  | 'merchandise'
  | 'loyalty-program'
  
  // TECHNICAL
  | 'seo-meta'
  | 'analytics'
  | 'chat-widget'
  | 'cookies-banner';

export type ComponentCategory = 
  | 'brand'           // Logo, colors, typography
  | 'structure'       // Header, navigation, footer
  | 'content'         // About, story, team
  | 'business'        // Menu, specials, services
  | 'social'          // Reviews, testimonials, social proof
  | 'media'           // Gallery, photos, videos
  | 'interaction'     // Forms, bookings, contact
  | 'promotion'       // Events, offers, announcements
  | 'technical';      // SEO, analytics, tracking

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  style: 'minimal' | 'classic' | 'modern' | 'bold' | 'elegant' | 'playful';
  layout: string;
  preview: string;
  config: any;
}

export interface ComponentConfig {
  // Visual settings
  style: {
    layout: string;
    alignment: 'left' | 'center' | 'right';
    spacing: 'compact' | 'normal' | 'spacious';
    background: string;
    textColor: string;
    borderRadius: number;
    shadow: boolean;
    animation: 'none' | 'fade' | 'slide' | 'bounce';
  };
  
  // Content settings
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    images?: string[];
    customFields?: Record<string, any>;
  };
  
  // Behavior settings
  behavior: {
    hideOnMobile?: boolean;
    hideOnDesktop?: boolean;
    requireAuth?: boolean;
    showConditionally?: boolean;
    autoplay?: boolean;
    interactive?: boolean;
  };
  
  // Integration settings
  integrations: {
    googleMaps?: boolean;
    socialMedia?: string[];
    analytics?: boolean;
    thirdPartyWidgets?: string[];
  };
}

// Predefined component sets per template type
export const TEMPLATE_COMPONENT_SETS = {
  'fine-dining': [
    'logo', 'header', 'hero', 'about', 'chef-specials', 'menu', 
    'wine-list', 'reservation-form', 'awards', 'gallery', 'reviews', 
    'location', 'hours', 'footer'
  ],
  'casual': [
    'logo', 'navigation', 'hero', 'menu', 'featured-dishes', 
    'happy-hour', 'gallery', 'reviews', 'events', 'contact-form',
    'hours', 'delivery', 'footer'
  ],
  'fast-food': [
    'logo', 'header', 'hero', 'menu', 'promotions', 'online-ordering',
    'delivery', 'takeout', 'loyalty-program', 'locations', 'hours', 'footer'
  ],
  'wine-bar': [
    'logo', 'header', 'hero', 'wine-list', 'cocktail-menu', 'events',
    'atmosphere-gallery', 'reviews', 'reservation-form', 'hours', 'footer'
  ],
  'cafe': [
    'logo', 'header', 'hero', 'menu', 'coffee-specials', 'about',
    'instagram-feed', 'events', 'newsletter-signup', 'hours', 'contact-info', 'footer'
  ],
  'pizzeria': [
    'logo', 'header', 'hero', 'menu', 'featured-pizzas', 'ingredients-story',
    'delivery', 'takeout', 'catering', 'reviews', 'hours', 'footer'
  ]
} as const;

// Component dependencies and conflicts
export interface ComponentRelationship {
  requires?: ComponentType[];     // Components that must be enabled
  conflicts?: ComponentType[];    // Components that cannot be used together  
  recommends?: ComponentType[];   // Components that work well together
  replaces?: ComponentType[];     // Components this one replaces
}

export const COMPONENT_RELATIONSHIPS: Record<ComponentType, ComponentRelationship> = {
  'logo': { 
    requires: ['brand-colors', 'typography'],
    recommends: ['header']
  },
  'hero': {
    recommends: ['navigation', 'about'],
    conflicts: ['video-background'] // if hero has video, can't have video bg elsewhere
  },
  'menu': {
    recommends: ['menu-categories', 'featured-dishes'],
    conflicts: ['online-ordering'] // different display styles
  },
  'online-ordering': {
    requires: ['menu'],
    replaces: ['reservation-form'], // different primary CTA
    recommends: ['delivery', 'takeout']
  },
  'reservation-form': {
    conflicts: ['online-ordering'],
    recommends: ['hours', 'contact-info']
  },
  'delivery': {
    requires: ['menu'],
    recommends: ['takeout', 'online-ordering']
  },
  'wine-list': {
    conflicts: ['cocktail-menu'], // usually one or the other prominently featured
    recommends: ['sommelier-notes', 'wine-pairings']
  },
  'reviews': {
    recommends: ['ratings', 'testimonials'],
    conflicts: ['press-mentions'] // different types of social proof
  }
} as Partial<Record<ComponentType, ComponentRelationship>>;

// Template-specific component configurations
export interface TemplateComponentConfig {
  templateType: string;
  requiredComponents: ComponentType[];
  recommendedComponents: ComponentType[];
  optionalComponents: ComponentType[];
  hiddenComponents: ComponentType[];
  defaultLayout: {
    header: ComponentType[];
    main: ComponentType[];
    sidebar?: ComponentType[];
    footer: ComponentType[];
  };
}