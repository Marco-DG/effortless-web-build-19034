import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Slider } from '../../../../components/ui/slider';
import { PremiumFont, PREMIUM_FONTS } from '../PremiumFonts';
import { LogoConfig } from '../../../types';
import { Plus, Type } from 'lucide-react';

interface FontSectionProps {
  logoConfig: LogoConfig;
  onUpdateLogo: (updates: any) => void;
}

type FontCategory = 'serif' | 'sans-serif' | 'script' | 'display' | 'monospace';

export const FontSection: React.FC<FontSectionProps> = ({
  logoConfig,
  onUpdateLogo
}) => {
  const [activeCategory, setActiveCategory] = useState<FontCategory>('serif');
  const [selectedFont, setSelectedFont] = useState<PremiumFont | null>(null);
  const [mainText, setMainText] = useState(logoConfig.text || 'Restaurant Name');
  const [subtitle, setSubtitle] = useState(logoConfig.tagline || '');

  // Filtra i font per categoria
  const getFontsByCategory = (category: FontCategory) => {
    return PREMIUM_FONTS.filter(font => {
      if (category === 'serif') return font.category === 'serif' || font.category === 'elegant';
      if (category === 'sans-serif') return font.category === 'sans-serif' || font.category === 'modern';
      if (category === 'script') return font.category === 'script' || font.category === 'handwritten';
      if (category === 'display') return font.category === 'display' || font.category === 'decorative';
      if (category === 'monospace') return font.category === 'monospace';
      return font.category === category;
    });
  };

  const fonts = getFontsByCategory(activeCategory);

  const categories = [
    { id: 'serif' as FontCategory, name: 'Serif', icon: '📖', desc: 'Eleganti e classici' },
    { id: 'sans-serif' as FontCategory, name: 'Sans-Serif', icon: '✨', desc: 'Moderni e puliti' },
    { id: 'script' as FontCategory, name: 'Script', icon: '✍️', desc: 'Calligrafici e artistici' },
    { id: 'display' as FontCategory, name: 'Display', icon: '🎭', desc: 'Decorativi e unici' },
    { id: 'monospace' as FontCategory, name: 'Mono', icon: '💻', desc: 'Tecnologici e uniformi' }
  ];

  const handleFontSelect = (font: PremiumFont) => {
    setSelectedFont(font);
    onUpdateLogo({
      font: font.family,
      fontCategory: font.category,
      fontWeight: font.weights?.[0] || '400'
    });
  };

  const handleTextUpdate = (field: string, value: string) => {
    if (field === 'main') {
      setMainText(value);
      onUpdateLogo({ text: value });
    } else if (field === 'subtitle') {
      setSubtitle(value);
      onUpdateLogo({ tagline: value });
    }
  };

  const handleAddTextToCanvas = (text: string, isSubtitle = false) => {
    // Crea un nuovo elemento testo da aggiungere al canvas
    const textElement = {
      id: `text_${Date.now()}`,
      type: 'text' as const,
      x: isSubtitle ? 200 : 200,
      y: isSubtitle ? 250 : 150,
      width: 200,
      height: 50,
      rotation: 0,
      opacity: 1,
      zIndex: isSubtitle ? 1 : 2,
      content: text,
      style: {
        fontFamily: selectedFont?.family || logoConfig.font || 'Inter',
        fontSize: isSubtitle ? 16 : 32,
        fontWeight: selectedFont?.weights?.[0] || '400',
        color: logoConfig.color || '#000000',
        textAlign: 'center'
      }
    };

    // Aggiunge l'elemento alla lista degli elementi canvas
    const currentElements = logoConfig.elements || [];
    onUpdateLogo({
      elements: [...currentElements, textElement],
      mode: 'canvas'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-emerald-50/50 to-blue-50/50">
        <div className="flex items-center gap-2 mb-2">
          <Type className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-lg">Font & Typography</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Scegli font premium e aggiungi testo al canvas
        </p>
      </div>

      {/* Text Input Section */}
      <div className="p-4 border-b space-y-4">
        <div className="space-y-3">
          <div>
            <Label htmlFor="main-text" className="text-sm font-medium">Testo Principale</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="main-text"
                value={mainText}
                onChange={(e) => handleTextUpdate('main', e.target.value)}
                placeholder="Nome del ristorante"
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddTextToCanvas(mainText)}
                className="px-2"
                title="Aggiungi al canvas"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="subtitle-text" className="text-sm font-medium">Sottotitolo (opzionale)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="subtitle-text"
                value={subtitle}
                onChange={(e) => handleTextUpdate('subtitle', e.target.value)}
                placeholder="Wine Bar, Ristorante, etc."
                className="flex-1"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddTextToCanvas(subtitle, true)}
                className="px-2"
                title="Aggiungi al canvas"
                disabled={!subtitle}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selector */}
      <div className="p-4 border-b">
        <Label className="text-sm font-medium mb-3 block">Categorie Font</Label>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 p-2 rounded-lg border text-left transition-all ${
                activeCategory === category.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <span className="text-sm">{category.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-xs">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {fonts.map((font) => (
            <motion.div
              key={font.family}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedFont?.family === font.family
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
              }`}
              onClick={() => handleFontSelect(font)}
            >
              {/* Font Preview */}
              <div
                className="font-medium text-base mb-2 truncate"
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weights?.[0] || '400'
                }}
              >
                {mainText || 'Restaurant Name'}
              </div>

              {/* Font Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{font.family}</span>
                  {font.rarity && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-1 py-0 ${
                        font.rarity === 'legendary' ? 'border-yellow-400 text-yellow-600' :
                        font.rarity === 'epic' ? 'border-purple-400 text-purple-600' :
                        font.rarity === 'rare' ? 'border-blue-400 text-blue-600' :
                        'border-green-400 text-green-600'
                      }`}
                    >
                      {font.rarity}
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {font.weights?.length || 1} pesi
                </div>
              </div>

              {/* Weights */}
              {font.weights && font.weights.length > 1 && (
                <div className="flex gap-1 mt-2">
                  {font.weights.slice(0, 4).map((weight) => (
                    <button
                      key={weight}
                      className="px-2 py-1 text-xs rounded border hover:bg-muted transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateLogo({ fontWeight: weight });
                      }}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Font Controls */}
      {selectedFont && (
        <div className="p-4 border-t bg-gradient-to-r from-primary/5 to-emerald/5">
          <div className="space-y-3">
            <div className="text-center">
              <div className="font-medium text-sm">{selectedFont.family}</div>
              <div className="text-xs text-muted-foreground">{selectedFont.category}</div>
            </div>

            {/* Quick Add Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddTextToCanvas(mainText)}
                disabled={!mainText}
              >
                ➕ Testo Principale
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAddTextToCanvas(subtitle, true)}
                disabled={!subtitle}
              >
                ➕ Sottotitolo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};