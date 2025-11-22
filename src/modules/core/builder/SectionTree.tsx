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



    return (
        <div className="w-full space-y-2 px-2">
            {/* Page Tree Structure */}
            <div className="relative">
                {/* Root Node */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 mb-2">
                    <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                        <Layout size={12} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 truncate">
                        {activePage.title || t('common.pageTitle')}
                    </span>
                </div>

                {/* Sections List */}
                <div className="pl-8 relative space-y-1">
                    {/* Add Section Button */}
                    <div className="relative mb-2">
                        {/* Vertical Line for Add Section */}
                        <div
                            className="absolute -left-3 w-px bg-slate-200"
                            style={{
                                top: '-24px', // Connect to Root Node
                                bottom: activePage.sections.length > 0 ? '0' : '50%'
                            }}
                        />
                        <div className="absolute -left-3 top-1/2 w-3 h-px bg-slate-200" />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center gap-2 p-1.5 rounded-md border border-transparent text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all text-xs font-medium"
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                <Plus size={12} />
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
                                    className="space-y-1 min-w-0"
                                >
                                    {activePage.sections.map((section, index) => {
                                        const isLocked = section.type === 'header' || section.type === 'footer';
                                        const Icon = getIcon(section.type);
                                        const isActive = ui.activeSectionId === section.id;
                                        const isLast = index === activePage.sections.length - 1;

                                        return (
                                            <Draggable
                                                key={section.id}
                                                draggableId={section.id}
                                                index={index}
                                                isDragDisabled={isLocked}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className="relative"
                                                    >
                                                        {/* Vertical Line */}
                                                        <div
                                                            className="absolute -left-3 w-px bg-slate-200"
                                                            style={{
                                                                top: '-10px', // Connect to previous item
                                                                bottom: isLast ? '50%' : '0'
                                                            }}
                                                        />

                                                        {/* Horizontal Branch */}
                                                        <div className="absolute -left-3 top-1/2 w-3 h-px bg-slate-200" />

                                                        <div
                                                            className={`
                                                                group relative flex items-center gap-2 p-1.5 rounded-md border transition-all duration-200 min-w-0 w-full max-w-full
                                                                ${snapshot.isDragging ? 'shadow-xl ring-2 ring-blue-500/20 rotate-2 z-50 bg-white' : 'hover:border-blue-300 border-transparent hover:bg-slate-50'}
                                                                ${isActive ? 'bg-blue-50 border-blue-200' : ''}
                                                                ${!section.isEnabled ? 'opacity-60 grayscale-[0.5]' : ''}
                                                            `}
                                                            onClick={() => setActiveSection(section.id)}
                                                        >
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                className={`
                                                                    p-0.5 rounded transition-colors shrink-0
                                                                    ${isLocked
                                                                        ? 'opacity-0 cursor-not-allowed'
                                                                        : 'text-slate-300 hover:text-slate-600 cursor-grab active:cursor-grabbing'
                                                                    }
                                                                `}
                                                            >
                                                                <GripVertical className="w-3 h-3" />
                                                            </div>

                                                            <div className={`
                                                                w-6 h-6 rounded flex items-center justify-center transition-all duration-300 shrink-0
                                                                ${isActive
                                                                    ? 'bg-blue-100 text-blue-600'
                                                                    : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-sm'
                                                                }
                                                            `}>
                                                                <Icon size={12} strokeWidth={2} />
                                                            </div>

                                                            <div className="flex-1 min-w-0 transition-transform duration-200">
                                                                <div className={`
                                                                    text-xs font-medium truncate transition-colors
                                                                    ${isActive ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-900'}
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
                insertIndex={activePage.sections.length}
            />
        </div>
    );
};
