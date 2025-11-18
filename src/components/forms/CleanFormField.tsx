import React from 'react';
import { cn } from '@/lib/utils';

interface CleanFormFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const CleanFormField: React.FC<CleanFormFieldProps> = ({
  label,
  description,
  children,
  className,
  required = false
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-800 font-geist tracking-[-0.01em] flex items-center gap-1">
          {label}
          {required && <span className="text-red-500 text-xs">*</span>}
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