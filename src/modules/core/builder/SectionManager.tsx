import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useAppStore } from '../../../store/app-store';
import { getAllSchemas } from './registry';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout, Layers, Grid } from 'lucide-react';
import { CleanSectionHeader } from '../../site-builder/components/forms';

export const SectionManager: React.FC = () => {
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

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-6 pb-4">
                <CleanSectionHeader
                    title="Page Structure"
                    description="Manage layout and add content."
                />

                {/* Tab Switcher */}
                <div className="flex p-1 bg-slate-100 rounded-lg mt-4">
                    <button
                        onClick={() => setActiveTab('structure')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'structure' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Layers size={16} />
                        Layers
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'add' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Grid size={16} />
                        Components
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

                                                        <div className="flex-1 min-w-0">
                                                            <div className="font-medium text-sm text-slate-700 truncate">
                                                                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                                                            </div>
                                                            <div className="text-xs text-slate-400 truncate">
                                                                {section.id}
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
                                                                    if (confirm('Are you sure you want to delete this section?')) {
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
                            Add Section
                        </button>
                    </DragDropContext>
                ) : (
                    /* Add Components View */
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 gap-3">
                            {availableComponents.map((schema) => (
                                <button
                                    key={schema.id}
                                    onClick={() => {
                                        addSection(schema.id.replace('-schema', ''));
                                        setActiveTab('structure'); // Switch back to structure after adding
                                    }}
                                    className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left group"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors flex-shrink-0">
                                        <Layout className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-800 group-hover:text-blue-700 mb-1">
                                            {schema.name}
                                        </div>
                                        <div className="text-xs text-slate-500 leading-relaxed">
                                            {schema.description}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
