import React, { useState } from 'react';
import { MenuConfig, MenuItem } from '../../../types';
import { PremiumCard, PremiumTextInput, PremiumSelect, PremiumListItem, PremiumActionButton } from '../../../components/forms';

interface MenuItemsSectionProps {
  config: MenuConfig & { items: MenuItem[] };
  onUpdate: (updates: Partial<MenuConfig & { items: MenuItem[] }>) => void;
  onAddItem: () => void;
}

const categories = [
  { value: 'antipasti', label: 'Antipasti' },
  { value: 'primi', label: 'Primi Piatti' },
  { value: 'secondi', label: 'Secondi Piatti' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'bevande', label: 'Bevande' },
  { value: 'cocktail', label: 'Cocktail' },
  { value: 'vini', label: 'Vini' },
  { value: 'altro', label: 'Altro' }
];

export const MenuItemsSection: React.FC<MenuItemsSectionProps> = ({
  config,
  onUpdate,
  onAddItem
}) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('tutti');

  const filteredItems = selectedCategory === 'tutti' 
    ? config.items 
    : config.items.filter(item => item.category === selectedCategory);

  const handleUpdateItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedItems = config.items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    onUpdate({ items: updatedItems });
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = config.items.filter(item => item.id !== id);
    onUpdate({ items: updatedItems });
  };

  const handleSaveItem = () => {
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header con controlli */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">Elementi del Menu</h4>
          <p className="text-sm text-muted-foreground">
            {config.items.length} elementi totali
          </p>
        </div>
        <Button onClick={onAddItem} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi Elemento
        </Button>
      </div>

      {/* Filtro per categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filtra per categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tutti">Tutte le categorie</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Lista elementi */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className={!item.available ? 'opacity-60' : ''}>
            <CardContent className="p-4">
              {editingItem === item.id ? (
                /* Modulo di modifica */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`name-${item.id}`}>Nome piatto</Label>
                      <Input
                        id={`name-${item.id}`}
                        value={item.name}
                        onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                        placeholder="Nome del piatto"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`price-${item.id}`}>Prezzo</Label>
                      <Input
                        id={`price-${item.id}`}
                        value={item.price}
                        onChange={(e) => handleUpdateItem(item.id, { price: e.target.value })}
                        placeholder="€0,00"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`description-${item.id}`}>Descrizione</Label>
                    <Textarea
                      id={`description-${item.id}`}
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                      placeholder="Descrizione del piatto..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`category-${item.id}`}>Categoria</Label>
                    <Select 
                      value={item.category} 
                      onValueChange={(value) => handleUpdateItem(item.id, { category: value })}
                    >
                      <SelectTrigger>
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`available-${item.id}`}
                          checked={item.available}
                          onCheckedChange={(checked) => handleUpdateItem(item.id, { available: checked })}
                        />
                        <Label htmlFor={`available-${item.id}`}>Disponibile</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`featured-${item.id}`}
                          checked={item.featured}
                          onCheckedChange={(checked) => handleUpdateItem(item.id, { featured: checked })}
                        />
                        <Label htmlFor={`featured-${item.id}`}>In evidenza</Label>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleSaveItem}>
                        Salva
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Vista normale */
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.name}</h4>
                      {item.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.value === item.category)?.label}
                      </Badge>
                      {!item.available && (
                        <Badge variant="secondary" className="text-xs">
                          Non disponibile
                        </Badge>
                      )}
                    </div>
                    
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                    )}
                    
                    <div className="text-sm font-medium text-primary">
                      {item.price}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingItem(item.id)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {selectedCategory === 'tutti' 
                    ? 'Nessun elemento nel menu. Clicca "Aggiungi Elemento" per iniziare.'
                    : `Nessun elemento nella categoria "${categories.find(c => c.value === selectedCategory)?.label}".`
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};