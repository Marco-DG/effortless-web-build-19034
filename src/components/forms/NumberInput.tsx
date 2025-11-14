import React from 'react';
import { cn } from '@/lib/utils';

interface NumberInputProps {
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

export const NumberInput: React.FC<NumberInputProps> = ({
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
    <div className={cn("space-y-2", className)}>
      <div>
        <label className="text-sm font-medium text-gray-900 block">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
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
            "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm",
            "bg-white transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "hover:border-gray-300",
            unit && "pr-12",
            disabled && "bg-gray-50 text-gray-500 cursor-not-allowed"
          )}
        />
        
        {/* Unit indicator */}
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-xs text-gray-400 font-medium">{unit}</span>
          </div>
        )}
        
        {/* Increment/Decrement buttons */}
        <div className="absolute inset-y-0 right-0 flex flex-col">
          <button
            type="button"
            onClick={incrementValue}
            disabled={disabled || (max !== undefined && value >= max)}
            className={cn(
              "flex-1 px-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              unit && "pr-14"
            )}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={decrementValue}
            disabled={disabled || (min !== undefined && value <= min)}
            className={cn(
              "flex-1 px-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors",
              "disabled:opacity-30 disabled:cursor-not-allowed",
              unit && "pr-14"
            )}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};