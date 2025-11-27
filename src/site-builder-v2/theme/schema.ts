import { ComponentSchema } from '../builder/types';

export const ThemeSettingsSchema: ComponentSchema = {
    id: 'theme-settings',
    name: 'Design System',
    description: 'Customize the global look and feel of your site.',
    category: 'other',
    fields: {
        'fonts.heading': {
            type: 'select',
            label: 'Heading Font',
            options: [
                { label: 'Playfair Display (Elegant)', value: 'Playfair Display' },
                { label: 'Inter (Modern)', value: 'Inter' },
                { label: 'Roboto (Neutral)', value: 'Roboto' },
                { label: 'Montserrat (Bold)', value: 'Montserrat' },
                { label: 'Lora (Classic)', value: 'Lora' }
            ],
            defaultValue: 'Playfair Display'
        },
        'fonts.body': {
            type: 'select',
            label: 'Body Font',
            options: [
                { label: 'Inter (Clean)', value: 'Inter' },
                { label: 'Roboto (Readable)', value: 'Roboto' },
                { label: 'Open Sans (Friendly)', value: 'Open Sans' },
                { label: 'Lato (Balanced)', value: 'Lato' }
            ],
            defaultValue: 'Inter'
        },
        'colors.primary': {
            type: 'color',
            label: 'Primary Color',
            defaultValue: '#D4AF37'
        },
        'colors.secondary': {
            type: 'color',
            label: 'Secondary Color',
            defaultValue: '#1A1A1A'
        },
        'colors.accent': {
            type: 'color',
            label: 'Accent Color',
            defaultValue: '#F4F4F4'
        },
        'colors.background': {
            type: 'color',
            label: 'Background Color',
            defaultValue: '#0B0B0F'
        },
        'colors.text': {
            type: 'color',
            label: 'Text Color',
            defaultValue: '#FFFFFF'
        },
        borderRadius: {
            type: 'select',
            label: 'Border Radius',
            options: [
                { label: 'Sharp (0px)', value: '0px' },
                { label: 'Slight (4px)', value: '4px' },
                { label: 'Rounded (8px)', value: '8px' },
                { label: 'Soft (12px)', value: '12px' },
                { label: 'Pill (24px)', value: '24px' }
            ],
            defaultValue: '8px'
        }
    },
    defaultData: {}
};
