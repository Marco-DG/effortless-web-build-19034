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

const createDefaultProject = (name: string, template: TemplateType): ProjectData => ({
  business: {
    name,
    type: 'restaurant',
    description: '',
    tagline: template === 'wine-bar' 
      ? 'Vini d\'autore. Atmosfera intima.'
      : template === 'fine-dining' 
      ? 'Cucina d\'autore in ogni dettaglio'
      : 'Sapori Autentici della Tradizione Italiana'
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
          title: name,
          subtitle: template === 'wine-bar' 
            ? 'Vini d\'autore. Atmosfera intima.'
            : template === 'fine-dining' 
            ? 'Cucina d\'autore in ogni dettaglio'
            : 'Sapori Autentici della Tradizione Italiana',
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
        enabled: false, 
        order: 1, 
        data: {
          title: 'La nostra storia',
          content: 'Da tre generazioni portiamo avanti la tradizione culinaria di famiglia. Ogni piatto è preparato con ingredienti freschi e locali, seguendo ricette tramandate nel tempo ma con un tocco di innovazione contemporanea.',
          imagePosition: 'right'
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
        id: 'contact_default', 
        type: 'contact', 
        enabled: false, 
        order: 3, 
        data: {
          title: 'Vieni a trovarci',
          showMap: true,
          mapStyle: 'google',
          showForm: false,
          showHours: true,
          showSocialLinks: true
        }
      }
    ],
    theme: {
      colors: {
        primary: template === 'wine-bar' ? '#8B4513' : template === 'fine-dining' ? '#2C3E50' : '#D2691E',
        secondary: template === 'wine-bar' ? '#D2691E' : template === 'fine-dining' ? '#34495E' : '#8B4513',
        accent: template === 'wine-bar' ? '#F4E4C1' : template === 'fine-dining' ? '#95A5A6' : '#DEB887',
        background: '#FFFFFF',
        text: '#2C3E50'
      },
      fonts: {
        heading: template === 'wine-bar' ? 'Playfair Display' : template === 'fine-dining' ? 'Cormorant Garamond' : 'Merriweather',
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