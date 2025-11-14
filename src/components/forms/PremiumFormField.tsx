import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumFormFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const PremiumFormField: React.FC<PremiumFormFieldProps> = ({
  label,
  description,
  children,
  className
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-800 font-geist tracking-[-0.01em] block">
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};