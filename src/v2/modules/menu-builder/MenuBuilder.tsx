import React from 'react';
import { useAppStore } from '../../store/app-store';
import { MenuPreview } from './MenuPreview';
import { MenuControls } from './MenuControls';
import { SidebarLayout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
import { X, Download, Save, Plus } from 'lucide-react';

export const MenuBuilder: React.FC = () => {
  const { activeProject, updateProject, closeSidebar } = useAppStore();
  
  if (!activeProject) return null;

  const menuData = activeProject.data.menu;

  const handleUpdateMenu = (updates: any) => {
    updateProject({
      menu: { ...menuData, ...updates }
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
      items: [...menuData.items, newItem]
    });
  };

  const header = (
    <div className="flex items-center justify-between p-4">
      <div>
        <h2 className="text-lg font-semibold">Menu Builder</h2>
        <p className="text-sm text-muted-foreground">
          Gestisci il menu di {activeProject.data.business.name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleAddItem}
        >
          Aggiungi
        </Button>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={() => console.log('Save menu')}
        >
          Salva
        </Button>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<X className="w-4 h-4" />}
          onClick={closeSidebar}
          className="lg:hidden"
        >
          Chiudi
        </Button>
      </div>
    </div>
  );

  const navigation = (
    <div className="p-2 space-y-1">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
        <span className="text-primary font-semibold text-sm">M</span>
      </div>
    </div>
  );

  const content = (
    <div className="p-6">
      <MenuControls 
        config={menuData}
        onUpdate={handleUpdateMenu}
      />
    </div>
  );

  return (
    <SidebarLayout
      header={header}
      navigation={navigation}
      content={content}
    />
  );
};