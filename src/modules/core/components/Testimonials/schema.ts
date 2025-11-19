import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const TestimonialsSchema: ComponentSchema = {
    id: 'testimonials-schema',
    name: 'Testimonials',
    description: 'Carousel or grid of customer reviews.',
    category: 'social-proof',
    fields: {
        title: {
            type: 'text',
            label: 'Section Title',
            defaultValue: 'What Our Guests Say',
            validation: z.string().min(1)
        },
        subtitle: {
            type: 'text',
            label: 'Subtitle',
            defaultValue: 'Testimonials'
        },
        reviews: {
            type: 'list',
            label: 'Reviews',
            defaultValue: [
                { author: 'James Beard', role: 'Food Critic', text: 'An absolute delight for the senses.', rating: '5' },
                { author: 'Sarah Jenkins', role: 'Regular Guest', text: 'The best pasta I have ever had outside of Italy.', rating: '5' }
            ]
        }
    },
    defaultData: {
        title: 'What Our Guests Say',
        subtitle: 'Testimonials',
        reviews: [
            { author: 'Elena Rossi', role: 'Food Blogger', text: 'An unforgettable dining experience. The atmosphere is as exquisite as the food.', rating: '5' },
            { author: 'Mark Thompson', role: 'Local Guide', text: 'Truly a hidden gem. The wine pairing was absolute perfection.', rating: '5' },
            { author: 'Giulia Bianchi', role: 'Chef', text: 'Inspiring creativity and respect for tradition. A must-visit.', rating: '5' }
        ]
    }
};
