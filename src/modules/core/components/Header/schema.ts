import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const HeaderSchema: ComponentSchema = {
    id: 'header',
    name: 'Navigation Bar',
    description: 'Global navigation bar with logo and links.',
    category: 'other',
    fields: {
        layout: {
            type: 'visual-select',
            label: 'components.header.layoutStyle',
            defaultValue: 'classic',
            category: 'design',
            options: [
                { label: 'Classic', value: 'classic', icon: 'header-classic' },
                { label: 'Centered', value: 'centered', icon: 'header-centered' },
                { label: 'Double Line', value: 'double', icon: 'header-double' },
                { label: 'Minimal', value: 'minimal', icon: 'header-minimal' }
            ]
        },
        style: {
            type: 'compact-visual-select',
            label: 'components.header.headerStyle',
            defaultValue: 'solid',
            category: 'design',
            options: [
                { label: 'components.header.styleSolid', value: 'solid' },
                { label: 'components.header.styleTransparent', value: 'transparent' },
                { label: 'components.header.styleGlass', value: 'glass' }
            ]
        },
        logoText: {
            type: 'text',
            label: 'Logo Text',
            defaultValue: 'Brand',
            category: 'content',
            validation: z.string().min(1)
        },
        navigationMode: {
            type: 'select',
            label: 'Navigation Mode',
            defaultValue: 'auto',
            category: 'content',
            options: [
                { label: 'Automatic (All Pages)', value: 'auto' },
                { label: 'Manual (Custom Links)', value: 'manual' }
            ]
        },
        links: {
            type: 'list',
            label: 'Navigation Links',
            category: 'content',
            defaultValue: [
                { label: 'Home', href: '#' },
                { label: 'Menu', href: '#menu' },
                { label: 'About', href: '#about' }
            ]
        },
        showCta: {
            type: 'toggle',
            label: 'Show CTA Button',
            defaultValue: true,
            category: 'content'
        },
        ctaText: {
            type: 'text',
            label: 'CTA Text',
            defaultValue: 'Book Table',
            category: 'content'
        }
    },
    defaultData: {
        layout: 'classic',
        logoText: 'Restaurante',
        navigationMode: 'auto',
        links: [
            { label: 'Home', href: '#' },
            { label: 'Menu', href: '#menu' },
            { label: 'Events', href: '#events' },
            { label: 'Contact', href: '#contact' }
        ],
        showCta: false,
        ctaText: 'Book Table',
        style: 'transparent'
    }
};
