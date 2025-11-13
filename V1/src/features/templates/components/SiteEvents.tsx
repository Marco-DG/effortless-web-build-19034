import { BuilderData } from "@/types/builder";
import { Calendar, Clock, MapPin } from "lucide-react";

interface SiteEventsProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteEvents = ({ data, templateColors }: SiteEventsProps) => {
  if (data.events.length === 0) return null;

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  // Filter future events
  const futureEvents = data.events.filter((event) => {
    const eventDate = new Date(`${event.date}T${event.time}`);
    return eventDate >= new Date();
  });

  if (futureEvents.length === 0) return null;

  return (
    <section id="eventi" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h3
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: primaryColor }}
        >
          Prossimi Eventi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
                  {event.title}
                </h4>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString("it-IT", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
                {event.description && (
                  <p className="text-sm text-gray-700 mb-4">{event.description}</p>
                )}
                <button
                  className="w-full px-4 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: secondaryColor }}
                >
                  Iscriviti / Prenota
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

