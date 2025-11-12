import React from 'react';
import { Wine, Check } from 'lucide-react';

interface TemplateSelectorProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data.site?.template || 'wine-bar';
  
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Template</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Al momento è disponibile solo il template Wine Bar.
        </p>
      </div>

      <div className="border rounded-lg p-4 bg-primary/5 border-primary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wine className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Wine Bar</h3>
              <Check className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Template elegante per wine bar e enotece</p>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Colori:</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#2a1a1d' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6b3a2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#d9b99b' }} />
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
        💡 Altri template saranno disponibili nelle prossime versioni
      </div>
    </div>
  );
};