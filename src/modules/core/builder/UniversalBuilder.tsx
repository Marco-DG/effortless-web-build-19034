import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { UniversalSidebar } from './UniversalSidebar';
import { Engine } from './Engine';
import { useAppStore } from '../../../store/app-store';

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

registerReservation();

export const UniversalBuilder: React.FC = () => {
    const { t } = useTranslation();
    const {
        activeProject,
        ui,
        setActiveSection,
        updateSection,
        addSection,
        reorderSections,
        deleteSection,
        duplicateSection
    } = useAppStore();

    const activeSectionId = ui.activeSectionId;
    const activePageId = ui.activePageId;

    // Get active page sections
    const activePageSections = React.useMemo(() => {
        if (!activeProject || !activePageId) return [];
        const page = activeProject.pages.find(p => p.id === activePageId);
        return page ? page.sections : [];
    }, [activeProject, activePageId]);

    // --- Interaction Handlers ---

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

    if (!activeProject) {
        return <div className="flex items-center justify-center h-screen">{t('common.loadingProject')}</div>;
    }

    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
            {/* Sidebar (Contextual) */}
            <UniversalSidebar />

            {/* Preview Engine */}
            <div className="flex-1 h-full overflow-y-auto bg-slate-100 p-8">
                <div className="max-w-[1400px] mx-auto bg-white shadow-2xl min-h-[800px] rounded-xl overflow-hidden ring-1 ring-slate-900/5">
                    <Engine
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
            </div>
            <div className="fixed bottom-4 left-4 z-[9999] flex gap-2 bg-white p-2 rounded shadow border">
                <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold">EN</button>
                <button onClick={() => i18n.changeLanguage('it')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold">IT</button>
            </div>
        </div>
    );
};
