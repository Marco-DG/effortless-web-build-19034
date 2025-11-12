import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface BuilderStep5Props {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep5: React.FC<BuilderStep5Props> = ({ data, onUpdate, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Chi Siamo</h3>
        <p className="text-sm text-muted-foreground">
          Racconta la storia del tuo ristorante
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="aboutTitle">Titolo Sezione</Label>
          <Input
            id="aboutTitle"
            value={data.aboutTitle || 'La nostra storia'}
            onChange={(e) => onUpdate({ aboutTitle: e.target.value })}
            placeholder="La nostra storia"
          />
        </div>

        <div>
          <Label htmlFor="aboutContent">Contenuto</Label>
          <Textarea
            id="aboutContent"
            value={data.aboutContent || ''}
            onChange={(e) => onUpdate({ aboutContent: e.target.value })}
            placeholder="Racconta la storia del tuo ristorante, la tua passione per la cucina..."
            rows={8}
          />
        </div>

        <div>
          <Label htmlFor="aboutImage">URL Immagine (opzionale)</Label>
          <Input
            id="aboutImage"
            value={data.aboutImage || ''}
            onChange={(e) => onUpdate({ aboutImage: e.target.value })}
            placeholder="https://esempio.com/foto-ristorante.jpg"
            type="url"
          />
        </div>
      </div>
    </div>
  );
};