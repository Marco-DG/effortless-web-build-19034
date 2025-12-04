import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { UnifiedBuilderLayout } from '../shared/components/UnifiedBuilderLayout';
import { AutoSidebar } from '../editor/AutoSidebar';
import { Engine } from './Engine';
import { SegmentedControl } from '../editor/components/SegmentedControl';
import { useAppStore } from '../store/app-store';
import { getComponentDefinition } from './registry';
import { Layout, Layers } from 'lucide-react';
import { ThemeEditor } from '../theme/ThemeEditor';
import { SectionManager } from './SectionManager';
import { SectionTree } from './SectionTree';

// Ensure components are registered
import { registerHero } from '../components/Hero';
import { registerGrid } from '../components/Grid';
import { registerHeader } from '../components/Header';
import { registerFooter } from '../components/Footer';
import { registerMenu } from '../components/Menu';
import { registerGallery } from '../components/Gallery';
import { registerContent } from '../components/Content';
import { registerFeatures } from '../components/Features';
import { registerTestimonials } from '../components/Testimonials';
import { registerAwards } from '../components/Awards';

import { registerReservation } from '../components/Reservation';

registerHero();
registerGrid();
registerHeader();
registerFooter();
registerMenu();
registerGallery();
registerContent();
registerFeatures();
registerTestimonials();
registerAwards();

registerReservation();

export const UniversalSidebar: React.FC = () => {
    const { t } = useTranslation();
    const {
        activeProject,
        ui,
        setActiveSection,
        updateSection,
        setActiveMode,
        addSection,
        reorderSections,
        deleteSection,
        duplicateSection
    } = useAppStore();
    const [activeTab, setActiveTab] = React.useState<'design' | 'content'>('design');
    const { activeSectionId, activePageId, previewOpen } = ui;

    if (!activeProject) return null;

    // Find active page
    const activePage = activeProject.pages?.find(p => p.id === activePageId) || activeProject.pages?.[0];
    if (!activePage) return <div>No pages found</div>;
    const activePageSections = activePage.sections;

    // Handlers for Engine
    const handleAddSection = (type: string, index: number) => {
        addSection(type, index);
    };

    const handleMoveSection = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= activePageSections.length) return;
        reorderSections(index, newIndex);
    };

    const handleDeleteSection = (sectionId: string) => {
        if (confirm(t('common.confirmDeleteSection'))) {
            deleteSection(sectionId);
            if (activeSectionId === sectionId) {
                setActiveSection(null);
            }
        }
    };

    const handleDuplicateSection = (sectionId: string) => {
        duplicateSection(sectionId);
    };

    // Define Sidebar Tools
    const sidebarTools = [
        {
            id: 'structure_manager',
            label: t('common.layers'),
            icon: Layers,
            category: 'structure',
            description: t('common.manageSections')
        },
    ];

    // Check if we are editing a specific section
    const activeSectionConfig = activePage.sections.find(s => s.id === activeSectionId);
    const activeComponentDef = activeSectionConfig ? getComponentDefinition(activeSectionConfig.type) : null;
    const isEditingSection = !!(activeSectionConfig && activeComponentDef);

    // Determine what to render in the content area
    const renderContent = () => {
        const normalContent = (isEditingSection && activeComponentDef && activeSectionConfig) ? (
            <AutoSidebar
                schema={activeComponentDef.schema}
                data={activeSectionConfig.data}
                onUpdate={(newData) => updateSection(activeSectionConfig.id, newData)}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        ) : (
            (() => {
                switch (activeSectionId) {
                    case 'structure_manager':
                        return <SectionManager />;
                    case 'theme_editor':
                        return <ThemeEditor />;
                    default:
                        return <SectionManager />;
                }
            })()
        );

        if (previewOpen) {
            return (
                <>
                    {/* Mobile: Show Engine */}
                    <div className="lg:hidden w-full bg-white">
                        <Engine
                            previewMode={true}
                            config={activeProject}
                            sections={activePageSections}
                            activeSectionId={activeSectionId}
                            onSectionSelect={setActiveSection}
                            onAddSection={handleAddSection}
                            onMoveSection={handleMoveSection}
                            onDeleteSection={handleDeleteSection}
                            onDuplicateSection={handleDuplicateSection}
                        />
                    </div>
                    {/* Desktop: Show Normal Content */}
                    <div className="hidden lg:block w-full h-full">
                        <ScrollArea className="h-full">
                            <div className="p-6 bg-gradient-to-b from-white/30 via-slate-50/20 to-slate-50/40">
                                {normalContent}
                            </div>
                        </ScrollArea>
                    </div>
                </>
            );
        }

        return normalContent;
    };

    // If editing a section, we can show a custom header or let AutoSidebar handle it.
    // But UnifiedBuilderLayout has a header prop.

    // Check if schema has categorized fields
    const hasCategories = activeComponentDef ?
        Object.values(activeComponentDef.schema.fields).some(field => field.category) : false;

    const customHeader = isEditingSection && activeComponentDef ? (
        <div>
            <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-white via-slate-50 to-slate-100/80 border border-slate-200/50 flex items-center justify-center shadow-lg shadow-slate-900/8 backdrop-blur-sm">
                    <Layout className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-[-0.02em] font-geist leading-tight mb-2">
                        {t(`components.${activeSectionConfig.type}.name`, { defaultValue: activeComponentDef.schema.name })}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium font-geist tracking-[-0.01em] leading-relaxed">
                        {t('common.editingComponent')}
                    </p>
                </div>
            </div>
            {hasCategories && (
                <div className="-mx-8">
                    <SegmentedControl
                        options={[
                            { value: 'design', label: t('common.design') },
                            { value: 'content', label: t('common.content') }
                        ]}
                        value={activeTab}
                        onChange={(value) => setActiveTab(value as 'design' | 'content')}
                    />
                </div>
            )}
        </div>
    ) : undefined;

    return (
        <UnifiedBuilderLayout
            builderType="site"
            sections={sidebarTools}
            activeSection={activeSectionId || 'structure_manager'}
            onSectionChange={setActiveSection}
            onSwitchBuilder={(mode) => setActiveMode(mode)}
            headerContent={customHeader}
            renderCategory={(category, isExpanded) => {
                if (category === 'structure') {
                    return <SectionTree isExpanded={isExpanded} />;
                }
                return null;
            }}
        >
            {renderContent()}
        </UnifiedBuilderLayout>
    );
};
