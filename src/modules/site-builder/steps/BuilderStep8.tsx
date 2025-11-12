import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface BuilderStep8Props {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const DAYS = [
  { key: 'monday', label: 'Lunedì' },
  { key: 'tuesday', label: 'Martedì' },
  { key: 'wednesday', label: 'Mercoledì' },
  { key: 'thursday', label: 'Giovedì' },
  { key: 'friday', label: 'Venerdì' },
  { key: 'saturday', label: 'Sabato' },
  { key: 'sunday', label: 'Domenica' }
];

export const BuilderStep8: React.FC<BuilderStep8Props> = ({ data, onUpdate, onNext, onBack }) => {
  const hours = data.hours || {};

  const handleUpdateDay = (day: string, field: string, value: any) => {
    const currentDayHours = hours[day] || { open: '12:00', close: '23:00', closed: false };
    const updatedHours = {
      ...hours,
      [day]: {
        ...currentDayHours,
        [field]: value
      }
    };
    onUpdate({ hours: updatedHours });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Orari di Apertura</h3>
        <p className="text-sm text-muted-foreground">
          Configura gli orari di apertura del tuo ristorante
        </p>
      </div>

      <div className="space-y-4">
        {DAYS.map(({ key, label }) => {
          const dayHours = hours[key] || { open: '12:00', close: '23:00', closed: false };
          
          return (
            <div key={key} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-24">
                <span className="font-medium">{label}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={!dayHours.closed}
                  onCheckedChange={(checked) => handleUpdateDay(key, 'closed', !checked)}
                />
                <span className="text-sm text-muted-foreground">Aperto</span>
              </div>
              
              {!dayHours.closed && (
                <>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Dalle</Label>
                    <Input
                      type="time"
                      value={dayHours.open}
                      onChange={(e) => handleUpdateDay(key, 'open', e.target.value)}
                      className="w-32"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Alle</Label>
                    <Input
                      type="time"
                      value={dayHours.close}
                      onChange={(e) => handleUpdateDay(key, 'close', e.target.value)}
                      className="w-32"
                    />
                  </div>
                </>
              )}
              
              {dayHours.closed && (
                <span className="text-muted-foreground text-sm">Chiuso</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Suggerimento</h4>
        <p className="text-sm text-blue-700">
          Gli orari di apertura vengono mostrati automaticamente nel sito e possono aiutare i clienti 
          a sapere quando possono visitarti o contattarti.
        </p>
      </div>
    </div>
  );
};