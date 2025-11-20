import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store/app-store';
import { getAllSchemas } from './registry';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout, Layers, Grid, Type, Image, List, Phone, Star, Award, Calendar } from 'lucide-react';
import { CleanSectionHeader } from '../../site-builder/components/forms';

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

    const [activeTab, setActiveTab] = useState<'structure' | 'add'>('structure');

    if (!activeProject) return null;

    // Get active page
    const activePage = activeProject.pages?.find(p => p.id === ui.activePageId) || activeProject.pages?.[0];
    if (!activePage) return null;

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        reorderSections(result.source.index, result.destination.index);
    };

    const availableComponents = getAllSchemas();

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
        <div className="h-full flex flex-col bg-white">
            <div className="p-6 pb-4">
                <CleanSectionHeader
                    title={t('builder.pageStructure')}
                    description={t('builder.pageStructureDesc')}
                />

                {/* Tab Switcher */}
                <div className="flex p-1 bg-slate-100 rounded-lg mt-4">
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'structure' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Layers size={16} />
                        {t('common.layers')}
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'add' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Grid size={16} />
                        {t('builder.components')}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-20">
                {activeTab === 'structure' ? (
                    /* Structure View */
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="sections">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-2"
                                >
                                    {activePage.sections.map((section, index) => {
                                        const isLocked = section.type === 'header' || section.type === 'footer';
                                        const Icon = getIcon(section.type);

                                        return (
                                            <Draggable key={section.id} draggableId={section.id} index={index} isDragDisabled={isLocked}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`
                                                            flex items-center gap-3 p-3 rounded-lg border transition-all bg-white
                                                            ${snapshot.isDragging ? 'shadow-lg border-blue-500 scale-105 z-50' : 'border-slate-200 hover:border-slate-300'}
                                                            ${ui.activeSectionId === section.id ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}
                                                            ${!section.isEnabled ? 'opacity-60 bg-slate-50' : ''}
                                                        `}
                                                        onClick={() => setActiveSection(section.id)}
                                                    >
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className={`p-1 ${isLocked ? 'opacity-20 cursor-not-allowed' : 'text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing'}`}
                                                        >
                                                            <GripVertical className="w-4 h-4" />
                                                        </div>

                                                        <div className="w-8 h-8 bg-slate-50 rounded flex items-center justify-center text-slate-400">
                                                            <Icon size={16} />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-sm text-slate-700 truncate">
                                                                {t(`components.${section.type}.name`, { defaultValue: section.type.charAt(0).toUpperCase() + section.type.slice(1) })}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleSection(section.id);
                                                                }}
                                                                className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${!section.isEnabled ? 'text-slate-400' : 'text-slate-600'}`}
                                                                title={section.isEnabled ? "Hide Section" : "Show Section"}
                                                            >
                                                                {section.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (confirm(t('common.confirmDeleteSection'))) {
                                                                        deleteSection(section.id);
                                                                    }
                                                                }}
                                                                disabled={isLocked}
                                                                className={`p-1.5 rounded transition-colors ${isLocked ? 'opacity-20 cursor-not-allowed text-slate-300' : 'hover:bg-red-50 text-slate-400 hover:text-red-500'}`}
                                                                title={isLocked ? "Cannot delete core section" : "Delete Section"}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
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

                        {/* Quick Add Button at bottom of list */}
                        <button
                            onClick={() => setActiveTab('add')}
                            className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            {t('builder.addSection')}
                        </button>
                    </DragDropContext>
                ) : (
                    /* Add Components View */
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 gap-3">
                            {availableComponents.map((schema) => {
                                const componentId = schema.id.replace('-schema', '');
                                return (
                                    <button
                                        key={schema.id}
                                        onClick={() => {
                                            addSection(componentId);
                                            setActiveTab('structure'); // Switch back to structure after adding
                                        }}
                                        className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left group"
                                    >
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors flex-shrink-0">
                                            <Layout className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-800 group-hover:text-blue-700 mb-1">
                                                {t(`components.${componentId}.name`, { defaultValue: schema.name })}
                                            </div>
                                            <div className="text-xs text-slate-500 leading-relaxed">
                                                {t(`components.${componentId}.description`, { defaultValue: schema.description })}
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
