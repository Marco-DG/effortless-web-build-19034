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
        // Only show high-level managers in the main menu
        return [
            {
                id: 'page_manager',
                label: 'Pages',
                icon: Type,
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

    // Check if we are editing a specific section (not a manager)
    const activeSectionConfig = activePage.sections.find(s => s.id === activeSectionId);
    const activeComponentDef = activeSectionConfig ? getComponentDefinition(activeSectionConfig.type) : null;
    const isEditingSection = !!(activeSectionConfig && activeComponentDef);

    // If editing a section, we want to show the Editor, but we need a way to "go back"
    // We'll handle this by rendering the Editor as a special case override

    const editorHeader = isEditingSection && activeComponentDef ? (
        <div className="flex items-center gap-4">
            <button
                onClick={() => setActiveSection('structure_manager')}
                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-500 transition-all shadow-sm"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        Editing
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{activeComponentDef.schema.name}</h3>
            </div>
        </div>
    ) : null;

    return (
        <UnifiedBuilderLayout
            builderType="site"
            sections={navItems}
            activeSection={activeSectionId || 'structure_manager'}
            onSectionChange={setActiveSection}
            onSwitchBuilder={(mode) => setActiveMode(mode)}
            headerContent={editorHeader}
        >
            {isEditingSection && activeComponentDef ? (
                <AutoSidebar
                    schema={activeComponentDef.schema}
                    data={activeSectionConfig.data}
                    onUpdate={(newData) => updateSection(activeSectionConfig.id, newData)}
                />
            ) : activeSectionId === 'page_manager' ? (
                <PageManager />
            ) : activeSectionId === 'structure_manager' ? (
                <div className="flex flex-col h-full">
                    {/* Page Selector (Temporary until PageManager) */}
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Active Page</label>
                        <select
                            value={activePageId || ''}
                            onChange={(e) => setActivePage(e.target.value)}
                            className="w-full p-2 border border-slate-200 rounded-md text-sm bg-white"
                        >
                            {activeProject.pages.map(page => (
                                <option key={page.id} value={page.id}>{page.title} ({page.slug})</option>
                            ))}
                        </select>
                        <button
                            onClick={() => addPage('New Page', `/page-${Date.now()}`)}
                            className="mt-2 text-xs text-blue-600 hover:underline"
                        >
                            + Create New Page
                        </button>
                    </div>
                    <SectionManager />
                </div>
            ) : activeSectionId === 'settings_business' ? (
                <BusinessSettingsEditor />
            ) : activeSectionId === 'settings_theme' ? (
                <ThemeEditor />
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <List className="w-12 h-12 mb-4 opacity-20" />
                    <p>Select a tool to begin</p>
                </div>
            )}
        </UnifiedBuilderLayout>
    );
};
