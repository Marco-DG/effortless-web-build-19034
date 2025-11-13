import { BuilderData } from "@/types/builder";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SiteContactProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteContact = ({ data, templateColors }: SiteContactProps) => {
  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  const formatOpeningHours = () => {
    if (!data.openingHours) return null;

    const days = [
      { key: "monday", label: "Lunedì" },
      { key: "tuesday", label: "Martedì" },
      { key: "wednesday", label: "Mercoledì" },
      { key: "thursday", label: "Giovedì" },
      { key: "friday", label: "Venerdì" },
      { key: "saturday", label: "Sabato" },
      { key: "sunday", label: "Domenica" },
    ] as const;

    return days.map(({ key, label }) => {
      const day = data.openingHours![key];
      if (day.closed) {
        return `${label}: Chiuso`;
      }
      return `${label}: ${day.open} - ${day.close}`;
    });
  };

  const mapUrl = data.mapLat && data.mapLng
    ? `https://www.google.com/maps?q=${data.mapLat},${data.mapLng}`
    : data.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`
    : null;

  return (
    <section id="contatti" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h3
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: primaryColor }}
        >
          Contattaci
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {data.address && (
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <div>
                    <p className="font-semibold mb-1">Indirizzo</p>
                    <p className="text-gray-600">{data.address}</p>
                    {mapUrl && (
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm mt-2 inline-flex items-center gap-1 hover:underline"
                        style={{ color: secondaryColor }}
                      >
                        Apri su Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {data.phone && (
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <div>
                    <p className="font-semibold mb-1">Telefono</p>
                    <a
                      href={`tel:${data.phone}`}
                      className="text-gray-600 hover:underline"
                    >
                      {data.phone}
                    </a>
                  </div>
                </div>
              )}

              {data.email && (
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href={`mailto:${data.email}`}
                      className="text-gray-600 hover:underline"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>
              )}

              {data.openingHours && (
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <div>
                    <p className="font-semibold mb-2">Orari di Apertura</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      {formatOpeningHours()?.map((hours, idx) => (
                        <p key={idx}>{hours}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Links */}
            {data.deliveryLinks && (
              <div className="pt-6 border-t">
                <p className="font-semibold mb-3">Ordina Online</p>
                <div className="flex flex-wrap gap-2">
                  {data.deliveryLinks.glovo && (
                    <a
                      href={data.deliveryLinks.glovo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#00A082" }}
                    >
                      Glovo
                    </a>
                  )}
                  {data.deliveryLinks.uberEats && (
                    <a
                      href={data.deliveryLinks.uberEats}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#000000" }}
                    >
                      UberEats
                    </a>
                  )}
                  {data.deliveryLinks.deliveroo && (
                    <a
                      href={data.deliveryLinks.deliveroo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#00CDBC" }}
                    >
                      Deliveroo
                    </a>
                  )}
                  {data.deliveryLinks.justEat && (
                    <a
                      href={data.deliveryLinks.justEat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: "#F80000" }}
                    >
                      Just Eat
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            {mapUrl && (
              <div className="mt-6">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(data.address || "")}`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <Input id="contactName" placeholder="Il tuo nome" required />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="la-tua@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="contactMessage" className="block text-sm font-medium mb-2">
                  Messaggio
                </label>
                <Textarea
                  id="contactMessage"
                  placeholder="Scrivi il tuo messaggio..."
                  className="min-h-32"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: secondaryColor }}
              >
                Invia Messaggio
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

