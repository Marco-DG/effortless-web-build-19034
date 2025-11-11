import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, Monitor, Info, 
  Images, Star, Calendar, Phone, Clock, MapPin, Mail, 
  LayoutTemplate, Navigation2, Coffee, Truck,
  Palette
} from 'lucide-react';
import { getAllFonts, ensureGoogleFontLoaded } from '@/lib/fonts';
import { OptionList } from '@/components/ui/option-list';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NewsletterEditor, DeliveryEditor, ContactEditor, HoursEditor, LocationEditor } from './site-editors';
import { TemplateSelector } from '../templates/TemplateSelector';
import { ComponentsManager } from './ComponentsManager';

// Sezioni semplici - ogni sezione = un componente template
const TEMPLATE_SECTIONS = [
  // TEMPLATE
  { id: 'template', label: 'Template', icon: Palette, category: 'template' },
  
  // ESSENZIALI
  { id: 'components', label: 'Componenti', icon: LayoutTemplate, category: 'essential' },
  { id: 'hero', label: 'Hero', icon: Monitor, category: 'essential' },
  { id: 'typography', label: 'Tipografia', icon: Type, category: 'essential' },
  
  // CONTENUTI
  { id: 'about', label: 'Chi siamo', icon: Info, category: 'content' },
  { id: 'gallery', label: 'Galleria', icon: Images, category: 'content' },
  { id: 'newsletter', label: 'Newsletter', icon: Mail, category: 'content' },
  
  // INFORMAZIONI
  { id: 'contact', label: 'Contatti', icon: Phone, category: 'info' },
  { id: 'hours', label: 'Orari', icon: Clock, category: 'info' },
  { id: 'location', label: 'Posizione', icon: MapPin, category: 'info' },
  
  // SOCIAL & MARKETING
  { id: 'reviews', label: 'Recensioni', icon: Star, category: 'marketing' },
  { id: 'events', label: 'Eventi', icon: Calendar, category: 'marketing' },
  { id: 'delivery', label: 'Delivery', icon: Truck, category: 'marketing' },
] as const;

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
      case 'newsletter':
        return <NewsletterEditor project={activeProject} onUpdate={updateProject} />;
      case 'reviews':
        return <ReviewsEditor project={activeProject} onUpdate={updateProject} />;
      case 'events':
        return <EventsEditor project={activeProject} onUpdate={updateProject} />;
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

  const currentSection = TEMPLATE_SECTIONS.find(s => s.id === activeSection);

  return (
    <div className="h-full w-full lg:w-auto flex flex-col bg-white lg:rounded-l-2xl border-r border-border shadow-lg overflow-hidden">
      
      {/* Header con tab condivisa */}
      {onSwitchBuilder && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white/80 backdrop-blur text-xs font-medium">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('logo')} 
              className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground"
            >
              Logo
            </button>
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('menu')} 
              className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground"
            >
              Menù
            </button>
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('site')} 
              className="px-3 py-1.5 rounded bg-muted text-foreground"
            >
              Sito Web
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              className="lg:hidden inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs font-medium"
            >
              <Monitor className="w-3.5 h-3.5" /> Anteprima
            </button>
            <button
              onClick={closeSidebar}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <LayoutTemplate className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        
        {/* Sidebar Navigation */}
        <div className="w-10 2xl:w-40 border-r border-border bg-white/50 backdrop-blur flex flex-col py-2 flex-shrink-0">
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-1">
              {TEMPLATE_SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-center 2xl:justify-start px-2 py-3 2xl:px-3 2xl:py-2.5 text-sm transition-all duration-200 rounded-lg group ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <section.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden 2xl:block ml-3 text-left font-medium">
                      {section.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Section Editor */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Section Header */}
          <div className="px-6 py-4 border-b bg-white/80 backdrop-blur">
            <div className="flex items-center gap-3">
              {currentSection && (
                <>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <currentSection.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{currentSection.label}</h3>
                    <p className="text-sm text-muted-foreground">
                      Personalizza questo componente del template
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {renderSectionEditor()}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
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
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Tipografia del Sito</h4>
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
              className={`text-left p-3 rounded-lg border hover:bg-muted/50 transition-colors ${applyTarget === key ? "border-primary bg-primary/5" : "border-border"}`}
            >
              <div className="text-xs text-muted-foreground mb-1">{label}</div>
              <div className="text-sm font-medium truncate" style={{ fontFamily: value }}>{value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold">Scegli Font per {
          applyTarget === "fontHeading" ? "Titoli" : 
          applyTarget === "fontSubheading" ? "Sottotitoli" : 
          "Corpo del Testo"
        }</h4>
        
        <OptionList
          enableSearch
          searchPlaceholder="Cerca font..."
          onSearchChange={setQuery}
          searchAddon={(
            <Select value={category} onValueChange={(v)=> setCategory(v as any)}>
              <SelectTrigger className="w-[140px] h-9 text-xs">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                {(["Tutti","Preferiti","Sans-serif","Serif","Monospace","Display"] as const).map(c => (
                  <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          items={filtered.map((font: any) => ({
            id: font.id,
            title: font.name,
            description: font.category,
            meta: (
              <span
                role="button"
                tabIndex={0}
                onClick={(e)=>{ e.stopPropagation(); toggleFavorite(font.id); }}
                onKeyDown={(e)=>{ if(e.key==='Enter'){ e.stopPropagation(); toggleFavorite(font.id); } }}
                className={`p-1 rounded hover:bg-white/60 transition-colors ${favorites.includes(font.id) ? "text-yellow-500" : "text-muted-foreground"}`}
                aria-label={favorites.includes(font.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              >
                <Star className={`w-4 h-4 ${favorites.includes(font.id) ? "fill-yellow-400" : ""}`} />
              </span>
            )
          }))}
          selectedId={selectedFont}
          onSelect={(id)=> {
            const font = filtered.find((f:any)=> f.id === id);
            if (font) handleSelect(font);
          }}
          ariaLabel="Seleziona font"
          showSelectedCheck
        />
      </div>
    </div>
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
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Sezione Hero</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Principale</label>
            <input 
              type="text"
              value={hero.title || 'Osteria del Borgo'}
              onChange={(e) => updateHeroSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Osteria del Borgo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sottotitolo</label>
            <input 
              type="text"
              value={hero.subtitle || 'Tradizione e sapori autentici nel cuore della città'}
              onChange={(e) => updateHeroSection({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Tradizione e sapori autentici nel cuore della città"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Immagine di Sfondo</label>
            <input 
              type="url"
              value={hero.imageUrl || 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop'}
              onChange={(e) => updateHeroSection({ imageUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop"
            />
            {hero.imageUrl && (
              <div className="mt-2">
                <img 
                  src={hero.imageUrl} 
                  alt="Anteprima Hero" 
                  className="w-full h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Chi Siamo</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Sezione</label>
            <input 
              type="text"
              value={about.title || 'La nostra storia'}
              onChange={(e) => updateAboutSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="La nostra storia"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Contenuto</label>
            <textarea 
              value={about.content || 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia. Ogni piatto è preparato con ingredienti freschi e locali, rispettando le ricette della tradizione italiana e l\'arte dell\'ospitalità.'}
              onChange={(e) => updateAboutSection({ content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Da tre generazioni portiamo avanti la tradizione culinaria di famiglia..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Immagine URL</label>
            <input 
              type="url"
              value={about.image || 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop'}
              onChange={(e) => updateAboutSection({ image: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Posizione Immagine</label>
            <select 
              value={about.imagePosition || 'left'}
              onChange={(e) => updateAboutSection({ imagePosition: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="left">Sinistra</option>
              <option value="right">Destra</option>
            </select>
          </div>
        </div>
      </div>
    </div>
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
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Galleria Foto</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Galleria</label>
            <input 
              type="text"
              value={gallery.title || 'La Nostra Galleria'}
              onChange={(e) => updateGallerySection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="La Nostra Galleria"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sottotitolo</label>
            <input 
              type="text"
              value={gallery.subtitle || ''}
              onChange={(e) => updateGallerySection({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Scopri l'atmosfera e i piatti del nostro ristorante"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Colonne</label>
            <select 
              value={gallery.columns || 3}
              onChange={(e) => updateGallerySection({ columns: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value={2}>2 Colonne</option>
              <option value={3}>3 Colonne</option>
              <option value={4}>4 Colonne</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Immagini ({images.length})</h4>
          <button 
            onClick={addImage}
            className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
          >
            Aggiungi Immagine
          </button>
        </div>

        <div className="space-y-4">
          {images.map((image: any, index: number) => (
            <div key={image.id} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">URL Immagine</label>
                  <input 
                    type="url"
                    value={image.url}
                    onChange={(e) => updateImage(index, 'url', e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Didascalia</label>
                  <input 
                    type="text"
                    value={image.caption}
                    onChange={(e) => updateImage(index, 'caption', e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm"
                    placeholder="Descrizione dell'immagine"
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => removeImage(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

