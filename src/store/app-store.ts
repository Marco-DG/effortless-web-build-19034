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
import i18n from '../i18n';

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
  addSection: (type: string, index?: number) => void;
  deleteSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  toggleSection: (sectionId: string) => void;
  translateDefaults: (lang: string) => void;
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
      description: i18n.t('defaults.project.description', { defaultValue: 'Created with Universal Builder' })
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
            data: {
              ...HeaderSchema.defaultData,
              logoText: i18n.t('defaults.header.logoText', { defaultValue: HeaderSchema.defaultData.logoText }),
              ctaText: i18n.t('defaults.header.ctaText', { defaultValue: HeaderSchema.defaultData.ctaText }),
              links: [
                { label: i18n.t('defaults.header.links.home', { defaultValue: 'Home' }), href: '#' },
                { label: i18n.t('defaults.header.links.menu', { defaultValue: 'Menu' }), href: '#menu' },
                { label: i18n.t('defaults.header.links.events', { defaultValue: 'Events' }), href: '#events' },
                { label: i18n.t('defaults.header.links.contact', { defaultValue: 'Contact' }), href: '#contact' }
              ]
            }
          },
          {
            id: 'hero_1',
            type: 'hero',
            isEnabled: true,
            data: {
              ...HeroSchema.defaultData,
              title: i18n.t('defaults.hero.title', { defaultValue: HeroSchema.defaultData.title }),
              subtitle: i18n.t('defaults.hero.subtitle', { defaultValue: HeroSchema.defaultData.subtitle }),
              ctaText: i18n.t('defaults.hero.ctaText', { defaultValue: HeroSchema.defaultData.ctaText })
            }
          },
          {
            id: 'features_1',
            type: 'features',
            isEnabled: true,
            data: {
              ...FeaturesSchema.defaultData,
              title: i18n.t('defaults.features.title', { defaultValue: FeaturesSchema.defaultData.title }),
              subtitle: i18n.t('defaults.features.subtitle', { defaultValue: FeaturesSchema.defaultData.subtitle })
            }
          },
          {
            id: 'menu_1',
            type: 'menu',
            isEnabled: true,
            data: {
              ...MenuSchema.defaultData,
              title: i18n.t('defaults.menu.title', { defaultValue: MenuSchema.defaultData.title }),
              subtitle: i18n.t('defaults.menu.subtitle', { defaultValue: MenuSchema.defaultData.subtitle })
            }
          },
          {
            id: 'gallery_1',
            type: 'gallery',
            isEnabled: true,
            data: {
              ...GallerySchema.defaultData,
              title: i18n.t('defaults.gallery.title', { defaultValue: GallerySchema.defaultData.title }),
              subtitle: i18n.t('defaults.gallery.subtitle', { defaultValue: GallerySchema.defaultData.subtitle })
            }
          },
          {
            id: 'testimonials_1',
            type: 'testimonials',
            isEnabled: true,
            data: {
              ...TestimonialsSchema.defaultData,
              title: i18n.t('defaults.testimonials.title', { defaultValue: TestimonialsSchema.defaultData.title }),
              subtitle: i18n.t('defaults.testimonials.subtitle', { defaultValue: TestimonialsSchema.defaultData.subtitle })
            }
          },
          {
            id: 'content_1',
            type: 'content',
            isEnabled: true,
            data: {
              ...ContentSchema.defaultData,
              title: i18n.t('defaults.content.title', { defaultValue: ContentSchema.defaultData.title }),
              subtitle: i18n.t('defaults.content.subtitle', { defaultValue: ContentSchema.defaultData.subtitle }),
              text: i18n.t('defaults.content.text', { defaultValue: ContentSchema.defaultData.text }),
              ctaText: i18n.t('defaults.content.ctaText', { defaultValue: ContentSchema.defaultData.ctaText })
            }
          },
          {
            id: 'grid_1',
            type: 'grid',
            isEnabled: true,
            data: {
              ...GridSchema.defaultData,
              title: i18n.t('defaults.grid.title', { defaultValue: GridSchema.defaultData.title }),
              subtitle: i18n.t('defaults.grid.subtitle', { defaultValue: GridSchema.defaultData.subtitle })
            }
          },
          {
            id: 'awards_1',
            type: 'awards',
            isEnabled: true,
            data: {
              ...AwardsSchema.defaultData,
              title: i18n.t('defaults.awards.title', { defaultValue: AwardsSchema.defaultData.title })
            }
          },
          {
            id: 'contact_1',
            type: 'contact',
            isEnabled: true,
            data: {
              ...ContactSchema.defaultData,
              title: i18n.t('defaults.contact.title', { defaultValue: ContactSchema.defaultData.title })
            }
          },
          {
            id: 'reservation_1',
            type: 'reservation',
            isEnabled: true,
            data: {
              ...ReservationSchema.defaultData,
              title: i18n.t('defaults.reservation.title', { defaultValue: ReservationSchema.defaultData.title }),
              description: i18n.t('defaults.reservation.description', { defaultValue: ReservationSchema.defaultData.description }),
              buttonText: i18n.t('defaults.reservation.buttonText', { defaultValue: ReservationSchema.defaultData.buttonText })
            }
          },
          {
            id: 'footer_1',
            type: 'footer',
            isEnabled: true,
            data: {
              ...FooterSchema.defaultData,
              copyrightText: i18n.t('defaults.footer.copyrightText', { defaultValue: FooterSchema.defaultData.copyrightText }),
              links: [
                { label: i18n.t('defaults.footer.links.privacy', { defaultValue: 'Privacy Policy' }), href: '#' },
                { label: i18n.t('defaults.footer.links.terms', { defaultValue: 'Terms of Service' }), href: '#' },
                { label: i18n.t('defaults.footer.links.cookie', { defaultValue: 'Cookie Policy' }), href: '#' }
              ]
            }
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
      title: i18n.t('defaults.menu.title', { defaultValue: 'Our Menu' }),
      items: []
    },
    // Default business info
    business: {
      name: name,
      tagline: i18n.t('defaults.business.tagline', { defaultValue: 'Fine Dining Experience' }),
      description: i18n.t('defaults.business.description', { defaultValue: 'A culinary journey through tradition and innovation.' }),
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

      addSection: (type, index) => set((state) => {
        if (!state.activeProject || !state.ui.activePageId) return state;

        const activePage = state.activeProject.pages.find(p => p.id === state.ui.activePageId);
        if (!activePage) return state;

        // Get default data from registry
        const schemas = getAllSchemas();
        const schema = schemas.find(s => s.id === `${type}-schema`) || schemas.find(s => s.category === type); // Fallback
        let defaultData = schema?.defaultData || {};

        // Apply translations for known types
        if (type === 'hero') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.hero.title', { defaultValue: defaultData.title }),
            subtitle: i18n.t('defaults.hero.subtitle', { defaultValue: defaultData.subtitle }),
            ctaText: i18n.t('defaults.hero.ctaText', { defaultValue: defaultData.ctaText })
          };
        } else if (type === 'features') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.features.title', { defaultValue: defaultData.title }),
            subtitle: i18n.t('defaults.features.subtitle', { defaultValue: defaultData.subtitle })
          };
        } else if (type === 'testimonials') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.testimonials.title', { defaultValue: defaultData.title }),
            subtitle: i18n.t('defaults.testimonials.subtitle', { defaultValue: defaultData.subtitle })
          };
        } else if (type === 'contact') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.contact.title', { defaultValue: defaultData.title })
          };
        } else if (type === 'header') {
          defaultData = {
            ...defaultData,
            logoText: i18n.t('defaults.header.logoText', { defaultValue: defaultData.logoText }),
            ctaText: i18n.t('defaults.header.ctaText', { defaultValue: defaultData.ctaText }),
            links: [
              { label: i18n.t('defaults.header.links.home', { defaultValue: 'Home' }), href: '#' },
              { label: i18n.t('defaults.header.links.menu', { defaultValue: 'Menu' }), href: '#menu' },
              { label: i18n.t('defaults.header.links.events', { defaultValue: 'Events' }), href: '#events' },
              { label: i18n.t('defaults.header.links.contact', { defaultValue: 'Contact' }), href: '#contact' }
            ]
          };
        } else if (type === 'footer') {
          defaultData = {
            ...defaultData,
            copyrightText: i18n.t('defaults.footer.copyrightText', { defaultValue: defaultData.copyrightText }),
            links: [
              { label: i18n.t('defaults.footer.links.privacy', { defaultValue: 'Privacy Policy' }), href: '#' },
              { label: i18n.t('defaults.footer.links.terms', { defaultValue: 'Terms of Service' }), href: '#' },
              { label: i18n.t('defaults.footer.links.cookie', { defaultValue: 'Cookie Policy' }), href: '#' }
            ]
          };
        } else if (type === 'menu') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.menu.title', { defaultValue: defaultData.title }),
            subtitle: i18n.t('defaults.menu.subtitle', { defaultValue: defaultData.subtitle })
          };
        } else if (type === 'gallery') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.gallery.title', { defaultValue: defaultData.title }),
            subtitle: i18n.t('defaults.gallery.subtitle', { defaultValue: defaultData.subtitle })
          };
        } else if (type === 'reservation') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.reservation.title', { defaultValue: defaultData.title }),
            description: i18n.t('defaults.reservation.description', { defaultValue: defaultData.description }),
            buttonText: i18n.t('defaults.reservation.buttonText', { defaultValue: defaultData.buttonText })
          };
        } else if (type === 'content') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.content.title', { defaultValue: defaultData.title }),
            subtitle: i18n.t('defaults.content.subtitle', { defaultValue: defaultData.subtitle }),
            text: i18n.t('defaults.content.text', { defaultValue: defaultData.text }),
            ctaText: i18n.t('defaults.content.ctaText', { defaultValue: defaultData.ctaText })
          };
        } else if (type === 'awards') {
          defaultData = {
            ...defaultData,
            title: i18n.t('defaults.awards.title', { defaultValue: defaultData.title })
          };
        }

        const newSection: SectionConfig = {
          id: `${type}_${Date.now()}`,
          type,
          isEnabled: true,
          data: defaultData
        };

        const sections = [...activePage.sections];

        if (typeof index === 'number' && index >= 0) {
          // Insert at specific index
          sections.splice(index, 0, newSection);
        } else {
          // Default behavior: Insert before footer if exists, else append
          const footerIndex = sections.findIndex(s => s.type === 'footer');
          if (footerIndex !== -1) {
            sections.splice(footerIndex, 0, newSection);
          } else {
            sections.push(newSection);
          }
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

      deleteSection: (sectionId) => set((state) => {
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

      duplicateSection: (sectionId) => set((state) => {
        if (!state.activeProject || !state.ui.activePageId) return state;

        const activePage = state.activeProject.pages.find(p => p.id === state.ui.activePageId);
        if (!activePage) return state;

        const sectionIndex = activePage.sections.findIndex(s => s.id === sectionId);
        if (sectionIndex === -1) return state;

        const originalSection = activePage.sections[sectionIndex];
        const newSection: SectionConfig = {
          ...originalSection,
          id: `${originalSection.type}_${Date.now()}`, // New ID
          data: JSON.parse(JSON.stringify(originalSection.data)) // Deep copy data
        };

        const newSections = [...activePage.sections];
        newSections.splice(sectionIndex + 1, 0, newSection); // Insert after original

        const newPages = state.activeProject.pages.map(p =>
          p.id === state.ui.activePageId ? { ...p, sections: newSections } : p
        );

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages
          },
          ui: { ...state.ui, activeSectionId: newSection.id }
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
      }),
      translateDefaults: (lang) => set((state) => {
        if (!state.activeProject) return state;

        // Helper to check if a value matches any known default for a key
        const matchesAnyDefault = (currentValue: string, key: string) => {
          const enDefault = i18n.t(key, { lng: 'en' });
          const itDefault = i18n.t(key, { lng: 'it' });
          // Also check against schema default just in case
          // We can't easily access schema default here without type, but we can rely on i18n keys
          return currentValue === enDefault || currentValue === itDefault;
        };

        const newPages = state.activeProject.pages.map(page => ({
          ...page,
          sections: page.sections.map(section => {
            let newData = { ...section.data };
            let hasChanges = false;

            if (section.type === 'hero') {
              if (matchesAnyDefault(section.data.title, 'defaults.hero.title')) {
                newData.title = i18n.t('defaults.hero.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.subtitle, 'defaults.hero.subtitle')) {
                newData.subtitle = i18n.t('defaults.hero.subtitle', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.ctaText, 'defaults.hero.ctaText')) {
                newData.ctaText = i18n.t('defaults.hero.ctaText', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'features') {
              if (matchesAnyDefault(section.data.title, 'defaults.features.title')) {
                newData.title = i18n.t('defaults.features.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.subtitle, 'defaults.features.subtitle')) {
                newData.subtitle = i18n.t('defaults.features.subtitle', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'testimonials') {
              if (matchesAnyDefault(section.data.title, 'defaults.testimonials.title')) {
                newData.title = i18n.t('defaults.testimonials.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.subtitle, 'defaults.testimonials.subtitle')) {
                newData.subtitle = i18n.t('defaults.testimonials.subtitle', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'contact') {
              if (matchesAnyDefault(section.data.title, 'defaults.contact.title')) {
                newData.title = i18n.t('defaults.contact.title', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'header') {
              if (matchesAnyDefault(section.data.logoText, 'defaults.header.logoText')) {
                newData.logoText = i18n.t('defaults.header.logoText', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.ctaText, 'defaults.header.ctaText')) {
                newData.ctaText = i18n.t('defaults.header.ctaText', { lng: lang });
                hasChanges = true;
              }
              // Translate links if they match defaults
              if (section.data.links) {
                const defaultLinks = [
                  { key: 'home', label: 'defaults.header.links.home' },
                  { key: 'menu', label: 'defaults.header.links.menu' },
                  { key: 'events', label: 'defaults.header.links.events' },
                  { key: 'contact', label: 'defaults.header.links.contact' }
                ];
                const newLinks = section.data.links.map((link: any) => {
                  const defaultLink = defaultLinks.find(dl => matchesAnyDefault(link.label, dl.label));
                  if (defaultLink) {
                    hasChanges = true;
                    return { ...link, label: i18n.t(defaultLink.label, { lng: lang }) };
                  }
                  return link;
                });
                if (hasChanges) newData.links = newLinks;
              }
            } else if (section.type === 'footer') {
              if (matchesAnyDefault(section.data.copyrightText, 'defaults.footer.copyrightText')) {
                newData.copyrightText = i18n.t('defaults.footer.copyrightText', { lng: lang });
                hasChanges = true;
              }
              if (section.data.links) {
                const defaultLinks = [
                  { key: 'privacy', label: 'defaults.footer.links.privacy' },
                  { key: 'terms', label: 'defaults.footer.links.terms' },
                  { key: 'cookie', label: 'defaults.footer.links.cookie' }
                ];
                const newLinks = section.data.links.map((link: any) => {
                  const defaultLink = defaultLinks.find(dl => matchesAnyDefault(link.label, dl.label));
                  if (defaultLink) {
                    hasChanges = true;
                    return { ...link, label: i18n.t(defaultLink.label, { lng: lang }) };
                  }
                  return link;
                });
                if (hasChanges) newData.links = newLinks;
              }
            } else if (section.type === 'menu') {
              if (matchesAnyDefault(section.data.title, 'defaults.menu.title')) {
                newData.title = i18n.t('defaults.menu.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.subtitle, 'defaults.menu.subtitle')) {
                newData.subtitle = i18n.t('defaults.menu.subtitle', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'gallery') {
              if (matchesAnyDefault(section.data.title, 'defaults.gallery.title')) {
                newData.title = i18n.t('defaults.gallery.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.subtitle, 'defaults.gallery.subtitle')) {
                newData.subtitle = i18n.t('defaults.gallery.subtitle', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'reservation') {
              if (matchesAnyDefault(section.data.title, 'defaults.reservation.title')) {
                newData.title = i18n.t('defaults.reservation.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.description, 'defaults.reservation.description')) {
                newData.description = i18n.t('defaults.reservation.description', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.buttonText, 'defaults.reservation.buttonText')) {
                newData.buttonText = i18n.t('defaults.reservation.buttonText', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'content') {
              if (matchesAnyDefault(section.data.title, 'defaults.content.title')) {
                newData.title = i18n.t('defaults.content.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.subtitle, 'defaults.content.subtitle')) {
                newData.subtitle = i18n.t('defaults.content.subtitle', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.text, 'defaults.content.text')) {
                newData.text = i18n.t('defaults.content.text', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.ctaText, 'defaults.content.ctaText')) {
                newData.ctaText = i18n.t('defaults.content.ctaText', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'awards') {
              if (matchesAnyDefault(section.data.title, 'defaults.awards.title')) {
                newData.title = i18n.t('defaults.awards.title', { lng: lang });
                hasChanges = true;
              }
            } else if (section.type === 'grid') {
              if (matchesAnyDefault(section.data.title, 'defaults.grid.title')) {
                newData.title = i18n.t('defaults.grid.title', { lng: lang });
                hasChanges = true;
              }
              if (matchesAnyDefault(section.data.subtitle, 'defaults.grid.subtitle')) {
                newData.subtitle = i18n.t('defaults.grid.subtitle', { lng: lang });
                hasChanges = true;
              }
            }

            return hasChanges ? { ...section, data: newData } : section;
          })
        }));

        // Also translate project metadata if it matches default
        let newMetadata = { ...state.activeProject.metadata };
        if (matchesAnyDefault(state.activeProject.metadata.description || '', 'defaults.project.description')) {
          newMetadata.description = i18n.t('defaults.project.description', { lng: lang });
        }

        // Translate business info
        let newBusiness = { ...state.activeProject.business };
        if (matchesAnyDefault(state.activeProject.business?.tagline || '', 'defaults.business.tagline')) {
          newBusiness.tagline = i18n.t('defaults.business.tagline', { lng: lang });
        }
        if (matchesAnyDefault(state.activeProject.business?.description || '', 'defaults.business.description')) {
          newBusiness.description = i18n.t('defaults.business.description', { lng: lang });
        }

        return {
          activeProject: {
            ...state.activeProject,
            pages: newPages,
            metadata: newMetadata,
            business: newBusiness
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