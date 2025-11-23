import React, { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTranslation } from 'react-i18next';
import { GripVertical, Eye, EyeOff, Trash2, Plus, Layout, Grid, Type, Image, List, Phone, Star, Award, Calendar, ChevronDown, Check, FilePlus, FileText, Copy, Edit2 } from 'lucide-react';
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
        duplicatePage,
        deletePage,
        updatePage
    } = useAppStore();
    const { activePageId } = ui;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
    const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<{ id: string; title: string; slug: string } | null>(null);

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

    const handleEditPage = (e: React.MouseEvent, page: any) => {
        e.stopPropagation();
        setEditingPage({ id: page.id, title: page.title, slug: page.slug });
        setIsPageDropdownOpen(false);
    };

    const handleSavePage = (title: string, slug: string) => {
        if (editingPage) {
            updatePage(editingPage.id, { title, slug });
            setEditingPage(null);
        } else {
            addPage(title, slug);
        }
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
        <div className="w-full space-y-2">
            {/* Page Tree Structure */}
            <div className="relative">
                {/* Root Node / Page Selector */}
                <div className="relative z-20 mb-3">
                    <button
                        onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                        className={`
                            w-full flex items-center justify-between gap-2.5 py-2.5 px-3 rounded-[12px] border transition-all duration-200 font-geist shadow-sm
                            ${isPageDropdownOpen ? 'bg-slate-50 border-slate-300 shadow' : 'bg-white border-slate-200/60 hover:border-slate-300 hover:shadow'}
                        `}
                    >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="text-sm font-semibold text-slate-900 truncate tracking-[-0.01em]">{activePage.title || t('common.pageTitle')}</span>
                            <span className="text-[10px] font-medium text-slate-400 shrink-0">{activeProject.pages.indexOf(activePage) + 1}/{activeProject.pages.length}</span>
                        </div>
                        <ChevronDown size={16} className={`transition-transform duration-200 shrink-0 ${isPageDropdownOpen ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isPageDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsPageDropdownOpen(false)}
                            />
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200/60 shadow-2xl z-20 max-h-80 overflow-hidden animate-in fade-in zoom-in-95 duration-150 backdrop-blur-sm">
                                {/* Header */}
                                <div className="px-3 py-2 border-b border-slate-100">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('common.pages', { defaultValue: 'Pages' })}</span>
                                </div>

                                {/* Page List */}
                                <div className="py-1 max-h-64 overflow-y-auto">
                                    {activeProject.pages.map(page => (
                                        <div
                                            key={page.id}
                                            className={`
                                                group flex items-center gap-2.5 px-3 py-2.5 transition-colors relative
                                                ${page.id === activePageId ? 'bg-blue-50' : 'hover:bg-slate-50'}
                                            `}
                                        >
                                            <FileText size={16} className={`shrink-0 ${page.id === activePageId ? 'text-blue-600' : 'text-slate-400'}`} />

                                            <button
                                                onClick={() => handlePageSelect(page.id)}
                                                className="flex-1 text-left min-w-0"
                                            >
                                                <span className={`text-sm truncate block font-geist tracking-[-0.01em] ${page.id === activePageId ? 'text-blue-700 font-semibold' : 'text-slate-700'
                                                    }`}>
                                                    {page.title}
                                                </span>
                                            </button>

                                            {/* Inline Actions */}
                                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {/* Edit */}
                                                <button
                                                    onClick={(e) => handleEditPage(e, page)}
                                                    className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                                                    title="Edit Page Title"
                                                >
                                                    <Edit2 size={14} />
                                                </button>

                                                {/* Duplicate */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        duplicatePage(page.id);
                                                        setIsPageDropdownOpen(false);
                                                    }}
                                                    className="p-1.5 rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                                                    title="Duplicate Page"
                                                >
                                                    <Copy size={14} />
                                                </button>

                                                {/* Delete */}
                                                {activeProject.pages.length > 1 && (
                                                    <button
                                                        onClick={(e) => handleDeletePage(e, page.id)}
                                                        className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                                        title="Delete Page"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer: Add Page Button */}
                                <div className="p-2 border-t border-slate-100">
                                    <button
                                        onClick={() => {
                                            setIsPageDropdownOpen(false);
                                            setIsAddPageModalOpen(true);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                    >
                                        <Plus size={16} />
                                        {t('builder.addPage', { defaultValue: 'Create New Page' })}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Sections List */}
                <div className="relative space-y-1">
                    {/* Add Section Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center gap-2.5 py-2.5 px-3 rounded-[12px] border border-transparent hover:bg-slate-50 transition-all font-medium group"
                        >
                            <Plus size={20} strokeWidth={1.5} className="shrink-0 text-blue-600" />

                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 font-geist tracking-[-0.01em]">
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
                                                        <div
                                                            className={`
                                                                group relative flex items-center gap-2.5 py-2.5 px-3 rounded-[12px] transition-all duration-200 min-w-0 w-full max-w-full
                                                                ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500/10 rotate-1 z-50 bg-white' : 'hover:bg-slate-50'}
                                                                ${isActive ? 'bg-slate-50' : ''}
                                                                ${!section.isEnabled ? 'opacity-60 grayscale-[0.5]' : ''}
                                                            `}
                                                            onClick={() => setActiveSection(section.id)}
                                                        >
                                                            <Icon
                                                                size={20}
                                                                strokeWidth={1.5}
                                                                className={`shrink-0 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}
                                                            />

                                                            <div className="flex-1 min-w-0">
                                                                <div className={`
                                                                    text-sm font-medium truncate transition-colors font-geist tracking-[-0.01em]
                                                                    ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-700 group-hover:text-slate-900'}
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

                                                                {/* Drag Handle - moved to right */}
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    className={`
                                                                        p-0.5 rounded transition-colors shrink-0
                                                                        ${isLocked
                                                                            ? 'opacity-0 cursor-not-allowed'
                                                                            : 'text-slate-400 cursor-grab active:cursor-grabbing'
                                                                        }
                                                                    `}
                                                                >
                                                                    <GripVertical className="w-3 h-3" />
                                                                </div>
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
                isOpen={isAddPageModalOpen || editingPage !== null}
                onClose={() => {
                    setIsAddPageModalOpen(false);
                    setEditingPage(null);
                }}
                onAdd={handleSavePage}
                editMode={editingPage !== null}
                initialTitle={editingPage?.title}
                initialSlug={editingPage?.slug}
            />
        </div>
    );
};
