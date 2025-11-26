import React from 'react';
import { SIDEBAR_WIDTHS, type SidebarState } from '../constants/sidebar';

export const useSidebarState = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isEditorHovered, setIsEditorHovered] = React.useState(false);
  const [lastKnownWidth, setLastKnownWidth] = React.useState<SidebarState>('expanded');

  // Update last known width when explicitly hovering sidebar areas
  React.useEffect(() => {
    if (isHovered) {
      setLastKnownWidth('expanded');
    } else if (isEditorHovered) {
      setLastKnownWidth('collapsed');
    }
    // When neither is hovered, we keep the lastKnownWidth unchanged
  }, [isHovered, isEditorHovered]);

  // Calculate expansion state
  const isExpanded = isHovered || (!isEditorHovered && lastKnownWidth === 'expanded');

  // Calculate width using constants
  // Sidebar Hover -> Full expanded width
  // Editor Hover -> Collapsed width (matches icon button size)
  // No hover -> Keep last known state
  const sidebarWidth = isHovered ? SIDEBAR_WIDTHS.EXPANDED : (isEditorHovered ? SIDEBAR_WIDTHS.COLLAPSED : (lastKnownWidth === 'expanded' ? SIDEBAR_WIDTHS.EXPANDED : SIDEBAR_WIDTHS.COLLAPSED));

  return {
    // State values
    isExpanded,
    sidebarWidth,
    
    // Control functions
    setIsHovered,
    setIsEditorHovered,
    
    // Current hover states (useful for debugging)
    isHovered,
    isEditorHovered,
    lastKnownWidth
  };
};