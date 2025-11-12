import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface BuilderStep6Props {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep6: React.FC<BuilderStep6Props> = ({ data, onUpdate, onNext, onBack }) => {
  const events = data.events || [];

  const handleAddEvent = () => {
    const newEvent = {
      id: `event_${Date.now()}`,
      title: 'Nuovo evento',
      description: '',
      date: '',
      time: '',
      price: ''
    };
    onUpdate({ events: [...events, newEvent] });
  };

  const handleUpdateEvent = (id: string, updates: any) => {
    const updatedEvents = events.map((event: any) => 
      event.id === id ? { ...event, ...updates } : event
    );
    onUpdate({ events: updatedEvents });
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event: any) => event.id !== id);
    onUpdate({ events: updatedEvents });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Eventi</h3>
        <p className="text-sm text-muted-foreground">
          Gestisci eventi speciali, promozioni e serate a tema
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Eventi ({events.length})
          </span>
          <Button onClick={handleAddEvent} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi evento
          </Button>
        </div>

        <div className="space-y-4">
          {events.map((event: any) => (
            <div key={event.id} className="border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Titolo evento</Label>
                  <Input
                    value={event.title}
                    onChange={(e) => handleUpdateEvent(event.id, { title: e.target.value })}
                    placeholder="Nome dell'evento"
                  />
                </div>
                <div>
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={event.date}
                    onChange={(e) => handleUpdateEvent(event.id, { date: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Ora</Label>
                  <Input
                    type="time"
                    value={event.time}
                    onChange={(e) => handleUpdateEvent(event.id, { time: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Prezzo (opzionale)</Label>
                  <Input
                    value={event.price}
                    onChange={(e) => handleUpdateEvent(event.id, { price: e.target.value })}
                    placeholder="€25,00"
                  />
                </div>
              </div>

              <div>
                <Label>Descrizione</Label>
                <Textarea
                  value={event.description}
                  onChange={(e) => handleUpdateEvent(event.id, { description: e.target.value })}
                  placeholder="Descrizione dell'evento..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Rimuovi
                </Button>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nessun evento programmato</p>
              <Button onClick={handleAddEvent} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi primo evento
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};