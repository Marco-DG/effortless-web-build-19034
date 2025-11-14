import React from 'react';
import { Project } from '../../types';
import { PreviewLayout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
// Badge legacy rimosso - usando inline premium style
import { Calendar, MapPin, Phone, Mail, Clock, Star, Truck, Menu, X, ChefHat, Wine, Camera, Award, Users, Heart, ArrowRight } from 'lucide-react';
import { ensureGoogleFontLoaded } from '@/lib/fonts';

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
        if (templateStyle === 'wine_bar') {
          return <WineBarTemplate key={section.id} data={section.data} theme={theme} project={project} />;
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
