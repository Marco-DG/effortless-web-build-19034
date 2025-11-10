import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUploader } from "@/components/ui/image-uploader";
import { BuilderData, MenuItem, MenuCategory, MenuConfig } from "@/types/builder";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface BuilderStep4Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep4 = ({ data, onUpdate, onNext, onBack }: BuilderStep4Props) => {
  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    price: "",
    category: "antipasti",
    imageUrl: "",
    badges: [],
    ingredients: [],
    allergens: [],
  });

  const cfg: MenuConfig = {
    title: data.menuConfig?.title ?? "Il Nostro Menu",
    subtitle: data.menuConfig?.subtitle ?? "",
    layout: data.menuConfig?.layout ?? "list",
    columns: data.menuConfig?.columns ?? 2,
    showFilters: data.menuConfig?.showFilters ?? true,
    showImages: data.menuConfig?.showImages ?? true,
    showBadges: data.menuConfig?.showBadges ?? true,
    showIngredients: data.menuConfig?.showIngredients ?? false,
    showAllergens: data.menuConfig?.showAllergens ?? false,
    highlightCategory: data.menuConfig?.highlightCategory ?? "none",
  };

  const categories: { value: MenuCategory; label: string }[] = [
    { value: "antipasti", label: "Antipasti" },
    { value: "primi", label: "Primi" },
    { value: "secondi", label: "Secondi" },
    { value: "dessert", label: "Dessert" },
    { value: "cocktail", label: "Cocktail" },
    { value: "birre", label: "Birre" },
    { value: "vini", label: "Vini" },
    { value: "bevande", label: "Bevande" },
    { value: "altro", label: "Altro" },
  ];

  const addMenuItem = () => {
    if (newItem.name.trim() && newItem.price.trim()) {
      const item: MenuItem = {
        ...newItem,
        id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      };
      onUpdate({ menuItems: [...(data.menuItems || []), item] });
      setNewItem({ name: "", description: "", price: "", category: "antipasti", imageUrl: "", badges: [], ingredients: [], allergens: [] });
    }
  };

  const removeMenuItem = (index: number) => {
    const updatedItems = (data.menuItems || []).filter((_, i) => i !== index);
    onUpdate({ menuItems: updatedItems });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Configurazione Menu */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Impostazioni Menu</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Titolo</Label>
            <Input value={cfg.title} onChange={(e)=> onUpdate({ menuConfig: { ...cfg, title: e.target.value } })} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Sottotitolo</Label>
            <Input value={cfg.subtitle} onChange={(e)=> onUpdate({ menuConfig: { ...cfg, subtitle: e.target.value } })} className="mt-1" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs">Layout</Label>
            <Select value={cfg.layout} onValueChange={(v)=> onUpdate({ menuConfig: { ...cfg, layout: v as MenuConfig["layout"] } })}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="list">Lista</SelectItem>
                <SelectItem value="cards">Schede</SelectItem>
                <SelectItem value="grid">Griglia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Colonne</Label>
            <Select value={String(cfg.columns)} onValueChange={(v)=> onUpdate({ menuConfig: { ...cfg, columns: Number(v) as 1|2|3 } })}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Categoria in evidenza</Label>
            <Select value={cfg.highlightCategory || "none"} onValueChange={(v)=> onUpdate({ menuConfig: { ...cfg, highlightCategory: v as any } })}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nessuna</SelectItem>
                {categories.map(c=> <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!cfg.showFilters} onChange={(e)=> onUpdate({ menuConfig: { ...cfg, showFilters: e.target.checked } })} /> Filtri categoria</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!cfg.showImages} onChange={(e)=> onUpdate({ menuConfig: { ...cfg, showImages: e.target.checked } })} /> Mostra immagini</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!cfg.showBadges} onChange={(e)=> onUpdate({ menuConfig: { ...cfg, showBadges: e.target.checked } })} /> Mostra badge</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!cfg.showIngredients} onChange={(e)=> onUpdate({ menuConfig: { ...cfg, showIngredients: e.target.checked } })} /> Ingredienti</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!cfg.showAllergens} onChange={(e)=> onUpdate({ menuConfig: { ...cfg, showAllergens: e.target.checked } })} /> Allergeni</label>
        </div>
      </div>

      {/* Elenco voci */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Voci del Menu</h3>
        {data.menuItems?.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.menuItems.map((item, idx) => (
              <div key={item.id} className="p-3 rounded-lg border flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {item.imageUrl && <img src={item.imageUrl} className="w-12 h-12 rounded object-cover" />}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                  {item.badges && item.badges.length>0 && (
                    <div className="flex flex-wrap gap-1 mt-1 text-xs">
                      {item.badges.map((b,i)=> <span key={i} className="px-2 py-0.5 bg-muted rounded">{b}</span>)}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.price}</span>
                  <button onClick={() => removeMenuItem(idx)} className="p-1 hover:bg-destructive/10 rounded" aria-label="Rimuovi">
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nuova voce */}
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Nome</Label>
              <Input value={newItem.name} onChange={(e)=> setNewItem({ ...newItem, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Prezzo</Label>
              <Input value={newItem.price} onChange={(e)=> setNewItem({ ...newItem, price: e.target.value })} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Categoria</Label>
              <Select value={newItem.category} onValueChange={(v)=> setNewItem({ ...newItem, category: v as MenuCategory })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(c=> <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Immagine (opzionale)</Label>
              <div className="mt-1">
                <ImageUploader
                  value={newItem.imageUrl || ""}
                  onChange={(url)=> setNewItem({ ...newItem, imageUrl: url })}
                  onRemove={()=> setNewItem({ ...newItem, imageUrl: "" })}
                  previewSize={48}
                />
              </div>
            </div>
          </div>
          <div>
            <Label className="text-xs">Descrizione (opzionale)</Label>
            <Textarea value={newItem.description} onChange={(e)=> setNewItem({ ...newItem, description: e.target.value })} className="mt-1 resize-none h-20" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Badge (virgola)</Label>
              <Input placeholder="novità, vegetariano" onChange={(e)=> setNewItem({ ...newItem, badges: e.target.value.split(',').map(x=>x.trim()).filter(Boolean) })} />
            </div>
            <div>
              <Label className="text-xs">Ingredienti (virgola)</Label>
              <Input placeholder="pomodoro, basilico" onChange={(e)=> setNewItem({ ...newItem, ingredients: e.target.value.split(',').map(x=>x.trim()).filter(Boolean) })} />
            </div>
            <div>
              <Label className="text-xs">Allergeni (virgola)</Label>
              <Input placeholder="glutine, latte" onChange={(e)=> setNewItem({ ...newItem, allergens: e.target.value.split(',').map(x=>x.trim()).filter(Boolean) })} />
            </div>
          </div>
          <Button type="button" onClick={addMenuItem} disabled={!newItem.name.trim() || !newItem.price.trim()} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" /> Aggiungi voce
          </Button>
        </div>
      </div>
    </div>
  );
};
