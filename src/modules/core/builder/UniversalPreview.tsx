import React from 'react';
import { Engine } from './Engine';
import { useAppStore } from '../../../store/app-store';

export const UniversalPreview: React.FC = () => {
    const { activeProject, ui, setActiveSection } = useAppStore();
    const { activePageId, activeSectionId } = ui;

    if (!activeProject) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    // Find active page
    const activePage = activeProject.pages?.find(p => p.id === activePageId) || activeProject.pages?.[0];

    if (!activePage) {
        return <div className="flex items-center justify-center h-full">No page selected</div>;
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-100">
            <div className="w-full min-h-full bg-white shadow-2xl overflow-hidden transform-gpu">
                <Engine
                    config={activeProject}
                    sections={activePage.sections}
                    activeSectionId={activeSectionId}
                    onSectionSelect={setActiveSection}
                />
            </div>
        </div>
    );
};
