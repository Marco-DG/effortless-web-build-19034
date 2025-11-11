import React from 'react';
import { Project } from '../../types';
import { PreviewLayout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
import { Badge } from '@/components/ui/badge';
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
      <div className="h-full overflow-y-auto">
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
  const fontFamily = theme?.fontPrimary || theme?.fontSecondary || 'Inter';
  
  const useTextLogo = (builderData.logoMode === "text") && (builderData.logoText || builderData.businessName);
  const logoText = builderData.logoText || builderData.businessName || "Il Tuo Locale";
  const logoFont = builderData.logoFont || fontFamily;

  React.useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="w-full bg-[#0f0d0d] text-[#f4f2ef] overflow-y-auto h-full"
      style={{ fontFamily }}
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
                  newsletter: 'Newsletter',
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
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {builderData.heroSlogan || "Wine, Food & Atmosphere"}
                    </h1>
                    <p className="mt-4 text-lg md:text-2xl text-white/90">
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
                        fontFamily: theme?.fonts?.heading || "'Playfair Display', serif",
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
                      style={{ fontFamily: "'Playfair Display', serif" }}
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
                          fontFamily: theme?.fonts?.heading || "'Playfair Display', serif",
                          color: templateColors.accent,
                        }}
                      >
                        {builderData.galleryTitle || "La Nostra Galleria"}
                      </h3>
                      {builderData.gallerySubtitle && (
                        <p className="text-white/80 text-lg">
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
                  <p className="text-white/80 text-lg mb-8">
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
            contact: (
              <section className="mx-auto max-w-4xl px-6 py-16 grid md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Contatti</h2>
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
    </div>
  );
};
