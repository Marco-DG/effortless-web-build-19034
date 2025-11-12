import React from 'react';
import { 
  Monitor, Info, Images, Star, Calendar, Phone, 
  Mail, Clock, MapPin, Coffee, Truck, GripVertical,
  Eye, EyeOff, ChevronUp, ChevronDown 
} from 'lucide-react';

interface ComponentsManagerProps {
  project: any;
  onUpdate: (updates: any) => void;
}

const AVAILABLE_COMPONENTS = [
  { id: 'hero', name: 'Hero', icon: Monitor, description: 'Sezione principale di benvenuto', required: true, order: 0 },
  { id: 'about', name: 'Chi Siamo', icon: Info, description: 'Informazioni sul ristorante', required: false, order: 1 },
  { id: 'menu', name: 'Menù', icon: Coffee, description: 'Anteprima del menù', required: true, order: 2 },
  { id: 'gallery', name: 'Galleria', icon: Images, description: 'Galleria foto del ristorante', required: false, order: 3 },
  { id: 'reviews', name: 'Recensioni', icon: Star, description: 'Recensioni dei clienti', required: false, order: 4 },
  { id: 'events', name: 'Eventi', icon: Calendar, description: 'Eventi e manifestazioni', required: false, order: 5 },
  { id: 'newsletter', name: 'Newsletter', icon: Mail, description: 'Iscrizione newsletter', required: false, order: 6 },
  { id: 'location', name: 'Posizione', icon: MapPin, description: 'Mappa e indicazioni', required: false, order: 7 },
  { id: 'contact', name: 'Contatti', icon: Phone, description: 'Informazioni di contatto', required: false, order: 8 },
];

export const ComponentsManager: React.FC<ComponentsManagerProps> = ({ project, onUpdate }) => {
  // Ottieni le sezioni esistenti o crea quelle di default
  const siteSections = project.data.site?.sections || [];
  
  // Se non ci sono sezioni, inizializza con quelle di default abilitate
  React.useEffect(() => {
    if (siteSections.length === 0) {
      const defaultSections = AVAILABLE_COMPONENTS.map(comp => ({
        id: `${comp.id}_main`,
        type: comp.id,
        enabled: true, // Abilita tutti i componenti di default
        order: comp.order,
        data: getDefaultSectionData(comp.id)
      }));
      
      onUpdate({
        site: {
          ...project.data.site,
          sections: defaultSections
        }
      });
    }
  }, [siteSections.length, onUpdate]);

  // Crea mappa delle sezioni per tipo
  const sectionMap = new Map(siteSections.map((s: any) => [s.type, s]));
  
  // Crea lista ordinata con stato attuale
  const componentsList = AVAILABLE_COMPONENTS.map(comp => {
    const section = sectionMap.get(comp.id);
    return {
      ...comp,
      enabled: section?.enabled || false,
      currentOrder: section?.order ?? comp.order
    };
  }).sort((a, b) => a.currentOrder - b.currentOrder);

  const enabledComponents = componentsList.filter(c => c.enabled);
  const disabledComponents = componentsList.filter(c => !c.enabled && !c.required);

  const toggleComponent = (componentId: string) => {
    const component = AVAILABLE_COMPONENTS.find(c => c.id === componentId);
    if (!component || component.required) return;

    const updatedSections = [...siteSections];
    const existingIndex = updatedSections.findIndex(s => s.type === componentId);
    
    if (existingIndex >= 0) {
      // Toggle existing section
      updatedSections[existingIndex] = {
        ...updatedSections[existingIndex],
        enabled: !updatedSections[existingIndex].enabled
      };
    } else {
      // Add new section
      const newOrder = Math.max(...updatedSections.map(s => s.order || 0), -1) + 1;
      updatedSections.push({
        id: `${componentId}_${Date.now()}`,
        type: componentId,
        enabled: true,
        order: newOrder,
        data: getDefaultSectionData(componentId)
      });
    }

    onUpdate({
      site: {
        ...project.data.site,
        sections: updatedSections
      }
    });
  };

  const moveComponent = (componentId: string, direction: 'up' | 'down') => {
    const currentIndex = enabledComponents.findIndex(c => c.id === componentId);
    if (currentIndex < 0) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= enabledComponents.length) return;
    
    // Crea nuova lista riordinata
    const reorderedComponents = Array.from(enabledComponents);
    [reorderedComponents[currentIndex], reorderedComponents[newIndex]] = 
    [reorderedComponents[newIndex], reorderedComponents[currentIndex]];
    
    // Aggiorna l'ordine nelle sezioni
    const updatedSections = siteSections.map((section: any) => {
      const newComponentIndex = reorderedComponents.findIndex(c => c.id === section.type);
      if (newComponentIndex >= 0 && section.enabled) {
        return { ...section, order: newComponentIndex };
      }
      return section;
    });

    onUpdate({
      site: {
        ...project.data.site,
        sections: updatedSections
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Gestione Componenti</h4>
        <p className="text-sm text-muted-foreground">
          Abilita, disabilita e riordina i componenti del sito.
        </p>
      </div>

      {/* Componenti Abilitati */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-sm">Componenti Attivi ({enabledComponents.length})</h5>
        </div>
        
        <div className="space-y-2">
          {enabledComponents.map((component, index) => {
            const Icon = component.icon;
            return (
              <div
                key={component.id}
                className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                  component.required ? 'border-blue-200 bg-blue-50/50' : 'border-border bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm flex items-center gap-2">
                      {component.name}
                      {component.required && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          Obbligatorio
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{component.description}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveComponent(component.id, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Sposta su"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => moveComponent(component.id, 'down')}
                    disabled={index === enabledComponents.length - 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Sposta giù"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {!component.required && (
                    <button
                      onClick={() => toggleComponent(component.id)}
                      className="p-1 hover:bg-gray-100 rounded text-muted-foreground"
                      title="Disabilita componente"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Componenti Disabilitati */}
      {disabledComponents.length > 0 && (
        <div className="space-y-4">
          <h5 className="font-medium text-sm">Componenti Disponibili ({disabledComponents.length})</h5>
          <div className="space-y-2">
            {disabledComponents.map((component) => {
              const Icon = component.icon;
              return (
                <div
                  key={component.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 border-muted"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">{component.name}</div>
                      <div className="text-xs text-muted-foreground">{component.description}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleComponent(component.id)}
                    className="p-2 hover:bg-white/60 rounded text-muted-foreground hover:text-primary"
                    title="Abilita componente"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
        💡 I componenti Hero e Menù sono obbligatori e sempre visibili
      </div>
    </div>
  );
};

// Helper function per i dati di default delle sezioni
function getDefaultSectionData(sectionType: string) {
  switch (sectionType) {
    case 'hero':
      return {
        title: 'Osteria del Borgo',
        subtitle: 'Tradizione e sapori autentici nel cuore della città',
        imageUrl: 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop',
        style: 'gradient',
        alignment: 'center',
        ctaText: 'Scopri il Menu',
        ctaLink: '#menu'
      };
    case 'about':
      return {
        title: 'La nostra storia',
        content: 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia. Ogni piatto è preparato con ingredienti freschi e locali, rispettando le ricette della tradizione italiana e l\'arte dell\'ospitalità.',
        imagePosition: 'left',
        image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop'
      };
    case 'gallery':
      return {
        title: 'La Nostra Galleria',
        subtitle: 'Scopri l\'atmosfera e i piatti del nostro ristorante',
        images: [],
        columns: 3
      };
    case 'reviews':
      return {
        title: 'Cosa Dicono di Noi',
        subtitle: 'Le recensioni dei nostri clienti',
        reviews: [
          {
            id: 'review_1',
            author: 'Marco R.',
            text: 'Esperienza fantastica! Cibo ottimo e servizio impeccabile.',
            rating: 5,
            date: '2024-01-15'
          },
          {
            id: 'review_2', 
            author: 'Giulia S.',
            text: 'Atmosfera accogliente e piatti deliziosi. Ci torneremo sicuramente!',
            rating: 5,
            date: '2024-01-10'
          }
        ],
        showStars: true
      };
    case 'events':
      return {
        title: 'I Nostri Eventi',
        subtitle: 'Non perdere le nostre serate speciali',
        events: [
          {
            id: 'event_1',
            title: 'Serata Jazz',
            description: 'Musica dal vivo ogni venerdì sera',
            date: '2024-02-16',
            time: '21:00',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop'
          }
        ],
        showImages: true
      };
    case 'newsletter':
      return {
        title: 'Resta Aggiornato',
        subtitle: 'Iscriviti alla nostra newsletter per ricevere offerte esclusive e novità dal nostro wine bar',
        style: 'centered'
      };
    case 'location':
      return {
        title: 'Dove Siamo',
        subtitle: 'Vieni a trovarci nel cuore della città',
        address: 'Via del Borgo 12, 00100 Roma',
        mapUrl: 'https://maps.google.com/?q=41.9028,12.4964',
        showMap: true,
        showDirections: true
      };
    case 'contact':
      return {
        title: 'Contatti',
        showMap: true,
        mapStyle: 'google',
        showForm: true,
        showHours: true,
        showSocialLinks: true
      };
    default:
      return {};
  }
}