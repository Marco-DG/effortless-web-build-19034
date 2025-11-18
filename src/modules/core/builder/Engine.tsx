import React from 'react';
import { SiteConfig, SectionConfig } from './types';
import { getComponent } from './registry';

interface EngineProps {
    config: SiteConfig;
    previewMode?: boolean;
}

export const Engine: React.FC<EngineProps> = ({ config, previewMode = false }) => {
    const { theme, sections } = config;

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
                    <SectionRenderer key={section.id} section={section} />
                ))}
        </div>
    );
};

const SectionRenderer: React.FC<{ section: SectionConfig }> = ({ section }) => {
    const Component = getComponent(section.type);

    if (!Component) {
        console.warn(`Component type "${section.type}" not found in registry.`);
        return (
            <div className="p-8 text-center border-2 border-dashed border-red-300 bg-red-50 text-red-500 rounded-lg m-4">
                Component <strong>{section.type}</strong> not found.
            </div>
        );
    }

    return (
        <section id={section.id} className="relative">
            <Component {...section.data} variant={section.variant} />
        </section>
    );
};
