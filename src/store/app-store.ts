import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SiteConfig, SectionConfig } from '../modules/core/builder/types';
import { HeroSchema } from '../modules/core/components/Hero';
import { GridSchema } from '../modules/core/components/Grid';

// --- Types ---

interface AppState {
  activeMode: 'site' | 'logo' | 'menu';
  isBuilding: boolean;
  activeProject: SiteConfig | null;
  ui: {
    sidebarOpen: boolean;
    previewOpen: boolean;
    activeSectionId: string | null;
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

  // Project
  createProject: (name: string) => void;
  updateProject: (updates: Partial<SiteConfig>) => void;
  updateSection: (sectionId: string, data: any) => void;
  addSection: (type: string) => void;
  removeSection: (sectionId: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
}

type AppStore = AppState & AppActions;

// --- Defaults ---

const createDefaultProject = (name: string): SiteConfig => ({
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
  sections: [
    {
      id: 'hero_1',
      type: 'hero',
      isEnabled: true,
      data: HeroSchema.defaultData
    },
    {
      id: 'features_1',
      type: 'grid',
      isEnabled: true,
      data: GridSchema.defaultData
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
    type: 'restaurant'
  }
});

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
        activeSectionId: 'hero_1'
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

      createProject: (name) => set({
        activeProject: createDefaultProject(name),
        isBuilding: true
      }),

      updateProject: (updates) => set((state) => {
        if (!state.activeProject) return state;
        return {
          activeProject: { ...state.activeProject, ...updates }
        };
      }),

      updateSection: (sectionId, data) => set((state) => {
        if (!state.activeProject) return state;

        const newSections = state.activeProject.sections.map(section =>
          section.id === sectionId
            ? { ...section, data: { ...section.data, ...data } }
            : section
        );

        return {
          activeProject: {
            ...state.activeProject,
            sections: newSections
          }
        };
      }),

      addSection: (type) => set((state) => {
        if (!state.activeProject) return state;

        // Determine default data based on type (simplified)
        let defaultData = {};
        if (type === 'hero') defaultData = HeroSchema.defaultData;
        if (type === 'grid') defaultData = GridSchema.defaultData;

        const newSection: SectionConfig = {
          id: `${type}_${Date.now()}`,
          type,
          isEnabled: true,
          data: defaultData
        };

        return {
          activeProject: {
            ...state.activeProject,
            sections: [...state.activeProject.sections, newSection]
          },
          ui: { ...state.ui, activeSectionId: newSection.id }
        };
      }),

      removeSection: (sectionId) => set((state) => {
        if (!state.activeProject) return state;
        return {
          activeProject: {
            ...state.activeProject,
            sections: state.activeProject.sections.filter(s => s.id !== sectionId)
          }
        };
      }),

      reorderSections: (startIndex, endIndex) => set((state) => {
        if (!state.activeProject) return state;
        const result = Array.from(state.activeProject.sections);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return {
          activeProject: {
            ...state.activeProject,
            sections: result
          }
        };
      })
    }),
    {
      name: 'universal-builder-storage'
    }
  )
);