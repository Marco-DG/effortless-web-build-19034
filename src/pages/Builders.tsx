import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/app-store';
import { AppLayout, BuilderLayout, PreviewLayout } from '../ui/Layout';
import { LogoBuilderRedesigned, InteractiveLogoCanvas } from '../modules/logo-builder';
import { MenuBuilderRedesigned } from '../modules/menu-builder/MenuBuilderRedesigned';
import { MenuPreview } from '../modules/menu-builder/MenuPreview';

// NEW: Import Universal Builder Components
import { UniversalSidebar } from '../modules/core/builder/UniversalSidebar';
import { UniversalPreview } from '../modules/core/builder/UniversalPreview';

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

  // Initialize project if none exists
  useEffect(() => {
    if (!activeProject) {
      createProject('Nuovo Progetto');
      // Ensure sidebar is open
      if (!ui.sidebarOpen) {
        openSidebar();
      }
    }
  }, [activeProject, createProject, ui.sidebarOpen, openSidebar]);

  const renderSidebar = () => {
    if (!activeProject) return null;

    switch (activeMode) {
      case 'logo':
        return <LogoBuilderRedesigned onSwitchBuilder={(mode) => useAppStore.getState().setActiveMode(mode)} />;
      case 'menu':
        return <MenuBuilderRedesigned onSwitchBuilder={(mode) => useAppStore.getState().setActiveMode(mode)} />;
      case 'site':
        // NEW: Use Universal Sidebar
        return <UniversalSidebar />;
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
            </div>
          </div>
        </PreviewLayout>
      );
    }

    // NOTE: activeProject is now the config object itself, not { data: ... }
    const projectData = activeProject;

    switch (activeMode) {
      case 'logo':
        return (
          <InteractiveLogoCanvas
            config={projectData.logo || {}}
            businessName={projectData.business?.name || 'Business Name'}
            onElementUpdate={(elementId, updates) => {
              const currentElements = projectData.logo?.elements || [];
              const updatedElements = currentElements.map((element: any) =>
                element.id === elementId ? { ...element, ...updates } : element
              );
              // Update logic adapted for new store structure
              // We might need a specific action for logo updates in the future
              console.warn('Logo updates temporarily disabled during migration');
            }}
            onElementSelect={() => { }}
            selectedElementId={null}
          />
        );
      case 'menu':
        return (
          <MenuPreview
            config={projectData.menu || {}}
            themeColors={projectData.theme.colors}
          />
        );
      case 'site':
        // NEW: Use Universal Preview
        return <UniversalPreview />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <BuilderLayout
        hero={null}
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