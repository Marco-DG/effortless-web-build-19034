import React from 'react';
import { ComponentSchema, FieldSchema } from '../builder/types';
import { CleanFormField } from '../../site-builder/components/forms';
import {
    TextFieldRenderer,
    TextAreaRenderer,
    SelectFieldRenderer,
    ToggleFieldRenderer,
    ImageFieldRenderer,
    ColorFieldRenderer,
    ListFieldRenderer
} from './FieldRenderers';

interface AutoSidebarProps {
    schema: ComponentSchema;
    data: Record<string, any>;
    onUpdate: (newData: Record<string, any>) => void;
}

export const AutoSidebar: React.FC<AutoSidebarProps> = ({ schema, data, onUpdate }) => {

    const handleFieldChange = (key: string, value: any) => {
        onUpdate({
            ...data,
            [key]: value
        });
    };

    const renderField = (key: string, field: FieldSchema) => {
        const value = data[key] !== undefined ? data[key] : field.defaultValue;

        let Renderer;
        switch (field.type) {
            case 'text': Renderer = TextFieldRenderer; break;
            case 'textarea': Renderer = TextAreaRenderer; break;
            case 'select': Renderer = SelectFieldRenderer; break;
            case 'toggle': Renderer = ToggleFieldRenderer; break;
            case 'image': Renderer = ImageFieldRenderer; break;
            case 'color': Renderer = ColorFieldRenderer; break;
            case 'list': Renderer = ListFieldRenderer; break;
            default: Renderer = TextFieldRenderer;
        }

        return (
            <CleanFormField
                key={key}
                label={field.label}
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
        <div className="space-y-8 animate-fade-in">


            <div className="space-y-6">
                {Object.entries(schema.fields).map(([key, field]) => renderField(key, field))}
            </div>
        </div>
    );
};
