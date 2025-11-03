import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BuilderData, OpeningHours } from "../InteractiveBuilder";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface BuilderStep8Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const days = [
  { key: "monday", label: "Lunedì" },
  { key: "tuesday", label: "Martedì" },
  { key: "wednesday", label: "Mercoledì" },
  { key: "thursday", label: "Giovedì" },
  { key: "friday", label: "Venerdì" },
  { key: "saturday", label: "Sabato" },
  { key: "sunday", label: "Domenica" },
] as const;

export const BuilderStep8 = ({ data, onUpdate, onNext, onBack }: BuilderStep8Props) => {
  const [openingHours, setOpeningHours] = useState<OpeningHours>(
    data.openingHours || {
      monday: { open: "12:00", close: "23:00", closed: false },
      tuesday: { open: "12:00", close: "23:00", closed: false },
      wednesday: { open: "12:00", close: "23:00", closed: false },
      thursday: { open: "12:00", close: "23:00", closed: false },
      friday: { open: "12:00", close: "23:00", closed: false },
      saturday: { open: "12:00", close: "23:00", closed: false },
      sunday: { open: "12:00", close: "23:00", closed: false },
    }
  );

  const updateDay = (day: keyof OpeningHours, field: "open" | "close" | "closed", value: string | boolean) => {
    const updated = {
      ...openingHours,
      [day]: {
        ...openingHours[day],
        [field]: value,
      },
    };
    setOpeningHours(updated);
    onUpdate({ openingHours: updated });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold mb-4">Orari di Apertura</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Imposta gli orari di apertura del tuo locale
        </p>
      </div>

      <div className="space-y-2">
        {days.map(({ key, label }) => {
          const day = openingHours[key];
          return (
            <div
              key={key}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 bg-muted/20 rounded-lg border border-gray-200/50"
            >
              <div className="w-full sm:w-20 font-medium text-xs sm:text-sm flex-shrink-0">{label}</div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={!day.closed}
                  onChange={(e) => updateDay(key, "closed", !e.target.checked)}
                  className="w-3.5 h-3.5"
                />
                <Label className="text-xs">Aperto</Label>
              </div>
              {!day.closed && (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Input
                    id={`${key}-open`}
                    type="time"
                    value={day.open}
                    onChange={(e) => updateDay(key, "open", e.target.value)}
                    className="w-full sm:w-24 text-xs sm:text-sm h-8"
                  />
                  <span className="text-xs text-muted-foreground">-</span>
                  <Input
                    id={`${key}-close`}
                    type="time"
                    value={day.close}
                    onChange={(e) => updateDay(key, "close", e.target.value)}
                    className="w-full sm:w-24 text-xs sm:text-sm h-8"
                  />
                </div>
              )}
              {day.closed && (
                <span className="text-xs text-muted-foreground">Chiuso</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div>
          <Label htmlFor="reservationLink" className="text-sm font-medium">
            Link prenotazioni (opzionale)
          </Label>
          <Input
            id="reservationLink"
            placeholder="Es: https://thefork.com/..."
            value={data.reservationLink || ""}
            onChange={(e) => onUpdate({ reservationLink: e.target.value })}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">
            Link servizi delivery (opzionale)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="glovo" className="text-xs text-muted-foreground">
                Glovo
              </Label>
              <Input
                id="glovo"
                placeholder="URL Glovo"
                value={data.deliveryLinks?.glovo || ""}
                onChange={(e) =>
                  onUpdate({
                    deliveryLinks: {
                      ...data.deliveryLinks,
                      glovo: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="uberEats" className="text-xs text-muted-foreground">
                UberEats
              </Label>
              <Input
                id="uberEats"
                placeholder="URL UberEats"
                value={data.deliveryLinks?.uberEats || ""}
                onChange={(e) =>
                  onUpdate({
                    deliveryLinks: {
                      ...data.deliveryLinks,
                      uberEats: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="deliveroo" className="text-xs text-muted-foreground">
                Deliveroo
              </Label>
              <Input
                id="deliveroo"
                placeholder="URL Deliveroo"
                value={data.deliveryLinks?.deliveroo || ""}
                onChange={(e) =>
                  onUpdate({
                    deliveryLinks: {
                      ...data.deliveryLinks,
                      deliveroo: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="justEat" className="text-xs text-muted-foreground">
                Just Eat
              </Label>
              <Input
                id="justEat"
                placeholder="URL Just Eat"
                value={data.deliveryLinks?.justEat || ""}
                onChange={(e) =>
                  onUpdate({
                    deliveryLinks: {
                      ...data.deliveryLinks,
                      justEat: e.target.value,
                    },
                  })
                }
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

