import React from 'react';
import { CleanToggle } from './CleanToggle';

// TEMPORARY BRIDGE COMPONENT  
// TODO: Remove after migration to Clean components is complete
interface PremiumToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PremiumToggle: React.FC<PremiumToggleProps> = ({ 
  label, 
  description, 
  checked, 
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-700">{label}</label>
        {description && (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        )}
      </div>
      <CleanToggle checked={checked} onChange={onChange} />
    </div>
  );
};