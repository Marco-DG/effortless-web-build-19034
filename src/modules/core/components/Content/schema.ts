import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const ContentSchema: ComponentSchema = {
    id: 'content-schema',
    name: 'Text & Image',
    description: 'Flexible text and image section for stories, bios, or details.',
    category: 'content',
    fields: {
        title: {
            type: 'text',
            label: 'Title',
            defaultValue: 'Our Story',
            validation: z.string().min(1)
        },
        subtitle: {
            type: 'text',
            label: 'Subtitle',
            defaultValue: 'A journey of taste'
        },
        text: {
            type: 'rich-text',
            label: 'Content',
            defaultValue: 'Share your story here. Describe your philosophy, your history, or what makes your business unique.'
        },
        image: {
            type: 'image',
            label: 'Image',
            defaultValue: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80'
        },
        layout: {
            type: 'select',
            label: 'Layout',
            options: [
                { label: 'Image Left', value: 'image-left' },
                { label: 'Image Right', value: 'image-right' }
            ],
            defaultValue: 'image-left'
        },
        ctaText: {
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Learn More'
        },
        ctaLink: {
            type: 'text',
            label: 'Button Link',
            defaultValue: '#'
        }
    },
    defaultData: {
        title: 'Our Story',
        subtitle: 'Tradition & Innovation',
        text: 'Founded in 2010, we started with a simple mission: to bring authentic flavors to the modern table. Our chef, Marco Rossi, combines traditional techniques with contemporary presentation to create dishes that are both familiar and surprising.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
        layout: 'image-left',
        ctaText: 'Read More',
        ctaLink: '#'
    }
};
