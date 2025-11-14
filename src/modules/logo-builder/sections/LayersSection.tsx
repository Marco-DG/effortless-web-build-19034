import React from 'react';
import { LogoConfig } from '../../../types';
import { Trash2 } from 'lucide-react';

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
    <div className="space-y-6">
      {elements.length === 0 ? (
        /* Empty State */
        <div className="relative rounded-[20px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-60" />
          <div className="relative text-center py-16 px-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-[18px] bg-gradient-to-br from-slate-100/80 to-slate-200/60 border border-slate-200/50 flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-geist tracking-[-0.02em] mb-2">
              Canvas vuoto
            </h3>
            <p className="text-sm text-slate-500 font-medium font-geist tracking-[-0.01em] leading-relaxed max-w-xs mx-auto">
              Aggiungi elementi dai template nella sezione Design per iniziare a progettare il tuo logo
            </p>
          </div>
        </div>
      ) : (
        /* Elements List */
        <div className="space-y-4">
          {elements
            .sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0))
            .map((element, index) => {
              const isTopLayer = index === 0;
              const isBottomLayer = index === elements.length - 1;
              
              return (
                <div
                  key={element.id}
                  className="group relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Layer Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-slate-600 to-slate-700 border-2 border-white rounded-full flex items-center justify-center shadow-lg shadow-slate-900/25">
                    <span className="text-xs font-bold text-white font-geist">{elements.length - index}</span>
                  </div>

                  <div className="relative p-6">
                    {/* Element Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-slate-100/80 to-slate-200/60 border border-slate-200/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                        {element.type === 'text' ? (
                          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.79 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.79 4 8 4s8-1.79 8-4M4 7c0-2.21 3.79-4 8-4s8 1.79 8 4" />
                          </svg>
                        ) : element.type === 'shape' ? (
                          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                          </svg>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-slate-800 font-geist tracking-[-0.01em] truncate mb-1">
                          {element.type === 'text' 
                            ? (element.content || 'Testo senza nome') 
                            : `${element.type.charAt(0).toUpperCase()}${element.type.slice(1)} ${index + 1}`
                          }
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em]">
                            {element.width}×{element.height}px
                          </span>
                          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          <span className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em]">
                            Z-index {element.zIndex || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Layer Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                      {/* Move Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLayerMove(element.id, 'up')}
                          disabled={isTopLayer}
                          className="p-2.5 hover:bg-slate-100/60 rounded-[12px] text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
                          title="Porta in primo piano"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleLayerMove(element.id, 'down')}
                          disabled={isBottomLayer}
                          className="p-2.5 hover:bg-slate-100/60 rounded-[12px] text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
                          title="Porta in secondo piano"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDuplicateElement(element.id)}
                          className="p-2.5 hover:bg-slate-100/60 rounded-[12px] text-slate-600 transition-all duration-200 backdrop-blur-sm"
                          title="Duplica elemento"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteElement(element.id)}
                          className="p-2.5 hover:bg-red-50/80 rounded-[12px] text-red-600 transition-all duration-200 backdrop-blur-sm"
                          title="Elimina elemento"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};