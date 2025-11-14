import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { 
  Star, Calendar, Phone, Clock, MapPin, Mail, 
  Coffee, Truck
} from 'lucide-react';
import { UnifiedBuilderLayout, BuilderSection } from '../../components/UnifiedBuilderLayout';
import { 
  TemplateIcon, ComponentsIcon, TypographyIcon, CanvasIcon,
  InfoIcon, GalleryIcon
} from '../../components/icons/PremiumIcons';
import { getAllFonts, ensureGoogleFontLoaded } from '@/lib/fonts';
import { PremiumCard, PremiumTextInput, PremiumSelect, PremiumToggle, PremiumActionButton } from '../../components/forms';
import { NewsletterEditor, DeliveryEditor, ContactEditor, HoursEditor, LocationEditor } from './site-editors';
import { ReviewsEditor, EventsEditor } from './additional-editors';
import { TemplateSelector } from '../templates/TemplateSelector';
import { ComponentsManager } from './ComponentsManager';

// Sezioni semplici - ogni sezione = un componente template
const TEMPLATE_SECTIONS: readonly BuilderSection[] = [
  // CONFIGURAZIONE
  { id: 'template', label: 'Template', icon: TemplateIcon, category: 'config', description: 'Scegli il design del tuo sito' },
  { id: 'components', label: 'Componenti', icon: ComponentsIcon, category: 'config', description: 'Gestisci sezioni e layout' },
  { id: 'typography', label: 'Tipografia', icon: TypographyIcon, category: 'config', description: 'Font e stili di testo' },
  
  // ASPETTO 
  { id: 'hero', label: 'Hero', icon: CanvasIcon, category: 'appearance', description: 'Sezione principale della homepage' },
  { id: 'about', label: 'Chi siamo', icon: InfoIcon, category: 'appearance', description: 'Descrizione del ristorante' },
  { id: 'gallery', label: 'Galleria', icon: GalleryIcon, category: 'appearance', description: 'Immagini e foto del locale' },
  { id: 'reviews', label: 'Recensioni', icon: Star, category: 'appearance', description: 'Testimonianze clienti' },
  { id: 'events', label: 'Eventi', icon: Calendar, category: 'appearance', description: 'Eventi e promozioni' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, category: 'appearance', description: 'Iscrizione mailing list' },
  { id: 'location', label: 'Posizione', icon: MapPin, category: 'appearance', description: 'Mappa e indicazioni' },
  
  // DATI
  { id: 'contact', label: 'Contatti', icon: Phone, category: 'data', description: 'Informazioni di contatto' },
  { id: 'hours', label: 'Orari', icon: Clock, category: 'data', description: 'Orari di apertura' },
  { id: 'delivery', label: 'Delivery', icon: Truck, category: 'data', description: 'Servizio di consegna' },
];

type TemplateSectionId = typeof TEMPLATE_SECTIONS[number]['id'];

interface SimpleSiteBuilderProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

export const SimpleSiteBuilder: React.FC<SimpleSiteBuilderProps> = ({ onSwitchBuilder }) => {
  const { activeProject, updateProject, closeSidebar } = useAppStore();
  const [activeSection, setActiveSection] = useState<TemplateSectionId>('template');
  
  if (!activeProject) return null;

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'template':
        return <TemplateSelector project={activeProject} onUpdate={updateProject} />;
      case 'components':
        return <ComponentsManager project={activeProject} onUpdate={updateProject} />;
      case 'typography':
        return <TypographyEditor project={activeProject} onUpdate={updateProject} />;
      case 'hero':
        return <HeroEditor project={activeProject} onUpdate={updateProject} />;
      case 'about':
        return <AboutEditor project={activeProject} onUpdate={updateProject} />;
      case 'gallery':
        return <GalleryEditor project={activeProject} onUpdate={updateProject} />;
      case 'reviews':
        return <ReviewsEditor project={activeProject} onUpdate={updateProject} />;
      case 'events':
        return <EventsEditor project={activeProject} onUpdate={updateProject} />;
      case 'newsletter':
        return <NewsletterEditor project={activeProject} onUpdate={updateProject} />;
      case 'delivery':
        return <DeliveryEditor project={activeProject} onUpdate={updateProject} />;
      case 'contact':
        return <ContactEditor project={activeProject} onUpdate={updateProject} />;
      case 'hours':
        return <HoursEditor project={activeProject} onUpdate={updateProject} />;
      case 'location':
        return <LocationEditor project={activeProject} onUpdate={updateProject} />;
      default:
        return <div className="p-6 text-center text-muted-foreground">Sezione in sviluppo...</div>;
    }
  };

  return (
    <UnifiedBuilderLayout
      builderType="site"
      sections={TEMPLATE_SECTIONS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSwitchBuilder={onSwitchBuilder}
    >
      {renderSectionEditor()}
    </UnifiedBuilderLayout>
  );
};

// Componenti Editor Semplici
interface EditorProps {
  project: any;
  onUpdate: (updates: any) => void;
}


// TemplateEditor rimosso - ora usiamo TemplateSelector

const TypographyEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const [applyTarget, setApplyTarget] = React.useState<"fontHeading" | "fontSubheading" | "fontBody">("fontHeading");
  
  // Ottieni i font dal tema del template
  const theme = project.data.site?.theme || {};
  const fonts = theme.fonts || {};
  
  const selectedFont = applyTarget === "fontHeading"
    ? (fonts.heading || "Playfair Display")
    : applyTarget === "fontSubheading" 
    ? (fonts.subheading || "Inter")
    : (fonts.body || "Inter");

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<"Tutti"|"Sans-serif"|"Serif"|"Monospace"|"Display"|"Preferiti">("Tutti");
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("favoriteFonts");
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  });

  const allFonts = React.useMemo(() => getAllFonts(), []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const favActive = category === "Preferiti";
    return allFonts.filter((f: any) => {
      const mq = !q || f.name.toLowerCase().includes(q);
      const mc = category === "Tutti" || category === "Preferiti" || f.category === category;
      const mf = !favActive || favorites.includes(f.id);
      return mq && mc && mf;
    });
  }, [query, category, favorites, allFonts]);

  React.useEffect(() => {
    const current = allFonts.find((f: any) => f.id === selectedFont);
    if (current) ensureGoogleFontLoaded(current.id, current.google);
  }, [selectedFont, allFonts]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id];
      try { localStorage.setItem("favoriteFonts", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleSelect = (font: any) => {
    ensureGoogleFontLoaded(font.id, font.google);
    
    const currentTheme = project.data.site?.theme || {};
    const currentFonts = currentTheme.fonts || {};
    
    const updatedFonts = { ...currentFonts };
    
    if (applyTarget === "fontHeading") {
      updatedFonts.heading = font.id;
    } else if (applyTarget === "fontSubheading") {
      updatedFonts.subheading = font.id;
    } else {
      updatedFonts.body = font.id;
    }
    
    onUpdate({ 
      site: { 
        ...project.data.site, 
        theme: { 
          ...currentTheme,
          fonts: updatedFonts,
          // Mantieni compatibilità con sistema legacy
          fontPrimary: updatedFonts.body || currentTheme.fontPrimary,
          fontSecondary: updatedFonts.heading || currentTheme.fontSecondary
        } 
      } 
    });
  };

  return (
    <PremiumCard
      title="Tipografia del Sito"
      description="Configura i font per titoli, sottotitoli e corpo del testo del tuo sito"
    >
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-slate-800 font-geist tracking-[-0.01em] mb-4">Font Attualmente Utilizzati</h4>
          <div className="grid grid-cols-1 gap-3">
            {([
              { key: "fontHeading", label: "Titoli", value: fonts.heading || "Playfair Display" },
              { key: "fontSubheading", label: "Sottotitoli", value: fonts.subheading || "Inter" },
              { key: "fontBody", label: "Corpo", value: fonts.body || "Inter" },
            ] as const).map(({ key, label, value }) => (
              <button
                key={key}
                type="button"
                onClick={() => setApplyTarget(key as any)}
                className={`text-left p-4 rounded-[12px] border transition-all duration-300 ${
                  applyTarget === key 
                    ? "border-slate-400/60 bg-gradient-to-br from-white/90 to-slate-50/60 shadow-sm backdrop-blur-sm" 
                    : "border-slate-200/50 bg-white/40 hover:bg-white/60 hover:border-slate-300/50"
                }`}
              >
                <div className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] mb-1">{label}</div>
                <div className="text-sm font-semibold truncate text-slate-800 font-geist tracking-[-0.01em]" style={{ fontFamily: value }}>
                  {value}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-800 font-geist tracking-[-0.01em]">
            Scegli Font per {
              applyTarget === "fontHeading" ? "Titoli" : 
              applyTarget === "fontSubheading" ? "Sottotitoli" : 
              "Corpo del Testo"
            }
          </h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <PremiumTextInput
                label="Cerca Font"
                value={query}
                onChange={setQuery}
                placeholder="Cerca font..."
                description="Cerca per nome del font"
              />
              
              <PremiumSelect
                label="Categoria"
                value={category}
                onChange={(value) => setCategory(value as any)}
                options={[
                  { value: "Tutti", label: "Tutti i font" },
                  { value: "Preferiti", label: "I miei preferiti" },
                  { value: "Sans-serif", label: "Sans-serif - Moderni" },
                  { value: "Serif", label: "Serif - Classici" },
                  { value: "Monospace", label: "Monospace - Tecnici" },
                  { value: "Display", label: "Display - Decorativi" }
                ]}
                description="Filtra per categoria di font"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filtered.map((font: any) => (
                <div
                  key={font.id}
                  onClick={() => handleSelect(font)}
                  className={`group cursor-pointer p-4 rounded-[12px] border transition-all duration-300 ${
                    selectedFont === font.id
                      ? "border-slate-400/60 bg-gradient-to-br from-white/90 to-slate-50/60 shadow-sm"
                      : "border-slate-200/50 bg-white/40 hover:bg-white/60 hover:border-slate-300/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-800 font-geist tracking-[-0.01em] mb-1" style={{ fontFamily: font.id }}>
                        {font.name}
                      </div>
                      <div className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em]">
                        {font.category}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          toggleFavorite(font.id); 
                        }}
                        className={`p-1.5 rounded-[8px] transition-all duration-200 ${
                          favorites.includes(font.id) 
                            ? "text-amber-500 bg-amber-50" 
                            : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                        }`}
                        title={favorites.includes(font.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                      >
                        <Star className={`w-4 h-4 ${favorites.includes(font.id) ? "fill-amber-400" : ""}`} />
                      </button>
                      
                      {selectedFont === font.id && (
                        <div className="w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
};

const HeroEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const hero = project.data.site?.sections?.find((s: any) => s.type === 'hero')?.data || {};
  
  const updateHeroSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const heroSection = sections.find((s: any) => s.type === 'hero');
    if (heroSection) {
      heroSection.data = { ...heroSection.data, ...updates };
    } else {
      sections.push({
        id: 'hero_main',
        type: 'hero',
        enabled: true,
        order: 0,
        data: { 
          title: 'Osteria del Borgo',
          subtitle: 'Tradizione e sapori autentici nel cuore della città',
          imageUrl: 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop',
          ...updates 
        }
      });
    }
    onUpdate({
      site: { ...project.data.site, sections }
    });
  };
  
  return (
    <PremiumCard
      title="Sezione Hero"
      description="La sezione principale della homepage che accoglie i visitatori"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Titolo Principale"
          value={hero.title || 'Osteria del Borgo'}
          onChange={(value) => updateHeroSection({ title: value })}
          placeholder="Il nome del tuo ristorante"
          description="Il titolo principale che apparirà per primo ai visitatori"
        />
        
        <PremiumTextInput
          label="Sottotitolo"
          value={hero.subtitle || 'Tradizione e sapori autentici nel cuore della città'}
          onChange={(value) => updateHeroSection({ subtitle: value })}
          placeholder="Una breve descrizione del vostro stile"
          description="Descrizione che cattura l'essenza del vostro ristorante"
        />

        <PremiumTextInput
          label="Immagine di Sfondo"
          value={hero.imageUrl || 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop'}
          onChange={(value) => updateHeroSection({ imageUrl: value })}
          placeholder="https://images.unsplash.com/..."
          description="URL dell'immagine di sfondo per la sezione hero"
        />
        
        {hero.imageUrl && (
          <div className="rounded-[12px] overflow-hidden border border-slate-200/50 bg-white/60 backdrop-blur-sm p-3">
            <p className="text-xs text-slate-600 font-medium font-geist tracking-[-0.005em] mb-2">
              Anteprima immagine:
            </p>
            <img 
              src={hero.imageUrl} 
              alt="Anteprima Hero" 
              className="w-full h-32 object-cover rounded-[8px]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </PremiumCard>
  );
};

const AboutEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const about = project.data.site?.sections?.find((s: any) => s.type === 'about')?.data || {};
  
  const updateAboutSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const aboutSection = sections.find((s: any) => s.type === 'about');
    if (aboutSection) {
      aboutSection.data = { ...aboutSection.data, ...updates };
    } else {
      sections.push({
        id: 'about_main',
        type: 'about',
        enabled: true,
        order: 1,
        data: {
          title: 'La nostra storia',
          content: 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia. Ogni piatto è preparato con ingredienti freschi e locali, rispettando le ricette della tradizione italiana e l\'arte dell\'ospitalità.',
          image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop',
          imagePosition: 'left',
          ...updates
        }
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

  return (
    <PremiumCard
      title="Chi Siamo"
      description="Raccontate la storia del vostro ristorante e create un legame con i clienti"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Titolo Sezione"
          value={about.title || 'La nostra storia'}
          onChange={(value) => updateAboutSection({ title: value })}
          placeholder="La nostra storia"
          description="Il titolo che introduce la vostra storia"
        />
        
        <PremiumTextInput
          label="Racconto del Ristorante"
          value={about.content || 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia. Ogni piatto è preparato con ingredienti freschi e locali, rispettando le ricette della tradizione italiana e l\'arte dell\'ospitalità.'}
          onChange={(value) => updateAboutSection({ content: value })}
          placeholder="Da tre generazioni portiamo avanti..."
          description="Raccontate la vostra storia, filosofia e tradizione culinaria"
          multiline
          rows={6}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <PremiumTextInput
              label="Immagine del Ristorante"
              value={about.image || 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop'}
              onChange={(value) => updateAboutSection({ image: value })}
              placeholder="https://images.unsplash.com/..."
              description="Foto che rappresenti il vostro locale o la cucina"
            />
          </div>

          <PremiumSelect
            label="Posizione Immagine"
            value={about.imagePosition || 'left'}
            onChange={(value) => updateAboutSection({ imagePosition: value })}
            options={[
              { value: 'left', label: 'Sinistra - Immagine a sinistra del testo' },
              { value: 'right', label: 'Destra - Immagine a destra del testo' }
            ]}
            description="Come posizionare l'immagine rispetto al testo"
          />
        </div>
        
        {about.image && (
          <div className="rounded-[12px] overflow-hidden border border-slate-200/50 bg-white/60 backdrop-blur-sm p-3">
            <p className="text-xs text-slate-600 font-medium font-geist tracking-[-0.005em] mb-2">
              Anteprima immagine:
            </p>
            <img 
              src={about.image} 
              alt="Anteprima About" 
              className="w-full h-32 object-cover rounded-[8px]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </PremiumCard>
  );
};

const GalleryEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const gallery = project.data.site?.sections?.find((s: any) => s.type === 'gallery')?.data || {};
  const images = gallery.images || [];
  
  const updateGallerySection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const gallerySection = sections.find((s: any) => s.type === 'gallery');
    if (gallerySection) {
      gallerySection.data = { ...gallerySection.data, ...updates };
    } else {
      sections.push({
        id: 'gallery_main',
        type: 'gallery',
        enabled: true,
        order: 2,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

  const addImage = () => {
    const newImages = [...images, {
      id: `img_${Date.now()}`,
      url: '',
      caption: '',
      alt: ''
    }];
    updateGallerySection({ images: newImages });
  };

  const updateImage = (index: number, field: string, value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    updateGallerySection({ images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    updateGallerySection({ images: newImages });
  };

  return (
    <PremiumCard
      title="Galleria Foto"
      description="Mostra le foto del vostro ristorante, piatti e atmosfera"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Titolo Galleria"
          value={gallery.title || 'La Nostra Galleria'}
          onChange={(value) => updateGallerySection({ title: value })}
          placeholder="La Nostra Galleria"
          description="Il titolo che introduce la galleria fotografica"
        />

        <PremiumTextInput
          label="Sottotitolo"
          value={gallery.subtitle || ''}
          onChange={(value) => updateGallerySection({ subtitle: value })}
          placeholder="Scopri l'atmosfera e i piatti del nostro ristorante"
          description="Una descrizione opzionale per la galleria"
        />

        <PremiumSelect
          label="Layout Colonne"
          value={gallery.columns?.toString() || '3'}
          onChange={(value) => updateGallerySection({ columns: parseInt(value) })}
          options={[
            { value: '2', label: '2 Colonne - Layout ampio per poche immagini' },
            { value: '3', label: '3 Colonne - Layout equilibrato (consigliato)' },
            { value: '4', label: '4 Colonne - Layout compatto per molte foto' }
          ]}
          description="Numero di colonne per organizzare le immagini"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-800 font-geist tracking-[-0.01em]">
            Immagini ({images.length})
          </h4>
          <PremiumActionButton
            variant="primary"
            onClick={addImage}
            icon={() => (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
          >
            Aggiungi Immagine
          </PremiumActionButton>
        </div>

        <div className="space-y-4">
          {images.map((image: any, index: number) => (
            <div key={image.id} className="relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm p-4">
              <div className="space-y-3">
                <PremiumTextInput
                  label="URL Immagine"
                  value={image.url}
                  onChange={(value) => updateImage(index, 'url', value)}
                  placeholder="https://images.unsplash.com/..."
                  description="URL dell'immagine da aggiungere alla galleria"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <PremiumTextInput
                    label="Didascalia"
                    value={image.caption}
                    onChange={(value) => updateImage(index, 'caption', value)}
                    placeholder="Descrizione dell'immagine"
                    description="Testo che apparirà sotto l'immagine"
                  />
                  <PremiumTextInput
                    label="Testo Alternativo"
                    value={image.alt}
                    onChange={(value) => updateImage(index, 'alt', value)}
                    placeholder="Descrizione per accessibilità"
                    description="Testo per screen reader (accessibilità)"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <PremiumActionButton
                    variant="ghost"
                    onClick={() => removeImage(index)}
                    icon={() => (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    )}
                  >
                    Rimuovi
                  </PremiumActionButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PremiumCard>
  );
};

