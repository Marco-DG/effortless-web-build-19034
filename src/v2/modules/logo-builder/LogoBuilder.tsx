import React from 'react';
import { useAppStore } from '../../store/app-store';
import { LogoControls } from './LogoControls';
import { Eye, Download } from 'lucide-react';

interface LogoBuilderProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

export const LogoBuilder: React.FC<LogoBuilderProps> = ({ onSwitchBuilder }) => {
  const { activeProject, updateProject, closeSidebar } = useAppStore();
  
  if (!activeProject) return null;

  const logoConfig = activeProject.data.logo;

  const handleUpdateLogo = (updates: any) => {
    updateProject({
      logo: { ...logoConfig, ...updates }
    });
  };

  const handleExport = () => {
    // TODO: Implementare export del logo
    console.log('Export logo:', logoConfig);
  };

  return (
    <div className="h-full w-full lg:w-auto flex flex-col bg-white lg:rounded-l-2xl border-r border-border shadow-lg overflow-hidden">
      
      {/* Header con tab condivisa */}
      {onSwitchBuilder && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white/80 backdrop-blur text-xs font-medium">
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('logo')} 
              className="px-3 py-1.5 rounded bg-muted text-foreground"
            >
              Logo
            </button>
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('menu')} 
              className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground"
            >
              Menù
            </button>
            <button 
              type="button" 
              onClick={() => onSwitchBuilder('site')} 
              className="px-3 py-1.5 rounded text-muted-foreground hover:text-foreground"
            >
              Sito Web
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              className="lg:hidden inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs font-medium"
            >
              <Eye className="w-3.5 h-3.5" /> Anteprima
            </button>
            <button
              onClick={handleExport}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <LogoControls 
            config={logoConfig}
            businessName={activeProject.data.business.name}
            onUpdate={handleUpdateLogo}
          />
        </div>
      </div>
    </div>
  );
};