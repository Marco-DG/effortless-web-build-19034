import React, { useState } from 'react';
import { SiteConfig, SectionConfig } from './types';
import { getComponent } from './registry';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUp, ArrowDown, Trash2, Copy, MoreVertical } from 'lucide-react';
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

    return (
        <div
            className="w-full min-h-screen bg-[var(--theme-background)] text-[var(--theme-text)] pb-32" // Added padding bottom for last divider
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

                return (
                    <React.Fragment key={section.id}>
                        {/* Ghost Divider BEFORE section (only if not header and not preview) */}
                        {!previewMode && !isHeader && (
                            <GhostDivider onClick={() => handleAddClick(index)} />
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
                            <GhostDivider onClick={() => handleAddClick(index + 1)} label="Add Footer or Section" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

// --- Subcomponents ---

const GhostDivider: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label }) => (
    <div className="group relative h-4 -my-2 z-40 flex items-center justify-center cursor-pointer" onClick={onClick}>
        {/* The invisible hit area */}
        <div className="absolute inset-0 w-full h-full" />

        {/* The visible line on hover */}
        <div className="w-[90%] h-[2px] bg-blue-500/0 group-hover:bg-blue-500 transition-all duration-200 rounded-full flex items-center justify-center">
            <div className="bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-0 group-hover:scale-100 shadow-sm flex items-center gap-2 px-3">
                <Plus size={14} />
                <span className="text-xs font-medium">{label || "Add Section"}</span>
            </div>
        </div>
    </div>
);

const FloatingToolbar: React.FC<{
    sectionId: string;
    index: number;
    total: number;
    onMove?: (index: number, direction: 'up' | 'down') => void;
    onDelete?: (id: string) => void;
    onDuplicate?: (id: string) => void;
}> = ({ sectionId, index, total, onMove, onDelete, onDuplicate }) => {
    const isHeader = sectionId.includes('header');
    const isFooter = sectionId.includes('footer');
    const isLocked = isHeader || isFooter;

    return (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-1 bg-white border border-slate-200 shadow-lg rounded-lg p-1 animate-in fade-in zoom-in-95 duration-200">
            {!isLocked && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMove?.(index, 'up'); }}
                        disabled={index <= 1} // Assuming header is 0
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-30"
                        title="Move Up"
                    >
                        <ArrowUp size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onMove?.(index, 'down'); }}
                        disabled={index >= total - 2} // Assuming footer is last
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded disabled:opacity-30"
                        title="Move Down"
                    >
                        <ArrowDown size={16} />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-200 mx-1" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onDuplicate?.(sectionId); }}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Duplicate"
                    >
                        <Copy size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(sectionId); }}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </>
            )}
            {isLocked && (
                <span className="px-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {isHeader ? 'Header' : 'Footer'}
                </span>
            )}
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
}> = ({ section, isActive, onSelect, previewMode, index, totalSections, onMove, onDelete, onDuplicate }) => {
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
        <motion.section
            id={section.id}
            initial={isHeader ? undefined : { opacity: 0, y: 20 }}
            whileInView={isHeader ? undefined : { opacity: 1, y: 0 }}
            viewport={isHeader ? undefined : { once: true, margin: "-50px" }}
            transition={isHeader ? undefined : { duration: 0.5, ease: "easeOut" }}
            className={`relative group transition-all duration-200 ${!previewMode ? 'cursor-pointer' : ''} ${isHeader ? 'z-50' : ''}`}
            onClick={handleClick}
        >
            {/* Selection Overlay & Toolbar (Editor Mode Only) */}
            {!previewMode && (
                <>
                    <div className={`
                        absolute inset-0 z-10 border-2 pointer-events-none transition-all duration-200
                        ${isActive ? 'border-blue-500 bg-blue-500/5' : 'border-transparent group-hover:border-blue-300 group-hover:bg-blue-500/5'}
                    `} />

                    {/* Show Toolbar on Hover or Active */}
                    <div className={`absolute top-0 right-0 z-50 transition-opacity duration-200 ${isActive || 'group-hover:opacity-100 opacity-0'}`}>
                        <FloatingToolbar
                            sectionId={section.id}
                            index={index}
                            total={totalSections}
                            onMove={onMove}
                            onDelete={onDelete}
                            onDuplicate={onDuplicate}
                        />
                    </div>
                </>
            )}

            <Component {...section.data} variant={section.variant} />
        </motion.section>
    );
};
