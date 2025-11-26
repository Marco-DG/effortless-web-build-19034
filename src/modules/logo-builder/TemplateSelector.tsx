import React from 'react';
import { LogoConfig } from '../../types';
import { ADVANCED_LOGO_TEMPLATES, processTemplate } from './AdvancedTemplates';

// Debug: verifica che ADVANCED_LOGO_TEMPLATES sia importato

interface TemplateSelectorProps {
  logoConfig: LogoConfig;
  businessName: string;
  onUpdate: (updates: Partial<LogoConfig>) => void;
}

// Template semplici (legacy)
const simpleTemplates = [
  {
    id: 'wine-bar-simple',
    name: 'Wine Bar Semplice',
    category: 'Semplici',
    preview: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=100&fit=crop',
    config: {
      mode: 'text' as const,
      font: 'Playfair Display',
      size: 42,
      color: '#2a1a1d',
      layout: 'vertical' as const,
      text: 'OSTERIA',
      tagline: 'del borgo'
    }
  },
  {
    id: 'modern-simple',
    name: 'Moderno Semplice',
    category: 'Semplici',
    preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
    config: {
      mode: 'text' as const,
      font: 'Inter',
      size: 36,
      color: '#2C3E50',
      layout: 'horizontal' as const,
      text: 'RESTAURANT'
    }
  }
];

// Combina template semplici e avanzati
const allTemplates = [
  ...ADVANCED_LOGO_TEMPLATES.map(template => ({
    id: `advanced-${template.id}`,
    name: template.name,
    category: template.category,
    description: template.description,
    preview: template.preview,
    isAdvanced: true,
    advancedTemplate: template
  })),
  ...simpleTemplates.map(template => ({
    ...template,
    isAdvanced: false
  }))
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  logoConfig,
  businessName,
  onUpdate
}) => {
  const currentTemplateId = logoConfig.templateId;

  const handleTemplateSelect = (template: any) => {
    if (template.isAdvanced) {
      // Template avanzato con canvas interattivo
      const processed = processTemplate(template.advancedTemplate, businessName);
      onUpdate({
        templateId: template.id,
        mode: 'advanced' as any,
        advancedElements: processed.elements,
        canvasSize: processed.canvasSize
      });
    } else {
      // Template semplice (legacy)
      onUpdate({
        ...template.config,
        templateId: template.id,
        text: template.config.text
          .replace('OSTERIA', businessName.toUpperCase())
          .replace('RESTAURANT', businessName.toUpperCase())
          .replace('Bella Vita', businessName)
          .replace('BISTROT', businessName.toUpperCase())
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Template Info */}
      {currentTemplateId && (
        <div className="p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm">Template Attivo</h4>
              <p className="text-xs text-muted-foreground">
                {allTemplates.find(t => t.id === currentTemplateId)?.name || 'Template personalizzato'}
              </p>
            </div>
            <button
              onClick={() => onUpdate({ templateId: undefined })}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Rimuovi
            </button>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="flex gap-2 mb-4">
        {['Tutti', 'Wine & Bar', 'Ristorante', 'Pizzeria', 'Bistrot', 'Semplici'].map((cat) => (
          <button
            key={cat}
            className="px-3 py-1 text-xs border rounded-full hover:bg-muted"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="space-y-3">
        {allTemplates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-sm ${
              currentTemplateId === template.id
                ? 'border-primary ring-1 ring-primary/20 bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            {/* Preview Image */}
            <div className="aspect-[2/1] bg-gradient-to-br from-gray-50 to-gray-100 relative">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              {template.isAdvanced && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  ✨ Pro
                </div>
              )}
            </div>
            
            {/* Template Info */}
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <p className="text-xs text-muted-foreground">{template.category}</p>
                  {template.description && (
                    <p className="text-xs text-muted-foreground mt-1 opacity-80">
                      {template.description}
                    </p>
                  )}
                </div>
                {currentTemplateId === template.id && (
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {template.isAdvanced && (
                <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                  <span>🎨</span>
                  <span>Canvas interattivo</span>
                  <span>•</span>
                  <span>Elementi manipolabili</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Template Option */}
      <button
        onClick={() => onUpdate({ templateId: undefined, mode: 'text', text: businessName })}
        className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-center hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <div className="text-sm font-medium text-muted-foreground">
          💡 Inizia da Zero
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Crea un logo personalizzato
        </div>
      </button>
    </div>
  );
};