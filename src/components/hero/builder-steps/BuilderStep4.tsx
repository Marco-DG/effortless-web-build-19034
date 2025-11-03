import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BuilderData, MenuItem, MenuCategory } from "../InteractiveBuilder";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
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
    category: "antipasti"
  });

  const addMenuItem = () => {
    if (newItem.name.trim() && newItem.price.trim()) {
      const item: MenuItem = {
        ...newItem,
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      onUpdate({
        menuItems: [...data.menuItems, item]
      });
      setNewItem({ name: "", description: "", price: "", category: "antipasti" });
    }
  };

  const removeMenuItem = (index: number) => {
    const updatedItems = data.menuItems.filter((_, i) => i !== index);
    onUpdate({ menuItems: updatedItems });
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

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Aggiungi voci al menu (opzionale)</h3>
        
        {data.menuItems.length > 0 && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {data.menuItems.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{item.price}</span>
                  <button
                    onClick={() => removeMenuItem(idx)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="itemName" className="text-xs">Nome piatto/bevanda</Label>
              <Input
                id="itemName"
                placeholder="Es: Carbonara"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="itemPrice" className="text-xs">Prezzo</Label>
              <Input
                id="itemPrice"
                placeholder="Es: €12"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="itemCategory" className="text-xs">Categoria</Label>
            <Select
              value={newItem.category}
              onValueChange={(value) => setNewItem({ ...newItem, category: value as MenuCategory })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="itemDesc" className="text-xs">Descrizione (opzionale)</Label>
            <Textarea
              id="itemDesc"
              placeholder="Es: Guanciale, uova, pecorino..."
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="mt-1 resize-none h-20"
            />
          </div>
          <Button
            type="button"
            onClick={addMenuItem}
            disabled={!newItem.name.trim() || !newItem.price.trim()}
            variant="outline"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi voce
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="address" className="text-xs">Indirizzo</Label>
            <Input
              id="address"
              placeholder="Via Roma 1, Milano"
              value={data.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-xs">Telefono</Label>
            <Input
              id="phone"
              placeholder="+39 02 1234567"
              value={data.phone}
              onChange={(e) => onUpdate({ phone: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-xs">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="info@esempio.it"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Social Media (opzionale)</Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Facebook URL"
              value={data.socialLinks.facebook}
              onChange={(e) => onUpdate({ socialLinks: { ...data.socialLinks, facebook: e.target.value } })}
            />
            <Input
              placeholder="Instagram URL"
              value={data.socialLinks.instagram}
              onChange={(e) => onUpdate({ socialLinks: { ...data.socialLinks, instagram: e.target.value } })}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
