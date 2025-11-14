import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface PremiumSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const PremiumSelect: React.FC<PremiumSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Seleziona un'opzione",
  description,
  disabled = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn(
      "group relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
      disabled && "opacity-60 cursor-not-allowed",
      className
    )} ref={containerRef}>
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
          
          <div className="relative">
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              className={cn(
                "w-full px-4 py-3 pr-10 border-0 rounded-[12px] text-sm font-medium font-geist tracking-[-0.01em] text-left",
                "bg-white/60 backdrop-blur-sm shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:shadow-md",
                "hover:bg-white/80 hover:shadow-sm",
                "transition-all duration-300",
                disabled && "bg-slate-50/40 text-slate-400 cursor-not-allowed"
              )}
            >
              <span className={selectedOption ? "text-slate-800" : "text-slate-400"}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  className={cn(
                    "w-4 h-4 text-slate-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-[12px] border border-slate-200/50 bg-white/95 backdrop-blur-sm shadow-lg shadow-slate-900/10 z-10 overflow-hidden">
                <div className="py-2">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-sm font-medium font-geist tracking-[-0.01em] text-left hover:bg-slate-50/60 transition-colors duration-200",
                        value === option.value && "bg-slate-100/80 text-slate-800 font-semibold"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};