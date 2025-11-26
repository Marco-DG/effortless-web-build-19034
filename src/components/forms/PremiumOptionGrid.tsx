import React from 'react';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface Option {
  value: string;
  label: string;
  description?: string;
  icon?: () => React.ReactNode;
}

interface PremiumOptionGridProps {
  label: string;
  description?: string;
  selectedValue: string;
  options: Option[];
  onChange: (value: string) => void;
  columns?: number;
}

export const PremiumOptionGrid: React.FC<PremiumOptionGridProps> = ({ 
  label,
  description,
  selectedValue,
  options,
  onChange,
  columns = 2
}) => {
  const gridClass = columns === 2 ? 'grid-cols-2' : `grid-cols-${columns}`;

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      {description && (
        <p className="text-sm text-slate-500 mb-4">{description}</p>
      )}
      <div className={`grid ${gridClass} gap-4`}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedValue === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {option.icon && (
              <div className="flex items-center gap-3 mb-2">
                <option.icon />
                <span className="font-medium text-slate-900">{option.label}</span>
              </div>
            )}
            {!option.icon && (
              <span className="font-medium text-slate-900 block mb-2">{option.label}</span>
            )}
            {option.description && (
              <p className="text-sm text-slate-600">{option.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};