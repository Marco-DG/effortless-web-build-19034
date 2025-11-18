import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '../../../../store/app-store';

interface HeaderProps {
    logoText: string;
    links: Array<{ label: string; href: string }>;
    showCta: boolean;
    ctaText: string;
    style: 'solid' | 'transparent' | 'glass';
    sticky: boolean;
    navigationMode?: 'auto' | 'manual';
}

export const UniversalHeader: React.FC<HeaderProps> = ({
    logoText,
    links = [],
    showCta,
    ctaText,
    style,
    sticky,
    navigationMode = 'auto'
}) => {
    const { activeProject, setActivePage } = useAppStore();
    const businessName = activeProject?.business?.name || logoText;

    const navLinks = React.useMemo(() => {
        if (navigationMode === 'auto' && activeProject?.pages) {
            return activeProject.pages.map(page => ({
                label: page.title,
                href: page.slug, // In a real app this would be the route
                id: page.id // Store ID for internal navigation
            }));
        }
        return links;
    }, [navigationMode, activeProject?.pages, links]);

    const handleNavClick = (e: React.MouseEvent, link: any) => {
        if (link.id) {
            e.preventDefault();
            setActivePage(link.id);
            setMobileMenuOpen(false);
        }
    };

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dynamic classes based on state and config
    const getHeaderClass = () => {
        const base = "w-full z-50 transition-all duration-300";
        const position = sticky ? "fixed top-0 left-0 right-0" : "absolute top-0 left-0 right-0";

        let background = "";
        let textColor = "";

        if (style === 'solid' || (style === 'transparent' && scrolled)) {
            background = "bg-[var(--theme-background)] border-b border-white/10 shadow-sm";
            textColor = "text-[var(--theme-text)]";
        } else if (style === 'transparent') {
            background = "bg-transparent";
            textColor = "text-white"; // Assuming transparent is usually over dark hero
        } else if (style === 'glass') {
            background = "bg-white/10 backdrop-blur-md border-b border-white/10";
            textColor = "text-white";
        }

        // Override for scrolled state if transparent
        if (style === 'transparent' && !scrolled) {
            // keep transparent
        } else if (scrolled) {
            // Force solid look on scroll for readability
            background = "bg-[var(--theme-background)]/95 backdrop-blur-md shadow-md";
            textColor = "text-[var(--theme-text)]";
        }

        return `${base} ${position} ${background} ${textColor}`;
    };

    return (
        <header className={getHeaderClass()}>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold font-heading tracking-tight">
                    {businessName}
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link)}
                            className="text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
                        >
                            {link.label}
                        </a>
                    ))}

                    {showCta && (
                        <button className="px-5 py-2.5 bg-[var(--theme-primary)] text-white text-sm font-medium rounded-[var(--theme-radius)] hover:opacity-90 transition-transform hover:scale-105">
                            {ctaText}
                        </button>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-[var(--theme-background)] border-b border-white/10 p-6 shadow-xl animate-in slide-in-from-top-5">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="text-lg font-medium text-[var(--theme-text)] cursor-pointer"
                                onClick={(e) => handleNavClick(e, link)}
                            >
                                {link.label}
                            </a>
                        ))}
                        {showCta && (
                            <button className="mt-4 w-full py-3 bg-[var(--theme-primary)] text-white font-medium rounded-[var(--theme-radius)]">
                                {ctaText}
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};
