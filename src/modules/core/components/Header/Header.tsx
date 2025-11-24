import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '../../../../store/app-store';

interface HeaderProps {
    layout: 'classic' | 'centered' | 'minimal' | 'double';
    logoText: string;
    links: Array<{ label: string; href: string }>;
    showCta: boolean;
    ctaText: string;
    style: 'solid' | 'transparent' | 'glass';
    sticky: boolean;
    navigationMode?: 'auto' | 'manual';
}

export const UniversalHeader: React.FC<HeaderProps> = ({
    layout = 'classic',
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
            background = "bg-transparent border-b border-transparent";
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

    // Sub-components for reuse
    const Logo = () => (
        <div className="text-2xl font-bold font-heading tracking-tight whitespace-nowrap">
            {businessName}
        </div>
    );

    const DesktopNav = () => (
        <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
                <a
                    key={i}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer whitespace-nowrap"
                >
                    {link.label}
                </a>
            ))}
        </nav>
    );

    const CTA = () => (
        <button className="px-5 py-2.5 bg-[var(--theme-primary)] text-white text-sm font-medium rounded-[var(--theme-radius)] hover:opacity-90 transition-transform hover:scale-105 whitespace-nowrap">
            {ctaText}
        </button>
    );

    // Layout Logic
    const isCentered = layout === 'centered';
    const isMinimal = layout === 'minimal';
    const isDouble = layout === 'double';
    const isClassic = !isCentered && !isMinimal && !isDouble; // Default fallback

    return (
        <header className={getHeaderClass()}>
            <div className={`container mx-auto px-6 h-20 flex items-center ${isCentered || isDouble ? 'justify-center relative' : 'justify-between'}`}>

                {/* --- CLASSIC LAYOUT (Default) --- */}
                {isClassic && (
                    <>
                        <Logo />
                        <div className="flex items-center gap-8">
                            <DesktopNav />
                            {showCta && <div className="hidden md:block"><CTA /></div>}

                            {/* Mobile Toggle */}
                            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </>
                )}

                {/* --- CENTERED LAYOUT --- */}
                {isCentered && (
                    <>
                        {/* Left: Nav (Desktop) / Toggle (Mobile) */}
                        <div className="absolute left-6 flex items-center z-10">
                            <div className="hidden md:block"><DesktopNav /></div>
                            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>

                        {/* Center: Logo */}
                        <div className="z-20">
                            <Logo />
                        </div>

                        {/* Right: CTA */}
                        <div className="absolute right-6 flex items-center gap-6 z-10">
                            {showCta && <div className="hidden md:block"><CTA /></div>}
                        </div>
                    </>
                )}

                {/* --- DOUBLE LAYOUT (Logo Top, Nav Bottom) --- */}
                {isDouble && (
                    <>
                        <div className="flex flex-col items-center w-full py-2">
                            <div className="mb-1"><Logo /></div>
                            <div className="hidden md:block"><DesktopNav /></div>
                        </div>

                        {/* Mobile Toggle (Absolute Right) */}
                        <button className="md:hidden absolute right-6 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </>
                )}

                {/* --- MINIMAL LAYOUT --- */}
                {isMinimal && (
                    <>
                        <Logo />
                        <div className="flex items-center gap-6">
                            {showCta && <div className="hidden md:block"><CTA /></div>}

                            {/* Always show hamburger for Minimal */}
                            <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile / Overlay Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-[var(--theme-background)] border-b border-white/10 p-6 shadow-xl animate-in slide-in-from-top-5 z-50">
                    <nav className="flex flex-col gap-4 text-center">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="text-lg font-medium text-[var(--theme-text)] cursor-pointer py-2"
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
