import React from 'react';
import { LogoConfig } from '../../../types';
import { PremiumFormField, PremiumToggle, PremiumNumberInput, PremiumActionButton } from '../../../components/forms';

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
    <div className="space-y-6">
      {/* Canvas Behavior Settings */}
      <div className="space-y-4">
        <PremiumToggle
          label="Mostra griglia"
          description="Visualizza una griglia di riferimento sul canvas per allineare gli elementi"
          checked={logoConfig.showGrid || false}
          onChange={(checked) => handleCanvasSettings('showGrid', checked)}
        />
        
        <PremiumToggle
          label="Snap alla griglia"
          description="Gli elementi si allineano automaticamente alla griglia durante il trascinamento"
          checked={logoConfig.snapToGrid || false}
          onChange={(checked) => handleCanvasSettings('snapToGrid', checked)}
        />
      </div>

      {/* Canvas Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <PremiumNumberInput
          label="Larghezza"
          value={logoConfig.canvasSize?.width || 400}
          onChange={(width) => handleCanvasSettings('canvasSize', {
            ...logoConfig.canvasSize,
            width
          })}
          min={200}
          max={800}
          unit="px"
          description="Larghezza dell'area di lavoro"
        />
        
        <PremiumNumberInput
          label="Altezza"
          value={logoConfig.canvasSize?.height || 300}
          onChange={(height) => handleCanvasSettings('canvasSize', {
            ...logoConfig.canvasSize,
            height
          })}
          min={200}
          max={600}
          unit="px"
          description="Altezza dell'area di lavoro"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <PremiumActionButton
          variant="ghost"
          icon={() => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          )}
          onClick={() => handleCanvasSettings('elements', [])}
          disabled={!logoConfig.elements || logoConfig.elements.length === 0}
        >
          Pulisci Canvas
        </PremiumActionButton>
        
        <PremiumActionButton
          variant="ghost"
          icon={() => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          )}
          onClick={() => {
            const elements = logoConfig.elements || [];
            const centeredElements = elements.map(el => ({
              ...el,
              x: (logoConfig.canvasSize?.width || 400) / 2 - el.width / 2,
              y: (logoConfig.canvasSize?.height || 300) / 2 - el.height / 2
            }));
            handleCanvasSettings('elements', centeredElements);
          }}
          disabled={!logoConfig.elements || logoConfig.elements.length === 0}
        >
          Centra Tutto
        </PremiumActionButton>
      </div>
    </div>
  );
};