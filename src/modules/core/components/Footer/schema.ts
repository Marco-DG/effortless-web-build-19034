import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const FooterSchema: ComponentSchema = {
    id: 'footer',
    name: 'Universal Footer',
    description: 'Multi-column footer with social links and newsletter.',
    category: 'other',
    fields: {
        columns: {
            type: 'select',
            label: 'Layout Columns',
            defaultValue: '4',
            options: [
                { label: 'Simple (Centered)', value: '1' },
                { label: '3 Columns', value: '3' },
                { label: '4 Columns', value: '4' }
            ]
        },
        showSocial: {
            type: 'toggle',
            label: 'Show Social Links',
            defaultValue: true
        },
        showNewsletter: {
            type: 'toggle',
            label: 'Show Newsletter',
            defaultValue: true
        },
        copyrightText: {
            type: 'text',
            label: 'Copyright Text',
            defaultValue: '© 2024 Restaurant Name. All rights reserved.'
        },
        links: {
            type: 'list',
            label: 'Footer Links',
            defaultValue: [
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' }
            ]
        }
    },
    defaultData: {
        columns: '4',
        showSocial: true,
        showNewsletter: true,
        copyrightText: '© 2024 Restaurant Name. All rights reserved.',
        links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' }
        ]
    }
};
