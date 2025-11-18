import React from 'react';
import { UnifiedBuilderLayout, BuilderSection } from '../../../components/UnifiedBuilderLayout';
import { AutoSidebar } from '../editor/AutoSidebar';
import { useAppStore } from '../../../store/app-store';
import { getComponentDefinition } from './registry';
import { Layout, Grid, Type } from 'lucide-react';

// Ensure components are registered
import { registerHero } from '../components/Hero';
import { registerGrid } from '../components/Grid';

registerHero();
registerGrid();

export const UniversalSidebar: React.FC = () => {
    const {
        activeProject,
        ui,
        setActiveSection,
        updateSection,
        setActiveMode
    } = useAppStore();

    const activeSectionId = ui.activeSectionId;

    const builderSections: BuilderSection[] = React.useMemo(() => {
        if (!activeProject) return [];

        return activeProject.sections.map(section => {
            const def = getComponentDefinition(section.type);
            return {
                id: section.id,
                label: def?.schema.name || section.type,
                icon: section.type === 'hero' ? Layout : Grid,
                category: 'sections',
                description: def?.schema.description || ''
            };
        });
    }, [activeProject]);

    if (!activeProject) return null;

    const activeSectionConfig = activeProject.sections.find(s => s.id === activeSectionId);
    const activeComponentDef = activeSectionConfig ? getComponentDefinition(activeSectionConfig.type) : null;

    return (
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
    );
};
