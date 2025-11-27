import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const FooterSchema: ComponentSchema = {
    id: 'footer',
    name: 'Footer',
    description: 'Multi-column footer with social links and newsletter.',
    category: 'other',
    fields: {
        layout: {
            type: 'select',
            label: 'Footer Layout',
            defaultValue: 'centered',
            category: 'design',
            options: [
                { label: 'Centered', value: 'centered' },
                { label: 'Columns', value: 'columns' },
                { label: 'Minimal', value: 'minimal' }
            ]
        },
        showSocial: {
            type: 'toggle',
            label: 'Show Social Links',
            defaultValue: true,
            category: 'design'
        },
        showNewsletter: {
            type: 'toggle',
            label: 'Show Newsletter',
            defaultValue: true,
            category: 'design'
        },
        copyrightText: {
            type: 'text',
            label: 'Copyright Text',
            defaultValue: '© 2024 Restaurant. All rights reserved.',
            category: 'content'
        },
        links: {
            type: 'list',
            label: 'Footer Links',
            category: 'content',
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
