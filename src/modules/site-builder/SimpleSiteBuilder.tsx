import React, { useState } from 'react';
import { useSectionUpdater } from '../../hooks/useSectionUpdater';
import { useAppStore } from '../../store/app-store';
import { 
  Star, Calendar, Phone, Clock, MapPin, Mail, 
  Coffee, Truck, BookOpen, Award, ChefHat
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
import { getTemplateDefaults } from './template-defaults';
import { createNestedUpdater } from './utils';

// Sezioni base comuni a tutti i template
const BASE_SECTIONS: readonly BuilderSection[] = [
  // CONFIGURAZIONE
  { id: 'template', label: 'Template', icon: TemplateIcon, category: 'config', description: 'Scegli il design del tuo sito' },
  { id: 'typography', label: 'Tipografia', icon: TypographyIcon, category: 'config', description: 'Font e stili di testo' },
];

// Sezioni specifiche per Wine Bar (template esistente)
const WINE_BAR_SECTIONS: readonly BuilderSection[] = [
  ...BASE_SECTIONS,
  { id: 'components', label: 'Componenti', icon: ComponentsIcon, category: 'config', description: 'Gestisci sezioni e layout' },
  
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

// Sezioni specifiche per Michelin Star (template premium)
const MICHELIN_STAR_SECTIONS: readonly BuilderSection[] = [
  ...BASE_SECTIONS,
  
  // BUSINESS INFO
  { id: 'business', label: 'Informazioni Base', icon: InfoIcon, category: 'config', description: 'Nome ristorante, tagline, descrizione' },
  
  // ASPETTO PREMIUM
  { id: 'hero', label: 'Hero Section', icon: CanvasIcon, category: 'appearance', description: 'Carousel immagini cinematografico' },
  { id: 'story', label: 'La Nostra Storia', icon: BookOpen, category: 'appearance', description: 'Storia chef e filosofia' },
  { id: 'awards', label: 'Riconoscimenti', icon: Award, category: 'appearance', description: 'Premi e stelle Michelin' },
  { id: 'menu', label: 'Menu Premium', icon: ChefHat, category: 'appearance', description: 'Menu degustazione e à la carte' },
  { id: 'gallery', label: 'Galleria', icon: GalleryIcon, category: 'appearance', description: 'Immagini piatti e ambiente' },
  { id: 'reviews', label: 'Testimonianze', icon: Star, category: 'appearance', description: 'Recensioni clienti luxury' },
  { id: 'events', label: 'Eventi Esclusivi', icon: Calendar, category: 'appearance', description: 'Degustazioni e eventi speciali' },
  { id: 'newsletter', label: 'VIP Club', icon: Mail, category: 'appearance', description: 'Iscrizione comunicazioni esclusive' },
  
  // DATI
  { id: 'contact', label: 'Contatti', icon: Phone, category: 'data', description: 'Informazioni di contatto e prenotazioni' },
  { id: 'hours', label: 'Orari', icon: Clock, category: 'data', description: 'Orari di apertura del ristorante' },
  { id: 'location', label: 'Posizione', icon: MapPin, category: 'data', description: 'Indirizzo e mappa' },
];

// Funzione per ottenere le sezioni in base al template
const getTemplateSection = (templateStyle: string): readonly BuilderSection[] => {
  switch (templateStyle) {
    case 'michelin_star':
      return MICHELIN_STAR_SECTIONS;
    case 'wine_bar':
    default:
      return WINE_BAR_SECTIONS;
  }
};

type TemplateSectionId = string;

interface SimpleSiteBuilderProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

export const SimpleSiteBuilder: React.FC<SimpleSiteBuilderProps> = ({ onSwitchBuilder }) => {
  const { activeProject, updateProject, closeSidebar } = useAppStore();
  const [activeSection, setActiveSection] = useState<TemplateSectionId>('template');
  
  // Get current template to customize sections
  const currentTemplate = activeProject?.data?.site?.template?.style || 'wine_bar';
  const templateSections = getTemplateSection(currentTemplate);
  
  if (!activeProject) return null;

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'template':
        return <TemplateSelector project={activeProject} onUpdate={updateProject} />;
      case 'typography':
        return <TypographyEditor project={activeProject} onUpdate={updateProject} />;
      
      // Sezioni Wine Bar (esistenti)
      case 'components':
        return <ComponentsManager project={activeProject} onUpdate={updateProject} />;
      case 'delivery':
        return <DeliveryEditor project={activeProject} onUpdate={updateProject} />;
      
      // Sezioni comuni (adattate per template)
      case 'hero':
        return currentTemplate === 'michelin_star' 
          ? <MichelinHeroEditor project={activeProject} onUpdate={updateProject} />
          : <HeroEditor project={activeProject} onUpdate={updateProject} />;
      case 'about':
        return currentTemplate === 'michelin_star'
          ? <StoryEditor project={activeProject} onUpdate={updateProject} />
          : <AboutEditor project={activeProject} onUpdate={updateProject} />;
      case 'gallery':
        return currentTemplate === 'michelin_star'
          ? <MichelinGalleryEditor project={activeProject} onUpdate={updateProject} />
          : <GalleryEditor project={activeProject} onUpdate={updateProject} />;
      case 'contact':
        return currentTemplate === 'michelin_star'
          ? <MichelinContactEditor project={activeProject} onUpdate={updateProject} />
          : <ContactEditor project={activeProject} onUpdate={updateProject} />;
      case 'reviews':
        return currentTemplate === 'michelin_star'
          ? <MichelinReviewsEditor project={activeProject} onUpdate={updateProject} />
          : <ReviewsEditor project={activeProject} onUpdate={updateProject} />;
      case 'events':
        return currentTemplate === 'michelin_star'
          ? <MichelinEventsEditor project={activeProject} onUpdate={updateProject} />
          : <EventsEditor project={activeProject} onUpdate={updateProject} />;
      case 'newsletter':
        return currentTemplate === 'michelin_star'
          ? <MichelinVIPClubEditor project={activeProject} onUpdate={updateProject} />
          : <NewsletterEditor project={activeProject} onUpdate={updateProject} />;
      case 'hours':
        return currentTemplate === 'michelin_star'
          ? <MichelinHoursEditor project={activeProject} onUpdate={updateProject} />
          : <HoursEditor project={activeProject} onUpdate={updateProject} />;
      case 'location':
        return currentTemplate === 'michelin_star'
          ? <MichelinLocationEditor project={activeProject} onUpdate={updateProject} />
          : <LocationEditor project={activeProject} onUpdate={updateProject} />;
      
      // Sezioni specifiche Michelin Star
      case 'business':
        return <BusinessInfoEditor project={activeProject} onUpdate={updateProject} />;
      case 'story':
        return <StoryEditor project={activeProject} onUpdate={updateProject} />;
      case 'awards':
        return <AwardsEditor project={activeProject} onUpdate={updateProject} />;
      case 'menu':
        return <MenuPremiumEditor project={activeProject} onUpdate={updateProject} />;
      
      default:
        return <div className="p-6 text-center text-muted-foreground">Sezione in sviluppo...</div>;
    }
  };

  return (
    <UnifiedBuilderLayout
      builderType="site"
      sections={templateSections}
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

// ===== EDITOR SPECIFICI MICHELIN STAR =====

const BusinessInfoEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateBusiness = createNestedUpdater(project, onUpdate, 'business');
  
  // Usa defaults solo se i valori non esistono già
  const businessData = project.data?.business || {};
  
  // ✅ MEMOIZZA i valori invece di calcolarli ad ogni render
  const name = React.useMemo(() => 
    businessData.name !== undefined ? businessData.name : (defaults.business?.name || ''), 
    [businessData.name, defaults.business?.name]
  );
  
  const tagline = React.useMemo(() => 
    businessData.tagline !== undefined ? businessData.tagline : (defaults.business?.tagline || ''), 
    [businessData.tagline, defaults.business?.tagline]
  );
  
  const description = React.useMemo(() => 
    businessData.description !== undefined ? businessData.description : (defaults.business?.description || ''), 
    [businessData.description, defaults.business?.description]
  );
  
  return (
    <PremiumCard
      title="Informazioni Base del Ristorante"
      description="Dettagli principali che definiscono la vostra identità culinaria"
    >
      <div className="space-y-6">
        <PremiumTextInput
          label="Nome Ristorante"
          description="Il nome del vostro ristorante (massima eleganza)"
          value={name}
          onChange={(value) => updateBusiness('name', value)}
          placeholder="Es. Le Bernardin, Osteria Francescana..."
        />
        
        <PremiumTextInput
          label="Sottotitolo/Riconoscimenti"
          description="Stelle Michelin, location, o breve tagline di prestigio"
          value={tagline}
          onChange={(value) => updateBusiness('tagline', value)}
          placeholder="Es. ★★★ Michelin • Milano, Tres estrellas Michelin..."
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Descrizione Principale
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Una frase evocativa che descrive la vostra esperienza culinaria
          </p>
          <textarea
            value={description}
            onChange={(e) => updateBusiness('description', e.target.value)}
            placeholder="Es. Une expérience culinaire transcendante où chaque plat raconte une histoire..."
            rows={3}
            maxLength={150}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-400">
            Pensa a parole evocative: transcendante, sublimazione, poetry, artistry...
          </p>
        </div>
      </div>
    </PremiumCard>
  );
};

const StoryEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateStory = createNestedUpdater(project, onUpdate, 'story');
  
  // Usa defaults solo se i valori non esistono già
  const storyData = project.data?.story || {};
  
  const sectionTitle = React.useMemo(() => 
    storyData.section_title !== undefined ? storyData.section_title : (defaults.story?.section_title || ''), 
    [storyData.section_title, defaults.story?.section_title]
  );
  
  const chefName = React.useMemo(() => 
    storyData.chef_name !== undefined ? storyData.chef_name : (defaults.story?.chef_name || ''), 
    [storyData.chef_name, defaults.story?.chef_name]
  );
  
  const storyText = React.useMemo(() => 
    storyData.story_text !== undefined ? storyData.story_text : (defaults.story?.story_text || ''), 
    [storyData.story_text, defaults.story?.story_text]
  );
  
  const chefImage = React.useMemo(() => 
    storyData.chef_image !== undefined ? storyData.chef_image : (defaults.story?.chef_image || ''), 
    [storyData.chef_image, defaults.story?.chef_image]
  );
  
  return (
    <PremiumCard
      title="La Nostra Storia"
      description="Racconta la vostra filosofia culinaria e il percorso che vi ha portato all'eccellenza"
    >
      <div className="space-y-6">
        <PremiumTextInput
          label="Titolo Sezione"
          value={sectionTitle}
          onChange={(value) => updateStory('section_title', value)}
          placeholder="Es. Notre Vision, La Nostra Storia, Our Philosophy..."
        />
        
        <PremiumTextInput
          label="Nome Chef/Proprietario"
          value={chefName}
          onChange={(value) => updateStory('chef_name', value)}
          placeholder="Es. Chef Massimo Bottura, Chef étoilé Marie Dubois..."
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Testo Storia
          </label>
          <p className="text-xs text-gray-500 mb-2">
            La vostra storia, filosofia culinaria, approccio
          </p>
          <textarea
            value={storyText}
            onChange={(e) => updateStory('story_text', e.target.value)}
            placeholder="Racconta la passione, la dedizione, l'evoluzione, il rispetto per la tradizione..."
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
        
        <PremiumTextInput
          label="URL Immagine Chef/Cucina"
          description="Foto professionale del chef o della brigata"
          value={chefImage}
          onChange={(value) => updateStory('chef_image', value)}
          placeholder="https://..."
        />
      </div>
    </PremiumCard>
  );
};

const MichelinHeroEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateHero = createNestedUpdater(project, onUpdate, 'hero');
  
  // Usa defaults solo se i valori non esistono già
  const heroData = project.data?.hero || {};
  
  const images = React.useMemo(() => 
    heroData.images !== undefined ? heroData.images : (defaults.hero?.images || []), 
    [heroData.images, defaults.hero?.images]
  );
  
  const carouselSpeed = React.useMemo(() => 
    heroData.carousel_speed !== undefined ? heroData.carousel_speed : (defaults.hero?.carousel_speed || 5), 
    [heroData.carousel_speed, defaults.hero?.carousel_speed]
  );
  
  const parallaxIntensity = React.useMemo(() => 
    heroData.parallax_intensity !== undefined ? heroData.parallax_intensity : (defaults.hero?.parallax_intensity || 20), 
    [heroData.parallax_intensity, defaults.hero?.parallax_intensity]
  );
  
  return (
    <PremiumCard
      title="Hero Section Cinematografica"
      description="La prima impressione ultra-premium del vostro ristorante"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Carousel Immagini</h4>
          <p className="text-xs text-gray-500">
            Aggiungete 3-5 immagini premium per maximum impact
          </p>
          
          {images.map((img: string, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded">
              <img src={img} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover rounded" />
              <input
                value={img}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  updateHero('images', newImages);
                }}
                placeholder="URL immagine..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  const newImages = images.filter((_: any, i: number) => i !== index);
                  updateHero('images', newImages);
                }}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          
          {images.length < 5 && (
            <button
              onClick={() => updateHero('images', [...images, ''])}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              + Aggiungi Immagine
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Velocità Carousel (secondi)
            </label>
            <input
              type="number"
              value={carouselSpeed}
              onChange={(e) => updateHero('carousel_speed', parseInt(e.target.value))}
              min="3"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">5 secondi è ottimale per permettere l'immersione visiva</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intensità Parallax (0-100)
            </label>
            <input
              type="number"
              value={parallaxIntensity}
              onChange={(e) => updateHero('parallax_intensity', parseInt(e.target.value))}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">20-30 è ideale per eleganza senza motion sickness</p>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
};

const AwardsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateAwards = createNestedUpdater(project, onUpdate, 'awards');
  
  // Usa defaults solo se i valori non esistono già  
  const awardsData = project.data?.awards || {};
  
  const showAwards = React.useMemo(() => 
    awardsData.show_awards !== undefined ? awardsData.show_awards : (defaults.awards?.show_awards !== false), 
    [awardsData.show_awards, defaults.awards?.show_awards]
  );
  
  const awardsList = React.useMemo(() => 
    awardsData.awards_list !== undefined ? awardsData.awards_list : (defaults.awards?.awards_list || []), 
    [awardsData.awards_list, defaults.awards?.awards_list]
  );
  
  return (
    <PremiumCard
      title="Riconoscimenti e Premi"
      description="Condividi i vostri prestigiosi riconoscimenti culinari"
    >
      <div className="space-y-6">
        <PremiumToggle
          label="Mostra Sezione Riconoscimenti"
          description="Abilita/disabilita l'intera sezione awards"
          checked={showAwards}
          onChange={(checked) => updateAwards('show_awards', checked)}
        />
        
        {showAwards && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Lista Riconoscimenti</h4>
            <p className="text-xs text-gray-500">
              Aggiungi i tuoi riconoscimenti più prestigiosi. L'ordine determina la priorità.
            </p>
            
            {awardsList.map((award: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Nome riconoscimento..."
                    value={award.name || ''}
                    onChange={(e) => {
                      const newAwards = [...awardsList];
                      newAwards[index] = { ...award, name: e.target.value };
                      updateAwards('awards_list', newAwards);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    placeholder="Anno/Periodo..."
                    value={award.year || ''}
                    onChange={(e) => {
                      const newAwards = [...awardsList];
                      newAwards[index] = { ...award, year: e.target.value };
                      updateAwards('awards_list', newAwards);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Punteggio (es. 18/20)..."
                    value={award.score || ''}
                    onChange={(e) => {
                      const newAwards = [...awardsList];
                      newAwards[index] = { ...award, score: e.target.value };
                      updateAwards('awards_list', newAwards);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      const newAwards = awardsList.filter((_: any, i: number) => i !== index);
                      updateAwards('awards_list', newAwards);
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            ))}
            
            {awardsList.length < 6 && (
              <button
                onClick={() => {
                  updateAwards('awards_list', [...awardsList, { name: '', year: '', score: '' }]);
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
              >
                + Aggiungi Riconoscimento
              </button>
            )}
          </div>
        )}
      </div>
    </PremiumCard>
  );
};

const MenuPremiumEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateMenu = createNestedUpdater(project, onUpdate, 'menu');
  
  // Usa defaults solo se i valori non esistono già
  const menuData = project.data?.menu || {};
  
  const menuSections = React.useMemo(() => 
    menuData.menu_sections !== undefined ? menuData.menu_sections : (defaults.menu?.menu_sections || []), 
    [menuData.menu_sections, defaults.menu?.menu_sections]
  );
  
  const menuNote = React.useMemo(() => 
    menuData.menu_note !== undefined ? menuData.menu_note : (defaults.menu?.menu_note || ''), 
    [menuData.menu_note, defaults.menu?.menu_note]
  );
  
  return (
    <PremiumCard
      title="Menu Premium"
      description="Crea i tuoi menu degustazione con dettagli di alta gamma"
    >
      <div className="space-y-6">
        {menuSections.map((section: any, sectionIndex: number) => (
          <div key={sectionIndex} className="p-4 border rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Nome menu..."
                value={section.name || ''}
                onChange={(e) => {
                  const newSections = [...menuSections];
                  newSections[sectionIndex] = { ...section, name: e.target.value };
                  updateMenu('menu_sections', newSections);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Prezzo (es. €285)..."
                value={section.price || ''}
                onChange={(e) => {
                  const newSections = [...menuSections];
                  newSections[sectionIndex] = { ...section, price: e.target.value };
                  updateMenu('menu_sections', newSections);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <textarea
              placeholder="Descrizione menu..."
              value={section.description || ''}
              onChange={(e) => {
                const newSections = [...menuSections];
                newSections[sectionIndex] = { ...section, description: e.target.value };
                updateMenu('menu_sections', newSections);
              }}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Portate</h5>
              {(section.items || []).map((item: string, itemIndex: number) => (
                <div key={itemIndex} className="flex gap-2">
                  <input
                    value={item}
                    onChange={(e) => {
                      const newSections = [...menuSections];
                      const newItems = [...(section.items || [])];
                      newItems[itemIndex] = e.target.value;
                      newSections[sectionIndex] = { ...section, items: newItems };
                      updateMenu('menu_sections', newSections);
                    }}
                    placeholder="Descrizione portata..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      const newSections = [...menuSections];
                      const newItems = (section.items || []).filter((_: any, i: number) => i !== itemIndex);
                      newSections[sectionIndex] = { ...section, items: newItems };
                      updateMenu('menu_sections', newSections);
                    }}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newSections = [...menuSections];
                  const newItems = [...(section.items || []), ''];
                  newSections[sectionIndex] = { ...section, items: newItems };
                  updateMenu('menu_sections', newSections);
                }}
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded hover:border-blue-500"
              >
                + Aggiungi Portata
              </button>
            </div>
            
            <button
              onClick={() => {
                const newSections = menuSections.filter((_: any, i: number) => i !== sectionIndex);
                updateMenu('menu_sections', newSections);
              }}
              className="w-full px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Rimuovi Menu
            </button>
          </div>
        ))}
        
        <button
          onClick={() => {
            updateMenu('menu_sections', [
              ...menuSections, 
              { name: '', price: '', description: '', items: [''] }
            ]);
          }}
          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
        >
          + Aggiungi Menu
        </button>
        
        <PremiumTextInput
          label="Nota Menu"
          description="Informazioni su allergie, personalizzazioni, etc."
          value={menuNote}
          onChange={(value) => updateMenu('menu_note', value)}
          placeholder="Es. Allergie, ingredienti stagionali, possibilità di personalizzazione..."
        />
      </div>
    </PremiumCard>
  );
};

const MichelinGalleryEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateGallery = createNestedUpdater(project, onUpdate, 'gallery');
  
  // Usa defaults solo se i valori non esistono già
  const galleryData = project.data?.gallery || {};
  
  const images = React.useMemo(() => 
    galleryData.gallery_images !== undefined ? galleryData.gallery_images : (defaults.gallery?.gallery_images || []), 
    [galleryData.gallery_images, defaults.gallery?.gallery_images]
  );
  
  const galleryLayout = React.useMemo(() => 
    galleryData.gallery_layout !== undefined ? galleryData.gallery_layout : (defaults.gallery?.gallery_layout || 'masonry'), 
    [galleryData.gallery_layout, defaults.gallery?.gallery_layout]
  );
  
  return (
    <PremiumCard
      title="Galleria Premium"
      description="Showcase di piatti, ambiente e dettagli del vostro ristorante"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Immagini Galleria</h4>
          <p className="text-xs text-gray-500">
            Mix di piatti signature, ambiente, dettagli e processo creativo (6-12 immagini)
          </p>
          
          {images.map((img: string, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 border rounded">
              <img src={img} alt={`Gallery ${index + 1}`} className="w-16 h-16 object-cover rounded" />
              <input
                value={img}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  updateGallery('gallery_images', newImages);
                }}
                placeholder="URL immagine..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  const newImages = images.filter((_: any, i: number) => i !== index);
                  updateGallery('gallery_images', newImages);
                }}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          
          {images.length < 12 && (
            <button
              onClick={() => updateGallery('gallery_images', [...images, ''])}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              + Aggiungi Immagine
            </button>
          )}
        </div>
        
        <PremiumSelect
          label="Layout Galleria"
          description="Disposizione delle immagini"
          value={galleryLayout}
          onChange={(value) => updateGallery('gallery_layout', value)}
          options={[
            { label: 'Grid Regolare', value: 'grid' },
            { label: 'Masonry (Consigliato)', value: 'masonry' },
            { label: 'Carousel', value: 'carousel' }
          ]}
        />
      </div>
    </PremiumCard>
  );
};

const MichelinContactEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateContact = createNestedUpdater(project, onUpdate, 'contact');
  
  // Usa defaults solo se i valori non esistono già
  const contactData = project.data?.contact || {};
  
  const address = React.useMemo(() => 
    contactData.address !== undefined ? contactData.address : (defaults.contact?.address || ''), 
    [contactData.address, defaults.contact?.address]
  );
  
  const phone = React.useMemo(() => 
    contactData.phone !== undefined ? contactData.phone : (defaults.contact?.phone || ''), 
    [contactData.phone, defaults.contact?.phone]
  );
  
  const email = React.useMemo(() => 
    contactData.email !== undefined ? contactData.email : (defaults.contact?.email || ''), 
    [contactData.email, defaults.contact?.email]
  );
  
  const reservationUrl = React.useMemo(() => 
    contactData.reservation_url !== undefined ? contactData.reservation_url : (defaults.contact?.reservation_url || ''), 
    [contactData.reservation_url, defaults.contact?.reservation_url]
  );
  
  const socialLinks = React.useMemo(() => 
    contactData.social_links !== undefined ? contactData.social_links : (defaults.contact?.social_links || {}), 
    [contactData.social_links, defaults.contact?.social_links]
  );
  
  return (
    <PremiumCard
      title="Contatti Premium"
      description="Informazioni di contatto e prenotazioni per il vostro ristorante"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Indirizzo</label>
          <textarea
            value={address}
            onChange={(e) => updateContact('address', e.target.value)}
            placeholder="Indirizzo completo con CAP"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        
        <PremiumTextInput
          label="Telefono"
          value={phone}
          onChange={(value) => updateContact('phone', value)}
          placeholder="+39 02 1234567"
        />
        
        <PremiumTextInput
          label="Email"
          value={email}
          onChange={(value) => updateContact('email', value)}
          placeholder="prenotazioni@nomeristorante.it"
        />
        
        <PremiumTextInput
          label="URL Prenotazioni"
          description="Link a sistema di prenotazione esterno (opzionale)"
          value={reservationUrl}
          onChange={(value) => updateContact('reservation_url', value)}
          placeholder="https://www.opentable.com/..."
        />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Link Social</h4>
          <div className="grid grid-cols-2 gap-4">
            <PremiumTextInput
              label="Instagram"
              value={socialLinks.instagram || ''}
              onChange={(value) => updateContact('social_links', { ...socialLinks, instagram: value })}
              placeholder="https://instagram.com/..."
            />
            <PremiumTextInput
              label="Facebook"
              value={socialLinks.facebook || ''}
              onChange={(value) => updateContact('social_links', { ...socialLinks, facebook: value })}
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>
      </div>
    </PremiumCard>
  );
};


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
              {filtered.map((font: any, index: number) => (
                <div
                  key={`${font.id}-${index}`}
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

// ===== EDITOR AGGIUNTIVI MICHELIN STAR =====

const MichelinReviewsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateReviews = createNestedUpdater(project, onUpdate, 'reviews');
  
  const reviewsData = project.data?.reviews || {};
  const testimonials = reviewsData.testimonials || defaults.reviews?.testimonials || [];

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: '',
      role: '',
      content: '',
      rating: 5,
      source: 'Google'
    };
    updateReviews('testimonials', [...testimonials, newTestimonial]);
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    updateReviews('testimonials', updatedTestimonials);
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = testimonials.filter((_: any, i: number) => i !== index);
    updateReviews('testimonials', updatedTestimonials);
  };

  return (
    <PremiumCard
      title="Testimonianze Clienti"
      description="Recensioni e testimonianze di ospiti soddisfatti"
    >
      <div className="space-y-6">
        {testimonials.map((testimonial: any, index: number) => (
          <div key={testimonial.id || index} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900">Testimonianza #{index + 1}</h4>
              <button
                onClick={() => removeTestimonial(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Rimuovi
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <PremiumTextInput
                label="Nome Cliente"
                value={testimonial.name}
                onChange={(value) => updateTestimonial(index, 'name', value)}
                placeholder="Es. Marco Rossi"
              />
              <PremiumTextInput
                label="Ruolo/Descrizione"
                value={testimonial.role}
                onChange={(value) => updateTestimonial(index, 'role', value)}
                placeholder="Es. Food Critic, Cliente abituale"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Testimonianza</label>
              <textarea
                value={testimonial.content}
                onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                placeholder="Una esperienza culinaria indimenticabile..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <PremiumSelect
                label="Valutazione"
                value={testimonial.rating.toString()}
                onChange={(value) => updateTestimonial(index, 'rating', parseInt(value))}
                options={[
                  { value: '5', label: '⭐⭐⭐⭐⭐ (5 stelle)' },
                  { value: '4', label: '⭐⭐⭐⭐ (4 stelle)' },
                  { value: '3', label: '⭐⭐⭐ (3 stelle)' },
                ]}
              />
              <PremiumSelect
                label="Fonte"
                value={testimonial.source}
                onChange={(value) => updateTestimonial(index, 'source', value)}
                options={[
                  { value: 'Google', label: 'Google Reviews' },
                  { value: 'TripAdvisor', label: 'TripAdvisor' },
                  { value: 'Michelin', label: 'Guida Michelin' },
                  { value: 'OpenTable', label: 'OpenTable' },
                  { value: 'Direct', label: 'Testimonianza diretta' }
                ]}
              />
            </div>
          </div>
        ))}
        
        <PremiumActionButton
          onClick={addTestimonial}
          variant="outline"
          className="w-full"
        >
          + Aggiungi Testimonianza
        </PremiumActionButton>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">✨ Best Practices</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Privilegia recensioni recenti e autentiche</li>
            <li>• Includi dettagli specifici sui piatti o servizio</li>
            <li>• Varia le fonti per maggiore credibilità</li>
            <li>• Max 3-4 testimonianze per non appesantire</li>
          </ul>
        </div>
      </div>
    </PremiumCard>
  );
};

const MichelinEventsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateEvents = createNestedUpdater(project, onUpdate, 'events');
  
  const eventsData = project.data?.events || {};
  const events = eventsData.events || defaults.events?.events || [];

  const addEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: '',
      time: '',
      price: '',
      capacity: '',
      type: 'Degustazione'
    };
    updateEvents('events', [...events, newEvent]);
  };

  const updateEvent = (index: number, field: string, value: any) => {
    const updatedEvents = [...events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    updateEvents('events', updatedEvents);
  };

  const removeEvent = (index: number) => {
    const updatedEvents = events.filter((_: any, i: number) => i !== index);
    updateEvents('events', updatedEvents);
  };

  return (
    <PremiumCard
      title="Eventi Esclusivi"
      description="Degustazioni, cene a tema e eventi speciali per i vostri clienti VIP"
    >
      <div className="space-y-6">
        {events.map((event: any, index: number) => (
          <div key={event.id || index} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-900">Evento #{index + 1}</h4>
              <button
                onClick={() => removeEvent(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Rimuovi
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <PremiumTextInput
                label="Titolo Evento"
                value={event.title}
                onChange={(value) => updateEvent(index, 'title', value)}
                placeholder="Es. Degustazione Tartufo Bianco d'Alba"
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Descrizione</label>
                <textarea
                  value={event.description}
                  onChange={(e) => updateEvent(index, 'description', e.target.value)}
                  placeholder="Serata speciale dedicata al tartufo bianco d'Alba con menu appositamente studiato..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <PremiumTextInput
                label="Data"
                value={event.date}
                onChange={(value) => updateEvent(index, 'date', value)}
                placeholder="15 Novembre 2024"
              />
              <PremiumTextInput
                label="Orario"
                value={event.time}
                onChange={(value) => updateEvent(index, 'time', value)}
                placeholder="19:30"
              />
              <PremiumSelect
                label="Tipo Evento"
                value={event.type}
                onChange={(value) => updateEvent(index, 'type', value)}
                options={[
                  { value: 'Degustazione', label: 'Degustazione' },
                  { value: 'Cena a tema', label: 'Cena a tema' },
                  { value: 'Masterclass', label: 'Masterclass' },
                  { value: 'Wine pairing', label: 'Wine pairing' },
                  { value: 'Evento privato', label: 'Evento privato' }
                ]}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <PremiumTextInput
                label="Prezzo per persona"
                value={event.price}
                onChange={(value) => updateEvent(index, 'price', value)}
                placeholder="€195"
              />
              <PremiumTextInput
                label="Posti disponibili"
                value={event.capacity}
                onChange={(value) => updateEvent(index, 'capacity', value)}
                placeholder="12"
              />
            </div>
          </div>
        ))}
        
        <PremiumActionButton
          onClick={addEvent}
          variant="outline"
          className="w-full"
        >
          + Aggiungi Evento
        </PremiumActionButton>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-medium text-amber-800 mb-2">🎭 Idee per Eventi Luxury</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Cene a 4 mani con chef stellati ospiti</li>
            <li>• Degustazioni stagionali (tartufo, caviale, ecc.)</li>
            <li>• Masterclass di cucina con lo chef</li>
            <li>• Wine pairing con sommelier</li>
            <li>• Eventi privati aziendali o celebrazioni</li>
          </ul>
        </div>
      </div>
    </PremiumCard>
  );
};

const MichelinVIPClubEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateNewsletter = createNestedUpdater(project, onUpdate, 'newsletter');
  
  const newsletterData = project.data?.newsletter || {};
  
  const title = React.useMemo(() => 
    newsletterData.title !== undefined ? newsletterData.title : (defaults.newsletter?.title || ''), 
    [newsletterData.title, defaults.newsletter?.title]
  );
  
  const description = React.useMemo(() => 
    newsletterData.description !== undefined ? newsletterData.description : (defaults.newsletter?.description || ''), 
    [newsletterData.description, defaults.newsletter?.description]
  );
  
  const benefits = newsletterData.benefits || defaults.newsletter?.benefits || [];

  const updateBenefit = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = value;
    updateNewsletter('benefits', updatedBenefits);
  };

  const addBenefit = () => {
    updateNewsletter('benefits', [...benefits, '']);
  };

  const removeBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_: any, i: number) => i !== index);
    updateNewsletter('benefits', updatedBenefits);
  };

  return (
    <PremiumCard
      title="VIP Club & Newsletter"
      description="Comunicazioni esclusive per i vostri clienti più affezionati"
    >
      <div className="space-y-6">
        <PremiumTextInput
          label="Titolo Sezione"
          description="Nome del vostro VIP club o newsletter"
          value={title}
          onChange={(value) => updateNewsletter('title', value)}
          placeholder="Es. Club des Gourmets, VIP Experience"
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Descrizione
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Breve descrizione del vostro servizio VIP
          </p>
          <textarea
            value={description}
            onChange={(e) => updateNewsletter('description', e.target.value)}
            placeholder="Ricevi in anteprima notizie sui nostri eventi esclusivi, nuovi menu e degustazioni speciali..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Vantaggi dell'iscrizione
          </label>
          {benefits.map((benefit: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                placeholder="Es. Prenotazioni prioritarie, Sconti eventi speciali"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeBenefit(index)}
                className="text-red-500 hover:text-red-700"
              >
                Rimuovi
              </button>
            </div>
          ))}
          
          <PremiumActionButton
            onClick={addBenefit}
            variant="outline"
            size="sm"
          >
            + Aggiungi Vantaggio
          </PremiumActionButton>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-medium text-amber-800 mb-2">💎 Suggerimenti VIP</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Prenotazioni prioritarie per eventi speciali</li>
            <li>• Accesso anticipato ai nuovi menu</li>
            <li>• Degustazioni esclusive con lo chef</li>
            <li>• Sconti su wine pairing e servizi extra</li>
            <li>• Newsletter mensile con ricette e consigli</li>
          </ul>
        </div>
      </div>
    </PremiumCard>
  );
};

const MichelinHoursEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateHours = createNestedUpdater(project, onUpdate, 'hours');
  
  const hoursData = project.data?.hours || {};
  const schedule = hoursData.schedule || defaults.hours?.schedule || {};

  const daysOfWeek = [
    { key: 'monday', label: 'Lunedì' },
    { key: 'tuesday', label: 'Martedì' },
    { key: 'wednesday', label: 'Mercoledì' },
    { key: 'thursday', label: 'Giovedì' },
    { key: 'friday', label: 'Venerdì' },
    { key: 'saturday', label: 'Sabato' },
    { key: 'sunday', label: 'Domenica' }
  ];

  const updateDaySchedule = (day: string, field: string, value: string) => {
    const updatedSchedule = {
      ...schedule,
      [day]: {
        ...schedule[day],
        [field]: value
      }
    };
    updateHours('schedule', updatedSchedule);
  };

  return (
    <PremiumCard
      title="Orari di Apertura"
      description="Comunicate chiaramente i vostri orari ai clienti"
    >
      <div className="space-y-6">
        {daysOfWeek.map(({ key, label }) => {
          const daySchedule = schedule[key] || { lunch_start: '', lunch_end: '', dinner_start: '', dinner_end: '', closed: false };
          
          return (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{label}</h4>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={daySchedule.closed || false}
                    onChange={(e) => updateDaySchedule(key, 'closed', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">Chiuso</span>
                </label>
              </div>
              
              {!daySchedule.closed && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pranzo</label>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={daySchedule.lunch_start || ''}
                        onChange={(e) => updateDaySchedule(key, 'lunch_start', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="self-center text-gray-500">-</span>
                      <input
                        type="time"
                        value={daySchedule.lunch_end || ''}
                        onChange={(e) => updateDaySchedule(key, 'lunch_end', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cena</label>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={daySchedule.dinner_start || ''}
                        onChange={(e) => updateDaySchedule(key, 'dinner_start', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="self-center text-gray-500">-</span>
                      <input
                        type="time"
                        value={daySchedule.dinner_end || ''}
                        onChange={(e) => updateDaySchedule(key, 'dinner_end', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">⏰ Note Importanti</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Indicate orari di ultima prenotazione, non chiusura cucina</li>
            <li>• Considerate pause tra pranzo e cena se necessario</li>
            <li>• Specificate orari festivi in sezione eventi</li>
          </ul>
        </div>
      </div>
    </PremiumCard>
  );
};

const MichelinLocationEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateLocation = createNestedUpdater(project, onUpdate, 'location');
  
  const locationData = project.data?.location || {};
  
  const address = React.useMemo(() => 
    locationData.address !== undefined ? locationData.address : (defaults.location?.address || ''), 
    [locationData.address, defaults.location?.address]
  );
  
  const city = React.useMemo(() => 
    locationData.city !== undefined ? locationData.city : (defaults.location?.city || ''), 
    [locationData.city, defaults.location?.city]
  );
  
  const zipCode = React.useMemo(() => 
    locationData.zipCode !== undefined ? locationData.zipCode : (defaults.location?.zipCode || ''), 
    [locationData.zipCode, defaults.location?.zipCode]
  );
  
  const directions = React.useMemo(() => 
    locationData.directions !== undefined ? locationData.directions : (defaults.location?.directions || ''), 
    [locationData.directions, defaults.location?.directions]
  );

  return (
    <PremiumCard
      title="Posizione e Indicazioni"
      description="Aiutate i clienti a raggiungervi facilmente"
    >
      <div className="space-y-6">
        <PremiumTextInput
          label="Indirizzo Completo"
          description="Via e numero civico"
          value={address}
          onChange={(value) => updateLocation('address', value)}
          placeholder="Es. Via della Spiga, 15"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <PremiumTextInput
            label="Città"
            value={city}
            onChange={(value) => updateLocation('city', value)}
            placeholder="Es. Milano"
          />
          <PremiumTextInput
            label="CAP"
            value={zipCode}
            onChange={(value) => updateLocation('zipCode', value)}
            placeholder="Es. 20121"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Indicazioni Speciali
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Consigli per raggiungere il ristorante (parcheggio, mezzi pubblici, etc.)
          </p>
          <textarea
            value={directions}
            onChange={(e) => updateLocation('directions', e.target.value)}
            placeholder="Facilmente raggiungibile con la metro M1 (fermata San Babila). Parcheggio convenzionato presso Garage San Babila..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">🚗 Suggerimenti Utili</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Menzionate parcheggi convenzionati o disponibili</li>
            <li>• Indicate fermate metro/autobus più vicine</li>
            <li>• Specificate se è necessaria prenotazione per accesso ZTL</li>
            <li>• Consigli su taxi/rideshare nelle vicinanze</li>
          </ul>
        </div>
      </div>
    </PremiumCard>
  );
};

// ===== EDITOR WINE BAR (LEGACY) =====

const HeroEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const hero = project.data.site?.sections?.find((s: any) => s.type === 'hero')?.data || {};
  const { createSectionUpdater } = useSectionUpdater({ project, onUpdate });
  
  const updateHeroSection = createSectionUpdater('hero', 'hero_main', 0);
  
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
  const { createSectionUpdater } = useSectionUpdater({ project, onUpdate });
  
  const updateAboutSection = createSectionUpdater('about', 'about_main', 1);

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
  const { createSectionUpdater } = useSectionUpdater({ project, onUpdate });
  
  const updateGallerySection = createSectionUpdater('gallery', 'gallery_main', 2);

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

