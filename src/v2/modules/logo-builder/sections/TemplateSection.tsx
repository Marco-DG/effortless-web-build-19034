import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  // Render template preview con gli elementi del template
  const renderTemplatePreview = (template: LogoTemplate) => {
    return (
      <div 
        className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden"
        style={{
          minHeight: '120px'
        }}
      >
        <div className="relative" style={{ 
          transform: 'scale(0.6)', 
          transformOrigin: 'center'
        }}>
          {template.elements.map((element, index) => {
            if (element.type === 'text') {
              return (
                <div
                  key={index}
                  className="absolute select-none"
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    fontFamily: element.style?.fontFamily || 'Inter',
                    fontSize: `${(element.style?.fontSize || 16) * 0.8}px`,
                    fontWeight: element.style?.fontWeight || 'normal',
                    color: element.style?.color || '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}
                >
                  {element.content || 'Logo'}
                </div>
              );
            }
            
            if (element.type === 'shape') {
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    backgroundColor: element.style?.fill || '#ccc',
                    borderRadius: element.subtype === 'circle' ? '50%' : '0',
                    border: element.style?.stroke ? `${element.style?.strokeWidth || 1}px solid ${element.style.stroke}` : 'none',
                  }}
                />
              );
            }
            
            return null;
          })}
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
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};