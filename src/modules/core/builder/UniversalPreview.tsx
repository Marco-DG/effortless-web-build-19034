import React from 'react';
import { useTranslation } from 'react-i18next';
import { Engine } from './Engine';
import { useAppStore } from '../../../store/app-store';

export const UniversalPreview: React.FC = () => {
    const { t, i18n } = useTranslation();
    const {
        activeProject,
        ui,
        setActiveSection,
        addSection,
        reorderSections,
        deleteSection,
        duplicateSection,
        translateDefaults
    } = useAppStore();
    const { activePageId, activeSectionId } = ui;

    if (!activeProject) {
        return <div className="flex items-center justify-center h-full">{t('common.loadingProject')}</div>;
    }

    // Find active page
    const activePage = activeProject.pages?.find(p => p.id === activePageId) || activeProject.pages?.[0];

    if (!activePage) {
        return <div className="flex items-center justify-center h-full">{t('common.noPageSelected')}</div>;
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

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-100">
            <div className="w-full min-h-full bg-white overflow-hidden transform-gpu">
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

            <div className="fixed bottom-4 left-4 z-[9999] flex gap-2 bg-white p-2 rounded shadow border">
                <button onClick={() => { console.log('Switching to EN'); i18n.changeLanguage('en'); translateDefaults('en'); }} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold">EN</button>
                <button onClick={() => { console.log('Switching to IT'); i18n.changeLanguage('it'); translateDefaults('it'); }} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold">IT</button>
                <div className="text-xs text-slate-400">Current: {i18n.language}</div>
            </div>
        </div >
    );
};
