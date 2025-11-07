import { BuilderData } from "@/types/builder";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface SiteHeaderProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteHeader = ({ data, templateColors }: SiteHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";
  const accentColor = templateColors?.accent || "#F4A460";

  const useTextLogo = (data.logoMode === "text") && (data.logoText || data.businessName);
  const logoText = data.logoText || data.businessName || "Il Tuo Locale";
  const logoFont = data.logoFont || data.fontSecondary || data.fontPrimary;

  return (
    <header
      className="sticky top-0 z-50 text-white shadow-lg transition-all duration-300 overflow-hidden"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 max-w-full">
        <div className="flex items-center justify-between gap-2">
          {/* Logo e Nome */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {data.logoUrl ? (
              <img
                src={data.logoUrl}
                alt={`${data.businessName || "Logo"}`}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0"
              />
            ) : (
              <div className="flex items-center min-w-0">
                <div
                  className="text-lg sm:text-2xl font-bold truncate"
                  style={{ fontFamily: logoFont, color: accentColor }}
                  title={logoText}
                >
                  {logoText}
                </div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              {/* Non ripetere il titolo quando il logo è testuale o immagine */}
              {false && (
                <h1 className="text-base sm:text-xl font-bold truncate">{data.businessName || "Il Tuo Locale"}</h1>
              )}
              {data.tagline && (
                <p className="text-xs opacity-90 hidden sm:block truncate">{data.tagline}</p>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-shrink-0">
            <a href="#home" className="hover:opacity-80 transition-opacity whitespace-nowrap" style={{ color: accentColor }}>Home</a>
            <a href="#menu" className="hover:opacity-80 transition-opacity whitespace-nowrap" style={{ color: accentColor }}>Menu</a>
            {data.about && (
              <a href="#about" className="hover:opacity-80 transition-opacity whitespace-nowrap" style={{ color: accentColor }}>Chi Siamo</a>
            )}
            <a href="#gallery" className="hover:opacity-80 transition-opacity whitespace-nowrap" style={{ color: accentColor }}>Galleria</a>
            <a href="#contact" className="hover:opacity-80 transition-opacity whitespace-nowrap" style={{ color: accentColor }}>Contatti</a>
            {data.reservationLink && (
              <a
                href={data.reservationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 lg:px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all whitespace-nowrap"
                style={{ backgroundColor: secondaryColor }}
              >
                Prenota
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
            <a href="#home" className="block py-2 hover:opacity-80 transition-opacity" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#menu" className="block py-2 hover:opacity-80 transition-opacity" onClick={() => setMenuOpen(false)}>Menu</a>
            {data.about && (
              <a href="#about" className="block py-2 hover:opacity-80 transition-opacity" onClick={() => setMenuOpen(false)}>Chi Siamo</a>
            )}
            <a href="#gallery" className="block py-2 hover:opacity-80 transition-opacity" onClick={() => setMenuOpen(false)}>Galleria</a>
            <a href="#contact" className="block py-2 hover:opacity-80 transition-opacity" onClick={() => setMenuOpen(false)}>Contatti</a>
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-2 py-2 hover:opacity-80 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                {data.phone}
              </a>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 py-2 hover:opacity-80 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                {data.email}
              </a>
            )}
            {data.reservationLink && (
              <a
                href={data.reservationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-2 rounded-lg font-semibold text-center mt-4"
                style={{ backgroundColor: secondaryColor }}
                onClick={() => setMenuOpen(false)}
              >
                Prenota un tavolo
              </a>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

