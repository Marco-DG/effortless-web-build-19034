import React, { useState } from 'react';
import { TemplateComponent, ComponentConfig, ComponentVariant } from './types';
import { COMPONENT_REGISTRY } from './component-registry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Eye, Save, RotateCcw, Settings, Palette, Type, Layout, Zap } from 'lucide-react';

interface ComponentEditorProps {
  componentType: string;
  config: ComponentConfig;
  onUpdateConfig: (config: ComponentConfig) => void;
  onBack: () => void;
}

export const ComponentEditor: React.FC<ComponentEditorProps> = ({
  componentType,
  config,
  onUpdateConfig,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('variant');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  
  const component = COMPONENT_REGISTRY[componentType as keyof typeof COMPONENT_REGISTRY];
  
  if (!component) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Componente non trovato</p>
      </div>
    );
  }

  const handleVariantChange = (variantId: string) => {
    const variant = component.variants.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariant(variantId);
      // Applica la configurazione della variante
      onUpdateConfig({
        ...config,
        style: { ...config.style, layout: variant.layout },
        ...variant.config
      });
    }
  };

  const handleStyleUpdate = (updates: Partial<ComponentConfig['style']>) => {
    onUpdateConfig({
      ...config,
      style: { ...config.style, ...updates }
    });
  };

  const handleContentUpdate = (updates: Partial<ComponentConfig['content']>) => {
    onUpdateConfig({
      ...config,
      content: { ...config.content, ...updates }
    });
  };

  const handleBehaviorUpdate = (updates: Partial<ComponentConfig['behavior']>) => {
    onUpdateConfig({
      ...config,
      behavior: { ...config.behavior, ...updates }
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h3 className="font-semibold">{component.name}</h3>
            <p className="text-sm text-muted-foreground">{component.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Anteprima
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salva
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
            <TabsTrigger value="variant" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Varianti</span>
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Stile</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">Contenuto</span>
            </TabsTrigger>
            <TabsTrigger value="behavior" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Comportamento</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 p-4">
            <TabsContent value="variant" className="h-full m-0">
              <VariantEditor
                variants={component.variants}
                selectedVariant={selectedVariant}
                onVariantChange={handleVariantChange}
              />
            </TabsContent>

            <TabsContent value="style" className="h-full m-0">
              <StyleEditor
                config={config.style}
                onUpdate={handleStyleUpdate}
              />
            </TabsContent>

            <TabsContent value="content" className="h-full m-0">
              <ContentEditor
                componentType={component.type}
                config={config.content}
                onUpdate={handleContentUpdate}
              />
            </TabsContent>

            <TabsContent value="behavior" className="h-full m-0">
              <BehaviorEditor
                config={config.behavior}
                onUpdate={handleBehaviorUpdate}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

// Variant Editor
interface VariantEditorProps {
  variants: ComponentVariant[];
  selectedVariant: string;
  onVariantChange: (variantId: string) => void;
}

const VariantEditor: React.FC<VariantEditorProps> = ({
  variants,
  selectedVariant,
  onVariantChange
}) => (
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Scegli Variante</CardTitle>
        <CardDescription>
          Ogni variante ha un layout e stile diverso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {variants.map(variant => (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant.id)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedVariant === variant.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{variant.name}</h4>
                <Badge variant={variant.style as any} className="text-xs">
                  {variant.style}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{variant.description}</p>
              <div className="mt-3 h-12 bg-muted rounded border-dashed border-2 border-muted-foreground/20 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Anteprima</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Style Editor  
interface StyleEditorProps {
  config: ComponentConfig['style'];
  onUpdate: (updates: Partial<ComponentConfig['style']>) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ config, onUpdate }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Layout e Posizionamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Allineamento</Label>
            <Select value={config.alignment} onValueChange={(value) => onUpdate({ alignment: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Sinistra</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Destra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Spaziatura</Label>
            <Select value={config.spacing} onValueChange={(value) => onUpdate({ spacing: value as any })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compatta</SelectItem>
                <SelectItem value="normal">Normale</SelectItem>
                <SelectItem value="spacious">Spaziosa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Raggio Bordi: {config.borderRadius}px</Label>
          <Slider
            value={[config.borderRadius]}
            onValueChange={([value]) => onUpdate({ borderRadius: value })}
            max={32}
            min={0}
            step={2}
            className="mt-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="shadow">Ombra</Label>
          <Switch
            id="shadow"
            checked={config.shadow}
            onCheckedChange={(shadow) => onUpdate({ shadow })}
          />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Colori e Aspetto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bg-color">Colore Sfondo</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="bg-color"
                type="color"
                value={config.background}
                onChange={(e) => onUpdate({ background: e.target.value })}
                className="w-16 h-10 p-1 border-0"
              />
              <Input
                value={config.background}
                onChange={(e) => onUpdate({ background: e.target.value })}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="text-color">Colore Testo</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="text-color"
                type="color"
                value={config.textColor}
                onChange={(e) => onUpdate({ textColor: e.target.value })}
                className="w-16 h-10 p-1 border-0"
              />
              <Input
                value={config.textColor}
                onChange={(e) => onUpdate({ textColor: e.target.value })}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Animazioni</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Tipo Animazione</Label>
          <Select value={config.animation} onValueChange={(value) => onUpdate({ animation: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Nessuna</SelectItem>
              <SelectItem value="fade">Dissolvenza</SelectItem>
              <SelectItem value="slide">Scorrimento</SelectItem>
              <SelectItem value="bounce">Rimbalzo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Content Editor
interface ContentEditorProps {
  componentType: string;
  config: ComponentConfig['content'];
  onUpdate: (updates: Partial<ComponentConfig['content']>) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ componentType, config, onUpdate }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Contenuto Testuale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Titolo</Label>
          <Input
            id="title"
            value={config.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Inserisci il titolo"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Sottotitolo</Label>
          <Input
            id="subtitle"
            value={config.subtitle || ''}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            placeholder="Inserisci il sottotitolo"
          />
        </div>

        <div>
          <Label htmlFor="description">Descrizione</Label>
          <Textarea
            id="description"
            value={config.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Inserisci la descrizione"
            rows={4}
          />
        </div>

        {/* Campi specifici per tipo di componente */}
        {(componentType === 'hero' || componentType === 'contact-form') && (
          <>
            <div>
              <Label htmlFor="button-text">Testo Pulsante</Label>
              <Input
                id="button-text"
                value={config.buttonText || ''}
                onChange={(e) => onUpdate({ buttonText: e.target.value })}
                placeholder="Clicca qui"
              />
            </div>

            <div>
              <Label htmlFor="button-link">Link Pulsante</Label>
              <Input
                id="button-link"
                value={config.buttonLink || ''}
                onChange={(e) => onUpdate({ buttonLink: e.target.value })}
                placeholder="#section"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>

    {componentType === 'gallery' && (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Immagini</CardTitle>
          <CardDescription>Gestisci le immagini della galleria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {config.images?.map((image, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={image}
                  onChange={(e) => {
                    const newImages = [...(config.images || [])];
                    newImages[index] = e.target.value;
                    onUpdate({ images: newImages });
                  }}
                  placeholder="URL immagine"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newImages = config.images?.filter((_, i) => i !== index);
                    onUpdate({ images: newImages });
                  }}
                >
                  Rimuovi
                </Button>
              </div>
            )) || []}
            
            <Button
              variant="outline"
              onClick={() => {
                const newImages = [...(config.images || []), ''];
                onUpdate({ images: newImages });
              }}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi Immagine
            </Button>
          </div>
        </CardContent>
      </Card>
    )}
  </div>
);

// Behavior Editor
interface BehaviorEditorProps {
  config: ComponentConfig['behavior'];
  onUpdate: (updates: Partial<ComponentConfig['behavior']>) => void;
}

const BehaviorEditor: React.FC<BehaviorEditorProps> = ({ config, onUpdate }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Visibilità</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="hide-mobile">Nascondi su Mobile</Label>
          <Switch
            id="hide-mobile"
            checked={config.hideOnMobile || false}
            onCheckedChange={(hideOnMobile) => onUpdate({ hideOnMobile })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="hide-desktop">Nascondi su Desktop</Label>
          <Switch
            id="hide-desktop"
            checked={config.hideOnDesktop || false}
            onCheckedChange={(hideOnDesktop) => onUpdate({ hideOnDesktop })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="require-auth">Richiede Autenticazione</Label>
          <Switch
            id="require-auth"
            checked={config.requireAuth || false}
            onCheckedChange={(requireAuth) => onUpdate({ requireAuth })}
          />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-base">Interattività</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="interactive">Componente Interattivo</Label>
          <Switch
            id="interactive"
            checked={config.interactive || false}
            onCheckedChange={(interactive) => onUpdate({ interactive })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autoplay">Autoplay (se applicabile)</Label>
          <Switch
            id="autoplay"
            checked={config.autoplay || false}
            onCheckedChange={(autoplay) => onUpdate({ autoplay })}
          />
        </div>
      </CardContent>
    </Card>
  </div>
);