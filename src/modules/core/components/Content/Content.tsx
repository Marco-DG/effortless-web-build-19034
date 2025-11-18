import React from 'react';
import { useAppStore } from '../../../../store/app-store';
import ReactMarkdown from 'react-markdown';

interface ContentProps {
    title: string;
    subtitle: string;
    text: string;
    image: string;
    layout: 'image-left' | 'image-right';
    ctaText: string;
    ctaLink: string;
}

export const UniversalContent: React.FC<ContentProps> = ({
    title,
    subtitle,
    text,
    image,
    layout,
    ctaText,
    ctaLink
}) => {
    const { activeProject } = useAppStore();
    const theme = activeProject?.theme;

    const isImageLeft = layout === 'image-left';

    return (
        <section className="py-20 bg-[var(--theme-background)] text-[var(--theme-text)]">
            <div className="container mx-auto px-6">
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isImageLeft ? '' : 'lg:flex-row-reverse'}`}>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-[var(--theme-radius)] overflow-hidden shadow-xl aspect-[4/3]">
                            {image ? (
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    No Image
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="space-y-2">
                            <span className="text-[var(--theme-primary)] font-medium tracking-wider uppercase text-sm">
                                {subtitle}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                                {title}
                            </h2>
                        </div>

                        <div className="prose prose-lg text-[var(--theme-text)]/80">
                            <ReactMarkdown>{text}</ReactMarkdown>
                        </div>

                        {ctaText && (
                            <a
                                href={ctaLink}
                                className="inline-block px-8 py-3 bg-[var(--theme-primary)] text-white font-medium rounded-[var(--theme-radius)] hover:opacity-90 transition-transform hover:scale-105"
                            >
                                {ctaText}
                            </a>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
};
