import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { X, FilePlus } from 'lucide-react';

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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <FilePlus className="w-5 h-5 text-blue-600" />
                            {editMode
                                ? t('builder.editPage', { defaultValue: 'Edit Page' })
                                : t('builder.addPage', { defaultValue: 'Add New Page' })
                            }
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {t('common.pageTitle', { defaultValue: 'Page Title' })}
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="e.g. About Us"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {t('common.slug', { defaultValue: 'URL Slug' })}
                        </label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="e.g. /about-us"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-slate-600 bg-slate-50"
                            required
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {t('common.cancel', { defaultValue: 'Cancel' })}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                        >
                            {editMode
                                ? t('common.save', { defaultValue: 'Save Changes' })
                                : t('common.create', { defaultValue: 'Create Page' })
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
