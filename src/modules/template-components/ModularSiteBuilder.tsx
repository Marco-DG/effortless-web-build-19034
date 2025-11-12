import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/app-store';
import { ComponentBuilder } from './ComponentBuilder';
import { ComponentEditor } from './ComponentEditor';
import { ComponentType, ComponentConfig } from './types';
import { COMPONENT_REGISTRY } from './component-registry';
import { 
  mapProjectToComponents, 
  mapComponentsToProject, 
  createDefaultComponentConfigs 
} from './data-adapter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../../ui/Button';
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react';

type ModularBuilderMode = 'components' | 'editor';

export const ModularSiteBuilder: React.FC = () => {
  const { activeProject, updateProject } = useAppStore();
  const [mode, setMode] = useState<ModularBuilderMode>('components');
  const [editingComponent, setEditingComponent] = useState<ComponentType | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<ComponentType[]>([]);
  const [componentConfigs, setComponentConfigs] = useState<Record<ComponentType, ComponentConfig>>({} as any);

  // Inizializza i componenti dai dati del progetto al primo caricamento
  useEffect(() => {
    if (activeProject && selectedComponents.length === 0) {
      const components = mapProjectToComponents(activeProject.data);
      const configs = createDefaultComponentConfigs(activeProject.data);
      
      setSelectedComponents(components);
      setComponentConfigs(configs);
    }
  }, [activeProject, selectedComponents.length]);

  if (!activeProject) return null;

  const handleUpdateComponents = (components: ComponentType[]) => {
    setSelectedComponents(components);
    
    // Sincronizza i dati con il progetto V2
    const projectUpdates = mapComponentsToProject(components, componentConfigs, activeProject.data);
    updateProject(projectUpdates);
  };

  const handleEditComponent = (componentType: ComponentType) => {
    // Assicurati che il componente abbia una configurazione
    if (!componentConfigs[componentType]) {
      setComponentConfigs(prev => ({
        ...prev,
        [componentType]: { ...COMPONENT_REGISTRY[componentType].config }
      }));
    }
    
    setEditingComponent(componentType);
    setMode('editor');
  };

  const handleUpdateComponentConfig = (componentType: ComponentType, config: ComponentConfig) => {
    // Aggiorna la configurazione locale
    setComponentConfigs(prev => ({
      ...prev,
      [componentType]: config
    }));
    
    // Sincronizza con il progetto V2
    const projectUpdates = mapComponentsToProject(selectedComponents, {
      ...componentConfigs,
      [componentType]: config
    }, activeProject.data);
    
    updateProject(projectUpdates);
  };

  const handleBackToComponents = () => {
    setMode('components');
    setEditingComponent(null);
  };

  return (
    <div className="h-full flex flex-col">
      {mode === 'components' ? (
        <ComponentBuilder
          selectedComponents={selectedComponents}
          onUpdateComponents={handleUpdateComponents}
          onEditComponent={handleEditComponent}
          templateType={activeProject.data.site.template}
        />
      ) : editingComponent ? (
        <ComponentEditor
          componentType={editingComponent}
          config={componentConfigs[editingComponent] || COMPONENT_REGISTRY[editingComponent].config}
          onUpdateConfig={(config) => handleUpdateComponentConfig(editingComponent, config)}
          onBack={handleBackToComponents}
        />
      ) : null}
    </div>
  );
};