import React from 'react';
import { useAppStore } from '../../../../store/app-store';
import { Award, Trophy } from 'lucide-react';

interface AwardItem {
    name: string;
    year: string;
    label: string;
}

interface AwardsProps {
    title: string;
    items: AwardItem[];
}

export const UniversalAwards: React.FC<AwardsProps> = ({
    title,
    items = []
}) => {
    return (
        <section className="py-16 border-y border-slate-100 bg-slate-50/50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <h3 className="text-xl font-bold font-heading text-[var(--theme-secondary)] whitespace-nowrap">
                        {title}
                    </h3>

                    <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-12 w-full">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                <div className="w-10 h-10 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)]">
                                    <Trophy className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-slate-900">{item.name}</div>
                                    <div className="text-xs text-slate-500">{item.label} • {item.year}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
