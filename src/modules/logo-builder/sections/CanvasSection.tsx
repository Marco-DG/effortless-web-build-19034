import React from 'react';
import { LogoConfig } from '../../../types';
import { CleanFormField, CleanToggle, CleanButton } from '../../../components/forms';

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
        <CleanFormField
          label="Mostra griglia"
          description="Visualizza una griglia di riferimento sul canvas per allineare gli elementi"
        >
          <CleanToggle
            checked={logoConfig.showGrid || false}
            onChange={(checked) => handleCanvasSettings('showGrid', checked)}
          />
        </CleanFormField>
        
        <CleanFormField
          label="Snap alla griglia"
          description="Gli elementi si allineano automaticamente alla griglia durante il trascinamento"
        >
          <CleanToggle
            checked={logoConfig.snapToGrid || false}
            onChange={(checked) => handleCanvasSettings('snapToGrid', checked)}
          />
        </CleanFormField>
      </div>

      {/* Canvas Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <CleanFormField
          label="Larghezza"
          description="Larghezza dell'area di lavoro"
        >
          <div className="relative">
            <input
              type="number"
              value={logoConfig.canvasSize?.width || 400}
              onChange={(e) => handleCanvasSettings('canvasSize', {
                ...logoConfig.canvasSize,
                width: parseInt(e.target.value)
              })}
              min={200}
              max={800}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">px</span>
          </div>
        </CleanFormField>
        
        <CleanFormField
          label="Altezza"
          description="Altezza dell'area di lavoro"
        >
          <div className="relative">
            <input
              type="number"
              value={logoConfig.canvasSize?.height || 300}
              onChange={(e) => handleCanvasSettings('canvasSize', {
                ...logoConfig.canvasSize,
                height: parseInt(e.target.value)
              })}
              min={200}
              max={600}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">px</span>
          </div>
        </CleanFormField>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <CleanButton
          variant="outline"
          onClick={() => handleCanvasSettings('elements', [])}
          disabled={!logoConfig.elements || logoConfig.elements.length === 0}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Pulisci Canvas
        </CleanButton>
        
        <CleanButton
          variant="outline"
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
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          Centra Tutto
        </CleanButton>
      </div>
    </div>
  );
};