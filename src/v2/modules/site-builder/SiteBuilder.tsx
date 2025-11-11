import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { SiteBuilderControls } from './SiteBuilderControls';
import { Button } from '../../ui/Button';
import { X, Save, Eye, Monitor } from 'lucide-react';

export const SiteBuilder: React.FC = () => {
  const { activeProject, closeSidebar, setActiveMode } = useAppStore();
  const [macroTab, setMacroTab] = useState<'logo' | 'menu' | 'site'>('site');
  
  if (!activeProject) return null;

  const handleMacroTabChange = (tab: 'logo' | 'menu' | 'site') => {
    setMacroTab(tab);
    setActiveMode(tab);
  };

  return (
    <div className="h-full w-full lg:w-auto flex flex-col bg-white lg:rounded-l-2xl border-r border-border shadow-lg overflow-hidden transition-all duration-700 ease-out">
      
      {/* Header con tab Logo/Menu/Sito (come nel vecchio builder) */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white/80 backdrop-blur text-xs font-medium">
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => handleMacroTabChange('logo')} 
            className={`px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              macroTab === 'logo' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Logo
          </button>
          <button 
            type="button" 
            onClick={() => handleMacroTabChange('menu')} 
            className={`px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              macroTab === 'menu' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Menù
          </button>
          <button 
            type="button" 
            onClick={() => handleMacroTabChange('site')} 
            className={`px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              macroTab === 'site' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Sito Web
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button" 
            className="lg:hidden inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs font-medium"
          >
            <Monitor className="w-3.5 h-3.5" /> Anteprima
          </button>
          <button
            onClick={closeSidebar}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Contenuto della sidebar */}
      <SiteBuilderControls macroTab={macroTab} />
    </div>
  );
};