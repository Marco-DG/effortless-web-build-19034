import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BuilderData, Event } from "../InteractiveBuilder";
import { ArrowLeft, ArrowRight, Plus, X, Calendar, Clock } from "lucide-react";
import { useState } from "react";

interface BuilderStep6Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep6 = ({ data, onUpdate, onNext, onBack }: BuilderStep6Props) => {
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const addEvent = () => {
    if (newEvent.title.trim() && newEvent.date.trim() && newEvent.time.trim()) {
      const event: Event = {
        ...newEvent,
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      onUpdate({
        events: [...data.events, event],
      });
      setNewEvent({ title: "", description: "", date: "", time: "", location: "" });
    }
  };

  const removeEvent = (index: number) => {
    const updatedEvents = data.events.filter((_, i) => i !== index);
    onUpdate({ events: updatedEvents });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold mb-4">Eventi e Appuntamenti</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Aggiungi eventi futuri come serate live, degustazioni, DJ set, ecc.
        </p>
      </div>

      <div className="space-y-4">
        {data.events.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.events.map((event, idx) => (
              <div
                key={event.id}
                className="flex items-start justify-between p-4 bg-muted/50 rounded-lg border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{event.date}</span>
                    <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                    <span className="text-sm text-muted-foreground">{event.time}</span>
                  </div>
                  <p className="font-semibold">{event.title}</p>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  )}
                  {event.location && (
                    <p className="text-xs text-muted-foreground mt-1">📍 {event.location}</p>
                  )}
                </div>
                <button
                  onClick={() => removeEvent(idx)}
                  className="p-1 hover:bg-destructive/10 rounded transition-colors ml-2"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border-2 border-dashed">
          <div>
            <Label htmlFor="eventTitle" className="text-sm font-medium">
              Titolo evento
            </Label>
            <Input
              id="eventTitle"
              placeholder="Es: Serata Live Jazz"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="eventDate" className="text-sm font-medium">
                Data
              </Label>
              <Input
                id="eventDate"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="eventTime" className="text-sm font-medium">
                Ora
              </Label>
              <Input
                id="eventTime"
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="eventLocation" className="text-sm font-medium">
              Luogo (opzionale)
            </Label>
            <Input
              id="eventLocation"
              placeholder="Es: Sala principale"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="eventDesc" className="text-sm font-medium">
              Descrizione (opzionale)
            </Label>
            <Textarea
              id="eventDesc"
              placeholder="Descrivi l'evento..."
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="mt-2 min-h-20"
            />
          </div>

          <Button
            type="button"
            onClick={addEvent}
            disabled={!newEvent.title.trim() || !newEvent.date.trim() || !newEvent.time.trim()}
            variant="outline"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi evento
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 text-lg py-6 transition-all duration-300 group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Indietro
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="flex-1 text-lg py-6 bg-primary hover:bg-primary/90 transition-all duration-300 group"
        >
          Avanti
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};

