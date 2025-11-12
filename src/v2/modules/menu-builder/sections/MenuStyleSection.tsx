import React from 'react';
import { MenuConfig } from '../../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/Card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MenuStyleSectionProps {
  config: MenuConfig;
  onUpdate: (updates: Partial<MenuConfig>) => void;
}

export const MenuStyleSection: React.FC<MenuStyleSectionProps> = ({
  config,
  onUpdate
}) => {
  // Palette di colori per ristoranti
  const colorThemes = [
    { id: 'classic', name: 'Classico', primary: '#2C3E50', secondary: '#8B4513' },
    { id: 'elegant', name: 'Elegante', primary: '#1A1A1A', secondary: '#D4AF37' },
    { id: 'rustic', name: 'Rustico', primary: '#8B4513', secondary: '#DEB887' },
    { id: 'modern', name: 'Moderno', primary: '#34495E', secondary: '#3498DB' },
    { id: 'warm', name: 'Caldo', primary: '#A0522D', secondary: '#F4A460' }
  ];

  const fontFamilies = [
    { value: 'Inter', label: 'Inter (Moderno)' },
    { value: 'Playfair Display', label: 'Playfair Display (Elegante)' },
    { value: 'Merriweather', label: 'Merriweather (Classico)' },
    { value: 'Lato', label: 'Lato (Pulito)' },
    { value: 'Crimson Text', label: 'Crimson Text (Tradizionale)' }
  ];

  const handleColorThemeChange = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme) {
      onUpdate({
        colorTheme: themeId,
        primaryColor: theme.primary,
        secondaryColor: theme.secondary
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Tema Colore */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tema Colore</CardTitle>
          <CardDescription>
            Scegli una palette di colori per il menu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleColorThemeChange(theme.id)}
                className={`flex items-center gap-3 p-3 border rounded-lg text-left transition-all ${
                  config.colorTheme === theme.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex gap-1">
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.secondary }}
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">{theme.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {theme.primary} • {theme.secondary}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Typography</CardTitle>
          <CardDescription>
            Personalizza font e dimensioni del testo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fontFamily">Font principale</Label>
            <Select 
              value={config.fontFamily || 'Inter'} 
              onValueChange={(value) => onUpdate({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>
                      {font.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fontSize">Dimensione testo</Label>
            <Select 
              value={config.fontSize || 'medium'} 
              onValueChange={(value) => onUpdate({ fontSize: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Piccolo</SelectItem>
                <SelectItem value="medium">Medio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stile Elementi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stile Elementi</CardTitle>
          <CardDescription>
            Personalizza l'aspetto degli elementi del menu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="itemStyle">Stile elementi</Label>
            <Select 
              value={config.itemStyle || 'card'} 
              onValueChange={(value) => onUpdate({ itemStyle: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Card (con bordi)</SelectItem>
                <SelectItem value="minimal">Minimale</SelectItem>
                <SelectItem value="traditional">Tradizionale</SelectItem>
                <SelectItem value="modern">Moderno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="spacing">Spaziatura</Label>
            <Select 
              value={config.spacing || 'normal'} 
              onValueChange={(value) => onUpdate({ spacing: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tight">Compatta</SelectItem>
                <SelectItem value="normal">Normale</SelectItem>
                <SelectItem value="relaxed">Ampia</SelectItem>
                <SelectItem value="loose">Extra Ampia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Anteprima */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Anteprima Stile</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-4 border rounded-lg"
            style={{
              fontFamily: config.fontFamily || 'Inter',
              fontSize: config.fontSize === 'small' ? '14px' : 
                        config.fontSize === 'large' ? '18px' :
                        config.fontSize === 'extra-large' ? '20px' : '16px',
              color: config.primaryColor || '#2C3E50'
            }}
          >
            <h4 className="font-semibold mb-2">Esempio Piatto</h4>
            <p className="text-sm opacity-80 mb-2">
              Spaghetti alle vongole con pomodorini freschi e prezzemolo
            </p>
            <div 
              className="font-medium"
              style={{ color: config.secondaryColor || '#8B4513' }}
            >
              €18,00
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};