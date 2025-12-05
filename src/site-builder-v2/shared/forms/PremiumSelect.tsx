import React from 'react';
import { CleanSelect } from './CleanSelect';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface PremiumSelectProps {
  label?: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}

export const PremiumSelect: React.FC<PremiumSelectProps> = ({ 
  label,
  description,
  value, 
  onChange, 
  options,
  placeholder 
}) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
      {description && <p className="text-sm text-slate-500 mb-2">{description}</p>}
      <CleanSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};