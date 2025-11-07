import React from "react";
import { BuilderData, TemplateType } from "@/types/builder";
import { OptionList } from "@/components/ui/option-list";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuilderStep0Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
}

const allTemplates = [
  {
    id: "wine-bar" as TemplateType,
    name: "Wine Bar",
    description: "Elegante, minimale — stile premium",
  },
  {
    id: "fine-dining" as TemplateType,
    name: "Fine Dining",
    description: "Lussuoso, serif editoriale",
  },
  {
    id: "trattoria" as TemplateType,
    name: "La Trattoria",
    description: "Stile caldo, tradizionale",
  },
];

export const BuilderStep0 = ({ data, onUpdate, onNext }: BuilderStep0Props) => {
  const handleTemplateSelect = (template: TemplateType) => {
    onUpdate({ template });
    // Non cambiare automaticamente sezione; resta su Template
  };

  const [query, setQuery] = React.useState("");
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try { const raw = localStorage.getItem("favoriteTemplates"); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : []; } catch { return []; }
  });
  const [category, setCategory] = React.useState<"Tutti"|"Preferiti">("Tutti");
  const templates = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = allTemplates.filter(t => !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    const filtered = category === "Preferiti" ? base.filter(t => favorites.includes(t.id)) : base;
    return filtered;
  }, [query, category, favorites]);
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id];
      try { localStorage.setItem("favoriteTemplates", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-heading font-bold text-foreground">
          Scegli il tuo template
        </h3>
        <p className="text-muted-foreground text-lg">
          Seleziona lo stile che rappresenta meglio la tua attività
        </p>
      </div>

      <div className="mt-6">
        <OptionList
          enableSearch
          searchPlaceholder="Cerca template..."
          onSearchChange={setQuery}
          searchAddon={(
            <Select value={category} onValueChange={(v)=> setCategory(v as any)}>
              <SelectTrigger className="w-[160px] h-9 text-xs border rounded-md bg-white shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-primary/40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                {(["Tutti","Preferiti"] as const).map(c => (
                  <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          items={templates.map(t => ({ id: t.id, title: t.name, description: t.description, thumbnailUrl: (
            t.id === "wine-bar" ? "https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=400&auto=format&fit=crop" :
            t.id === "fine-dining" ? "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop" :
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop"
          ), meta: (
            <button
              onClick={(e)=>{ e.stopPropagation(); toggleFavorite(t.id); }}
              className={`p-1 rounded hover:bg-white/60 transition-colors ${favorites.includes(t.id) ? "text-yellow-500" : "text-muted-foreground"}`}
              aria-label={favorites.includes(t.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            >
              <svg className={`w-4 h-4 ${favorites.includes(t.id) ? "fill-yellow-400" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </button>
          ) }))}
          selectedId={data.template}
          onSelect={(id)=> handleTemplateSelect(id)}
          ariaLabel="Seleziona template"
          showSelectedCheck
        />
      </div>
    </div>
  );
};
