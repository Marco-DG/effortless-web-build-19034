import React, { useState } from 'react';
import { MenuConfig, MenuItem } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, List, Plus, Trash2, Edit3 } from 'lucide-react';

interface MenuControlsProps {
  config: MenuConfig & { items: MenuItem[] };
  onUpdate: (updates: Partial<MenuConfig & { items: MenuItem[] }>) => void;
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

export const MenuControls: React.FC<MenuControlsProps> = ({
  config,
  onUpdate
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

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: `item_${Date.now()}`,
      name: 'Nuovo piatto',
      description: '',
      price: '€0,00',
      category: 'antipasti',
      available: true,
      featured: false
    };
    onUpdate({ items: [...config.items, newItem] });
    setEditingItem(newItem.id);
  };

  const itemCategories = Array.from(new Set(config.items.map(item => item.category)));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Menu Builder</h3>
        <p className="text-sm text-muted-foreground">
          Configura e gestisci gli elementi del tuo menu
        </p>
      </div>

      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurazione
          </TabsTrigger>
          <TabsTrigger value="items" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Elementi ({config.items.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Impostazioni Generali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Titolo del Menu</Label>
                <Input
                  id="title"
                  value={config.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="Il Nostro Menu"
                />
              </div>
              
              <div>
                <Label htmlFor="subtitle">Sottotitolo (opzionale)</Label>
                <Input
                  id="subtitle"
                  value={config.subtitle || ''}
                  onChange={(e) => onUpdate({ subtitle: e.target.value })}
                  placeholder="Una selezione dei nostri piatti migliori"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Layout e Visualizzazione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Layout</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button
                    variant={config.layout === 'list' ? 'default' : 'outline'}
                    onClick={() => onUpdate({ layout: 'list' })}
                    className="justify-start"
                  >
                    Lista
                  </Button>
                  <Button
                    variant={config.layout === 'grid' ? 'default' : 'outline'}
                    onClick={() => onUpdate({ layout: 'grid' })}
                    className="justify-start"
                  >
                    Griglia
                  </Button>
                </div>
              </div>

              {config.layout === 'grid' && (
                <div>
                  <Label>Colonne</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[1, 2, 3].map(num => (
                      <Button
                        key={num}
                        variant={config.columns === num ? 'default' : 'outline'}
                        onClick={() => onUpdate({ columns: num as 1 | 2 | 3 })}
                        size="sm"
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showImages">Mostra immagini</Label>
                  <Switch
                    id="showImages"
                    checked={config.showImages}
                    onCheckedChange={(checked) => onUpdate({ showImages: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showPrices">Mostra prezzi</Label>
                  <Switch
                    id="showPrices"
                    checked={config.showPrices}
                    onCheckedChange={(checked) => onUpdate({ showPrices: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showDescriptions">Mostra descrizioni</Label>
                  <Switch
                    id="showDescriptions"
                    checked={config.showDescriptions}
                    onCheckedChange={(checked) => onUpdate({ showDescriptions: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showBadges">Mostra badge</Label>
                  <Switch
                    id="showBadges"
                    checked={config.showBadges}
                    onCheckedChange={(checked) => onUpdate({ showBadges: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="showCategories">Mostra categorie</Label>
                  <Switch
                    id="showCategories"
                    checked={config.showCategories}
                    onCheckedChange={(checked) => onUpdate({ showCategories: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="categoriesAsFilter">Categorie come filtri</Label>
                  <Switch
                    id="categoriesAsFilter"
                    checked={config.categoriesAsFilter}
                    onCheckedChange={(checked) => onUpdate({ categoriesAsFilter: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutti">Tutte le categorie</SelectItem>
                  {itemCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {categories.find(c => c.value === cat)?.label || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleAddItem} leftIcon={<Plus className="w-4 h-4" />}>
              Aggiungi elemento
            </Button>
          </div>

          <div className="space-y-3">
            {filteredItems.map(item => (
              <Card key={item.id} className="relative">
                <CardContent className="p-4">
                  {editingItem === item.id ? (
                    <EditItemForm
                      item={item}
                      onUpdate={(updates) => handleUpdateItem(item.id, updates)}
                      onCancel={() => setEditingItem(null)}
                      onSave={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {item.featured && (
                            <Badge className="bg-amber-100 text-amber-800 text-xs">
                              In evidenza
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {categories.find(c => c.value === item.category)?.label || item.category}
                          </Badge>
                        </div>
                        
                        {item.description && (
                          <p className="text-sm text-muted-foreground mb-1">
                            {item.description}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-primary">{item.price}</span>
                          {item.badges && item.badges.length > 0 && (
                            <div className="flex gap-1">
                              {item.badges.map(badge => (
                                <Badge key={badge} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
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
                </CardContent>
              </Card>
            ))}
            
            {filteredItems.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    {selectedCategory === 'tutti' 
                      ? 'Nessun elemento nel menu'
                      : `Nessun elemento nella categoria "${categories.find(c => c.value === selectedCategory)?.label}"`
                    }
                  </p>
                  <Button 
                    className="mt-4" 
                    onClick={handleAddItem}
                    leftIcon={<Plus className="w-4 h-4" />}
                  >
                    Aggiungi primo elemento
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface EditItemFormProps {
  item: MenuItem;
  onUpdate: (updates: Partial<MenuItem>) => void;
  onCancel: () => void;
  onSave: () => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({
  item,
  onUpdate,
  onCancel,
  onSave
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`name-${item.id}`}>Nome</Label>
          <Input
            id={`name-${item.id}`}
            value={item.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor={`price-${item.id}`}>Prezzo</Label>
          <Input
            id={`price-${item.id}`}
            value={item.price}
            onChange={(e) => onUpdate({ price: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor={`category-${item.id}`}>Categoria</Label>
        <Select 
          value={item.category} 
          onValueChange={(value) => onUpdate({ category: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor={`description-${item.id}`}>Descrizione</Label>
        <Textarea
          id={`description-${item.id}`}
          value={item.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={2}
        />
      </div>
      
      <div>
        <Label htmlFor={`image-${item.id}`}>URL Immagine</Label>
        <Input
          id={`image-${item.id}`}
          value={item.imageUrl || ''}
          onChange={(e) => onUpdate({ imageUrl: e.target.value })}
          placeholder="https://esempio.com/immagine.jpg"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id={`featured-${item.id}`}
            checked={item.featured}
            onCheckedChange={(checked) => onUpdate({ featured: checked })}
          />
          <Label htmlFor={`featured-${item.id}`}>In evidenza</Label>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Annulla
          </Button>
          <Button size="sm" onClick={onSave}>
            Salva
          </Button>
        </div>
      </div>
    </div>
  );
};