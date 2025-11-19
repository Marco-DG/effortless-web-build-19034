import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const FeaturesSchema: ComponentSchema = {
    id: 'features-schema',
    name: 'Features List',
    description: 'Grid of features, services, or amenities.',
    category: 'features',
    fields: {
        title: {
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Our Services',
            validation: z.string().min(1)
        },
        subtitle: {
            type: 'text',
            label: 'Subtitle',
            defaultValue: 'What we offer'
        },
        items: {
            type: 'list',
            label: 'Features List',
            defaultValue: [
                { title: 'Private Dining', description: 'Exclusive room for special events.' },
                { title: 'Wine Pairing', description: 'Expertly curated wine selection.' },
                { title: 'Valet Parking', description: 'Complimentary parking service.' }
            ]
        }
    },
    defaultData: {
        title: 'Our Services',
        subtitle: 'Experience the Best',
        items: [
            { title: 'Private Dining', description: 'Exclusive room for special events.' },
            { title: 'Wine Pairing', description: 'Expertly curated wine selection.' },
            { title: 'Valet Parking', description: 'Complimentary parking service.' },
            { title: 'Outdoor Seating', description: 'Beautiful patio for summer nights.' }
        ]
    }
};
