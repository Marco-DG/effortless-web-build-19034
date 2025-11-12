import React from 'react';
import { MenuConfig } from '../../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/Card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface MenuLayoutSectionProps {
  config: MenuConfig;
  onUpdate: (updates: Partial<MenuConfig>) => void;
}

export const MenuLayoutSection: React.FC<MenuLayoutSectionProps> = ({
  config,
  onUpdate
}) => {
  const layoutOptions = [
    { value: 'single-column', label: 'Colonna Singola', description: 'Layout verticale tradizionale' },
    { value: 'two-columns', label: 'Due Colonne', description: 'Layout a due colonne per desktop' },
    { value: 'grid', label: 'Griglia', description: 'Layout a griglia responsive' },
    { value: 'list', label: 'Lista', description: 'Lista semplice e pulita' }
  ];

  const categoryStyles = [
    { value: 'headers', label: 'Header Grandi', description: 'Titoli di categoria prominenti' },
    { value: 'tabs', label: 'Tab Orizzontali', description: 'Navigazione a tab per categorie' },
    { value: 'minimal', label: 'Minimale', description: 'Separatori sottili' },
    { value: 'cards', label: 'Card Separate', description: 'Ogni categoria in una card' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Layout Generale */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Layout Generale</CardTitle>
          <CardDescription>
            Controlla la struttura generale del menu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="layout">Tipo di layout</Label>
            <Select 
              value={config.layout || 'single-column'} 
              onValueChange={(value) => onUpdate({ layout: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {layoutOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maxWidth">Larghezza massima</Label>
            <Select 
              value={config.maxWidth || 'medium'} 
              onValueChange={(value) => onUpdate({ maxWidth: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="narrow">Stretta (600px)</SelectItem>
                <SelectItem value="medium">Media (800px)</SelectItem>
                <SelectItem value="wide">Ampia (1000px)</SelectItem>
                <SelectItem value="full">Piena larghezza</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Organizzazione Categorie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Organizzazione Categorie</CardTitle>
          <CardDescription>
            Come visualizzare le diverse categorie del menu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="categoryStyle">Stile categorie</Label>
            <Select 
              value={config.categoryStyle || 'headers'} 
              onValueChange={(value) => onUpdate({ categoryStyle: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    <div>
                      <div className="font-medium">{style.label}</div>
                      <div className="text-xs text-muted-foreground">{style.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mostra conteggio elementi</Label>
              <p className="text-xs text-muted-foreground">
                Visualizza il numero di elementi per categoria
              </p>
            </div>
            <Switch
              checked={config.showCategoryCount !== false}
              onCheckedChange={(checked) => onUpdate({ showCategoryCount: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Categorie collassabili</Label>
              <p className="text-xs text-muted-foreground">
                Permetti di nascondere/mostrare categorie
              </p>
            </div>
            <Switch
              checked={config.collapsibleCategories || false}
              onCheckedChange={(checked) => onUpdate({ collapsibleCategories: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Elementi del Menu */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visualizzazione Elementi</CardTitle>
          <CardDescription>
            Controlla come appaiono i singoli elementi del menu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pricePosition">Posizione prezzo</Label>
            <Select 
              value={config.pricePosition || 'right'} 
              onValueChange={(value) => onUpdate({ pricePosition: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="right">A destra</SelectItem>
                <SelectItem value="below">Sotto la descrizione</SelectItem>
                <SelectItem value="inline">In linea con il nome</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Separatori tra elementi</Label>
              <p className="text-xs text-muted-foreground">
                Linee di separazione tra i piatti
              </p>
            </div>
            <Switch
              checked={config.showSeparators || false}
              onCheckedChange={(checked) => onUpdate({ showSeparators: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Indicatori disponibilità</Label>
              <p className="text-xs text-muted-foreground">
                Mostra se un piatto non è disponibile
              </p>
            </div>
            <Switch
              checked={config.showAvailability !== false}
              onCheckedChange={(checked) => onUpdate({ showAvailability: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Badge piatti speciali</Label>
              <p className="text-xs text-muted-foreground">
                Evidenzia i piatti della casa
              </p>
            </div>
            <Switch
              checked={config.showSpecialBadges !== false}
              onCheckedChange={(checked) => onUpdate({ showSpecialBadges: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Responsive */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Responsive Design</CardTitle>
          <CardDescription>
            Adattamento per dispositivi mobili
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mobileLayout">Layout mobile</Label>
            <Select 
              value={config.mobileLayout || 'stack'} 
              onValueChange={(value) => onUpdate({ mobileLayout: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stack">Verticale (Stack)</SelectItem>
                <SelectItem value="compact">Compatto</SelectItem>
                <SelectItem value="tabs">Tab per categorie</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Testo più grande su mobile</Label>
              <p className="text-xs text-muted-foreground">
                Aumenta la dimensione del testo su telefoni
              </p>
            </div>
            <Switch
              checked={config.mobileEnlargeText || false}
              onCheckedChange={(checked) => onUpdate({ mobileEnlargeText: checked })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};