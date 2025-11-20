import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store/app-store';
import { Plus, FileText, MoreVertical, Trash2, Edit2, Check, X, Settings, Globe } from 'lucide-react';
import { CleanSectionHeader } from '../../site-builder/components/forms';

export const PageManager: React.FC = () => {
    const { t } = useTranslation();
    const { activeProject, ui, setActivePage, addPage, deletePage, updatePage } = useAppStore();
    const { activePageId } = ui;

    const [isAdding, setIsAdding] = useState(false);
    const [newPageTitle, setNewPageTitle] = useState('');
    const [editingPageId, setEditingPageId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ title: '', slug: '', seoTitle: '', seoDesc: '' });

    if (!activeProject) return null;

    const handleAddPage = () => {
        if (!newPageTitle.trim()) return;
        const slug = '/' + newPageTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        addPage(newPageTitle, slug);
        setNewPageTitle('');
        setIsAdding(false);
    };

    const startEditing = (page: any) => {
        setEditingPageId(page.id);
        setEditForm({
            title: page.title,
            slug: page.slug,
            seoTitle: page.seo?.title || page.title,
            seoDesc: page.seo?.description || ''
        });
    };

    const saveEdit = () => {
        if (!editingPageId) return;
        updatePage(editingPageId, {
            title: editForm.title,
            slug: editForm.slug,
            seo: {
                title: editForm.seoTitle,
                description: editForm.seoDesc
            }
        });
        setEditingPageId(null);
    };

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-6 pb-2">
                <CleanSectionHeader
                    title={t('common.pages')}
                    description={t('common.managePages')}
                />
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-20 space-y-3">
                {activeProject.pages.map(page => {
                    const isActive = page.id === activePageId;
                    const isEditing = page.id === editingPageId;
                    const isHome = page.slug === '/';

                    if (isEditing) {
                        return (
                            <div key={page.id} className="p-4 border border-blue-500 rounded-lg bg-blue-50/50 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">{t('common.pageTitle')}</label>
                                    <input
                                        value={editForm.title}
                                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full p-2 border rounded bg-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">{t('common.urlSlug')}</label>
                                    <input
                                        value={editForm.slug}
                                        onChange={e => setEditForm({ ...editForm, slug: e.target.value })}
                                        className="w-full p-2 border rounded bg-white text-sm"
                                        disabled={isHome}
                                    />
                                </div>
                                <div className="pt-2 border-t border-blue-200">
                                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                        <Globe className="w-3 h-3" /> {t('common.seoTitle')}
                                    </label>
                                    <input
                                        value={editForm.seoTitle}
                                        onChange={e => setEditForm({ ...editForm, seoTitle: e.target.value })}
                                        className="w-full p-2 border rounded bg-white text-sm mb-2"
                                        placeholder={t('common.browserTabTitle')}
                                    />
                                    <label className="text-xs font-bold text-slate-500 uppercase">{t('common.seoDesc')}</label>
                                    <textarea
                                        value={editForm.seoDesc}
                                        onChange={e => setEditForm({ ...editForm, seoDesc: e.target.value })}
                                        className="w-full p-2 border rounded bg-white text-sm"
                                        rows={2}
                                        placeholder={t('common.searchEngineDesc')}
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button onClick={() => setEditingPageId(null)} className="p-2 text-slate-500 hover:bg-slate-200 rounded"><X className="w-4 h-4" /></button>
                                    <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">{t('common.save')}</button>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={page.id}
                            onClick={() => setActivePage(page.id)}
                            className={`
                                group relative flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                                ${isActive ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                            `}
                        >
                            <div className={`p-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                                <FileText className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className={`font-medium text-sm truncate ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                                    {page.title}
                                </div>
                                <div className="text-xs text-slate-400 truncate flex items-center gap-1">
                                    <Globe className="w-3 h-3" />
                                    {page.slug}
                                </div>
                            </div>

                            <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); startEditing(page); }}
                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                    title={t('common.pageSettings')}
                                >
                                    <Settings className="w-4 h-4" />
                                </button>
                                {!isHome && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm(t('common.confirmDeletePage'))) deletePage(page.id);
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                                        title={t('common.deletePage')}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {isAdding ? (
                    <div className="p-3 border border-dashed border-blue-300 rounded-lg bg-blue-50/30 animate-in fade-in slide-in-from-top-2">
                        <input
                            autoFocus
                            placeholder={t('common.pageNamePlaceholder')}
                            className="w-full p-2 text-sm border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newPageTitle}
                            onChange={(e) => setNewPageTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddPage()}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-200 rounded"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={handleAddPage}
                                className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {t('common.createPage')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        {t('common.addNewPage')}
                    </button>
                )}
            </div>
        </div>
    );
};
