import React from 'react';
import { LogoConfig } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Type, Image, Palette, Layout } from 'lucide-react';

interface LogoControlsProps {
  config: LogoConfig;
  businessName: string;
  onUpdate: (updates: Partial<LogoConfig>) => void;
}

const fontOptions = [
  { name: 'Playfair Display', category: 'Serif' },
  { name: 'Merriweather', category: 'Serif' },
  { name: 'Cormorant Garamond', category: 'Serif' },
  { name: 'Inter', category: 'Sans Serif' },
  { name: 'Poppins', category: 'Sans Serif' },
  { name: 'Montserrat', category: 'Sans Serif' },
  { name: 'Dancing Script', category: 'Script' },
  { name: 'Great Vibes', category: 'Script' }
];

const colorPresets = [
  '#8B4513', '#D2691E', '#2C3E50', '#34495E',
  '#E74C3C', '#C0392B', '#27AE60', '#229954',
  '#3498DB', '#2980B9', '#9B59B6', '#8E44AD',
  '#F39C12', '#E67E22', '#1ABC9C', '#16A085'
];

export const LogoControls: React.FC<LogoControlsProps> = ({
  config,
  businessName,
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Configurazione Logo</h3>
        <p className="text-sm text-muted-foreground">
          Personalizza il logo per il tuo business
        </p>
      </div>

      <Tabs defaultValue="type" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="type" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Tipo</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Testo</span>
          </TabsTrigger>
          <TabsTrigger value="style" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Stile</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Layout</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="type" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tipo di Logo</CardTitle>
              <CardDescription>
                Scegli se usare testo, immagine o una combinazione
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={config.mode === 'text' ? 'default' : 'outline'}
                  className="h-20 flex flex-col"
                  onClick={() => onUpdate({ mode: 'text' })}
                >
                  <Type className="w-6 h-6 mb-2" />
                  <span className="text-xs">Solo Testo</span>
                </Button>
                
                <Button
                  variant={config.mode === 'image' ? 'default' : 'outline'}
                  className="h-20 flex flex-col"
                  onClick={() => onUpdate({ mode: 'image' })}
                >
                  <Image className="w-6 h-6 mb-2" />
                  <span className="text-xs">Immagine</span>
                </Button>
                
                <Button
                  variant={config.mode === 'hybrid' ? 'default' : 'outline'}
                  className="h-20 flex flex-col"
                  onClick={() => onUpdate({ mode: 'hybrid' })}
                >
                  <div className="flex items-center gap-1 mb-2">
                    <Image className="w-4 h-4" />
                    <Type className="w-4 h-4" />
                  </div>
                  <span className="text-xs">Combinato</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {(config.mode === 'image' || config.mode === 'hybrid') && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Carica Immagine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label htmlFor="imageUrl">URL Immagine</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://esempio.com/logo.png"
                    value={config.imageUrl || ''}
                    onChange={(e) => onUpdate({ imageUrl: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Testo del Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logoText">Testo Principale</Label>
                <Input
                  id="logoText"
                  placeholder={businessName}
                  value={config.text || ''}
                  onChange={(e) => onUpdate({ text: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="tagline">Tagline (opzionale)</Label>
                <Input
                  id="tagline"
                  placeholder="Il tuo slogan"
                  value={config.tagline || ''}
                  onChange={(e) => onUpdate({ tagline: e.target.value })}
                />
              </div>

              <div>
                <Label>Font</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {fontOptions.map((font) => (
                    <Button
                      key={font.name}
                      variant={config.font === font.name ? 'default' : 'outline'}
                      size="sm"
                      className="justify-start"
                      onClick={() => onUpdate({ font: font.name })}
                    >
                      <span style={{ fontFamily: font.name }}>
                        {font.name}
                      </span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {font.category}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Stile e Colori</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Dimensione: {config.size || 48}px</Label>
                <Slider
                  value={[config.size || 48]}
                  onValueChange={([value]) => onUpdate({ size: value })}
                  max={120}
                  min={24}
                  step={2}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Colore</Label>
                <div className="grid grid-cols-8 gap-2 mt-2">
                  {colorPresets.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 p-0 border-2"
                      style={{ 
                        backgroundColor: color,
                        borderColor: config.color === color ? '#000' : 'transparent'
                      }}
                      onClick={() => onUpdate({ color })}
                    />
                  ))}
                </div>
                <Input
                  placeholder="#8B4513"
                  value={config.color || ''}
                  onChange={(e) => onUpdate({ color: e.target.value })}
                  className="mt-3"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Layout e Disposizione</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={config.layout === 'horizontal' ? 'default' : 'outline'}
                  className="h-16 flex flex-col"
                  onClick={() => onUpdate({ layout: 'horizontal' })}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-3 h-2 bg-current rounded-sm" />
                    <div className="w-2 h-1 bg-current/60 rounded-sm" />
                  </div>
                  <span className="text-xs">Orizzontale</span>
                </Button>
                
                <Button
                  variant={config.layout === 'vertical' ? 'default' : 'outline'}
                  className="h-16 flex flex-col"
                  onClick={() => onUpdate({ layout: 'vertical' })}
                >
                  <div className="flex flex-col items-center gap-1 mb-1">
                    <div className="w-3 h-2 bg-current rounded-sm" />
                    <div className="w-2 h-1 bg-current/60 rounded-sm" />
                  </div>
                  <span className="text-xs">Verticale</span>
                </Button>
                
                <Button
                  variant={config.layout === 'stacked' ? 'default' : 'outline'}
                  className="h-16 flex flex-col"
                  onClick={() => onUpdate({ layout: 'stacked' })}
                >
                  <div className="flex flex-col items-center mb-1">
                    <div className="w-3 h-1 bg-current rounded-sm" />
                    <div className="w-3 h-1 bg-current/60 rounded-sm" />
                  </div>
                  <span className="text-xs">Sovrapposto</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};