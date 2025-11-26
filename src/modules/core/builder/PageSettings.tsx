import React, { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import { CleanSectionHeader } from '../../../components/forms';
import { Globe, Type, Palette, Building2, Layout, ChevronDown, Plus, Trash2, Check, X } from 'lucide-react';

export const PageSettings: React.FC = () => {
    const { activeProject, ui, updatePage, setActiveSection, setActivePage, addPage, deletePage } = useAppStore();
    const { activePageId } = ui;
    const [isPageMenuOpen, setIsPageMenuOpen] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [isAddingPage, setIsAddingPage] = useState(false);

    if (!activeProject || !activePageId) return null;

    const activePage = activeProject.pages.find(p => p.id === activePageId);
    if (!activePage) return null;

    const isHome = activePage.slug === '/';

    const handleAddPage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPageName.trim()) {
            const slug = `/${newPageName.toLowerCase().replace(/\s+/g, '-')}`;
            addPage(newPageName, slug);
            setNewPageName('');
            setIsAddingPage(false);
            setIsPageMenuOpen(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Page Selector Header */}
            <div className="p-4 border-b border-slate-100">
                <div className="relative">
                    <button
                        onClick={() => setIsPageMenuOpen(!isPageMenuOpen)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-blue-300 transition-colors">
                                <Globe className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-slate-900 text-sm">{activePage.title}</div>
                                <div className="text-xs text-slate-500 font-mono">{activePage.slug}</div>
                            </div>
                        </div>
                        <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600" />
                    </button>

                    {/* Dropdown */}
                    {isPageMenuOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                                {activeProject.pages.map(page => (
                                    <button
                                        key={page.id}
                                        onClick={() => {
                                            setActivePage(page.id);
                                            setIsPageMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${page.id === activePageId
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span>{page.title}</span>
                                        {page.slug === '/' && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">HOME</span>}
                                    </button>
                                ))}
                            </div>

                            <div className="p-2 border-t border-slate-100 bg-slate-50">
                                {isAddingPage ? (
                                    <form onSubmit={handleAddPage} className="flex items-center gap-2">
                                        <input
                                            autoFocus
                                            value={newPageName}
                                            onChange={(e) => setNewPageName(e.target.value)}
                                            placeholder="Page Name"
                                            className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newPageName.trim()}
                                            className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            <Check size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingPage(false)}
                                            className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-md"
                                        >
                                            <X size={14} />
                                        </button>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setIsAddingPage(true)}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-dashed border-blue-200 hover:border-blue-300"
                                    >
                                        <Plus size={14} />
                                        Create New Page
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-20 space-y-8 pt-6">
                {/* SEO & Metadata */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Globe className="w-3 h-3" /> SEO & Metadata
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Page Title</label>
                            <input
                                value={activePage.title}
                                onChange={(e) => updatePage(activePageId, { title: e.target.value })}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Slug</label>
                                <input
                                    value={activePage.slug}
                                    onChange={(e) => updatePage(activePageId, { slug: e.target.value })}
                                    disabled={isHome}
                                    className={`w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm ${isHome ? 'opacity-50 cursor-not-allowed' : 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'} transition-all`}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Browser Title</label>
                                <input
                                    value={activePage.seoTitle || ''}
                                    onChange={(e) => updatePage(activePageId, { seoTitle: e.target.value })}
                                    placeholder={activePage.title}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                            <textarea
                                value={activePage.seoDesc || ''}
                                onChange={(e) => updatePage(activePageId, { seoDesc: e.target.value })}
                                rows={3}
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                                placeholder="Brief description for search engines..."
                            />
                        </div>
                    </div>
                </section>

                <hr className="border-slate-100" />

                {/* Global Settings Shortcuts */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Palette className="w-3 h-3" /> Global Design
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={() => setActiveSection('theme_editor')}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                        >
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <Type className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <div className="font-medium text-sm text-slate-700 group-hover:text-purple-700">Typography & Colors</div>
                                <div className="text-xs text-slate-400">Edit global theme styles</div>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveSection('business_info')}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                        >
                            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                                <Building2 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="font-medium text-sm text-slate-700 group-hover:text-emerald-700">Business Info</div>
                                <div className="text-xs text-slate-400">Contact details & social links</div>
                            </div>
                        </button>
                    </div>
                </section>

                <hr className="border-slate-100" />

                {/* Quick Structure Access */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Layout className="w-3 h-3" /> Page Layout
                    </h3>
                    <button
                        onClick={() => setActiveSection('structure_manager')}
                        className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:border-blue-500 hover:shadow-sm transition-all text-left group"
                    >
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">Manage Sections</span>
                        <span className="text-xs bg-white px-2 py-1 rounded border border-slate-200 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-500">
                            {activePage.sections.length} Sections
                        </span>
                    </button>
                </section>

                {!isHome && (
                    <>
                        <hr className="border-slate-100" />
                        <section>
                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this page?')) {
                                        deletePage(activePageId);
                                    }
                                }}
                                className="w-full flex items-center justify-center gap-2 p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-sm font-medium"
                            >
                                <Trash2 size={16} />
                                Delete Page
                            </button>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};
