import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { SIDEBAR_TRANSITIONS } from '../../constants/sidebar';
import { type SidebarContainerProps } from '../../types/sidebar';

/**
 * Dedicated sidebar container component that handles:
 * - Width animations and transitions
 * - Hover state management
 * - Scroll area setup
 * - Border styling
 * 
 * Separates sidebar rendering logic from layout concerns
 */
export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  width,
  isExpanded,
  onHoverChange,
  children,
  className = ""
}) => {
  return (
    <div
      style={{
        width,
        transition: SIDEBAR_TRANSITIONS.WIDTH
      }}
      className={`flex flex-col flex-shrink-0 relative z-20 overflow-hidden ${className}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Elegant border divider */}
      <div className="absolute right-0 top-0 bottom-0 sidebar-divider"></div>
      
      {/* Scrollable content area */}
      <ScrollArea className="flex-1">
        {children}
      </ScrollArea>
    </div>
  );
};