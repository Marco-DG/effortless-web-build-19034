import React, { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout, Grid, Type, Image, List, Phone, Star, Award, Calendar, Layers } from 'lucide-react';
import { AddSectionModal } from './AddSectionModal';

export const SectionManager: React.FC = () => {
    const { t } = useTranslation();
    const {
        activeProject,
        ui,
        reorderSections,
        toggleSection,
        deleteSection,
        addSection,
        setActiveSection
    } = useAppStore();
    const { activePageId } = ui;
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!activeProject || !activePageId) return null;

    const activePage = activeProject.pages.find(p => p.id === activePageId);
    if (!activePage) return null;

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        reorderSections(result.source.index, result.destination.index);
    };

    const handleAddSection = (type: string) => {
        addSection(type);
        setIsModalOpen(false);
    };

    // Helper to get icon based on category or name
    const getIcon = (type: string) => {
        const name = type.toLowerCase();
        if (name.includes('hero')) return Layout;
        if (name.includes('header')) return Layout;
        if (name.includes('footer')) return Layout;
        if (name.includes('grid')) return Grid;
        if (name.includes('gallery')) return Image;
        if (name.includes('menu')) return List;
        if (name.includes('contact')) return Phone;
        if (name.includes('testimonial')) return Star;
        if (name.includes('award')) return Award;
        if (name.includes('reservation')) return Calendar;
        return Type;
    };

    return (
        <div className="h-full w-full max-w-full flex flex-col bg-white animate-in fade-in slide-in-from-left-4 duration-300 overflow-hidden">
            {/* Header - Matching PageSettings structure */}
            <div className="p-4 border-b border-slate-100 flex-shrink-0">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-dashed border-blue-200 hover:border-blue-300 shadow-sm"
                >
                    <Plus size={16} />
                    {t('builder.addSection')}
                </button>
            </div>

            {/* Content Area - Fixed overflow and width issues */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-20 pt-6 min-w-0">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-3 h-3" /> {t('common.sections')}
                    </h3>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sections">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-3 min-w-0"
                                >
                                    {activePage.sections.map((section, index) => {
                                        const isLocked = section.type === 'header' || section.type === 'footer';
                                        const Icon = getIcon(section.type);
                                        const isActive = ui.activeSectionId === section.id;

                                        return (
                                            <Draggable key={section.id} draggableId={section.id} index={index} isDragDisabled={isLocked}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`
                                                            group relative flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-200 bg-white min-w-0 w-full max-w-full
                                                            ${snapshot.isDragging ? 'shadow-xl ring-2 ring-blue-500/20 rotate-2 z-50' : 'hover:border-blue-300 border-slate-200'}
                                                            ${isActive ? 'ring-2 ring-blue-500 border-transparent bg-blue-50/30' : ''}
                                                            ${!section.isEnabled ? 'opacity-60 grayscale-[0.5]' : ''}
                                                        `}
                                                        onClick={() => setActiveSection(section.id)}
                                                    >
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className={`
                                                                p-1 rounded-md transition-colors shrink-0
                                                                ${isLocked
                                                                    ? 'opacity-20 cursor-not-allowed'
                                                                    : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100 cursor-grab active:cursor-grabbing'
                                                                }
                                                            `}
                                                        >
                                                            <GripVertical className="w-3 h-3" />
                                                        </div>

                                                        <div className={`
                                                            w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 shrink-0
                                                            ${isActive
                                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                                                                : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                                                            }
                                                        `}>
                                                            <Icon size={14} strokeWidth={2} />
                                                        </div>

                                                        <div className="flex-1 min-w-0 py-0.5">
                                                            <div className={`
                                                                font-semibold text-xs tracking-tight mb-0.5 transition-colors truncate
                                                                ${isActive ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}
                                                            `}>
                                                                {t(`components.${section.type}.name`, { defaultValue: section.type.charAt(0).toUpperCase() + section.type.slice(1) })}
                                                            </div>
                                                            <div className="text-[10px] font-medium text-slate-400 truncate leading-tight">
                                                                {t(`components.${section.type}.description`, { defaultValue: '' })}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleSection(section.id);
                                                                }}
                                                                className={`
                                                                    p-1 rounded-md transition-all duration-200
                                                                    ${!section.isEnabled
                                                                        ? 'bg-slate-100 text-slate-500'
                                                                        : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                                                                    }
                                                                `}
                                                                title={section.isEnabled ? "Hide Section" : "Show Section"}
                                                            >
                                                                {section.isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (confirm(t('common.confirmDeleteSection'))) {
                                                                        deleteSection(section.id);
                                                                    }
                                                                }}
                                                                disabled={isLocked}
                                                                className={`
                                                                    p-1 rounded-md transition-all duration-200
                                                                    ${isLocked
                                                                        ? 'opacity-0 cursor-not-allowed'
                                                                        : 'hover:bg-red-50 text-slate-400 hover:text-red-600'
                                                                    }
                                                                `}
                                                                title="Delete Section"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>

            <AddSectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleAddSection}
                insertIndex={activePage.sections.length - 1}
            />
        </div>
    );
};
