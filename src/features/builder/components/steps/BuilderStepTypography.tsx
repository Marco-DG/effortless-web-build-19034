import React from "react";
import { BuilderData } from "@/types/builder";
import { Check, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllFonts, ensureGoogleFontLoaded } from "@/lib/fonts";

interface BuilderStepTypographyProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
}

const fonts = getAllFonts();

export const BuilderStepTypography = ({ data, onUpdate }: BuilderStepTypographyProps) => {
  const [applyTarget, setApplyTarget] = React.useState<"fontPrimary" | "fontSecondary">("fontSecondary");
  const selectedFont = applyTarget === "fontSecondary"
    ? (data.fontSecondary || data.fontPrimary || data.fontFamily || "Inter")
    : (data.fontPrimary || data.fontFamily || "Inter");

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<"Tutti"|"Sans-serif"|"Serif"|"Monospace"|"Display"|"Preferiti">("Tutti");
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try {
      const raw = localStorage.getItem("favoriteFonts");
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  });

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const favActive = category === "Preferiti";
    return fonts.filter((f: any) => {
      const mq = !q || f.name.toLowerCase().includes(q);
      const mc = category === "Tutti" || category === "Preferiti" || f.category === category;
      const mf = !favActive || favorites.includes(f.id);
      return mq && mc && mf;
    });
  }, [query, category, favorites]);

 // Evita flicker: non applicare mai fontFamily inline sulla lista

  React.useEffect(() => {
    const current = fonts.find((f: any) => f.id === selectedFont);
    if (current) ensureGoogleFontLoaded(current.id, current.google);
  }, [selectedFont]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id];
      try { localStorage.setItem("favoriteFonts", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleSelect = (font: any) => {
    ensureGoogleFontLoaded(font.id, font.google);
    if (applyTarget === "fontPrimary") {
      onUpdate({ fontPrimary: font.id, fontFamily: font.id });
    } else {
      onUpdate({ fontSecondary: font.id });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold mb-1">Tipografia</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {([
            { key: "fontSecondary", label: "Titoli", value: data.fontSecondary || data.fontPrimary || data.fontFamily || "—" },
            { key: "fontPrimary", label: "Sottotitoli", value: data.fontPrimary || data.fontFamily || "—" },
          ] as const).map(({ key, label, value }) => (
            <button
              key={key}
              type="button"
              onClick={() => setApplyTarget(key as any)}
              className={`text-left p-2 rounded-md border hover:bg-muted/50 transition-colors ${applyTarget === key ? "border-primary" : ""}`}
            >
              <div className="text-[11px] text-muted-foreground">{label}</div>
              <div className="text-sm font-medium truncate" style={{ fontFamily: typeof value === 'string' ? value : undefined }}>{value}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Cerca font..."
          className="w-full px-3 py-2 border rounded-md text-sm"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <Select value={category} onValueChange={(v)=> setCategory(v as any)}>
          <SelectTrigger className="w-[200px] h-9 text-xs border rounded-md bg-white shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-primary/40">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            {(["Tutti","Preferiti","Sans-serif","Serif","Monospace","Display"] as const).map(c => (
              <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border divide-y max-h-[520px] overflow-auto pr-1 bg-white">
        {filtered.map((font: any) => {
          const isSelected = selectedFont === font.id;
          return (
            <button
              key={font.id}
              onClick={() => handleSelect(font)}
              className={`w-full text-left p-3 transition-colors ${
                isSelected ? "bg-primary/5" : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm truncate">{font.name}</h4>
                    {isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-1">{font.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e)=>{ e.stopPropagation(); toggleFavorite(font.id); }}
                    onKeyDown={(e)=>{ if(e.key==='Enter'){ e.stopPropagation(); toggleFavorite(font.id); } }}
                    className={`p-1 rounded hover:bg-white/60 transition-colors ${favorites.includes(font.id) ? "text-yellow-500" : "text-muted-foreground"}`}
                    aria-label={favorites.includes(font.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                  >
                    <Star className={`w-4 h-4 ${favorites.includes(font.id) ? "fill-yellow-400" : ""}`} />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-sm text-muted-foreground p-4 border rounded-md">Nessun font trovato.</div>
        )}
      </div>
    </div>
  );
};

