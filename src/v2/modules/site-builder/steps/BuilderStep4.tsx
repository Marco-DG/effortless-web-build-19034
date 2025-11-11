import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BuilderStep4Props {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep4: React.FC<BuilderStep4Props> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Menu del Ristorante</h3>
        <p className="text-sm text-muted-foreground">
          Il menu viene gestito automaticamente dalla sezione Menu Builder
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="menuTitle">Titolo Sezione Menu</Label>
          <Input
            id="menuTitle"
            value={data.menuTitle || 'Il Nostro Menu'}
            onChange={(e) => onUpdate({ menuTitle: e.target.value })}
            placeholder="Il Nostro Menu"
          />
        </div>

        <div>
          <Label htmlFor="menuSubtitle">Sottotitolo (opzionale)</Label>
          <Input
            id="menuSubtitle"
            value={data.menuSubtitle || ''}
            onChange={(e) => onUpdate({ menuSubtitle: e.target.value })}
            placeholder="Scopri i nostri piatti della tradizione"
          />
        </div>

        <div className="p-4 border rounded-lg bg-muted/20">
          <p className="text-sm text-muted-foreground">
            📋 Per gestire gli elementi del menu (piatti, prezzi, descrizioni), 
            usa la tab "Menu" nel builder principale.
          </p>
        </div>
      </div>
    </div>
  );
};