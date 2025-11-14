import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumTextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const PremiumTextInput: React.FC<PremiumTextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  description,
  multiline = false,
  rows = 3,
  disabled = false,
  className
}) => {
  const InputComponent = multiline ? 'textarea' : 'input';
  
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
            <label className="text-sm font-semibold text-slate-800 font-geist tracking-[-0.01em] block mb-1">
              {label}
            </label>
            {description && (
              <p className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          <InputComponent
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            {...(multiline ? { rows } : { type: 'text' })}
            className={cn(
              "w-full px-4 py-3 border-0 rounded-[12px] text-sm font-medium font-geist tracking-[-0.01em] resize-none",
              "bg-white/60 backdrop-blur-sm shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:shadow-md",
              "hover:bg-white/80 hover:shadow-sm",
              "placeholder:text-slate-400 placeholder:font-medium",
              "transition-all duration-300",
              disabled && "bg-slate-50/40 text-slate-400 cursor-not-allowed"
            )}
          />
        </div>
      </div>
    </div>
  );
};