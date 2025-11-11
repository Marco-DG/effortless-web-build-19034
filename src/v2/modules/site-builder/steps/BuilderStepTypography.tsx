import React from 'react';
import { Label } from '@/components/ui/label';

interface BuilderStepTypographyProps {
  data: any;
  onUpdate: (updates: any) => void;
}

export const BuilderStepTypography: React.FC<BuilderStepTypographyProps> = ({ 
  data, 
  onUpdate 
}) => {
  const fonts = [
    'Playfair Display',
    'Inter', 
    'Merriweather',
    'Poppins',
    'Cormorant Garamond',
    'Open Sans'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Tipografia</h3>
        <p className="text-sm text-muted-foreground">
          Scegli i font per il tuo sito
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Font Principale (Titoli)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {fonts.map(font => (
              <button
                key={font}
                onClick={() => onUpdate({ fontPrimary: font })}
                className={`p-3 text-left border rounded-lg transition-colors ${
                  data.fontPrimary === font 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:bg-muted'
                }`}
                style={{ fontFamily: font }}
              >
                <div className="font-semibold">{font}</div>
                <div className="text-sm text-muted-foreground">Abc 123</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Font Secondario (Testo)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {fonts.map(font => (
              <button
                key={font}
                onClick={() => onUpdate({ fontSecondary: font })}
                className={`p-3 text-left border rounded-lg transition-colors ${
                  data.fontSecondary === font 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:bg-muted'
                }`}
                style={{ fontFamily: font }}
              >
                <div className="font-medium">{font}</div>
                <div className="text-sm text-muted-foreground">Lorem ipsum dolor</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};