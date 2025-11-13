import React from 'react';
import { Label } from '@/components/ui/label';
import { LogoConfig } from '../../../types';
import { Layers, Trash2 } from 'lucide-react';

interface LayersSectionProps {
  logoConfig: LogoConfig;
  onUpdateLogo: (updates: any) => void;
}

export const LayersSection: React.FC<LayersSectionProps> = ({
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

  return (
    <div className="space-y-4">
      {/* Lista Elementi */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">Lista Elementi</Label>
          </div>
          <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {elements.length} elementi
          </div>
        </div>

        {elements.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
              <Layers className="w-6 h-6 opacity-40" />
            </div>
            <h4 className="font-medium text-sm mb-1">Canvas vuoto</h4>
            <p className="text-xs">Aggiungi elementi dai template nella sezione Design</p>
          </div>
        ) : (
          <div className="space-y-3">
            {elements
              .sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0))
              .map((element, index) => {
                const isTopLayer = index === 0;
                const isBottomLayer = index === elements.length - 1;
                
                return (
                  <div
                    key={element.id}
                    className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
                  >
                    {/* Layer Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/10 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{elements.length - index}</span>
                    </div>

                    {/* Element Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                        {element.type === 'text' ? (
                          <span className="text-lg">📝</span>
                        ) : element.type === 'shape' ? (
                          <span className="text-lg">🔷</span>
                        ) : (
                          <span className="text-lg">🖼️</span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {element.type === 'text' 
                            ? (element.content || 'Testo senza nome') 
                            : `${element.type.charAt(0).toUpperCase()}${element.type.slice(1)} ${index + 1}`
                          }
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {element.width}×{element.height}
                          </span>
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          <span className="text-xs text-gray-500">
                            Livello {element.zIndex || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Layer Controls */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {/* Move Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleLayerMove(element.id, 'up')}
                          disabled={isTopLayer}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          title="Porta in primo piano"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleLayerMove(element.id, 'down')}
                          disabled={isBottomLayer}
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          title="Porta in secondo piano"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDuplicateElement(element.id)}
                          className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-all"
                          title="Duplica elemento"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteElement(element.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-all"
                          title="Elimina elemento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};