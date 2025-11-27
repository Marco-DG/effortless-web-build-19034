import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useAppStore } from '../../store/app-store';

interface FooterProps {
    columns: '1' | '3' | '4';
    showSocial: boolean;
    showNewsletter: boolean;
    copyrightText: string;
    links: Array<{ label: string; href: string }>;
}

export const UniversalFooter: React.FC<FooterProps> = ({
    columns,
    showSocial,
    showNewsletter,
    copyrightText,
    links = []
}) => {
    const { activeProject } = useAppStore();
    const business = activeProject?.business;

    const gridClass = {
        '1': 'grid-cols-1 text-center',
        '3': 'grid-cols-1 md:grid-cols-3',
        '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <footer className="bg-[var(--theme-secondary)] text-white pt-16 pb-8">
            <div className="container mx-auto px-6">

                <div className={`grid gap-12 mb-16 ${gridClass[columns]}`}>

                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-heading">Brand</h3>
                        <p className="text-white/70 leading-relaxed">
                            Creating unforgettable dining experiences since 2010.
                        </p>
                        {showSocial && business?.social && (
                            <div className={`flex gap-4 ${columns === '1' ? 'justify-center' : ''}`}>
                                {business.social.instagram && <a href={business.social.instagram} className="hover:text-[var(--theme-primary)] transition-colors"><Instagram className="w-5 h-5" /></a>}
                                {business.social.facebook && <a href={business.social.facebook} className="hover:text-[var(--theme-primary)] transition-colors"><Facebook className="w-5 h-5" /></a>}
                                {business.social.twitter && <a href={business.social.twitter} className="hover:text-[var(--theme-primary)] transition-colors"><Twitter className="w-5 h-5" /></a>}
                            </div>
                        )}
                    </div>

                    {/* Column 2: Links (if not 1 col) */}
                    {columns !== '1' && (
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Quick Links</h4>
                            <ul className="space-y-2">
                                {links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.href} className="text-white/70 hover:text-white transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Column 3: Contact (if not 1 col) */}
                    {columns !== '1' && (
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Contact</h4>
                            <ul className="space-y-2 text-white/70">
                                {business?.contact?.address && <li>{business.contact.address}</li>}
                                {business?.contact?.phone && <li>{business.contact.phone}</li>}
                                {business?.contact?.email && <li>{business.contact.email}</li>}
                            </ul>
                        </div>
                    )}

                    {/* Column 4: Newsletter (or combined) */}
                    {(columns === '4' || showNewsletter) && (
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Newsletter</h4>
                            <p className="text-white/70 text-sm">Subscribe for updates and exclusive offers.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-white/10 border border-white/20 rounded px-4 py-2 text-sm w-full focus:outline-none focus:border-white/50"
                                />
                                <button className="bg-[var(--theme-primary)] px-4 py-2 rounded hover:opacity-90">
                                    <Mail className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
                    <p>{copyrightText}</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
