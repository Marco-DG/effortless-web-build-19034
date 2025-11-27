import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
    name: string;
    description: string;
    price: string;
    category: string;
    image?: string;
    badges?: string;
}

interface MenuProps {
    title: string;
    subtitle: string;
    layout: 'classic' | 'grid' | 'minimal';
    currency: string;
    items: MenuItem[];
}

export const UniversalMenu: React.FC<MenuProps> = ({
    title,
    subtitle,
    layout,
    currency,
    items = []
}) => {
    const [activeCategory, setActiveCategory] = useState<string>('All');

    // Group items by category
    const categories = useMemo(() => {
        const cats = Array.from(new Set(items.map(item => item.category).filter(Boolean)));
        return ['All', ...cats];
    }, [items]);

    // Filter items
    const filteredItems = useMemo(() => {
        if (activeCategory === 'All') return items;
        return items.filter(item => item.category === activeCategory);
    }, [items, activeCategory]);

    return (
        <section className="py-24 bg-[var(--theme-background)]">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-[var(--theme-text)] mb-6">
                        {title}
                    </h2>
                    <p className="text-lg text-[var(--theme-text)]/70 leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Category Filter */}
                {categories.length > 2 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-[var(--theme-primary)] text-white shadow-lg scale-105'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Menu Grid */}
                <div className={`
          grid gap-x-8 gap-y-12
          ${layout === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'}
        `}>
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.name + index}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className={`group ${layout === 'minimal' ? 'flex justify-between items-baseline border-b border-dashed border-slate-200 pb-4' : ''}`}
                            >
                                {/* Image (Grid Layout Only) */}
                                {layout === 'grid' && item.image && (
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors">
                                            {item.name}
                                        </h3>
                                        <span className="text-lg font-semibold text-[var(--theme-primary)] ml-4">
                                            {currency}{item.price}
                                        </span>
                                    </div>

                                    <p className="text-[var(--theme-text)]/60 text-sm leading-relaxed mb-3">
                                        {item.description}
                                    </p>

                                    {/* Badges */}
                                    {item.badges && (
                                        <div className="flex gap-2">
                                            {item.badges.split(',').map((badge, i) => (
                                                <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-[var(--theme-text)]/40 border border-[var(--theme-text)]/20 px-2 py-0.5 rounded-full">
                                                    {badge.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};
