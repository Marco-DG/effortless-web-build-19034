import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import type { ReactNode } from "react";

export type CTATheme = "primary" | "emerald" | "fuchsia" | "rose";
export type CTAVariant = "primary" | "secondary";

const themeStyles: Record<CTATheme, {
  overlay: string;
  ring: string;
  iconText: string;
  iconBg: string;
  badgeText: string;
  badgeIcon: string;
}> = {
  primary: {
    overlay: "from-primary/20",
    ring: "ring-primary/30 hover:ring-primary/50",
    iconText: "text-primary",
    iconBg: "bg-white/30",
    badgeText: "text-foreground/70",
    badgeIcon: "text-primary",
  },
  emerald: {
    overlay: "from-emerald-100/50",
    ring: "ring-emerald-300 hover:ring-emerald-400/70",
    iconText: "text-emerald-700",
    iconBg: "bg-white/30",
    badgeText: "text-foreground/70",
    badgeIcon: "text-emerald-500",
  },
  fuchsia: {
    overlay: "from-fuchsia-200/50",
    ring: "ring-fuchsia-300 hover:ring-fuchsia-400/70",
    iconText: "text-fuchsia-700",
    iconBg: "bg-white/30",
    badgeText: "text-foreground/70",
    badgeIcon: "text-fuchsia-500",
  },
  rose: {
    overlay: "from-rose-100/60",
    ring: "ring-rose-300 hover:ring-rose-400/80",
    iconText: "text-rose-700",
    iconBg: "bg-white/30",
    badgeText: "text-foreground/70",
    badgeIcon: "text-rose-500",
  },
};

export interface CTAButtonProps {
  onClick: () => void;
  icon: ReactNode;
  title: string;
  subtitle: string;
  theme: CTATheme;
  variant?: CTAVariant;
}

export function CTAButton({ onClick, icon, title, subtitle, theme, variant = "secondary" }: CTAButtonProps) {
  const t = themeStyles[theme];
  return (
    <MagneticButton
      onClick={onClick}
      className={`group relative w-full text-left px-5 sm:px-6 py-4 rounded-2xl transition-all duration-300 elev-1 flex items-center justify-between gap-4 overflow-hidden transform hover:-translate-y-0.5
      ${variant === 'primary'
        ? 'text-white bg-gradient-to-r from-primary via-primary/80 to-fuchsia-500 hover:shadow-2xl ring-1 ring-primary/50 hover:ring-primary/70'
        : `text-foreground bg-white/80 backdrop-blur hover:shadow-xl group-hover:shadow-xl ring-1 ${t.ring}`
      }`}
    >
      <span className={`absolute inset-0 ${variant === 'primary' ? 'bg-white/10 opacity-0 group-hover:opacity-100' : 'bg-gradient-to-l ' + t.overlay + ' to-transparent opacity-100'} transition-opacity duration-500`} />

      <span className={`relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-xl ${variant === 'primary' ? 'bg-white/20 text-white' : `${t.iconBg} ${t.iconText}`}`}>
        {icon}
      </span>

      <span className="relative z-10 flex-1 min-w-0">
        <span className="block text-base sm:text-lg font-semibold leading-snug inline-flex items-center gap-2 flex-wrap text-foreground">
          <span>{title}</span>
          {variant === 'secondary' && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/70 ring-1 ring-white/60 text-[10px] font-medium">
              <Sparkles className={`w-3 h-3 ${t.badgeIcon}`} />
              <span className={t.badgeText}>IA</span>
            </span>
          )}
        </span>
        <span className={`block text-xs sm:text-sm ${variant === 'primary' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{subtitle}</span>
      </span>

      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </MagneticButton>
  );
}
