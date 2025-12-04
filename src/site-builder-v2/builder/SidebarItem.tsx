import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: LucideIcon;
    label: string;
    subLabel?: string;
    isActive?: boolean;
    isExpanded: boolean;
    onClick?: (e: React.MouseEvent) => void;
    actions?: React.ReactNode;
    variant?: 'ghost' | 'outlined' | 'dropdown' | 'action';
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
    customIcon,
    ...props
}, ref) => {
    const getBaseStyles = () => {
        const baseCursor = variant === 'dropdown' ? 'cursor-pointer' : 'cursor-pointer';
        const groupClass = variant === 'dropdown' ? '' : 'group';
        const sidebarClass = variant === 'dropdown' ? 'sidebar-dropdown-item' : 'sidebar-nav-item';
        // Removed w-full, added mx-1. Flex parent (stretch) will handle width.
        return `${sidebarClass} mx-1 h-11 flex items-center px-2 py-2.5 text-sm transition-colors duration-200 rounded-[12px] ${groupClass} font-medium ${baseCursor} select-none`;
    };

    const variants = {
        ghost: isActive
            ? 'bg-slate-100 text-slate-900 font-semibold'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900',
        outlined: isActive
            ? 'bg-slate-100 text-slate-900 font-semibold border border-slate-200'
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-slate-200/50 hover:border-slate-300',
        dropdown: 'bg-white border border-slate-200/60 shadow-sm text-slate-700 !bg-white hover:!bg-white hover:!border-slate-200/60 hover:!rounded-[12px] hover:!transform-none hover:!translate-x-0',
        action: 'text-blue-600 hover:bg-blue-50/60 border border-transparent hover:border-blue-200/50'
    };

    const defaultIconColor = isActive
        ? 'text-slate-900'
        : (variant === 'action' ? 'text-blue-600' : (variant === 'dropdown' ? 'text-slate-700' : 'text-slate-500 group-hover:text-slate-900'));

    return (
        <div
            ref={ref}
            onClick={onClick}
            {...props}
            className={`
                ${getBaseStyles()}
                ${variants[variant]}
                ${isLocked ? 'opacity-60' : ''}
                ${className}
            `}
        >
            {/* Icon container - Fixed width for stability */}
            <div className="shrink-0 w-8 flex items-center justify-center">
                {customIcon ? (
                    <div className={iconClassName || defaultIconColor}>
                        {customIcon}
                    </div>
                ) : Icon && (
                    <Icon
                        size={18}
                        strokeWidth={1.5}
                        className={iconClassName || defaultIconColor}
                    />
                )}
            </div>

            {/* Text - Smooth fade in/out without movement */}
            {/* Text - Smooth fade in/out without movement */}
            <div
                className={`
                    flex-1 grid transition-[grid-template-columns,opacity] duration-700 ease-out
                    ${isExpanded ? 'grid-cols-[1fr] opacity-100' : 'grid-cols-[0fr] opacity-0'}
                `}
            >
                <div className="overflow-hidden">
                    <div className="flex items-center gap-2 pl-2.5 min-w-max">
                        <span className="text-sm font-medium truncate">
                            {label}
                        </span>
                        {subLabel && (
                            <span className="text-xs text-slate-400 font-medium shrink-0">
                                {subLabel}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions - Smooth fade in/out without movement */}
            {actions && (
                <div className={`
                    shrink-0 overflow-hidden transition-all duration-700 ease-in-out
                    ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}
                    ${variant === 'dropdown'
                        ? ''
                        : (actionVisibility === 'hover' ? 'opacity-0 group-hover:opacity-100' : '')
                    }
                `}>
                    <div className="flex items-center ml-auto pl-2">
                        {actions}
                    </div>
                </div>
            )}
        </div>
    );
});

SidebarItem.displayName = 'SidebarItem';
