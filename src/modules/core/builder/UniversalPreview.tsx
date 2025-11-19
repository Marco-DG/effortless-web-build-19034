import React from 'react';
import { Engine } from './Engine';
import { useAppStore } from '../../../store/app-store';

export const UniversalPreview: React.FC = () => {
    const {
        activeProject,
        ui,
        setActiveSection,
        addSection,
        reorderSections,
        deleteSection,
        duplicateSection
    } = useAppStore();
    const { activePageId, activeSectionId } = ui;

    if (!activeProject) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    // Find active page
    const activePage = activeProject.pages?.find(p => p.id === activePageId) || activeProject.pages?.[0];

    if (!activePage) {
        return <div className="flex items-center justify-center h-full">No page selected</div>;
    }

    // --- Handlers ---

    const handleAddSection = (type: string, index: number) => {
        addSection(type, index);
    };

    const handleMoveSection = (index: number, direction: 'up' | 'down') => {
        const sections = activePage.sections;
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= sections.length) return;
        reorderSections(index, newIndex);
    };

    const handleDeleteSection = (sectionId: string) => {
        if (confirm('Are you sure you want to delete this section?')) {
            deleteSection(sectionId);
            if (activeSectionId === sectionId) {
                setActiveSection(null);
            }
        }
    };

    const handleDuplicateSection = (sectionId: string) => {
        duplicateSection(sectionId);
    };

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-100">
            <div className="w-full min-h-full bg-white shadow-2xl overflow-hidden transform-gpu">
                <Engine
                    config={activeProject}
                    sections={activePage.sections}
                    activeSectionId={activeSectionId}
                    onSectionSelect={setActiveSection}
                    onAddSection={handleAddSection}
                    onMoveSection={handleMoveSection}
                    onDeleteSection={handleDeleteSection}
                    onDuplicateSection={handleDuplicateSection}
                />
            </div>
        </div>
    );
};
