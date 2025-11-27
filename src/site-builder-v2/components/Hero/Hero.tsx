import React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
    layout: 'center' | 'split-left' | 'split-right' | 'cinematic';
    style: 'minimal' | 'gradient' | 'dark-overlay';
    ctaText?: string;
    ctaLink?: string;
}

export const UniversalHero: React.FC<HeroProps> = ({
    title,
    subtitle,
    backgroundImage,
    layout = 'center',
    style = 'dark-overlay',
    ctaText,
    ctaLink
}) => {

    // --- Styles ---
    const overlayStyles = {
        'minimal': 'bg-opacity-0',
        'gradient': 'bg-gradient-to-r from-black/80 to-transparent',
        'dark-overlay': 'bg-black/50'
    };

    const containerStyles = {
        'center': 'items-center text-center justify-center',
        'split-left': 'items-center justify-start text-left',
        'split-right': 'items-center justify-end text-right',
        'cinematic': 'items-end pb-24 text-center justify-center'
    };

    const textWidth = layout === 'center' || layout === 'cinematic' ? 'max-w-4xl' : 'max-w-xl';

    return (
        <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* Overlay */}
            <div className={`absolute inset-0 ${overlayStyles[style]}`} />

            {/* Content */}
            <div className={`relative z-10 container mx-auto px-6 flex h-full ${containerStyles[layout]}`}>
                <div className={`${textWidth} space-y-6`}>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                        {title}
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                        {subtitle}
                    </p>

                    {(ctaText && ctaLink) && (
                        <div className="pt-4">
                            <a
                                href={ctaLink}
                                className="inline-block px-8 py-4 bg-[var(--theme-primary)] text-white font-medium rounded-[var(--theme-radius)] hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg"
                            >
                                {ctaText}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
