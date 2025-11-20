import React from 'react';
import { useTranslation } from 'react-i18next';
import { UnifiedBuilderLayout } from '../../../components/UnifiedBuilderLayout';
import { AutoSidebar } from '../editor/AutoSidebar';
import { useAppStore } from '../../../store/app-store';
import { getComponentDefinition } from './registry';
import { Layout, Layers, Palette, Settings, FileText } from 'lucide-react';
import { BusinessSettingsEditor } from '../settings/BusinessSettingsEditor';
import { ThemeEditor } from '../theme/ThemeEditor';
import { SectionManager } from './SectionManager';
import { SectionManagerV2 } from './SectionManagerV2';
import { PageSettings } from './PageSettings';

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
    const { t } = useTranslation();
    const {
        activeProject,
        ui,
        setActiveSection,
        updateSection,
        setActiveMode
    } = useAppStore();
    const { activeSectionId, activePageId } = ui;

    if (!activeProject) return null;

    // Find active page
    const activePage = activeProject.pages?.find(p => p.id === activePageId) || activeProject.pages?.[0];
    if (!activePage) return <div>No pages found</div>;

    // Define Sidebar Tools
    const sidebarTools = [
        {
            id: 'page_manager',
            label: t('common.pages'),
            icon: FileText,
            category: 'structure',
            description: t('common.managePages')
        },
        {
            id: 'structure_manager',
            label: t('common.layers'),
            icon: Layers,
            category: 'structure',
            description: t('common.manageSections')
        },
        {
            id: 'business_info',
            label: t('common.settings'),
            icon: Settings,
            category: 'settings',
            description: t('common.businessProfile')
        }
    ];

    // Check if we are editing a specific section
    const activeSectionConfig = activePage.sections.find(s => s.id === activeSectionId);
    const activeComponentDef = activeSectionConfig ? getComponentDefinition(activeSectionConfig.type) : null;
    const isEditingSection = !!(activeSectionConfig && activeComponentDef);

    // Determine what to render in the content area
    const renderContent = () => {
        if (isEditingSection && activeComponentDef && activeSectionConfig) {
            return (
                <AutoSidebar
                    schema={activeComponentDef.schema}
                    data={activeSectionConfig.data}
                    onUpdate={(newData) => updateSection(activeSectionConfig.id, newData)}
                />
            );
        }

        switch (activeSectionId) {
            case 'page_manager':
                return <PageSettings />;
            case 'structure_manager':
                return <SectionManagerV2 />;
            case 'theme_editor':
                return <ThemeEditor />;
            case 'business_info':
                return <BusinessSettingsEditor />;
            default:
                // Default to Page Settings if nothing selected (or if ID doesn't match)
                return <PageSettings />;
        }
    };

    // If editing a section, we can show a custom header or let AutoSidebar handle it.
    // But UnifiedBuilderLayout has a header prop.

    const customHeader = isEditingSection && activeComponentDef ? (
        <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                <Layout size={16} />
            </div>
            <div>
                <h3 className="font-bold text-slate-900">{activeComponentDef.schema.name}</h3>
                <p className="text-xs text-slate-500">{t('common.editingComponent')}</p>
            </div>
        </div>
    ) : undefined;

    return (
        <UnifiedBuilderLayout
            builderType="site"
            sections={sidebarTools}
            activeSection={activeSectionId || 'page_manager'}
            onSectionChange={setActiveSection}
            onSwitchBuilder={(mode) => setActiveMode(mode)}
            headerContent={customHeader}
        >
            {renderContent()}
        </UnifiedBuilderLayout>
    );
};
