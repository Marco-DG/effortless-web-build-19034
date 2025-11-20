import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store/app-store';
import { Engine } from '../modules/core/builder/Engine';
import { useTranslation } from 'react-i18next';

export default function Preview() {
  const { activeProject, ui } = useAppStore();
  const { t } = useTranslation();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Allow a brief moment for Zustand persist to rehydrate
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-slate-400">Loading...</div>
    </div>;
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
    <div className="min-h-screen bg-white">
      <Engine
        config={activeProject}
        sections={activePage.sections}
        previewMode={true}
      />
    </div>
  );
}