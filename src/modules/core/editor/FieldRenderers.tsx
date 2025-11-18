import React from 'react';
import { FieldSchema } from '../builder/types';
import { CleanTextInput, CleanSelect, CleanToggle } from '../../site-builder/components/forms';

interface FieldRendererProps {
    field: FieldSchema;
    value: any;
    onChange: (value: any) => void;
}

export const TextFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <CleanTextInput
        value={value || ''}
        onChange={onChange}
        placeholder={field.description}
    />
);

export const TextAreaRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <CleanTextInput
        value={value || ''}
        onChange={onChange}
        placeholder={field.description}
        multiline
        rows={4}
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

export const ImageFieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange }) => (
    <div className="space-y-2">
        <div className="relative w-full h-32 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            {value ? (
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
            ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                    No Image
                </div>
            )}
        </div>
        <CleanTextInput
            value={value || ''}
            onChange={onChange}
            placeholder="Image URL"
        />
    </div>
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
