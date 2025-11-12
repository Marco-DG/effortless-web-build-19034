import React, { useState } from 'react';
import { Template, TemplateTheme } from './types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  RefreshCw, 
  Save,
  ArrowLeft,
  Eye,
  Download
} from 'lucide-react';

interface TemplateCustomizerProps {
  template: Template;
  onUpdateTemplate: (updates: Partial<Template>) => void;
  onBack: () => void;
  onSave: () => void;
}

const fontOptions = [
  { name: 'Inter', category: 'Sans Serif', preview: 'Moderno e pulito' },
  { name: 'Playfair Display', category: 'Serif', preview: 'Elegante e raffinato' },
  { name: 'Merriweather', category: 'Serif', preview: 'Classico e leggibile' },
  { name: 'Poppins', category: 'Sans Serif', preview: 'Amichevole e moderno' },
  { name: 'Cormorant Garamond', category: 'Serif', preview: 'Lussuoso e sofisticato' },
  { name: 'Nunito Sans', category: 'Sans Serif', preview: 'Caldo e accogliente' },
  { name: 'Open Sans', category: 'Sans Serif', preview: 'Versatile e neutrale' },
  { name: 'Source Sans Pro', category: 'Sans Serif', preview: 'Professionale e pulito' },
  { name: 'Dancing Script', category: 'Script', preview: 'Artistico e personale' },
  { name: 'Great Vibes', category: 'Script', preview: 'Elegante e fluido' },
  { name: 'Caveat', category: 'Script', preview: 'Informale e amichevole' },
  { name: 'Fredoka One', category: 'Display', preview: 'Giocoso e energico' }
];

const colorPresets = [
  { name: 'Elegante Oro', colors: { primary: '#B8860B', secondary: '#2C2C2C', accent: '#FFD700' } },
  { name: 'Moderno Blu', colors: { primary: '#2563EB', secondary: '#64748B', accent: '#06B6D4' } },
  { name: 'Rustico Terra', colors: { primary: '#8B4513', secondary: '#D2691E', accent: '#CD853F' } },
  { name: 'Wine Bar', colors: { primary: '#7C2D12', secondary: '#A16207', accent: '#DC2626' } },
  { name: 'Nordico Verde', colors: { primary: '#4F7942', secondary: '#8B9578', accent: '#D4AF37' } },
  { name: 'Vibrante Arancio', colors: { primary: '#FF6B35', secondary: '#F7931E', accent: '#FFD23F' } },
  { name: 'Viola Luxury', colors: { primary: '#6B46C1', secondary: '#9333EA', accent: '#F59E0B' } },
  { name: 'Rosa Moderno', colors: { primary: '#E11D48', secondary: '#F43F5E', accent: '#EC4899' } }
];

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  template,
  onUpdateTemplate,
  onBack,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('colors');

  const handleUpdateTheme = (themeUpdates: Partial<TemplateTheme>) => {
    onUpdateTemplate({
      theme: {
        ...template.theme,
        ...themeUpdates
      }
    });
  };

  const handleColorChange = (colorKey: keyof TemplateTheme['colors'], value: string) => {
    handleUpdateTheme({
      colors: {
        ...template.theme.colors,
        [colorKey]: value
      }
    });
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    handleUpdateTheme({
      colors: {
        ...template.theme.colors,
        ...preset.colors
      }
    });
  };

  const handleFontChange = (fontType: 'heading' | 'body' | 'accent', fontFamily: string) => {
    const fontConfig = fontOptions.find(f => f.name === fontFamily);
    handleUpdateTheme({
      fonts: {
        ...template.theme.fonts,
        [fontType]: {
          ...template.theme.fonts[fontType],
          family: fontFamily,
          fallback: fontConfig?.category === 'Serif' 
            ? ['Georgia', 'serif'] 
            : fontConfig?.category === 'Script' 
            ? ['cursive'] 
            : ['-apple-system', 'BlinkMacSystemFont', 'sans-serif']
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Personalizza {template.name}
            </h3>
            <p className="text-muted-foreground">
              Adatta il template al tuo brand e stile
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Anteprima
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={onSave}>
            <Save className="w-4 h-4 mr-2" />
            Salva
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Colori</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <span className="hidden sm:inline">Tipografia</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Layout</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Avanzate</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <ColorsCustomizer
            theme={template.theme}
            onColorChange={handleColorChange}
            onApplyPreset={applyColorPreset}
            colorPresets={colorPresets}
          />
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <TypographyCustomizer
            theme={template.theme}
            onFontChange={handleFontChange}
            fontOptions={fontOptions}
          />
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <LayoutCustomizer
            template={template}
            onUpdate={onUpdateTemplate}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <AdvancedCustomizer
            theme={template.theme}
            onUpdateTheme={handleUpdateTheme}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Colors Customizer Component
const ColorsCustomizer: React.FC<{
  theme: TemplateTheme;
  onColorChange: (key: keyof TemplateTheme['colors'], value: string) => void;
  onApplyPreset: (preset: any) => void;
  colorPresets: any[];
}> = ({ theme, onColorChange, onApplyPreset, colorPresets }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Palette Preconfigurate</CardTitle>
        <CardDescription>Scegli una combinazione di colori già bilanciata</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colorPresets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onApplyPreset(preset)}
              className="h-auto p-3 flex flex-col items-center gap-2"
            >
              <div className="flex gap-1">
                {Object.values(preset.colors).map((color: any, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium">{preset.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Colori Personalizzati</CardTitle>
        <CardDescription>Personalizza ogni singolo colore del tuo template</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(theme.colors).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="text-sm font-medium capitalize">
                {key === 'textSecondary' ? 'Testo Secondario' : 
                 key === 'primary' ? 'Colore Primario' :
                 key === 'secondary' ? 'Colore Secondario' :
                 key === 'accent' ? 'Colore Accento' :
                 key === 'background' ? 'Sfondo' :
                 key === 'surface' ? 'Superficie' :
                 key === 'text' ? 'Testo' :
                 key === 'border' ? 'Bordi' :
                 key}
              </Label>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-border cursor-pointer"
                  style={{ backgroundColor: value }}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'color';
                    input.value = value;
                    input.onchange = (e) => onColorChange(key as any, (e.target as HTMLInputElement).value);
                    input.click();
                  }}
                />
                <Input
                  value={value}
                  onChange={(e) => onColorChange(key as any, e.target.value)}
                  className="flex-1 font-mono text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Typography Customizer Component
const TypographyCustomizer: React.FC<{
  theme: TemplateTheme;
  onFontChange: (type: 'heading' | 'body' | 'accent', font: string) => void;
  fontOptions: any[];
}> = ({ theme, onFontChange, fontOptions }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Font del Template</CardTitle>
        <CardDescription>Scegli i font per titoli, testo e elementi decorativi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {[
          { key: 'heading' as const, label: 'Font Titoli', description: 'Usato per titoli e intestazioni' },
          { key: 'body' as const, label: 'Font Corpo', description: 'Usato per il testo principale' },
          { key: 'accent' as const, label: 'Font Decorativo', description: 'Usato per elementi speciali' }
        ].map(({ key, label, description }) => (
          <div key={key} className="space-y-3">
            <div>
              <Label className="font-medium">{label}</Label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fontOptions.map(font => (
                <Button
                  key={`${key}-${font.name}`}
                  variant={theme.fonts[key].family === font.name ? 'default' : 'outline'}
                  onClick={() => onFontChange(key, font.name)}
                  className="h-auto p-3 justify-start text-left"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="font-medium"
                        style={{ fontFamily: font.name }}
                      >
                        {font.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {font.category}
                      </Badge>
                    </div>
                    <p 
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: font.name }}
                    >
                      {font.preview}
                    </p>
                  </div>
                </Button>
              ))}
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 
                className="text-lg mb-2"
                style={{ fontFamily: theme.fonts[key].family }}
              >
                Anteprima {label}
              </h4>
              <p 
                className="text-sm text-muted-foreground"
                style={{ fontFamily: theme.fonts[key].family }}
              >
                Questo è come apparirà il testo con il font selezionato. 
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

// Layout Customizer Component
const LayoutCustomizer: React.FC<{
  template: Template;
  onUpdate: (updates: Partial<Template>) => void;
}> = ({ template, onUpdate }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Configurazione Layout</CardTitle>
        <CardDescription>Personalizza la struttura e il comportamento del template</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label>Stile Generale</Label>
            <Select 
              value={template.layout.style} 
              onValueChange={(value) => onUpdate({
                layout: { ...template.layout, style: value as any }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Moderno</SelectItem>
                <SelectItem value="classic">Classico</SelectItem>
                <SelectItem value="minimal">Minimale</SelectItem>
                <SelectItem value="bold">Audace</SelectItem>
                <SelectItem value="elegant">Elegante</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Navigazione</Label>
            <Select 
              value={template.layout.navigation} 
              onValueChange={(value) => onUpdate({
                layout: { ...template.layout, navigation: value as any }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Orizzontale</SelectItem>
                <SelectItem value="sidebar">Sidebar</SelectItem>
                <SelectItem value="overlay">Overlay</SelectItem>
                <SelectItem value="minimal">Minimale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Dimensione Hero</Label>
            <Select 
              value={template.layout.hero} 
              onValueChange={(value) => onUpdate({
                layout: { ...template.layout, hero: value as any }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fullscreen">Schermo intero</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="compact">Compatta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Layout Sezioni</Label>
            <Select 
              value={template.layout.sections} 
              onValueChange={(value) => onUpdate({
                layout: { ...template.layout, sections: value as any }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contained">Contenute</SelectItem>
                <SelectItem value="fullwidth">Larghezza piena</SelectItem>
                <SelectItem value="mixed">Miste</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Advanced Customizer Component
const AdvancedCustomizer: React.FC<{
  theme: TemplateTheme;
  onUpdateTheme: (updates: Partial<TemplateTheme>) => void;
}> = ({ theme, onUpdateTheme }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Spaziature e Dimensioni</CardTitle>
        <CardDescription>Controlla gli spazi e le dimensioni del layout</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Larghezza Container: {theme.spacing.container}</Label>
          <div className="px-3">
            <Slider
              value={[parseInt(theme.spacing.container)]}
              onValueChange={([value]) => onUpdateTheme({
                spacing: { ...theme.spacing, container: `${value}px` }
              })}
              max={1600}
              min={800}
              step={50}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Spaziatura Sezioni: {theme.spacing.section}</Label>
          <div className="px-3">
            <Slider
              value={[parseInt(theme.spacing.section)]}
              onValueChange={([value]) => onUpdateTheme({
                spacing: { ...theme.spacing, section: `${value}px` }
              })}
              max={200}
              min={40}
              step={10}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Bordi e Ombre</CardTitle>
        <CardDescription>Personalizza l'aspetto di carte e elementi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Raggio Bordi Carte: {theme.borderRadius.card}</Label>
          <div className="px-3">
            <Slider
              value={[parseInt(theme.borderRadius.card)]}
              onValueChange={([value]) => onUpdateTheme({
                borderRadius: { ...theme.borderRadius, card: `${value}px` }
              })}
              max={32}
              min={0}
              step={2}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(theme.borderRadius).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">
                {key === 'small' ? 'Piccolo' : 
                 key === 'medium' ? 'Medio' :
                 key === 'large' ? 'Grande' :
                 key === 'card' ? 'Carte' : key}
              </Label>
              <Input
                value={value}
                onChange={(e) => onUpdateTheme({
                  borderRadius: { ...theme.borderRadius, [key]: e.target.value }
                })}
                className="font-mono text-sm"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Animazioni</CardTitle>
        <CardDescription>Configura velocità e stile delle transizioni</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label>Durata Animazioni: {theme.animations.duration}</Label>
          <div className="px-3">
            <Slider
              value={[parseInt(theme.animations.duration)]}
              onValueChange={([value]) => onUpdateTheme({
                animations: { ...theme.animations, duration: `${value}ms` }
              })}
              max={1000}
              min={100}
              step={50}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Tipo di Easing</Label>
          <Select 
            value={theme.animations.easing} 
            onValueChange={(value) => onUpdateTheme({
              animations: { ...theme.animations, easing: value }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ease">Ease</SelectItem>
              <SelectItem value="ease-in">Ease In</SelectItem>
              <SelectItem value="ease-out">Ease Out</SelectItem>
              <SelectItem value="ease-in-out">Ease In Out</SelectItem>
              <SelectItem value="cubic-bezier(0.4, 0, 0.2, 1)">Custom Cubic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  </div>
);