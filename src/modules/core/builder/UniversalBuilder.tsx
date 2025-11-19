import React from 'react';
import { UnifiedBuilderLayout, BuilderSection } from '../../../components/UnifiedBuilderLayout';
import { AutoSidebar } from '../editor/AutoSidebar';
import { Engine } from './Engine';
import { useAppStore } from '../../../store/app-store';
import { getComponentDefinition } from './registry';
import {
    Layout, Type, Grid
} from 'lucide-react';

// Register components (ensure they are registered)
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
import { registerContact } from '../components/Contact';
import { registerReservation } from '../components/Reservation';

// Call registration once
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
registerContact();
registerReservation();

export const UniversalBuilder: React.FC = () => {
    const {
        activeProject,
        ui,
        setActiveSection,
        updateSection,
        setActiveMode
    } = useAppStore();

    const activeSectionId = ui.activeSectionId;
    const activePageId = ui.activePageId;

    // Get active page sections
    const activePageSections = React.useMemo(() => {
        if (!activeProject || !activePageId) return [];
        const page = activeProject.pages.find(p => p.id === activePageId);
        return page ? page.sections : [];
    }, [activeProject, activePageId]);

    // Generate sidebar sections based on project sections
    const builderSections: BuilderSection[] = React.useMemo(() => {
        return activePageSections.map(section => {
            const def = getComponentDefinition(section.type);
            return {
                id: section.id,
                label: def?.schema.name || section.type,
                icon: section.type === 'hero' ? Layout : Grid, // Simple icon mapping
                category: 'sections',
                description: def?.schema.description || ''
            };
        });
    }, [activePageSections]);

    if (!activeProject) {
        return <div className="flex items-center justify-center h-screen">Loading Project...</div>;
    }

    // Find active section config and schema
    const activeSectionConfig = activePageSections.find(s => s.id === activeSectionId);
    const activeComponentDef = activeSectionConfig ? getComponentDefinition(activeSectionConfig.type) : null;

    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
            {/* Sidebar & Editor */}
            <div className="w-[450px] flex-shrink-0 h-full border-r border-slate-200 bg-white z-10 shadow-xl">
                <UnifiedBuilderLayout
                    builderType="site"
                    sections={builderSections}
                    activeSection={activeSectionId || ''}
                    onSectionChange={setActiveSection}
                    onSwitchBuilder={(mode) => setActiveMode(mode)}
                >
                    {activeSectionConfig && activeComponentDef ? (
                        <AutoSidebar
                            schema={activeComponentDef.schema}
                            data={activeSectionConfig.data}
                            onUpdate={(newData) => updateSection(activeSectionConfig.id, newData)}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <Type className="w-12 h-12 mb-4 opacity-20" />
                            <p>Select a section to edit</p>
                        </div>
                    )}
                </UnifiedBuilderLayout>
            </div>

            {/* Preview Engine */}
            <div className="flex-1 h-full overflow-y-auto bg-slate-100 p-8">
                <div className="max-w-[1400px] mx-auto bg-white shadow-2xl min-h-[800px] rounded-xl overflow-hidden ring-1 ring-slate-900/5">
                    <Engine
                        config={activeProject}
                        sections={activePageSections}
                        activeSectionId={activeSectionId}
                    />
                </div>
            </div>
        </div>
    );
};
