import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  title,
  description,
  children,
  className
}) => {
  return (
    <div className={cn(
      "group relative rounded-[20px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
      className
    )}>
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Header */}
        {(title || description) && (
          <div className="px-8 pt-8 pb-4">
            {title && (
              <h3 className="text-lg font-bold text-slate-800 font-geist tracking-[-0.02em] mb-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-slate-600 font-medium font-geist tracking-[-0.01em] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className={cn(
          "px-8 pb-8",
          (title || description) ? "pt-0" : "pt-8"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};