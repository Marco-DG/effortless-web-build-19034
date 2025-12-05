import React from 'react';
import { useAppStore } from '../../store/app-store';
import { CheckCircle2 } from 'lucide-react';

interface FeatureItem {
    title: string;
    description: string;
}

interface FeaturesProps {
    title: string;
    subtitle: string;
    items: FeatureItem[];
}

export const UniversalFeatures: React.FC<FeaturesProps> = ({
    title,
    subtitle,
    items = []
}) => {
    const { activeProject } = useAppStore();

    return (
        <section className="py-20 bg-[var(--theme-background)] text-[var(--theme-text)]">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-[var(--theme-primary)] font-medium tracking-wider uppercase text-sm">
                        {subtitle}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-[var(--theme-radius)] border border-[var(--theme-text)]/10 hover:border-[var(--theme-primary)]/50 transition-all hover:shadow-lg bg-white/5 backdrop-blur-sm group"
                        >
                            <div className="w-12 h-12 mb-4 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)] group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-heading">{item.title}</h3>
                            <p className="text-[var(--theme-text)]/70 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
