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
    // ATELIER SARAH CHEN - Authentic Business Info
    businessName: businessData.name || project.data.business?.name || 'Atelier Sarah Chen',
    businessType: 'michelin_star',
    tagline: businessData.tagline || project.data.business?.tagline || 'Cuisine Franco-Asiatique • Deux étoiles Michelin',
    
    // SOPHISTICATED BRANDING - Not generic logo
    logoUrl: project.data.logo?.url || '',
    logoMode: project.data.logo?.mode || 'text',
    logoText: project.data.logo?.text || businessData.name || project.data.business?.name || 'Atelier Sarah Chen',
    
    // HERO CINEMATOGRAFICO - Professional food photography
    heroTitle: businessData.name || project.data.business?.name || 'Atelier Sarah Chen',
    heroSubtitle: businessData.tagline || 'Cuisine Franco-Asiatique • 7ème Arrondissement',
    heroDescription: businessData.description || 'Là où les techniques françaises classiques rencontrent la subtilité asiatique dans une symphonie culinaire d\'exception',
    heroImages: heroData.images || [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3', // Professional plated dish
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3', // Elegant restaurant interior
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3'  // Fine dining atmosphere
    ],
    
    // CHEF STORY - Authentic culinary narrative
    about: {
      heading: storyData.section_title || 'L\'Art de la Fusion',
      subtitle: storyData.chef_name || 'Chef Sarah Chen',
      text: storyData.story_text || 'Formée chez Joël Robuchon puis perfectionnée dans les cuisines de Tokyo, Sarah Chen propose une cuisine où la précision française épouse la philosophie asiatique de l\'harmonie. Chaque assiette raconte l\'histoire d\'une rencontre entre deux mondes culinaires.',
      imageUrl: storyData.chef_image || 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3', // Professional chef portrait
    },
    
    // MENU FRANCO-ASIATIQUE - Authentic fusion cuisine
    menuSections: menuData.menu_sections || [
      {
        name: 'Menu Découverte',
        price: '€280',
        description: 'Huit services franco-asiatiques avec accord saké et vins',
        items: [
          'Amuse-bouche • Bouchée de foie gras, gelée de yuzu',
          'Mer • Saint-Jacques, mousse de miso blanc, crisp d\'algues nori',
          'Légume • Velouté de champignons shiitaké, huile de truffe',
          'Poisson • Turbot sauvage, sauce ponzu, légumes glacés au mirin',
          'Viande • Canard de Bresse, laque au soja, purée de taro',
          'Fromage • Roquefort, compotée de poire au gingembre',
          'Pré-dessert • Sorbet au thé matcha, tuile de sésame noir',
          'Dessert • Soufflé au chocolat noir, glace vanille de Madagascar'
        ]
      },
      {
        name: 'Menu Végétal',
        price: '€240',
        description: 'Six créations végétales inspirées des jardins zen',
        items: [
          'Accueil • Bouillon de kombu, ravioli de légumes d\'automne',
          'Terre • Betterave rôtie, crème d\'avocat, graines de sésame',
          'Racine • Topinambour confit, mousse de miso, pousses de bambou',
          'Champignon • Risotto de shiitaké, émulsion de parmesan vieilli',
          'Fromage • Crottin de chèvre, miel de châtaignier, noix caramélisées',
          'Douceur • Tarte au chocolat blanc, sorbet coco-citronnelle'
        ]
      }
    ],
    
    // AUTHENTIC RECOGNITION - Realistic awards for fusion cuisine
    awards: awardsData.awards_list || [
      { name: 'Guide Michelin', score: '★★', year: '2022-2024', description: 'Deux étoiles' },
      { name: 'Gault & Millau', score: '17/20', year: '2024', description: 'Cuisine d\'exception' },
      { name: 'James Beard Award', score: 'Winner', year: '2023', description: 'Outstanding Chef' },
      { name: 'La Liste', score: '94.75', year: '2024', description: 'Top 200 Mondial' },
      { name: 'Le Figaro', score: '★★★★', year: '2024', description: 'Cuisine remarquable' }
    ],
    
    // GALLERY PROFESSIONALE - High-end food photography
    gallery: galleryData.gallery_images || [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3', // Michelin-level plating
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3', // Professional dish presentation
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3', // Restaurant atmosphere
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3', // Fine dining detail
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3', // Professional kitchen
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'  // Wine service
    ],
    
    // CONTACT AUTHENTIQUE - Realistic Paris 7th arrondissement location
    address: contactData.address || locationData.address || project.data.contact?.address || '38 Rue de l\'Université, 75007 Paris',
    city: locationData.city || 'Paris',
    zipCode: locationData.zipCode || '75007',
    directions: locationData.directions || 'Métro ligne 12 (Solférino) • Parking Invalides à 300m • Service voiturier disponible',
    phone: contactData.phone || project.data.contact?.phone || '+33 1 47 05 86 89',
    email: contactData.email || project.data.contact?.email || 'reservation@ateliersarahchen.fr',
    
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

  // TYPOGRAPHY LUXURY - Professional font system
  React.useEffect(() => {
    // Premium font combination for authentic luxury feel
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div 
      className={`w-full bg-[#0B0B0F] text-[#F7F3E9] overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        letterSpacing: '0.005em',
        lineHeight: '1.6'
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

        {/* NAVIGATION SOPHISTICATED */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div 
              className="text-2xl tracking-[0.08em] font-normal"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '0.08em',
                fontWeight: 400
              }}
            >
              {restaurantData.logoText}
            </div>
            <div className="hidden md:flex items-center gap-10 text-sm font-light">
              <a href="#story" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Notre Histoire</a>
              <a href="#menu" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Carte</a>
              <a href="#gallery" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Galerie</a>
              <a href="#contact" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Réservation</a>
            </div>
          </div>
        </nav>

        {/* HERO CONTENT SOPHISTICATED */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-5xl px-8">
            <div 
              className="text-sm tracking-[0.25em] text-[#D4AF37] mb-8 font-light opacity-95 uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {restaurantData.heroSubtitle}
            </div>
            <h1 
              className="text-6xl md:text-8xl font-normal mb-12 tracking-[0.02em]"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                lineHeight: '0.95',
                fontWeight: 400,
                transform: `translateY(${scrollY * -0.1}px)`
              }}
            >
              {restaurantData.heroTitle}
            </h1>
            <p 
              className="text-lg md:text-xl font-light leading-relaxed opacity-90 max-w-4xl mx-auto tracking-[0.01em]"
              style={{ 
                fontFamily: "'Source Serif 4', serif",
                lineHeight: '1.8',
                fontWeight: 300,
                transform: `translateY(${scrollY * -0.05}px)`
              }}
            >
              {restaurantData.heroDescription}
            </p>
            
            {/* CTA BUTTONS SOPHISTICATED */}
            <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center">
              <button 
                className="group relative px-10 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0B0F] transition-all duration-700 tracking-[0.12em] text-sm font-medium uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="relative z-10">Réserver</span>
                <div className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </button>
              <button 
                className="group px-10 py-4 text-[#F7F3E9] border-b border-transparent hover:border-[#D4AF37] transition-all duration-500 text-sm font-light tracking-[0.08em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Découvrir la Carte
                <span className="inline-block ml-3 transform group-hover:translate-x-2 transition-transform duration-500 text-[#D4AF37]">→</span>
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