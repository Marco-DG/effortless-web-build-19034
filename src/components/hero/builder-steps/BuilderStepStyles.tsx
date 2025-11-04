import { BuilderData } from "../InteractiveBuilder";
import { Label } from "@/components/ui/label";

interface BuilderStepStylesProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
}

export const BuilderStepStyles = ({ data, onUpdate }: BuilderStepStylesProps) => {
  const theme = data.customTheme || { primary: "#0ea5e9", secondary: "#10b981", accent: "#f59e0b" };
  const set = (key: "primary" | "secondary" | "accent", value: string) => {
    onUpdate({ customTheme: { ...theme, [key]: value } });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-semibold">Stili globali</h3>
      <p className="text-sm text-muted-foreground">Scegli i colori chiave del sito. I template premium li useranno come accenti.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <Label className="text-sm font-medium">Primario</Label>
          <input type="color" value={theme.primary} onChange={(e)=>set("primary", e.target.value)} className="mt-2 h-10 w-full rounded border" />
        </div>
        <div>
          <Label className="text-sm font-medium">Secondario</Label>
          <input type="color" value={theme.secondary} onChange={(e)=>set("secondary", e.target.value)} className="mt-2 h-10 w-full rounded border" />
        </div>
        <div>
          <Label className="text-sm font-medium">Accent</Label>
          <input type="color" value={theme.accent} onChange={(e)=>set("accent", e.target.value)} className="mt-2 h-10 w-full rounded border" />
        </div>
      </div>
    </div>
  );
};


