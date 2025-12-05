import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { getAllSchemas } from './registry';
import { X, Layout, Type, Image, Grid as GridIcon, List, Phone, Star, Award, Calendar, Layers } from 'lucide-react';

interface AddSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: string) => void;
    insertIndex: number;
}

export const AddSectionModal: React.FC<AddSectionModalProps> = ({ isOpen, onClose, onSelect, insertIndex }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const schemas = getAllSchemas();

    // Helper to get icon based on category or name
    const getIcon = (schema: any) => {
        const name = schema.name.toLowerCase();
        if (name.includes('hero')) return Layout;
        if (name.includes('header')) return Layout;
        if (name.includes('footer')) return Layout;
        if (name.includes('grid')) return GridIcon;
        if (name.includes('gallery')) return Image;
        if (name.includes('menu')) return List;
        if (name.includes('contact')) return Phone;
        if (name.includes('testimonial')) return Star;
        if (name.includes('award')) return Award;
        if (name.includes('reservation')) return Calendar;
        return Type;
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">

                {/* Header - exact copy of section header style */}
                <div className="px-10 py-8 border-b border-slate-200/30 bg-white/40 backdrop-blur-xl">
                    <div className="flex items-start gap-5">
                        {/* Icon with neutral gradient - matching section headers exactly */}
                        <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-white via-slate-50 to-slate-100/80 border border-slate-200/50 flex items-center justify-center shadow-lg shadow-slate-900/8 backdrop-blur-sm">
                            <Layers className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                        </div>

                        {/* Title and subtitle */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-[-0.02em] font-geist leading-tight mb-2">{t('builder.addSection')}</h2>
                            <p className="text-sm text-slate-500 font-medium font-geist tracking-[-0.01em] leading-relaxed">{t('builder.chooseComponent')}</p>
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

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {schemas.map((schema) => {
                            const Icon = getIcon(schema);
                            const componentId = schema.id.replace('-schema', '');
                            return (
                                <button
                                    key={schema.id}
                                    onClick={() => onSelect(componentId)}
                                    className="flex flex-col items-start p-4 bg-white border border-slate-200/60 rounded-[12px] hover:border-slate-300 hover:shadow-sm hover:bg-slate-50 transition-all group text-left h-full"
                                >
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-slate-100 transition-colors">
                                        <Icon className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-900 mb-1 font-geist tracking-[-0.01em] group-hover:text-slate-950">
                                        {t(`components.${componentId}.name`, { defaultValue: schema.name })}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed font-geist">
                                        {t(`components.${componentId}.description`, { defaultValue: schema.description })}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
