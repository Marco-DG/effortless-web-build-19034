import React from 'react';
import { CleanButton } from './CleanButton';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface PremiumActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'ghost' | 'outline';
  disabled?: boolean;
  icon?: () => React.ReactNode;
  className?: string;
}

export const PremiumActionButton: React.FC<PremiumActionButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'outline', 
  disabled, 
  icon,
  className = '' 
}) => {
  return (
    <CleanButton
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      className={`flex items-center gap-2 ${className}`}
    >
      {icon && icon()}
      {children}
    </CleanButton>
  );
};