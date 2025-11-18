import React from 'react';
import { cn } from '@/lib/utils';

interface CleanToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const CleanToggle: React.FC<CleanToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  className
}) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2",
        checked 
          ? "bg-blue-600 shadow-sm" 
          : "bg-slate-200 hover:bg-slate-300",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
};