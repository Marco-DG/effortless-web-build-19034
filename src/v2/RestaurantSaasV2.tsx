import React from 'react';
import { useAppStore } from './store/app-store';
import { AppLayout, BuilderLayout, PreviewLayout } from './ui/Layout';
import { Hero } from './components/Hero';
import { LogoBuilderRedesigned, InteractiveLogoCanvas } from './modules/logo-builder';
import { MenuBuilderRedesigned } from './modules/menu-builder/MenuBuilderRedesigned';
import { MenuPreview } from './modules/menu-builder/MenuPreview';
import { SiteBuilder } from './modules/site-builder/SiteBuilder';
import { SitePreview } from './modules/site-builder/SitePreview';

export const RestaurantSaasV2: React.FC = () => {
  const {
    isBuilding,
    activeMode,
    activeProject,
    ui,
    closeSidebar,
    closePreview,
    updateProject
  } = useAppStore();


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
              <div className="w-16 h-16 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-lg font-semibold">Nessun progetto attivo</h3>
              <p className="text-muted-foreground">
                Inizia creando un nuovo progetto dalla sezione principale
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
            onElementSelect={() => {}} // Gestiamo la selezione nella sidebar se necessario
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

  // Fallback di sicurezza per evitare schermo bianco
  if (isBuilding && !activeProject) {
    return (
      <AppLayout>
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold">Errore di Caricamento</h3>
            <p className="text-muted-foreground">
              Si è verificato un problema. Ricarica la pagina e riprova.
            </p>
            <button 
              className="px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => window.location.reload()}
            >
              Ricarica Pagina
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }


  return (
    <AppLayout>
      {!isBuilding ? (
        // Landing/Hero View
        <Hero />
      ) : (
        // Altri Builder usano il layout standard
        <BuilderLayout
          hero={<Hero />}
          sidebar={renderSidebar()}
          preview={renderPreview()}
          sidebarOpen={ui.sidebarOpen}
          previewOpen={ui.previewOpen}
          onCloseSidebar={closeSidebar}
          onClosePreview={closePreview}
        />
      )}
    </AppLayout>
  );
};

export default RestaurantSaasV2;