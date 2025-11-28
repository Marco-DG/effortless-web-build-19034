
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    icon?: LucideIcon;
    label: string;
    subLabel?: string;
    isActive?: boolean;
    isExpanded: boolean;
    onClick: (e: React.MouseEvent) => void;
    actions?: React.ReactNode;
    variant?: 'ghost' | 'outlined';
    iconClassName?: string;
    actionVisibility?: 'always' | 'hover';
    className?: string;
    isDraggable?: boolean;
    isLocked?: boolean;
    customIcon?: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(({
    icon: Icon,
    label,
    subLabel,
    isActive,
    isExpanded,
    onClick,
    actions,
    className = '',
    isDraggable,
    isLocked,
    variant = 'ghost',
    iconClassName,
    actionVisibility = 'always',
    customIcon
}, ref) => {
    const baseStyles = "group relative flex items-center w-full h-10 px-1.5 rounded-[12px] border transition-all duration-200 cursor-pointer select-none";

    const variants = {
        ghost: isActive 
            ? 'bg-slate-100 border-slate-200 shadow-sm'
            : 'bg-transparent border-transparent hover:bg-slate-50',
        outlined: isActive
            ? 'bg-slate-100 border-slate-300 shadow-md'
            : 'bg-white border-slate-200/60 hover:border-slate-300 shadow-sm'
    };

    const defaultIconColor = isActive 
        ? 'text-slate-800' 
        : 'text-slate-700 group-hover:text-slate-900';

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${isDraggable ? 'hover:shadow-sm' : ''}
                ${isLocked ? 'opacity-60' : ''}
                ${className}
            `}
        >
            {/* Icon - Always visible */}
            {customIcon ? (
                <div className={`shrink-0 flex items-center justify-center w-5 h-5 ${iconClassName || 'text-slate-500'}`}>
                    {customIcon}
                </div>
            ) : Icon && (
                <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={`shrink-0 ${iconClassName || defaultIconColor}`}
                />
            )}

            {/* Text - Smooth fade in/out */}
            <div 
                className="flex-1 flex items-center gap-2 pl-2.5 min-w-0 overflow-hidden transition-opacity duration-300 ease-out"
                style={{
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                <span className={`text-sm font-medium truncate tracking-[-0.01em] transition-colors duration-150 ${
                    isActive 
                        ? 'text-slate-800 font-semibold' 
                        : 'text-slate-700 group-hover:text-slate-900'
                }`}>
                    {label}
                </span>
                {subLabel && (
                    <span className="text-xs text-slate-400 font-medium shrink-0">
                        {subLabel}
                    </span>
                )}
            </div>

            {/* Actions - Smooth fade in/out */}
            {actions && (
                <div 
                    className={`shrink-0 flex items-center ml-auto transition-opacity duration-300 ease-out ${
                        actionVisibility === 'hover' ? 'group-hover:opacity-100' : ''
                    }`}
                    style={{
                        opacity: isExpanded ? (actionVisibility === 'hover' ? 0 : 1) : 0,
                    }}
                >
                    {actions}
                </div>
            )}
        </div>
    );
});

SidebarItem.displayName = 'SidebarItem';
