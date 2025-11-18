import React from 'react';
import { UnifiedBuilderLayout, BuilderSection } from '../../../components/UnifiedBuilderLayout';
import { AutoSidebar } from '../editor/AutoSidebar';
import { useAppStore } from '../../../store/app-store';
import { getComponentDefinition } from './registry';
import { Layout, Grid, Type, Settings, Palette, List } from 'lucide-react';
import { BusinessSettingsEditor } from '../settings/BusinessSettingsEditor';
import { ThemeEditor } from '../theme/ThemeEditor';
import { SectionManager } from './SectionManager';
import { PageManager } from './PageManager';

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
import { registerContact } from '../components/Contact';
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
registerContact();
registerReservation();

export const UniversalSidebar: React.FC = () => {
    const {
        activeProject,
        ui,
        setActiveSection,
        setActiveMode,
        setActivePage,
        addPage,
        updateSection
    } = useAppStore();
    const { activeSectionId, activePageId } = ui;

    if (!activeProject) return null;

    // Find active page
    const activePage = activeProject.pages?.find(p => p.id === activePageId) || activeProject.pages?.[0];

    // Fallback if no pages (shouldn't happen with new store)
    if (!activePage) return <div>No pages found</div>;

    const renderContent = () => {
        // Get sections from ACTIVE PAGE
        const sections = activePage.sections.map(section => {
            const def = getComponentDefinition(section.type);
            return {
                id: section.id,
                label: def?.schema.name || section.type,
                icon: section.type === 'hero' ? Layout : Grid,
                category: 'sections',
                description: def?.schema.description || ''
            };
        });

        return [
            {
                id: 'page_manager',
                label: 'Pages',
                icon: Type, // Using Type temporarily, or maybe Files/Layers if available
                category: 'structure',
                description: 'Manage site pages'
            },
            {
                id: 'structure_manager',
                label: 'Page Structure',
                icon: List,
                category: 'structure',
                description: 'Manage sections and layout'
            },
            ...sections,
            {
                id: 'settings_theme',
                label: 'Design System',
                icon: Palette,
                category: 'settings',
                description: 'Global fonts and colors'
            },
            {
                id: 'settings_business',
                label: 'Business Info',
                icon: Settings,
                category: 'settings',
                description: 'Profile, Contact, Hours'
            }
        ];
    };

    const navItems = renderContent();

    const activeSectionConfig = activePage.sections.find(s => s.id === activeSectionId);
    const activeComponentDef = activeSectionConfig ? getComponentDefinition(activeSectionConfig.type) : null;

    return (
        <UnifiedBuilderLayout
            builderType="site"
            sections={navItems}
            activeSection={activeSectionId || ''}
            onSectionChange={setActiveSection}
            onSwitchBuilder={(mode) => setActiveMode(mode)}
        >
            {activeSectionId === 'page_manager' ? (
                <PageManager />
            ) : activeSectionId === 'structure_manager' ? (
                <SectionManager />
            ) : activeSectionId === 'settings_business' ? (
                <BusinessSettingsEditor />
            ) : activeSectionId === 'settings_theme' ? (
                <ThemeEditor />
            ) : activeSectionConfig && activeComponentDef ? (
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
