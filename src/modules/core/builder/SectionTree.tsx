import React, { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout, Grid, Type, Image, List, Phone, Star, Award, Calendar, ChevronDown, Check, FilePlus } from 'lucide-react';
import { AddSectionModal } from './AddSectionModal';
import { AddPageModal } from './AddPageModal';

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
        setActiveSection,
        setActivePage,
        addPage,
        deletePage
    } = useAppStore();
    const { activePageId } = ui;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
    const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);

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

    const handlePageSelect = (pageId: string) => {
        setActivePage(pageId);
        setIsPageDropdownOpen(false);
    };

    const handleAddPage = (title: string, slug: string) => {
        addPage(title, slug);
        setIsAddPageModalOpen(false);
    };

    const handleDeletePage = (e: React.MouseEvent, pageId: string) => {
        e.stopPropagation();
        if (confirm(t('common.confirmDeletePage', { defaultValue: 'Are you sure you want to delete this page?' }))) {
            deletePage(pageId);
        }
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
                {/* Root Node / Page Selector */}
                <div className="relative z-20 mb-2 -ml-3 w-[calc(100%+1.5rem)]">
                    <button
                        onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                        className={`
                            w-full flex items-center gap-2 p-2 pl-3 rounded-lg border transition-all duration-200
                            ${isPageDropdownOpen ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/10' : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white'}
                        `}
                    >
                        <div className={`
                            w-6 h-6 rounded bg-white border flex items-center justify-center shrink-0 transition-colors
                            ${isPageDropdownOpen ? 'border-blue-200 text-blue-500' : 'border-slate-200 text-slate-400'}
                        `}>
                            <Layout size={12} />
                        </div>
                        <span className={`text-sm font-semibold truncate flex-1 text-left ${isPageDropdownOpen ? 'text-blue-700' : 'text-slate-700'}`}>
                            {activePage.title || t('common.pageTitle')}
                        </span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isPageDropdownOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isPageDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsPageDropdownOpen(false)}
                            />
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-slate-200 shadow-xl z-20 py-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 flex flex-col">
                                <div className="px-2 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                                    <span>{t('common.pages', { defaultValue: 'Pages' })}</span>
                                    <button
                                        onClick={() => {
                                            setIsPageDropdownOpen(false);
                                            setIsAddPageModalOpen(true);
                                        }}
                                        className="p-1 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                                        title={t('builder.addPage', { defaultValue: 'Add Page' })}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {activeProject.pages.map(page => (
                                        <button
                                            key={page.id}
                                            onClick={() => handlePageSelect(page.id)}
                                            className={`
                                                w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors group
                                                ${page.id === activePageId ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                                            `}
                                        >
                                            <div className={`w-1.5 h-1.5 rounded-full ${page.id === activePageId ? 'bg-blue-500' : 'bg-transparent'}`} />
                                            <span className="truncate flex-1 text-left">{page.title}</span>

                                            {activeProject.pages.length > 1 && (
                                                <div
                                                    onClick={(e) => handleDeletePage(e, page.id)}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 text-slate-400 hover:text-red-600 rounded transition-all"
                                                    title="Delete Page"
                                                >
                                                    <Trash2 size={12} />
                                                </div>
                                            )}

                                            {page.id === activePageId && <Check size={14} className="text-blue-500" />}
                                        </button>
                                    ))}
                                </div>
                                <div className="p-1 border-t border-slate-100 mt-1">
                                    <button
                                        onClick={() => {
                                            setIsPageDropdownOpen(false);
                                            setIsAddPageModalOpen(true);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                                    >
                                        <FilePlus size={14} />
                                        {t('builder.addPage', { defaultValue: 'Create New Page' })}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Sections List */}
                <div className="pl-0 relative space-y-1">
                    {/* Add Section Button */}
                    <div className="relative mb-2">
                        {/* Vertical Line for Add Section */}
                        <div
                            className="absolute -left-3 w-px bg-slate-300/70"
                            style={{
                                top: '-24px', // Connect to Root Node
                                bottom: activePage.sections.length > 0 ? '0' : '50%'
                            }}
                        />
                        <div className="absolute -left-3 top-1/2 w-3 h-px bg-slate-300/70" />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center gap-2 p-1.5 rounded-md border border-transparent text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm font-medium group"
                        >
                            {/* Spacer to align with DragHandle */}
                            <div className="w-4 h-4 shrink-0" />

                            <button
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shrink-0"
                                title={t('builder.addSection')}
                            >
                                <Plus size={16} />
                            </button>

                            <span className="text-sm font-medium text-blue-600">
                                {t('builder.addSection')}
                            </span>
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
                                                            className="absolute -left-3 w-px bg-slate-300/70"
                                                            style={{
                                                                top: '-10px', // Connect to previous item
                                                                bottom: isLast ? '50%' : '0'
                                                            }}
                                                        />

                                                        {/* Horizontal Branch */}
                                                        <div className="absolute -left-3 top-1/2 w-3 h-px bg-slate-300/70" />

                                                        <div
                                                            className={`
                                                                group relative flex items-center gap-2 p-1.5 rounded-md transition-all duration-200 min-w-0 w-full max-w-full
                                                                ${snapshot.isDragging ? 'shadow-xl ring-2 ring-blue-500/20 rotate-2 z-50 bg-white' : 'hover:ring-1 hover:ring-slate-300/50 hover:bg-slate-50/50 hover:shadow-sm'}
                                                                ${isActive ? 'bg-white ring-1 ring-blue-500/30 shadow-sm shadow-blue-500/10' : ''}
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
                                                                w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300 shrink-0 border
                                                                ${isActive
                                                                    ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm'
                                                                    : 'bg-gradient-to-br from-white to-slate-50 border-slate-200/60 text-slate-700 group-hover:border-slate-300 group-hover:text-slate-800 group-hover:shadow-sm'
                                                                }
                                                            `}>
                                                                <Icon size={14} strokeWidth={1.5} />
                                                            </div>

                                                            <div className="flex-1 min-w-0 transition-transform duration-200">
                                                                <div className={`
                                                                    text-sm font-medium truncate transition-colors font-geist tracking-[-0.01em]
                                                                    ${isActive ? 'text-slate-950 font-semibold' : 'text-slate-700 group-hover:text-slate-900'}
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
            <AddPageModal
                isOpen={isAddPageModalOpen}
                onClose={() => setIsAddPageModalOpen(false)}
                onAdd={handleAddPage}
            />
        </div>
    );
};
