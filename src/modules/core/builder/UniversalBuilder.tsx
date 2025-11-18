import React from 'react';
import { UnifiedBuilderLayout, BuilderSection } from '../../site-builder/components/UnifiedBuilderLayout';
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

// Call registration once
registerHero();
registerGrid();

export const UniversalBuilder: React.FC = () => {
    const {
        activeProject,
        ui,
        setActiveSection,
        updateSection,
        setActiveMode
    } = useAppStore();

    const activeSectionId = ui.activeSectionId;

    // Generate sidebar sections based on project sections
    const builderSections: BuilderSection[] = React.useMemo(() => {
        if (!activeProject) return [];

        return activeProject.sections.map(section => {
            const def = getComponentDefinition(section.type);
            return {
                id: section.id,
                label: def?.schema.name || section.type,
                icon: section.type === 'hero' ? Layout : Grid, // Simple icon mapping
                category: 'sections',
                description: def?.schema.description || ''
            };
        });
    }, [activeProject]);

    if (!activeProject) {
        return <div className="flex items-center justify-center h-screen">Loading Project...</div>;
    }

    // Find active section config and schema
    const activeSectionConfig = activeProject.sections.find(s => s.id === activeSectionId);
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
                    <Engine config={activeProject} />
                </div>
            </div>
        </div>
    );
};
