import React from 'react';
import { Wine, Check } from 'lucide-react';
import { PremiumCard } from '../../components/forms';

interface TemplateSelectorProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data.site?.template || 'wine-bar';
  
  return (
    <PremiumCard
      title="Template Design"
      description="Scegli il template base per il design del tuo sito web"
    >
      <div className="space-y-6">
        <div className="relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm overflow-hidden">
          {/* Selected Badge */}
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-slate-600 to-slate-700 border-2 border-white rounded-full flex items-center justify-center shadow-lg shadow-slate-900/25">
            <Check className="w-4 h-4 text-white" />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-slate-100/80 to-slate-200/60 border border-slate-200/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Wine className="w-6 h-6 text-slate-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg text-slate-800 font-geist tracking-[-0.02em]">
                    Wine Bar
                  </h3>
                </div>
                <p className="text-sm text-slate-600 font-medium font-geist tracking-[-0.01em] leading-relaxed">
                  Template elegante e raffinato per wine bar, enotece e ristoranti di alta gamma
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] mb-2 block">
                    Palette Colori:
                  </span>
                  <div className="flex gap-2">
                    <div 
                      className="w-6 h-6 rounded-[6px] border border-white/50 shadow-sm" 
                      style={{ backgroundColor: '#2a1a1d' }}
                      title="Nero elegante"
                    />
                    <div 
                      className="w-6 h-6 rounded-[6px] border border-white/50 shadow-sm" 
                      style={{ backgroundColor: '#6b3a2e' }}
                      title="Marrone caldo"
                    />
                    <div 
                      className="w-6 h-6 rounded-[6px] border border-white/50 shadow-sm" 
                      style={{ backgroundColor: '#d9b99b' }}
                      title="Beige dorato"
                    />
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em]">
                    Status
                  </div>
                  <div className="text-sm font-semibold text-slate-700 font-geist tracking-[-0.01em] mt-0.5">
                    Attivo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[12px] bg-gradient-to-r from-blue-50/80 to-slate-50/60 border border-blue-200/50 p-4">
          <div className="flex items-start gap-3">
            <div className="text-lg">💡</div>
            <div>
              <h4 className="font-semibold text-sm text-slate-800 font-geist tracking-[-0.01em] mb-1">
                Prossimamente
              </h4>
              <p className="text-xs text-slate-600 font-medium font-geist tracking-[-0.005em] leading-relaxed">
                Altri template saranno disponibili nelle prossime versioni per diversi tipi di ristorante e stili di cucina
              </p>
            </div>
          </div>
        </div>
      </div>
    </PremiumCard>
  );
};