import React from 'react';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  preview?: string;
  elements: any[];
}

interface TemplateGridProps {
  templates: Template[];
  selectedTemplateId?: string;
  onTemplateSelect: (template: Template) => void;
  className?: string;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  selectedTemplateId,
  onTemplateSelect,
  className
}) => {
  const renderTemplatePreview = (template: Template) => {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
        {template.preview ? (
          <img 
            src={template.preview}
            alt={template.name}
            className="w-full h-full object-cover"
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
          <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
            <span className="text-xl">🎨</span>
          </div>
          <div className="text-sm font-medium text-gray-700 mb-1">
            {template.name}
          </div>
          <div className="text-xs text-gray-500">
            {template.elements.length} elementi
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {templates.map((template) => (
        <div
          key={template.id}
          className={cn(
            "group relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-200 hover:shadow-md",
            selectedTemplateId === template.id
              ? "border-primary ring-2 ring-primary/20 shadow-sm"
              : "border-gray-200 hover:border-primary/40"
          )}
          onClick={() => onTemplateSelect(template)}
        >
          {/* Template Preview */}
          <div className="aspect-[4/3] relative">
            {renderTemplatePreview(template)}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
          </div>

          {/* Template Info */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm text-gray-900 truncate">
                  {template.name}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {template.elements.length} elementi
                </p>
              </div>
              
              {/* Selected indicator */}
              {selectedTemplateId === template.id && (
                <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};