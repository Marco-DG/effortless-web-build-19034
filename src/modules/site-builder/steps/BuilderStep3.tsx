import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BuilderStep3Props {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep3: React.FC<BuilderStep3Props> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Sezione Hero</h3>
        <p className="text-sm text-muted-foreground">
          Personalizza la sezione principale del tuo sito
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Titolo Principale</Label>
          <Input
            id="title"
            value={data.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Nome del ristorante"
          />
        </div>

        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={data.tagline || ''}
            onChange={(e) => onUpdate({ tagline: e.target.value })}
            placeholder="Il tuo slogan"
          />
        </div>

        <div>
          <Label htmlFor="description">Descrizione</Label>
          <Textarea
            id="description"
            value={data.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Descrizione del tuo ristorante..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};