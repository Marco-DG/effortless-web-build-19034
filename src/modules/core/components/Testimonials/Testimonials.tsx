import React from 'react';
import { useAppStore } from '../../../../store/app-store';
import { Star, Quote } from 'lucide-react';

interface Review {
    author: string;
    role: string;
    text: string;
    rating: string;
}

interface TestimonialsProps {
    title: string;
    subtitle: string;
    reviews: Review[];
}

export const UniversalTestimonials: React.FC<TestimonialsProps> = ({
    title,
    subtitle,
    reviews = []
}) => {
    return (
        <section className="py-24 bg-[var(--theme-secondary)] text-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--theme-primary)]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--theme-primary)]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-[var(--theme-primary)] font-medium tracking-wider uppercase text-sm">
                        {subtitle}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[var(--theme-radius)] relative group hover:bg-white/10 transition-colors"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-[var(--theme-primary)]/20 group-hover:text-[var(--theme-primary)]/40 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(parseInt(review.rating) || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[var(--theme-primary)] text-[var(--theme-primary)]" />
                                ))}
                            </div>

                            <p className="text-lg text-white/90 mb-8 leading-relaxed italic">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--theme-primary)] flex items-center justify-center text-[var(--theme-secondary)] font-bold">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{review.author}</div>
                                    <div className="text-sm text-white/50">{review.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
