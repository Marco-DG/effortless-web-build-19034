// Tipi per il sistema di template avanzato

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  preview: string;
  thumbnail: string;
  theme: TemplateTheme;
  layout: LayoutConfig;
  sections: TemplateSectionConfig[];
  features: string[];
  isPremium?: boolean;
}

export type TemplateCategory = 
  | 'fine-dining'
  | 'casual'
  | 'fast-food'
  | 'wine-bar'
  | 'cafe'
  | 'pizzeria'
  | 'ethnic'
  | 'modern'
  | 'traditional';

export interface TemplateTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    heading: FontConfig;
    body: FontConfig;
    accent: FontConfig;
  };
  spacing: {
    section: string;
    container: string;
    element: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
    card: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
    card: string;
  };
  animations: {
    duration: string;
    easing: string;
    hover: string;
  };
}

export interface FontConfig {
  family: string;
  weights: number[];
  fallback: string[];
  source: 'google' | 'system' | 'custom';
}

export interface LayoutConfig {
  style: 'modern' | 'classic' | 'minimal' | 'bold' | 'elegant';
  navigation: 'horizontal' | 'sidebar' | 'overlay' | 'minimal';
  hero: 'fullscreen' | 'large' | 'medium' | 'compact';
  sections: 'contained' | 'fullwidth' | 'mixed';
  footer: 'simple' | 'detailed' | 'minimal';
}

export interface TemplateSectionConfig {
  type: string;
  required: boolean;
  defaultEnabled: boolean;
  style: string;
  data: any;
}

// Template preconfigurati
export const TEMPLATE_CATEGORIES = [
  { id: 'fine-dining', label: 'Fine Dining', description: 'Elegante e raffinato' },
  { id: 'casual', label: 'Casual', description: 'Informale e accogliente' },
  { id: 'fast-food', label: 'Fast Food', description: 'Veloce e moderno' },
  { id: 'wine-bar', label: 'Wine Bar', description: 'Sofisticato e intimo' },
  { id: 'cafe', label: 'Caffetteria', description: 'Rilassato e minimale' },
  { id: 'pizzeria', label: 'Pizzeria', description: 'Tradizionale e familiare' },
  { id: 'ethnic', label: 'Etnico', description: 'Autentico e caratteristico' },
  { id: 'modern', label: 'Moderno', description: 'Contemporaneo e pulito' },
  { id: 'traditional', label: 'Tradizionale', description: 'Classico e atemporale' }
] as const;