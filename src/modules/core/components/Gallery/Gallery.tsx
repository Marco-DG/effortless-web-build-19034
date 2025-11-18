import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
    url: string;
    alt?: string;
    caption?: string;
}

interface GalleryProps {
    title: string;
    subtitle: string;
    layout: 'masonry' | 'grid' | 'carousel';
    columns: '2' | '3' | '4';
    gap: '2' | '4' | '8';
    images: GalleryImage[];
}

export const UniversalGallery: React.FC<GalleryProps> = ({
    title,
    subtitle,
    layout,
    columns,
    gap,
    images = []
}) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % images.length);
        }
    };
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
        }
    };

    // CSS Grid/Masonry Classes
    const getGridClass = () => {
        const gapClass = { '2': 'gap-2', '4': 'gap-4', '8': 'gap-8' };
        const colClass = {
            '2': 'columns-1 md:columns-2',
            '3': 'columns-1 md:columns-2 lg:columns-3',
            '4': 'columns-1 md:columns-2 lg:columns-4'
        };

        if (layout === 'masonry') {
            return `${colClass[columns]} ${gapClass[gap]} space-y-${gap}`;
        }

        // Standard Grid
        const gridCols = {
            '2': 'grid-cols-1 md:grid-cols-2',
            '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        };
        return `grid ${gridCols[columns]} ${gapClass[gap]}`;
    };

    return (
        <section className="py-24 bg-[var(--theme-background)]">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold font-heading text-[var(--theme-text)] mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-[var(--theme-text)]/70">
                        {subtitle}
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className={getGridClass()}>
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group cursor-pointer overflow-hidden rounded-2xl ${layout === 'masonry' ? 'mb-4 break-inside-avoid' : 'aspect-square'}`}
                            onClick={() => openLightbox(index)}
                        >
                            <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <button className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <motion.img
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={images[lightboxIndex].url}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4"
                            onClick={nextImage}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
