import React, { useMemo, useState } from "react";
import { BuilderData, MenuCategory, MenuItem } from "@/types/builder";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MenuBuilderProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
}

const categoryLabels: Record<MenuCategory, string> = {
  antipasti: "Antipasti",
  primi: "Primi Piatti",
  secondi: "Secondi Piatti",
  dessert: "Dessert",
  cocktail: "Cocktail",
  birre: "Birre",
  vini: "Vini",
  bevande: "Bevande",
  altro: "Altro",
};

export const MenuBuilder: React.FC<MenuBuilderProps> = ({ data, onUpdate }) => {
  const cfg = data.menuConfig || { title: "Il Nostro Menu", subtitle: "", layout: "list" as const, columns: 2, showFilters: true, showImages: true, showBadges: true, showIngredients: false, showAllergens: false, highlightCategory: "none" };
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "tutti">("tutti");

  const categories = useMemo(() => Array.from(new Set(data.menuItems.map((i)=> i.category))) as MenuCategory[], [data.menuItems]);
  const filtered = selectedCategory === "tutti" ? data.menuItems : data.menuItems.filter(i=> i.category === selectedCategory);

  const updateItem = (id: string, patch: Partial<MenuItem>) => {
    const newItems = data.menuItems.map(it => it.id === id ? { ...it, ...patch } : it);
    onUpdate({ menuItems: newItems });
  };

  const addItem = () => {
    const id = `mi-${Date.now()}`;
    const newItem: MenuItem = { id, name: "Nuovo elemento", description: "", price: "€0,00", category: (categories[0] || "altro") as MenuCategory, ingredients: [], allergens: [], badges: [], imageUrl: "" };
    onUpdate({ menuItems: [...data.menuItems, newItem] });
  };

  const removeItem = (id: string) => {
    onUpdate({ menuItems: data.menuItems.filter(i=> i.id !== id) });
  };

  const moveItem = (id: string, dir: -1 | 1) => {
    const idx = data.menuItems.findIndex(i=> i.id === id);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= data.menuItems.length) return;
    const newItems = [...data.menuItems];
    const [it] = newItems.splice(idx, 1);
    newItems.splice(newIdx, 0, it);
    onUpdate({ menuItems: newItems });
  };

  const updateConfig = (patch: Partial<typeof cfg>) => {
    onUpdate({ menuConfig: { ...cfg, ...patch } as any });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Menù Builder</h3>
        <Button size="sm" onClick={addItem}>Aggiungi elemento</Button>
      </div>

      {/* Configurazioni Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-white/70">
        <div>
          <Label className="text-xs">Titolo</Label>
          <Input value={cfg.title} onChange={(e)=>updateConfig({ title: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs">Sottotitolo</Label>
          <Input value={cfg.subtitle} onChange={(e)=>updateConfig({ subtitle: e.target.value })} className="mt-1" />
        </div>
        <div>
          <Label className="text-xs">Layout</Label>
          <select className="mt-1 w-full border rounded-md px-3 py-2" value={cfg.layout} onChange={(e)=>updateConfig({ layout: e.target.value as any })}>
            <option value="list">Lista</option>
            <option value="grid">Cards</option>
          </select>
        </div>
        <div>
          <Label className="text-xs">Colonne (grid)</Label>
          <select className="mt-1 w-full border rounded-md px-3 py-2" value={cfg.columns} onChange={(e)=>updateConfig({ columns: Number(e.target.value) })}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input id="showImages" type="checkbox" checked={cfg.showImages} onChange={(e)=>updateConfig({ showImages: e.target.checked })} />
          <Label htmlFor="showImages" className="text-xs">Mostra immagini</Label>
        </div>
        <div className="flex items-center gap-2">
          <input id="showBadges" type="checkbox" checked={cfg.showBadges} onChange={(e)=>updateConfig({ showBadges: e.target.checked })} />
          <Label htmlFor="showBadges" className="text-xs">Mostra badge</Label>
        </div>
        <div className="flex items-center gap-2">
          <input id="showIngredients" type="checkbox" checked={cfg.showIngredients} onChange={(e)=>updateConfig({ showIngredients: e.target.checked })} />
          <Label htmlFor="showIngredients" className="text-xs">Mostra ingredienti</Label>
        </div>
        <div className="flex items-center gap-2">
          <input id="showAllergens" type="checkbox" checked={cfg.showAllergens} onChange={(e)=>updateConfig({ showAllergens: e.target.checked })} />
          <Label htmlFor="showAllergens" className="text-xs">Mostra allergeni</Label>
        </div>
      </div>

      {/* Filtri e categorie */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={selectedCategory === 'tutti' ? 'default' : 'secondary'} size="sm" onClick={()=>setSelectedCategory('tutti')}>Tutti</Button>
        {categories.map(cat => (
          <Button key={cat} variant={selectedCategory === cat ? 'default' : 'secondary'} size="sm" onClick={()=>setSelectedCategory(cat)}>{categoryLabels[cat]}</Button>
        ))}
      </div>

      {/* Lista elementi editabile */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="grid grid-cols-12 gap-2 items-start p-3 border rounded-md bg-white">
            <div className="col-span-12 md:col-span-3">
              <Label className="text-xs">Nome</Label>
              <Input value={item.name} onChange={(e)=>updateItem(item.id, { name: e.target.value })} className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-3">
              <Label className="text-xs">Prezzo</Label>
              <Input value={item.price} onChange={(e)=>updateItem(item.id, { price: e.target.value })} className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-3">
              <Label className="text-xs">Categoria</Label>
              <select className="mt-1 w-full border rounded-md px-3 py-2" value={item.category} onChange={(e)=>updateItem(item.id, { category: e.target.value as MenuCategory })}>
                {Object.keys(categoryLabels).map(cat => (
                  <option key={cat} value={cat}>{categoryLabels[cat as MenuCategory]}</option>
                ))}
              </select>
            </div>
            <div className="col-span-12">
              <Label className="text-xs">Descrizione</Label>
              <Input value={item.description || ""} onChange={(e)=>updateItem(item.id, { description: e.target.value })} className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label className="text-xs">Immagine (URL)</Label>
              <Input value={item.imageUrl || ""} onChange={(e)=>updateItem(item.id, { imageUrl: e.target.value })} className="mt-1" />
            </div>
            <div className="col-span-12 md:col-span-6 flex items-end gap-2">
              <Button variant="outline" size="sm" onClick={()=>moveItem(item.id, -1)}>Sposta su</Button>
              <Button variant="outline" size="sm" onClick={()=>moveItem(item.id, 1)}>Sposta giù</Button>
              <Button variant="destructive" size="sm" onClick={()=>removeItem(item.id)}>Rimuovi</Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MenuBuilder;
