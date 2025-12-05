import React from 'react';
import { CalendarDays } from 'lucide-react';

interface ReservationProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
}

export const UniversalReservation: React.FC<ReservationProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    backgroundImage
}) => {
    return (
        <section className="relative py-32 flex items-center justify-center text-center overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="Reservation Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-2xl">
                <CalendarDays className="w-12 h-12 text-[var(--theme-primary)] mx-auto mb-6" />

                <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
                    {title}
                </h2>

                <p className="text-lg text-white/90 mb-10 leading-relaxed">
                    {description}
                </p>

                <a
                    href={buttonLink}
                    className="inline-block px-8 py-4 bg-[var(--theme-primary)] text-white text-lg font-bold rounded-[var(--theme-radius)] hover:bg-white hover:text-[var(--theme-secondary)] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    {buttonText}
                </a>
            </div>
        </section>
    );
};
