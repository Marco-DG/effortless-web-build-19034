/**
 * Design Tokens Unificati - Premium Glassmorphism System
 * Centralizza tutti gli stili per consistenza totale
 */

export const designTokens = {
  // 🎨 GLASSMORPHISM COLORS
  colors: {
    // Background glassmorphism
    glassBg: 'bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60',
    glassHover: 'hover:from-white/90 hover:via-slate-50/50 hover:to-slate-50/70',
    
    // Borders
    border: 'border-slate-200/50',
    borderHover: 'hover:border-slate-300/50',
    borderActive: 'border-slate-400/60',
    
    // Text
    textPrimary: 'text-slate-800',
    textSecondary: 'text-slate-600', 
    textMuted: 'text-slate-500',
    textLight: 'text-slate-400',
    
    // Backgrounds
    bgPrimary: 'bg-slate-700',
    bgSecondary: 'bg-slate-600',
    bgMuted: 'bg-slate-100/80',
  },

  // 📐 SPACING & BORDERS
  spacing: {
    // Border radius premium
    borderRadius: {
      card: 'rounded-[16px]',
      button: 'rounded-[12px]', 
      input: 'rounded-[8px]',
      badge: 'rounded-full',
      large: 'rounded-[20px]',
      xl: 'rounded-[24px]',
    },
    
    // Padding consistente
    padding: {
      card: 'p-6',
      cardSmall: 'p-4', 
      button: 'px-6 py-3',
      buttonSmall: 'px-4 py-2',
      input: 'px-4 py-3',
    },
  },

  // 🎯 EFFECTS
  effects: {
    // Shadows glassmorphism
    shadow: 'shadow-sm',
    shadowMd: 'shadow-md',
    shadowLg: 'shadow-lg shadow-slate-900/25',
    
    // Backdrop blur
    backdrop: 'backdrop-blur-sm',
    
    // Transitions
    transition: 'transition-all duration-300',
    transitionFast: 'transition-all duration-200',
    transitionSlow: 'transition-all duration-500',
  },

  // ✍️ TYPOGRAPHY
  typography: {
    // Font Geist con tracking
    primary: 'font-geist tracking-[-0.01em]',
    secondary: 'font-geist tracking-[-0.005em]',
    accent: 'font-geist tracking-[-0.02em]',
    
    // Sizes
    heading: 'text-lg font-bold',
    subheading: 'text-sm font-semibold', 
    body: 'text-sm font-medium',
    caption: 'text-xs font-medium',
  },

  // 🎛️ COMPONENT COMBINATIONS
  components: {
    // Premium card base
    premiumCard: 'bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm border border-slate-200/50 rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300',
    
    // Premium button
    premiumButton: 'px-6 py-3 rounded-[12px] font-geist tracking-[-0.01em] transition-all duration-300',
    premiumButtonSecondary: 'border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 text-slate-700 backdrop-blur-sm',
    
    // Premium input
    premiumInput: 'px-4 py-3 border-0 rounded-[8px] bg-white/60 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-slate-300/50 font-geist tracking-[-0.01em]',
    
    // Premium badge  
    premiumBadge: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-slate-100/80 text-slate-700 rounded-full border border-slate-200/50 backdrop-blur-sm',
  }
} as const;

// 🛠️ UTILITY FUNCTIONS
export const createGlassCard = (extraClasses = '') => 
  `${designTokens.components.premiumCard} ${extraClasses}`.trim();

export const createGlassButton = (variant: 'primary' | 'secondary' = 'secondary', extraClasses = '') =>
  `${designTokens.components.premiumButton} ${variant === 'primary' ? designTokens.colors.bgPrimary + ' text-white' : designTokens.components.premiumButtonSecondary} ${extraClasses}`.trim();

export const createGlassInput = (extraClasses = '') =>
  `${designTokens.components.premiumInput} ${extraClasses}`.trim();

export const createGlassBadge = (color: 'default' | 'amber' | 'red' | 'green' = 'default', extraClasses = '') => {
  const colorMap = {
    default: designTokens.components.premiumBadge,
    amber: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-amber-100/80 text-amber-700 rounded-full border border-amber-200/50 backdrop-blur-sm',
    red: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100/80 text-red-700 rounded-full border border-red-200/50 backdrop-blur-sm',
    green: 'inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100/80 text-green-700 rounded-full border border-green-200/50 backdrop-blur-sm'
  };
  
  return `${colorMap[color]} ${extraClasses}`.trim();
};