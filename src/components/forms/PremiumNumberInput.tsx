import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumNumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const PremiumNumberInput: React.FC<PremiumNumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  description,
  disabled = false,
  className
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  const incrementValue = () => {
    const newValue = value + step;
    if (max === undefined || newValue <= max) {
      onChange(newValue);
    }
  };

  const decrementValue = () => {
    const newValue = value - step;
    if (min === undefined || newValue >= min) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn(
      "group relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
      disabled && "opacity-60 cursor-not-allowed",
      className
    )}>
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="space-y-3">
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
          
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={handleChange}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className={cn(
                "w-full px-4 py-3 pr-16 border-0 rounded-[12px] text-sm font-medium font-geist tracking-[-0.01em]",
                "bg-white/60 backdrop-blur-sm shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:shadow-md",
                "hover:bg-white/80 hover:shadow-sm",
                "transition-all duration-300",
                disabled && "bg-slate-50/40 text-slate-400 cursor-not-allowed"
              )}
            />
            
            {/* Unit indicator */}
            {unit && (
              <div className="absolute inset-y-0 right-12 flex items-center pr-2">
                <span className="text-xs text-slate-400 font-semibold font-geist tracking-[-0.005em]">
                  {unit}
                </span>
              </div>
            )}
            
            {/* Increment/Decrement buttons */}
            <div className="absolute inset-y-0 right-0 flex flex-col border-l border-slate-200/50">
              <button
                type="button"
                onClick={incrementValue}
                disabled={disabled || (max !== undefined && value >= max)}
                className={cn(
                  "flex-1 px-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50/50 focus:outline-none transition-all duration-200 rounded-tr-[12px]",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <div className="h-[1px] bg-slate-200/50" />
              <button
                type="button"
                onClick={decrementValue}
                disabled={disabled || (min !== undefined && value <= min)}
                className={cn(
                  "flex-1 px-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50/50 focus:outline-none transition-all duration-200 rounded-br-[12px]",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};