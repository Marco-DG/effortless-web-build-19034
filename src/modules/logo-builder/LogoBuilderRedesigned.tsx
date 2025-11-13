import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { Palette, Layers, Settings } from 'lucide-react';
import { TemplateSection } from './sections/TemplateSection';
import { CanvasSection } from './sections/CanvasSection';
import { LayersSection } from './sections/LayersSection';
import { UnifiedBuilderLayout, BuilderSection } from '../../components/UnifiedBuilderLayout';

interface LogoBuilderRedesignedProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

// Sezioni del Logo Builder seguendo lo stesso pattern del SiteBuilder
const LOGO_SECTIONS: readonly BuilderSection[] = [
  // DESIGN
  { id: 'templates', label: 'Template', icon: Palette, category: 'design', description: 'Scegli un design base' },
  
  // CONTROLLI
  { id: 'layers', label: 'Livelli', icon: Layers, category: 'controls', description: 'Gestisci elementi e livelli' },
  { id: 'canvas', label: 'Canvas', icon: Settings, category: 'controls', description: 'Impostazioni canvas' }
];

type LogoSectionId = typeof LOGO_SECTIONS[number]['id'];

export const LogoBuilderRedesigned: React.FC<LogoBuilderRedesignedProps> = ({ 
  onSwitchBuilder 
}) => {
  const { activeProject, updateProject, closeSidebar } = useAppStore();
  const [activeSection, setActiveSection] = useState<LogoSectionId>('templates');

  
  if (!activeProject) return null;

  const logoConfig = activeProject.data.logo;

  const handleUpdateLogo = (updates: any) => {
    updateProject({
      logo: { ...logoConfig, ...updates }
    });
  };

  const handleExport = () => {
    console.log('Export logo:', logoConfig);
    // TODO: Implementare export
  };

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'templates':
        return (
          <TemplateSection
            logoConfig={logoConfig}
            onUpdateLogo={handleUpdateLogo}
          />
        );
      case 'layers':
        return (
          <LayersSection
            logoConfig={logoConfig}
            onUpdateLogo={handleUpdateLogo}
          />
        );
      case 'canvas':
        return (
          <CanvasSection
            logoConfig={logoConfig}
            onUpdateLogo={handleUpdateLogo}
          />
        );
      default:
        return <div className="p-6 text-center text-muted-foreground">Sezione in sviluppo...</div>;
    }
  };


  return (
    <UnifiedBuilderLayout
      builderType="logo"
      sections={LOGO_SECTIONS}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onSwitchBuilder={onSwitchBuilder}
      onExport={handleExport}
    >
      {renderSectionEditor()}
    </UnifiedBuilderLayout>
  );
};