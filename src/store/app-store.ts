import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SiteConfig, SectionConfig, PageConfig } from '../modules/core/builder/types';
import { HeroSchema } from '../modules/core/components/Hero';
import { GridSchema } from '../modules/core/components/Grid';
import { HeaderSchema } from '../modules/core/components/Header';
import { FooterSchema } from '../modules/core/components/Footer';
import { MenuSchema } from '../modules/core/components/Menu';
import { GallerySchema } from '../modules/core/components/Gallery';
import { ContentSchema } from '../modules/core/components/Content';
import { FeaturesSchema } from '../modules/core/components/Features';
import { TestimonialsSchema } from '../modules/core/components/Testimonials';
import { AwardsSchema } from '../modules/core/components/Awards';
import { ContactSchema } from '../modules/core/components/Contact';
import { ReservationSchema } from '../modules/core/components/Reservation';
import { getAllSchemas } from '../modules/core/builder/registry';

// --- Types ---

interface AppState {
  activeMode: 'site' | 'logo' | 'menu';
  isBuilding: boolean;
  activeProject: SiteConfig | null;
  ui: {
    sidebarOpen: boolean;
    previewOpen: boolean;
    activeSectionId: string | null;
    activePageId: string | null; // NEW: Track active page
  };
}

interface AppActions {
  // Mode
  setActiveMode: (mode: 'site' | 'logo' | 'menu') => void;
  startBuilding: () => void;
  stopBuilding: () => void;

  // UI
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  togglePreview: () => void;
  openPreview: () => void;
  closePreview: () => void;
  setActiveSection: (sectionId: string | null) => void;
  setActivePage: (pageId: string) => void; // NEW

  // Project
  createProject: (name: string) => void;
  updateProject: (updates: Partial<SiteConfig>) => void;

  // Page Management (NEW)
  addPage: (title: string, slug: string) => void;
  deletePage: (pageId: string) => void;
  updatePage: (pageId: string, updates: Partial<PageConfig>) => void;

  // Section Management (Updated to target active page)
  updateSection: (sectionId: string, data: any) => void;
  addSection: (type: string) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  toggleSection: (sectionId: string) => void;
}

type AppStore = AppState & AppActions;

// --- Defaults ---

const createDefaultProject = (name: string): SiteConfig => {
  const homePageId = `page_${Date.now()}`;

  return {
    id: `proj_${Date.now()}`,
    name,
    metadata: {
      title: name,
      description: 'Created with Universal Builder'
    },
    theme: {
      colors: {
        primary: '#D4AF37',
        secondary: '#1A1A1A',
        accent: '#F4F4F4',
        background: '#0B0B0F',
        text: '#FFFFFF'
      },
      fonts: {
        heading: 'Playfair Display',
        body: 'Inter'
      },
      borderRadius: '8px'
    },
    pages: [
      {
        id: homePageId,
        title: 'Home',
        slug: '/',
        sections: [
          {
            id: 'header_1',
            type: 'header',
            isEnabled: true,
            data: HeaderSchema.defaultData
          },
          {
            id: 'hero_1',
            type: 'hero',
            isEnabled: true,
            data: HeroSchema.defaultData
          },
          {
            id: 'features_1',
            type: 'features',
            isEnabled: true,
            data: FeaturesSchema.defaultData
          },
          {
            id: 'menu_1',
            type: 'menu',
            isEnabled: true,
            data: MenuSchema.defaultData
          },
          {
            id: 'gallery_1',
            type: 'gallery',
            isEnabled: true,
            data: GallerySchema.defaultData
          },
          {
            id: 'testimonials_1',
            type: 'testimonials',
            isEnabled: true,
            data: TestimonialsSchema.defaultData
          },
          {
            id: 'footer_1',
            type: 'footer',
            isEnabled: true,
            data: FooterSchema.defaultData
          }
        ]
      }
    ],
    // Default data for Logo Builder
    logo: {
      mode: 'text',
      text: name,
      font: 'Playfair Display',
      size: 48,
      color: '#D4AF37',
      layout: 'horizontal',
      elements: []
    },
    // Default data for Menu Builder
    menu: {
      title: 'Our Menu',
      items: []
    },
    // Default business info
    business: {
      name: name,
      tagline: 'Fine Dining Experience',
      description: 'A culinary journey through tradition and innovation.',
      contact: {
        email: 'hello@restaurant.com',
        phone: '+1 (555) 123-4567',
        address: '123 Culinary Avenue, New York, NY 10012'
      },
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      },
      hours: {
        weekdays: 'Mon-Fri: 11am - 10pm',
        weekends: 'Sat-Sun: 10am - 11pm'
      }
    }
  };
};

// --- Store ---

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // State
      activeMode: 'site',
      isBuilding: false,
      activeProject: null,
      ui: {
        sidebarOpen: true,
        previewOpen: false,
        activeSectionId: null,
        activePageId: null
      },

      // Actions
      setActiveMode: (mode) => set({ activeMode: mode }),
      startBuilding: () => set({ isBuilding: true }),
      stopBuilding: () => set({ isBuilding: false }),

      toggleSidebar: () => set((state) => ({
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
      })),

      openSidebar: () => set((state) => ({
        ui: { ...state.ui, sidebarOpen: true }
      })),

      closeSidebar: () => set((state) => ({
        ui: { ...state.ui, sidebarOpen: false }
      })),

      togglePreview: () => set((state) => ({
        ui: { ...state.ui, previewOpen: !state.ui.previewOpen }
      })),

      openPreview: () => set((state) => ({
        ui: { ...state.ui, previewOpen: true }
      })),

      closePreview: () => set((state) => ({
        ui: { ...state.ui, previewOpen: false }
      })),

      setActiveSection: (sectionId) => set((state) => ({
        ui: { ...state.ui, activeSectionId: sectionId }
      })),

      setActivePage: (pageId) => set((state) => ({
        ui: { ...state.ui, activePageId: pageId, activeSectionId: null }
      })),

      createProject: (name) => {
        const project = createDefaultProject(name);
        set({
          activeProject: project,
          isBuilding: true,
          ui: {
            sidebarOpen: true,
            previewOpen: false,
            activeSectionId: project.pages[0].sections[1].id, // Select Hero
            activePageId: project.pages[0].id
          }
        });
      },

      updateProject: (updates) => set((state) => {
        if (!state.activeProject) return state;
        return {
          activeProject: { ...state.activeProject, ...updates }
        };
      }),

      // --- Page Management ---

      addPage: (title, slug) => set((state) => {
        if (!state.activeProject) return state;
        const newPage: PageConfig = {
          id: `page_${Date.now()}`,
          title,
          slug,
          sections: [
            {
              id: `header_${Date.now()}`,
              type: 'header',
              isEnabled: true,
              data: HeaderSchema.defaultData
            },
            {
              id: `hero_${Date.now()}`,
              type: 'hero',
              isEnabled: true,
              data: { ...HeroSchema.defaultData, title: title }
            },
            {
              id: `footer_${Date.now()}`,
              type: 'footer',
              isEnabled: true,
              data: FooterSchema.defaultData
            }
          ]
        };
        return {
          activeProject: {
            ...state.activeProject,
            pages: [...state.activeProject.pages, newPage]
          },
          ui: { ...state.ui, activePageId: newPage.id, activeSectionId: newPage.sections[1].id }
        };
      }),

      deletePage: (pageId) => set((state) => {
        if (!state.activeProject) return state;
        // Prevent deleting the last page
        if (state.activeProject.pages.length <= 1) return state;

        const newPages = state.activeProject.pages.filter(p => p.id !== pageId);
        const newActivePageId = state.ui.activePageId === pageId ? newPages[0].id : state.ui.activePageId;

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages
          },
          ui: { ...state.ui, activePageId: newActivePageId }
        };
      }),

      updatePage: (pageId, updates) => set((state) => {
        if (!state.activeProject) return state;
        return {
          activeProject: {
            ...state.activeProject,
            pages: state.activeProject.pages.map(p => p.id === pageId ? { ...p, ...updates } : p)
          }
        };
      }),

      // --- Section Management (Scoped to Active Page) ---

      updateSection: (sectionId, data) => set((state) => {
        if (!state.activeProject || !state.ui.activePageId) return state;

        const activePage = state.activeProject.pages.find(p => p.id === state.ui.activePageId);
        if (!activePage) return state;

        const newSections = activePage.sections.map(section =>
          section.id === sectionId
            ? { ...section, data: { ...section.data, ...data } }
            : section
        );

        const newPages = state.activeProject.pages.map(p =>
          p.id === state.ui.activePageId ? { ...p, sections: newSections } : p
        );

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages
          }
        };
      }),

      addSection: (type) => set((state) => {
        if (!state.activeProject || !state.ui.activePageId) return state;

        const activePage = state.activeProject.pages.find(p => p.id === state.ui.activePageId);
        if (!activePage) return state;

        // Get default data from registry
        const schemas = getAllSchemas();
        const schema = schemas.find(s => s.id === `${type}-schema`) || schemas.find(s => s.category === type); // Fallback
        const defaultData = schema?.defaultData || {};

        const newSection: SectionConfig = {
          id: `${type}_${Date.now()}`,
          type,
          isEnabled: true,
          data: defaultData
        };

        // Insert before footer if exists
        const sections = [...activePage.sections];
        const footerIndex = sections.findIndex(s => s.type === 'footer');
        if (footerIndex !== -1) {
          sections.splice(footerIndex, 0, newSection);
        } else {
          sections.push(newSection);
        }

        const newPages = state.activeProject.pages.map(p =>
          p.id === state.ui.activePageId ? { ...p, sections } : p
        );

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages
          },
          ui: { ...state.ui, activeSectionId: newSection.id }
        };
      }),

      removeSection: (sectionId) => set((state) => {
        if (!state.activeProject || !state.ui.activePageId) return state;

        const newPages = state.activeProject.pages.map(p =>
          p.id === state.ui.activePageId
            ? { ...p, sections: p.sections.filter(s => s.id !== sectionId) }
            : p
        );

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages
          }
        };
      }),

      reorderSections: (startIndex, endIndex) => set((state) => {
        if (!state.activeProject || !state.ui.activePageId) return state;

        const activePage = state.activeProject.pages.find(p => p.id === state.ui.activePageId);
        if (!activePage) return state;

        const result = Array.from(activePage.sections);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        const newPages = state.activeProject.pages.map(p =>
          p.id === state.ui.activePageId ? { ...p, sections: result } : p
        );

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages
          }
        };
      }),

      toggleSection: (sectionId) => set((state) => {
        if (!state.activeProject || !state.ui.activePageId) return state;

        const activePage = state.activeProject.pages.find(p => p.id === state.ui.activePageId);
        if (!activePage) return state;

        const newSections = activePage.sections.map(section =>
          section.id === sectionId
            ? { ...section, isEnabled: !section.isEnabled }
            : section
        );

        const newPages = state.activeProject.pages.map(p =>
          p.id === state.ui.activePageId ? { ...p, sections: newSections } : p
        );

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages
          }
        };
      })
    }),
    {
      name: 'universal-builder-storage-v2',
      // Migration logic could go here in 'onRehydrateStorage' if needed for production
      // For now, we assume fresh start or compatible state
    }
  )
);