import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useAppStore } from '../../../store/app-store';
import { getAllSchemas } from './registry';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout } from 'lucide-react';
import { CleanSectionHeader } from '../../site-builder/components/forms';

export const SectionManager: React.FC = () => {
    const {
        activeProject,
        reorderSections,
        toggleSection,
        removeSection,
        addSection,
        setActiveSection,
        ui
    } = useAppStore();

    const [isAdding, setIsAdding] = useState(false);

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
        <div className="h-full flex flex-col">
            <div className="p-6 pb-2">
                <CleanSectionHeader
                    title="Page Structure"
                    description="Drag to reorder, toggle visibility, or add new sections."
                />
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-20">
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
                                                                    removeSection(section.id);
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
                </DragDropContext>

                <div className="mt-6">
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Section
                    </button>
                </div>

                {isAdding && (
                    <div className="mt-4 grid grid-cols-1 gap-2 animate-in slide-in-from-top-2">
                        {availableComponents.map((schema) => (
                            <button
                                key={schema.id}
                                onClick={() => {
                                    addSection(schema.id.replace('-schema', '')); // Assuming schema id might have suffix, or just use type logic
                                    setIsAdding(false);
                                }}
                                className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left group"
                            >
                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                    <Layout className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-slate-700 group-hover:text-blue-700">
                                        {schema.name}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        {schema.description}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
