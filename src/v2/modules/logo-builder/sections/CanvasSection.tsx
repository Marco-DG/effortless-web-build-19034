import React from 'react';
import { Label } from '../../../../components/ui/label';
import { Button } from '../../../../components/ui/button';
import { Slider } from '../../../../components/ui/slider';
import { LogoConfig } from '../../../types';
import { Settings, Grid, Layers, RotateCcw, Trash2 } from 'lucide-react';

interface CanvasSectionProps {
  logoConfig: LogoConfig;
  onUpdateLogo: (updates: any) => void;
}

export const CanvasSection: React.FC<CanvasSectionProps> = ({
  logoConfig,
  onUpdateLogo
}) => {
  const elements = logoConfig.elements || [];

  const handleDeleteElement = (elementId: string) => {
    const updatedElements = elements.filter(el => el.id !== elementId);
    onUpdateLogo({ elements: updatedElements });
  };

  const handleDuplicateElement = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (element) {
      const duplicated = {
        ...element,
        id: `${element.id}_copy_${Date.now()}`,
        x: element.x + 20,
        y: element.y + 20
      };
      onUpdateLogo({ elements: [...elements, duplicated] });
    }
  };

  const handleLayerMove = (elementId: string, direction: 'up' | 'down') => {
    const updatedElements = elements.map(el => {
      if (el.id === elementId) {
        return {
          ...el,
          zIndex: direction === 'up' ? (el.zIndex || 0) + 1 : Math.max(0, (el.zIndex || 0) - 1)
        };
      }
      return el;
    });
    onUpdateLogo({ elements: updatedElements });
  };

  const handleCanvasSettings = (setting: string, value: any) => {
    onUpdateLogo({ [setting]: value });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-gray-50/50 to-slate-50/50">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-lg">Canvas & Controlli</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Gestisci elementi e impostazioni canvas
        </p>
      </div>

      {/* Canvas Settings */}
      <div className="p-4 border-b space-y-4">
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

      {/* Elements Layer Manager */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">Livelli Elementi</Label>
            <span className="text-xs text-muted-foreground">({elements.length})</span>
          </div>

          {elements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Grid className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nessun elemento nel canvas</p>
              <p className="text-xs mt-1">Aggiungi testo o forme dai template</p>
            </div>
          ) : (
            <div className="space-y-2">
              {elements
                .sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0))
                .map((element, index) => (
                <div
                  key={element.id}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:border-primary/50 transition-all group"
                >
                  {/* Element Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        {element.type === 'text' ? '📝' : 
                         element.type === 'shape' ? '🔷' : '🖼️'}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {element.type === 'text' 
                            ? (element.content || 'Testo') 
                            : `${element.type} ${index + 1}`
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {element.width}×{element.height} • z:{element.zIndex || 0}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Layer Controls */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleLayerMove(element.id, 'up')}
                      className="p-1 hover:bg-gray-100 rounded text-xs"
                      title="Porta avanti"
                    >
                      ⬆️
                    </button>
                    <button
                      onClick={() => handleLayerMove(element.id, 'down')}
                      className="p-1 hover:bg-gray-100 rounded text-xs"
                      title="Porta indietro"
                    >
                      ⬇️
                    </button>
                    <button
                      onClick={() => handleDuplicateElement(element.id)}
                      className="p-1 hover:bg-gray-100 rounded text-xs"
                      title="Duplica"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => handleDeleteElement(element.id)}
                      className="p-1 hover:bg-red-100 rounded text-xs text-red-600"
                      title="Elimina"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-gradient-to-r from-primary/5 to-gray/5">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Azioni Rapide</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateLogo({ elements: [] })}
              disabled={elements.length === 0}
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Pulisci Canvas
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // Reset posizioni al centro
                const centeredElements = elements.map(el => ({
                  ...el,
                  x: (logoConfig.canvasSize?.width || 400) / 2 - el.width / 2,
                  y: (logoConfig.canvasSize?.height || 300) / 2 - el.height / 2
                }));
                onUpdateLogo({ elements: centeredElements });
              }}
              disabled={elements.length === 0}
            >
              🎯 Centra Tutto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};