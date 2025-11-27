import React from 'react';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface PremiumCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="space-y-4 border border-slate-200 rounded-lg p-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
        {description && (
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};