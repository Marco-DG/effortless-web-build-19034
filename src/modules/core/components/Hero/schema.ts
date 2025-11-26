import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const HeroSchema: ComponentSchema = {
    id: 'hero',
    name: 'Cover / Hero',
    description: 'A versatile hero section with multiple layouts and styles.',
    category: 'hero',
    fields: {
        title: {
            type: 'text',
            label: 'Headline',
            defaultValue: 'Welcome to Our Site',
            category: 'content',
            validation: z.string().min(1)
        },
        subtitle: {
            type: 'textarea',
            label: 'Subheadline',
            defaultValue: 'Create something amazing today.',
            category: 'content'
        },
        backgroundImage: {
            type: 'image',
            label: 'Background Image',
            defaultValue: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
            category: 'design'
        },
        layout: {
            type: 'select',
            label: 'Layout',
            defaultValue: 'center',
            category: 'design',
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
            category: 'design',
            options: [
                { label: 'Minimal', value: 'minimal' },
                { label: 'Gradient', value: 'gradient' },
                { label: 'Dark Overlay', value: 'dark-overlay' }
            ]
        },
        ctaText: {
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Get Started',
            category: 'content'
        },
        ctaLink: {
            type: 'text',
            label: 'Button Link',
            defaultValue: '#',
            category: 'content'
        }
    },
    defaultData: {
        title: 'Osteria del Borgo',
        subtitle: 'Tradizione e sapori autentici nel cuore della città',
        backgroundImage: 'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop',
        layout: 'center',
        style: 'dark-overlay',
        ctaText: 'Prenota Ora',
        ctaLink: '#'
    }
};
