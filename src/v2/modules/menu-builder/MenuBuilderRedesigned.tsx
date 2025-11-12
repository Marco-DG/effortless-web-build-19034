import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { Eye, Plus, Settings, List, Palette, Layout } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MenuConfigSection } from './sections/MenuConfigSection';
import { MenuItemsSection } from './sections/MenuItemsSection';
import { MenuStyleSection } from './sections/MenuStyleSection';
import { MenuLayoutSection } from './sections/MenuLayoutSection';

interface MenuBuilderRedesignedProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

// Sezioni del Menu Builder seguendo lo stesso pattern
const MENU_SECTIONS = [
  // GESTIONE
  { id: 'config' as const, label: 'Configurazione', icon: Settings, category: 'management', description: 'Impostazioni generali del menu' },
  { id: 'items' as const, label: 'Elementi', icon: List, category: 'management', description: 'Gestisci piatti e bevande' },
  
  // ASPETTO
  { id: 'style' as const, label: 'Stile', icon: Palette, category: 'appearance', description: 'Colori e tipografia' },
  { id: 'layout' as const, label: 'Layout', icon: Layout, category: 'appearance', description: 'Struttura e visualizzazione' }
];

type MenuSectionId = typeof MENU_SECTIONS[number]['id'];

export const MenuBuilderRedesigned: React.FC<MenuBuilderRedesignedProps> = ({ 
  onSwitchBuilder 
}) => {
  const { activeProject, updateProject } = useAppStore();
  const [activeSection, setActiveSection] = useState<MenuSectionId>('config');

  if (!activeProject) return null;

  const menuConfig = activeProject.data.menu;

  const handleUpdateMenu = (updates: any) => {
    updateProject({
      menu: { ...menuConfig, ...updates }
    });
  };

  const handleAddItem = () => {
    const newItem = {
      id: `item_${Date.now()}`,
      name: 'Nuovo piatto',
      description: '',
      price: '€0,00',
      category: 'antipasti',
      available: true,
      featured: false
    };

    handleUpdateMenu({
      items: [...menuConfig.items, newItem]
    });
  };

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'config':
        return (
          <MenuConfigSection
            config={menuConfig}
            onUpdate={handleUpdateMenu}
          />
        );
      case 'items':
        return (
          <MenuItemsSection
            config={menuConfig}
            onUpdate={handleUpdateMenu}
            onAddItem={handleAddItem}
          />
        );
      case 'style':
        return (
          <MenuStyleSection
            config={menuConfig}
            onUpdate={handleUpdateMenu}
          />
        );
      case 'layout':
        return (
          <MenuLayoutSection
            config={menuConfig}
            onUpdate={handleUpdateMenu}
          />
        );
      default:
        return <div className="p-6 text-center text-muted-foreground">Sezione in sviluppo...</div>;
    }
  };

  return (
    <div className="h-full w-full lg:w-auto flex flex-col bg-white lg:rounded-l-2xl border-r border-border shadow-lg overflow-hidden">
      
      {/* Header con tab condivisa - identico agli altri builder */}
      {onSwitchBuilder && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white/80 backdrop-blur text-xs font-medium">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('logo')} 
              className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground"
            >
              Logo
            </button>
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('menu')} 
              className="px-3 py-1.5 rounded bg-muted text-foreground"
            >
              Menù
            </button>
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('site')} 
              className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground"
            >
              Sito Web
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              className="lg:hidden inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs font-medium"
            >
              <Eye className="w-3.5 h-3.5" /> Anteprima
            </button>
            <button
              onClick={handleAddItem}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Aggiungi elemento"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content - identico al SiteBuilder */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        
        {/* Sidebar Navigation - identica al SiteBuilder/LogoBuilder */}
        <div className="w-10 2xl:w-40 border-r border-border bg-white/50 backdrop-blur flex flex-col py-2 flex-shrink-0">
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-1">
              {(() => {
                const categories = [
                  { id: 'management', label: 'Gestione', sections: MENU_SECTIONS.filter(s => s.category === 'management') },
                  { id: 'appearance', label: 'Aspetto', sections: MENU_SECTIONS.filter(s => s.category === 'appearance') }
                ];

                return categories.map((category) => (
                  <div key={category.id} className="space-y-1">
                    {/* Divisore categoria - visibile solo su schermi larghi */}
                    <div className="hidden 2xl:flex items-center gap-2 px-2 py-2 mt-4 first:mt-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category.label}
                      </h3>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    
                    {/* Sezioni della categoria */}
                    {category.sections.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center justify-center 2xl:justify-start px-2 py-3 2xl:px-3 2xl:py-2.5 text-sm transition-all duration-200 rounded-lg group ${
                            isActive
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <section.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="hidden 2xl:block ml-3 text-left font-medium">
                            {section.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          </ScrollArea>
        </div>

        {/* Section Editor */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Section Header - identico al SiteBuilder */}
          <div className="px-6 py-4 border-b bg-white/80 backdrop-blur">
            <div className="flex items-center gap-3">
              {(() => {
                const currentSection = MENU_SECTIONS.find(s => s.id === activeSection);
                return currentSection && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <currentSection.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{currentSection.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentSection.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Section Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {renderSectionEditor()}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};