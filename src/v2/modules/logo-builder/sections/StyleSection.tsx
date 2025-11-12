import React, { useState } from 'react';
import { Label } from '../../../../components/ui/label';
import { Button } from '../../../../components/ui/button';
import { Slider } from '../../../../components/ui/slider';
import { LogoConfig } from '../../../types';
import { Palette, Droplet, Sun, Moon } from 'lucide-react';

interface StyleSectionProps {
  logoConfig: LogoConfig;
  onUpdateLogo: (updates: any) => void;
}

export const StyleSection: React.FC<StyleSectionProps> = ({
  logoConfig,
  onUpdateLogo
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'effects'>('colors');

  // Palette di colori predefinite per ristoranti
  const colorPalettes = [
    {
      name: 'Elegante Scuro',
      colors: ['#2C3E50', '#8B4513', '#CD853F', '#F5DEB3'],
      category: 'elegant'
    },
    {
      name: 'Rustico Caldo',
      colors: ['#8B4513', '#A0522D', '#DEB887', '#F4A460'],
      category: 'rustic'
    },
    {
      name: 'Moderno Pulito',
      colors: ['#34495E', '#3498DB', '#ECF0F1', '#BDC3C7'],
      category: 'modern'
    },
    {
      name: 'Vibrante',
      colors: ['#E74C3C', '#F39C12', '#F1C40F', '#27AE60'],
      category: 'vibrant'
    },
    {
      name: 'Vintage',
      colors: ['#7F4F24', '#D2B48C', '#DEB887', '#F5F5DC'],
      category: 'vintage'
    },
    {
      name: 'Luxury Gold',
      colors: ['#000000', '#FFD700', '#FFF8DC', '#F0E68C'],
      category: 'luxury'
    }
  ];

  // Colori singoli popolari
  const singleColors = [
    '#000000', '#2C3E50', '#34495E', '#7F8C8D',
    '#8B4513', '#A0522D', '#CD853F', '#DEB887',
    '#E74C3C', '#C0392B', '#F39C12', '#E67E22',
    '#27AE60', '#16A085', '#3498DB', '#2980B9',
    '#9B59B6', '#8E44AD', '#1ABC9C', '#F1C40F'
  ];

  const handleColorChange = (color: string) => {
    onUpdateLogo({ color });
    
    // Applica il colore a tutti gli elementi di testo esistenti nel canvas
    if (logoConfig.elements) {
      const updatedElements = logoConfig.elements.map(element => {
        if (element.type === 'text') {
          return {
            ...element,
            style: {
              ...element.style,
              color
            }
          };
        }
        return element;
      });
      onUpdateLogo({ elements: updatedElements });
    }
  };

  const handlePaletteSelect = (palette: typeof colorPalettes[0]) => {
    handleColorChange(palette.colors[0]);
    // Salva l'intera palette per uso futuro
    onUpdateLogo({ 
      colorPalette: palette,
      color: palette.colors[0]
    });
  };

  const renderColorTab = () => (
    <div className="space-y-6">
      {/* Current Color */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Colore Attivo</Label>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl border-2 border-white shadow-lg"
            style={{ backgroundColor: logoConfig.color || '#000000' }}
          />
          <div className="flex-1">
            <input
              type="color"
              value={logoConfig.color || '#000000'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-10 rounded-lg border cursor-pointer"
            />
            <input
              type="text"
              value={logoConfig.color || '#000000'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full mt-1 px-2 py-1 border rounded text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Color Palettes */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Palette Tematiche</Label>
        <div className="space-y-3">
          {colorPalettes.map((palette, index) => (
            <div
              key={index}
              className="p-3 border rounded-lg hover:border-primary/50 cursor-pointer transition-all group"
              onClick={() => handlePaletteSelect(palette)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{palette.name}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {palette.category}
                </span>
              </div>
              <div className="flex gap-1">
                {palette.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="flex-1 h-8 rounded border border-white shadow-sm group-hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Colori Singoli</Label>
        <div className="grid grid-cols-5 gap-2">
          {singleColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 ${
                logoConfig.color === color
                  ? 'border-primary shadow-md'
                  : 'border-white shadow-sm hover:border-primary/30'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderEffectsTab = () => (
    <div className="space-y-6">
      {/* Background */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sfondo Canvas</Label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: 'Bianco', color: '#FFFFFF', icon: '⬜' },
            { name: 'Trasparente', color: 'transparent', icon: '⭕' },
            { name: 'Nero', color: '#000000', icon: '⬛' }
          ].map((bg) => (
            <button
              key={bg.name}
              onClick={() => onUpdateLogo({ backgroundColor: bg.color })}
              className={`p-3 rounded-lg border text-center transition-all ${
                logoConfig.backgroundColor === bg.color
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="text-lg mb-1">{bg.icon}</div>
              <div className="text-xs font-medium">{bg.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Shadow Effects */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Effetti Ombra</Label>
        <div className="space-y-2">
          <button className="w-full p-3 border rounded-lg text-left hover:border-primary/50 transition-all">
            <div className="font-medium text-sm">💫 Ombra Sottile</div>
            <div className="text-xs text-muted-foreground">Ombra delicata per profondità</div>
          </button>
          <button className="w-full p-3 border rounded-lg text-left hover:border-primary/50 transition-all">
            <div className="font-medium text-sm">🌟 Ombra Drammatica</div>
            <div className="text-xs text-muted-foreground">Ombra marcata per impatto</div>
          </button>
          <button className="w-full p-3 border rounded-lg text-left hover:border-primary/50 transition-all">
            <div className="font-medium text-sm">✨ Bagliore</div>
            <div className="text-xs text-muted-foreground">Effetto luminoso</div>
          </button>
        </div>
      </div>

      {/* Gradients */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Gradienti</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Oro', gradient: 'linear-gradient(45deg, #FFD700, #FFA500)' },
            { name: 'Argento', gradient: 'linear-gradient(45deg, #C0C0C0, #808080)' },
            { name: 'Rame', gradient: 'linear-gradient(45deg, #CD853F, #8B4513)' },
            { name: 'Sunset', gradient: 'linear-gradient(45deg, #FF6B6B, #FFE66D)' }
          ].map((grad) => (
            <button
              key={grad.name}
              className="aspect-square rounded-lg border-2 border-white shadow-sm hover:shadow-md hover:scale-105 transition-all"
              style={{ background: grad.gradient }}
              title={grad.name}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-pink-50/50 to-orange-50/50">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-lg">Stile & Colori</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Personalizza l'aspetto visivo del logo
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="p-4 border-b">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'colors'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Droplet className="w-3 h-3" />
            Colori
          </button>
          <button
            onClick={() => setActiveTab('effects')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === 'effects'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sun className="w-3 h-3" />
            Effetti
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'colors' ? renderColorTab() : renderEffectsTab()}
      </div>

      {/* Preview */}
      <div className="p-4 border-t bg-gradient-to-r from-primary/5 to-pink/5">
        <div className="text-center">
          <Label className="text-sm font-medium">Anteprima Colore</Label>
          <div
            className="mt-2 mx-auto w-32 h-16 rounded-lg border-2 border-white shadow-lg flex items-center justify-center"
            style={{ 
              backgroundColor: logoConfig.color || '#000000',
              color: logoConfig.color === '#000000' ? '#FFFFFF' : '#000000'
            }}
          >
            <span className="text-sm font-medium">Logo</span>
          </div>
        </div>
      </div>
    </div>
  );
};