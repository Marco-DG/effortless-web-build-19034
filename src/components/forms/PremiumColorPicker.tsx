import React from 'react';
import { cn } from '@/lib/utils';

interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  description?: string;
}

interface PremiumColorPickerProps {
  label: string;
  selectedThemeId?: string;
  themes: ColorTheme[];
  onChange: (themeId: string) => void;
  description?: string;
  className?: string;
}

export const PremiumColorPicker: React.FC<PremiumColorPickerProps> = ({
  label,
  selectedThemeId,
  themes,
  onChange,
  description,
  className
}) => {
  return (
    <div className={cn(
      "group relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
      className
    )}>
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-800 font-geist tracking-[-0.01em] mb-1">
              {label}
            </h4>
            {description && (
              <p className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {themes.map((theme) => {
              const isSelected = selectedThemeId === theme.id;
              
              return (
                <button
                  key={theme.id}
                  onClick={() => onChange(theme.id)}
                  className={cn(
                    "group/theme relative p-4 rounded-[12px] border transition-all duration-300 text-left",
                    isSelected
                      ? "border-slate-400/60 bg-white/80 shadow-sm"
                      : "border-slate-200/50 bg-white/40 hover:bg-white/60 hover:border-slate-300/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Color preview */}
                    <div className="flex gap-2 shrink-0">
                      <div 
                        className="w-8 h-8 rounded-[8px] shadow-sm border border-white/50"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div 
                        className="w-8 h-8 rounded-[8px] shadow-sm border border-white/50"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    
                    {/* Theme info */}
                    <div className="flex-1 min-w-0">
                      <h5 className={cn(
                        "font-semibold text-sm font-geist tracking-[-0.01em] mb-1",
                        isSelected ? "text-slate-800" : "text-slate-700"
                      )}>
                        {theme.name}
                      </h5>
                      {theme.description && (
                        <p className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em]">
                          {theme.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs text-slate-400 font-mono">
                          {theme.primary}
                        </div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        <div className="text-xs text-slate-400 font-mono">
                          {theme.secondary}
                        </div>
                      </div>
                    </div>
                    
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};