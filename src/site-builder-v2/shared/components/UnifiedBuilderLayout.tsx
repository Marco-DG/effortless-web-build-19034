import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, LucideIcon, ExternalLink, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSidebarState } from '../../hooks/useSidebarState';
import { SidebarContainer } from './SidebarContainer';
import { SidebarNavigation } from './SidebarNavigation';
import { type BuilderSection, type BuilderType } from '../../types/sidebar';

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

export interface UnifiedBuilderLayoutProps {
  // Builder configuration
  builderType: BuilderType;
  sections: readonly BuilderSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  renderCategory?: (categoryId: string, isExpanded: boolean) => React.ReactNode;

  // Header configuration
  onSwitchBuilder?: (builder: BuilderType) => void;
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
  const {
    isExpanded,
    sidebarWidth,
    setIsHovered,
    setIsEditorHovered
  } = useSidebarState();
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
      label: t(`common.${category}`, { defaultValue: category.charAt(0).toUpperCase() + category.slice(1) }),
      sections: secs
    }));
  }, [sections, t]);

  const getBuilderLabel = (type: BuilderType) => {
    switch (type) {
      case 'logo': return 'Logo';
      case 'menu': return 'Menù';
      case 'site': return 'Sito Web';
    }
  };

  return (
    <div className="h-full w-full flex flex-col sidebar-premium lg:rounded-tl-[2rem] overflow-hidden font-geist">

      {/* Header con tab condivisa */}
      {onSwitchBuilder && (
        <div className="flex items-center justify-between pl-2 pr-4 py-4 border-b border-slate-200/30 bg-white/60 backdrop-blur-xl relative z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <User className="w-5 h-5 text-slate-900" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900 font-geist leading-none">Marco Rossi</span>
              <span className="text-xs text-slate-500 font-medium font-geist mt-1">Admin</span>
            </div>
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
        <SidebarContainer
          width={sidebarWidth}
          isExpanded={isExpanded}
          onHoverChange={setIsHovered}
        >
          <SidebarNavigation
            categories={categories}
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            isExpanded={isExpanded}
            renderCategory={renderCategory}
          />
        </SidebarContainer>

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