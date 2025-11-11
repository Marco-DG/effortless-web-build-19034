import React from 'react';
import { Project } from '../../types';
import { PreviewLayout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { ensureGoogleFontLoaded } from '@/lib/fonts';

interface SitePreviewProps {
  project: Project;
}

export const SitePreview: React.FC<SitePreviewProps> = ({ project }) => {
  const sections = project.data.site.sections || [];
  const enabledSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  const theme = project.data.site.theme;

  // Applica stili CSS custom per il tema e carica font
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Applica colori
    if (theme?.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--theme-${key}`, value);
      });
    }
    
    // Carica e applica font
    if (theme?.fontPrimary) {
      ensureGoogleFontLoaded(theme.fontPrimary);
      root.style.setProperty('--theme-font-primary', theme.fontPrimary);
    }
    
    if (theme?.fontSecondary) {
      ensureGoogleFontLoaded(theme.fontSecondary);
      root.style.setProperty('--theme-font-secondary', theme.fontSecondary);
    }
    
    // Cleanup
    return () => {
      Object.keys(theme?.colors || {}).forEach(key => {
        root.style.removeProperty(`--theme-${key}`);
      });
      root.style.removeProperty('--theme-font-primary');
      root.style.removeProperty('--theme-font-secondary');
    };
  }, [theme]);

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection key={section.id} data={section.data} theme={theme} project={project} />;
      case 'about':
        return <AboutSection key={section.id} data={section.data} theme={theme} />;
      case 'menu':
        return <MenuSection key={section.id} data={section.data} theme={theme} project={project} />;
      case 'features':
        return <FeaturesSection key={section.id} data={section.data} theme={theme} />;
      case 'gallery':
        return <GallerySection key={section.id} data={section.data} theme={theme} />;
      case 'reviews':
        return <ReviewsSection key={section.id} data={section.data} theme={theme} />;
      case 'events':
        return <EventsSection key={section.id} data={section.data} theme={theme} />;
      case 'delivery':
        return <DeliverySection key={section.id} data={section.data} theme={theme} />;
      case 'contact':
        return <ContactSection key={section.id} data={section.data} theme={theme} project={project} />;
      case 'hours':
        return <HoursSection key={section.id} data={section.data} theme={theme} project={project} />;
      case 'location':
        return <LocationSection key={section.id} data={section.data} theme={theme} project={project} />;
      case 'newsletter':
        return <NewsletterSection key={section.id} data={section.data} theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <PreviewLayout mode="site">
      <div className="h-full overflow-y-auto">
        <div className="min-h-full bg-white">
          {enabledSections.length === 0 ? (
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="text-lg font-semibold">Nessuna sezione attiva</h3>
                <p className="text-muted-foreground max-w-sm">
                  Aggiungi sezioni dal Site Builder per vedere l'anteprima del tuo sito
                </p>
              </div>
            </div>
          ) : (
            <>
              {enabledSections.map(renderSection)}
              
              {/* Footer automatico */}
              <footer 
                className="py-8 px-6 text-center text-white"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <p>© 2024 {project.data.business.name}. Tutti i diritti riservati.</p>
              </footer>
            </>
          )}
        </div>
      </div>
    </PreviewLayout>
  );
};

// Hero Section Component
const HeroSection: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => {
  const getBackgroundStyle = () => {
    switch (data.style) {
      case 'image-background':
        return {
          backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.secondary}10)`
        };
      case 'video-background':
        return {
          backgroundColor: theme.colors.primary + '10'
        };
      default:
        return {};
    }
  };

  const textAlign = data.alignment === 'center' ? 'text-center' : 
                   data.alignment === 'right' ? 'text-right' : 'text-left';

  return (
    <section 
      className={`py-20 px-6 relative min-h-[80vh] flex items-center ${
        data.style === 'image-background' ? 'text-white' : ''
      }`}
      style={getBackgroundStyle()}
    >
      {data.style === 'image-background' && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className={textAlign}>
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ 
              fontFamily: 'var(--theme-font-secondary, Inter)',
              color: data.style === 'image-background' ? 'white' : theme.colors.primary
            }}
          >
            {data.title || project.data.business.name}
          </h1>
          
          {data.subtitle && (
            <p 
              className="text-xl mb-8"
              style={{ 
                fontFamily: 'var(--theme-font-primary, Inter)',
                color: data.style === 'image-background' ? 'rgba(255,255,255,0.9)' : theme.colors.secondary 
              }}
            >
              {data.subtitle}
            </p>
          )}
          
          <p className={`text-lg max-w-2xl mb-8 ${
            data.alignment === 'center' ? 'mx-auto' : ''
          } ${
            data.style === 'image-background' ? 'text-white/80' : 'text-muted-foreground'
          }`}>
            {data.description}
          </p>
          
          {data.ctaText && (
            <Button 
              size="lg"
              style={{ 
                backgroundColor: theme.colors.primary,
                color: 'white'
              }}
              className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              {data.ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection: React.FC<{ data: any; theme: any }> = ({ data, theme }) => (
  <section className="py-20 px-6">
    <div className="container mx-auto max-w-6xl">
      <div className={`grid gap-12 items-center ${
        data.imagePosition === 'left' ? 'md:grid-cols-2' :
        data.imagePosition === 'right' ? 'md:grid-cols-2' : 'grid-cols-1'
      }`}>
        {data.imagePosition === 'left' && data.image && (
          <div className="order-1">
            <img src={data.image} alt="About" className="rounded-2xl shadow-lg w-full h-96 object-cover" />
          </div>
        )}
        
        <div className={data.imagePosition === 'left' ? 'order-2' : 'order-1'}>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ 
              fontFamily: 'var(--theme-font-secondary, Inter)',
              color: theme.colors.primary 
            }}
          >
            {data.title}
          </h2>
          
          <div 
            className="text-lg leading-relaxed whitespace-pre-line"
            style={{ 
              fontFamily: 'var(--theme-font-primary, Inter)',
              color: theme.colors.text 
            }}
          >
            {data.content}
          </div>
          
          {data.features && data.features.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 mt-8">
              {data.features.map((feature: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {data.imagePosition === 'right' && data.image && (
          <div className="order-2">
            <img src={data.image} alt="About" className="rounded-2xl shadow-lg w-full h-96 object-cover" />
          </div>
        )}
      </div>
    </div>
  </section>
);

// Menu Section Component  
const MenuSection: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => {
  const menuItems = project.data.menu.items || [];
  const displayItems = data.displayStyle === 'featured' 
    ? menuItems.filter((item: any) => item.featured)
    : data.displayStyle === 'preview'
    ? menuItems.slice(0, 6)
    : menuItems;

  if (menuItems.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.colors.primary }}>
            Menu
          </h2>
          <p className="text-muted-foreground">
            Nessun elemento nel menu. Aggiungi piatti dal Menu Builder.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ 
            fontFamily: 'var(--theme-font-secondary, Inter)',
            color: theme.colors.primary 
          }}
        >
          {project.data.menu.title}
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {displayItems.map((item: any) => (
            <div key={item.id} className="flex justify-between items-start p-4 border-b hover:bg-muted/20 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 
                    className="font-semibold" 
                    style={{ 
                      fontFamily: 'var(--theme-font-primary, Inter)',
                      color: theme.colors.primary 
                    }}
                  >
                    {item.name}
                  </h3>
                  {item.featured && (
                    <Badge className="bg-amber-100 text-amber-800 text-xs">
                      Speciale
                    </Badge>
                  )}
                </div>
                
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
              
              {data.showPrices !== false && (
                <span 
                  className="font-semibold ml-4"
                  style={{ color: theme.colors.secondary }}
                >
                  {item.price}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {data.displayStyle === 'preview' && menuItems.length > 6 && (
          <div className="text-center mt-8">
            <Button 
              variant="outline"
              style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
            >
              Vedi menu completo
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

// Gallery Section Component
const GallerySection: React.FC<{ data: any; theme: any }> = ({ data, theme }) => (
  <section className="py-20 px-6">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ 
            fontFamily: 'var(--theme-font-secondary, Inter)',
            color: theme.colors.primary 
          }}
        >
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-lg text-muted-foreground">{data.subtitle}</p>
        )}
      </div>
      
      {data.images && data.images.length > 0 ? (
        <div className={`grid gap-4 ${
          data.columns === 2 ? 'md:grid-cols-2' :
          data.columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
        }`}>
          {data.images.map((image: any) => (
            <div key={image.id} className="group cursor-pointer">
              <img 
                src={image.url} 
                alt={image.caption || ''}
                className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
              />
              {image.caption && (
                <p className="text-sm text-muted-foreground mt-2">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nessuna immagine nella galleria. Aggiungi foto dal Site Builder.
          </p>
        </div>
      )}
    </div>
  </section>
);

// Contact Section Component
const ContactSection: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => (
  <section className="py-20 px-6 bg-muted/20">
    <div className="container mx-auto max-w-6xl">
      <h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        style={{ 
          fontFamily: 'var(--theme-font-secondary, Inter)',
          color: theme.colors.primary 
        }}
      >
        {data.title || 'Contattaci'}
      </h2>
      
      <div className="grid gap-8 md:grid-cols-3">
        {project.data.contact.address && (
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-4" style={{ color: theme.colors.primary }} />
            <h3 className="font-semibold mb-2">Indirizzo</h3>
            <p className="text-muted-foreground">{project.data.contact.address}</p>
          </div>
        )}
        
        {project.data.contact.phone && (
          <div className="text-center">
            <Phone className="w-8 h-8 mx-auto mb-4" style={{ color: theme.colors.primary }} />
            <h3 className="font-semibold mb-2">Telefono</h3>
            <p className="text-muted-foreground">{project.data.contact.phone}</p>
          </div>
        )}
        
        {project.data.contact.email && (
          <div className="text-center">
            <Mail className="w-8 h-8 mx-auto mb-4" style={{ color: theme.colors.primary }} />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">{project.data.contact.email}</p>
          </div>
        )}
      </div>
    </div>
  </section>
);

// Hours Section Component
const HoursSection: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => (
  <section className="py-20 px-6">
    <div className="container mx-auto max-w-4xl text-center">
      <Clock className="w-12 h-12 mx-auto mb-6" style={{ color: theme.colors.primary }} />
      <h2 
        className="text-3xl font-bold mb-8"
        style={{ 
          fontFamily: 'var(--theme-font-secondary, Inter)',
          color: theme.colors.primary 
        }}
      >
        {data.title || 'Orari di Apertura'}
      </h2>
      
      <div className="max-w-md mx-auto">
        {Object.entries(project.data.hours).map(([day, hours]: [string, any]) => (
          <div key={day} className="flex justify-between py-2 border-b border-border last:border-b-0">
            <span className="font-medium capitalize">{day}</span>
            <span className="text-muted-foreground">
              {hours.closed ? 'Chiuso' : `${hours.open} - ${hours.close}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Newsletter Section Component
const NewsletterSection: React.FC<{ data: any; theme: any }> = ({ data, theme }) => (
  <section 
    className="py-20 px-6 text-white"
    style={{ backgroundColor: theme.colors.primary }}
  >
    <div className="container mx-auto max-w-4xl text-center">
      <h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ fontFamily: 'var(--theme-font-secondary, Inter)' }}
      >
        {data.title}
      </h2>
      {data.subtitle && (
        <p className="text-lg mb-8 opacity-90">{data.subtitle}</p>
      )}
      
      <div className="max-w-md mx-auto flex gap-3">
        <input
          type="email"
          placeholder="La tua email"
          className="flex-1 px-4 py-3 rounded-lg text-black"
        />
        <Button 
          className="bg-white text-black hover:bg-white/90"
        >
          Iscriviti
        </Button>
      </div>
    </div>
  </section>
);

// Placeholder components
const ReviewsSection: React.FC<{ data: any; theme: any }> = ({ data, theme }) => (
  <section className="py-20 px-6">
    <div className="container mx-auto max-w-4xl text-center">
      <Star className="w-12 h-12 mx-auto mb-6" style={{ color: theme.colors.primary }} />
      <h2 
        className="text-3xl font-bold mb-8" 
        style={{ 
          fontFamily: 'var(--theme-font-secondary, Inter)',
          color: theme.colors.primary 
        }}
      >
        {data.title || 'Recensioni'}
      </h2>
      <p className="text-muted-foreground">Sezione recensioni in sviluppo...</p>
    </div>
  </section>
);

const EventsSection: React.FC<{ data: any; theme: any }> = ({ data, theme }) => {
  const events = data.events || [];

  if (events.length === 0) {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Calendar className="w-12 h-12 mx-auto mb-6" style={{ color: theme.colors.primary }} />
          <h2 
            className="text-3xl font-bold mb-8" 
            style={{ 
              fontFamily: 'var(--theme-font-secondary, Inter)',
              color: theme.colors.primary 
            }}
          >
            {data.title || 'Eventi'}
          </h2>
          <p className="text-muted-foreground">Nessun evento programmato al momento.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--theme-font-secondary, Inter)',
              color: theme.colors.primary 
            }}
          >
            {data.title || 'I Nostri Eventi'}
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event: any) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ 
                      fontFamily: 'var(--theme-font-primary, Inter)',
                      color: theme.colors.primary 
                    }}
                  >
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>📅 {new Date(event.date).toLocaleDateString('it-IT')}</span>
                    <span>🕐 {event.time}</span>
                  </div>
                </div>
                <div 
                  className="text-xl font-bold"
                  style={{ color: theme.colors.secondary }}
                >
                  {event.price}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{event.description}</p>
              
              <button 
                className="w-full py-2 px-4 rounded-lg font-medium transition-colors"
                style={{ 
                  backgroundColor: theme.colors.primary, 
                  color: 'white' 
                }}
              >
                Prenota Posto
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC<{ data: any; theme: any }> = ({ data, theme }) => {
  const features = data.features || [];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--theme-font-secondary, Inter)',
              color: theme.colors.primary 
            }}
          >
            {data.title || 'Perché Scegliere Noi'}
          </h2>
          {data.subtitle && (
            <p 
              className="text-lg text-muted-foreground"
              style={{ fontFamily: 'var(--theme-font-primary, Inter)' }}
            >
              {data.subtitle}
            </p>
          )}
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: any) => (
            <div key={feature.id} className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: theme.colors.primary + '10' }}
              >
                {feature.icon}
              </div>
              <h3 
                className="text-lg font-bold mb-2"
                style={{ 
                  fontFamily: 'var(--theme-font-primary, Inter)',
                  color: theme.colors.primary 
                }}
              >
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DeliverySection: React.FC<{ data: any; theme: any }> = ({ data, theme }) => (
  <section className="py-20 px-6" style={{ backgroundColor: theme.colors.primary + '05' }}>
    <div className="container mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <div 
          className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Truck className="w-8 h-8 text-white" />
        </div>
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ 
            fontFamily: 'var(--theme-font-secondary, Inter)',
            color: theme.colors.primary 
          }}
        >
          {data.title || 'Ordina a Domicilio'}
        </h2>
        {data.description && (
          <p 
            className="text-lg text-muted-foreground mb-8"
            style={{ fontFamily: 'var(--theme-font-primary, Inter)' }}
          >
            {data.description}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {data.deliveryZone && (
          <div className="text-center">
            <div className="font-semibold text-lg mb-1" style={{ color: theme.colors.primary }}>
              Zona di Consegna
            </div>
            <div className="text-muted-foreground">{data.deliveryZone}</div>
          </div>
        )}
        {data.deliveryTime && (
          <div className="text-center">
            <div className="font-semibold text-lg mb-1" style={{ color: theme.colors.primary }}>
              Tempo di Consegna
            </div>
            <div className="text-muted-foreground">{data.deliveryTime}</div>
          </div>
        )}
        {data.minimumOrder && (
          <div className="text-center">
            <div className="font-semibold text-lg mb-1" style={{ color: theme.colors.primary }}>
              Ordine Minimo
            </div>
            <div className="text-muted-foreground">{data.minimumOrder}</div>
          </div>
        )}
        {data.deliveryFee && (
          <div className="text-center">
            <div className="font-semibold text-lg mb-1" style={{ color: theme.colors.primary }}>
              Costo Consegna
            </div>
            <div className="text-muted-foreground">{data.deliveryFee}</div>
          </div>
        )}
      </div>

      {data.orderLink && (
        <div className="text-center">
          <Button 
            size="lg"
            className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            style={{ 
              backgroundColor: theme.colors.primary,
              color: 'white'
            }}
          >
            Ordina Ora
          </Button>
        </div>
      )}
    </div>
  </section>
);

const LocationSection: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => (
  <section className="py-20 px-6 bg-muted/20">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ 
            fontFamily: 'var(--theme-font-secondary, Inter)',
            color: theme.colors.primary 
          }}
        >
          {data.title || 'Dove Siamo'}
        </h2>
        {data.description && (
          <p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--theme-font-primary, Inter)' }}
          >
            {data.description}
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <div className="space-y-6">
          {project.data.contact?.address && (
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 mt-1" style={{ color: theme.colors.primary }} />
              <div>
                <h3 className="font-semibold mb-1">Indirizzo</h3>
                <p className="text-muted-foreground whitespace-pre-line">{project.data.contact.address}</p>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {data.parking && (
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 mt-1 flex items-center justify-center text-sm">🚗</div>
                <div>
                  <h3 className="font-semibold mb-1">Parcheggio</h3>
                  <p className="text-muted-foreground capitalize">{data.parking}</p>
                </div>
              </div>
            )}

            {data.publicTransport && (
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 mt-1 flex items-center justify-center text-sm">🚌</div>
                <div>
                  <h3 className="font-semibold mb-1">Trasporti</h3>
                  <p className="text-muted-foreground">{data.publicTransport}</p>
                </div>
              </div>
            )}
          </div>

          {data.mapLink && (
            <div className="pt-4">
              <Button 
                variant="outline"
                style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
              >
                Apri in Google Maps
              </Button>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          {data.mapEmbed ? (
            <div 
              className="w-full h-80 rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: data.mapEmbed }}
            />
          ) : (
            <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p>Mappa non configurata</p>
                <p className="text-sm">Aggiungi l'iframe di Google Maps nell'editor</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);