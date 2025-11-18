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
import { PremiumCard, PremiumTextInput, PremiumSelect, PremiumToggle, PremiumActionButton, CleanSectionHeader, CleanFormField, CleanTextInput, CleanSelect, CleanToggle, CleanButton, CleanInfoBox } from '../../components/forms';
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
    case 'aegean_pearl':
      return MICHELIN_STAR_SECTIONS; // Usa le stesse sezioni del Michelin Star
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
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <MichelinHeroEditor project={activeProject} onUpdate={updateProject} />
          : <HeroEditor project={activeProject} onUpdate={updateProject} />;
      case 'about':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <StoryEditor project={activeProject} onUpdate={updateProject} />
          : <AboutEditor project={activeProject} onUpdate={updateProject} />;
      case 'gallery':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <MichelinGalleryEditor project={activeProject} onUpdate={updateProject} />
          : <GalleryEditor project={activeProject} onUpdate={updateProject} />;
      case 'contact':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <MichelinContactEditor project={activeProject} onUpdate={updateProject} />
          : <ContactEditor project={activeProject} onUpdate={updateProject} />;
      case 'reviews':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <MichelinReviewsEditor project={activeProject} onUpdate={updateProject} />
          : <ReviewsEditor project={activeProject} onUpdate={updateProject} />;
      case 'events':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <MichelinEventsEditor project={activeProject} onUpdate={updateProject} />
          : <EventsEditor project={activeProject} onUpdate={updateProject} />;
      case 'newsletter':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <MichelinVIPClubEditor project={activeProject} onUpdate={updateProject} />
          : <NewsletterEditor project={activeProject} onUpdate={updateProject} />;
      case 'hours':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
          ? <MichelinHoursEditor project={activeProject} onUpdate={updateProject} />
          : <HoursEditor project={activeProject} onUpdate={updateProject} />;
      case 'location':
        return (currentTemplate === 'michelin_star' || currentTemplate === 'aegean_pearl')
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
  
  const businessData = project.data?.business || {};
  
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="Informazioni Base del Ristorante"
        description="Dettagli principali che definiscono la vostra identità culinaria"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Nome Ristorante"
          description="Il nome del vostro ristorante (massima eleganza)"
          required
        >
          <CleanTextInput
            value={name}
            onChange={(value) => updateBusiness('name', value)}
            placeholder="Es. Le Bernardin, Osteria Francescana..."
          />
        </CleanFormField>
        
        <CleanFormField
          label="Sottotitolo/Riconoscimenti"
          description="Stelle Michelin, location, o breve tagline di prestigio"
        >
          <CleanTextInput
            value={tagline}
            onChange={(value) => updateBusiness('tagline', value)}
            placeholder="Es. ★★★ Michelin • Milano, Tres estrellas Michelin..."
          />
        </CleanFormField>
        
        <CleanFormField
          label="Descrizione Principale"
          description="Una frase evocativa che descrive la vostra esperienza culinaria"
        >
          <CleanTextInput
            value={description}
            onChange={(value) => updateBusiness('description', value)}
            placeholder="Es. Une expérience culinaire transcendante où chaque plat raconte une histoire..."
            multiline
            rows={3}
          />
          <p className="text-xs text-slate-500 mt-2">
            Pensa a parole evocative: transcendante, sublimazione, poetry, artistry...
          </p>
        </CleanFormField>
      </div>
      
      <CleanInfoBox type="tip" title="✨ Suggerimenti Premium">
        <ul className="space-y-1">
          <li>• Utilizza un linguaggio evocativo ed emotivo</li>
          <li>• Menziona riconoscimenti senza essere eccessivo</li>
          <li>• Pensa all'esperienza che vuoi trasmettere</li>
          <li>• Massimo 150 caratteri per la descrizione</li>
        </ul>
      </CleanInfoBox>
    </div>
  );
};

const StoryEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateStory = createNestedUpdater(project, onUpdate, 'story');
  
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="La Nostra Storia"
        description="Racconta la vostra filosofia culinaria e il percorso che vi ha portato all'eccellenza"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Titolo Sezione"
          description="Come vuoi intitolare questa sezione nel sito"
        >
          <CleanTextInput
            value={sectionTitle}
            onChange={(value) => updateStory('section_title', value)}
            placeholder="Es. Notre Vision, La Nostra Storia, Our Philosophy..."
          />
        </CleanFormField>
        
        <CleanFormField
          label="Nome Chef/Proprietario"
          description="Il protagonista della vostra storia culinaria"
        >
          <CleanTextInput
            value={chefName}
            onChange={(value) => updateStory('chef_name', value)}
            placeholder="Es. Chef Massimo Bottura, Chef étoilé Marie Dubois..."
          />
        </CleanFormField>
        
        <CleanFormField
          label="Testo Storia"
          description="La vostra storia, filosofia culinaria, approccio"
        >
          <CleanTextInput
            value={storyText}
            onChange={(value) => updateStory('story_text', value)}
            placeholder="Racconta la passione, la dedizione, l'evoluzione, il rispetto per la tradizione..."
            multiline
            rows={5}
          />
        </CleanFormField>
        
        <CleanFormField
          label="URL Immagine Chef/Cucina"
          description="Foto professionale del chef o della brigata"
        >
          <CleanTextInput
            value={chefImage}
            onChange={(value) => updateStory('chef_image', value)}
            placeholder="https://images.unsplash.com/photo-..."
            type="url"
          />
        </CleanFormField>
      </div>
      
      <CleanInfoBox type="tip" title="📖 Storytelling Tips">
        <ul className="space-y-1">
          <li>• Racconta la tua passione e dedizione alla cucina</li>
          <li>• Menziona il rispetto per la tradizione e l'innovazione</li>
          <li>• Condividi l'evoluzione e i momenti chiave del percorso</li>
          <li>• Usa un tono autentico e personale</li>
        </ul>
      </CleanInfoBox>
    </div>
  );
};

const MichelinHeroEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateHero = createNestedUpdater(project, onUpdate, 'hero');
  
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

  const addImage = () => {
    updateHero('images', [...images, '']);
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    updateHero('images', newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    updateHero('images', newImages);
  };
  
  return (
    <div className="space-y-6">
      <CleanSectionHeader
        title="Hero Section Cinematografica"
        description="La prima impressione ultra-premium del vostro ristorante"
      />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-800">Carousel Immagini</h4>
          <CleanButton
            onClick={addImage}
            variant="outline"
            size="sm"
            icon={CanvasIcon}
            disabled={images.length >= 5}
          >
            Aggiungi Immagine
          </CleanButton>
        </div>
        
        {images.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <CanvasIcon className="w-6 h-6 opacity-40" />
            </div>
            <h4 className="font-medium text-sm mb-1">Nessuna immagine hero</h4>
            <p className="text-xs">Aggiungi le immagini per il carousel cinematografico</p>
          </div>
        ) : (
          <div className="space-y-3">
            {images.map((img: string, index: number) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                {/* Hero Preview */}
                <div className="w-20 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  {img ? (
                    <img 
                      src={img} 
                      alt={`Hero ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center text-slate-400 text-xs ${img ? 'hidden' : ''}`}>
                    <CanvasIcon className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Image Priority Badge */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-100'
                  }`}>
                    <span className="text-sm font-bold">#{index + 1}</span>
                  </div>
                  {index === 0 && (
                    <span className="text-xs text-amber-600 font-medium">Main</span>
                  )}
                </div>
                
                {/* URL Input */}
                <CleanTextInput
                  value={img}
                  onChange={(value) => updateImage(index, value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  type="url"
                  className="flex-1"
                />
                
                {/* Remove Button */}
                <CleanButton
                  onClick={() => removeImage(index)}
                  variant="ghost"
                  size="sm"
                >
                  Rimuovi
                </CleanButton>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
          💡 <strong>Suggerimento:</strong> Immagini hero per il carousel cinematografico. La prima immagine è quella principale. (3-5 immagini per impatto ottimale)
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800 pb-2 border-b border-slate-100">Impostazioni Avanzate</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <CleanFormField
            label="Velocità Carousel"
            description="Durata di ogni immagine (secondi)"
          >
            <CleanTextInput
              value={carouselSpeed.toString()}
              onChange={(value) => updateHero('carousel_speed', parseInt(value) || 5)}
              type="number"
              placeholder="5"
            />
            <p className="text-xs text-slate-500 mt-1">5 secondi è ottimale per l'immersione visiva</p>
          </CleanFormField>
          
          <CleanFormField
            label="Intensità Parallax"
            description="Effetto di profondità (0-100)"
          >
            <CleanTextInput
              value={parallaxIntensity.toString()}
              onChange={(value) => updateHero('parallax_intensity', parseInt(value) || 25)}
              type="number"
              placeholder="25"
            />
            <p className="text-xs text-slate-500 mt-1">20-30 è ideale per eleganza senza motion sickness</p>
          </CleanFormField>
        </div>
      </div>
      
      <CleanInfoBox type="tip" title="🎬 Tips Cinematografici">
        <ul className="space-y-1">
          <li>• <strong>Prima immagine:</strong> La più rappresentativa del ristorante</li>
          <li>• <strong>Composizione:</strong> Mix di ambiente, piatti e dettagli</li>
          <li>• <strong>Qualità:</strong> Risoluzione alta, formato landscape preferibile</li>
          <li>• <strong>Velocità:</strong> 5 secondi permette apprezzamento completo</li>
          <li>• <strong>Parallax:</strong> 25% aggiunge profondità senza disturbare</li>
        </ul>
      </CleanInfoBox>
    </div>
  );
};

const AwardsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateAwards = createNestedUpdater(project, onUpdate, 'awards');
  
  const awardsData = project.data?.awards || {};
  
  const showAwards = React.useMemo(() => 
    awardsData.show_awards !== undefined ? awardsData.show_awards : (defaults.awards?.show_awards !== false), 
    [awardsData.show_awards, defaults.awards?.show_awards]
  );
  
  const awardsList = React.useMemo(() => 
    awardsData.awards_list !== undefined ? awardsData.awards_list : (defaults.awards?.awards_list || []), 
    [awardsData.awards_list, defaults.awards?.awards_list]
  );

  const addAward = () => {
    updateAwards('awards_list', [...awardsList, { name: '', year: '', score: '' }]);
  };

  const updateAward = (index: number, field: string, value: string) => {
    const newAwards = [...awardsList];
    newAwards[index] = { ...newAwards[index], [field]: value };
    updateAwards('awards_list', newAwards);
  };

  const removeAward = (index: number) => {
    const newAwards = awardsList.filter((_: any, i: number) => i !== index);
    updateAwards('awards_list', newAwards);
  };
  
  return (
    <div className="space-y-6">
      <CleanSectionHeader
        title="Riconoscimenti e Premi"
        description="Condividi i vostri prestigiosi riconoscimenti culinari"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Mostra Sezione Riconoscimenti"
          description="Abilita/disabilita l'intera sezione awards sul sito"
        >
          <div className="flex items-center gap-3">
            <CleanToggle
              checked={showAwards}
              onChange={(checked) => updateAwards('show_awards', checked)}
            />
            <span className="text-sm font-medium text-slate-700">
              {showAwards ? 'Sezione visibile' : 'Sezione nascosta'}
            </span>
          </div>
        </CleanFormField>
        
        {showAwards && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-800">Lista Riconoscimenti</h4>
              <CleanButton
                onClick={addAward}
                variant="outline"
                size="sm"
                icon={Award}
                disabled={awardsList.length >= 6}
              >
                Aggiungi Premio
              </CleanButton>
            </div>
            
            {awardsList.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                  <Award className="w-6 h-6 opacity-40" />
                </div>
                <h4 className="font-medium text-sm mb-1">Nessun riconoscimento</h4>
                <p className="text-xs">Aggiungi i tuoi premi più prestigiosi</p>
              </div>
            ) : (
              <div className="space-y-4">
                {awardsList.map((award: any, index: number) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </div>
                        <h4 className="font-semibold text-slate-800">Premio #{index + 1}</h4>
                      </div>
                      <CleanButton
                        onClick={() => removeAward(index)}
                        variant="ghost"
                        size="sm"
                      >
                        Rimuovi
                      </CleanButton>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <CleanFormField 
                          label="Nome Riconoscimento" 
                          description="Es. Stella Michelin, Gault & Millau"
                          required
                        >
                          <CleanTextInput
                            value={award.name || ''}
                            onChange={(value) => updateAward(index, 'name', value)}
                            placeholder="Es. Stella Michelin, James Beard Award..."
                          />
                        </CleanFormField>
                        
                        <CleanFormField 
                          label="Anno/Periodo" 
                          description="Quando è stato ottenuto"
                          required
                        >
                          <CleanTextInput
                            value={award.year || ''}
                            onChange={(value) => updateAward(index, 'year', value)}
                            placeholder="Es. 2023, 2020-2024..."
                          />
                        </CleanFormField>
                      </div>
                      
                      <CleanFormField 
                        label="Punteggio/Dettagli" 
                        description="Punteggio specifico o dettagli aggiuntivi (opzionale)"
                      >
                        <CleanTextInput
                          value={award.score || ''}
                          onChange={(value) => updateAward(index, 'score', value)}
                          placeholder="Es. 18/20, Top 100 Mondial, Outstanding Chef..."
                        />
                      </CleanFormField>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
              💡 <strong>Suggerimento:</strong> L'ordine determina la priorità di visualizzazione. Inserisci prima i riconoscimenti più prestigiosi. (Massimo 6 premi)
            </div>
          </div>
        )}
      </div>
      
      <CleanInfoBox type="success" title="🏆 Premi di Prestigio">
        <ul className="space-y-1">
          <li>• <strong>Michelin:</strong> 1, 2 o 3 stelle + anno di assegnazione</li>
          <li>• <strong>Gault & Millau:</strong> Punteggio su 20 + anno</li>
          <li>• <strong>La Liste:</strong> Posizione in classifica mondiale</li>
          <li>• <strong>James Beard:</strong> Categoria specifica vinta</li>
          <li>• <strong>World's 50 Best:</strong> Posizione in classifica</li>
        </ul>
      </CleanInfoBox>
    </div>
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
  
  const galleryData = project.data?.gallery || {};
  
  const images = React.useMemo(() => 
    galleryData.gallery_images !== undefined ? galleryData.gallery_images : (defaults.gallery?.gallery_images || []), 
    [galleryData.gallery_images, defaults.gallery?.gallery_images]
  );
  
  const galleryLayout = React.useMemo(() => 
    galleryData.gallery_layout !== undefined ? galleryData.gallery_layout : (defaults.gallery?.gallery_layout || 'masonry'), 
    [galleryData.gallery_layout, defaults.gallery?.gallery_layout]
  );

  const addImage = () => {
    updateGallery('gallery_images', [...images, '']);
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    updateGallery('gallery_images', newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    updateGallery('gallery_images', newImages);
  };
  
  return (
    <div className="space-y-6">
      <CleanSectionHeader
        title="Galleria Premium"
        description="Showcase di piatti, ambiente e dettagli del vostro ristorante"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Layout Galleria"
          description="Scegli come organizzare le immagini nel sito"
        >
          <CleanSelect
            value={galleryLayout}
            onChange={(value) => updateGallery('gallery_layout', value)}
            options={[
              { value: 'masonry', label: 'Masonry (Consigliato) - Layout dinamico' },
              { value: 'grid', label: 'Grid Regolare - Griglia uniforme' },
              { value: 'carousel', label: 'Carousel - Slideshow navigabile' }
            ]}
          />
        </CleanFormField>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-800">Immagini Galleria</h4>
            <CleanButton
              onClick={addImage}
              variant="outline"
              size="sm"
              icon={GalleryIcon}
              disabled={images.length >= 12}
            >
              Aggiungi Immagine
            </CleanButton>
          </div>
          
          {images.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                <GalleryIcon className="w-6 h-6 opacity-40" />
              </div>
              <h4 className="font-medium text-sm mb-1">Nessuna immagine</h4>
              <p className="text-xs">Aggiungi le prime immagini per la galleria</p>
            </div>
          ) : (
            <div className="space-y-3">
              {images.map((img: string, index: number) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                  {/* Image Preview */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {img ? (
                      <img 
                        src={img} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).nextElementSibling!.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center text-slate-400 text-xs ${img ? 'hidden' : ''}`}>
                      <GalleryIcon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Image Number Badge */}
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-slate-600">#{index + 1}</span>
                  </div>
                  
                  {/* URL Input */}
                  <CleanTextInput
                    value={img}
                    onChange={(value) => updateImage(index, value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    type="url"
                    className="flex-1"
                  />
                  
                  {/* Remove Button */}
                  <CleanButton
                    onClick={() => removeImage(index)}
                    variant="ghost"
                    size="sm"
                  >
                    Rimuovi
                  </CleanButton>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
            💡 <strong>Suggerimento:</strong> Mix ideale: piatti signature, ambiente del ristorante, dettagli della cucina e momenti del servizio. (6-12 immagini per impatto ottimale)
          </div>
        </div>
      </div>
      
      <CleanInfoBox type="tip" title="📸 Tips per Immagini Premium">
        <ul className="space-y-1">
          <li>• <strong>Piatti signature:</strong> Close-up artistici dei vostri capolavori</li>
          <li>• <strong>Ambiente:</strong> Sala, tavoli, atmosfera del locale</li>
          <li>• <strong>Cucina:</strong> Brigata al lavoro, processo creativo</li>
          <li>• <strong>Dettagli:</strong> Ingredienti pregiati, impiattamenti</li>
          <li>• <strong>Qualità:</strong> Risoluzione alta, luce naturale preferibile</li>
        </ul>
      </CleanInfoBox>
    </div>
  );
};

const MichelinContactEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateContact = createNestedUpdater(project, onUpdate, 'contact');
  
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="Contatti Premium"
        description="Informazioni di contatto e prenotazioni per il vostro ristorante"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Indirizzo Completo"
          description="Indirizzo completo con CAP e città"
          required
        >
          <CleanTextInput
            value={address}
            onChange={(value) => updateContact('address', value)}
            placeholder="Via Roma 123, 20121 Milano (MI)"
            multiline
            rows={2}
          />
        </CleanFormField>
        
        <CleanFormField
          label="Numero di Telefono"
          description="Numero principale per prenotazioni"
          required
        >
          <CleanTextInput
            value={phone}
            onChange={(value) => updateContact('phone', value)}
            placeholder="+39 02 1234567"
            type="tel"
          />
        </CleanFormField>
        
        <CleanFormField
          label="Indirizzo Email"
          description="Email per prenotazioni e informazioni"
          required
        >
          <CleanTextInput
            value={email}
            onChange={(value) => updateContact('email', value)}
            placeholder="prenotazioni@nomeristorante.it"
            type="email"
          />
        </CleanFormField>
        
        <CleanFormField
          label="URL Prenotazioni"
          description="Link a sistema di prenotazione esterno (opzionale)"
        >
          <CleanTextInput
            value={reservationUrl}
            onChange={(value) => updateContact('reservation_url', value)}
            placeholder="https://www.opentable.com/restaurant/..."
            type="url"
          />
        </CleanFormField>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-slate-800 pb-2 border-b border-slate-100">Link Social Media</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <CleanFormField
            label="Instagram"
            description="Account Instagram ufficiale"
          >
            <CleanTextInput
              value={socialLinks.instagram || ''}
              onChange={(value) => updateContact('social_links', { ...socialLinks, instagram: value })}
              placeholder="https://instagram.com/restaurant"
              type="url"
            />
          </CleanFormField>
          
          <CleanFormField
            label="Facebook"
            description="Pagina Facebook ufficiale"
          >
            <CleanTextInput
              value={socialLinks.facebook || ''}
              onChange={(value) => updateContact('social_links', { ...socialLinks, facebook: value })}
              placeholder="https://facebook.com/restaurant"
              type="url"
            />
          </CleanFormField>
        </div>
      </div>
      
      <CleanInfoBox type="tip" title="📞 Suggerimenti Contatti">
        <ul className="space-y-1">
          <li>• Utilizzate un numero dedicato alle prenotazioni</li>
          <li>• Email professionale con dominio del ristorante</li>
          <li>• Indirizzo completo per facilitare la navigazione GPS</li>
          <li>• Link social aggiornati e verificati</li>
        </ul>
      </CleanInfoBox>
    </div>
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="Testimonianze Clienti"
        description="Recensioni e testimonianze di ospiti soddisfatti"
      />
      
      <div className="space-y-5">
        {testimonials.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <Star className="w-6 h-6 opacity-40" />
            </div>
            <h4 className="font-medium text-sm mb-1">Nessuna testimonianza</h4>
            <p className="text-xs">Aggiungi le prime recensioni dei tuoi clienti</p>
          </div>
        ) : (
          testimonials.map((testimonial: any, index: number) => (
            <div key={testimonial.id || index} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-600">#{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-slate-800">Testimonianza</h4>
                </div>
                <CleanButton
                  onClick={() => removeTestimonial(index)}
                  variant="ghost"
                  size="sm"
                >
                  Rimuovi
                </CleanButton>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <CleanFormField label="Nome Cliente" required>
                    <CleanTextInput
                      value={testimonial.name}
                      onChange={(value) => updateTestimonial(index, 'name', value)}
                      placeholder="Es. Marco Rossi"
                    />
                  </CleanFormField>
                  
                  <CleanFormField label="Ruolo/Descrizione">
                    <CleanTextInput
                      value={testimonial.role}
                      onChange={(value) => updateTestimonial(index, 'role', value)}
                      placeholder="Es. Food Critic, Cliente abituale"
                    />
                  </CleanFormField>
                </div>
                
                <CleanFormField 
                  label="Testimonianza" 
                  description="La recensione completa del cliente"
                  required
                >
                  <CleanTextInput
                    value={testimonial.content}
                    onChange={(value) => updateTestimonial(index, 'content', value)}
                    placeholder="Una esperienza culinaria indimenticabile che ha superato ogni aspettativa..."
                    multiline
                    rows={3}
                  />
                </CleanFormField>
                
                <div className="grid grid-cols-2 gap-4">
                  <CleanFormField label="Valutazione" required>
                    <CleanSelect
                      value={testimonial.rating.toString()}
                      onChange={(value) => updateTestimonial(index, 'rating', parseInt(value))}
                      options={[
                        { value: '5', label: '⭐⭐⭐⭐⭐ (5 stelle)' },
                        { value: '4', label: '⭐⭐⭐⭐ (4 stelle)' },
                        { value: '3', label: '⭐⭐⭐ (3 stelle)' },
                      ]}
                    />
                  </CleanFormField>
                  
                  <CleanFormField label="Fonte">
                    <CleanSelect
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
                  </CleanFormField>
                </div>
              </div>
            </div>
          ))
        )}
        
        <CleanButton
          onClick={addTestimonial}
          variant="outline"
          className="w-full"
          icon={Star}
        >
          Aggiungi Testimonianza
        </CleanButton>
      </div>
      
      <CleanInfoBox type="tip" title="✨ Best Practices">
        <ul className="space-y-1">
          <li>• Privilegia recensioni recenti e autentiche</li>
          <li>• Includi dettagli specifici sui piatti o servizio</li>
          <li>• Varia le fonti per maggiore credibilità</li>
          <li>• Max 3-4 testimonianze per non appesantire</li>
        </ul>
      </CleanInfoBox>
    </div>
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="Eventi Esclusivi"
        description="Degustazioni, cene a tema e eventi speciali per i vostri clienti VIP"
      />
      
      <div className="space-y-5">
        {events.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <Calendar className="w-6 h-6 opacity-40" />
            </div>
            <h4 className="font-medium text-sm mb-1">Nessun evento programmato</h4>
            <p className="text-xs">Crea il primo evento esclusivo per i tuoi clienti</p>
          </div>
        ) : (
          events.map((event: any, index: number) => (
            <div key={event.id || index} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-slate-800">Evento #{index + 1}</h4>
                </div>
                <CleanButton
                  onClick={() => removeEvent(index)}
                  variant="ghost"
                  size="sm"
                >
                  Rimuovi
                </CleanButton>
              </div>
              
              <div className="space-y-4">
                <CleanFormField 
                  label="Titolo Evento" 
                  description="Nome dell'evento (sii descrittivo e accattivante)"
                  required
                >
                  <CleanTextInput
                    value={event.title}
                    onChange={(value) => updateEvent(index, 'title', value)}
                    placeholder="Es. Degustazione Tartufo Bianco d'Alba"
                  />
                </CleanFormField>
                
                <CleanFormField 
                  label="Descrizione" 
                  description="Dettagli dell'evento, cosa include, cosa aspettarsi"
                >
                  <CleanTextInput
                    value={event.description}
                    onChange={(value) => updateEvent(index, 'description', value)}
                    placeholder="Serata speciale dedicata al tartufo bianco d'Alba con menu appositamente studiato dal nostro chef..."
                    multiline
                    rows={2}
                  />
                </CleanFormField>
                
                <div className="grid grid-cols-3 gap-4">
                  <CleanFormField label="Data" required>
                    <CleanTextInput
                      value={event.date}
                      onChange={(value) => updateEvent(index, 'date', value)}
                      placeholder="15 Novembre 2024"
                    />
                  </CleanFormField>
                  
                  <CleanFormField label="Orario" required>
                    <CleanTextInput
                      value={event.time}
                      onChange={(value) => updateEvent(index, 'time', value)}
                      placeholder="19:30"
                    />
                  </CleanFormField>
                  
                  <CleanFormField label="Tipo Evento" required>
                    <CleanSelect
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
                  </CleanFormField>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <CleanFormField 
                    label="Prezzo per persona" 
                    description="Includi valuta (€, $, etc.)"
                  >
                    <CleanTextInput
                      value={event.price}
                      onChange={(value) => updateEvent(index, 'price', value)}
                      placeholder="€195"
                    />
                  </CleanFormField>
                  
                  <CleanFormField 
                    label="Posti disponibili"
                    description="Numero massimo di partecipanti"
                  >
                    <CleanTextInput
                      value={event.capacity}
                      onChange={(value) => updateEvent(index, 'capacity', value)}
                      placeholder="12"
                    />
                  </CleanFormField>
                </div>
              </div>
            </div>
          ))
        )}
        
        <CleanButton
          onClick={addEvent}
          variant="outline"
          className="w-full"
          icon={Calendar}
        >
          Aggiungi Evento
        </CleanButton>
      </div>
      
      <CleanInfoBox type="tip" title="🎭 Idee per Eventi Luxury">
        <ul className="space-y-1">
          <li>• Cene a 4 mani con chef stellati ospiti</li>
          <li>• Degustazioni stagionali (tartufo, caviale, ecc.)</li>
          <li>• Masterclass di cucina con lo chef</li>
          <li>• Wine pairing con sommelier</li>
          <li>• Eventi privati aziendali o celebrazioni</li>
        </ul>
      </CleanInfoBox>
    </div>
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="VIP Club & Newsletter"
        description="Comunicazioni esclusive per i vostri clienti più affezionati"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Titolo Sezione"
          description="Nome del vostro VIP club o newsletter"
          required
        >
          <CleanTextInput
            value={title}
            onChange={(value) => updateNewsletter('title', value)}
            placeholder="Es. Club des Gourmets, VIP Experience"
          />
        </CleanFormField>
        
        <CleanFormField
          label="Descrizione"
          description="Breve descrizione del vostro servizio VIP e cosa include"
          required
        >
          <CleanTextInput
            value={description}
            onChange={(value) => updateNewsletter('description', value)}
            placeholder="Ricevi in anteprima notizie sui nostri eventi esclusivi, nuovi menu e degustazioni speciali..."
            multiline
            rows={3}
          />
        </CleanFormField>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-800">Vantaggi dell'iscrizione</h4>
          <CleanButton
            onClick={addBenefit}
            variant="outline"
            size="sm"
            icon={Mail}
          >
            Aggiungi Vantaggio
          </CleanButton>
        </div>
        
        {benefits.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <Mail className="w-5 h-5 opacity-40" />
            </div>
            <p className="text-sm mb-1">Nessun vantaggio configurato</p>
            <p className="text-xs">Aggiungi i benefici per gli iscritti VIP</p>
          </div>
        ) : (
          <div className="space-y-3">
            {benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                <div className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold">#{index + 1}</span>
                </div>
                <CleanTextInput
                  value={benefit}
                  onChange={(value) => updateBenefit(index, value)}
                  placeholder="Es. Prenotazioni prioritarie per eventi speciali"
                  className="flex-1"
                />
                <CleanButton
                  onClick={() => removeBenefit(index)}
                  variant="ghost"
                  size="sm"
                >
                  Rimuovi
                </CleanButton>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <CleanInfoBox type="tip" title="💎 Suggerimenti VIP">
        <ul className="space-y-1">
          <li>• Prenotazioni prioritarie per eventi speciali</li>
          <li>• Accesso anticipato ai nuovi menu</li>
          <li>• Degustazioni esclusive con lo chef</li>
          <li>• Sconti su wine pairing e servizi extra</li>
          <li>• Newsletter mensile con ricette e consigli</li>
        </ul>
      </CleanInfoBox>
    </div>
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

  const updateDaySchedule = (day: string, field: string, value: string | boolean) => {
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="Orari di Apertura"
        description="Comunicate chiaramente i vostri orari ai clienti"
      />
      
      <div className="space-y-4">
        {daysOfWeek.map(({ key, label }) => {
          const daySchedule = schedule[key] || { lunch_start: '', lunch_end: '', dinner_start: '', dinner_end: '', closed: false };
          
          return (
            <div key={key} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-800 text-base">{label}</h4>
                <div className="flex items-center gap-2">
                  <CleanToggle
                    checked={!daySchedule.closed}
                    onChange={(isOpen) => updateDaySchedule(key, 'closed', !isOpen)}
                  />
                  <span className="text-sm text-slate-600 font-medium">
                    {daySchedule.closed ? 'Chiuso' : 'Aperto'}
                  </span>
                </div>
              </div>
              
              {!daySchedule.closed && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Pranzo</label>
                    <div className="flex items-center gap-2 max-w-xs">
                      <input
                        type="time"
                        value={daySchedule.lunch_start || ''}
                        onChange={(e) => updateDaySchedule(key, 'lunch_start', e.target.value)}
                        className="w-20 px-2 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <span className="text-slate-400 text-sm">—</span>
                      <input
                        type="time"
                        value={daySchedule.lunch_end || ''}
                        onChange={(e) => updateDaySchedule(key, 'lunch_end', e.target.value)}
                        className="w-20 px-2 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Cena</label>
                    <div className="flex items-center gap-2 max-w-xs">
                      <input
                        type="time"
                        value={daySchedule.dinner_start || ''}
                        onChange={(e) => updateDaySchedule(key, 'dinner_start', e.target.value)}
                        className="w-20 px-2 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                      <span className="text-slate-400 text-sm">—</span>
                      <input
                        type="time"
                        value={daySchedule.dinner_end || ''}
                        onChange={(e) => updateDaySchedule(key, 'dinner_end', e.target.value)}
                        className="w-20 px-2 py-1.5 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <CleanInfoBox type="info" title="⏰ Note Importanti">
        <ul className="space-y-1">
          <li>• Indicate orari di ultima prenotazione, non chiusura cucina</li>
          <li>• Considerate pause tra pranzo e cena se necessario</li>
          <li>• Specificate orari festivi nella sezione eventi</li>
          <li>• Gli orari verranno mostrati sul sito con formato elegante</li>
        </ul>
      </CleanInfoBox>
    </div>
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
    <div className="space-y-6">
      <CleanSectionHeader
        title="Posizione e Indicazioni"
        description="Aiutate i clienti a raggiungervi facilmente"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Indirizzo Completo"
          description="Via e numero civico"
          required
        >
          <CleanTextInput
            value={address}
            onChange={(value) => updateLocation('address', value)}
            placeholder="Es. Via della Spiga, 15"
          />
        </CleanFormField>
        
        <div className="grid grid-cols-2 gap-4">
          <CleanFormField
            label="Città"
            required
          >
            <CleanTextInput
              value={city}
              onChange={(value) => updateLocation('city', value)}
              placeholder="Es. Milano"
            />
          </CleanFormField>
          
          <CleanFormField
            label="CAP"
            required
          >
            <CleanTextInput
              value={zipCode}
              onChange={(value) => updateLocation('zipCode', value)}
              placeholder="Es. 20121"
            />
          </CleanFormField>
        </div>
        
        <CleanFormField
          label="Indicazioni Speciali"
          description="Consigli per raggiungere il ristorante (parcheggio, mezzi pubblici, etc.)"
        >
          <CleanTextInput
            value={directions}
            onChange={(value) => updateLocation('directions', value)}
            placeholder="Facilmente raggiungibile con la metro M1 (fermata San Babila). Parcheggio convenzionato presso Garage San Babila..."
            multiline
            rows={4}
          />
        </CleanFormField>
      </div>
      
      <CleanInfoBox type="success" title="🚗 Suggerimenti Utili">
        <ul className="space-y-1">
          <li>• Menzionate parcheggi convenzionati o disponibili</li>
          <li>• Indicate fermate metro/autobus più vicine</li>
          <li>• Specificate se è necessaria prenotazione per accesso ZTL</li>
          <li>• Consigli su taxi/rideshare nelle vicinanze</li>
        </ul>
      </CleanInfoBox>
    </div>
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

