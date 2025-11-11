import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  LayoutTemplate, 
  Type, 
  Monitor, 
  Info, 
  UtensilsCrossed, 
  Calendar, 
  Images, 
  Star, 
  Rocket, 
  HelpCircle, 
  Phone, 
  Clock, 
  Truck, 
  FileStack, 
  PenTool,
  FileText,
  LayoutGrid as LayoutGridIcon,
  Puzzle
} from 'lucide-react';
import { SectionType } from './types';
import { TemplateManager } from '../templates/TemplateManager';
import { SimpleSiteBuilder } from './SimpleSiteBuilder';

// Import dei componenti step dal vecchio builder (li adatteremo)
import { BuilderStep0 } from './steps/BuilderStep0';
import { BuilderStepLogo } from './steps/BuilderStepLogo';
import { BuilderStepTypography } from './steps/BuilderStepTypography';
import { BuilderStep3 } from './steps/BuilderStep3';
import { BuilderStep5 } from './steps/BuilderStep5';
import { BuilderStep4 } from './steps/BuilderStep4';
import { BuilderStep6 } from './steps/BuilderStep6';
import { BuilderStep7Reviews } from './steps/BuilderStep7Reviews';
import { BuilderStep7FAQ } from './steps/BuilderStep7FAQ';
import { BuilderStep8 } from './steps/BuilderStep8';
import { MenuBuilderStep } from './steps/MenuBuilderStep';

// Icone per le sezioni (come nel vecchio builder)
const SECTION_ICONS: Record<string, any> = {
  components: Puzzle,  // NUOVO - Sistema modulare
  logo: PenTool,
  template: LayoutTemplate,
  typography: Type,
  pages: FileStack,
  hero: Monitor,
  about: Info,
  menu: UtensilsCrossed,
  gallery: Images,
  events: Calendar,
  reviews: Star,
  faq: HelpCircle,
  contact: Phone,
  hours: Clock,
  delivery: Truck,
  reservation: Rocket
};

// Sezioni ridotte - alcune sono ora gestite dal ComponentBuilder
const APPEARANCE_SECTIONS = [
  { id: 'components', label: 'Componenti' }, // NUOVO - Sistema modulare
  { id: 'template', label: 'Template' },
  { id: 'pages', label: 'Pagine' },
  { id: 'typography', label: 'Tipografia' }
];

const DATA_SECTIONS = [
  { id: 'logo', label: 'Logo' },
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'Chi siamo' },
  { id: 'menu', label: 'Menù' },
  { id: 'gallery', label: 'Galleria' },
  { id: 'events', label: 'Eventi' },
  { id: 'reviews', label: 'Recensioni' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contatti' },
  { id: 'hours', label: 'Orari' },
  { id: 'delivery', label: 'Delivery' }
];

type BuilderSection = 'components' | 'template' | 'logo' | 'typography' | 'pages' | 'hero' | 'about' | 'menu' | 'gallery' | 'events' | 'reviews' | 'faq' | 'contact' | 'hours' | 'delivery' | 'reservation';

interface SiteBuilderControlsProps {
  macroTab?: 'logo' | 'menu' | 'site';
}

export const SiteBuilderControls: React.FC<SiteBuilderControlsProps> = ({ macroTab = 'site' }) => {
  const { activeProject, updateProject } = useAppStore();
  const [activeSection, setActiveSection] = useState<BuilderSection>(
    macroTab === 'logo' ? 'logo' : 
    macroTab === 'menu' ? 'menu' : 
    'components' // Inizia con il nuovo sistema modulare
  );
  
  if (!activeProject) return null;

  // Converti i dati V2 nel formato che si aspetta il vecchio builder
  const builderData = {
    // Dati business
    title: activeProject.data.business.name,
    description: activeProject.data.business.description,
    tagline: activeProject.data.business.tagline,
    
    // Template e tema
    template: activeProject.data.site.template,
    primaryColor: activeProject.data.site.theme?.colors?.primary || '#8B4513',
    secondaryColor: activeProject.data.site.theme?.colors?.secondary || '#D2691E',
    accentColor: activeProject.data.site.theme?.colors?.accent || '#F4E4C1',
    fontPrimary: activeProject.data.site.theme?.fonts?.heading?.family || 'Playfair Display',
    fontSecondary: activeProject.data.site.theme?.fonts?.body?.family || 'Inter',
    
    // Logo
    logoText: activeProject.data.logo.text || activeProject.data.business.name,
    logoFont: activeProject.data.logo.font || 'Playfair Display',
    logoSize: activeProject.data.logo.size || 48,
    logoColor: activeProject.data.logo.color || '#8B4513',
    
    // Menu
    menuItems: activeProject.data.menu.items || [],
    
    // Contatti
    address: activeProject.data.contact.address || '',
    phone: activeProject.data.contact.phone || '',
    email: activeProject.data.contact.email || '',
    socialLinks: activeProject.data.contact.socialLinks || {},
    
    // Orari
    hours: activeProject.data.hours || {},
    
    // Galleria
    gallery: activeProject.data.gallery || [],
    
    // Reviews
    reviews: activeProject.data.reviews || [],
    
    // Eventi
    events: activeProject.data.events || [],
    
    // Sezioni abilitate
    sectionsEnabled: activeProject.data.site.sections?.reduce((acc, section) => {
      acc[section.type] = section.enabled;
      return acc;
    }, {} as any) || {},
    
    // Ordine sezioni
    sectionsOrder: activeProject.data.site.sections?.map(s => s.type) || [],
    
    // Altre proprietà
    singlePage: true,
    deliveryLinks: {},
    reservationLink: '',
    blogPosts: []
  };

  const handleUpdateData = (updates: any) => {
    // Converti gli aggiornamenti dal formato vecchio al nuovo
    const newData: any = {};
    
    // Aggiorna business data
    if (updates.title !== undefined || updates.description !== undefined || updates.tagline !== undefined) {
      newData.business = {
        ...activeProject.data.business,
        ...(updates.title !== undefined && { name: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.tagline !== undefined && { tagline: updates.tagline })
      };
    }
    
    // Aggiorna tema
    if (updates.primaryColor || updates.secondaryColor || updates.accentColor || updates.fontPrimary || updates.fontSecondary) {
      newData.site = {
        ...activeProject.data.site,
        theme: {
          ...activeProject.data.site.theme,
          colors: {
            ...activeProject.data.site.theme.colors,
            ...(updates.primaryColor && { primary: updates.primaryColor }),
            ...(updates.secondaryColor && { secondary: updates.secondaryColor }),
            ...(updates.accentColor && { accent: updates.accentColor })
          },
          fonts: {
            ...activeProject.data.site.theme.fonts,
            ...(updates.fontPrimary && { 
              heading: { ...activeProject.data.site.theme.fonts.heading, family: updates.fontPrimary }
            }),
            ...(updates.fontSecondary && { 
              body: { ...activeProject.data.site.theme.fonts.body, family: updates.fontSecondary }
            })
          }
        }
      };
    }
    
    // Aggiorna logo
    if (updates.logoText || updates.logoFont || updates.logoSize || updates.logoColor) {
      newData.logo = {
        ...activeProject.data.logo,
        ...(updates.logoText !== undefined && { text: updates.logoText }),
        ...(updates.logoFont && { font: updates.logoFont }),
        ...(updates.logoSize !== undefined && { size: updates.logoSize }),
        ...(updates.logoColor && { color: updates.logoColor })
      };
    }
    
    // Aggiorna menu
    if (updates.menuItems) {
      newData.menu = {
        ...activeProject.data.menu,
        items: updates.menuItems
      };
    }
    
    // Aggiorna contatti
    if (updates.address || updates.phone || updates.email || updates.socialLinks) {
      newData.contact = {
        ...activeProject.data.contact,
        ...(updates.address !== undefined && { address: updates.address }),
        ...(updates.phone !== undefined && { phone: updates.phone }),
        ...(updates.email !== undefined && { email: updates.email }),
        ...(updates.socialLinks && { socialLinks: { ...activeProject.data.contact.socialLinks, ...updates.socialLinks } })
      };
    }
    
    // Aggiorna altri dati diretti
    if (updates.hours) newData.hours = updates.hours;
    if (updates.gallery) newData.gallery = updates.gallery;
    if (updates.reviews) newData.reviews = updates.reviews;
    if (updates.events) newData.events = updates.events;
    
    // Aggiorna sezioni
    if (updates.sectionsEnabled || updates.sectionsOrder) {
      const currentSections = activeProject.data.site.sections || [];
      let newSections = [...currentSections];
      
      if (updates.sectionsEnabled) {
        newSections = newSections.map(section => ({
          ...section,
          enabled: updates.sectionsEnabled[section.type] !== undefined 
            ? updates.sectionsEnabled[section.type] 
            : section.enabled
        }));
      }
      
      if (updates.sectionsOrder) {
        newSections.sort((a, b) => {
          const orderA = updates.sectionsOrder.indexOf(a.type);
          const orderB = updates.sectionsOrder.indexOf(b.type);
          return orderA - orderB;
        });
        newSections.forEach((section, index) => {
          section.order = index;
        });
      }
      
      if (!newData.site) newData.site = { ...activeProject.data.site };
      newData.site.sections = newSections;
    }
    
    updateProject(newData);
  };

  // Renderizza il contenuto della sezione attiva (come nel vecchio builder)
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'components':
        return <SimpleSiteBuilder />;
      case 'template':
        return (
          <BuilderStep0
            data={builderData}
            onUpdate={handleUpdateData}
            onNext={() => setActiveSection('components')}
          />
        );
      case 'logo':
        return (
          <BuilderStepLogo
            data={builderData}
            onUpdate={handleUpdateData}
            onGoDesignLogo={() => setActiveSection('typography')}
          />
        );
      case 'typography':
        return (
          <BuilderStepTypography
            data={builderData}
            onUpdate={handleUpdateData}
          />
        );
      case 'pages':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Pagine</h3>
            <p className="text-sm text-muted-foreground">
              Scegli Pagina singola o Pagine multiple. In modalità multiple, i componenti vengono distribuiti tra le pagine standard.
            </p>

            <div className="rounded-md border border-border p-1 bg-white/70">
              <ToggleGroup
                type="single"
                value={builderData.singlePage ? 'single' : 'multi'}
                onValueChange={(v) => v && handleUpdateData({ singlePage: v === 'single' })}
                className="grid grid-cols-2 gap-1"
              >
                <ToggleGroupItem
                  value="single"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
                >
                  <FileText className="h-4 w-4" />
                  <span>Pagina singola</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="multi"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
                >
                  <LayoutGridIcon className="h-4 w-4" />
                  <span>Pagine multiple</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              {builderData.sectionsOrder.map((key: string, idx: number) => (
                <div key={key} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={!!builderData.sectionsEnabled[key]} 
                      onChange={() => {
                        const newEnabled = { ...builderData.sectionsEnabled };
                        newEnabled[key] = !newEnabled[key];
                        handleUpdateData({ sectionsEnabled: newEnabled });
                      }} 
                    />
                    <span className="text-sm font-medium capitalize">
                      {[...APPEARANCE_SECTIONS, ...DATA_SECTIONS].find(s => s.id === key)?.label || key}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => {
                        if (idx > 0) {
                          const newOrder = [...builderData.sectionsOrder];
                          [newOrder[idx], newOrder[idx - 1]] = [newOrder[idx - 1], newOrder[idx]];
                          handleUpdateData({ sectionsOrder: newOrder });
                        }
                      }} 
                      className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                    >
                      ↑
                    </button>
                    <button 
                      onClick={() => {
                        if (idx < builderData.sectionsOrder.length - 1) {
                          const newOrder = [...builderData.sectionsOrder];
                          [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
                          handleUpdateData({ sectionsOrder: newOrder });
                        }
                      }} 
                      className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'hero':
        return (
          <BuilderStep3
            data={builderData}
            onUpdate={handleUpdateData}
            onNext={() => setActiveSection('about')}
            onBack={() => setActiveSection('template')}
          />
        );
      case 'about':
        return (
          <BuilderStep5
            data={builderData}
            onUpdate={handleUpdateData}
            onNext={() => setActiveSection('menu')}
            onBack={() => setActiveSection('hero')}
          />
        );
      case 'menu':
        return (
          <MenuBuilderStep 
            data={builderData}
            onUpdate={handleUpdateData}
          />
        );
      case 'gallery':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Galleria</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {(builderData.gallery || []).map((g: any, idx: number) => (
                <div key={g.id} className="relative group">
                  <img src={g.url} className="w-full h-20 sm:h-24 object-cover rounded" />
                  <button
                    onClick={() => {
                      const newGallery = builderData.gallery.filter((_: any, i: number) => i !== idx);
                      handleUpdateData({ gallery: newGallery });
                    }}
                    className="absolute top-1 right-1 text-xs bg-white/80 hover:bg-white text-red-600 rounded px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'events':
        return (
          <BuilderStep6
            data={builderData}
            onUpdate={handleUpdateData}
            onNext={() => setActiveSection('reviews')}
            onBack={() => setActiveSection('menu')}
          />
        );
      case 'reviews':
        return (
          <BuilderStep7Reviews
            data={builderData}
            onUpdate={handleUpdateData}
            onNext={() => setActiveSection('contact')}
            onBack={() => setActiveSection('events')}
          />
        );
      case 'faq':
        return (
          <BuilderStep7FAQ
            data={builderData}
            onUpdate={handleUpdateData}
            onNext={() => setActiveSection('contact')}
            onBack={() => setActiveSection('reviews')}
          />
        );
      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contatti</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="address" className="text-xs">Indirizzo</Label>
                <Input 
                  id="address" 
                  placeholder="Via Roma 1, Milano" 
                  value={builderData.address} 
                  onChange={(e) => handleUpdateData({ address: e.target.value })} 
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs">Telefono</Label>
                <Input 
                  id="phone" 
                  placeholder="+39 02 1234567" 
                  value={builderData.phone} 
                  onChange={(e) => handleUpdateData({ phone: e.target.value })} 
                  className="mt-1" 
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="info@esempio.it" 
                value={builderData.email} 
                onChange={(e) => handleUpdateData({ email: e.target.value })} 
                className="mt-1" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Social Media (opzionale)</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input 
                  placeholder="Facebook URL" 
                  value={builderData.socialLinks.facebook || ''} 
                  onChange={(e) => handleUpdateData({ 
                    socialLinks: { ...builderData.socialLinks, facebook: e.target.value } 
                  })} 
                />
                <Input 
                  placeholder="Instagram URL" 
                  value={builderData.socialLinks.instagram || ''} 
                  onChange={(e) => handleUpdateData({ 
                    socialLinks: { ...builderData.socialLinks, instagram: e.target.value } 
                  })} 
                />
              </div>
            </div>
          </div>
        );
      case 'hours':
        return (
          <BuilderStep8
            data={builderData}
            onUpdate={handleUpdateData}
            onNext={() => setActiveSection('delivery')}
            onBack={() => setActiveSection('contact')}
          />
        );
      case 'delivery':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Delivery & Prenotazioni</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reservationLink" className="text-sm font-medium">
                  Link prenotazioni (opzionale)
                </Label>
                <Input 
                  id="reservationLink" 
                  placeholder="https://thefork.com/..." 
                  value={builderData.reservationLink || ''} 
                  onChange={(e) => handleUpdateData({ reservationLink: e.target.value })} 
                  className="mt-2" 
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Riproduce esattamente il layout del vecchio builder
  return (
    <div className="h-full w-full lg:w-auto flex flex-col bg-white lg:rounded-l-2xl border-r border-border shadow-lg overflow-hidden transition-all duration-700 ease-out">
      
      {/* Sidebar Content - Layout esatto del vecchio builder */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Subnavigation con icone (colonna sinistra) */}
        <div className="w-10 2xl:w-36 border-r border-border bg-white/50 backdrop-blur flex flex-col py-2 2xl:py-4 flex-shrink-0">
          {(macroTab === 'logo'
            ? [{ id: 'logo', label: 'Logo' }]
            : macroTab === 'menu'
            ? [{ id: 'menu', label: 'Menù' }]
            : [...APPEARANCE_SECTIONS, ...DATA_SECTIONS]).map((section) => {
            const isActive = activeSection === section.id;
            const Icon = SECTION_ICONS[section.id];
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as BuilderSection)}
                className={`flex items-center justify-center 2xl:justify-between px-1 2xl:px-4 py-2 2xl:py-2 text-base 2xl:text-sm transition-colors hover-raise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? 'bg-white/80 text-primary 2xl:border-l-2 2xl:border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 2xl:w-5 2xl:h-5" />
                <span className="hidden 2xl:inline">{section.label}</span>
                <span className="sr-only">{isActive ? ' (attivo)' : ''}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content (colonna destra) */}
        <ScrollArea className="flex-1 min-w-0">
          <div className="p-4 2xl:p-6">
            {/* Contenuto animato della sezione */}
            <div>
              {renderSectionContent()}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

// Helper function per dati default delle sezioni
function getDefaultSectionData(type: SectionType) {
  switch (type) {
    case 'hero':
      return {
        title: 'Benvenuti al nostro ristorante',
        subtitle: 'Un\'esperienza culinaria indimenticabile',
        description: 'Scopri i sapori autentici della nostra cucina tradizionale',
        style: 'gradient',
        alignment: 'center'
      };
    case 'about':
      return {
        title: 'La nostra storia',
        content: 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia...',
        imagePosition: 'right'
      };
    case 'gallery':
      return {
        title: 'Galleria',
        layout: 'grid',
        columns: 3,
        images: []
      };
    case 'reviews':
      return {
        title: 'Cosa dicono di noi',
        displayStyle: 'cards',
        showRatings: true,
        showDates: false,
        reviews: []
      };
    case 'events':
      return {
        title: 'Eventi e Promozioni',
        layout: 'cards',
        showPastEvents: false,
        events: []
      };
    case 'contact':
      return {
        title: 'Contattaci',
        showMap: true,
        mapStyle: 'google',
        showForm: true,
        formFields: ['name', 'email', 'message'],
        showHours: true,
        showSocialLinks: true
      };
    case 'hours':
      return {
        title: 'Orari di apertura'
      };
    case 'newsletter':
      return {
        title: 'Rimani aggiornato',
        subtitle: 'Iscriviti alla nostra newsletter per ricevere le ultime novità'
      };
    default:
      return {};
  }
}

// Componenti placeholder per le altre tab
const DesignControls: React.FC<{ theme: any; onUpdate: (theme: any) => void }> = ({ theme, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <Palette className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="font-semibold mb-2">Design Controls</h3>
      <p className="text-sm text-muted-foreground">
        Controlli per colori, font e tema saranno implementati qui
      </p>
    </CardContent>
  </Card>
);

const SettingsControls: React.FC<{ settings: any; onUpdate: (updates: any) => void }> = ({ settings, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="font-semibold mb-2">Site Settings</h3>
      <p className="text-sm text-muted-foreground">
        Impostazioni generali del sito saranno implementate qui
      </p>
    </CardContent>
  </Card>
);

const SEOControls: React.FC<{ seo: any; onUpdate: (seo: any) => void }> = ({ seo, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="font-semibold mb-2">SEO Controls</h3>
      <p className="text-sm text-muted-foreground">
        Controlli per SEO e meta tags saranno implementati qui
      </p>
    </CardContent>
  </Card>
);