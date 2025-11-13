import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LogoConfig } from '../../../types';
import { Settings, RotateCcw } from 'lucide-react';

interface CanvasSectionProps {
  logoConfig: LogoConfig;
  onUpdateLogo: (updates: any) => void;
}

export const CanvasSection: React.FC<CanvasSectionProps> = ({
  logoConfig,
  onUpdateLogo
}) => {
  const handleCanvasSettings = (setting: string, value: any) => {
    onUpdateLogo({ [setting]: value });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-gray-50/50 to-slate-50/50">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-lg">Impostazioni Canvas</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Configura dimensioni, griglia e comportamento del canvas
        </p>
      </div>

      {/* Canvas Settings */}
      <div className="p-4 space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">Impostazioni Canvas</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Mostra griglia</span>
              <button
                onClick={() => handleCanvasSettings('showGrid', !logoConfig.showGrid)}
                className={`w-10 h-6 rounded-full border-2 transition-all ${
                  logoConfig.showGrid 
                    ? 'bg-primary border-primary' 
                    : 'bg-gray-200 border-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  logoConfig.showGrid ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Snap alla griglia</span>
              <button
                onClick={() => handleCanvasSettings('snapToGrid', !logoConfig.snapToGrid)}
                className={`w-10 h-6 rounded-full border-2 transition-all ${
                  logoConfig.snapToGrid 
                    ? 'bg-primary border-primary' 
                    : 'bg-gray-200 border-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  logoConfig.snapToGrid ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Dimensioni Canvas</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Larghezza</Label>
                  <input
                    type="number"
                    value={logoConfig.canvasSize?.width || 400}
                    onChange={(e) => handleCanvasSettings('canvasSize', {
                      ...logoConfig.canvasSize,
                      width: parseInt(e.target.value)
                    })}
                    className="w-full px-2 py-1 border rounded text-sm"
                    min="200"
                    max="800"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Altezza</Label>
                  <input
                    type="number"
                    value={logoConfig.canvasSize?.height || 300}
                    onChange={(e) => handleCanvasSettings('canvasSize', {
                      ...logoConfig.canvasSize,
                      height: parseInt(e.target.value)
                    })}
                    className="w-full px-2 py-1 border rounded text-sm"
                    min="200"
                    max="600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 border-t bg-gradient-to-r from-primary/5 to-blue/5 rounded-lg">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Azioni Rapide</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCanvasSettings('elements', [])}
              disabled={!logoConfig.elements || logoConfig.elements.length === 0}
              className="w-full"
            >
              <RotateCcw className="w-3 h-3 mr-2" />
              Pulisci Canvas
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // Reset posizioni al centro
                const elements = logoConfig.elements || [];
                const centeredElements = elements.map(el => ({
                  ...el,
                  x: (logoConfig.canvasSize?.width || 400) / 2 - el.width / 2,
                  y: (logoConfig.canvasSize?.height || 300) / 2 - el.height / 2
                }));
                handleCanvasSettings('elements', centeredElements);
              }}
              disabled={!logoConfig.elements || logoConfig.elements.length === 0}
              className="w-full"
            >
              🎯 Centra Tutto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};