import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const ReservationSchema: ComponentSchema = {
    id: 'reservation-schema',
    name: 'Reservation CTA',
    description: 'Call to action for table bookings.',
    category: 'cta',
    fields: {
        title: {
            type: 'text',
            label: 'Title',
            defaultValue: 'Reserve Your Table',
            validation: z.string().min(1)
        },
        description: {
            type: 'textarea',
            label: 'Description',
            defaultValue: 'Experience culinary excellence. Book your table now for an unforgettable evening.'
        },
        buttonText: {
            type: 'text',
            label: 'Button Text',
            defaultValue: 'Book Now'
        },
        buttonLink: {
            type: 'text',
            label: 'Booking Link',
            defaultValue: '#'
        },
        backgroundImage: {
            type: 'image',
            label: 'Background Image',
            defaultValue: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80'
        }
    },
    defaultData: {
        title: 'Reserve Your Table',
        description: 'Experience culinary excellence. Book your table now for an unforgettable evening.',
        buttonText: 'Book Now',
        buttonLink: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80'
    }
};
