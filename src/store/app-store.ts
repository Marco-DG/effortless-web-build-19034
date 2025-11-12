import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, BuilderMode, Project, ProjectData } from '../types';

interface AppStore extends AppState {
  // Actions
  setActiveMode: (mode: BuilderMode) => void;
  startBuilding: (mode?: BuilderMode) => void;
  stopBuilding: () => void;
  
  // UI Actions
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  togglePreview: () => void;
  openPreview: () => void;
  closePreview: () => void;
  setActiveSection: (section: string | null) => void;
  
  // Project Actions
  createProject: (name: string, template: TemplateType) => void;
  loadProject: (project: Project) => void;
  updateProject: (updates: Partial<ProjectData>) => void;
  saveProject: () => Promise<void>;
}

const createDefaultProject = (name: string, template: TemplateType = 'wine-bar'): ProjectData => ({
  business: {
    name,
    type: 'restaurant',
    description: '',
    tagline: 'Vini d\'autore. Atmosfera intima.'
  },
  
  contact: {
    address: '',
    phone: '',
    email: '',
    socialLinks: {}
  },
  
  hours: {
    monday: { open: '12:00', close: '23:00', closed: false },
    tuesday: { open: '12:00', close: '23:00', closed: false },
    wednesday: { open: '12:00', close: '23:00', closed: false },
    thursday: { open: '12:00', close: '23:00', closed: false },
    friday: { open: '12:00', close: '23:00', closed: false },
    saturday: { open: '12:00', close: '23:00', closed: false },
    sunday: { open: '12:00', close: '23:00', closed: true }
  },
  
  logo: {
    mode: 'text',
    text: name,
    font: 'Playfair Display',
    size: 48,
    color: '#8B4513',
    layout: 'horizontal'
  },
  
  menu: {
    title: 'Il Nostro Menu',
    layout: 'list',
    columns: 2,
    showImages: true,
    showPrices: true,
    showDescriptions: true,
    showBadges: true,
    showCategories: true,
    categoriesAsFilter: true,
    items: []
  },
  
  site: {
    template,
    sections: [
      { 
        id: 'hero_default', 
        type: 'hero', 
        enabled: true, 
        order: 0, 
        data: {
          title: 'Osteria del Borgo',
          subtitle: 'Tradizione e sapori autentici nel cuore della città',
          imageUrl: 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop',
          description: 'Benvenuti nel nostro locale, dove ogni piatto racconta una storia di passione e tradizione.',
          style: 'gradient',
          alignment: 'center',
          ctaText: 'Scopri il Menu',
          ctaLink: '#menu'
        }
      },
      { 
        id: 'about_default', 
        type: 'about', 
        enabled: true, 
        order: 1, 
        data: {
          title: 'La nostra storia',
          content: 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia. Ogni piatto è preparato con ingredienti freschi e locali, rispettando le ricette della tradizione italiana e l\'arte dell\'ospitalità.',
          image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop',
          imagePosition: 'left'
        }
      },
      { 
        id: 'menu_default', 
        type: 'menu', 
        enabled: true, 
        order: 2, 
        data: {
          displayStyle: 'preview',
          showPrices: true
        }
      },
      { 
        id: 'gallery_default', 
        type: 'gallery', 
        enabled: true, 
        order: 3, 
        data: {
          title: 'La Nostra Galleria',
          subtitle: 'Scopri l\'atmosfera e i piatti del nostro ristorante',
          images: [
            {
              id: 'default_1',
              url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop',
              caption: 'Il nostro ambiente elegante'
            },
            {
              id: 'default_2', 
              url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop',
              caption: 'I nostri piatti signature'
            },
            {
              id: 'default_3',
              url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
              caption: 'Selezione di vini pregiati'
            }
          ],
          columns: 3
        }
      },
      { 
        id: 'reviews_default', 
        type: 'reviews', 
        enabled: true, 
        order: 4, 
        data: {
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
        }
      },
      { 
        id: 'events_default', 
        type: 'events', 
        enabled: true, 
        order: 5, 
        data: {
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
        }
      },
      { 
        id: 'newsletter_default', 
        type: 'newsletter', 
        enabled: true, 
        order: 6, 
        data: {
          title: 'Resta Aggiornato',
          subtitle: 'Iscriviti alla nostra newsletter per ricevere offerte esclusive e novità dal nostro wine bar',
          style: 'centered'
        }
      },
      { 
        id: 'location_default', 
        type: 'location', 
        enabled: true, 
        order: 7, 
        data: {
          title: 'Dove Siamo',
          subtitle: 'Vieni a trovarci nel cuore della città',
          address: 'Via del Borgo 12, 00100 Roma',
          mapUrl: 'https://maps.google.com/?q=41.9028,12.4964',
          showMap: true,
          showDirections: true
        }
      },
      { 
        id: 'contact_default', 
        type: 'contact', 
        enabled: true, 
        order: 8, 
        data: {
          title: 'Contatti',
          showMap: true,
          mapStyle: 'google',
          showForm: true,
          showHours: true,
          showSocialLinks: true
        }
      }
    ],
    theme: {
      colors: {
        primary: '#2a1a1d',
        secondary: '#6b3a2e',
        accent: '#d9b99b',
        background: '#FFFFFF',
        text: '#2C3E50'
      },
      fonts: {
        heading: 'Playfair Display',
        subheading: 'Inter',
        body: 'Inter'
      },
      spacing: {
        section: '80px',
        container: '1200px'
      }
    },
    seo: {
      title: name,
      description: '',
      keywords: []
    }
  },
  
  gallery: [],
  reviews: [],
  events: []
});

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial State
      activeMode: 'site',
      isBuilding: false,
      activeProject: null,
      ui: {
        sidebarOpen: false,
        previewOpen: false,
        activeSection: null
      },

      // Mode Actions
      setActiveMode: (mode) => set({ activeMode: mode }),
      
      startBuilding: (mode = 'site') => set({ 
        isBuilding: true, 
        activeMode: mode,
        ui: { ...get().ui, sidebarOpen: true }
      }),
      
      stopBuilding: () => set({ 
        isBuilding: false,
        ui: { ...get().ui, sidebarOpen: false, previewOpen: false }
      }),

      // UI Actions
      toggleSidebar: () => set(state => ({ 
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
      })),
      
      openSidebar: () => set(state => ({ 
        ui: { ...state.ui, sidebarOpen: true }
      })),
      
      closeSidebar: () => set(state => ({ 
        ui: { ...state.ui, sidebarOpen: false }
      })),
      
      togglePreview: () => set(state => ({ 
        ui: { ...state.ui, previewOpen: !state.ui.previewOpen }
      })),
      
      openPreview: () => set(state => ({ 
        ui: { ...state.ui, previewOpen: true }
      })),
      
      closePreview: () => set(state => ({ 
        ui: { ...state.ui, previewOpen: false }
      })),
      
      setActiveSection: (section) => set(state => ({ 
        ui: { ...state.ui, activeSection: section }
      })),

      // Project Actions
      createProject: (name, template) => {
        const project: Project = {
          id: `proj_${Date.now()}`,
          name,
          type: template,
          data: createDefaultProject(name, template),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set({ 
          activeProject: project,
          isBuilding: true,
          ui: { ...get().ui, sidebarOpen: true }
        });
      },
      
      loadProject: (project) => set({ activeProject: project }),
      
      updateProject: (updates) => {
        const current = get().activeProject;
        if (!current) return;
        
        const updated: Project = {
          ...current,
          data: { ...current.data, ...updates },
          updatedAt: new Date().toISOString()
        };
        
        set({ activeProject: updated });
      },
      
      saveProject: async () => {
        const project = get().activeProject;
        if (!project) return;
        
        // TODO: Implementare salvataggio su server
        console.log('Saving project:', project);
      }
    }),
    {
      name: 'restaurant-saas-v2',
      partialize: (state) => ({ 
        activeProject: state.activeProject,
        activeMode: state.activeMode
      })
    }
  )
);