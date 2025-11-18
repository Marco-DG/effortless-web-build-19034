import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const HeroSchema: ComponentSchema = {
    id: 'hero',
    name: 'Universal Hero',
    description: 'A versatile hero section with multiple layouts and styles.',
    category: 'hero',
    fields: {
        title: {
            type: 'text',
            label: 'Headline',
            defaultValue: 'Welcome to Our Site',
            validation: z.string().min(1)
        },
        subtitle: {
            type: 'textarea',
            label: 'Subheadline',
            defaultValue: 'Create something amazing today.',
        },
        backgroundImage: {
            type: 'image',
            label: 'Background Image',
            defaultValue: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80'
        },
        layout: {
            type: 'select',
            label: 'Layout',
            defaultValue: 'center',
            options: [
                { label: 'Centered', value: 'center' },
                { label: 'Split Left', value: 'split-left' },
                { label: 'Split Right', value: 'split-right' },
                { label: 'Cinematic', value: 'cinematic' }
            ]
        },
        style: {
            type: 'select',
            label: 'Visual Style',
            defaultValue: 'minimal',
            options: [
                { label: 'Minimal', value: 'minimal' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Dark Overlay', value: 'dark-overlay' }
            ]
        },
        ctaText: {
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Get Started'
        },
        ctaLink: {
            type: 'text',
            label: 'Button Link',
            defaultValue: '#'
        }
    },
    defaultData: {
        title: 'Welcome to Our Site',
        subtitle: 'Create something amazing today.',
        backgroundImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
        layout: 'center',
        style: 'dark-overlay',
        ctaText: 'Get Started',
        ctaLink: '#'
    }
};
