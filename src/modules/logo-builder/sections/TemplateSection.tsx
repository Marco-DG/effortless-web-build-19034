import React, { useState } from 'react';
import { getAwardWinningTemplates, getExtremeTemplates } from '../AdvancedLogoTemplates';
import { LogoTemplate } from '../types';
import { LogoConfig } from '../../../types';
import { PremiumTemplateGrid } from '../../../components/forms';

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
    <PremiumTemplateGrid
      templates={allTemplates}
      selectedTemplateId={selectedTemplate?.id}
      onTemplateSelect={handleSelectTemplate}
    />
  );
};