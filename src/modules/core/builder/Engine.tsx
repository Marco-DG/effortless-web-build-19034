import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteConfig, SectionConfig } from './types';
import { getComponent } from './registry';
import { Plus } from 'lucide-react';
import { AddSectionModal } from './AddSectionModal';

interface EngineProps {
    config: SiteConfig;
    sections: SectionConfig[];
    previewMode?: boolean;
    activeSectionId?: string | null;
    onSectionSelect?: (sectionId: string) => void;
    onAddSection?: (type: string, index: number) => void;
    onMoveSection?: (index: number, direction: 'up' | 'down') => void;
    onDeleteSection?: (sectionId: string) => void;
    onDuplicateSection?: (sectionId: string) => void;
}

export const Engine: React.FC<EngineProps> = ({
    config,
    sections,
    previewMode = false,
    activeSectionId,
    onSectionSelect,
    onAddSection,
    onMoveSection,
    onDeleteSection,
    onDuplicateSection
}) => {
    const { theme } = config;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [insertIndex, setInsertIndex] = useState<number>(0);

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

    const handleAddClick = (index: number) => {
        setInsertIndex(index);
        setIsModalOpen(true);
    };

    const handleModalSelect = (type: string) => {
        if (onAddSection) {
            onAddSection(type, insertIndex);
        }
        setIsModalOpen(false);
    };

    const visibleSections = sections.filter(section => section.isEnabled);
    const lastSection = visibleSections[visibleSections.length - 1];
    const hasFooter = lastSection?.type === 'footer';

    return (
        <div
            className={`w-full min-h-screen bg-[var(--theme-background)] text-[var(--theme-text)] ${!previewMode && !hasFooter ? 'pb-32' : ''}`}
            style={{ fontFamily: 'var(--theme-font-body)' }}
        >
            <AddSectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleModalSelect}
                insertIndex={insertIndex}
            />

            {visibleSections.map((section, index) => {
                const isHeader = section.type === 'header';
                const isFooter = section.type === 'footer';
                const prevSection = index > 0 ? visibleSections[index - 1] : null;

                return (
                    <React.Fragment key={section.id}>
                        {/* Ghost Divider BEFORE section (only if not header and not preview, and not immediately after header) */}
                        {!previewMode && !isHeader && (index === 0 || (prevSection && prevSection.type !== 'header')) && (
                            <GhostDivider
                                onClick={() => handleAddClick(index)}
                                sectionId={section.id}
                                prevSectionId={prevSection?.id}
                                onSectionSelect={onSectionSelect}
                            />
                        )}

                        <SelectableSection
                            section={section}
                            isActive={activeSectionId === section.id}
                            onSelect={onSectionSelect}
                            previewMode={previewMode}
                            index={index}
                            totalSections={visibleSections.length}
                            onMove={onMoveSection}
                            onDelete={onDeleteSection}
                            onDuplicate={onDuplicateSection}
                        />

                        {/* Ghost Divider AFTER last section (if it's not footer) */}
                        {!previewMode && index === visibleSections.length - 1 && !isFooter && (
                            <GhostDivider
                                onClick={() => handleAddClick(index + 1)}
                                label={t('builder.addFooterOrSection')}
                                sectionId={null}
                                prevSectionId={section.id}
                                onSectionSelect={onSectionSelect}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

// --- Subcomponents ---

const GhostDivider: React.FC<{
    onClick: () => void;
    label?: string;
    sectionId: string | null;
    prevSectionId?: string | null;
    onSectionSelect?: (id: string) => void;
}> = ({ onClick, label, sectionId, prevSectionId, onSectionSelect }) => {
    const { t } = useTranslation();

    const handleContainerClick = (e: React.MouseEvent) => {
        // Smart selection based on click position
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const isTopHalf = y < rect.height / 2;

        if (isTopHalf) {
            if (prevSectionId && onSectionSelect) onSectionSelect(prevSectionId);
            else if (sectionId && onSectionSelect) onSectionSelect(sectionId);
        } else {
            if (sectionId && onSectionSelect) onSectionSelect(sectionId);
            else if (prevSectionId && onSectionSelect) onSectionSelect(prevSectionId);
        }
    };

    return (
        <div
            className="ghost-divider group relative h-24 -my-12 z-[80] flex items-center justify-center cursor-pointer"
            onClick={handleContainerClick}
        >
            {/* Extended invisible hit area for hover */}
            <div className="absolute inset-0 w-full h-full pointer-events-none" />
            <div className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] pointer-events-none" />

            {/* Button appears on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out transform scale-95 group-hover:scale-100">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent container click
                        onClick();
                    }}
                    className="bg-white border border-slate-200/60 hover:border-slate-300 rounded-[12px] px-3 py-2 shadow-sm hover:shadow-lg transition-all duration-300 relative cursor-pointer"
                >
                    {/* Linee a tutta larghezza */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-screen h-[1px] bg-slate-200/40 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-screen h-[1px] bg-slate-200/40 translate-x-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                    <div className="flex items-center gap-2 relative z-10">
                        <Plus className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs font-medium text-slate-600 font-geist tracking-[-0.01em] whitespace-nowrap">
                            {label || t('builder.addSection')}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

const SelectableSection: React.FC<{
    section: SectionConfig;
    isActive: boolean;
    onSelect?: (id: string) => void;
    previewMode: boolean;
    index: number;
    totalSections: number;
    onMove?: (index: number, direction: 'up' | 'down') => void;
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
}> = ({ section, isActive, onSelect, previewMode }) => {
    const Component = getComponent(section.type);

    if (!Component) {
        return null;
    }

    const handleClick = (e: React.MouseEvent) => {
        if (!previewMode && onSelect) {
            e.stopPropagation();
            onSelect(section.id);
        }
    };

    const isHeader = section.type === 'header';

    return (
        <section
            id={section.id}
            className={`relative group transition-all duration-200 ${!previewMode ? 'cursor-pointer' : ''} ${isHeader ? 'z-50' : ''}`}
            onClick={handleClick}
        >
            <Component {...section.data} variant={section.variant} />
        </section>
    );
};
