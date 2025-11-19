import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const AwardsSchema: ComponentSchema = {
    id: 'awards-schema',
    name: 'Awards',
    description: 'Showcase your achievements and press features.',
    category: 'social-proof',
    fields: {
        title: {
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Awards',
            validation: z.string().min(1)
        },
        items: {
            type: 'list',
            label: 'Awards List',
            defaultValue: [
                { name: 'Michelin Star', year: '2023', label: '1 Star' },
                { name: 'Gault & Millau', year: '2023', label: '18/20' }
            ]
        }
    },
    defaultData: {
        title: 'Our Recognition',
        items: [
            { name: 'Michelin Guide', year: '2024', label: '1 Star' },
            { name: 'Gault & Millau', year: '2024', label: '3 Toques' },
            { name: 'Wine Spectator', year: '2023', label: 'Best of Award' },
            { name: '50 Best', year: '2023', label: 'Discovery' }
        ]
    }
};
