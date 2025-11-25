import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, LucideIcon, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ... (existing code)

<div className="flex items-center gap-2">
  <a
    href="/preview"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 px-3 h-10 rounded-[12px] bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 shadow-sm"
    title="Apri in nuova scheda"
  >
    <ExternalLink className="w-4 h-4" />
    <span className="hidden xl:inline font-medium text-sm">Anteprima</span>
  </a>
  <button
    type="button"
    className="lg:hidden inline-flex items-center gap-2 rounded-[12px] bg-slate-900 text-white px-4 py-2.5 text-sm font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all duration-200"
  >
    <Eye className="w-4 h-4" />
    <span className="font-geist font-medium tracking-[-0.01em]">Anteprima</span>
  </button>
</div >

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
  renderCategory?: (categoryId: string, isExpanded: boolean) => React.ReactNode;

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
  renderCategory,
  children
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isEditorHovered, setIsEditorHovered] = React.useState(false);
  const currentSection = sections.find(s => s.id === activeSection);

  // Calculate expansion state
  // Expanded if NOT hovering the editor (so Preview or Sidebar Hover)
  const isExpanded = !isEditorHovered;

  // Calculate width
  // Editor Hover -> Collapsed (3.625rem)
  // Sidebar Hover -> Full (18rem)
  // Preview (Default) -> Intermediate (15rem) - "Up to text"
  const sidebarWidth = isEditorHovered ? '3.625rem' : (isHovered ? '18rem' : '15rem');

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
      label: t(`common.${category}`, { defaultValue: category.charAt(0).toUpperCase() + category.slice(1) }),
      sections: secs
    }));
  }, [sections, t]);

  const getBuilderLabel = (type: 'logo' | 'menu' | 'site') => {
    switch (type) {
      case 'logo': return 'Logo';
      case 'menu': return 'Menù';
      case 'site': return 'Sito Web';
    }
  };

  return (
    <div className="h-full w-full lg:w-full flex flex-col sidebar-premium lg:rounded-tl-[2rem] overflow-hidden font-geist">

      {/* Header con tab condivisa */}
      {onSwitchBuilder && (
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200/30 bg-white/60 backdrop-blur-xl relative z-50">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {(['logo', 'menu', 'site'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onSwitchBuilder(type)}
                className={`topbar-tab relative px-4 py-2.5 font-medium text-sm transition-all duration-300 ease-out whitespace-nowrap ${builderType === type
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

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3 h-10 rounded-[12px] bg-white text-slate-600 border border-slate-200/60 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 shadow-sm"
              title="Apri in nuova scheda"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden xl:inline font-medium text-sm">Anteprima</span>
            </a>
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
        <div
          style={{
            width: sidebarWidth,
            transition: 'width 700ms cubic-bezier(0.2, 0, 0, 1)'
          }}
          className="flex flex-col flex-shrink-0 relative z-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute right-0 top-0 bottom-0 sidebar-divider"></div>
          <ScrollArea className="flex-1">
            <div className="space-y-2 py-3">
              {categories.map((category, categoryIndex) => (
                <div key={category.id} className="space-y-1.5 px-1.5">


                  {/* Sezioni della categoria */}
                  {renderCategory && renderCategory(category.id, isExpanded) ? (
                    renderCategory(category.id, isExpanded)
                  ) : (
                    category.sections.map((section, sectionIndex) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => onSectionChange(section.id)}
                          className={`sidebar-nav-item w-full flex items-center justify-center lg:justify-start 
                            px-3 py-2.5 text-sm transition-all duration-200
                            rounded-[12px] group font-medium
                            ${isActive
                              ? 'bg-slate-100 text-slate-900'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                          <section.icon
                            className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'
                              }`}
                          />
                          <span className={`hidden lg:block ml-3 text-left font-geist tracking-[-0.01em] transition-all duration-200 ${isActive ? 'font-semibold' : 'font-medium'
                            }`}>
                            {section.label}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Section Editor */}
        <div
          className="flex-1 min-w-0 flex flex-col"
          onMouseEnter={() => setIsEditorHovered(true)}
          onMouseLeave={() => setIsEditorHovered(false)}
        >
          {/* Section Header */}
          <div className="px-10 py-8 border-b border-slate-200/30 bg-white/40 backdrop-blur-xl">
            {headerContent ? (
              headerContent
            ) : (
              <div className="flex items-start gap-5">
                {currentSection && (
                  <>
                    <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-white via-slate-50 to-slate-100/80 border border-slate-200/50 flex items-center justify-center shadow-lg shadow-slate-900/8 backdrop-blur-sm">
                      <currentSection.icon className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900 tracking-[-0.02em] font-geist leading-tight mb-2">
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