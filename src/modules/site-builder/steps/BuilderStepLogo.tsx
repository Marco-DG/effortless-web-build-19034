import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '../../../ui/Button';

interface BuilderStepLogoProps {
  data: any;
  onUpdate: (updates: any) => void;
  onGoDesignLogo: () => void;
}

export const BuilderStepLogo: React.FC<BuilderStepLogoProps> = ({ 
  data, 
  onUpdate, 
  onGoDesignLogo 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Logo</h3>
        <p className="text-sm text-muted-foreground">
          Personalizza il logo del tuo ristorante
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="logoText">Testo del Logo</Label>
          <Input
            id="logoText"
            value={data.logoText || ''}
            onChange={(e) => onUpdate({ logoText: e.target.value })}
            placeholder="Nome del ristorante"
          />
        </div>

        <div>
          <Label htmlFor="logoFont">Font</Label>
          <select
            id="logoFont"
            value={data.logoFont || 'Playfair Display'}
            onChange={(e) => onUpdate({ logoFont: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-md"
          >
            <option value="Playfair Display">Playfair Display</option>
            <option value="Inter">Inter</option>
            <option value="Merriweather">Merriweather</option>
            <option value="Poppins">Poppins</option>
          </select>
        </div>

        <div>
          <Label htmlFor="logoColor">Colore</Label>
          <div className="flex gap-2">
            <Input
              id="logoColor"
              type="color"
              value={data.logoColor || '#8B4513'}
              onChange={(e) => onUpdate({ logoColor: e.target.value })}
              className="w-20"
            />
            <Input
              value={data.logoColor || '#8B4513'}
              onChange={(e) => onUpdate({ logoColor: e.target.value })}
              placeholder="#8B4513"
              className="flex-1"
            />
          </div>
        </div>

        <Button onClick={onGoDesignLogo} variant="outline" className="w-full">
          Design Avanzato Logo
        </Button>
      </div>
    </div>
  );
};