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
            category: 'content',
            validation: z.string().min(1)
        },
        subtitle: {
            type: 'text',
            label: 'Subtitle',
            defaultValue: 'A journey of taste',
            category: 'content'
        },
        text: {
            type: 'rich-text',
            label: 'Content',
            defaultValue: 'Share your story here. Describe your philosophy, your history, or what makes your business unique.',
            category: 'content'
        },
        image: {
            type: 'image',
            label: 'Image',
            defaultValue: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
            category: 'design'
        },
        layout: {
            type: 'select',
            label: 'Layout',
            category: 'design',
            options: [
                { label: 'Image Left', value: 'image-left' },
                { label: 'Image Right', value: 'image-right' }
            ],
            defaultValue: 'image-left'
        },
        ctaText: {
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Learn More',
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
        title: 'La Nostra Storia',
        subtitle: 'Chef Marco Benedetti',
        text: 'La mia passione per la cucina nasce dalla tradizione di famiglia. Ogni piatto racconta una storia, ogni sapore è un ricordo che prende vita. Dalla nonna che mi insegnava i segreti della pasta fatta in casa, fino ai viaggi che mi hanno portato a scoprire tecniche innovative, la mia cucina è un ponte tra passato e futuro.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
        layout: 'image-left',
        ctaText: 'Scopri di più',
        ctaLink: '#'
    }
};
