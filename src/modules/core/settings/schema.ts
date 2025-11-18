import { ComponentSchema } from '../builder/types';
import { z } from 'zod';

export const BusinessSettingsSchema: ComponentSchema = {
    id: 'business-settings',
    name: 'Business Profile',
    description: 'Manage your business information centrally.',
    category: 'other',
    fields: {
        name: {
            type: 'text',
            label: 'Business Name',
            defaultValue: 'My Business',
            validation: z.string().min(1)
        },
        tagline: {
            type: 'text',
            label: 'Tagline',
            defaultValue: ''
        },
        description: {
            type: 'textarea',
            label: 'Short Description',
            defaultValue: ''
        },
        'contact.email': {
            type: 'text',
            label: 'Email Address',
            defaultValue: ''
        },
        'contact.phone': {
            type: 'text',
            label: 'Phone Number',
            defaultValue: ''
        },
        'contact.address': {
            type: 'text',
            label: 'Physical Address',
            defaultValue: ''
        },
        'social.instagram': {
            type: 'text',
            label: 'Instagram URL',
            defaultValue: ''
        },
        'social.facebook': {
            type: 'text',
            label: 'Facebook URL',
            defaultValue: ''
        },
        'hours.weekdays': {
            type: 'text',
            label: 'Weekday Hours',
            defaultValue: ''
        },
        'hours.weekends': {
            type: 'text',
            label: 'Weekend Hours',
            defaultValue: ''
        }
    },
    defaultData: {}
};
