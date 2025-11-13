import { Monitor, Tablet, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewportMode = "desktop" | "tablet" | "mobile";

interface ViewportSelectorProps {
  currentMode: ViewportMode;
  onModeChange: (mode: ViewportMode) => void;
  availableModes?: ViewportMode[];
}

const VIEWPORT_CONFIG = {
  desktop: { icon: Monitor, label: "Desktop", width: "100%" },
  tablet: { icon: Tablet, label: "Tablet", width: "768px" },
  mobile: { icon: Smartphone, label: "Mobile", width: "375px" },
};

export function ViewportSelector({ 
  currentMode, 
  onModeChange, 
  availableModes = ["desktop", "tablet", "mobile"] 
}: ViewportSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {availableModes.map((mode) => {
        const { icon: Icon, label } = VIEWPORT_CONFIG[mode];
        const isActive = currentMode === mode;
        
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onModeChange(mode)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
              isActive 
                ? "bg-white text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-white/50"
            )}
            aria-label={`Mostra anteprima ${label.toLowerCase()}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function getAvailableViewports(): ViewportMode[] {
  if (typeof window === "undefined") return ["desktop", "tablet", "mobile"];
  
  const width = window.innerWidth;
  
  if (width >= 1024) {
    // Desktop: mostra tutti
    return ["desktop", "tablet", "mobile"];
  } else if (width >= 768) {
    // Tablet: mostra tablet e mobile
    return ["tablet", "mobile"];
  } else {
    // Mobile: solo mobile
    return ["mobile"];
  }
}

export function getViewportStyles(mode: ViewportMode, isInModal = false): React.CSSProperties {
  const config = VIEWPORT_CONFIG[mode];
  
  if (mode === "desktop" || isInModal) {
    return { width: "100%", height: "100%" };
  }
  
  return {
    width: config.width,
    height: "100%",
    margin: "8px auto 0",
    border: "1px solid hsl(var(--border))",
    borderRadius: "6px",
    overflow: "hidden",
    transform: "scale(1)", // Force a new stacking context
    transformOrigin: "top center"
  };
}