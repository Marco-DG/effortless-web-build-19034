import React from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface PremiumOptionGridProps {
  label: string;
  selectedValue?: string;
  options: Option[];
  onChange: (value: string) => void;
  description?: string;
  columns?: 1 | 2 | 3;
  className?: string;
}

export const PremiumOptionGrid: React.FC<PremiumOptionGridProps> = ({
  label,
  selectedValue,
  options,
  onChange,
  description,
  columns = 2,
  className
}) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  };

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
          
          <div className={cn("grid gap-3", gridColsClass[columns])}>
            {options.map((option) => {
              const isSelected = selectedValue === option.value;
              const Icon = option.icon;
              
              return (
                <button
                  key={option.value}
                  onClick={() => onChange(option.value)}
                  className={cn(
                    "group/option relative p-4 rounded-[12px] border transition-all duration-300 text-left",
                    isSelected
                      ? "border-slate-400/60 bg-white/80 shadow-sm"
                      : "border-slate-200/50 bg-white/40 hover:bg-white/60 hover:border-slate-300/50"
                  )}
                >
                  <div className="space-y-3">
                    {/* Icon */}
                    {Icon && (
                      <div className={cn(
                        "w-10 h-10 rounded-[10px] flex items-center justify-center transition-colors duration-200",
                        isSelected
                          ? "bg-slate-100/80"
                          : "bg-slate-50/60 group-hover/option:bg-slate-100/60"
                      )}>
                        <Icon className={cn(
                          "w-5 h-5",
                          isSelected ? "text-slate-700" : "text-slate-500"
                        )} />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="space-y-1">
                      <h5 className={cn(
                        "font-semibold text-sm font-geist tracking-[-0.01em]",
                        isSelected ? "text-slate-800" : "text-slate-700"
                      )}>
                        {option.label}
                      </h5>
                      <p className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                    
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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