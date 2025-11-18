import React from 'react';
import { Project } from '../../types';

interface MichelinStarTemplateProps {
  data: any;
  theme: any;
  project: any;
}

// MICHELIN STAR TEMPLATE - Premium Ultra-Luxury Restaurant Design
export const MichelinStarTemplate: React.FC<MichelinStarTemplateProps> = ({ data, theme, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  // Usa i dati del nuovo template system se disponibili
  const templateData = project.data.site?.templateData || data;
  
  // Mapping dei dati dalle sezioni
  const getSectionData = (type: string) => {
    // Prima prova da project.data.{type}, poi da templateData
    const directData = project.data?.[type];
    const templateDataSection = templateData[type];
    return directData || templateDataSection || {};
  };

  // Dati del ristorante con fallback ultra-premium
  const businessData = getSectionData('business');
  const heroData = getSectionData('hero');
  const storyData = getSectionData('story');
  const contactData = getSectionData('contact');
  const menuData = getSectionData('menu');
  const galleryData = getSectionData('gallery');
  const awardsData = getSectionData('awards');
  const reviewsData = getSectionData('reviews');
  const eventsData = getSectionData('events');
  const newsletterData = getSectionData('newsletter');
  const hoursData = getSectionData('hours');
  const locationData = getSectionData('location');
  const themeData = getSectionData('theme');

  const restaurantData = {
    // Business Info
    businessName: businessData.name || project.data.business?.name || 'Le Petit Étoile',
    businessType: 'michelin_star',
    tagline: businessData.tagline || project.data.business?.tagline || 'Deux étoiles Michelin',
    
    // Logo
    logoUrl: project.data.logo?.url || '',
    logoMode: project.data.logo?.mode || 'text',
    logoText: project.data.logo?.text || businessData.name || project.data.business?.name || 'Le Petit Étoile',
    
    // Hero - ultra cinematico
    heroTitle: businessData.name || project.data.business?.name || 'Le Petit Étoile',
    heroSubtitle: businessData.tagline || 'Deux étoiles Michelin • Paris',
    heroDescription: businessData.description || 'Une expérience culinaire transcendante où chaque plat raconte une histoire',
    heroImages: heroData.images || [
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop'
    ],
    
    // About - storytelling premium
    about: {
      heading: storyData.section_title || 'Notre Vision',
      subtitle: storyData.chef_name || 'Chef étoilé Alexandre Dubois',
      text: storyData.story_text || 'Depuis quinze ans, nous cultivons l\'art de la haute gastronomie française avec une approche contemporaine qui respecte les traditions tout en embrassant l\'innovation.',
      imageUrl: storyData.chef_image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop',
    },
    
    // Menu - ultra premium
    menuSections: menuData.menu_sections || [
      {
        name: 'Menu Dégustation',
        price: '€285',
        description: 'Sept services d\'exception avec accord mets et vins',
        items: [
          'Amuse-bouche • Huître Gillardeau, caviar Ossetra',
          'Entrée • Foie gras poêlé, figues confites au porto',
          'Poisson • Turbot sauvage, beurre blanc aux algues',
          'Viande • Côte de bœuf Wagyu, jus au thym',
          'Fromage • Sélection Laurent Dubois',
          'Pré-dessert • Sorbet au champagne rosé',
          'Dessert • Soufflé Grand Marnier, glace vanille'
        ]
      },
      {
        name: 'Menu Végétarien',
        price: '€225',
        description: 'Cinq services créatifs de légumes de saison',
        items: [
          'Betterave • Trois textures, chèvre de la Drôme',
          'Champignon • Cèpes, truffe noire du Périgord',
          'Légume racine • Topinambour, noisettes torréfiées',
          'Fromage • Comté 36 mois d\'affinage',
          'Dessert • Poire William, chocolat Valrhona'
        ]
      }
    ],
    
    // Awards & Recognition
    awards: awardsData.awards_list || [
      { name: 'Deux étoiles Michelin', year: '2019-2024' },
      { name: 'Gault & Millau', score: '18/20', year: '2024' },
      { name: 'La Liste', ranking: 'Top 100 Mondial', year: '2024' },
      { name: 'James Beard Award', category: 'Outstanding Chef', year: '2023' }
    ],
    
    // Gallery premium
    gallery: galleryData.gallery_images || [
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2074&auto=format&fit=crop'
    ],
    
    // Contact premium
    address: contactData.address || locationData.address || project.data.contact?.address || '15 Rue Saint-Honoré, 75001 Paris',
    city: locationData.city || 'Paris',
    zipCode: locationData.zipCode || '75001',
    directions: locationData.directions || '',
    phone: contactData.phone || project.data.contact?.phone || '+33 1 42 96 59 04',
    email: contactData.email || project.data.contact?.email || 'reservation@lepetitetoile.fr',
    
    // Hours
    schedule: hoursData.schedule || {},
    
    // Sezioni abilitate (default order)
    sectionsOrder: ['hero', 'awards', 'story', 'menu', 'gallery', 'contact'],
  };

  // Parallax e scroll effects
  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    // Imposta immediatamente loaded invece di aspettare l'evento load
    setIsLoaded(true);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Carosello automatico hero
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % restaurantData.heroImages.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Font loading ultra premium
  React.useEffect(() => {
    // Cormorant Garamond per il lusso
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div 
      className={`w-full bg-[#0a0a0a] text-white overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '0.01em'
      }}
    >
      {/* HERO SECTION - Ultra Cinematic */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {restaurantData.heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${1.05 + scrollY * 0.0002})`,
              }}
            />
          ))}
        </div>

        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Navigation Ultra Minimal */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-8">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div 
              className="text-2xl tracking-wider font-light"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.15em'
              }}
            >
              {restaurantData.logoText}
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-wide">
              <a href="#story" className="hover:text-amber-300 transition-colors duration-300">Histoire</a>
              <a href="#menu" className="hover:text-amber-300 transition-colors duration-300">Menu</a>
              <a href="#gallery" className="hover:text-amber-300 transition-colors duration-300">Galerie</a>
              <a href="#contact" className="hover:text-amber-300 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl px-8">
            <div 
              className="text-sm tracking-[0.3em] text-amber-300 mb-6 font-light opacity-90"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {restaurantData.heroSubtitle}
            </div>
            <h1 
              className="text-7xl md:text-9xl font-light mb-8 tracking-wide"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: '0.9',
                transform: `translateY(${scrollY * -0.1}px)`
              }}
            >
              {restaurantData.heroTitle}
            </h1>
            <p 
              className="text-xl md:text-2xl font-light leading-relaxed opacity-90 max-w-3xl mx-auto"
              style={{ 
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.6',
                transform: `translateY(${scrollY * -0.05}px)`
              }}
            >
              {restaurantData.heroDescription}
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 border border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-all duration-500 tracking-wider text-sm font-medium">
                <span className="relative z-10">RÉSERVER UNE TABLE</span>
                <div className="absolute inset-0 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
              <button className="group px-8 py-4 text-white border-b border-transparent hover:border-white transition-all duration-300 text-sm font-light tracking-wider">
                DÉCOUVRIR LE MENU
                <span className="inline-block ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-xs tracking-widest opacity-70">
            <span>DÉFILER</span>
            <div className="w-px h-16 bg-white animate-pulse"></div>
          </div>
        </div>

        {/* Image Dots */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {restaurantData.heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-amber-300' 
                  : 'bg-white bg-opacity-40 hover:bg-opacity-70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* AWARDS SECTION - Floating */}
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {restaurantData.awards.map((award, index) => (
              <div key={index} className="group">
                <div className="p-6 border border-amber-300 border-opacity-20 hover:border-opacity-60 transition-all duration-500 backdrop-blur-sm">
                  <h3 
                    className="text-lg font-medium text-amber-300 mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {award.name}
                  </h3>
                  <p className="text-sm opacity-70 font-light">
                    {award.score && `${award.score} • `}{award.year}
                  </p>
                  {award.ranking && (
                    <p className="text-xs mt-1 opacity-60">{award.ranking}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="relative py-32 bg-gradient-to-b from-gray-900 to-black scroll-mt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div 
                className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                NOTRE VISION
              </div>
              <h2 
                className="text-5xl md:text-6xl font-light mb-8 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {restaurantData.about.heading}
              </h2>
              <div 
                className="text-xl text-amber-300 mb-6 font-medium"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {restaurantData.about.subtitle}
              </div>
              <p 
                className="text-lg leading-relaxed opacity-90 font-light"
                style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}
              >
                {restaurantData.about.text}
              </p>
              <div className="mt-10">
                <button className="group border-b border-amber-300 text-amber-300 pb-2 text-sm tracking-wider hover:tracking-widest transition-all duration-300">
                  LIRE NOTRE HISTOIRE COMPLÈTE
                  <span className="inline-block ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden">
                <img
                  src={restaurantData.about.imageUrl}
                  alt="Chef Alexandre Dubois"
                  className="w-full h-[600px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="relative py-32 bg-black scroll-mt-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-20">
            <div 
              className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              EXPÉRIENCE CULINAIRE
            </div>
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Nos Menus
            </h2>
          </div>

          <div className="space-y-16">
            {restaurantData.menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-amber-300 border-opacity-20 p-8 md:p-12 backdrop-blur-sm">
                <div className="text-center mb-10">
                  <h3 
                    className="text-3xl font-light mb-4 text-amber-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {section.name}
                  </h3>
                  <div 
                    className="text-2xl font-light mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {section.price}
                  </div>
                  <p 
                    className="text-sm opacity-80 font-light max-w-md mx-auto"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {section.description}
                  </p>
                </div>

                <div className="space-y-6 max-w-3xl mx-auto">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-amber-300 rounded-full mt-3 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <p 
                          className="text-lg leading-relaxed font-light group-hover:text-amber-300 transition-colors duration-300"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p 
              className="text-sm opacity-70 mb-6 font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Allergies et intolérances ? Informez-nous, nous nous adapterons.
            </p>
            <button className="group relative px-8 py-4 border border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-all duration-500 tracking-wider text-sm font-medium">
              <span className="relative z-10">TÉLÉCHARGER LA CARTE COMPLÈTE</span>
              <div className="absolute inset-0 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="relative py-32 bg-gradient-to-b from-black to-gray-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div 
              className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              AMBIANCE & PLATS
            </div>
            <h2 
              className="text-5xl md:text-6xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Galerie
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {restaurantData.gallery.map((image, index) => (
              <div key={index} className="group relative overflow-hidden aspect-square">
                <img 
                  src={typeof image === 'string' ? image : image.url}
                  alt={typeof image === 'string' ? `Gallery ${index + 1}` : image.caption || image.alt}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center text-white">
                    <span className="text-xl">+</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      {reviewsData.testimonials && reviewsData.testimonials.length > 0 && (
        <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-20">
              <div 
                className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                TESTIMONIANZE
              </div>
              <h2 
                className="text-5xl md:text-6xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                I Nostri Ospiti
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {reviewsData.testimonials.slice(0, 4).map((testimonial: any, index: number) => (
                <div key={index} className="border border-amber-300 border-opacity-20 p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-amber-300 text-lg">★</span>
                    ))}
                  </div>
                  <blockquote 
                    className="text-lg font-light leading-relaxed mb-6 italic opacity-90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <div 
                        className="font-medium text-amber-300"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {testimonial.name}
                      </div>
                      <div className="text-sm opacity-70">{testimonial.role}</div>
                    </div>
                    <div className="text-xs opacity-60 font-mono">
                      {testimonial.source}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENTS SECTION */}
      {eventsData.events && eventsData.events.length > 0 && (
        <section className="relative py-32 bg-black">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-20">
              <div 
                className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                EVENTI ESCLUSIVI
              </div>
              <h2 
                className="text-5xl md:text-6xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Esperienze Uniche
              </h2>
            </div>

            <div className="space-y-8">
              {eventsData.events.slice(0, 3).map((event: any, index: number) => (
                <div key={index} className="border border-amber-300 border-opacity-20 p-8 backdrop-blur-sm">
                  <div className="grid lg:grid-cols-3 gap-6 items-center">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="text-2xl font-light text-amber-300"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {event.title}
                        </div>
                        <div className="px-3 py-1 bg-amber-300 bg-opacity-10 text-amber-300 text-xs font-medium rounded-full">
                          {event.type}
                        </div>
                      </div>
                      <p 
                        className="text-lg leading-relaxed opacity-90 font-light mb-4"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {event.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm opacity-70">
                        <div>📅 {event.date}</div>
                        <div>🕐 {event.time}</div>
                        {event.capacity && <div>👥 {event.capacity} posti</div>}
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <div 
                        className="text-3xl font-light text-amber-300 mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {event.price}
                      </div>
                      <div className="text-sm opacity-60 mb-4">per persona</div>
                      <button className="px-6 py-3 border border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-black transition-all duration-300 text-sm font-medium tracking-wider">
                        PRENOTA POSTO
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VIP CLUB SECTION */}
      {newsletterData.title && (
        <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div 
              className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ESCLUSIVITÀ
            </div>
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {newsletterData.title}
            </h2>
            <p 
              className="text-xl leading-relaxed opacity-90 font-light mb-12 max-w-3xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {newsletterData.description}
            </p>
            
            {newsletterData.benefits && newsletterData.benefits.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                {newsletterData.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-300 rounded-full flex-shrink-0"></div>
                    <span className="text-left font-light">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Inserisci la tua email"
                className="flex-1 px-4 py-3 bg-transparent border border-amber-300 border-opacity-40 text-white placeholder-gray-400 focus:outline-none focus:border-amber-300 rounded"
              />
              <button className="px-8 py-3 bg-amber-300 text-black hover:bg-amber-400 transition-colors duration-300 font-medium tracking-wider rounded">
                ISCRIVITI
              </button>
            </div>
          </div>
        </section>
      )}

      {/* HOURS SECTION */}
      {restaurantData.schedule && Object.keys(restaurantData.schedule).length > 0 && (
        <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-16">
              <div 
                className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                ORARI DI APERTURA
              </div>
              <h2 
                className="text-4xl md:text-5xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Quando Trovarci
              </h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="border border-amber-300 border-opacity-20 p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  {Object.entries(restaurantData.schedule).map(([day, hours]: [string, any]) => {
                    const dayNames: { [key: string]: string } = {
                      monday: 'Lunedì',
                      tuesday: 'Martedì', 
                      wednesday: 'Mercoledì',
                      thursday: 'Giovedì',
                      friday: 'Venerdì',
                      saturday: 'Sabato',
                      sunday: 'Domenica'
                    };
                    
                    return (
                      <div key={day} className="flex items-center justify-between py-2 border-b border-amber-300 border-opacity-10 last:border-b-0">
                        <div 
                          className="font-medium text-amber-300"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {dayNames[day] || day}
                        </div>
                        <div 
                          className="font-light text-right"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {hours.closed ? (
                            <span className="text-gray-500">Chiuso</span>
                          ) : (
                            <div className="space-y-1">
                              {hours.lunch_start && hours.lunch_end && (
                                <div className="text-sm">
                                  Pranzo: {hours.lunch_start} - {hours.lunch_end}
                                </div>
                              )}
                              {hours.dinner_start && hours.dinner_end && (
                                <div className="text-sm">
                                  Cena: {hours.dinner_start} - {hours.dinner_end}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 pt-6 border-t border-amber-300 border-opacity-10 text-center">
                  <p className="text-sm opacity-70 font-light">
                    Si consiglia la prenotazione • Ultimo ordine 30 min prima della chiusura
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTACT SECTION */}
      <section id="contact" className="relative py-32 bg-black scroll-mt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div 
                className="text-sm tracking-[0.2em] text-amber-300 mb-6 font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                RÉSERVATION & CONTACT
              </div>
              <h2 
                className="text-5xl md:text-6xl font-light mb-12"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Nous Contacter
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 
                    className="text-xl font-medium text-amber-300 mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Adresse
                  </h3>
                  <p 
                    className="text-lg font-light opacity-90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {restaurantData.address}
                  </p>
                </div>

                <div>
                  <h3 
                    className="text-xl font-medium text-amber-300 mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Téléphone
                  </h3>
                  <a 
                    href={`tel:${restaurantData.phone}`}
                    className="text-lg font-light opacity-90 hover:text-amber-300 transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {restaurantData.phone}
                  </a>
                </div>

                <div>
                  <h3 
                    className="text-xl font-medium text-amber-300 mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Email
                  </h3>
                  <a 
                    href={`mailto:${restaurantData.email}`}
                    className="text-lg font-light opacity-90 hover:text-amber-300 transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {restaurantData.email}
                  </a>
                </div>

                <div className="pt-8">
                  <button className="group relative px-8 py-4 bg-amber-300 text-black hover:bg-transparent hover:text-amber-300 border border-amber-300 transition-all duration-500 tracking-wider text-sm font-medium w-full sm:w-auto">
                    RÉSERVER MAINTENANT
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-black border border-amber-300 border-opacity-20 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="text-6xl font-light text-amber-300 mb-8"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ★★
                  </div>
                  <h3 
                    className="text-2xl font-light mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Michelin Guide
                  </h3>
                  <p 
                    className="text-sm opacity-70 font-light"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "Une cuisine d'exception qui mérite<br />absolument le détour"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16 bg-gradient-to-t from-black to-gray-900 border-t border-amber-300 border-opacity-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div 
              className="text-2xl tracking-wider font-light mb-4"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.15em'
              }}
            >
              {restaurantData.businessName}
            </div>
            <p 
              className="text-sm opacity-60 font-light"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © {new Date().getFullYear()} {restaurantData.businessName}. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};