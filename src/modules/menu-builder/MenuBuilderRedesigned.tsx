import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { Plus, Settings, List, Palette, Layout } from 'lucide-react';
import { UnifiedBuilderLayout, BuilderSection } from '../../components/UnifiedBuilderLayout';
import { MenuConfigSection } from './sections/MenuConfigSection';
import { MenuItemsSection } from './sections/MenuItemsSection';
import { MenuStyleSection } from './sections/MenuStyleSection';
import { MenuLayoutSection } from './sections/MenuLayoutSection';

interface MenuBuilderRedesignedProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

// Sezioni del Menu Builder seguendo lo stesso pattern
const MENU_SECTIONS: readonly BuilderSection[] = [
  // GESTIONE
  { id: 'config', label: 'Configurazione', icon: Settings, category: 'management', description: 'Impostazioni generali del menu' },
  { id: 'items', label: 'Elementi', icon: List, category: 'management', description: 'Gestisci piatti e bevande' },
  
  // ASPETTO
  { id: 'style', label: 'Stile', icon: Palette, category: 'appearance', description: 'Colori e tipografia' },
  { id: 'layout', label: 'Layout', icon: Layout, category: 'appearance', description: 'Struttura e visualizzazione' }
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

  const addItemAction = (
    <button
      onClick={handleAddItem}
      className="p-2 hover:bg-white/60 rounded-xl transition-all duration-200"
      title="Aggiungi elemento"
    >
      <Plus className="w-4 h-4 text-slate-600" />
    </button>
  );

  return (
    <UnifiedBuilderLayout
      builderType="menu"
      sections={MENU_SECTIONS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSwitchBuilder={onSwitchBuilder}
      extraHeaderActions={addItemAction}
    >
      {renderSectionEditor()}
    </UnifiedBuilderLayout>
  );
};