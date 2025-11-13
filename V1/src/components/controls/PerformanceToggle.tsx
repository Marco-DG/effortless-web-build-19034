import { useReducedEffects } from "@/hooks/useReducedEffects";
import { Cpu, Zap } from "lucide-react";

export function PerformanceToggle() {
  const { enabled, setEnabled } = useReducedEffects();
  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className="sm:hidden fixed bottom-20 right-3 z-50 rounded-full bg-white/90 border border-border shadow px-3 py-2 text-xs flex items-center gap-1"
      aria-pressed={enabled}
      aria-label="Prestazioni ottimizzate"
    >
      {enabled ? <Cpu className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
      <span>{enabled ? "Prestazioni" : "Effetti"}</span>
    </button>
  );
}
