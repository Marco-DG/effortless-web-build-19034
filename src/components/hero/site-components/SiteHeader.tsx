import { BuilderData } from "../InteractiveBuilder";
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

  return (
    <header
      className="sticky top-0 z-50 text-white shadow-lg transition-all duration-300"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            {data.logoUrl ? (
              <img
                src={data.logoUrl}
                alt={`${data.businessName} logo`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: accentColor }}
              >
                {data.businessType === "restaurant" && "🍝"}
                {data.businessType === "bar" && "🍸"}
                {data.businessType === "cafe" && "☕"}
                {data.businessType === "pub" && "🍺"}
                {!data.businessType && "🏪"}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold">{data.businessName || "Il Tuo Locale"}</h1>
              {data.tagline && (
                <p className="text-xs opacity-90 hidden sm:block">{data.tagline}</p>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#menu"
              className="hover:opacity-80 transition-opacity"
              style={{ color: accentColor }}
            >
              Menu
            </a>
            {data.about && (
              <a
                href="#chi-siamo"
                className="hover:opacity-80 transition-opacity"
                style={{ color: accentColor }}
              >
                Chi Siamo
              </a>
            )}
            {data.events.length > 0 && (
              <a
                href="#eventi"
                className="hover:opacity-80 transition-opacity"
                style={{ color: accentColor }}
              >
                Eventi
              </a>
            )}
            <a
              href="#contatti"
              className="hover:opacity-80 transition-opacity"
              style={{ color: accentColor }}
            >
              Contatti
            </a>
            {data.reservationLink && (
              <a
                href={data.reservationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: secondaryColor }}
              >
                Prenota
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <a
              href="#menu"
              className="block py-2 hover:opacity-80 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              Menu
            </a>
            {data.about && (
              <a
                href="#chi-siamo"
                className="block py-2 hover:opacity-80 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                Chi Siamo
              </a>
            )}
            {data.events.length > 0 && (
              <a
                href="#eventi"
                className="block py-2 hover:opacity-80 transition-opacity"
                onClick={() => setMenuOpen(false)}
              >
                Eventi
              </a>
            )}
            <a
              href="#contatti"
              className="block py-2 hover:opacity-80 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              Contatti
            </a>
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

