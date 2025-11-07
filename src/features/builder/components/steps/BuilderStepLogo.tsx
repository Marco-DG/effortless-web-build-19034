import React from "react";
import { BuilderData } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { PenTool, Upload, Image as ImageIcon, Trash2, Star } from "lucide-react";
import { OptionList } from "@/components/ui/option-list";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllFonts, ensureGoogleFontLoaded } from "@/lib/fonts";

interface BuilderStepLogoProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onGoDesignLogo?: () => void;
}

export const BuilderStepLogo: React.FC<BuilderStepLogoProps> = ({ data, onUpdate, onGoDesignLogo }) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = React.useState(false);

  const handleFile = async (file: File) => {
    const toDataUrl = (f: File) => new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result as string);
      r.onerror = rej;
      r.readAsDataURL(f);
    });
    const url = await toDataUrl(file);
    onUpdate({ logoUrl: url });
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFile(file);
  };

  const useText = data.logoMode === 'text';

  // Typography controls (reused from Typography step in compact form)
  const fonts = React.useMemo(() => getAllFonts(), []);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<"Tutti"|"Sans-serif"|"Serif"|"Monospace"|"Display"|"Preferiti">("Tutti");
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("favoriteFonts") || "[]"); } catch { return []; }
  });
  const selectedLogoFont = data.logoFont || data.fontSecondary || data.fontPrimary || "Inter";

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const favActive = category === "Preferiti";
    return fonts.filter((f: any) => {
      const mq = !q || f.name.toLowerCase().includes(q);
      const mc = category === "Tutti" || category === "Preferiti" || f.category === category;
      const mf = !favActive || favorites.includes(f.id);
      return mq && mc && mf;
    });
  }, [query, category, favorites, fonts]);

  React.useEffect(() => {
    const current = fonts.find((f: any) => f.id === selectedLogoFont);
    if (current) ensureGoogleFontLoaded(current.id, current.google);
  }, [selectedLogoFont, fonts]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id];
      try { localStorage.setItem("favoriteFonts", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const handleFontSelect = (font: any) => {
    ensureGoogleFontLoaded(font.id, font.google);
    onUpdate({ logoFont: font.id });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold">Logo</h3>
          {/* Mode toggle */}
          <div className="rounded-md border border-border p-0.5 bg-white/70">
            <div className="grid grid-cols-2 gap-0.5">
              <button
                type="button"
                onClick={() => onUpdate({ logoMode: 'image' })}
                className={`px-2 py-1.5 text-xs rounded ${!useText ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                Immagine
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ logoMode: 'text' })}
                className={`px-2 py-1.5 text-xs rounded ${useText ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                Testo
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!useText && (
            <Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" /> Carica
            </Button>
          )}
          <Button size="sm" onClick={onGoDesignLogo}>
            <PenTool className="w-4 h-4 mr-2" /> Disegna il tuo logo
          </Button>
        </div>
      </div>
      {!useText && (
        <div
          className={`rounded-md border ${dragOver ? "border-primary bg-primary/5" : "border-border bg-white"} p-4 transition-colors`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onClick={() => !data.logoUrl && fileInputRef.current?.click()}
        >
          {data.logoUrl ? (
          <div className="flex items-center gap-4">
            <img src={data.logoUrl} alt="Anteprima logo" className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">Logo caricato</p>
              <p className="text-xs text-muted-foreground">PNG, JPG o SVG. Consigliato: fondo trasparente.</p>
            </div>
            <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => onUpdate({ logoUrl: "" })}>
              <Trash2 className="w-4 h-4 mr-2" /> Rimuovi
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-12 h-12 rounded-md bg-muted/40 flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                Trascina qui il tuo logo oppure <button className="underline" onClick={() => fileInputRef.current?.click()}>carica un file</button>
              </p>
              <p className="text-xs">PNG, JPG o SVG · max ~5MB</p>
            </div>
          </div>
        )}
        </div>
      )}

      {useText && (
        <div className="space-y-4">
          {/* Preview */}
          <div className="rounded-md border bg-muted/20 p-4">
            <div className="text-sm text-muted-foreground mb-2">Anteprima</div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-muted/40 flex items-center justify-center">
                <PenTool className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-2xl font-semibold" style={{ fontFamily: selectedLogoFont }}>
                {data.logoText || data.businessName || "Il Tuo Locale"}
              </div>
            </div>
          </div>

          {/* Text settings */}
          <div className="rounded-md border border-border bg-white p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <label className="text-sm text-muted-foreground">Testo logo</label>
              <input
                type="text"
                className="sm:col-span-2 w-full px-3 py-2 border rounded-md"
                placeholder={data.businessName || "Il Tuo Locale"}
                value={data.logoText || ""}
                onChange={(e)=> onUpdate({ logoText: e.target.value })}
              />
            </div>
          </div>

          {/* Font picker (compact) */}
          <div className="rounded-md border border-border bg-white p-0">
            <OptionList
              enableSearch
              searchPlaceholder="Cerca font..."
              onSearchChange={setQuery}
              items={filtered.map((font: any) => ({
                id: font.id,
                title: font.name,
                description: font.category,
                meta: (
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
                )
              }))}
              selectedId={selectedLogoFont}
              onSelect={(id)=> {
                const font = filtered.find((f:any)=> f.id === id);
                if (font) handleFontSelect(font);
              }}
              ariaLabel="Seleziona font per il logo"
              showSelectedCheck
              searchAddon={(
                <Select value={category} onValueChange={(v)=> setCategory(v as any)}>
                  <SelectTrigger className="w-[160px] h-9 text-xs border rounded-md bg-white shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-primary/40">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {(["Tutti","Preferiti","Sans-serif","Serif","Monospace","Display"] as const).map(c => (
                      <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) await handleFile(file);
        }}
      />
    </div>
  );
};

export default BuilderStepLogo;
