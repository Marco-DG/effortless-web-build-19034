import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { getAwardWinningTemplates, getExtremeTemplates } from '../AdvancedLogoTemplates';
import { LogoTemplate } from '../types';
import { LogoConfig } from '../../../types';

interface TemplateSectionProps {
  logoConfig: LogoConfig;
  onUpdateLogo: (updates: any) => void;
}

export const TemplateSection: React.FC<TemplateSectionProps> = ({
  logoConfig,
  onUpdateLogo
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<LogoTemplate | null>(null);

  // Mostra tutti i template disponibili
  const allTemplates = [
    ...getAwardWinningTemplates(),
    ...getExtremeTemplates()
  ];

  const handleSelectTemplate = (template: LogoTemplate) => {
    setSelectedTemplate(template);
    
    // Applica immediatamente il template al logo config
    onUpdateLogo({
      mode: 'canvas',
      template: template,
      elements: template.elements,
      canvasSize: template.canvasSize
    });
  };

  // Usa l'immagine preview del template o fallback
  const renderTemplatePreview = (template: LogoTemplate) => {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
        {template.preview ? (
          <img 
            src={template.preview}
            alt={template.name}
            className="w-full h-full object-cover rounded-sm"
            onError={(e) => {
              // Fallback se l'immagine non carica
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        
        {/* Fallback sempre presente ma nascosto */}
        <div className={`text-center p-4 ${template.preview ? 'hidden' : ''}`}>
          <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-lg">🎨</span>
          </div>
          <div className="text-xs font-medium text-gray-600">
            {template.name}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Template Grid - mostra tutti i template */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {allTemplates.map((template, index) => (
            <div
              key={template.id}
              className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                selectedTemplate?.id === template.id
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelectTemplate(template)}
            >
              {/* Template Preview */}
              <div className="aspect-[4/3]">
                {renderTemplatePreview(template)}
              </div>

              {/* Template Info */}
              <div className="p-2 bg-white border-t">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-xs truncate">
                    {template.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {template.elements.length} elementi
                  </div>
                </div>
              </div>

              {/* Selected indicator */}
              {selectedTemplate?.id === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};