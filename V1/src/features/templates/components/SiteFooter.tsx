import { BuilderData } from "@/types/builder";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

interface SiteFooterProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  variant?: "wine" | "fine" | "trattoria";
}

export const SiteFooter = ({ data, templateColors, variant = "trattoria" }: SiteFooterProps) => {
  const primaryColor = templateColors?.primary || "#8B4513";
  const accentColor = templateColors?.accent || "#F4A460";

  const containerMax = variant === "wine" ? "max-w-7xl" : variant === "fine" ? "max-w-6xl" : "max-w-6xl";
  const padY = variant === "fine" ? "py-20" : "py-16";
  return (
    <footer
      className={`text-white ${padY} px-6`}
      style={{ backgroundColor: primaryColor }}
    >
      <div className={`container mx-auto ${containerMax}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{data.businessName || "Il Tuo Locale"}</h3>
            {data.tagline && <p className="text-sm opacity-90 mb-4">{data.tagline}</p>}
            <div className="flex gap-4">
              {data.socialLinks.facebook && (
                <a
                  href={data.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {data.socialLinks.instagram && (
                <a
                  href={data.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {data.socialLinks.tripadvisor && (
                <a
                  href={data.socialLinks.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="TripAdvisor"
                >
                  <span className="text-sm">TripAdvisor</span>
                </a>
              )}
            </div>
          </div>

          {/* Link Rapidi */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: accentColor }}>
              Link Rapidi
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#menu" className="hover:opacity-80 transition-opacity">
                  Menu
                </a>
              </li>
              {data.about && (
                <li>
                  <a href="#about" className="hover:opacity-80 transition-opacity">
                    Chi Siamo
                  </a>
                </li>
              )}
              {(data.events && data.events.length > 0) && (
                <li>
                  <a href="#events" className="hover:opacity-80 transition-opacity">
                    Eventi
                  </a>
                </li>
              )}
              <li>
                <a href="#contact" className="hover:opacity-80 transition-opacity">
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: accentColor }}>
              Contatti
            </h4>
            <ul className="space-y-2 text-sm">
              {data.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{data.address}</span>
                </li>
              )}
              {data.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href={`tel:${data.phone}`} className="hover:opacity-80 transition-opacity">
                    {data.phone}
                  </a>
                </li>
              )}
              {data.email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a
                    href={`mailto:${data.email}`}
                    className="hover:opacity-80 transition-opacity"
                  >
                    {data.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Orari */}
        {data.openingHours && (
          <div className="mb-8 pt-8 border-t border-white/20">
            <h4 className="font-semibold mb-4" style={{ color: accentColor }}>
              Orari di Apertura
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(data.openingHours).map(([day, hours]) => {
                const dayLabels: Record<string, string> = {
                  monday: "Lun",
                  tuesday: "Mar",
                  wednesday: "Mer",
                  thursday: "Gio",
                  friday: "Ven",
                  saturday: "Sab",
                  sunday: "Dom",
                };
                return (
                  <div key={day}>
                    <span className="font-medium">{dayLabels[day]}: </span>
                    {hours.closed ? (
                      <span className="opacity-75">Chiuso</span>
                    ) : (
                      <span>{hours.open} - {hours.close}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="pt-8 border-t border-white/20 text-center text-sm opacity-75">
          <p>
            © {new Date().getFullYear()} {data.businessName || "Il Tuo Locale"}. Tutti i diritti
            riservati.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#privacy" className="hover:opacity-80 transition-opacity">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#cookie" className="hover:opacity-80 transition-opacity">
              Cookie Policy
            </a>
            <span>•</span>
            <a href="#termini" className="hover:opacity-80 transition-opacity">
              Termini di Servizio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

