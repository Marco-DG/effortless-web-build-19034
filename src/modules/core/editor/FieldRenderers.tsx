import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldSchema } from '../builder/types';
import { CleanTextInput, CleanSelect, CleanToggle } from '../../site-builder/components/forms';
import { ImagePicker } from './components/ImagePicker';
import { ColorPicker } from './components/ColorPicker';
import { RichTextEditor } from './components/RichTextEditor';
import { LayoutTemplate } from 'lucide-react';
import { HeaderClassicIcon, HeaderCenteredIcon, HeaderMinimalIcon, HeaderDoubleIcon, HeaderStyleSolidIcon, HeaderStyleTransparentIcon, HeaderStyleGlassIcon } from './LayoutIcons';

interface FieldRendererProps {
    field: FieldSchema;
    value: any;
    onChange: (value: any) => void;
}

export const TextFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <CleanTextInput
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.description}
    />
);

export const ImageFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
    return (
        <ImagePicker
            value={value}
            onChange={onChange}
        />
    );
};

export const ColorFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
    return (
        <ColorPicker
            value={value}
            onChange={onChange}
        />
    );
};

export const TextAreaRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <RichTextEditor
        value={value || ''}
        onChange={onChange}
        placeholder={field.description}
    />
);

export const SelectFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <CleanSelect
        value={value}
        onChange={onChange}
        options={field.options || []}
    />
);

export const ToggleFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <CleanToggle
        checked={!!value}
        onChange={onChange}
    />
);



export const ListFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
    // Simplified list renderer for now - assumes list of objects
    const items = Array.isArray(value) ? value : [];

    const addItem = () => {
        // Add a default item based on the first item structure or empty
        const newItem = items.length > 0 ? { ...items[0], title: 'New Item' } : { title: 'New Item' };
        onChange([...items, newItem]);
    };

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, key: string, val: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: val };
        onChange(newItems);
    };

    return (
        <div className="space-y-3">
            {items.map((item: any, index: number) => (
                <div key={index} className="p-3 border border-slate-200 rounded-lg bg-white">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-500">Item {index + 1}</span>
                        <button onClick={() => removeItem(index)} className="text-red-500 text-xs hover:underline">Remove</button>
                    </div>
                    <div className="space-y-2">
                        {Object.keys(item).map((key) => (
                            key !== 'icon' && key !== 'image' && ( // Simple filter for demo
                                <input
                                    key={key}
                                    value={item[key]}
                                    onChange={(e) => updateItem(index, key, e.target.value)}
                                    className="w-full text-sm border-b border-slate-100 py-1 focus:outline-none focus:border-blue-500"
                                    placeholder={key}
                                />
                            )
                        ))}
                    </div>
                </div>
            ))}
            <button
                onClick={addItem}
                className="w-full py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
                + Add Item
            </button>
        </div>
    );
};

// --- Visual Select Renderer (grid layout) ---

const IconMap: Record<string, React.ElementType> = {
    'layout-template': LayoutTemplate,
    'header-classic': HeaderClassicIcon,
    'header-centered': HeaderCenteredIcon,
    'header-minimal': HeaderMinimalIcon,
    'header-double': HeaderDoubleIcon,
    'header-style-solid': HeaderStyleSolidIcon,
    'header-style-transparent': HeaderStyleTransparentIcon,
    'header-style-glass': HeaderStyleGlassIcon
};

export const VisualSelectFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <div className="grid grid-cols-2 gap-3">
        {field.options?.map((opt) => {
            const isSelected = value === opt.value;
            const Icon = opt.icon ? IconMap[opt.icon] : LayoutTemplate;

            return (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`
                        group relative aspect-[3/2] bg-white border border-slate-200/60 rounded-[12px] transition-all overflow-hidden
                        ${isSelected
                            ? 'ring-2 ring-blue-500/20 border-blue-500'
                            : 'hover:border-slate-300 hover:shadow-sm hover:bg-slate-50'
                        }
                    `}
                >
                    <div className="w-full h-full flex items-center justify-center p-2">
                        <Icon />
                    </div>
                    {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                </button>
            );
        })}
    </div>
);

// --- Compact Visual Select Renderer (icon + label) ---

const CompactIconMap: Record<string, React.ElementType> = {
    'layout-template': LayoutTemplate,
    'header-style-solid': HeaderStyleSolidIcon,
    'header-style-transparent': HeaderStyleTransparentIcon,
    'header-style-glass': HeaderStyleGlassIcon
};

export const CompactVisualSelectFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-3 gap-2">
            {field.options?.map((opt) => {
                const isSelected = value === opt.value;
                const Icon = opt.icon ? CompactIconMap[opt.icon] : null;

                return (
                    <button
                        key={opt.value}
                        onClick={() => onChange(opt.value)}
                        className={`
                        flex flex-col items-center justify-center gap-2 p-2 bg-white border border-slate-200/60 rounded-[12px] transition-all
                        ${isSelected
                                ? 'ring-2 ring-blue-500/20 border-blue-500 bg-blue-50/30'
                                : 'hover:border-slate-300 hover:shadow-sm hover:bg-slate-50'
                            }
                    `}
                        title={t(opt.label)}
                    >
                        {Icon && (
                            <div className={`w-8 h-8 rounded flex items-center justify-center ${isSelected ? 'text-blue-600' : 'text-slate-500'}`}>
                                <Icon />
                            </div>
                        )}
                        <span className={`text-xs font-medium text-center leading-tight ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}>
                            {t(opt.label)}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
