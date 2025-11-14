import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-primary" />}
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        </div>
        {description && (
          <p className="text-xs text-gray-600">{description}</p>
        )}
      </div>
      
      {/* Section Content */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};