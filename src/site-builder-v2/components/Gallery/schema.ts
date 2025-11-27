import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const GallerySchema: ComponentSchema = {
    id: 'gallery',
    name: 'Photo Gallery',
    description: 'Showcase images in a grid, masonry, or carousel layout.',
    category: 'gallery',
    fields: {
        title: {
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Gallery',
            category: 'content'
        },
        subtitle: {
            type: 'text',
            label: 'Section Subtitle',
            defaultValue: 'A glimpse into our world',
            category: 'content'
        },
        layout: {
            type: 'select',
            label: 'Layout Style',
            defaultValue: 'masonry',
            category: 'design',
            options: [
                { label: 'Masonry (Pinterest)', value: 'masonry' },
                { label: 'Grid (Square)', value: 'grid' },
                { label: 'Carousel', value: 'carousel' }
            ]
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
        gap: {
            type: 'select',
            label: 'Gap Size',
            defaultValue: '4',
            category: 'design',
            options: [
                { label: 'Small', value: '2' },
                { label: 'Medium', value: '4' },
                { label: 'Large', value: '8' }
            ]
        },
        images: {
            type: 'list',
            label: 'Images',
            category: 'content',
            defaultValue: [

                { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80', alt: 'Interior' },
                { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80', alt: 'Dining' }
            ]
        }
    },
    defaultData: {
        title: 'Our Atmosphere',
        subtitle: 'Experience the vibe of our location.',
        layout: 'masonry',
        columns: '3',
        gap: '4',
        images: [
            { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80', alt: 'Restaurant Interior' },
            { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80', alt: 'Bar Area' },

            { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80', alt: 'Chef at Work' },
            { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80', alt: 'Fine Dining' }
        ]
    }
};
