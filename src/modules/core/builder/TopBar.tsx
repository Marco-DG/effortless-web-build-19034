import React, { useState } from 'react';
import { useAppStore } from '../../../store/app-store';
import {
    ChevronDown,
    Plus,
    Monitor,
    Tablet,
    Smartphone,
    Eye,
    UploadCloud,
    Menu,
    X
} from 'lucide-react';

export const TopBar: React.FC = () => {
    const {
        activeProject,
        ui,
        setActivePage,
        addPage,
        togglePreview,
        toggleSidebar
    } = useAppStore();

    const [isPageMenuOpen, setIsPageMenuOpen] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [isAddingPage, setIsAddingPage] = useState(false);

    if (!activeProject) return null;

    const activePage = activeProject.pages.find(p => p.id === ui.activePageId) || activeProject.pages[0];

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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-50 relative shadow-sm">
            {/* Left: Logo & Page Selector */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        E
                    </div>
                    <span className="font-bold text-slate-900 hidden md:block">Effortless</span>
                </div>

                <div className="h-6 w-[1px] bg-slate-200 mx-2" />

                {/* Page Selector Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsPageMenuOpen(!isPageMenuOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all"
                    >
                        <span className="text-sm font-medium text-slate-700">
                            {activePage?.title || 'Select Page'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                            {activePage?.slug}
                        </span>
                        <ChevronDown size={14} className="text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isPageMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
                                {activeProject.pages.map(page => (
                                    <button
                                        key={page.id}
                                        onClick={() => {
                                            setActivePage(page.id);
                                            setIsPageMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${page.id === ui.activePageId
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span>{page.title}</span>
                                        <span className="text-xs opacity-50">{page.slug}</span>
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
                                            <Plus size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingPage(false)}
                                            className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-md"
                                        >
                                            <X size={16} />
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

            {/* Center: Device Toggles (Visual Only for now) */}
            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg">
                <button className="p-1.5 rounded-md bg-white shadow-sm text-slate-700">
                    <Monitor size={16} />
                </button>
                <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white/50 transition-all">
                    <Tablet size={16} />
                </button>
                <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white/50 transition-all">
                    <Smartphone size={16} />
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={togglePreview}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                    <Eye size={16} />
                    <span className="hidden sm:inline">Preview</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm">
                    <UploadCloud size={16} />
                    <span className="hidden sm:inline">Publish</span>
                </button>
            </div>
        </header>
    );
};
