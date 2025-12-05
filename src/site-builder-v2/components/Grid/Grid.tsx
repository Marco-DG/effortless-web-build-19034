import React from 'react';
import { Star, Heart, Zap, Check, Coffee, Award } from 'lucide-react';

interface GridItem {
    title: string;
    description: string;
    icon?: string;
    image?: string;
}

interface GridProps {
    title: string;
    subtitle: string;
    columns: '2' | '3' | '4';
    variant: 'card' | 'minimal' | 'image';
    items: GridItem[];
}

// Simple icon mapper for demo purposes
const IconMap: Record<string, any> = {
    Star, Heart, Zap, Check, Coffee, Award
};

export const UniversalGrid: React.FC<GridProps> = ({
    title,
    subtitle,
    columns = '3',
    variant = 'card',
    items = []
}) => {

    const gridCols = {
        '2': 'md:grid-cols-2',
        '3': 'md:grid-cols-3',
        '4': 'md:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className="py-24 px-6 container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-bold mb-4 text-[var(--theme-text)] font-heading">
                    {title}
                </h2>
                <p className="text-lg opacity-70">
                    {subtitle}
                </p>
            </div>

            <div className={`grid gap-8 ${gridCols[columns]}`}>
                {items.map((item, index) => {
                    const Icon = item.icon ? IconMap[item.icon] : null;

                    return (
                        <div key={index} className={`
              transition-all duration-300
              ${variant === 'card' ? 'p-8 bg-white/5 border border-black/10 rounded-[var(--theme-radius)] hover:shadow-lg' : ''}
              ${variant === 'minimal' ? 'text-center' : ''}
              ${variant === 'image' ? 'overflow-hidden rounded-[var(--theme-radius)] group' : ''}
            `}>

                            {/* Image Variant */}
                            {variant === 'image' && item.image && (
                                <div className="h-48 overflow-hidden mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            )}

                            {/* Icon */}
                            {variant !== 'image' && Icon && (
                                <div className={`
                  mb-4 inline-flex items-center justify-center
                  ${variant === 'card' ? 'w-12 h-12 bg-[var(--theme-primary)] text-white rounded-full' : 'text-[var(--theme-primary)]'}
                `}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2 font-heading">{item.title}</h3>
                            <p className="opacity-70 leading-relaxed">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
