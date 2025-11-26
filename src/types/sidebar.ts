import { LucideIcon } from 'lucide-react';
import { SIDEBAR_WIDTHS, SIDEBAR_TRANSITIONS, SIDEBAR_SPACING, SIDEBAR_BREAKPOINTS } from '../constants/sidebar';

/**
 * Core sidebar types - centralized for consistency across the application
 */

/** Possible states of the sidebar */
export type SidebarState = 'expanded' | 'collapsed';

/** Valid sidebar widths from constants */
export type SidebarWidth = typeof SIDEBAR_WIDTHS[keyof typeof SIDEBAR_WIDTHS];

/** Builder types supported by the sidebar */
export type BuilderType = 'logo' | 'menu' | 'site';

/** Section representation in the sidebar */
export interface BuilderSection {
  /** Unique identifier for the section */
  id: string;
  /** Display label for the section */
  label: string;
  /** Icon component to display */
  icon: LucideIcon;
  /** Category for grouping (e.g., 'design', 'content', 'structure') */
  category: string;
  /** Descriptive text shown in the header when section is active */
  description: string;
}

/** Grouped sections by category for rendering */
export interface SidebarCategory {
  /** Category identifier */
  id: string;
  /** Display label for the category */
  label: string;
  /** Sections belonging to this category */
  sections: BuilderSection[];
}

/** Hover state management */
export interface SidebarHoverState {
  /** Whether the sidebar itself is being hovered */
  isSidebarHovered: boolean;
  /** Whether the editor area is being hovered */
  isEditorHovered: boolean;
  /** Last known width state for persistence */
  lastKnownWidth: SidebarState;
}

/** Configuration object for sidebar behavior */
export interface SidebarConfig {
  /** Width constants */
  widths: typeof SIDEBAR_WIDTHS;
  /** Transition constants */
  transitions: typeof SIDEBAR_TRANSITIONS;
  /** Spacing constants */
  spacing: typeof SIDEBAR_SPACING;
  /** Breakpoint constants */
  breakpoints: typeof SIDEBAR_BREAKPOINTS;
  /** Default state when sidebar first loads */
  defaultState: SidebarState;
}

/** Props for SidebarContainer component */
export interface SidebarContainerProps {
  /** Current width of the sidebar (from useSidebarState) */
  width: SidebarWidth | string;
  /** Whether the sidebar is currently expanded */
  isExpanded: boolean;
  /** Callback when hover state changes on the sidebar */
  onHoverChange: (hovered: boolean) => void;
  /** Content to render inside the sidebar */
  children: React.ReactNode;
  /** Optional custom className for the container */
  className?: string;
}

/** Return type for useSidebarState hook */
export interface SidebarStateReturn {
  /** Whether sidebar is currently expanded */
  isExpanded: boolean;
  /** Current width value for styling */
  sidebarWidth: SidebarWidth | string;
  /** Function to set sidebar hover state */
  setIsHovered: (hovered: boolean) => void;
  /** Function to set editor hover state */
  setIsEditorHovered: (hovered: boolean) => void;
  /** Current sidebar hover state (useful for debugging) */
  isHovered: boolean;
  /** Current editor hover state (useful for debugging) */
  isEditorHovered: boolean;
  /** Last known width state */
  lastKnownWidth: SidebarState;
}

/** Props for UnifiedBuilderLayout component - sidebar specific */
export interface SidebarLayoutProps {
  /** Builder configuration */
  builderType: BuilderType;
  /** List of sections to display in sidebar */
  sections: readonly BuilderSection[];
  /** Currently active section ID */
  activeSection: string;
  /** Callback when section selection changes */
  onSectionChange: (sectionId: string) => void;
  /** Optional custom renderer for categories */
  renderCategory?: (categoryId: string, isExpanded: boolean) => React.ReactNode;
}