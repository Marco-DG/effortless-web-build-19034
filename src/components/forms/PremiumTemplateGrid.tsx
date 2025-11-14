import React from 'react';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  preview?: string;
  elements: any[];
}

interface PremiumTemplateGridProps {
  templates: Template[];
  selectedTemplateId?: string;
  onTemplateSelect: (template: Template) => void;
  className?: string;
}

export const PremiumTemplateGrid: React.FC<PremiumTemplateGridProps> = ({
  templates,
  selectedTemplateId,
  onTemplateSelect,
  className
}) => {
  const renderTemplatePreview = (template: Template) => {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50/80 to-white/60 flex items-center justify-center relative overflow-hidden">
        {template.preview ? (
          <img 
            src={template.preview}
            alt={template.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        
        {/* Fallback sempre presente ma nascosto */}
        <div className={`text-center p-4 ${template.preview ? 'hidden' : ''}`}>
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-slate-100 to-slate-200/80 rounded-[14px] flex items-center justify-center shadow-sm">
            <span className="text-xl">🎨</span>
          </div>
          <div className="text-sm font-semibold text-slate-700 font-geist tracking-[-0.01em] mb-1">
            {template.name}
          </div>
          <div className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em]">
            {template.elements.length} elementi
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {templates.map((template) => {
        const isSelected = selectedTemplateId === template.id;
        
        return (
          <div
            key={template.id}
            className={cn(
              "group relative cursor-pointer rounded-[16px] overflow-hidden transition-all duration-300",
              isSelected
                ? "ring-2 ring-slate-400/50 ring-offset-2 ring-offset-white/50 shadow-lg shadow-slate-900/10"
                : "hover:shadow-lg hover:shadow-slate-900/8 hover:-translate-y-0.5"
            )}
            onClick={() => onTemplateSelect(template)}
          >
            {/* Template Preview Container */}
            <div className={cn(
              "relative border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm overflow-hidden rounded-[16px]",
              isSelected && "border-slate-300/60"
            )}>
              {/* Template Preview */}
              <div className="aspect-[4/3] relative">
                {renderTemplatePreview(template)}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center shadow-lg shadow-slate-900/25">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4 bg-white/60 backdrop-blur-sm border-t border-slate-200/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-800 font-geist tracking-[-0.01em] truncate">
                      {template.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] mt-0.5">
                      {template.elements.length} {template.elements.length === 1 ? 'elemento' : 'elementi'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        );
      })}
    </div>
  );
};