import { ComponentSchema } from '../../builder/types';
import { z } from 'zod';

export const MenuSchema: ComponentSchema = {
    id: 'menu',
    name: 'Restaurant Menu',
    description: 'Restaurant menu with categories, filtering, and dietary badges.',
    category: 'features',
    fields: {
        title: {
            type: 'text',
            label: 'Section Title',
            defaultValue: 'Our Menu',
            category: 'content'
        },
        subtitle: {
            type: 'text',
            label: 'Section Subtitle',
            defaultValue: 'Culinary excellence in every dish',
            category: 'content'
        },
        layout: {
            type: 'select',
            label: 'Layout Style',
            defaultValue: 'classic',
            category: 'design',
            options: [
                { label: 'Classic List', value: 'classic' },
                { label: 'Modern Grid', value: 'grid' },
                { label: 'Minimal', value: 'minimal' }
            ]
        },
        currency: {
            type: 'text',
            label: 'Currency Symbol',
            defaultValue: '$',
            category: 'content'
        },
        items: {
            type: 'list',
            label: 'Menu Items',
            category: 'content',
            defaultValue: [
                {
                    name: 'Truffle Risotto',
                    description: 'Arborio rice, black truffle, parmesan crisp',
                    price: '28',
                    category: 'Mains',
                    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80',
                    badges: 'Vegetarian'
                },
                {
                    name: 'Wagyu Beef Carpaccio',
                    description: 'Thinly sliced raw beef, capers, truffle oil',
                    price: '24',
                    category: 'Starters',
                    image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80',
                    badges: 'GF'
                }
            ]
        }
    },
    defaultData: {
        title: 'Seasonal Menu',
        subtitle: 'Locally sourced ingredients, prepared with passion.',
        layout: 'classic',
        currency: '$',
        items: [
            {
                name: 'Burrata & Heirloom Tomato',
                description: 'Fresh basil, balsamic glaze, toasted pine nuts',
                price: '18',
                category: 'Starters',
                image: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e24?auto=format&fit=crop&q=80',
                badges: 'Vegetarian, GF'
            },
            {
                name: 'Pan-Seared Scallops',
                description: 'Cauliflower purée, crispy pancetta, lemon butter',
                price: '22',
                category: 'Starters',
                image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80',
                badges: 'GF'
            },
            {
                name: 'Wild Mushroom Risotto',
                description: 'Porcini, chanterelle, parmesan crisp, truffle oil',
                price: '26',
                category: 'Mains',
                image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80',
                badges: 'Vegetarian'
            },
            {
                name: 'Herb-Crusted Lamb Rack',
                description: 'Fondant potato, seasonal greens, red wine jus',
                price: '34',
                category: 'Mains',
                image: 'https://images.unsplash.com/photo-1544510808-91bcbee1df55?auto=format&fit=crop&q=80',
                badges: ''
            },
            {
                name: 'Dark Chocolate Fondant',
                description: 'Vanilla bean ice cream, raspberry coulis',
                price: '14',
                category: 'Desserts',
                image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80',
                badges: 'Vegetarian'
            }
        ]
    }
};
