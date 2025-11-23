import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { X, FilePlus, FileText } from 'lucide-react';

interface AddPageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, slug: string) => void;
    editMode?: boolean;
    initialTitle?: string;
    initialSlug?: string;
}

export const AddPageModal: React.FC<AddPageModalProps> = ({
    isOpen,
    onClose,
    onAdd,
    editMode = false,
    initialTitle = '',
    initialSlug = ''
}) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState(initialTitle);
    const [slug, setSlug] = useState(initialSlug);

    // Reset values when props change (e.g., opening for edit vs create)
    React.useEffect(() => {
        setTitle(initialTitle);
        setSlug(initialSlug);
    }, [initialTitle, initialSlug, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && slug) {
            onAdd(title, slug);
            setTitle('');
            setSlug('');
            onClose();
        }
    };

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        const newSlug = '/' + newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        setSlug(newSlug);
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">

                {/* Header - exact copy of section header style */}
                <div className="px-10 py-8 border-b border-slate-200/30 bg-white/40 backdrop-blur-xl">
                    <div className="flex items-start gap-5">
                        {/* Icon with neutral gradient - matching section headers exactly */}
                        <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-white via-slate-50 to-slate-100/80 border border-slate-200/50 flex items-center justify-center shadow-lg shadow-slate-900/8 backdrop-blur-sm">
                            <FileText className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                        </div>

                        {/* Title and subtitle */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-[-0.02em] font-geist leading-tight mb-2">
                                {editMode
                                    ? t('builder.editPage', { defaultValue: 'Edit Page' })
                                    : t('builder.addPage', { defaultValue: 'Add New Page' })
                                }
                            </h2>
                            <p className="text-sm text-slate-500 font-medium font-geist tracking-[-0.01em] leading-relaxed">
                                {editMode
                                    ? 'Modifica titolo e URL della pagina'
                                    : 'Definisci titolo e URL della tua nuova pagina'
                                }
                            </p>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form id="page-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-5 bg-gradient-to-b from-slate-50/30 to-white">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2 font-geist tracking-[-0.01em]">
                            {t('common.pageTitle', { defaultValue: 'Page Title' })}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="e.g. About Us"
                            className="w-full px-4 py-3 border border-slate-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 text-sm font-geist bg-white shadow-sm hover:border-slate-300 transition-colors"
                            autoFocus
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-900 mb-2 font-geist tracking-[-0.01em]">
                            {t('common.slug', { defaultValue: 'URL Slug' })}
                        </label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="e.g. /about-us"
                            className="w-full px-4 py-3 border border-slate-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 font-mono text-sm text-slate-600 bg-slate-50/50 font-geist shadow-sm hover:border-slate-300 transition-colors"
                            required
                        />
                    </div>
                </form>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-slate-200/60 bg-slate-50/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white hover:text-slate-900 rounded-lg transition-colors font-geist border border-slate-200"
                    >
                        {t('common.cancel', { defaultValue: 'Cancel' })}
                    </button>
                    <button
                        type="submit"
                        form="page-form"
                        className="px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all font-geist"
                    >
                        {editMode
                            ? t('common.save', { defaultValue: 'Save Changes' })
                            : t('common.create', { defaultValue: 'Create Page' })}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
