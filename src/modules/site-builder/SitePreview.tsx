import React from 'react';
import { Project } from '../../types';
import { PreviewLayout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
// Badge legacy rimosso - usando inline premium style
import { Calendar, MapPin, Phone, Mail, Clock, Star, Truck, Menu, X, ChefHat, Wine, Camera, Award, Users, Heart, ArrowRight } from 'lucide-react';
import { ensureGoogleFontLoaded } from '@/lib/fonts';
import { MichelinStarTemplate } from './MichelinStarTemplate';

// Fallback component per template non riconosciuti
const FullTemplateSection: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Template non trovato</h1>
        <p className="text-gray-600">Il template selezionato non è disponibile.</p>
      </div>
    </div>
  );
};

interface SitePreviewProps {
  project: Project;
}

export const SitePreview: React.FC<SitePreviewProps> = ({ project }) => {
  const sections = project.data.site.sections || [];
  const enabledSections = sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  // Template completo professionale per ristorante
  const defaultSections = [
    {
      id: 'template_default',
      type: 'template',
      enabled: true,
      order: 0,
      data: {
        templateName: 'Osteria del Borgo',
        style: 'bella_italia'
      }
    }
  ];

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
      case 'template':
        // Verifica quale template usare
        const templateStyle = project.data.site?.template?.style || 'wine_bar';
        
        if (templateStyle === 'michelin_star') {
          return <MichelinStarTemplate key={section.id} data={section.data} theme={theme} project={project} />;
        } else if (templateStyle === 'wine_bar') {
          return <WineBarTemplate key={section.id} data={section.data} theme={theme} project={project} />;
        } else if (templateStyle === 'aegean_pearl') {
          return <AegeanPearlTemplate key={section.id} data={section.data} theme={theme} project={project} />;
        }
        return <FullTemplateSection key={section.id} data={section.data} theme={theme} project={project} />;
      default:
        return null;
    }
  };

  return (
    <PreviewLayout mode="site">
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="min-h-full bg-white">
          {defaultSections.map(renderSection)}
        </div>
      </div>
    </PreviewLayout>
  );
};

// Wine Bar Template - INTEGRATO con il nuovo sistema V2
const WineBarTemplate: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => {
  const [navSolid, setNavSolid] = React.useState(false);
  
  // Usa le sezioni del nuovo sistema site builder
  const siteSections = project.data.site?.sections || [];
  
  // Mapping dei dati dalle sezioni
  const getSectionData = (type: string) => {
    const section = siteSections.find(s => s.type === type);
    return section?.data || {};
  };
  
  // Struttura dati che combina nuovo sistema con fallback 
  const builderData = {
    // Business Info
    businessName: project.data.business?.name || 'Il Tuo Locale',
    businessType: project.data.business?.type || 'restaurant',
    tagline: project.data.business?.tagline || '',
    
    // Logo
    logoUrl: project.data.logo?.url || '',
    logoMode: project.data.logo?.mode || 'text',
    logoText: project.data.logo?.text || project.data.business?.name || 'Il Tuo Locale',
    logoFont: project.data.logo?.font || 'Playfair Display',
    
    // Hero - dal nuovo sistema site builder
    heroSlogan: getSectionData('hero').title || project.data.business?.name || 'Wine, Food & Atmosphere',
    heroDescription: getSectionData('hero').subtitle || getSectionData('hero').description || 'Un luogo dedicato al gusto, tra calici e piccoli piatti.',
    heroImageUrl: getSectionData('hero').imageUrl || 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop',
    
    // About - dal nuovo sistema site builder
    about: {
      heading: getSectionData('about').title || 'La nostra storia',
      text: getSectionData('about').content || 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia.',
      imageUrl: getSectionData('about').image || 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop',
      imagePosition: getSectionData('about').imagePosition || 'left'
    },
    
    // Gallery - dal nuovo sistema site builder
    gallery: getSectionData('gallery').images || [],
    galleryTitle: getSectionData('gallery').title || '',
    gallerySubtitle: getSectionData('gallery').subtitle || '',
    galleryColumns: getSectionData('gallery').columns || 3,
    
    // Newsletter - dal nuovo sistema site builder
    newsletterEnabled: siteSections.find(s => s.type === 'newsletter')?.enabled || false,
    newsletterTitle: getSectionData('newsletter').title || 'Resta Aggiornato',
    newsletterDescription: getSectionData('newsletter').subtitle || 'Iscriviti alla nostra newsletter per ricevere offerte esclusive',
    
    // Contact
    address: project.data.contact?.address || 'Via della Vite 12, Roma',
    phone: project.data.contact?.phone || '+39 02 1234567',
    email: project.data.contact?.email || 'info@winebar.it',
    
    // Menu
    menuItems: project.data.menu?.items || [],
    
    // Settings - ora dal nuovo sistema sections
    sectionsOrder: siteSections
      .filter(s => s.enabled)
      .sort((a, b) => a.order - b.order)
      .map(s => s.type),
    sectionsEnabled: siteSections.reduce((acc, section) => {
      acc[section.type] = section.enabled;
      return acc;
    }, {} as Record<string, boolean>),
    
    // Promo
    promoBanner: project.data.promo || { enabled: false, title: '', description: '', link: '' }
  };

  // Colori ORIGINALI del template Wine Bar
  const templateColors = {
    primary: "#2a1a1d", // deep wine
    secondary: "#6b3a2e", // aged wood
    accent: "#d9b99b", // warm beige
  };

  const applied = builderData.customTheme || templateColors;
  
  // Usa i font dal tema del sito se disponibili
  const siteTheme = project.data.site?.theme || {};
  const siteFonts = siteTheme.fonts || {};
  const headingFont = siteFonts.heading || siteTheme.fontSecondary || "'Playfair Display', serif";
  const subheadingFont = siteFonts.subheading || "'Inter', sans-serif";
  const bodyFont = siteFonts.body || siteTheme.fontPrimary || "'Inter', sans-serif";
  
  const useTextLogo = (builderData.logoMode === "text") && (builderData.logoText || builderData.businessName);
  const logoText = builderData.logoText || builderData.businessName || "Il Tuo Locale";
  const logoFont = builderData.logoFont || headingFont;

  React.useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="w-full bg-[#0f0d0d] text-[#f4f2ef] overflow-y-auto h-full"
      style={{ fontFamily: bodyFont }}
    >
      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          navSolid ? "bg-[#0f0d0d]/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {builderData.logoUrl ? (
              <img
                src={builderData.logoUrl}
                alt={`${builderData.businessName || "Logo"}`}
                className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
              />
            ) : (
              <div
                className="text-lg md:text-xl font-bold truncate"
                style={{ fontFamily: logoFont, color: applied.accent }}
                title={logoText}
              >
                {logoText}
              </div>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {(() => {
              // Usa le sezioni del nuovo sistema per la navigazione
              const navItems = builderData.sectionsOrder.map((sectionType: string) => {
                const labels: Record<string, string> = {
                  hero: 'Home',
                  about: 'Chi Siamo', 
                  menu: 'Menù',
                  gallery: 'Galleria',
                  reviews: 'Recensioni',
                  events: 'Eventi',
                  newsletter: 'Newsletter',
                  location: 'Posizione',
                  contact: 'Contatti'
                };
                return [labels[sectionType] || sectionType, sectionType === 'hero' ? 'home' : sectionType];
              }).filter(([label]) => label);
              
              return navItems.map(([label, key]) => (
                <a
                  key={key as string}
                  href={`#${key}`}
                  onClick={(e)=>{
                    e.preventDefault();
                    document.getElementById(String(key))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`transition-colors hover:opacity-90 text-white/80`}
                  style={{ color: applied.accent }}
                >
                  {label}
                </a>
              ));
            })()}
          </nav>
        </div>
      </header>

      {/* HOME PAGE */}
      <main id="home" className="animate-fade-in scroll-mt-24">
        {/* Dynamic Sections for Home Page */}
        {(() => {
          const components: Record<string, React.ReactNode> = {
            hero: (
              <section
                id="home"
                className="relative min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 scroll-mt-24"
                style={{ backgroundAttachment: "fixed" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.35)), url(${builderData.heroImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative lg:col-span-7 flex items-end lg:items-center p-8 md:p-16">
                  <div className="max-w-2xl">
                    <h1
                      className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]"
                      style={{ fontFamily: headingFont }}
                    >
                      {builderData.heroSlogan || "Wine, Food & Atmosphere"}
                    </h1>
                    <p 
                      className="mt-4 text-lg md:text-2xl text-white/90"
                      style={{ fontFamily: subheadingFont }}
                    >
                      {builderData.heroDescription ||
                        "Un luogo dedicato al gusto, tra calici e piccoli piatti."}
                    </p>
                    <div className="mt-8 flex gap-4">
                      <a
                        href="#menu"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[#0f0d0d] font-semibold"
                        style={{ backgroundColor: applied.accent }}
                      >
                        Scopri il Menu <ArrowRight className="w-4 h-4" />
                      </a>
                      {builderData.reservationLink && (
                        <a
                          href={builderData.reservationLink}
                          target="_blank"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/80 text-white hover:bg-white/10 transition-colors"
                        >
                          Prenota
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="relative lg:col-span-5 hidden lg:block" />
              </section>
            ),
            about: (
              <section id="about" className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12">
                <div className={builderData.about?.imagePosition === 'right' ? 'order-2' : ''}>
                  <img
                    src={builderData.about?.imageUrl || "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop"}
                    alt={builderData.about?.heading}
                    className="w-full h-[420px] object-cover rounded-2xl"
                  />
                </div>
                <div className={`flex items-center ${builderData.about?.imagePosition === 'right' ? 'order-1' : ''}`}>
                  <div>
                    <h3
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{
                        fontFamily: headingFont,
                        color: templateColors.accent,
                      }}
                    >
                      {builderData.about?.heading || "La nostra storia"}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {builderData.about?.text ||
                        "Da tre generazioni portiamo avanti la tradizione culinaria di famiglia."}
                    </p>
                  </div>
                </div>
              </section>
            ),
            menu: (
              <section className="bg-[#151212] py-20">
                <div className="mx-auto max-w-7xl px-6">
                  <div className="flex items-end justify-between mb-10">
                    <h4
                      className="text-2xl md:text-3xl font-bold"
                      style={{ fontFamily: headingFont }}
                    >
                      Assaggi & Calici
                    </h4>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(builderData.menuItems || []).slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-lg">
                            {item.name}
                          </h5>
                          <span className="text-white/70 font-medium">
                            {item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-white/70">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ),
            gallery: (
              <section id="gallery" className="py-20 bg-[#151212]">
                <div className="mx-auto max-w-7xl px-6">
                  {(builderData.galleryTitle || builderData.gallerySubtitle) && (
                    <div className="text-center mb-12">
                      <h3
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{
                          fontFamily: headingFont,
                          color: templateColors.accent,
                        }}
                      >
                        {builderData.galleryTitle || "La Nostra Galleria"}
                      </h3>
                      {builderData.gallerySubtitle && (
                        <p 
                          className="text-white/80 text-lg"
                          style={{ fontFamily: subheadingFont }}
                        >
                          {builderData.gallerySubtitle}
                        </p>
                      )}
                    </div>
                  )}
                  <div className={`grid gap-4 ${
                    builderData.galleryColumns === 2 ? 'md:grid-cols-2' : 
                    builderData.galleryColumns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 
                    'md:grid-cols-3'
                  }`}>
                    {(builderData.gallery || []).map((image: any, index: number) => (
                      <div key={image.id || index} className="relative group overflow-hidden rounded-2xl">
                        <img 
                          src={image.url} 
                          alt={image.caption || image.alt || `Galleria immagine ${index + 1}`}
                          className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-sm">{image.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ),
            newsletter: (
              <section id="newsletter" className="py-20 bg-gradient-to-r from-[#2a1a1d] to-[#1a1a1d]">
                <div className="mx-auto max-w-4xl px-6 text-center">
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{
                      fontFamily: theme?.fonts?.heading || "'Playfair Display', serif",
                      color: templateColors.accent,
                    }}
                  >
                    {builderData.newsletterTitle}
                  </h3>
                  <p 
                    className="text-white/80 text-lg mb-8"
                    style={{ fontFamily: subheadingFont }}
                  >
                    {builderData.newsletterDescription}
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="La tua email"
                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <button
                        className="px-6 py-3 rounded-lg font-semibold transition-colors"
                        style={{ 
                          backgroundColor: templateColors.accent, 
                          color: '#0f0d0d' 
                        }}
                      >
                        Iscriviti
                      </button>
                    </div>
                    <p className="text-xs text-white/60 mt-3">
                      Rispettiamo la tua privacy. Puoi annullare l'iscrizione in qualsiasi momento.
                    </p>
                  </div>
                </div>
              </section>
            ),
            reviews: (() => {
              const siteSections = project.data.site?.sections || [];
              const reviewsSection = siteSections.find((s: any) => s.type === 'reviews');
              const reviewsData = reviewsSection?.data || {};
              const reviews = reviewsData.reviews || [];
              
              if (reviews.length === 0) return null;
              
              return (
                <section id="reviews" className="py-20 bg-[#151212]">
                  <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-12">
                      <h3
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{
                          fontFamily: headingFont,
                          color: templateColors.accent,
                        }}
                      >
                        {reviewsData.title || "Cosa Dicono di Noi"}
                      </h3>
                      {reviewsData.subtitle && (
                        <p 
                          className="text-white/80 text-lg"
                          style={{ fontFamily: subheadingFont }}
                        >
                          {reviewsData.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {reviews.map((review: any) => (
                        <div key={review.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-400"}>
                                  ⭐
                                </span>
                              ))}
                            </div>
                          </div>
                          <p 
                            className="text-white/80 mb-4 italic"
                            style={{ fontFamily: bodyFont }}
                          >
                            "{review.text}"
                          </p>
                          <div className="text-right">
                            <p 
                              className="text-white font-semibold"
                              style={{ fontFamily: subheadingFont }}
                            >
                              — {review.author}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })(),
            events: (() => {
              const siteSections = project.data.site?.sections || [];
              const eventsSection = siteSections.find((s: any) => s.type === 'events');
              const eventsData = eventsSection?.data || {};
              const events = eventsData.events || [];
              
              if (events.length === 0) return null;
              
              return (
                <section id="events" className="py-20 bg-[#0f0d0d]">
                  <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-12">
                      <h3
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{
                          fontFamily: headingFont,
                          color: templateColors.accent,
                        }}
                      >
                        {eventsData.title || "I Nostri Eventi"}
                      </h3>
                      {eventsData.subtitle && (
                        <p 
                          className="text-white/80 text-lg"
                          style={{ fontFamily: subheadingFont }}
                        >
                          {eventsData.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {events.map((event: any) => (
                        <div key={event.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                          {event.image && (
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-48 object-cover"
                            />
                          )}
                          <div className="p-6">
                            <h4 
                              className="text-xl font-bold mb-3"
                              style={{ 
                                fontFamily: headingFont,
                                color: templateColors.accent 
                              }}
                            >
                              {event.title}
                            </h4>
                            <p 
                              className="text-white/80 mb-4"
                              style={{ fontFamily: bodyFont }}
                            >
                              {event.description}
                            </p>
                            <div 
                              className="text-sm text-white/60"
                              style={{ fontFamily: subheadingFont }}
                            >
                              {event.date && (
                                <div className="mb-1">
                                  📅 {new Date(event.date).toLocaleDateString('it-IT')}
                                </div>
                              )}
                              {event.time && (
                                <div>🕒 {event.time}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })(),
            location: (() => {
              const siteSections = project.data.site?.sections || [];
              const locationSection = siteSections.find((s: any) => s.type === 'location');
              const locationData = locationSection?.data || {};
              
              return (
                <section id="location" className="py-20 bg-[#151212]">
                  <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-12">
                      <h3
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{
                          fontFamily: headingFont,
                          color: templateColors.accent,
                        }}
                      >
                        {locationData.title || "Dove Siamo"}
                      </h3>
                      {locationData.subtitle && (
                        <p 
                          className="text-white/80 text-lg"
                          style={{ fontFamily: subheadingFont }}
                        >
                          {locationData.subtitle}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div 
                          className="text-lg mb-4"
                          style={{ fontFamily: bodyFont }}
                        >
                          <div className="flex items-center gap-3 text-white/80">
                            <span>📍</span>
                            <span>{locationData.address || "Via del Borgo 12, 00100 Roma"}</span>
                          </div>
                        </div>
                        
                        {locationData.showDirections && (
                          <div className="mt-6">
                            <a
                              href={locationData.mapUrl || "https://maps.google.com/?q=41.9028,12.4964"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors"
                              style={{ 
                                backgroundColor: templateColors.accent, 
                                color: '#0f0d0d' 
                              }}
                            >
                              🗺️ Ottieni Indicazioni
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {locationData.showMap && (
                        <div className="bg-white/10 rounded-lg h-64 flex items-center justify-center border border-white/20">
                          <div className="text-center text-white/60">
                            <div className="text-4xl mb-2">🗺️</div>
                            <p>Mappa Interattiva</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              );
            })(),
            contact: (
              <section className="mx-auto max-w-4xl px-6 py-16 grid md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: headingFont }}>Contatti</h2>
                  <p className="text-white/80">{builderData.address || "Via della Vite 12, Roma"}</p>
                  <p className="text-white/80">{builderData.phone || "+39 02 1234567"}</p>
                  <p className="text-white/80">{builderData.email || "info@winebar.it"}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <form className="space-y-3 text-sm">
                    <input placeholder="Nome" className="w-full px-3 py-2 rounded bg-black/30 border border-white/10" />
                    <input placeholder="Email" className="w-full px-3 py-2 rounded bg-black/30 border border-white/10" />
                    <textarea placeholder="Messaggio" className="w-full px-3 py-2 rounded bg-black/30 border border-white/10 h-28" />
                    <button className="px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: templateColors.accent, color: "#0f0d0d" }}>Invia</button>
                  </form>
                </div>
              </section>
            ),
          };

          // Usa direttamente l'ordine delle sezioni dal nuovo sistema
          return builderData.sectionsOrder.map((sectionId: string) => 
            components[sectionId] || null
          );
        })()}
      </main>
      
      {/* FOOTER */}
      <footer
        className="text-white py-16 px-6"
        style={{ backgroundColor: templateColors.primary }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo e Info */}
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ fontFamily: headingFont }}
              >
                {builderData.businessName || "Il Tuo Locale"}
              </h3>
              {builderData.tagline && (
                <p 
                  className="text-sm opacity-90 mb-4"
                  style={{ fontFamily: bodyFont }}
                >
                  {builderData.tagline}
                </p>
              )}
              <div className="flex gap-4">
                {project.data.social?.facebook && (
                  <a
                    href={project.data.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {project.data.social?.instagram && (
                  <a
                    href={project.data.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 20.312c-1.357-.107-2.095-.325-2.584-.539-.649-.252-1.112-.553-1.597-1.039-.485-.485-.787-.948-1.039-1.597-.214-.489-.432-1.227-.539-2.584C2.595 13.42 2.55 13.126 2.55 12s.045-1.42.14-2.553c.107-1.357.325-2.095.539-2.584.252-.649.553-1.112 1.039-1.597.485-.485.948-.787 1.597-1.039.489-.214 1.227-.432 2.584-.539C10.58 3.595 10.874 3.55 12 3.55s1.42.045 2.553.14c1.357.107 2.095.325 2.584.539.649.252 1.112.553 1.597 1.039.485.485.787.948 1.039 1.597.214.489.432 1.227.539 2.584.095 1.133.14 1.427.14 2.553s-.045 1.42-.14 2.553c-.107 1.357-.325 2.095-.539 2.584-.252.649-.553 1.112-1.039 1.597-.485.485-.948.787-1.597 1.039-.489.214-1.227.432-2.584.539-1.133.095-1.427.14-2.553.14s-1.42-.045-2.553-.14z"/>
                      <circle cx="12" cy="12" r="3.405"/>
                      <circle cx="15.805" cy="8.195" r="0.796"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Link Rapidi */}
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{ 
                  color: templateColors.accent,
                  fontFamily: subheadingFont
                }}
              >
                Link Rapidi
              </h4>
              <ul 
                className="space-y-2 text-sm"
                style={{ fontFamily: bodyFont }}
              >
                <li>
                  <a 
                    href="#home" 
                    className="hover:opacity-80 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    Home
                  </a>
                </li>
                {builderData.sectionsEnabled.menu && (
                  <li>
                    <a 
                      href="#menu" 
                      className="hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Menu
                    </a>
                  </li>
                )}
                {builderData.sectionsEnabled.about && (
                  <li>
                    <a 
                      href="#about" 
                      className="hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Chi Siamo
                    </a>
                  </li>
                )}
                {builderData.sectionsEnabled.events && (
                  <li>
                    <a 
                      href="#events" 
                      className="hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Eventi
                    </a>
                  </li>
                )}
                {builderData.sectionsEnabled.contact && (
                  <li>
                    <a 
                      href="#contact" 
                      className="hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Contatti
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Contatti */}
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{ 
                  color: templateColors.accent,
                  fontFamily: subheadingFont
                }}
              >
                Contatti
              </h4>
              <ul 
                className="space-y-2 text-sm"
                style={{ fontFamily: bodyFont }}
              >
                {builderData.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{builderData.address}</span>
                  </li>
                )}
                {builderData.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <a 
                      href={`tel:${builderData.phone}`} 
                      className="hover:opacity-80 transition-opacity"
                    >
                      {builderData.phone}
                    </a>
                  </li>
                )}
                {builderData.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`mailto:${builderData.email}`}
                      className="hover:opacity-80 transition-opacity"
                    >
                      {builderData.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Orari di Apertura */}
          {project.data.business?.openingHours && (
            <div className="mb-8 pt-8 border-t border-white/20">
              <h4 
                className="font-semibold mb-4"
                style={{ 
                  color: templateColors.accent,
                  fontFamily: subheadingFont
                }}
              >
                Orari di Apertura
              </h4>
              <div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                style={{ fontFamily: bodyFont }}
              >
                {Object.entries(project.data.business.openingHours).map(([day, hours]: [string, any]) => {
                  const dayLabels: Record<string, string> = {
                    monday: "Lun",
                    tuesday: "Mar",
                    wednesday: "Mer",
                    thursday: "Gio",
                    friday: "Ven",
                    saturday: "Sab",
                    sunday: "Dom",
                  };
                  return (
                    <div key={day}>
                      <span className="font-medium">{dayLabels[day]}: </span>
                      {hours.closed ? (
                        <span className="opacity-75">Chiuso</span>
                      ) : (
                        <span>{hours.open} - {hours.close}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Copyright */}
          <div 
            className="pt-8 border-t border-white/20 text-center text-sm opacity-75"
            style={{ fontFamily: bodyFont }}
          >
            <p>
              © {new Date().getFullYear()} {builderData.businessName || "Il Tuo Locale"}. Tutti i diritti riservati.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#privacy" className="hover:opacity-80 transition-opacity">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#cookie" className="hover:opacity-80 transition-opacity">
                Cookie Policy
              </a>
              <span>•</span>
              <a href="#termini" className="hover:opacity-80 transition-opacity">
                Termini di Servizio
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Aegean Pearl Template - Versione Completa con Defaults Ricchi
const AegeanPearlTemplate: React.FC<{ data: any; theme: any; project: any }> = ({ data, theme, project }) => {
  // Usa i defaults ricchi per Aegean Pearl
  const defaultData = {
    business: {
      name: 'ΚΟΣΤΑΣ Family Restaurant',
      tagline: 'Στην αγκαλιά του Αιγαίου • Dal 1924',
      description: 'Quattro generazioni di tradizione culinaria greca nel cuore di Mykonos'
    },
    story: {
      section_title: 'ΟΙΚΟΓΕΝΕΙΑΚΗ ΙΣΤΟΡΙΑ',
      chef_name: 'Dimitris Kostas - Quarta Generazione',
      story_text: 'La nostra famiglia serve i sapori autentici dell\'Egeo dal 1924. Quello che iniziò come una piccola taverna sul porto di Mykonos, è diventato il custode delle ricette tradizionali delle Cicladi. Ogni piatto racconta la storia di quattro generazioni, dal pescatore Yannis a mio padre Nikos, fino a me che oggi porto avanti questa eredità con orgoglio e rispetto per le nostre radici.',
      chef_image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=600&auto=format&fit=crop'
    },
    menu: {
      menu_sections: [
        {
          name: 'MEZZE TRADIZIONALI',
          price: '€12-19',
          description: 'Le ricette di nonna Maria dalle isole delle Cicladi',
          items: [
            'Dolmades Γιαγιάς • Foglie di vite di Santorini, riso alle erbe selvatiche',
            'Feta Νάξου PDO • Formaggio di capra 18 mesi, miele di timo, olive Kalamata',
            'Taramosalata Αυθεντική • Uova di carpa del Mar Nero, limoni di Sifnos',
            'Tzatziki Κρεμώδες • Yogurt di pecora, cetrioli di Tinos, aneto fresco',
            'Saganaki Φλαμπέ • Kasseri di Metsovo, flambé con ouzo di Mykonos'
          ]
        },
        {
          name: 'DAL MARE DELL\'EGEO',
          price: '€28-52',
          description: 'Pescato quotidianamente dalle nostre barche',
          items: [
            'Psari Αλάτι Μήλου • Branzino in crosta di sale rosa di Milos',
            'Chtapodi Σχάρας • Polpo dell\'Egeo alla griglia, fava di Santorini',
            'Kakavia Ψαρόσουπα • Zuppa del pescatore, 7 pesci dell\'Egeo',
            'Astakos Mykonos • Aragosta locale, grigliata con limone e origano',
            'Barbounia Ταβέρνας • Triglie rosse dell\'Egeo, alla griglia'
          ]
        },
        {
          name: 'DALLA TERRA DELLE CICLADI',
          price: '€22-48',
          description: 'Carni e verdure delle isole greche',
          items: [
            'Arni Μυκονιάτικο • Agnello di Mykonos alle erbe, patate di Naxos',
            'Kokoras Κρασάτο • Gallo alle erbe, vino di Santorini, hilopites',
            'Gemista Νηστήσιμα • Pomodori e peperoni ripieni, riso alle erbe',
            'Moussaka Παραδοσιακή • La ricetta di famiglia dal 1924'
          ]
        }
      ],
      menu_note: 'Tutti i nostri ingredienti provengono dalle isole Cicladi. Allergeni e intolleranze: informaci, adatteremo ogni piatto.'
    },
    gallery: {
      gallery_images: [
        'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop'
      ]
    },
    reviews: {
      testimonials: [
        {
          id: '1',
          name: 'Maria Papadopoulos',
          role: 'Food Blogger - Athens Eats',
          content: 'Finalmente ho trovato l\'anima autentica di Mykonos! Da Kostas si respira ancora la Grecia di una volta, quella delle nonne e delle ricette tramandate. Il polpo alla griglia è una poesia, la feta di Naxos un sogno.',
          rating: 5,
          source: 'Athens Eats'
        },
        {
          id: '2',
          name: 'Alessandro Rossi',
          role: 'Guida Michelin Inspector',
          content: 'Quattro generazioni di tradizione che si sentono in ogni boccone. L\'agnello di Mykonos alle erbe selvatiche è un\'esperienza che va oltre il cibo: è pura autenticità greca.',
          rating: 5,
          source: 'Guida Michelin'
        },
        {
          id: '3',
          name: 'Despina Andreadis',
          role: 'Critica Gastronomica - Kathimerini',
          content: 'Στο Κωστα δεν τρώμε μόνο φαγητό, ζούμε παράδοση. Da Kostas non mangiamo solo cibo, viviamo la tradizione. Un\'oasi di autenticità nel cuore turistico di Mykonos.',
          rating: 5,
          source: 'Kathimerini'
        }
      ]
    },
    events: [
      {
        id: '1',
        title: 'Πανηγύρι Αγίας Παρασκευής',
        description: 'Festa tradizionale greca con musica dal vivo, danze popolari e piatti della tradizione. Come una volta nelle piazze dei paesi. Sarà presente il gruppo folk "Αιγαίο Μέλος" direttamente da Naxos.',
        date: '26 Luglio 2024',
        time: '20:30',
        price: '€45 tutto incluso',
        capacity: '50',
        type: 'Festa Tradizionale'
      },
      {
        id: '2',
        title: 'Μαγειρικό Μάθημα με τη Γιαγιά',
        description: 'Lezione di cucina con nonna Eleni (92 anni!). Impara a preparare i dolmades originali e la vera moussaka. Include degustazione e ricette scritte a mano.',
        date: '15 Agosto 2024',
        time: '16:00',
        price: '€85 persona',
        capacity: '12',
        type: 'Cooking Class'
      },
      {
        id: '3',
        title: 'Ψαρονύχτα στο Λιμάνι',
        description: 'Notte di pesce fresco appena pescato. Accompagnati al porto alle 5 del mattino per vedere il rientro delle barche, poi colazione del pescatore in taverna.',
        date: 'Ogni Sabato',
        time: '05:00',
        price: '€35',
        capacity: '20',
        type: 'Esperienza Marina'
      }
    ]
  };

  // Stato per carousel hero
  const [currentHeroImage, setCurrentHeroImage] = React.useState(0);
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      title: 'Χρυσό ηλιοβασίλεμα',
      subtitle: 'Tramonto dorato su Mykonos'
    },
    {
      url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2070&auto=format&fit=crop',
      title: 'Η αυγή του Αιγαίου',
      subtitle: 'Alba dell\'Egeo dalla nostra terrazza'
    },
    {
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
      title: 'Το σπίτι μας',
      subtitle: 'La nostra taverna dal 1924'
    }
  ];

  // Auto-rotate hero images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0B1426] text-white min-h-screen relative overflow-hidden">
      
      {/* BACKGROUND CINEMATOGRAFICO STRATIFICATO */}
      <div className="fixed inset-0 z-0">
        {/* Layer 1: Video Background Simulato */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `
                linear-gradient(180deg, rgba(11, 20, 38, 0.4) 0%, rgba(11, 20, 38, 0.8) 50%, rgba(11, 20, 38, 0.4) 100%),
                linear-gradient(45deg, rgba(212, 175, 55, 0.1) 0%, transparent 30%, transparent 70%, rgba(212, 175, 55, 0.1) 100%),
                url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop)
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              animation: 'slowZoom 30s ease-in-out infinite alternate'
            }}
          />
        </div>

        {/* Layer 2: Onde Fluide Animate */}
        <div className="absolute inset-0 opacity-40">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="waveGlow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3"/>
                <stop offset="70%" stopColor="#4A90E2" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#0B2447" stopOpacity="0.1"/>
              </radialGradient>
              <radialGradient id="waveGlow2" cx="30%" cy="80%" r="60%">
                <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.4"/>
                <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#0B2447" stopOpacity="0.05"/>
              </radialGradient>
            </defs>
            
            <g className="animate-pulse" style={{animationDuration: '8s'}}>
              <path d="M0,300 Q350,150 700,300 T1400,280 V800 H0 Z" fill="url(#waveGlow1)"/>
            </g>
            <g className="animate-pulse" style={{animationDuration: '12s', animationDelay: '3s'}}>
              <path d="M0,400 Q450,250 900,380 T1400,360 V800 H0 Z" fill="url(#waveGlow2)"/>
            </g>
          </svg>
        </div>

        {/* Layer 3: Particelle Magiche */}
        <div className="absolute inset-0">
          {Array.from({length: 50}).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#4A90E2' : '#F8F9FA',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatMagic ${10 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Layer 4: Gradient Overlay Artistico */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/20 via-transparent to-[#0B2447]/40"></div>
      </div>

      {/* STILI CSS CUSTOM PER ANIMAZIONI */}
      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1.1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(0.5deg); }
          100% { transform: scale(1.1) rotate(0deg); }
        }
        @keyframes floatMagic {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #D4AF37 0%, #F4E19C 50%, #D4AF37 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3), 0 0 60px rgba(74, 144, 226, 0.2);
        }
        .glass-morphism {
          background: rgba(248, 249, 250, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(248, 249, 250, 0.2);
        }
      `}</style>

      {/* Navigation - Autentica Greca con Ornamenti */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 via-blue-50/95 to-white/95 backdrop-blur-md shadow-lg border-b border-blue-200/50">
        {/* Ornamento Greco Superiore */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <path d="M0,10 Q10,0 20,10 Q30,20 40,10" stroke="#f59e0b" strokeWidth="2" fill="none"/>
            <circle cx="20" cy="10" r="3" fill="#f59e0b"/>
          </svg>
        </div>

        <div className="flex items-center justify-between max-w-7xl mx-auto px-8 py-6 relative">
          
          {/* Logo con Ornamento */}
          <div className="flex items-center gap-4">
            {/* Colonna Greca Stilizzata */}
            <div className="hidden lg:block">
              <svg width="32" height="48" viewBox="0 0 32 48" fill="none" className="text-blue-800">
                <rect x="6" y="4" width="20" height="3" fill="currentColor"/>
                <rect x="8" y="7" width="16" height="34" fill="currentColor" opacity="0.8"/>
                <rect x="4" y="41" width="24" height="4" fill="currentColor"/>
                <rect x="2" y="45" width="28" height="3" fill="currentColor"/>
              </svg>
            </div>
            
            <div 
              className="text-4xl font-light tracking-wider text-blue-900 relative"
              style={{ 
                fontFamily: "'Cinzel', serif",
                letterSpacing: '0.15em'
              }}
            >
              ΚΟΣΤΑΣ
              {/* Piccolo ornamento sotto */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <svg width="60" height="8" viewBox="0 0 60 8" fill="none">
                  <path d="M0,4 L15,4 M45,4 L60,4" stroke="#f59e0b" strokeWidth="1"/>
                  <circle cx="30" cy="4" r="2" fill="#f59e0b"/>
                  <path d="M18,4 Q24,1 30,4 Q36,7 42,4" stroke="#0ea5e9" strokeWidth="1" fill="none"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Menu Navigazione con Stile Greco */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Η ΙΣΤΟΡΙΑ ΜΑΣ', href: '#storia', icon: '🏛️' },
              { label: 'ΚΟΥΖΙΝΑ', href: '#menu', icon: '🍇' },
              { label: 'ΤΟ ΝΗΣΙ ΜΑΣ', href: '#gallery', icon: '🌊' },
              { label: 'ΤΑ ΓΕΓΟΝΟΤΑ', href: '#events', icon: '🎭' },
              { label: 'ΕΠΙΚΟΙΝΩΝΙΑ', href: '#contact', icon: '⚓' }
            ].map((item, index) => (
              <a 
                key={index} 
                href={item.href}
                className="group relative py-3 px-4 text-blue-800 hover:text-blue-900 transition-all duration-500 flex items-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.href.replace('#', ''))?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }}
              >
                <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span className="relative text-sm font-light tracking-widest uppercase">
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-gradient-to-r from-blue-900 to-amber-600 group-hover:w-full transition-all duration-500"></span>
                </span>
              </a>
            ))}
          </div>

          {/* Ornamento Destro */}
          <div className="hidden lg:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-600">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M8,12 L16,12 M12,8 L12,16" stroke="currentColor" strokeWidth="1"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
        </div>
        
        {/* Ornamento Greco Inferiore */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg width="100%" height="8" viewBox="0 0 1200 8" fill="none" preserveAspectRatio="none">
            <pattern id="greekBorder" x="0" y="0" width="40" height="8" patternUnits="userSpaceOnUse">
              <path d="M4,4 L12,4 M12,2 L12,6 M16,4 L24,4 M28,4 L36,4" stroke="#0ea5e9" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="8" fill="url(#greekBorder)" opacity="0.6"/>
          </svg>
        </div>
      </nav>

      {/* HERO - CAROUSEL CINEMATOGRAFICO DELL'EGEO */}
      <section className="relative h-screen overflow-hidden">
        
        {/* Carousel Background con Transizioni Magiche */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                index === currentHeroImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 scale-110 transition-transform duration-[25s] ease-out"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(25, 55, 109, 0.4) 0%, rgba(59, 130, 246, 0.2) 40%, rgba(251, 191, 36, 0.25) 100%), url(${image.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center'
                }}
              />
            </div>
          ))}
          
          {/* Sovrapposizioni Artistiche */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-amber-50/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-blue-900/20"></div>
          
          {/* Particelle di Luce come Stelle */}
          <div className="absolute inset-0">
            {Array.from({length: 20}).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-amber-200 rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Indicatori Carousel con Stile Greco */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-4">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroImage(index)}
                className={`relative group transition-all duration-500 ${
                  index === currentHeroImage ? 'scale-125' : 'scale-100 hover:scale-110'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle 
                    cx="8" 
                    cy="8" 
                    r="6" 
                    fill={index === currentHeroImage ? "#f59e0b" : "#ffffff80"}
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                  {index === currentHeroImage && (
                    <circle cx="8" cy="8" r="3" fill="#ffffff" opacity="0.8"/>
                  )}
                </svg>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {heroImages[index].subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-7xl px-8 relative">
            
            {/* Ornamenti Greci Laterali */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-30 hidden xl:block">
              <svg width="120" height="300" viewBox="0 0 120 300" fill="none" className="text-amber-200">
                <path d="M20,50 Q60,20 100,50 Q60,80 20,50" fill="currentColor" opacity="0.3"/>
                <circle cx="60" cy="50" r="8" fill="currentColor"/>
                <path d="M20,150 L100,150 M60,130 L60,170" stroke="currentColor" strokeWidth="2"/>
                <path d="M20,250 Q60,220 100,250 Q60,280 20,250" fill="currentColor" opacity="0.3"/>
                <circle cx="60" cy="250" r="8" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-30 hidden xl:block">
              <svg width="120" height="300" viewBox="0 0 120 300" fill="none" className="text-amber-200">
                <path d="M100,50 Q60,20 20,50 Q60,80 100,50" fill="currentColor" opacity="0.3"/>
                <circle cx="60" cy="50" r="8" fill="currentColor"/>
                <path d="M100,150 L20,150 M60,130 L60,170" stroke="currentColor" strokeWidth="2"/>
                <path d="M100,250 Q60,220 20,250 Q60,280 100,250" fill="currentColor" opacity="0.3"/>
                <circle cx="60" cy="250" r="8" fill="currentColor"/>
              </svg>
            </div>

            {/* Ornamento Superiore con Motivo Marino */}
            <div className="mb-12 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
                  <path d="M0,20 Q50,5 100,20 Q150,35 200,20" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <circle cx="50" cy="20" r="4" fill="#f59e0b" opacity="0.8"/>
                  <circle cx="100" cy="20" r="6" fill="#f59e0b"/>
                  <circle cx="150" cy="20" r="4" fill="#f59e0b" opacity="0.8"/>
                  {/* Delfini stilizzati */}
                  <path d="M30,15 Q35,10 40,15 Q35,20 30,15" fill="#0ea5e9" opacity="0.6"/>
                  <path d="M160,15 Q165,10 170,15 Q165,20 160,15" fill="#0ea5e9" opacity="0.6"/>
                </svg>
              </div>
              
              <div 
                className="text-3xl text-amber-300 font-light tracking-[0.3em] mb-6 relative"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ΠΑΡΑΔΟΣΙΑΚΗ ΚΟΥΖΙΝΑ
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
                    <path d="M0,4 Q30,1 60,4 Q90,7 120,4" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Titolo con Effetti Divini */}
            <div className="mb-16 relative">
              <h1 
                className="text-8xl md:text-9xl font-light leading-[0.85] mb-8 relative"
                style={{ 
                  fontFamily: "'Cinzel', serif",
                  textShadow: '0 8px 32px rgba(30, 58, 138, 0.6), 0 0 100px rgba(251, 191, 36, 0.3)',
                  letterSpacing: '0.05em'
                }}
              >
                <span className="block text-white/95 relative">
                  ΚΟΣΤΑΣ
                  {/* Effetto bagliore */}
                  <span className="absolute inset-0 text-amber-300 animate-pulse opacity-50">ΚΟΣΤΑΣ</span>
                </span>
                <span 
                  className="block text-5xl md:text-6xl text-amber-200 font-light tracking-[0.2em] mt-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {defaultData.business.tagline}
                </span>
              </h1>
              
              {/* Ornamento centrale sotto il titolo */}
              <div className="flex items-center justify-center mb-8">
                <svg width="300" height="30" viewBox="0 0 300 30" fill="none">
                  <path d="M0,15 Q75,5 150,15 Q225,25 300,15" stroke="#f59e0b" strokeWidth="3" fill="none"/>
                  <circle cx="150" cy="15" r="8" fill="#f59e0b"/>
                  <circle cx="75" cy="15" r="4" fill="#0ea5e9" opacity="0.8"/>
                  <circle cx="225" cy="15" r="4" fill="#0ea5e9" opacity="0.8"/>
                  {/* Motivo a onde */}
                  <path d="M50,10 Q55,8 60,10 Q55,12 50,10" fill="#0ea5e9" opacity="0.6"/>
                  <path d="M240,10 Q245,8 250,10 Q245,12 240,10" fill="#0ea5e9" opacity="0.6"/>
                </svg>
              </div>
              
              <div className="max-w-5xl mx-auto">
                <p 
                  className="text-3xl md:text-4xl font-light text-blue-100/95 leading-relaxed italic mb-6"
                  style={{ 
                    fontFamily: "'Playfair Display', serif",
                    textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  "Στην αγκαλιά του Αιγαίου, όπου η παράδοση γίνεται νόστιμη ανάμνηση"
                </p>
                <p 
                  className="text-xl md:text-2xl font-light text-white/85 leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Nell'abbraccio dell'Egeo, dove la tradizione diventa gustoso ricordo
                </p>
              </div>
            </div>

            {/* Call to Action Artistici */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <button 
                  onClick={() => document.getElementById('storia')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="relative flex items-center gap-4 px-12 py-5 bg-white/15 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/25 transition-all duration-700 group"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-300">
                    <path d="M3,3 L21,3 M6,3 L6,21 M18,3 L18,21 M3,21 L21,21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/>
                  </svg>
                  <span 
                    className="text-xl font-light text-white tracking-[0.1em] group-hover:text-amber-100"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    ΓΝΩΡΙΣΤΕ ΤΗΝ ΙΣΤΟΡΙΑ
                  </span>
                </button>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <button 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="relative flex items-center gap-4 px-12 py-5 bg-amber-600/80 hover:bg-amber-500/90 backdrop-blur-md rounded-xl transition-all duration-700 group"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12,2 Q16,6 12,10 Q8,6 12,2" fill="currentColor" opacity="0.8"/>
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12,14 Q16,18 12,22 Q8,18 12,14" fill="currentColor" opacity="0.8"/>
                  </svg>
                  <span 
                    className="text-xl font-light text-white tracking-[0.1em] group-hover:text-amber-100"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Γεύσεις του Αιγαίου
                  </span>
                </button>
              </div>
            </div>

            {/* Informazioni dinamiche sull'immagine */}
            <div className="absolute bottom-20 right-8 bg-black/60 backdrop-blur-md text-white p-4 rounded-lg opacity-80 hidden lg:block">
              <h4 
                className="text-lg font-light mb-1 text-amber-200"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {heroImages[currentHeroImage].title}
              </h4>
              <p className="text-sm opacity-90">
                {heroImages[currentHeroImage].subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-32" viewBox="0 0 1200 120" fill="none">
            <path d="M0,60 C300,20 500,100 600,60 C700,20 900,100 1200,60 V120 H0 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* STORIA DELLA FAMIGLIA */}
      <section id="storia" className="relative py-40 bg-slate-50">
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="mb-12">
                <div 
                  className="text-3xl text-blue-800 font-light tracking-[0.2em] mb-6"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {defaultData.story.section_title}
                </div>
                <h2 
                  className="text-6xl md:text-7xl font-light leading-[0.9] text-blue-900 mb-8"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Un Secolo di<br />
                  <span className="text-amber-600">Tradizione</span>
                </h2>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {defaultData.story.story_text}
              </p>
              
              <blockquote 
                className="text-2xl font-light italic text-blue-800 leading-relaxed border-l-4 border-amber-600 pl-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Η κουζίνα είναι η καρδιά του σπιτιού"<br />
                <span className="text-xl text-slate-600">
                  La cucina è il cuore della casa
                </span>
              </blockquote>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <img
                  src={defaultData.story.chef_image}
                  alt="Chef Dimitris nel suo elemento"
                  className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div 
                    className="text-sm tracking-wider mb-1 opacity-90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {defaultData.story.chef_name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Η ΘΑΛΑΣΣΑ ΜΑΣ - IL NOSTRO MARE */}
      <section className="relative py-40 bg-gradient-to-br from-blue-800 via-slate-800 to-blue-900 text-white overflow-hidden">
        {/* Onde animate di sfondo */}
        <div className="absolute inset-0 opacity-20">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" fill="none">
            <path d="M0,300 Q300,250 600,300 T1200,300 V600 H0 Z" fill="#0ea5e9" opacity="0.3" className="animate-pulse" style={{animationDuration: '8s'}}/>
            <path d="M0,350 Q400,300 800,350 T1200,350 V600 H0 Z" fill="#06b6d4" opacity="0.2" className="animate-pulse" style={{animationDuration: '12s', animationDelay: '2s'}}/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-8">
          
          {/* Header Poetico */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
                <path d="M10,30 Q30,10 60,30 Q90,50 110,30" stroke="#f59e0b" strokeWidth="3" fill="none"/>
                <circle cx="30" cy="30" r="6" fill="#0ea5e9" opacity="0.8"/>
                <circle cx="60" cy="30" r="8" fill="#f59e0b"/>
                <circle cx="90" cy="30" r="6" fill="#0ea5e9" opacity="0.8"/>
                {/* Barche stilizzate */}
                <path d="M20,25 Q25,20 30,25 L35,28 L25,32 Z" fill="#f59e0b" opacity="0.6"/>
                <path d="M55,25 Q60,20 65,25 L70,28 L60,32 Z" fill="#f59e0b" opacity="0.6"/>
                <path d="M85,25 Q90,20 95,25 L100,28 L90,32 Z" fill="#f59e0b" opacity="0.6"/>
              </svg>
            </div>
            
            <div 
              className="text-4xl font-light text-amber-300 tracking-[0.3em] mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Η ΘΑΛΑΣΣΑ ΜΑΣ
            </div>
            <h2 
              className="text-7xl md:text-8xl font-light leading-[0.9] text-white mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Il Mare che<br />
              <span className="text-amber-300">Ci Nutre</span>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8"></div>
            <p 
              className="text-2xl font-light text-blue-200 italic max-w-5xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Κάθε αυγή φέρνει νέα δώρα από τα βάθη του Αιγαίου"<br />
              <span className="text-xl text-white/80">
                Ogni alba porta nuovi doni dalle profondità dell'Egeo
              </span>
            </p>
          </div>

          {/* Story del Mare con Timeline */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            
            {/* Alba - 05:00 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-amber-400 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-amber-600/30 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <circle cx="12" cy="12" r="5" fill="currentColor"/>
                      <path d="M12,1 L12,3 M12,21 L12,23 M4.22,4.22 L5.64,5.64 M18.36,18.36 L19.78,19.78 M1,12 L3,12 M21,12 L23,12 M4.22,19.78 L5.64,18.36 M18.36,5.64 L19.78,4.22" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="text-2xl font-light text-amber-200 mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Η Αυγή • 05:00
                    </h3>
                    <p className="text-blue-200 text-sm">L'Alba del Pescatore</p>
                  </div>
                </div>
                
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
                    alt="Alba su Mykonos"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <p className="text-blue-100/90 leading-relaxed text-sm">
                  Le barche di famiglia rientrano al porto con il bottino dell'alba. 
                  Dimitris scende personalmente a scegliere il pesce più fresco: 
                  branzini argentati, triglie rosse dell'Egeo, polpi dalle braccia tenere.
                </p>
              </div>
            </div>

            {/* Mattino - 09:00 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-blue-600/30 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M3,12 Q6,8 12,12 Q18,16 21,12" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      <path d="M6,18 Q9,14 15,18" stroke="currentColor" strokeWidth="1" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="text-2xl font-light text-blue-200 mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Το Πρωί • 09:00
                    </h3>
                    <p className="text-blue-200 text-sm">La Preparazione</p>
                  </div>
                </div>
                
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop"
                    alt="Cucina tradizionale greca"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <p className="text-blue-100/90 leading-relaxed text-sm">
                  Nella cucina, nonna Eleni inizia la preparazione delle salse: 
                  tzatziki cremoso con cetrioli di Tinos, taramosalata con uova 
                  di carpa del Mar Nero, tutto secondo le ricette di famiglia.
                </p>
              </div>
            </div>

            {/* Sera - 19:30 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-b from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-purple-600/30 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      <path d="M12,1 C12,1 8,6 8,12 C8,18 12,23 12,23 C12,23 16,18 16,12 C16,6 12,1 12,1" fill="currentColor" opacity="0.6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="text-2xl font-light text-purple-200 mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Το Δείλι • 19:30
                    </h3>
                    <p className="text-purple-200 text-sm">La Magia della Sera</p>
                  </div>
                </div>
                
                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
                    alt="Cena al tramonto"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <p className="text-purple-100/90 leading-relaxed text-sm">
                  Il tramonto dipinge il cielo mentre Dimitris accende il fuoco 
                  di legna d'ulivo. L'aroma del pesce grigliato si mescola al 
                  profumo di origano e al suono dolce del bouzouki.
                </p>
              </div>
            </div>
          </div>

          {/* Quote Marina */}
          <div className="text-center">
            <div className="max-w-4xl mx-auto bg-black/30 backdrop-blur-md border border-amber-600/30 p-12 rounded-3xl">
              <blockquote 
                className="text-3xl font-light italic text-amber-200 leading-relaxed mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Η θάλασσα είναι η μητέρα μας, μας δίνει τη ζωή κάθε μέρα"
              </blockquote>
              <div className="text-xl text-white/90 mb-6">
                Il mare è nostra madre, ci dona la vita ogni giorno
              </div>
              <cite className="text-amber-300 text-lg tracking-wide">
                — Yannis Kostas, Fondatore • 1924
              </cite>
              
              <div className="mt-8 flex items-center justify-center">
                <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
                  <path d="M0,20 Q50,10 100,20 Q150,30 200,20" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                  <path d="M20,25 Q40,15 60,25" stroke="#0ea5e9" strokeWidth="1" fill="none"/>
                  <path d="M140,25 Q160,15 180,25" stroke="#0ea5e9" strokeWidth="1" fill="none"/>
                  <circle cx="100" cy="20" r="6" fill="#f59e0b"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU AUTENTICO */}
      <section id="menu" className="relative py-40 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-8">
          
          <div className="text-center mb-20">
            <div 
              className="text-4xl font-light text-amber-300 tracking-[0.3em] mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Η ΚΟΥΖΙΝΑ ΤΗΣ ΓΙΑΓΙΑΣ ΜΑΡΙΑΣ
            </div>
            <h2 
              className="text-7xl md:text-8xl font-light leading-[0.9] text-white mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              I Sapori del<br />
              <span className="text-amber-300">Mare Nostrum</span>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8"></div>
            <p 
              className="text-2xl font-light text-blue-100 italic max-w-5xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Κάθε πιάτο είναι μια αγκαλιά από τη γιαγιά"<br />
              <span className="text-xl text-white/80">Ogni piatto è un abbraccio della nonna</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {defaultData.menu.menu_sections.map((section, index) => (
              <div key={index} className="bg-black/20 backdrop-blur-md border border-amber-600/30 p-8">
                <div className="text-center mb-8">
                  <div 
                    className="text-2xl font-light text-amber-300 tracking-[0.2em] mb-4"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {section.name}
                  </div>
                  <div className="w-16 h-px bg-amber-300 mx-auto mb-6"></div>
                  <p className="text-blue-200 text-sm">{section.description}</p>
                  <p className="text-amber-200 font-medium mt-2">{section.price}</p>
                </div>
                
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-amber-600/20 pb-4">
                      <p className="text-sm text-blue-100/80 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto bg-amber-600/10 border border-amber-600/30 p-8 backdrop-blur-md">
              <p className="text-sm text-blue-200 leading-relaxed">
                {defaultData.menu.menu_note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative py-40 bg-gradient-to-b from-slate-50 to-white">
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div 
              className="text-4xl font-light text-blue-800 tracking-[0.3em] mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ΤΟ ΝΗΣΙ ΤΩΝ ΑΝΕΜΩΝ
            </div>
            <h2 
              className="text-7xl md:text-8xl font-light leading-[0.9] text-blue-900 mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Mykonos<br />
              <span className="text-5xl text-amber-600">attraverso i nostri occhi</span>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {defaultData.gallery.gallery_images.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                <img 
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="relative py-40 bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div 
              className="text-4xl font-light text-blue-800 tracking-[0.3em] mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ΜΑΡΤΥΡΙΕΣ ΦΙΛΩΝ
            </div>
            <h2 
              className="text-7xl md:text-8xl font-light leading-[0.9] text-blue-900 mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Voci dal<br />
              <span className="text-amber-600">Cuore</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {defaultData.reviews.testimonials.map((review, index) => (
              <div key={review.id} className="bg-white border border-blue-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="flex gap-1 mb-6">
                  {Array.from({length: review.rating}).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <blockquote 
                  className="text-lg font-light text-slate-700 leading-relaxed mb-6 italic"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "{review.content}"
                </blockquote>
                
                <div className="flex items-center gap-4 pt-4 border-t border-blue-50">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div 
                      className="font-semibold text-blue-900"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {review.name}
                    </div>
                    <div className="text-sm text-slate-600">{review.role}</div>
                    <div className="text-xs text-blue-600 mt-1">{review.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTI */}
      <section className="relative py-40 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div 
              className="text-4xl font-light text-amber-300 tracking-[0.3em] mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ΕΚΔΗΛΩΣΕΙΣ & ΠΑΡΑΔΟΣΗ
            </div>
            <h2 
              className="text-7xl md:text-8xl font-light leading-[0.9] text-white mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Le Feste<br />
              <span className="text-amber-300">dell'Isola</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {defaultData.events.slice(0, 4).map((event) => (
              <div key={event.id} className="bg-black/30 backdrop-blur-md border border-amber-600/30 rounded-3xl overflow-hidden">
                <div className="p-8">
                  <h3 
                    className="text-2xl font-light text-amber-200 mb-2"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-blue-100/80 leading-relaxed mb-6 text-sm">
                    {event.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-amber-600/20">
                    <div className="space-y-1">
                      <div className="text-amber-300 font-semibold text-lg">
                        {event.price}
                      </div>
                      <div className="text-xs text-blue-200">
                        {event.date} • {event.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-amber-600/80 text-white text-xs font-semibold rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div 
              className="text-5xl font-light tracking-[0.2em] text-amber-300 mb-6"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ΚΟΣΤΑΣ
            </div>
            <div className="text-blue-200 mb-6">
              {defaultData.business.name} • Mykonos, Grecia
            </div>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8"></div>
            <p 
              className="text-2xl font-light italic text-amber-200 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Καλώς ήρθατε στην οικογένειά μας"
            </p>
            <p className="text-blue-100/80">
              Benvenuti nella nostra famiglia
            </p>
            
            <div className="mt-12 pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm">
                © 2024 Kostas Family Restaurant. Tutti i diritti riservati. 
                <br/>Creato con amore per preservare la tradizione greca.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
