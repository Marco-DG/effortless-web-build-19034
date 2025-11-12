// Adattatore per sincronizzare dati V2 con sistema modulare

import { ComponentType, ComponentConfig } from './types';
import { COMPONENT_REGISTRY } from './component-registry';

export interface ProjectData {
  business: any;
  contact: any;
  hours: any;
  logo: any;
  menu: any;
  site: any;
  gallery: any;
  reviews: any;
  events: any;
}

// Converte i dati del progetto V2 in componenti modulari
export const mapProjectToComponents = (projectData: ProjectData): ComponentType[] => {
  const components: ComponentType[] = [];
  
  // Componenti sempre presenti (required)
  components.push('logo', 'brand-colors', 'typography', 'header', 'navigation', 'seo-meta');
  
  // Hero sempre presente
  components.push('hero');
  
  // Menu se ha elementi
  if (projectData.menu?.items?.length > 0) {
    components.push('menu');
    
    // Featured dishes se ci sono piatti in evidenza
    if (projectData.menu.items.some((item: any) => item.featured)) {
      components.push('featured-dishes');
    }
  }
  
  // About se abilitato nelle sezioni
  const aboutSection = projectData.site?.sections?.find((s: any) => s.type === 'about');
  if (aboutSection?.enabled) {
    components.push('about');
  }
  
  // Gallery se ha immagini
  if (projectData.gallery?.length > 0) {
    components.push('gallery');
  }
  
  // Reviews se ha recensioni
  if (projectData.reviews?.length > 0) {
    components.push('reviews');
  }
  
  // Events se ha eventi
  if (projectData.events?.length > 0) {
    components.push('events');
  }
  
  // Contact sempre presente
  components.push('contact-form');
  
  // Hours sempre presente
  components.push('hours');
  
  // Location se ha indirizzo
  if (projectData.contact?.address) {
    components.push('location');
  }
  
  // Footer sempre presente
  components.push('footer');
  
  return components;
};

// Converte i componenti modulari in aggiornamenti per il progetto V2
export const mapComponentsToProject = (
  components: ComponentType[], 
  componentConfigs: Record<ComponentType, ComponentConfig>,
  currentProject: ProjectData
): Partial<ProjectData> => {
  const updates: Partial<ProjectData> = {};
  
  // Aggiorna le sezioni del sito basandosi sui componenti attivi
  const sections = components
    .filter(comp => !['logo', 'brand-colors', 'typography', 'seo-meta'].includes(comp))
    .map((comp, index) => ({
      id: `${comp}_component`,
      type: mapComponentToSectionType(comp),
      enabled: true,
      order: index,
      data: componentConfigs[comp]?.content || {}
    }));
  
  updates.site = {
    ...currentProject.site,
    sections,
    components: components.map((type, index) => ({
      type,
      config: componentConfigs[type] || COMPONENT_REGISTRY[type]?.config,
      enabled: true,
      order: index
    }))
  };
  
  // Aggiorna configurazioni specifiche
  if (components.includes('logo') && componentConfigs.logo) {
    updates.logo = {
      ...currentProject.logo,
      ...extractLogoConfig(componentConfigs.logo)
    };
  }
  
  if (components.includes('brand-colors') && componentConfigs['brand-colors']) {
    updates.site = {
      ...updates.site,
      theme: {
        ...currentProject.site?.theme,
        colors: extractColorConfig(componentConfigs['brand-colors'])
      }
    };
  }
  
  if (components.includes('typography') && componentConfigs.typography) {
    updates.site = {
      ...updates.site,
      theme: {
        ...updates.site?.theme,
        fonts: extractTypographyConfig(componentConfigs.typography)
      }
    };
  }
  
  return updates;
};

// Mappa i ComponentType ai SectionType del vecchio sistema
const mapComponentToSectionType = (component: ComponentType): string => {
  const mapping: Record<ComponentType, string> = {
    'hero': 'hero',
    'about': 'about', 
    'menu': 'menu',
    'featured-dishes': 'menu',
    'gallery': 'gallery',
    'reviews': 'reviews',
    'events': 'events',
    'contact-form': 'contact',
    'hours': 'hours',
    'location': 'contact',
    'footer': 'footer',
    'header': 'header',
    'navigation': 'navigation',
    // Altri mapping...
    'wine-list': 'menu',
    'delivery': 'contact',
    'reservation-form': 'contact'
  } as any;
  
  return mapping[component] || component;
};

// Estrae la configurazione logo dal component config
const extractLogoConfig = (config: ComponentConfig) => ({
  text: config.content?.title || '',
  font: config.content?.customFields?.font || 'Playfair Display',
  size: config.content?.customFields?.size || 48,
  color: config.style?.textColor || '#8B4513',
  mode: config.content?.customFields?.mode || 'text'
});

// Estrae i colori dal component config
const extractColorConfig = (config: ComponentConfig) => ({
  primary: config.content?.customFields?.primary || '#8B4513',
  secondary: config.content?.customFields?.secondary || '#D2691E', 
  accent: config.content?.customFields?.accent || '#F4E4C1',
  background: config.style?.background || '#ffffff',
  text: config.style?.textColor || '#000000'
});

// Estrae la tipografia dal component config
const extractTypographyConfig = (config: ComponentConfig) => ({
  heading: {
    family: config.content?.customFields?.heading || 'Playfair Display',
    weights: [400, 700],
    fallback: ['Georgia', 'serif'],
    source: 'google'
  },
  body: {
    family: config.content?.customFields?.body || 'Inter',
    weights: [400, 500, 600],
    fallback: ['-apple-system', 'sans-serif'], 
    source: 'google'
  },
  accent: {
    family: config.content?.customFields?.accent || 'Dancing Script',
    weights: [400, 700],
    fallback: ['cursive'],
    source: 'google'
  }
});

// Crea configurazioni di default per i componenti basandosi sui dati progetto
export const createDefaultComponentConfigs = (projectData: ProjectData): Record<ComponentType, ComponentConfig> => {
  const configs: Record<ComponentType, ComponentConfig> = {} as any;
  
  // Logo config da dati esistenti
  configs.logo = {
    ...COMPONENT_REGISTRY.logo.config,
    content: {
      ...COMPONENT_REGISTRY.logo.config.content,
      title: projectData.logo?.text || projectData.business?.name || '',
      customFields: {
        font: projectData.logo?.font || 'Playfair Display',
        size: projectData.logo?.size || 48,
        mode: projectData.logo?.mode || 'text'
      }
    },
    style: {
      ...COMPONENT_REGISTRY.logo.config.style,
      textColor: projectData.logo?.color || '#8B4513'
    }
  };
  
  // Brand colors da theme esistente
  configs['brand-colors'] = {
    ...COMPONENT_REGISTRY['brand-colors'].config,
    content: {
      ...COMPONENT_REGISTRY['brand-colors'].config.content,
      customFields: {
        primary: projectData.site?.theme?.colors?.primary || '#8B4513',
        secondary: projectData.site?.theme?.colors?.secondary || '#D2691E',
        accent: projectData.site?.theme?.colors?.accent || '#F4E4C1'
      }
    }
  };
  
  // Typography da fonts esistenti
  configs.typography = {
    ...COMPONENT_REGISTRY.typography.config,
    content: {
      ...COMPONENT_REGISTRY.typography.config.content,
      customFields: {
        heading: projectData.site?.theme?.fonts?.heading?.family || 'Playfair Display',
        body: projectData.site?.theme?.fonts?.body?.family || 'Inter',
        accent: projectData.site?.theme?.fonts?.accent?.family || 'Dancing Script'
      }
    }
  };
  
  // Hero da dati business
  configs.hero = {
    ...COMPONENT_REGISTRY.hero.config,
    content: {
      ...COMPONENT_REGISTRY.hero.config.content,
      title: projectData.business?.name || '',
      subtitle: projectData.business?.tagline || '',
      description: projectData.business?.description || ''
    }
  };
  
  // Menu da dati menu esistenti
  if (projectData.menu?.items?.length > 0) {
    configs.menu = {
      ...COMPONENT_REGISTRY.menu.config,
      content: {
        ...COMPONENT_REGISTRY.menu.config.content,
        title: projectData.menu?.title || 'Il Nostro Menu',
        customFields: {
          items: projectData.menu.items,
          layout: projectData.menu?.layout || 'categories',
          showImages: projectData.menu?.showImages !== false,
          showPrices: projectData.menu?.showPrices !== false
        }
      }
    };
  }
  
  // Popola gli altri componenti con configurazioni di default
  Object.keys(COMPONENT_REGISTRY).forEach(key => {
    const componentType = key as ComponentType;
    if (!configs[componentType]) {
      configs[componentType] = { ...COMPONENT_REGISTRY[componentType].config };
    }
  });
  
  return configs;
};