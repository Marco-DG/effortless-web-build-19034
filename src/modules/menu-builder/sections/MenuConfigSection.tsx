import React from 'react';
import { MenuConfig } from '../../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/Card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface MenuConfigSectionProps {
  config: MenuConfig;
  onUpdate: (updates: Partial<MenuConfig>) => void;
}

export const MenuConfigSection: React.FC<MenuConfigSectionProps> = ({
  config,
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      
      {/* Informazioni Base */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informazioni Generali</CardTitle>
          <CardDescription>
            Configura le informazioni principali del menu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Titolo del Menu</Label>
            <Input
              id="title"
              value={config.title || 'La Nostra Carta'}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="La Nostra Carta"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Sottotitolo (opzionale)</Label>
            <Input
              id="subtitle"
              value={config.subtitle || ''}
              onChange={(e) => onUpdate({ subtitle: e.target.value })}
              placeholder="Sapori autentici della tradizione italiana"
            />
          </div>

          <div>
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              value={config.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Una breve descrizione del vostro menu..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Impostazioni Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Impostazioni Visualizzazione</CardTitle>
          <CardDescription>
            Controlla come vengono mostrati gli elementi del menu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mostra prezzi</Label>
              <p className="text-xs text-muted-foreground">
                Visualizza i prezzi accanto ai piatti
              </p>
            </div>
            <Switch
              checked={config.showPrices !== false}
              onCheckedChange={(checked) => onUpdate({ showPrices: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mostra descrizioni</Label>
              <p className="text-xs text-muted-foreground">
                Include le descrizioni dei piatti
              </p>
            </div>
            <Switch
              checked={config.showDescriptions !== false}
              onCheckedChange={(checked) => onUpdate({ showDescriptions: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Raggruppa per categoria</Label>
              <p className="text-xs text-muted-foreground">
                Organizza gli elementi per categoria
              </p>
            </div>
            <Switch
              checked={config.groupByCategory !== false}
              onCheckedChange={(checked) => onUpdate({ groupByCategory: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Evidenzia piatti speciali</Label>
              <p className="text-xs text-muted-foreground">
                Metti in risalto i piatti della casa
              </p>
            </div>
            <Switch
              checked={config.highlightFeatured !== false}
              onCheckedChange={(checked) => onUpdate({ highlightFeatured: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Note Aggiuntive */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Note e Avvertenze</CardTitle>
          <CardDescription>
            Informazioni aggiuntive per i clienti
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="allergens">Informazioni su allergeni</Label>
            <Textarea
              id="allergens"
              value={config.allergenInfo || ''}
              onChange={(e) => onUpdate({ allergenInfo: e.target.value })}
              placeholder="Es: Informate il personale di eventuali allergie o intolleranze alimentari..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="footer">Note a piè di pagina</Label>
            <Textarea
              id="footer"
              value={config.footerNote || ''}
              onChange={(e) => onUpdate({ footerNote: e.target.value })}
              placeholder="Es: I prezzi sono comprensivi di IVA e servizio..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};