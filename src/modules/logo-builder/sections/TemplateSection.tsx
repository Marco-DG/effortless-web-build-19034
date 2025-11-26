import React, { useState } from 'react';
import { getAwardWinningTemplates, getExtremeTemplates } from '../AdvancedLogoTemplates';
import { LogoTemplate } from '../types';
import { LogoConfig } from '../../../types';
import { CleanFormField } from '../../../components/forms';

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

  return (
    <CleanFormField
      label="Template Logo"
      description="Scegli un template di partenza per il tuo logo"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelectTemplate(template)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="aspect-square bg-white rounded-md border border-slate-100 mb-3 flex items-center justify-center">
              <div className="text-slate-400 text-sm">Preview</div>
            </div>
            <div className="text-sm font-medium text-slate-700 truncate">
              {template.name}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {template.category}
            </div>
          </button>
        ))}
      </div>
    </CleanFormField>
  );
};