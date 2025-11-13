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
import { OptionList } from '@/components/ui/option-list';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

