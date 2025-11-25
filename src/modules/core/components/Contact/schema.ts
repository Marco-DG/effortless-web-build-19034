import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const ContactSchema: ComponentSchema = {
    id: 'contact-schema',
    name: 'Contact Form',
    description: 'Map, address, and contact form.',
    category: 'contact',
    fields: {
        title: {
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Visit Us',
            category: 'content',
            validation: z.string().min(1)
        },
        showMap: {
            type: 'toggle',
            label: 'Show Map',
            defaultValue: true,
            category: 'design'
        },
        address: {
            type: 'text',
            label: 'Address',
            defaultValue: '123 Culinary Avenue, New York, NY',
            category: 'content'
        },
        phone: {
            type: 'text',
            label: 'Phone',
            defaultValue: '+1 (555) 123-4567',
            category: 'content'
        },
        email: {
            type: 'text',
            label: 'Email',
            defaultValue: 'reservations@restaurant.com',
            category: 'content'
        }
    },
    defaultData: {
        title: 'Visit Us',
        showMap: true,
        address: '123 Culinary Avenue, New York, NY',
        phone: '+1 (555) 123-4567',
        email: 'reservations@restaurant.com'
    }
};
