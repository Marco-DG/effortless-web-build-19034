import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    icon: LucideIcon;
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
    actionVisibility = 'always'
}, ref) => {
    const baseStyles = "group relative flex items-center w-full h-10 px-3 rounded-[12px] border transition-all duration-200 cursor-pointer select-none";

    const variants = {
        ghost: isActive
            ? 'bg-slate-50 border-transparent'
            : 'bg-transparent border-transparent hover:bg-slate-50',
        outlined: isActive
            ? 'bg-slate-50 border-slate-300'
            : 'bg-white border-slate-200/60 hover:border-slate-300 shadow-sm'
    };

    const defaultIconColor = isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900';

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${isDraggable && !isActive ? 'hover:shadow-sm' : ''}
                ${isLocked ? 'opacity-60 grayscale-[0.5]' : ''}
                ${className}
            `}
        >
            {/* Fixed Icon - Always pinned to left */}
            <Icon
                size={20}
                strokeWidth={1.5}
                className={`shrink-0 transition-colors duration-200 ${iconClassName || defaultIconColor}`}
            />

            {/* Collapsible Text Container */}
            <div
                className="flex-1 flex items-center overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                    maxWidth: isExpanded ? '100%' : '0px',
                    opacity: isExpanded ? 1 : 0
                }}
            >
                {/* Inner Content with Static Padding - Prevents layout jitter */}
                <div className="flex items-center gap-2 pl-2.5 min-w-0 w-full">
                    <span className={`text-sm truncate tracking-[-0.01em] ${isActive ? 'font-semibold text-slate-900' : 'font-medium text-slate-700 group-hover:text-slate-900'}`}>
                        {label}
                    </span>
                    {subLabel && (
                        <span className="text-[10px] font-medium text-slate-400 shrink-0">
                            {subLabel}
                        </span>
                    )}
                </div>
            </div>

            {/* Actions / Chevron */}
            <div
                className={`
                    shrink-0 flex items-center ml-auto transition-all duration-300
                    ${actionVisibility === 'hover' ? 'opacity-0 group-hover:opacity-100' : ''}
                `}
                style={{
                    opacity: isExpanded ? (actionVisibility === 'hover' ? undefined : 1) : 0,
                    width: isExpanded ? 'auto' : '0px',
                    pointerEvents: isExpanded ? 'auto' : 'none'
                }}
            >
                {actions}
            </div>
        </div>
    );
});

SidebarItem.displayName = 'SidebarItem';
