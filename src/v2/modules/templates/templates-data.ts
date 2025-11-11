import { Template } from './types';

export const TEMPLATES: Template[] = [
  // Fine Dining Templates
  {
    id: 'elegante-dorato',
    name: 'Elegante Dorato',
    description: 'Template lussuoso con accenti dorati per ristoranti fine dining',
    category: 'fine-dining',
    preview: '/templates/elegante-dorato-preview.jpg',
    thumbnail: '/templates/elegante-dorato-thumb.jpg',
    features: ['Hero fullscreen', 'Menu elegante', 'Galleria sofisticata', 'Prenotazioni integrate'],
    isPremium: true,
    theme: {
      id: 'elegante-dorato',
      name: 'Elegante Dorato',
      colors: {
        primary: '#B8860B',
        secondary: '#2C2C2C',
        accent: '#FFD700',
        background: '#FEFEFE',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        textSecondary: '#666666',
        border: '#E5E5E5',
        success: '#059669',
        warning: '#D97706',
        error: '#DC2626'
      },
      fonts: {
        heading: {
          family: 'Playfair Display',
          weights: [400, 700],
          fallback: ['Georgia', 'serif'],
          source: 'google'
        },
        body: {
          family: 'Inter',
          weights: [300, 400, 500, 600],
          fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
          source: 'google'
        },
        accent: {
          family: 'Dancing Script',
          weights: [400, 700],
          fallback: ['cursive'],
          source: 'google'
        }
      },
      spacing: {
        section: '120px',
        container: '1400px',
        element: '24px'
      },
      borderRadius: {
        small: '4px',
        medium: '8px',
        large: '16px',
        card: '12px'
      },
      shadows: {
        small: '0 2px 4px rgba(0,0,0,0.05)',
        medium: '0 8px 25px rgba(0,0,0,0.1)',
        large: '0 25px 50px rgba(0,0,0,0.15)',
        card: '0 10px 30px rgba(184,134,11,0.1)'
      },
      animations: {
        duration: '300ms',
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        hover: 'transform 0.2s ease'
      }
    },
    layout: {
      style: 'elegant',
      navigation: 'horizontal',
      hero: 'fullscreen',
      sections: 'contained',
      footer: 'detailed'
    },
    sections: [
      { type: 'hero', required: true, defaultEnabled: true, style: 'luxury', data: {} },
      { type: 'about', required: false, defaultEnabled: true, style: 'elegant', data: {} },
      { type: 'menu', required: true, defaultEnabled: true, style: 'premium', data: {} },
      { type: 'gallery', required: false, defaultEnabled: true, style: 'masonry', data: {} },
      { type: 'reviews', required: false, defaultEnabled: false, style: 'testimonials', data: {} },
      { type: 'contact', required: true, defaultEnabled: true, style: 'elegant', data: {} }
    ]
  },
  
  {
    id: 'moderno-minimale',
    name: 'Moderno Minimale',
    description: 'Design pulito e contemporaneo per ristoranti moderni',
    category: 'modern',
    preview: '/templates/moderno-minimale-preview.jpg',
    thumbnail: '/templates/moderno-minimale-thumb.jpg',
    features: ['Design clean', 'Typography moderna', 'Layout flessibile', 'Mobile optimized'],
    theme: {
      id: 'moderno-minimale',
      name: 'Moderno Minimale',
      colors: {
        primary: '#2563EB',
        secondary: '#64748B',
        accent: '#06B6D4',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#0F172A',
        textSecondary: '#475569',
        border: '#E2E8F0',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
      },
      fonts: {
        heading: {
          family: 'Inter',
          weights: [600, 700, 800],
          fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
          source: 'google'
        },
        body: {
          family: 'Inter',
          weights: [400, 500],
          fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
          source: 'google'
        },
        accent: {
          family: 'JetBrains Mono',
          weights: [400, 500],
          fallback: ['Monaco', 'monospace'],
          source: 'google'
        }
      },
      spacing: {
        section: '80px',
        container: '1200px',
        element: '16px'
      },
      borderRadius: {
        small: '6px',
        medium: '12px',
        large: '24px',
        card: '16px'
      },
      shadows: {
        small: '0 1px 3px rgba(0,0,0,0.1)',
        medium: '0 4px 6px rgba(0,0,0,0.07)',
        large: '0 20px 25px rgba(0,0,0,0.1)',
        card: '0 4px 16px rgba(37,99,235,0.1)'
      },
      animations: {
        duration: '200ms',
        easing: 'ease-out',
        hover: 'all 0.2s ease'
      }
    },
    layout: {
      style: 'modern',
      navigation: 'minimal',
      hero: 'large',
      sections: 'contained',
      footer: 'simple'
    },
    sections: [
      { type: 'hero', required: true, defaultEnabled: true, style: 'modern', data: {} },
      { type: 'about', required: false, defaultEnabled: false, style: 'minimal', data: {} },
      { type: 'menu', required: true, defaultEnabled: true, style: 'clean', data: {} },
      { type: 'gallery', required: false, defaultEnabled: true, style: 'grid', data: {} },
      { type: 'contact', required: true, defaultEnabled: true, style: 'minimal', data: {} }
    ]
  },

  {
    id: 'rustico-italiano',
    name: 'Rustico Italiano',
    description: 'Template caldo e accogliente per trattorie e ristoranti tradizionali',
    category: 'traditional',
    preview: '/templates/rustico-italiano-preview.jpg',
    thumbnail: '/templates/rustico-italiano-thumb.jpg',
    features: ['Atmosfera calda', 'Colori terrosi', 'Typography classica', 'Menu tradizionale'],
    theme: {
      id: 'rustico-italiano',
      name: 'Rustico Italiano',
      colors: {
        primary: '#8B4513',
        secondary: '#D2691E',
        accent: '#CD853F',
        background: '#FFF8F0',
        surface: '#FFFFFF',
        text: '#3E2723',
        textSecondary: '#6D4C41',
        border: '#D7CCC8',
        success: '#689F38',
        warning: '#FF8F00',
        error: '#D32F2F'
      },
      fonts: {
        heading: {
          family: 'Merriweather',
          weights: [400, 700],
          fallback: ['Georgia', 'serif'],
          source: 'google'
        },
        body: {
          family: 'Open Sans',
          weights: [400, 600],
          fallback: ['-apple-system', 'sans-serif'],
          source: 'google'
        },
        accent: {
          family: 'Dancing Script',
          weights: [400, 700],
          fallback: ['cursive'],
          source: 'google'
        }
      },
      spacing: {
        section: '100px',
        container: '1100px',
        element: '20px'
      },
      borderRadius: {
        small: '4px',
        medium: '8px',
        large: '16px',
        card: '8px'
      },
      shadows: {
        small: '0 2px 4px rgba(139,69,19,0.1)',
        medium: '0 8px 16px rgba(139,69,19,0.15)',
        large: '0 16px 32px rgba(139,69,19,0.2)',
        card: '0 4px 12px rgba(139,69,19,0.12)'
      },
      animations: {
        duration: '350ms',
        easing: 'ease-in-out',
        hover: 'transform 0.3s ease'
      }
    },
    layout: {
      style: 'classic',
      navigation: 'horizontal',
      hero: 'medium',
      sections: 'contained',
      footer: 'detailed'
    },
    sections: [
      { type: 'hero', required: true, defaultEnabled: true, style: 'warm', data: {} },
      { type: 'about', required: false, defaultEnabled: true, style: 'traditional', data: {} },
      { type: 'menu', required: true, defaultEnabled: true, style: 'classic', data: {} },
      { type: 'gallery', required: false, defaultEnabled: true, style: 'warm', data: {} },
      { type: 'reviews', required: false, defaultEnabled: true, style: 'traditional', data: {} },
      { type: 'contact', required: true, defaultEnabled: true, style: 'classic', data: {} }
    ]
  },

  {
    id: 'wine-bar-scuro',
    name: 'Wine Bar Elegante',
    description: 'Design sofisticato con toni scuri per wine bar e enoteche',
    category: 'wine-bar',
    preview: '/templates/wine-bar-scuro-preview.jpg',
    thumbnail: '/templates/wine-bar-scuro-thumb.jpg',
    features: ['Dark theme', 'Mood atmosferico', 'Wine focused', 'Luxury feel'],
    theme: {
      id: 'wine-bar-scuro',
      name: 'Wine Bar Elegante',
      colors: {
        primary: '#7C2D12',
        secondary: '#A16207',
        accent: '#DC2626',
        background: '#1F1F1F',
        surface: '#2D2D2D',
        text: '#F5F5F5',
        textSecondary: '#A3A3A3',
        border: '#404040',
        success: '#16A34A',
        warning: '#CA8A04',
        error: '#DC2626'
      },
      fonts: {
        heading: {
          family: 'Cormorant Garamond',
          weights: [400, 600, 700],
          fallback: ['Georgia', 'serif'],
          source: 'google'
        },
        body: {
          family: 'Source Sans Pro',
          weights: [400, 600],
          fallback: ['-apple-system', 'sans-serif'],
          source: 'google'
        },
        accent: {
          family: 'Great Vibes',
          weights: [400],
          fallback: ['cursive'],
          source: 'google'
        }
      },
      spacing: {
        section: '120px',
        container: '1300px',
        element: '24px'
      },
      borderRadius: {
        small: '2px',
        medium: '6px',
        large: '12px',
        card: '8px'
      },
      shadows: {
        small: '0 2px 8px rgba(0,0,0,0.3)',
        medium: '0 8px 32px rgba(0,0,0,0.4)',
        large: '0 24px 48px rgba(0,0,0,0.5)',
        card: '0 4px 16px rgba(124,45,18,0.2)'
      },
      animations: {
        duration: '400ms',
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        hover: 'all 0.4s ease'
      }
    },
    layout: {
      style: 'bold',
      navigation: 'overlay',
      hero: 'fullscreen',
      sections: 'fullwidth',
      footer: 'minimal'
    },
    sections: [
      { type: 'hero', required: true, defaultEnabled: true, style: 'dark', data: {} },
      { type: 'about', required: false, defaultEnabled: false, style: 'intimate', data: {} },
      { type: 'menu', required: true, defaultEnabled: true, style: 'wine', data: {} },
      { type: 'gallery', required: false, defaultEnabled: true, style: 'dark', data: {} },
      { type: 'events', required: false, defaultEnabled: true, style: 'exclusive', data: {} },
      { type: 'contact', required: true, defaultEnabled: true, style: 'dark', data: {} }
    ]
  },

  {
    id: 'cafe-nordico',
    name: 'Café Nordico',
    description: 'Design scandinavo minimalista per caffetterie e bistrot',
    category: 'cafe',
    preview: '/templates/cafe-nordico-preview.jpg',
    thumbnail: '/templates/cafe-nordico-thumb.jpg',
    features: ['Stile nordico', 'Palette naturale', 'Spazi ariosi', 'Focus sostenibilità'],
    theme: {
      id: 'cafe-nordico',
      name: 'Café Nordico',
      colors: {
        primary: '#4F7942',
        secondary: '#8B9578',
        accent: '#D4AF37',
        background: '#FEFEFE',
        surface: '#F7F7F5',
        text: '#2E3E30',
        textSecondary: '#5C6B5D',
        border: '#E8E8E6',
        success: '#52C41A',
        warning: '#FAAD14',
        error: '#F5222D'
      },
      fonts: {
        heading: {
          family: 'Nunito Sans',
          weights: [600, 700, 800],
          fallback: ['-apple-system', 'sans-serif'],
          source: 'google'
        },
        body: {
          family: 'Source Sans Pro',
          weights: [400, 600],
          fallback: ['-apple-system', 'sans-serif'],
          source: 'google'
        },
        accent: {
          family: 'Caveat',
          weights: [400, 700],
          fallback: ['cursive'],
          source: 'google'
        }
      },
      spacing: {
        section: '90px',
        container: '1150px',
        element: '18px'
      },
      borderRadius: {
        small: '8px',
        medium: '16px',
        large: '24px',
        card: '20px'
      },
      shadows: {
        small: '0 1px 3px rgba(79,121,66,0.1)',
        medium: '0 4px 12px rgba(79,121,66,0.15)',
        large: '0 12px 24px rgba(79,121,66,0.2)',
        card: '0 2px 8px rgba(79,121,66,0.08)'
      },
      animations: {
        duration: '250ms',
        easing: 'ease-out',
        hover: 'transform 0.25s ease'
      }
    },
    layout: {
      style: 'minimal',
      navigation: 'minimal',
      hero: 'medium',
      sections: 'mixed',
      footer: 'simple'
    },
    sections: [
      { type: 'hero', required: true, defaultEnabled: true, style: 'natural', data: {} },
      { type: 'about', required: false, defaultEnabled: true, style: 'sustainable', data: {} },
      { type: 'menu', required: true, defaultEnabled: true, style: 'minimal', data: {} },
      { type: 'gallery', required: false, defaultEnabled: true, style: 'clean', data: {} },
      { type: 'contact', required: true, defaultEnabled: true, style: 'nordic', data: {} }
    ]
  },

  {
    id: 'fast-food-vibrante',
    name: 'Fast Food Vibrante',
    description: 'Design energico e colorato per fast food e street food',
    category: 'fast-food',
    preview: '/templates/fast-food-vibrante-preview.jpg',
    thumbnail: '/templates/fast-food-vibrante-thumb.jpg',
    features: ['Colori vivaci', 'Design playful', 'Mobile first', 'Call-to-action forti'],
    theme: {
      id: 'fast-food-vibrante',
      name: 'Fast Food Vibrante',
      colors: {
        primary: '#FF6B35',
        secondary: '#F7931E',
        accent: '#FFD23F',
        background: '#FFFFFF',
        surface: '#FFF9F5',
        text: '#2D3748',
        textSecondary: '#4A5568',
        border: '#E2E8F0',
        success: '#48BB78',
        warning: '#ED8936',
        error: '#F56565'
      },
      fonts: {
        heading: {
          family: 'Poppins',
          weights: [600, 700, 800],
          fallback: ['-apple-system', 'sans-serif'],
          source: 'google'
        },
        body: {
          family: 'Inter',
          weights: [400, 500, 600],
          fallback: ['-apple-system', 'sans-serif'],
          source: 'google'
        },
        accent: {
          family: 'Fredoka One',
          weights: [400],
          fallback: ['cursive'],
          source: 'google'
        }
      },
      spacing: {
        section: '60px',
        container: '1200px',
        element: '16px'
      },
      borderRadius: {
        small: '8px',
        medium: '16px',
        large: '32px',
        card: '20px'
      },
      shadows: {
        small: '0 2px 4px rgba(255,107,53,0.1)',
        medium: '0 8px 16px rgba(255,107,53,0.15)',
        large: '0 16px 32px rgba(255,107,53,0.2)',
        card: '0 4px 16px rgba(255,107,53,0.12)'
      },
      animations: {
        duration: '200ms',
        easing: 'ease-out',
        hover: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    },
    layout: {
      style: 'bold',
      navigation: 'horizontal',
      hero: 'large',
      sections: 'mixed',
      footer: 'simple'
    },
    sections: [
      { type: 'hero', required: true, defaultEnabled: true, style: 'energetic', data: {} },
      { type: 'about', required: false, defaultEnabled: false, style: 'fun', data: {} },
      { type: 'menu', required: true, defaultEnabled: true, style: 'colorful', data: {} },
      { type: 'gallery', required: false, defaultEnabled: true, style: 'dynamic', data: {} },
      { type: 'contact', required: true, defaultEnabled: true, style: 'vibrant', data: {} }
    ]
  }
];