import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, Download, LucideIcon } from 'lucide-react';

export interface BuilderSection {
  id: string;
  label: string;
  icon: LucideIcon;
  category: string;
  description: string;
}

export interface UnifiedBuilderLayoutProps {
  // Builder configuration
  builderType: 'logo' | 'menu' | 'site';
  sections: readonly BuilderSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  
  // Header configuration
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
  onExport?: () => void;
  extraHeaderActions?: React.ReactNode;
  
  // Content
  children: React.ReactNode;
}

export const UnifiedBuilderLayout: React.FC<UnifiedBuilderLayoutProps> = ({
  builderType,
  sections,
  activeSection,
  onSectionChange,
  onSwitchBuilder,
  onExport,
  extraHeaderActions,
  children
}) => {
  const currentSection = sections.find(s => s.id === activeSection);
  
  // Group sections by category
  const categories = React.useMemo(() => {
    const categoryMap = sections.reduce((acc, section) => {
      if (!acc[section.category]) {
        acc[section.category] = [];
      }
      acc[section.category].push(section);
      return acc;
    }, {} as Record<string, BuilderSection[]>);

    return Object.entries(categoryMap).map(([category, secs]) => ({
      id: category,
      label: getCategoryLabel(category),
      sections: secs
    }));
  }, [sections]);

  const getBuilderLabel = (type: 'logo' | 'menu' | 'site') => {
    switch (type) {
      case 'logo': return 'Logo';
      case 'menu': return 'Menù';
      case 'site': return 'Sito Web';
    }
  };

  return (
    <div className="h-full w-full lg:w-auto flex flex-col bg-slate-50/80 backdrop-blur-xl lg:rounded-l-3xl border-r border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden">
      
      {/* Header con tab condivisa */}
      {onSwitchBuilder && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl text-xs font-semibold tracking-wide">
          <div className="flex items-center gap-1">
            {(['logo', 'menu', 'site'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onSwitchBuilder(type)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  builderType === type
                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-900/20'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                {getBuilderLabel(type)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              className="lg:hidden inline-flex items-center gap-1.5 rounded-xl bg-slate-800 text-white px-3 py-2 text-xs font-medium shadow-lg shadow-slate-900/20"
            >
              <Eye className="w-3.5 h-3.5" /> Anteprima
            </button>
            
            {/* Extra actions (like Add Item for Menu) */}
            {extraHeaderActions}
            
            {onExport && (
              <button
                onClick={onExport}
                className="p-2 hover:bg-white/60 rounded-xl transition-all duration-200"
                title="Esporta"
              >
                <Download className="w-4 h-4 text-slate-600" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        
        {/* Sidebar Navigation */}
        <div className="w-12 2xl:w-44 border-r border-slate-200/60 bg-gradient-to-b from-white/40 to-slate-50/60 backdrop-blur-sm flex flex-col py-4 flex-shrink-0">
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-1">
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  {/* Divisore categoria - visibile solo su schermi larghi */}
                  <div className="hidden 2xl:flex items-center gap-3 px-3 py-3 mt-6 first:mt-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] leading-none">
                      {category.label}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
                  </div>
                  
                  {/* Sezioni della categoria */}
                  {category.sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={`w-full flex items-center justify-center 2xl:justify-start px-2 py-4 2xl:px-4 2xl:py-3 text-sm transition-all duration-300 rounded-2xl group ${
                          isActive
                            ? 'bg-slate-800 text-white shadow-xl shadow-slate-900/25 scale-105'
                            : 'text-slate-600 hover:text-slate-800 hover:bg-white/70 hover:shadow-lg hover:shadow-slate-900/10 hover:scale-102'
                        }`}
                      >
                        <section.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className="hidden 2xl:block ml-3 text-left font-semibold tracking-wide">
                          {section.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Section Editor */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Section Header */}
          <div className="px-8 py-6 border-b border-slate-200/60 bg-white/60 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              {currentSection && (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/70 border border-slate-200/80 flex items-center justify-center shadow-lg shadow-slate-900/5">
                    <currentSection.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">{currentSection.label}</h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {currentSection.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section Content */}
          <ScrollArea className="flex-1">
            <div className="p-8 bg-gradient-to-b from-white/20 to-slate-50/40">
              {children}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

// Helper function to get category labels
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    design: 'Design',
    controls: 'Controlli',
    config: 'Configurazione',
    management: 'Gestione',
    appearance: 'Aspetto',
    data: 'Dati'
  };
  return labels[category] || category.charAt(0).toUpperCase() + category.slice(1);
}