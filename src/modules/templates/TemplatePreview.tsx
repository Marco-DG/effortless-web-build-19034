import React from 'react';
import { Template } from './types';
import { PreviewLayout } from '../../ui/Layout';

interface TemplatePreviewProps {
  template: Template;
  projectData?: any;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ 
  template, 
  projectData 
}) => {
  const theme = template.theme;
  
  // Dati di esempio se non ci sono dati del progetto
  const mockData = {
    business: {
      name: 'Ristorante Template',
      tagline: 'La nostra passione per il buon cibo',
      description: 'Benvenuti nel nostro ristorante dove tradizione e innovazione si incontrano per creare un\'esperienza culinaria unica.'
    },
    menu: {
      title: 'Il Nostro Menu',
      items: [
        {
          id: '1',
          name: 'Spaghetti alla Carbonara',
          description: 'Pasta fresca con guanciale, uova e pecorino romano',
          price: '€14,00',
          category: 'primi',
          featured: true
        },
        {
          id: '2',
          name: 'Tagliata di Manzo',
          description: 'Carne di alta qualità servita con rucola e grana',
          price: '€22,00',
          category: 'secondi',
          featured: false
        }
      ]
    },
    contact: {
      address: 'Via Roma 123, Milano',
      phone: '+39 02 1234567',
      email: 'info@ristorante.it'
    }
  };

  const data = projectData || mockData;

  return (
    <PreviewLayout mode="site">
      <div 
        className="h-full overflow-y-auto"
        style={{
          '--primary': theme.colors.primary,
          '--secondary': theme.colors.secondary,
          '--accent': theme.colors.accent,
          '--background': theme.colors.background,
          '--surface': theme.colors.surface,
          '--text': theme.colors.text,
          '--text-secondary': theme.colors.textSecondary,
          '--border': theme.colors.border
        } as React.CSSProperties}
      >
        <div className="min-h-full" style={{ backgroundColor: theme.colors.background }}>
          {/* Template Hero Preview */}
          <TemplateHeroPreview template={template} data={data} />
          
          {/* Template About Preview */}
          {template.sections.some(s => s.type === 'about' && s.defaultEnabled) && (
            <TemplateAboutPreview template={template} data={data} />
          )}
          
          {/* Template Menu Preview */}
          {template.sections.some(s => s.type === 'menu' && s.defaultEnabled) && (
            <TemplateMenuPreview template={template} data={data} />
          )}
          
          {/* Template Footer */}
          <TemplateFooterPreview template={template} data={data} />
        </div>
      </div>
    </PreviewLayout>
  );
};

// Hero Preview Component
const TemplateHeroPreview: React.FC<{ template: Template; data: any }> = ({ template, data }) => {
  const theme = template.theme;
  const heroConfig = template.sections.find(s => s.type === 'hero');
  
  const getHeroStyle = () => {
    switch (template.layout.hero) {
      case 'fullscreen':
        return 'min-h-screen';
      case 'large':
        return 'min-h-[80vh]';
      case 'medium':
        return 'min-h-[60vh]';
      case 'compact':
        return 'min-h-[40vh]';
      default:
        return 'min-h-[70vh]';
    }
  };

  const getBackgroundStyle = () => {
    switch (heroConfig?.style) {
      case 'luxury':
      case 'dark':
        return {
          background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}30)`,
          position: 'relative' as const
        };
      case 'warm':
        return {
          background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.accent}10)`,
        };
      case 'natural':
        return {
          backgroundColor: theme.colors.surface,
        };
      default:
        return {
          background: `linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.secondary}10)`,
        };
    }
  };

  return (
    <section 
      className={`${getHeroStyle()} flex items-center justify-center px-6 py-20`}
      style={getBackgroundStyle()}
    >
      <div className="container mx-auto text-center" style={{ maxWidth: theme.spacing.container }}>
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          style={{ 
            fontFamily: theme.fonts.heading.family,
            color: theme.colors.primary,
            letterSpacing: '-0.02em'
          }}
        >
          {data.business.name}
        </h1>
        
        <p 
          className="text-lg md:text-xl lg:text-2xl mb-8"
          style={{ 
            fontFamily: theme.fonts.accent.family,
            color: theme.colors.secondary 
          }}
        >
          {data.business.tagline}
        </p>
        
        <p 
          className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ 
            fontFamily: theme.fonts.body.family,
            color: theme.colors.textSecondary 
          }}
        >
          {data.business.description}
        </p>
        
        <button
          className="inline-flex items-center px-8 py-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          style={{ 
            backgroundColor: theme.colors.primary,
            fontFamily: theme.fonts.body.family,
            transition: theme.animations.hover
          }}
        >
          Scopri il Menu
        </button>
      </div>
    </section>
  );
};

// About Preview Component
const TemplateAboutPreview: React.FC<{ template: Template; data: any }> = ({ template, data }) => {
  const theme = template.theme;
  
  return (
    <section 
      className="py-20 px-6"
      style={{ backgroundColor: theme.colors.surface }}
    >
      <div className="container mx-auto" style={{ maxWidth: theme.spacing.container }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                fontFamily: theme.fonts.heading.family,
                color: theme.colors.primary 
              }}
            >
              La Nostra Storia
            </h2>
            
            <p 
              className="text-lg leading-relaxed mb-6"
              style={{ 
                fontFamily: theme.fonts.body.family,
                color: theme.colors.text 
              }}
            >
              Da tre generazioni portiamo avanti la tradizione culinaria di famiglia. 
              Ogni piatto è preparato con ingredienti freschi e locali, seguendo ricette 
              tramandate nel tempo ma con un tocco di innovazione contemporanea.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Ingredienti Freschi', 'Tradizione Familiare', 'Innovazione', 'Passione'].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    ✓
                  </div>
                  <span 
                    style={{ 
                      fontFamily: theme.fonts.body.family,
                      color: theme.colors.text,
                      fontWeight: 500
                    }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            className="h-64 md:h-80 rounded-xl shadow-lg"
            style={{ 
              backgroundColor: theme.colors.accent + '20',
              borderRadius: theme.borderRadius.large 
            }}
          />
        </div>
      </div>
    </section>
  );
};

// Menu Preview Component
const TemplateMenuPreview: React.FC<{ template: Template; data: any }> = ({ template, data }) => {
  const theme = template.theme;
  
  return (
    <section className="py-20 px-6" style={{ backgroundColor: theme.colors.background }}>
      <div className="container mx-auto" style={{ maxWidth: theme.spacing.container }}>
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ 
            fontFamily: theme.fonts.heading.family,
            color: theme.colors.primary 
          }}
        >
          {data.menu.title}
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {data.menu.items.map((item: any, index: number) => (
            <div 
              key={item.id}
              className="flex justify-between items-start p-6 rounded-xl transition-all duration-200 hover:shadow-lg"
              style={{ 
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.card,
                border: `1px solid ${theme.colors.border}`
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 
                    className="font-semibold text-lg"
                    style={{ 
                      fontFamily: theme.fonts.heading.family,
                      color: theme.colors.primary 
                    }}
                  >
                    {item.name}
                  </h3>
                  {item.featured && (
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: theme.colors.accent + '20',
                        color: theme.colors.accent
                      }}
                    >
                      Speciale
                    </span>
                  )}
                </div>
                
                <p 
                  className="text-sm leading-relaxed"
                  style={{ 
                    fontFamily: theme.fonts.body.family,
                    color: theme.colors.textSecondary 
                  }}
                >
                  {item.description}
                </p>
              </div>
              
              <span 
                className="font-bold text-lg ml-6"
                style={{ 
                  fontFamily: theme.fonts.body.family,
                  color: theme.colors.secondary 
                }}
              >
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Preview Component
const TemplateFooterPreview: React.FC<{ template: Template; data: any }> = ({ template, data }) => {
  const theme = template.theme;
  
  return (
    <footer 
      className="py-8 px-6 text-center"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="container mx-auto" style={{ maxWidth: theme.spacing.container }}>
        <p 
          style={{ 
            fontFamily: theme.fonts.body.family,
            color: 'white',
            opacity: 0.9
          }}
        >
          © 2024 {data.business.name}. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
};