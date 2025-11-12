import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { Download, Eye, Palette, Type, Layers, Settings } from 'lucide-react';
import { TemplateSection } from './sections/TemplateSection';
import { FontSection } from './sections/FontSection';
import { StyleSection } from './sections/StyleSection';
import { CanvasSection } from './sections/CanvasSection';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LogoBuilderRedesignedProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

// Sezioni del Logo Builder seguendo lo stesso pattern del SiteBuilder
const LOGO_SECTIONS = [
  // DESIGN
  { id: 'templates' as const, label: 'Template', icon: Layers, category: 'design', description: 'Scegli un design base' },
  { id: 'fonts' as const, label: 'Font & Testo', icon: Type, category: 'design', description: 'Typography e contenuti' },
  
  // ASPETTO
  { id: 'style' as const, label: 'Stile', icon: Palette, category: 'appearance', description: 'Colori e aspetto' },
  { id: 'canvas' as const, label: 'Canvas', icon: Settings, category: 'appearance', description: 'Controlli avanzati' }
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
      case 'fonts':
        return (
          <FontSection
            logoConfig={logoConfig}
            onUpdateLogo={handleUpdateLogo}
          />
        );
      case 'style':
        return (
          <StyleSection
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
    <div className="h-full w-full lg:w-auto flex flex-col bg-white lg:rounded-l-2xl border-r border-border shadow-lg overflow-hidden">
      
      {/* Header con tab condivisa - identico agli altri builder */}
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
              title="Esporta"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content - identico al SiteBuilder */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        
        {/* Sidebar Navigation - identica al SiteBuilder */}
        <div className="w-10 2xl:w-40 border-r border-border bg-white/50 backdrop-blur flex flex-col py-2 flex-shrink-0">
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-1">
              {(() => {
                const categories = [
                  { id: 'design', label: 'Design', sections: LOGO_SECTIONS.filter(s => s.category === 'design') },
                  { id: 'appearance', label: 'Aspetto', sections: LOGO_SECTIONS.filter(s => s.category === 'appearance') }
                ];

                return categories.map((category) => (
                  <div key={category.id} className="space-y-1">
                    {/* Divisore categoria - visibile solo su schermi larghi */}
                    <div className="hidden 2xl:flex items-center gap-2 px-2 py-2 mt-4 first:mt-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category.label}
                      </h3>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    
                    {/* Sezioni della categoria */}
                    {category.sections.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center justify-center 2xl:justify-start px-2 py-3 2xl:px-3 2xl:py-2.5 text-sm transition-all duration-200 rounded-lg group ${
                            isActive
                              ? 'bg-primary text-primary-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <section.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="hidden 2xl:block ml-3 text-left font-medium">
                            {section.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          </ScrollArea>
        </div>

        {/* Section Editor */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Section Header - identico al SiteBuilder */}
          <div className="px-6 py-4 border-b bg-white/80 backdrop-blur">
            <div className="flex items-center gap-3">
              {(() => {
                const currentSection = LOGO_SECTIONS.find(s => s.id === activeSection);
                return currentSection && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <currentSection.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{currentSection.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentSection.description}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Section Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {renderSectionEditor()}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};