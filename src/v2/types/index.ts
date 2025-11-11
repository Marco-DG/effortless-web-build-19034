// Tipi centralizzati per V2 - migliorati e più robusti

export type BuilderMode = 'logo' | 'menu' | 'site';

export type TemplateType = 'wine-bar';

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
  mode: 'text' | 'image' | 'hybrid' | 'advanced' | 'canvas';
  text?: string;
  font?: string;
  fontWeight?: string;
  fontCategory?: string;
  fontRarity?: string;
  size?: number;
  color?: string;
  imageUrl?: string;
  tagline?: string;
  layout?: 'horizontal' | 'vertical' | 'stacked';
  templateId?: string; // Template ID for current design
  selectedElement?: string; // Currently selected element in canvas
  
  // Template data
  template?: any; // Template completo selezionato
  elements?: CanvasElement[]; // Elementi del template
  
  // Advanced template elements (for canvas mode)
  advancedElements?: any[]; // Advanced logo elements
  canvasSize?: { width: number; height: number };
  
  // Legacy canvas config (future expansion)
  canvas?: {
    elements: CanvasElement[];
    canvasSize: { width: number; height: number };
    templateId?: string;
  };
}

// Canvas Logo Builder Types
export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  subtype?: string; // Per forme specifiche (circle, rectangle, line, path, etc.)
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  locked?: boolean;
  selected?: boolean;
  opacity?: number;
  
  // Per elementi text
  content?: string;
  
  // Stili generici per tutti gli elementi
  style?: {
    // Text styles
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    letterSpacing?: string;
    
    // Shape styles
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeDasharray?: string;
    pathData?: string; // Per path SVG
    
    // Effects
    filter?: string;
    textShadow?: string;
    mixBlendMode?: string;
    transform?: string;
    
    // Altri
    [key: string]: any;
  };
}

export interface TextElement extends CanvasElement {
  type: 'text';
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'light';
  fontStyle: 'normal' | 'italic';
  textAlign: 'left' | 'center' | 'right';
  color: string;
  letterSpacing: number;
  lineHeight: number;
  textDecoration: 'none' | 'underline' | 'line-through';
}

export interface ImageElement extends CanvasElement {
  type: 'image';
  src: string;
  alt: string;
  borderRadius: number;
  filter?: string;
}

export interface ShapeElement extends CanvasElement {
  type: 'shape';
  shape: 'rectangle' | 'circle' | 'triangle' | 'star';
  fill: string;
  stroke: string;
  strokeWidth: number;
  borderRadius?: number;
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
  type: 'hero' | 'about' | 'menu' | 'gallery' | 'contact' | 'reviews' | 'events' | 'newsletter' | 'location';
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
    subheading: string;
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