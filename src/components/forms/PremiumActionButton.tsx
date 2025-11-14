import React from 'react';
import { cn } from '@/lib/utils';

interface PremiumActionButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const PremiumActionButton: React.FC<PremiumActionButtonProps> = ({
  children,
  onClick,
  variant = 'secondary',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className
}) => {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary: "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg shadow-slate-900/25 hover:from-slate-600 hover:to-slate-700 focus:ring-slate-300/50",
    secondary: "border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 text-slate-700 shadow-sm hover:shadow-md hover:from-white/90 hover:via-slate-50/50 hover:to-slate-50/70 focus:ring-slate-300/50",
    ghost: "text-slate-600 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-slate-100/50 hover:text-slate-800 focus:ring-slate-300/50",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-900/25 hover:from-red-400 hover:to-red-500 focus:ring-red-300/50"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "group relative inline-flex items-center justify-center px-6 py-3 rounded-[16px] text-sm font-semibold font-geist tracking-[-0.01em] transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white/50 backdrop-blur-sm overflow-hidden",
        variantClasses[variant],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Hover gradient overlay per secondary e ghost */}
      {(variant === 'secondary' || variant === 'ghost') && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      <div className="relative flex items-center justify-center gap-2.5">
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Caricamento...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className="w-4 h-4" />
            )}
            <span>{children}</span>
            {Icon && iconPosition === 'right' && (
              <Icon className="w-4 h-4" />
            )}
          </>
        )}
      </div>
    </button>
  );
};