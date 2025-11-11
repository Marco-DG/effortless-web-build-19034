// Tipi centralizzati per V2 - migliorati e più robusti

export type BuilderMode = 'logo' | 'menu' | 'site';

export type TemplateType = 'wine-bar' | 'fine-dining' | 'trattoria';

export interface AppState {
  activeMode: BuilderMode;
  isBuilding: boolean;
  activeProject: Project | null;
  ui: {
    sidebarOpen: boolean;
    previewOpen: boolean;
    activeSection: string | null;
  };
}

export interface Project {
  id: string;
  name: string;
  type: TemplateType;
  data: ProjectData;
  createdAt: string;
  updatedAt: string;
}

// Logo Builder Types
export interface LogoConfig {
  mode: 'text' | 'image' | 'hybrid';
  text?: string;
  font?: string;
  size?: number;
  color?: string;
  imageUrl?: string;
  tagline?: string;
  layout?: 'horizontal' | 'vertical' | 'stacked';
}

// Menu Builder Types  
export interface MenuConfig {
  title: string;
  subtitle?: string;
  layout: 'list' | 'grid' | 'cards';
  columns: 1 | 2 | 3;
  showImages: boolean;
  showPrices: boolean;
  showDescriptions: boolean;
  showBadges: boolean;
  showCategories: boolean;
  categoriesAsFilter: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl?: string;
  badges?: string[];
  allergens?: string[];
  available?: boolean;
  featured?: boolean;
}

// Site Builder Types
export interface SiteConfig {
  template: TemplateType;
  sections: SiteSection[];
  theme: ThemeConfig;
  seo: SEOConfig;
}

export interface SiteSection {
  id: string;
  type: 'hero' | 'about' | 'menu' | 'gallery' | 'contact' | 'reviews' | 'events';
  enabled: boolean;
  order: number;
  data: any; // Specifico per ogni sezione
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string;
    container: string;
  };
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// Unified Project Data
export interface ProjectData {
  // Business Info
  business: {
    name: string;
    type: 'restaurant' | 'bar' | 'cafe' | 'pub';
    description: string;
    tagline: string;
  };
  
  // Contact Info
  contact: {
    address: string;
    phone: string;
    email: string;
    website?: string;
    socialLinks: {
      facebook?: string;
      instagram?: string;
      tripadvisor?: string;
    };
  };
  
  // Hours
  hours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  
  // Builder Configs
  logo: LogoConfig;
  menu: MenuConfig & { items: MenuItem[] };
  site: SiteConfig;
  
  // Content
  gallery: Array<{
    id: string;
    url: string;
    caption?: string;
  }>;
  
  reviews: Array<{
    id: string;
    author: string;
    text: string;
    rating: number;
    date: string;
  }>;
  
  events: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
  }>;
}