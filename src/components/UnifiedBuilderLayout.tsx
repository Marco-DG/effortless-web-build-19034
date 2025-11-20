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
  headerContent?: React.ReactNode;
  contentClassName?: string;

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
  headerContent,
  contentClassName,
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
    <div className="h-full w-full lg:w-auto flex flex-col sidebar-premium lg:rounded-tl-[2rem] overflow-hidden font-geist">

      {/* Header con tab condivisa */}
      {onSwitchBuilder && (
        <div className="flex items-center justify-between px-8 py-4 border-b border-slate-200/30 bg-white/60 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            {(['logo', 'menu', 'site'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onSwitchBuilder(type)}
                className={`topbar-tab relative px-5 py-2.5 font-medium text-sm transition-all duration-300 ease-out ${builderType === type
                  ? 'text-slate-900 topbar-tab-active'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                <span className="relative z-10 font-geist font-medium tracking-[-0.01em]">
                  {getBuilderLabel(type)}
                </span>
                {builderType !== type && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[14px]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden inline-flex items-center gap-2 rounded-[12px] bg-slate-900 text-white px-4 py-2.5 text-sm font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
              <span className="font-geist font-medium tracking-[-0.01em]">Anteprima</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* Sidebar Navigation */}
        <div className="w-16 2xl:w-52 flex flex-col flex-shrink-0 relative">
          <div className="absolute right-0 top-0 bottom-0 sidebar-divider"></div>
          <ScrollArea className="flex-1">
            <div className="space-y-2 px-3 py-3">
              {categories.map((category, categoryIndex) => (
                <div key={category.id} className="space-y-1.5">
                  {/* Divisore categoria - visibile solo su schermi larghi */}
                  <div className="hidden 2xl:block px-1 pt-6 pb-2 mt-6 first:mt-2">
                    <div className="relative">
                      <h3 className="text-[11px] font-semibold text-slate-400 font-geist tracking-[0.08em] leading-none mb-2 pl-1">
                        {category.label}
                      </h3>
                      <div className="h-[1px] bg-gradient-to-r from-slate-200 via-slate-100 to-transparent opacity-60" />
                    </div>
                  </div>

                  {/* Sezioni della categoria */}
                  {category.sections.map((section, sectionIndex) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={`sidebar-nav-item ${isActive ? 'active' : ''} 
                          w-full flex items-center justify-center 2xl:justify-start 
                          px-3 py-3.5 2xl:px-4 2xl:py-3 text-sm 
                          rounded-[16px] group font-medium`}
                      >
                        <section.icon
                          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'
                            }`}
                        />
                        <span className={`hidden 2xl:block ml-3.5 text-left font-geist font-medium tracking-[-0.01em] transition-all duration-300 ${isActive ? 'text-slate-800 font-semibold' : 'text-slate-700 group-hover:text-slate-900'
                          }`}>
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
          <div className="px-6 py-6 border-b border-slate-200/30 bg-white/40 backdrop-blur-xl">
            {headerContent ? (
              headerContent
            ) : (
              <div className="flex items-start gap-4">
                {currentSection && (
                  <>
                    <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-white via-slate-50 to-slate-100/80 border border-slate-200/50 flex items-center justify-center shadow-lg shadow-slate-900/8 backdrop-blur-sm">
                      <currentSection.icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 tracking-[-0.02em] font-geist leading-tight mb-1">
                        {currentSection.label}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium font-geist tracking-[-0.01em] leading-relaxed">
                        {currentSection.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Section Content */}
          <ScrollArea className="flex-1" viewportClassName="!block" viewportStyle={{ display: 'block' }}>
            <div className={contentClassName || "p-6 bg-gradient-to-b from-white/30 via-slate-50/20 to-slate-50/40"}>
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