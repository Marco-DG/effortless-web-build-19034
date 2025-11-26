import React from 'react';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface PremiumNumberInputProps {
  label?: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
}

export const PremiumNumberInput: React.FC<PremiumNumberInputProps> = ({ 
  label,
  description,
  value, 
  onChange, 
  min,
  max,
  step = 1,
  unit,
  placeholder
}) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
      {description && <p className="text-sm text-slate-500 mb-2">{description}</p>}
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};