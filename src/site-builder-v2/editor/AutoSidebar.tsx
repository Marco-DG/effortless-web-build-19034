import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ComponentSchema, FieldSchema } from '../builder/types';
import { CleanFormField } from '../shared/forms';
import {
    TextFieldRenderer,
    TextAreaRenderer,
    SelectFieldRenderer,
    VisualSelectFieldRenderer,
    CompactVisualSelectFieldRenderer,
    ToggleFieldRenderer,
    ImageFieldRenderer,
    ColorFieldRenderer,
    ListFieldRenderer
} from './FieldRenderers';

interface AutoSidebarProps {
    schema: ComponentSchema;
    data: Record<string, any>;
    onUpdate: (newData: Record<string, any>) => void;
    activeTab?: 'design' | 'content';
    onTabChange?: (tab: 'design' | 'content') => void;
}

export const AutoSidebar: React.FC<AutoSidebarProps> = ({ schema, data, onUpdate, activeTab = 'design' }) => {
    const { t } = useTranslation();

    const handleFieldChange = (key: string, value: any) => {
        onUpdate({
            ...data,
            [key]: value
        });
    };

    // Check if schema has categorized fields
    const hasCategories = useMemo(() => {
        return Object.values(schema.fields).some(field => field.category);
    }, [schema.fields]);

    // Filter fields by category
    const filteredFields = useMemo(() => {
        if (!hasCategories) {
            return Object.entries(schema.fields);
        }
        return Object.entries(schema.fields).filter(([_, field]) => field.category === activeTab);
    }, [schema.fields, activeTab, hasCategories]);

    const renderField = (key: string, field: FieldSchema) => {
        const value = data[key] !== undefined ? data[key] : field.defaultValue;

        let Renderer;
        switch (field.type) {
            case 'text': Renderer = TextFieldRenderer; break;
            case 'textarea': Renderer = TextAreaRenderer; break;
            case 'select': Renderer = SelectFieldRenderer; break;
            case 'visual-select': Renderer = VisualSelectFieldRenderer; break;
            case 'compact-visual-select': Renderer = CompactVisualSelectFieldRenderer; break;
            case 'toggle': Renderer = ToggleFieldRenderer; break;
            case 'image': Renderer = ImageFieldRenderer; break;
            case 'color': Renderer = ColorFieldRenderer; break;
            case 'list': Renderer = ListFieldRenderer; break;
            default: Renderer = TextFieldRenderer;
        }

        return (
            <CleanFormField
                key={key}
                label={t(field.label)}
                description={field.description}
            >
                <Renderer
                    field={field}
                    value={value}
                    onChange={(val) => handleFieldChange(key, val)}
                />
            </CleanFormField>
        );
    };

    return (
        <div className="space-y-8">
            <div
                key={activeTab}
                className="space-y-6"
                style={{
                    animation: 'fadeIn 300ms ease-out',
                }}
            >
                {filteredFields.map(([key, field]) => renderField(key, field))}
            </div>
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};
