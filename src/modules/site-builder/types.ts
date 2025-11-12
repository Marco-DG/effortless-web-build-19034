// Tipi specifici per il Site Builder

export type SectionType = 
  | 'hero' 
  | 'about' 
  | 'menu' 
  | 'gallery' 
  | 'reviews' 
  | 'events' 
  | 'contact' 
  | 'hours'
  | 'newsletter';

export interface SiteSection {
  id: string;
  type: SectionType;
  enabled: boolean;
  order: number;
  title?: string;
  data: any; // Specifico per ogni tipo di sezione
}

export interface HeroSectionData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  style: 'minimal' | 'image-background' | 'video-background' | 'gradient';
  alignment: 'left' | 'center' | 'right';
}

export interface AboutSectionData {
  title: string;
  content: string;
  image?: string;
  imagePosition: 'left' | 'right' | 'top' | 'background';
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export interface GallerySectionData {
  title: string;
  subtitle?: string;
  images: Array<{
    id: string;
    url: string;
    caption?: string;
    featured?: boolean;
  }>;
  layout: 'grid' | 'masonry' | 'carousel';
  columns: 2 | 3 | 4;
}

export interface ReviewsSectionData {
  title: string;
  subtitle?: string;
  reviews: Array<{
    id: string;
    author: string;
    text: string;
    rating: number;
    date: string;
    avatar?: string;
    source?: 'google' | 'tripadvisor' | 'facebook' | 'manual';
  }>;
  displayStyle: 'cards' | 'testimonials' | 'carousel';
  showRatings: boolean;
  showDates: boolean;
}

export interface EventsSectionData {
  title: string;
  subtitle?: string;
  events: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    price?: string;
    image?: string;
    featured?: boolean;
  }>;
  layout: 'list' | 'cards' | 'timeline';
  showPastEvents: boolean;
}

export interface ContactSectionData {
  title: string;
  showMap: boolean;
  mapStyle: 'google' | 'openstreet' | 'custom';
  showForm: boolean;
  formFields: string[];
  showHours: boolean;
  showSocialLinks: boolean;
}

export interface SiteBuilderTab = 
  | 'sections'
  | 'design' 
  | 'settings'
  | 'seo';