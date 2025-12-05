import React from 'react';
import { CleanTextInput } from './CleanTextInput';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface PremiumTextInputProps {
  label?: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export const PremiumTextInput: React.FC<PremiumTextInputProps> = ({ 
  label,
  description,
  value, 
  onChange, 
  placeholder,
  multiline,
  rows = 3
}) => {
  if (multiline) {
    return (
      <div>
        {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
        {description && <p className="text-sm text-slate-500 mb-2">{description}</p>}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
      </div>
    );
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
      {description && <p className="text-sm text-slate-500 mb-2">{description}</p>}
      <CleanTextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};