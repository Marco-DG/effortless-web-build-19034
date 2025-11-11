import React from 'react';
import { TemplateManager } from '../../templates/TemplateManager';

interface BuilderStep0Props {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
}

export const BuilderStep0: React.FC<BuilderStep0Props> = ({ data, onUpdate, onNext }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Template</h3>
        <p className="text-sm text-muted-foreground">
          Scegli il template perfetto per il tuo ristorante
        </p>
      </div>
      <TemplateManager />
    </div>
  );
};