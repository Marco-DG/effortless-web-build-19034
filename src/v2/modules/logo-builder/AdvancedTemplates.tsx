// Template avanzati stile Canva per loghi professionali

export interface AdvancedLogoElement {
  id: string;
  type: 'text' | 'shape' | 'icon' | 'image' | 'decoration';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  style: {
    // Text properties
    content?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    textAlign?: string;
    letterSpacing?: number;
    textTransform?: string;
    
    // Shape properties
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    
    // Effects
    opacity?: number;
    boxShadow?: string;
    background?: string; // for gradients
    filter?: string; // for blur, etc.
    
    // Icon/Shape specific
    iconType?: string;
    strokeWidth?: number;
    fill?: string;
  };
}

export interface AdvancedLogoTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  canvasSize: { width: number; height: number };
  elements: AdvancedLogoElement[];
  placeholders: { [key: string]: string }; // Replacement tokens
}

export const ADVANCED_LOGO_TEMPLATES: AdvancedLogoTemplate[] = [
  {
    id: 'wine-bar-luxury',
    name: 'Wine Bar Lussuoso',
    category: 'Wine & Bar',
    description: 'Design elegante con ornamenti dorati e tipografia raffinata',
    preview: '/api/placeholder/400/200',
    canvasSize: { width: 600, height: 300 },
    placeholders: {
      '{BUSINESS_NAME}': 'OSTERIA',
      '{TAGLINE}': 'del borgo',
      '{YEAR}': '1962'
    },
    elements: [
      // Background gradient circle
      {
        id: 'bg-circle',
        type: 'shape',
        x: 200,
        y: 50,
        width: 200,
        height: 200,
        rotation: 0,
        zIndex: 0,
        style: {
          borderRadius: 100,
          background: 'radial-gradient(circle, rgba(218, 185, 155, 0.1) 0%, rgba(42, 26, 29, 0.05) 100%)',
          opacity: 0.8
        }
      },
      // Ornament top
      {
        id: 'ornament-top',
        type: 'decoration',
        x: 260,
        y: 70,
        width: 80,
        height: 20,
        rotation: 0,
        zIndex: 1,
        style: {
          iconType: 'floral-ornament',
          fill: '#d9b99b',
          opacity: 0.7
        }
      },
      // Main title
      {
        id: 'main-title',
        type: 'text',
        x: 150,
        y: 110,
        width: 300,
        height: 60,
        rotation: 0,
        zIndex: 2,
        style: {
          content: '{BUSINESS_NAME}',
          fontFamily: 'Playfair Display',
          fontSize: 42,
          fontWeight: '700',
          color: '#2a1a1d',
          textAlign: 'center',
          letterSpacing: 4,
          textTransform: 'uppercase'
        }
      },
      // Subtitle with decorative line
      {
        id: 'subtitle',
        type: 'text',
        x: 200,
        y: 180,
        width: 200,
        height: 25,
        rotation: 0,
        zIndex: 2,
        style: {
          content: '{TAGLINE}',
          fontFamily: 'Cormorant Garamond',
          fontSize: 18,
          fontWeight: '400',
          color: '#6b3a2e',
          textAlign: 'center',
          letterSpacing: 3,
          fontStyle: 'italic'
        }
      },
      // Decorative line under
      {
        id: 'dec-line',
        type: 'shape',
        x: 225,
        y: 210,
        width: 150,
        height: 2,
        rotation: 0,
        zIndex: 1,
        style: {
          backgroundColor: '#d9b99b',
          borderRadius: 1
        }
      },
      // Year badge
      {
        id: 'year-badge',
        type: 'text',
        x: 270,
        y: 225,
        width: 60,
        height: 20,
        rotation: 0,
        zIndex: 2,
        style: {
          content: 'EST. {YEAR}',
          fontFamily: 'Inter',
          fontSize: 10,
          fontWeight: '500',
          color: '#6b3a2e',
          textAlign: 'center',
          letterSpacing: 1
        }
      }
    ]
  },
  
  {
    id: 'restaurant-modern-geometric',
    name: 'Ristorante Geometrico Moderno',
    category: 'Ristorante',
    description: 'Design contemporaneo con forme geometriche e tipografia bold',
    preview: '/api/placeholder/400/200',
    canvasSize: { width: 600, height: 300 },
    placeholders: {
      '{BUSINESS_NAME}': 'FUSION',
      '{TAGLINE}': 'KITCHEN'
    },
    elements: [
      // Geometric shape 1
      {
        id: 'geo-shape-1',
        type: 'shape',
        x: 50,
        y: 80,
        width: 80,
        height: 80,
        rotation: 45,
        zIndex: 0,
        style: {
          backgroundColor: '#e74c3c',
          borderRadius: 0,
          opacity: 0.9
        }
      },
      // Geometric shape 2
      {
        id: 'geo-shape-2',
        type: 'shape',
        x: 470,
        y: 140,
        width: 60,
        height: 60,
        rotation: 0,
        zIndex: 0,
        style: {
          borderColor: '#3498db',
          borderWidth: 4,
          backgroundColor: 'transparent',
          borderRadius: 30,
          opacity: 0.7
        }
      },
      // Main title split
      {
        id: 'title-part-1',
        type: 'text',
        x: 150,
        y: 100,
        width: 150,
        height: 50,
        rotation: 0,
        zIndex: 2,
        style: {
          content: '{BUSINESS_NAME}',
          fontFamily: 'Montserrat',
          fontSize: 48,
          fontWeight: '900',
          color: '#2c3e50',
          textAlign: 'left',
          letterSpacing: -1,
          textTransform: 'uppercase'
        }
      },
      {
        id: 'title-part-2',
        type: 'text',
        x: 300,
        y: 150,
        width: 150,
        height: 30,
        rotation: 0,
        zIndex: 2,
        style: {
          content: '{TAGLINE}',
          fontFamily: 'Montserrat',
          fontSize: 24,
          fontWeight: '300',
          color: '#7f8c8d',
          textAlign: 'left',
          letterSpacing: 2,
          textTransform: 'uppercase'
        }
      },
      // Accent line
      {
        id: 'accent-line',
        type: 'shape',
        x: 150,
        y: 185,
        width: 200,
        height: 4,
        rotation: -2,
        zIndex: 1,
        style: {
          background: 'linear-gradient(90deg, #e74c3c 0%, #3498db 100%)',
          borderRadius: 2
        }
      }
    ]
  },

  {
    id: 'bistro-vintage-badge',
    name: 'Bistrot Badge Vintage',
    category: 'Bistrot',
    description: 'Badge circolare vintage con elementi decorativi e tipografia classica',
    preview: '/api/placeholder/400/200',
    canvasSize: { width: 400, height: 400 },
    placeholders: {
      '{BUSINESS_NAME}': 'BISTROT',
      '{LOCATION}': 'ROMA',
      '{YEAR}': '1962'
    },
    elements: [
      // Outer circle
      {
        id: 'outer-circle',
        type: 'shape',
        x: 50,
        y: 50,
        width: 300,
        height: 300,
        rotation: 0,
        zIndex: 0,
        style: {
          borderColor: '#8b4513',
          borderWidth: 6,
          backgroundColor: 'transparent',
          borderRadius: 150
        }
      },
      // Inner circle
      {
        id: 'inner-circle',
        type: 'shape',
        x: 70,
        y: 70,
        width: 260,
        height: 260,
        rotation: 0,
        zIndex: 0,
        style: {
          borderColor: '#8b4513',
          borderWidth: 2,
          backgroundColor: 'rgba(139, 69, 19, 0.05)',
          borderRadius: 130
        }
      },
      // Stars decoration
      {
        id: 'star-left',
        type: 'decoration',
        x: 120,
        y: 120,
        width: 20,
        height: 20,
        rotation: 0,
        zIndex: 1,
        style: {
          iconType: 'star',
          fill: '#d4af37',
          opacity: 0.8
        }
      },
      {
        id: 'star-right',
        type: 'decoration',
        x: 260,
        y: 120,
        width: 20,
        height: 20,
        rotation: 0,
        zIndex: 1,
        style: {
          iconType: 'star',
          fill: '#d4af37',
          opacity: 0.8
        }
      },
      // Main title
      {
        id: 'main-title',
        type: 'text',
        x: 100,
        y: 160,
        width: 200,
        height: 40,
        rotation: 0,
        zIndex: 2,
        style: {
          content: '{BUSINESS_NAME}',
          fontFamily: 'Merriweather',
          fontSize: 36,
          fontWeight: '700',
          color: '#8b4513',
          textAlign: 'center',
          letterSpacing: 2,
          textTransform: 'uppercase'
        }
      },
      // Location
      {
        id: 'location',
        type: 'text',
        x: 100,
        y: 210,
        width: 200,
        height: 20,
        rotation: 0,
        zIndex: 2,
        style: {
          content: '{LOCATION}',
          fontFamily: 'Inter',
          fontSize: 14,
          fontWeight: '400',
          color: '#8b4513',
          textAlign: 'center',
          letterSpacing: 3,
          textTransform: 'uppercase'
        }
      },
      // Year banner
      {
        id: 'year-banner',
        type: 'shape',
        x: 150,
        y: 250,
        width: 100,
        height: 30,
        rotation: 0,
        zIndex: 1,
        style: {
          backgroundColor: '#8b4513',
          borderRadius: 15
        }
      },
      {
        id: 'year-text',
        type: 'text',
        x: 150,
        y: 257,
        width: 100,
        height: 16,
        rotation: 0,
        zIndex: 2,
        style: {
          content: 'EST. {YEAR}',
          fontFamily: 'Inter',
          fontSize: 12,
          fontWeight: '600',
          color: '#ffffff',
          textAlign: 'center',
          letterSpacing: 1
        }
      }
    ]
  },

  {
    id: 'pizzeria-script-creative',
    name: 'Pizzeria Script Creativo',
    category: 'Pizzeria',
    description: 'Design dinamico con script handwriting e elementi italiani',
    preview: '/api/placeholder/400/200',
    canvasSize: { width: 650, height: 350 },
    placeholders: {
      '{BUSINESS_NAME}': 'Bella Napoli',
      '{TAGLINE}': 'Autentica Pizzeria',
      '{ACCENT}': 'dal 1975'
    },
    elements: [
      // Pizza slice decoration
      {
        id: 'pizza-slice',
        type: 'decoration',
        x: 450,
        y: 50,
        width: 120,
        height: 120,
        rotation: -15,
        zIndex: 0,
        style: {
          iconType: 'pizza-slice',
          fill: '#ff6b6b',
          opacity: 0.1
        }
      },
      // Main script title
      {
        id: 'script-title',
        type: 'text',
        x: 50,
        y: 120,
        width: 400,
        height: 80,
        rotation: -3,
        zIndex: 2,
        style: {
          content: '{BUSINESS_NAME}',
          fontFamily: 'Dancing Script',
          fontSize: 64,
          fontWeight: '700',
          color: '#c0392b',
          textAlign: 'left',
          letterSpacing: 0
        }
      },
      // Subtitle with underline
      {
        id: 'subtitle',
        type: 'text',
        x: 100,
        y: 200,
        width: 300,
        height: 30,
        rotation: 0,
        zIndex: 2,
        style: {
          content: '{TAGLINE}',
          fontFamily: 'Inter',
          fontSize: 18,
          fontWeight: '400',
          color: '#2c3e50',
          textAlign: 'left',
          letterSpacing: 2,
          textTransform: 'uppercase'
        }
      },
      // Hand-drawn underline
      {
        id: 'underline',
        type: 'decoration',
        x: 100,
        y: 235,
        width: 180,
        height: 8,
        rotation: 1,
        zIndex: 1,
        style: {
          iconType: 'hand-underline',
          fill: '#f39c12',
          opacity: 0.8
        }
      },
      // Small accent text
      {
        id: 'accent-text',
        type: 'text',
        x: 300,
        y: 250,
        width: 100,
        height: 20,
        rotation: -8,
        zIndex: 2,
        style: {
          content: '{ACCENT}',
          fontFamily: 'Dancing Script',
          fontSize: 16,
          fontWeight: '400',
          color: '#27ae60',
          textAlign: 'center',
          letterSpacing: 0
        }
      },
      // Italian flag colors
      {
        id: 'flag-green',
        type: 'shape',
        x: 30,
        y: 100,
        width: 8,
        height: 80,
        rotation: 0,
        zIndex: 1,
        style: {
          backgroundColor: '#27ae60',
          borderRadius: 4
        }
      },
      {
        id: 'flag-red',
        type: 'shape',
        x: 30,
        y: 180,
        width: 8,
        height: 80,
        rotation: 0,
        zIndex: 1,
        style: {
          backgroundColor: '#e74c3c',
          borderRadius: 4
        }
      }
    ]
  }
];

// Funzione per rimpiazzare i placeholder con dati reali
export const processTemplate = (template: AdvancedLogoTemplate, businessName: string, extraData?: any): AdvancedLogoTemplate => {
  const processedElements = template.elements.map(element => {
    if (element.type === 'text' && element.style.content) {
      let content = element.style.content;
      
      // Replace standard placeholders
      content = content.replace('{BUSINESS_NAME}', businessName.toUpperCase());
      content = content.replace('{TAGLINE}', extraData?.tagline || 'del borgo');
      content = content.replace('{YEAR}', extraData?.year || '1962');
      content = content.replace('{LOCATION}', extraData?.location || 'ROMA');
      content = content.replace('{ACCENT}', extraData?.accent || 'dal 1975');
      
      return {
        ...element,
        style: {
          ...element.style,
          content
        }
      };
    }
    return element;
  });

  return {
    ...template,
    elements: processedElements
  };
};