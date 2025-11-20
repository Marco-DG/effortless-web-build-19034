import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store/app-store';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout, Grid, Type, Image, List, Phone, Star, Award, Calendar } from 'lucide-react';
import { CleanSectionHeader } from '../../site-builder/components/forms';
import { AddSectionModal } from './AddSectionModal';

export const SectionManager: React.FC = () => {
    const { t } = useTranslation();
    const {
        activeProject,
        reorderSections,
        toggleSection,
        deleteSection,
        addSection,
        setActiveSection,
        ui
    } = useAppStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!activeProject) return null;

    // Get active page
    const activePage = activeProject.pages?.find(p => p.id === ui.activePageId) || activeProject.pages?.[0];
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
        <div className="h-full w-full max-w-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2.5 transition-all font-medium shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-geist tracking-wide">{t('builder.addSection')}</span>
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 w-full">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="sections">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex flex-col gap-3 w-full"
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
                                                        group relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 bg-white w-full max-w-full
                                                        ${snapshot.isDragging ? 'shadow-xl ring-2 ring-blue-500/20 rotate-2 z-50' : 'hover:border-blue-300 border-slate-200'}
                                                        ${isActive ? 'ring-2 ring-blue-500 border-transparent bg-blue-50/30' : ''}
                                                        ${!section.isEnabled ? 'opacity-60 grayscale-[0.5]' : ''}
                                                    `}
                                                    onClick={() => setActiveSection(section.id)}
                                                >
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className={`
                                                            p-1.5 rounded-lg transition-colors shrink-0
                                                            ${isLocked
                                                                ? 'opacity-20 cursor-not-allowed'
                                                                : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100 cursor-grab active:cursor-grabbing'
                                                            }
                                                        `}
                                                    >
                                                        <GripVertical className="w-4 h-4" />
                                                    </div>

                                                    <div className={`
                                                        w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0
                                                        ${isActive
                                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                                                            : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                                                        }
                                                    `}>
                                                        <Icon size={18} strokeWidth={2} />
                                                    </div>

                                                    <div className="flex-1 min-w-0 py-0.5">
                                                        <div className={`
                                                            font-bold text-sm tracking-tight mb-0.5 transition-colors truncate
                                                            ${isActive ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}
                                                        `}>
                                                            {t(`components.${section.type}.name`, { defaultValue: section.type.charAt(0).toUpperCase() + section.type.slice(1) })}
                                                        </div>
                                                        <div className="text-[11px] font-medium text-slate-400 truncate">
                                                            {t(`components.${section.type}.description`, { defaultValue: '' })}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleSection(section.id);
                                                            }}
                                                            className={`
                                                                p-1.5 rounded-md transition-all duration-200
                                                                ${!section.isEnabled
                                                                    ? 'bg-slate-100 text-slate-500'
                                                                    : 'hover:bg-slate-100 text-slate-400 hover:text-slate-700'
                                                                }
                                                            `}
                                                            title={section.isEnabled ? "Hide Section" : "Show Section"}
                                                        >
                                                            {section.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
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
                                                                p-1.5 rounded-md transition-all duration-200
                                                                ${isLocked
                                                                    ? 'opacity-0 cursor-not-allowed'
                                                                    : 'hover:bg-red-50 text-slate-400 hover:text-red-600'
                                                                }
                                                            `}
                                                            title="Delete Section"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
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

            <AddSectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleAddSection}
                insertIndex={activePage.sections.length - 1}
            />
        </div>
    );
};
