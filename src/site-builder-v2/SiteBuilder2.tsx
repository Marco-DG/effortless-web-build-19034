import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { UniversalSidebar } from './builder/UniversalSidebar';
import { Engine } from './builder/Engine';
import { useAppStore } from './store/app-store';

// Register components (ensure they are registered)
import { registerHero } from './components/Hero';
import { registerGrid } from './components/Grid';
import { registerHeader } from './components/Header';
import { registerFooter } from './components/Footer';
import { registerMenu } from './components/Menu';
import { registerGallery } from './components/Gallery';
import { registerContent } from './components/Content';
import { registerFeatures } from './components/Features';
import { registerTestimonials } from './components/Testimonials';
import { registerAwards } from './components/Awards';
import { registerReservation } from './components/Reservation';

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

export const SiteBuilder2: React.FC = () => {
    const { t } = useTranslation();
    const {
        activeProject,
        ui,
        setActiveSection,
        updateSection,
        addSection,
        reorderSections,
        deleteSection,
        duplicateSection,
        createProject
    } = useAppStore();

    const activeSectionId = ui.activeSectionId;
    const activePageId = ui.activePageId;

    // Initialize project if none exists
    useEffect(() => {
        if (!activeProject) {
            createProject('Site Builder V2 - Nuovo Progetto');
        }
    }, [activeProject, createProject]);

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
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100/80 to-blue-200/60 rounded-2xl flex items-center justify-center shadow-sm">
                        <span className="text-2xl">🏗️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 font-geist tracking-[-0.01em]">
                        {t('common.loadingProject')}
                    </h3>
                    <p className="text-sm text-slate-500">Site Builder V2</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex overflow-hidden">
            {/* Left Column - Sidebar (37.5% like original) */}
            <div className="w-full lg:w-[37.5%] flex-shrink-0 relative">
                <UniversalSidebar />
            </div>

            {/* Right Column - Preview (62.5% remaining) */}
            <div className="hidden lg:flex flex-1 min-h-0">
                <div className="w-full h-full overflow-y-auto bg-slate-100">
                    <div className="w-full min-h-full bg-white overflow-hidden transform-gpu">
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
            </div>
            
            <div className="fixed bottom-4 left-4 z-[9999] flex gap-2 bg-white p-2 rounded shadow border">
                <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold">EN</button>
                <button onClick={() => i18n.changeLanguage('it')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold">IT</button>
            </div>
        </div>
    );
};