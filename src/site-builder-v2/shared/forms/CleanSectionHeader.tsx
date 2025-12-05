import React from 'react';
import { cn } from '@/lib/utils';

interface CleanSectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const CleanSectionHeader: React.FC<CleanSectionHeaderProps> = ({
  title,
  description,
  className
}) => {
  return (
    <div className={cn("pb-4 border-b border-slate-100", className)}>
      <h3 className="text-lg font-bold text-slate-800 font-geist tracking-[-0.02em]">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-slate-600 font-medium font-geist tracking-[-0.01em] leading-relaxed mt-1">
          {description}
        </p>
      )}
    </div>
  );
};