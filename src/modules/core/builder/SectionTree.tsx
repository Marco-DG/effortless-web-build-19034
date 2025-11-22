import React, { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout, Grid, Type, Image, List, Phone, Star, Award, Calendar } from 'lucide-react';
import { AddSectionModal } from './AddSectionModal';

interface SectionTreeProps {
    isExpanded: boolean;
}

export const SectionTree: React.FC<SectionTreeProps> = ({ isExpanded }) => {
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

    const renderSectionItem = (section: any, index: number, isDraggable: boolean, isTreeItem: boolean = true, provided?: any, snapshot?: any) => {
        const isLocked = section.type === 'header' || section.type === 'footer';
        const Icon = getIcon(section.type);
        const isActive = ui.activeSectionId === section.id;

        const content = (
            <div
                className={`
                    group relative flex items-center gap-2 p-2 rounded-md transition-colors duration-200 min-w-0 w-full max-w-full
                    ${snapshot?.isDragging ? 'shadow-xl ring-2 ring-blue-500/20 rotate-2 z-50 bg-white' : 'hover:bg-slate-50'}
                    ${isActive ? 'bg-slate-100 text-slate-900' : ''}
                    ${!section.isEnabled ? 'opacity-60 grayscale-[0.5]' : ''}
                `}
                onClick={() => setActiveSection(section.id)}
            >
                <div className={`
                    w-6 h-6 rounded flex items-center justify-center transition-all duration-300 shrink-0
                    ${isActive
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                        : 'bg-transparent text-slate-400'
                    }
                `}>
                    <Icon size={14} strokeWidth={2} />
                </div>

                <div className="flex-1 min-w-0 transition-transform duration-200">
                    <div className={`
                        text-sm font-medium truncate transition-colors
                        ${isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}
                    `}>
                        {t(`components.${section.type}.name`, { defaultValue: section.type.charAt(0).toUpperCase() + section.type.slice(1) })}
                    </div>
                </div>

                <div className={`flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0 ${!isExpanded ? 'hidden' : ''}`}>
                    {!isLocked && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSection(section.id);
                            }}
                            className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700"
                            title={section.isEnabled ? "Hide Section" : "Show Section"}
                        >
                            {section.isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>
                    )}
                    {!isLocked && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(t('common.confirmDeleteSection'))) {
                                    deleteSection(section.id);
                                }
                            }}
                            className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
                            title="Delete Section"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    )}
                </div>

                {isDraggable && provided && (
                    <div
                        {...provided.dragHandleProps}
                        className={`
                            p-0.5 rounded transition-colors shrink-0 ml-0.5
                            text-slate-400 hover:text-slate-700 cursor-grab active:cursor-grabbing
                            ${!isExpanded ? 'hidden' : ''}
                        `}
                    >
                        <GripVertical className="w-3 h-3" />
                    </div>
                )}
            </div>
        );

        if (isDraggable && provided) {
            return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="relative"
                >
                    {/* Horizontal Branch */}
                    {isTreeItem && <div className="absolute -left-1.5 top-1/2 w-3 h-px bg-slate-200" />}
                    {content}
                </div>
            );
        }

        return (
            <div className="relative">
                {/* Horizontal Branch */}
                {isTreeItem && <div className="absolute -left-1.5 top-1/2 w-3 h-px bg-slate-200" />}
                {content}
            </div>
        );
    };

    return (
        <div className="w-full space-y-2 px-2">
            {/* Page Tree Structure */}
            <div className="relative">
                {/* Root Node */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 mb-2">
                    <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <Layout size={14} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 truncate">
                        {activePage.title || t('common.pageTitle')}
                    </span>
                </div>

                {/* Tree Trunk */}
                <div className="absolute left-1.5 top-9 bottom-0 w-px bg-slate-200" />

                {/* Sections List */}
                <div className="pl-3 relative">
                    {/* Add Section Button */}
                    <div className="relative mb-2">
                        <div className="absolute -left-1.5 top-1/2 w-3 h-px bg-slate-200" />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center justify-start gap-2 p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all text-sm font-medium"
                        >
                            <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                <Plus size={16} />
                            </div>
                            {t('builder.addSection')}
                        </button>
                    </div>

                    {/* All Sections (Draggable) */}
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sidebar-sections">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="min-w-0"
                                >
                                    {activePage.sections.map((section, index) => {
                                        const isLocked = section.type === 'header' || section.type === 'footer';
                                        return (
                                            <Draggable
                                                key={section.id}
                                                draggableId={section.id}
                                                index={index}
                                                isDragDisabled={isLocked}
                                            >
                                                {(provided, snapshot) => renderSectionItem(section, index, !isLocked, true, provided, snapshot)}
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
                insertIndex={activePage.sections.length}
            />
        </div>
    );
};
