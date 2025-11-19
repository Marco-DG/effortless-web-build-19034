import React from 'react';
import { SiteConfig, SectionConfig } from './types';
import { getComponent } from './registry';
import { motion } from 'framer-motion';

interface EngineProps {
    config: SiteConfig;
    sections: SectionConfig[];
    previewMode?: boolean;
    activeSectionId?: string | null;
    onSectionSelect?: (sectionId: string) => void;
}

export const Engine: React.FC<EngineProps> = ({
    config,
    sections,
    previewMode = false,
    activeSectionId,
    onSectionSelect
}) => {
    const { theme } = config;

    // Apply theme variables to root
    React.useEffect(() => {
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${key}`, value);
        });
        root.style.setProperty('--theme-font-heading', theme.fonts.heading);
        root.style.setProperty('--theme-font-body', theme.fonts.body);
        root.style.setProperty('--theme-radius', theme.borderRadius);
    }, [theme]);

    return (
        <div
            className="w-full min-h-screen bg-[var(--theme-background)] text-[var(--theme-text)]"
            style={{ fontFamily: 'var(--theme-font-body)' }}
        >
            {sections
                .filter(section => section.isEnabled)
                .map((section) => (
                    <SelectableSection
                        key={section.id}
                        section={section}
                        isActive={activeSectionId === section.id}
                        onSelect={onSectionSelect}
                        previewMode={previewMode}
                    />
                ))}
        </div>
    );
};

const SelectableSection: React.FC<{
    section: SectionConfig;
    isActive: boolean;
    onSelect?: (id: string) => void;
    previewMode: boolean;
}> = ({ section, isActive, onSelect, previewMode }) => {
    const Component = getComponent(section.type);

    if (!Component) {
        console.warn(`Component type "${section.type}" not found in registry.`);
        return (
            <div className="p-8 text-center border-2 border-dashed border-red-300 bg-red-50 text-red-500 rounded-lg m-4">
                Component <strong>{section.type}</strong> not found.
            </div>
        );
    }

    const handleClick = (e: React.MouseEvent) => {
        if (!previewMode && onSelect) {
            e.stopPropagation();
            onSelect(section.id);
        }
    };

    const isHeader = section.type === 'header';

    return (
        <motion.section
            id={section.id}
            initial={isHeader ? undefined : { opacity: 0, y: 20 }}
            whileInView={isHeader ? undefined : { opacity: 1, y: 0 }}
            viewport={isHeader ? undefined : { once: true, margin: "-50px" }}
            transition={isHeader ? undefined : { duration: 0.5, ease: "easeOut" }}
            className={`relative group transition-all duration-200 ${!previewMode ? 'cursor-pointer' : ''} ${isHeader ? 'z-50' : ''}`}
            onClick={handleClick}
        >
            {/* Selection Overlay (Editor Mode Only) */}
            {!previewMode && (
                <div className={`
                    absolute inset-0 z-10 border-2 pointer-events-none transition-all duration-200
                    ${isActive ? 'border-blue-500 bg-blue-500/5' : 'border-transparent group-hover:border-blue-300 group-hover:bg-blue-500/5'}
                `}>
                    {/* Label Tag */}
                    <div className={`
                        absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-500 shadow-lg
                        transition-all duration-200 transform
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
                    `}>
                        {isActive ? 'Editing: ' : 'Edit: '} {section.type}
                    </div>
                </div>
            )}

            <Component {...section.data} variant={section.variant} />
        </motion.section>
    );
};
