import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../../../ui/Button';
import { Plus, Trash2, Edit3 } from 'lucide-react';

interface MenuBuilderStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

export const MenuBuilderStep: React.FC<MenuBuilderStepProps> = ({ data, onUpdate }) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const menuItems = data.menuItems || [];

  const handleAddItem = () => {
    const newItem = {
      id: `item_${Date.now()}`,
      name: 'Nuovo piatto',
      description: '',
      price: '€0,00',
      category: 'antipasti',
      available: true,
      featured: false
    };
    onUpdate({ menuItems: [...menuItems, newItem] });
    setEditingItem(newItem.id);
  };

  const handleUpdateItem = (id: string, updates: any) => {
    const updatedItems = menuItems.map((item: any) => 
      item.id === id ? { ...item, ...updates } : item
    );
    onUpdate({ menuItems: updatedItems });
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = menuItems.filter((item: any) => item.id !== id);
    onUpdate({ menuItems: updatedItems });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Menu</h3>
        <p className="text-sm text-muted-foreground">
          Gestisci gli elementi del tuo menu
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Elementi menu ({menuItems.length})
          </span>
          <Button onClick={handleAddItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi piatto
          </Button>
        </div>

        <div className="space-y-3">
          {menuItems.map((item: any) => (
            <div key={item.id} className="border rounded-lg p-4">
              {editingItem === item.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Nome piatto</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                        placeholder="Nome del piatto"
                      />
                    </div>
                    <div>
                      <Label>Prezzo</Label>
                      <Input
                        value={item.price}
                        onChange={(e) => handleUpdateItem(item.id, { price: e.target.value })}
                        placeholder="€15,00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Descrizione</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                      placeholder="Descrizione del piatto..."
                      rows={2}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setEditingItem(null)}>
                      Salva
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingItem(null)}>
                      Annulla
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <span className="text-primary font-semibold">{item.price}</span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingItem(item.id)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {menuItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nessun piatto nel menu</p>
              <Button onClick={handleAddItem} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi primo piatto
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};