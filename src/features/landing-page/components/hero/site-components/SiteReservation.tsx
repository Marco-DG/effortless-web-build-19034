import { BuilderData } from "../InteractiveBuilder";
import { Calendar, Clock, Users, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface SiteReservationProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteReservation = ({ data, templateColors }: SiteReservationProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    alert("Prenotazione inviata! Ti contatteremo presto.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      message: "",
    });
  };

  return (
    <section id="prenotazioni" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h3
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: primaryColor }}
        >
          Prenota un Tavolo
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="resName" className="text-sm font-medium">
                  Nome *
                </Label>
                <Input
                  id="resName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resEmail" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="resEmail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="resPhone" className="text-sm font-medium">
                    Telefono *
                  </Label>
                  <Input
                    id="resPhone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resDate" className="text-sm font-medium">
                    Data *
                  </Label>
                  <Input
                    id="resDate"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="resTime" className="text-sm font-medium">
                    Ora *
                  </Label>
                  <Input
                    id="resTime"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="resGuests" className="text-sm font-medium">
                  Numero di persone *
                </Label>
                <Input
                  id="resGuests"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="resMessage" className="text-sm font-medium">
                  Note speciali (opzionale)
                </Label>
                <Textarea
                  id="resMessage"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 min-h-24"
                  placeholder="Allergie, richieste speciali, occasioni..."
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                style={{ backgroundColor: secondaryColor }}
                size="lg"
              >
                Conferma Prenotazione
              </Button>
            </form>
          </div>

          {/* Info Side */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="font-semibold text-lg mb-4" style={{ color: primaryColor }}>
                Informazioni
              </h4>
              <div className="space-y-3">
                {data.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <a href={`tel:${data.phone}`} className="hover:underline">
                      {data.phone}
                    </a>
                  </div>
                )}
                {data.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <a href={`mailto:${data.email}`} className="hover:underline">
                      {data.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {data.reservationLink && (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Oppure prenota tramite il nostro partner
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(data.reservationLink, "_blank")}
                >
                  Prenota su TheFork
                </Button>
              </div>
            )}

            {data.openingHours && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="font-semibold text-lg mb-4" style={{ color: primaryColor }}>
                  Orari di Apertura
                </h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(data.openingHours).map(([day, hours]) => {
                    const dayLabels: Record<string, string> = {
                      monday: "Lunedì",
                      tuesday: "Martedì",
                      wednesday: "Mercoledì",
                      thursday: "Giovedì",
                      friday: "Venerdì",
                      saturday: "Sabato",
                      sunday: "Domenica",
                    };
                    return (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{dayLabels[day]}:</span>
                        <span>
                          {hours.closed ? (
                            <span className="text-muted-foreground">Chiuso</span>
                          ) : (
                            `${hours.open} - ${hours.close}`
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

