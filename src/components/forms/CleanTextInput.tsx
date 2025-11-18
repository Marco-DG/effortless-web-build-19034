import React from 'react';
import { cn } from '@/lib/utils';

interface CleanTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  className?: string;
  type?: 'text' | 'email' | 'tel' | 'url';
}

export const CleanTextInput: React.FC<CleanTextInputProps> = ({
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
  disabled = false,
  className,
  type = 'text'
}) => {
  const InputComponent = multiline ? 'textarea' : 'input';
  
  return (
    <InputComponent
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      {...(multiline ? { rows } : { type })}
      className={cn(
        "w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-medium font-geist tracking-[-0.01em] resize-none",
        "bg-white shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        "hover:border-slate-300",
        "placeholder:text-slate-400 placeholder:font-normal",
        "transition-all duration-200",
        disabled && "bg-slate-50 text-slate-400 cursor-not-allowed",
        className
      )}
    />
  );
};