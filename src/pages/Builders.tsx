import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/app-store';
import { AppLayout, BuilderLayout, PreviewLayout } from '../ui/Layout';
import { LogoBuilderRedesigned, InteractiveLogoCanvas } from '../modules/logo-builder';
import { MenuBuilderRedesigned } from '../modules/menu-builder/MenuBuilderRedesigned';
import { MenuPreview } from '../modules/menu-builder/MenuPreview';
import { SiteBuilder } from '../modules/site-builder/SiteBuilder';
import { SitePreview } from '../modules/site-builder/SitePreview';

const Builders: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeMode,
    activeProject,
    ui,
    openSidebar,
    closeSidebar,
    closePreview,
    updateProject,
    createProject,
    startBuilding
  } = useAppStore();

  // Se non c'è un progetto attivo al refresh, crea un progetto di default
  useEffect(() => {
    if (!activeProject) {
      createProject('Nuovo Progetto', 'wine-bar');
      startBuilding('site'); // Imposta modalità di default
      // Assicurati che la sidebar sia aperta
      if (!ui.sidebarOpen) {
        openSidebar();
      }
    }
  }, [activeProject, createProject, startBuilding, ui.sidebarOpen, openSidebar]);

  const renderSidebar = () => {
    if (!activeProject) return null;

    switch (activeMode) {
      case 'logo':
        return <LogoBuilderRedesigned onSwitchBuilder={(mode) => useAppStore.getState().setActiveMode(mode)} />;
      case 'menu':
        return <MenuBuilderRedesigned onSwitchBuilder={(mode) => useAppStore.getState().setActiveMode(mode)} />;
      case 'site':
        return <SiteBuilder />;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    if (!activeProject) {
      return (
        <PreviewLayout mode="site">
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-100/80 to-slate-200/60 rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 font-geist tracking-[-0.01em]">
                Caricamento progetto...
              </h3>
              <p className="text-slate-600 font-medium font-geist tracking-[-0.01em]">
                Inizializzazione dell'area di lavoro
              </p>
            </div>
          </div>
        </PreviewLayout>
      );
    }

    const project = activeProject;

    switch (activeMode) {
      case 'logo':
        return (
          <InteractiveLogoCanvas
            config={project.data.logo}
            businessName={project.data.business.name}
            onElementUpdate={(elementId, updates) => {
              const currentElements = project.data.logo.elements || [];
              const updatedElements = currentElements.map(element =>
                element.id === elementId ? { ...element, ...updates } : element
              );
              updateProject({
                logo: { ...project.data.logo, elements: updatedElements }
              });
            }}
            onElementSelect={() => {}}
            selectedElementId={null}
          />
        );
      case 'menu':
        return (
          <MenuPreview 
            config={project.data.menu}
            themeColors={project.data.site.theme.colors}
          />
        );
      case 'site':
        return (
          <SitePreview 
            project={project}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <BuilderLayout
        sidebar={renderSidebar()}
        preview={renderPreview()}
        sidebarOpen={ui.sidebarOpen}
        previewOpen={ui.previewOpen}
        onCloseSidebar={closeSidebar}
        onClosePreview={closePreview}
      />
    </AppLayout>
  );
};

export default Builders;