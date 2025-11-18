import React from 'react';
import { Project } from '../../types';

interface AtelierSarahChenTemplateProps {
  data: any;
  theme: any;
  project: any;
}

// ATELIER SARAH CHEN TEMPLATE - Ultra-Luxury Franco-Asiatique Design
export const AtelierSarahChenTemplate: React.FC<AtelierSarahChenTemplateProps> = ({ data, theme, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // DATI AUTENTICI RISTORANTE LUXURY
  const restaurantData = {
    businessName: project.data.business?.name || 'Atelier Sarah Chen',
    tagline: project.data.business?.tagline || 'Cuisine Franco-Asiatique • Deux étoiles Michelin',
    description: project.data.business?.description || 'Là où les techniques françaises classiques rencontrent la subtilité asiatique dans une symphonie culinaire d\'exception',
    
    // HERO IMAGES PREMIUM
    heroImages: project.data.hero?.images || [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    
    // CHEF STORY
    chef: {
      name: project.data.story?.chef_name || 'Chef Sarah Chen',
      story: project.data.story?.story_text || 'Formée chez Joël Robuchon puis perfectionnée dans les cuisines de Tokyo, Sarah Chen propose une cuisine où la précision française épouse la philosophie asiatique de l\'harmonie.',
      image: project.data.story?.chef_image || 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    
    // MENU FRANCO-ASIATIQUE AUTHENTIQUE
    menu: project.data.menu?.menu_sections || [
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
      }
    ],
    
    // AWARDS AUTHENTIQUES
    awards: project.data.awards?.awards_list || [
      { name: 'Guide Michelin', score: '★★', year: '2022-2024', description: 'Deux étoiles' },
      { name: 'Gault & Millau', score: '17/20', year: '2024', description: 'Cuisine d\'exception' },
      { name: 'James Beard Award', score: 'Winner', year: '2023', description: 'Outstanding Chef' },
      { name: 'La Liste', score: '94.75', year: '2024', description: 'Top 200 Mondial' }
    ],
    
    // CONTACT
    address: project.data.contact?.address || '38 Rue de l\'Université, 75007 Paris',
    phone: project.data.contact?.phone || '+33 1 47 05 86 89',
    email: project.data.contact?.email || 'reservation@ateliersarahchen.fr',
    
    // REVIEWS LUXURY
    reviews: project.data.reviews?.testimonials || [
      {
        name: 'Sophie Laurent',
        role: 'Food Critic - Le Figaro',
        content: 'Une expérience gastronomique absolument transcendante. Chaque bouchée révèle la maîtrise technique et la créativité sans bornes du chef.',
        rating: 5,
        source: 'Le Figaro'
      },
      {
        name: 'Marco Benedetti', 
        role: 'Michelin Inspector',
        content: 'La précision de l\'exécution et l\'équilibre parfait des saveurs justifient pleinement les deux étoiles.',
        rating: 5,
        source: 'Guide Michelin'
      }
    ],
    
    // EVENTS EXCLUSIFS
    events: project.data.events?.events || [
      {
        title: 'Dîner aux Truffes d\'Alba',
        description: 'Soirée exceptionnelle dédiée au joyau de l\'automne piémontais. Menu spécialement conçu autour de la truffe blanche d\'Alba.',
        date: '15 Novembre 2024',
        time: '19:30',
        price: '€395',
        capacity: '16'
      }
    ]
  };

  // EFFECTS
  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleLoad = () => setIsLoaded(true);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('load', handleLoad);
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % restaurantData.heroImages.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleLoad);
      clearInterval(interval);
    };
  }, []);

  // PREMIUM TYPOGRAPHY LOADING
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
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
      {/* NAVIGATION SOPHISTIQUÉE */}
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
            {restaurantData.businessName}
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-light">
            <a href="#story" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Notre Histoire</a>
            <a href="#menu" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Carte</a>
            <a href="#gallery" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Galerie</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors duration-500 tracking-wide">Réservation</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION CINEMATOGRAPHIQUE */}
      <section className="relative h-screen overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0">
          {restaurantData.heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(11,11,15,0.3), rgba(11,11,15,0.7)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${1.05 + scrollY * 0.0002})`,
              }}
            />
          ))}
        </div>

        {/* Grain Texture */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-5xl px-8">
            <div 
              className="text-sm tracking-[0.25em] text-[#D4AF37] mb-8 font-light opacity-95 uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {restaurantData.tagline}
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
              {restaurantData.businessName}
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
              {restaurantData.description}
            </p>
            
            {/* CTA Buttons */}
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

        {/* Image Indicators */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          {restaurantData.heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-[#D4AF37]' 
                  : 'bg-white bg-opacity-40 hover:bg-opacity-70'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-xs tracking-widest opacity-70">
            <span>DÉFILER</span>
            <div className="w-px h-16 bg-white animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* AWARDS FLOATING */}
      <section className="relative py-20 bg-gradient-to-b from-[#0B0B0F] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {restaurantData.awards.map((award, index) => (
              <div key={index} className="group">
                <div className="p-6 border border-[#D4AF37] border-opacity-20 hover:border-opacity-60 transition-all duration-500 backdrop-blur-sm">
                  <h3 
                    className="text-lg font-medium text-[#D4AF37] mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {award.name}
                  </h3>
                  <p className="text-sm opacity-70 font-light">
                    {award.score} • {award.year}
                  </p>
                  <p className="text-xs mt-1 opacity-60">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF STORY */}
      <section id="story" className="relative py-32 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0F] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div 
                className="text-sm tracking-[0.2em] text-[#D4AF37] mb-6 font-light uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                NOTRE VISION
              </div>
              <h2 
                className="text-5xl md:text-6xl font-light mb-8 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                L'Art de la Fusion
              </h2>
              <div 
                className="text-xl text-[#D4AF37] mb-6 font-medium"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {restaurantData.chef.name}
              </div>
              <p 
                className="text-lg leading-relaxed opacity-90 font-light"
                style={{ fontFamily: "'Source Serif 4', serif", lineHeight: '1.8' }}
              >
                {restaurantData.chef.story}
              </p>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={restaurantData.chef.image}
                  alt={restaurantData.chef.name}
                  className="w-full h-[600px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] from-0% via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU PREMIUM */}
      <section id="menu" className="relative py-32 bg-[#0B0B0F] scroll-mt-24">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-20">
            <div 
              className="text-sm tracking-[0.2em] text-[#D4AF37] mb-6 font-light uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              EXPÉRIENCE CULINAIRE
            </div>
            <h2 
              className="text-5xl md:text-6xl font-light mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nos Menus
            </h2>
          </div>

          {restaurantData.menu.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border border-[#D4AF37] border-opacity-20 p-8 md:p-12 backdrop-blur-sm mb-16">
              <div className="text-center mb-10">
                <h3 
                  className="text-3xl font-light mb-4 text-[#D4AF37]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {section.name}
                </h3>
                <div 
                  className="text-2xl font-light mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
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
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-3 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <p 
                        className="text-lg leading-relaxed font-light group-hover:text-[#D4AF37] transition-colors duration-300"
                        style={{ fontFamily: "'Source Serif 4', serif" }}
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
      </section>

      {/* REVIEWS */}
      <section className="relative py-32 bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0F]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <div 
              className="text-sm tracking-[0.2em] text-[#D4AF37] mb-6 font-light uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              TÉMOIGNAGES
            </div>
            <h2 
              className="text-5xl md:text-6xl font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nos Invités
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {restaurantData.reviews.map((review, index) => (
              <div key={index} className="border border-[#D4AF37] border-opacity-20 p-8 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-[#D4AF37] text-lg">★</span>
                  ))}
                </div>
                <blockquote 
                  className="text-lg font-light leading-relaxed mb-6 italic opacity-90"
                  style={{ fontFamily: "'Source Serif 4', serif" }}
                >
                  "{review.content}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div 
                      className="font-medium text-[#D4AF37]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {review.name}
                    </div>
                    <div className="text-sm opacity-70">{review.role}</div>
                  </div>
                  <div className="text-xs opacity-60 font-mono">
                    {review.source}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-16 bg-gradient-to-t from-[#0B0B0F] to-[#1a1a1a] border-t border-[#D4AF37] border-opacity-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div 
              className="text-2xl tracking-wider font-light mb-4"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '0.15em'
              }}
            >
              {restaurantData.businessName}
            </div>
            <p className="text-sm opacity-70 mb-6">{restaurantData.address}</p>
            <p className="text-sm opacity-70 mb-6">{restaurantData.phone} • {restaurantData.email}</p>
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