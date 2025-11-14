import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const PremiumToggle: React.FC<PremiumToggleProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  className
}) => {
  return (
    <div className={cn(
      "group relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
      disabled && "opacity-60 cursor-not-allowed",
      className
    )}>
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6 flex items-center justify-between">
        <div className="flex-1 pr-4">
          <h4 className="text-sm font-semibold text-slate-800 font-geist tracking-[-0.01em] mb-1">
            {label}
          </h4>
          {description && (
            <p className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <button
          type="button"
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={cn(
            "relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:ring-offset-2 focus:ring-offset-white/50",
            checked 
              ? "bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg shadow-slate-900/25" 
              : "bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-250 hover:to-slate-350 shadow-sm",
            disabled && "cursor-not-allowed"
          )}
          role="switch"
          aria-checked={checked}
          aria-label={label}
        >
          <span
            className={cn(
              "inline-block h-5 w-5 transform rounded-full transition-all duration-300 ease-out shadow-sm",
              checked 
                ? "translate-x-6 bg-white" 
                : "translate-x-1 bg-white"
            )}
          />
        </button>
      </div>
    </div>
  );
};