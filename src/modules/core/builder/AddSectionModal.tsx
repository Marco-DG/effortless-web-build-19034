import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { getAllSchemas } from './registry';
import { X, Layout, Type, Image, Grid, List, Phone, Star, Award, Calendar } from 'lucide-react';

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
        if (name.includes('grid')) return Grid;
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{t('builder.addSection')}</h2>
                        <p className="text-sm text-slate-500">{t('builder.chooseComponent')}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {schemas.map((schema) => {
                            const Icon = getIcon(schema);
                            const componentId = schema.id.replace('-schema', '');
                            return (
                                <button
                                    key={schema.id}
                                    onClick={() => onSelect(componentId)}
                                    className="flex flex-col items-start p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all group text-left h-full"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                                        <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-500" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">
                                        {t(`components.${componentId}.name`, { defaultValue: schema.name })}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
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
