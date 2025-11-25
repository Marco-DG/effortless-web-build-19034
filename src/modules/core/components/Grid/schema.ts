import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const GridSchema: ComponentSchema = {
    id: 'grid',
    name: 'Features Grid',
    description: 'A flexible grid for features, services, or menu items.',
    category: 'features',
    fields: {
        title: {
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Our Features',
            category: 'content'
        },
        subtitle: {
            type: 'textarea',
            label: 'Section Subtitle',
            defaultValue: 'Discover what makes us unique.',
            category: 'content'
        },
        columns: {
            type: 'select',
            label: 'Columns',
            defaultValue: '3',
            category: 'design',
            options: [
                { label: '2 Columns', value: '2' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' }
            ]
        },
        variant: {
            type: 'select',
            label: 'Card Style',
            defaultValue: 'card',
            category: 'design',
            options: [
                { label: 'Card (Boxed)', value: 'card' },
                { label: 'Minimal (Icon + Text)', value: 'minimal' },
                { label: 'Image Focus', value: 'image' }
            ]
        },
        items: {
            type: 'list',
            label: 'Grid Items',
            category: 'content',
            defaultValue: [
                { title: 'Feature 1', description: 'Description here', icon: 'Star' },
                { title: 'Feature 2', description: 'Description here', icon: 'Heart' },
                { title: 'Feature 3', description: 'Description here', icon: 'Zap' }
            ]
        }
    },
    defaultData: {
        title: 'Our Features',
        subtitle: 'Discover what makes us unique.',
        columns: '3',
        variant: 'card',
        items: [
            { title: 'Quality', description: 'We use only the finest ingredients.', icon: 'Star' },
            { title: 'Passion', description: 'Cooked with love and tradition.', icon: 'Heart' },
            { title: 'Speed', description: 'Served fresh and fast.', icon: 'Zap' }
        ]
    }
};
