import React, { useEffect, useState } from 'react';
import { useAppStore } from '../site-builder-v2/store/app-store';
import { Engine } from '../site-builder-v2/builder/Engine';
import { useTranslation } from 'react-i18next';

export default function Preview() {
  const { activeProject, ui } = useAppStore();
  const { t } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const checkHydration = () => {
      const state = useAppStore.getState();

      // Check if we have an active project or if we've waited long enough
      if (state.activeProject || useAppStore.persist?.hasHydrated()) {
        setIsHydrated(true);
      } else {
        // If not hydrated yet, retry shortly
        requestAnimationFrame(checkHydration);
      }
    };

    // Start checking
    checkHydration();

    // Force rehydration if needed
    if (useAppStore.persist?.rehydrate) {
      useAppStore.persist.rehydrate();
    }
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-slate-500 font-medium text-sm">Caricamento anteprima...</div>
        </div>
      </div>
    );
  }

  if (!activeProject) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-6">
          <div className="w-16 h-16 mx-auto bg-slate-200 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Nessun progetto trovato</h1>
          <p className="text-slate-500">
            Non è stato possibile caricare l'anteprima del progetto. Assicurati di aver creato un progetto nel builder.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-200 font-medium"
          >
            Torna al Builder
          </a>
        </div>
      </div>
    );
  }

  // Find active page or default to first
  const activePage = activeProject.pages?.find(p => p.id === ui.activePageId) || activeProject.pages?.[0];

  if (!activePage) {
    return <div className="min-h-screen flex items-center justify-center">Page not found</div>;
  }

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Engine
        config={activeProject}
        sections={activePage.sections}
        previewMode={true}
      />
    </div>
  );
}