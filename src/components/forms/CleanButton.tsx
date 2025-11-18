import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface CleanButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const CleanButton: React.FC<CleanButtonProps> = ({
  children,
  onClick,
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className
}) => {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500/20",
    secondary: "bg-slate-100 text-slate-700 shadow-sm hover:bg-slate-200 focus:ring-slate-500/20",
    outline: "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus:ring-slate-500/20",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus:ring-slate-500/20",
    danger: "bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500/20"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-medium"
  };

  const iconSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-geist tracking-[-0.01em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1",
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <>
          <svg className={cn("animate-spin", iconSize[size])} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Caricamento...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className={iconSize[size]} />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className={iconSize[size]} />
          )}
        </>
      )}
    </button>
  );
};