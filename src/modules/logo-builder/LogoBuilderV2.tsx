import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { BuilderLayout } from '../../ui/Layout';
import { LogoBuilderRedesigned } from './LogoBuilderRedesigned';
import { InteractiveLogoCanvas } from './InteractiveLogoCanvas';

interface LogoBuilderV2Props {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

export const LogoBuilderV2: React.FC<LogoBuilderV2Props> = ({ onSwitchBuilder }) => {
  const { activeProject, updateProject } = useAppStore();
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  console.log('LogoBuilderV2 rendered', { activeProject: !!activeProject });

  if (!activeProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-muted-foreground mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Nessun progetto attivo</h3>
          <p className="text-sm text-muted-foreground">
            Crea un nuovo progetto per iniziare a progettare il tuo logo
          </p>
        </div>
      </div>
    );
  }

  const logoConfig = activeProject.data.logo;
  const businessName = activeProject.data.business?.name || 'Restaurant Name';

  const handleElementUpdate = (elementId: string, updates: any) => {
    const currentElements = logoConfig.elements || [];
    const updatedElements = currentElements.map(element =>
      element.id === elementId
        ? { ...element, ...updates }
        : element
    );

    updateProject({
      logo: {
        ...logoConfig,
        elements: updatedElements
      }
    });
  };

  const handleElementSelect = (elementId: string | null) => {
    setSelectedElementId(elementId);
  };

  console.log('LogoBuilderV2 about to render BuilderLayout');

  return (
    <BuilderLayout
      hero={<div>Hero placeholder</div>}
      sidebar={
        <LogoBuilderRedesigned onSwitchBuilder={onSwitchBuilder} />
      }
      preview={
        <InteractiveLogoCanvas
          config={logoConfig}
          businessName={businessName}
          onElementUpdate={handleElementUpdate}
          onElementSelect={handleElementSelect}
          selectedElementId={selectedElementId}
        />
      }
      sidebarOpen={true}
      previewOpen={true}
    />
  );
};