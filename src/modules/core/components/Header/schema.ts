import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const HeaderSchema: ComponentSchema = {
    id: 'header',
    name: 'Universal Header',
    description: 'Global navigation bar with logo and links.',
    category: 'other',
    fields: {
        logoText: {
            type: 'text',
            label: 'Logo Text',
            defaultValue: 'Brand',
            validation: z.string().min(1)
        },
        links: {
            type: 'list',
            label: 'Navigation Links',
            defaultValue: [
                { label: 'Home', href: '#' },
                { label: 'Menu', href: '#menu' },
                { label: 'About', href: '#about' }
            ]
        },
        showCta: {
            type: 'toggle',
            label: 'Show CTA Button',
            defaultValue: true
        },
        ctaText: {
            type: 'text',
            label: 'CTA Text',
            defaultValue: 'Book Table'
        },
        style: {
            type: 'select',
            label: 'Header Style',
            defaultValue: 'solid',
            options: [
                { label: 'Solid Background', value: 'solid' },
                { label: 'Transparent Overlay', value: 'transparent' },
                { label: 'Floating (Glass)', value: 'glass' }
            ]
        },
        sticky: {
            type: 'toggle',
            label: 'Sticky Header',
            defaultValue: true
        }
    },
    defaultData: {
        logoText: 'Restaurante',
        links: [
            { label: 'Home', href: '#' },
            { label: 'Menu', href: '#menu' },
            { label: 'Events', href: '#events' },
            { label: 'Contact', href: '#contact' }
        ],
        showCta: true,
        ctaText: 'Book Table',
        style: 'transparent',
        sticky: true
    }
};
