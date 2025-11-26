/**
 * Sidebar configuration constants
 * Centralizes all magic numbers and styling values for the sidebar component
 */

export const SIDEBAR_WIDTHS = {
  /** Full expanded width - shows text and icons */
  EXPANDED: '16rem', // 256px
  /** Collapsed width - matches icon button size (w-14 h-14) */
  COLLAPSED: '3.5rem', // 56px
} as const;

export const SIDEBAR_TRANSITIONS = {
  /** Main width transition for expand/collapse animation */
  WIDTH: 'width 700ms cubic-bezier(0.2, 0, 0, 1)',
  /** Opacity transition for fade effects */
  OPACITY: 'opacity 300ms cubic-bezier(0.2, 0, 0, 1)',
  /** Standard transition for text and other elements */
  STANDARD: 'all 200ms ease-out',
} as const;

export const SIDEBAR_SPACING = {
  /** Padding inside sidebar sections */
  SECTION_PADDING: '0.5rem', // 8px - equivalent to p-2
  /** Gap between sidebar items */
  ITEM_GAP: '0.5rem', // 8px - equivalent to gap-2
  /** Internal padding for sidebar items */
  ITEM_PADDING_X: '0.75rem', // 12px - equivalent to px-3
  ITEM_PADDING_Y: '0.625rem', // 10px - equivalent to py-2.5
} as const;

export const SIDEBAR_BREAKPOINTS = {
  /** Breakpoint where sidebar behavior changes */
  RESPONSIVE: 'lg', // Tailwind lg: 1024px
} as const;

export type SidebarWidth = typeof SIDEBAR_WIDTHS[keyof typeof SIDEBAR_WIDTHS];
export type SidebarState = 'expanded' | 'collapsed';