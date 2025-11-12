import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  PREMIUM_FONTS, 
  PremiumFont, 
  getFontsByCategory, 
  getFontsByCuisine,
  getFontsByRarity,
  FONT_COMBINATIONS 
} from './PremiumFonts';
import { Search, Crown, Sparkles, Zap, Star } from 'lucide-react';

interface PremiumFontSelectorProps {
  selectedFont?: string;
  onFontSelect: (font: PremiumFont) => void;
  onFontSizeChange?: (size: number) => void;
  onWeightChange?: (weight: string) => void;
  fontSize?: number;
  fontWeight?: string;
  className?: string;
}

type FontFilter = 'all' | 'luxury' | 'modern' | 'vintage' | 'artisanal' | 'experimental';
type CuisineFilter = 'all' | 'fine-dining' | 'casual' | 'wine-bar' | 'coffee' | 'steakhouse' | 'molecular' | 'japanese';

export const PremiumFontSelector: React.FC<PremiumFontSelectorProps> = ({
  selectedFont,
  onFontSelect,
  onFontSizeChange,
  onWeightChange,
  fontSize = 24,
  fontWeight = '400',
  className = ''
}) => {
  const [activeFilter, setActiveFilter] = useState<FontFilter>('all');
  const [cuisineFilter, setCuisineFilter] = useState<CuisineFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewText, setPreviewText] = useState('Ristorante');
  const [hoveredFont, setHoveredFont] = useState<string | null>(null);

  // Filtra i font in base ai criteri selezionati
  const filteredFonts = PREMIUM_FONTS.filter(font => {
    const matchesCategory = activeFilter === 'all' || font.category === activeFilter;
    const matchesCuisine = cuisineFilter === 'all' || font.cuisine.includes(cuisineFilter as any);
    const matchesSearch = font.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         font.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesCuisine && matchesSearch;
  });

  // Carica i Google Fonts dinamicamente
  useEffect(() => {
    const googleFonts = filteredFonts
      .filter(font => font.googleFont)
      .map(font => font.family.replace(' ', '+'));

    if (googleFonts.length > 0) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?${googleFonts.map(font => `family=${font}:wght@100;200;300;400;500;600;700;800;900`).join('&')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [filteredFonts]);

  const categoryFilters = [
    { id: 'all' as FontFilter, name: 'Tutti', icon: '🎨', color: 'from-gray-500 to-gray-600' },
    { id: 'luxury' as FontFilter, name: 'Luxury', icon: '👑', color: 'from-yellow-500 to-yellow-600' },
    { id: 'modern' as FontFilter, name: 'Modern', icon: '⚡', color: 'from-blue-500 to-blue-600' },
    { id: 'vintage' as FontFilter, name: 'Vintage', icon: '📜', color: 'from-amber-500 to-amber-600' },
    { id: 'artisanal' as FontFilter, name: 'Artisanal', icon: '✍️', color: 'from-green-500 to-green-600' },
    { id: 'experimental' as FontFilter, name: 'Extreme', icon: '🚀', color: 'from-purple-500 to-purple-600' }
  ];

  const cuisineFilters = [
    { id: 'all' as CuisineFilter, name: 'Tutti', emoji: '🍽️' },
    { id: 'fine-dining' as CuisineFilter, name: 'Fine Dining', emoji: '⭐' },
    { id: 'wine-bar' as CuisineFilter, name: 'Wine Bar', emoji: '🍷' },
    { id: 'coffee' as CuisineFilter, name: 'Coffee', emoji: '☕' },
    { id: 'steakhouse' as CuisineFilter, name: 'Steakhouse', emoji: '🥩' },
    { id: 'molecular' as CuisineFilter, name: 'Molecular', emoji: '🧪' },
    { id: 'japanese' as CuisineFilter, name: 'Japanese', emoji: '🍣' }
  ];

  const getRarityIcon = (rarity: PremiumFont['rarity']) => {
    switch (rarity) {
      case 'legendary': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'rare': return <Sparkles className="w-4 h-4 text-purple-500" />;
      default: return <Star className="w-4 h-4 text-blue-500" />;
    }
  };

  const FontPreview: React.FC<{ font: PremiumFont; isSelected: boolean; isHovered: boolean }> = ({ 
    font, 
    isSelected, 
    isHovered 
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`p-4 cursor-pointer transition-all hover:shadow-lg border-2 ${
          isSelected 
            ? 'border-primary bg-primary/5 shadow-md' 
            : isHovered
            ? 'border-primary/50 bg-primary/2'
            : 'border-border hover:border-primary/30'
        }`}
        onClick={() => onFontSelect(font)}
        onMouseEnter={() => setHoveredFont(font.family)}
        onMouseLeave={() => setHoveredFont(null)}
      >
        {/* Preview del font */}
        <div 
          className="text-center py-6 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden"
          style={{
            fontFamily: font.family,
            fontSize: '20px',
            fontWeight: fontWeight,
            background: isSelected ? 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' : undefined
          }}
        >
          {font.preview}
        </div>

        {/* Info del font */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm truncate">{font.name}</h3>
            <div className="flex items-center gap-1">
              {getRarityIcon(font.rarity)}
              {font.isPremium && <Badge variant="secondary" className="text-xs">Premium</Badge>}
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {font.description}
          </p>

          {/* Tags della cucina */}
          <div className="flex flex-wrap gap-1">
            {font.cuisine.slice(0, 2).map((cuisine) => (
              <Badge key={cuisine} variant="outline" className="text-xs">
                {cuisineFilters.find(c => c.id === cuisine)?.emoji} {cuisine}
              </Badge>
            ))}
          </div>

          {/* Pesi disponibili */}
          <div className="text-xs text-muted-foreground">
            Pesi: {font.weights.join(', ')}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          ✨ Font Premium Collection
        </h2>
        <p className="text-sm text-muted-foreground">
          Font professionali per loghi award-winning
        </p>
      </div>

      {/* Barra di ricerca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Cerca font per nome o descrizione..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Controlli tipografici */}
      {selectedFont && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Dimensione: {fontSize}px</label>
            <Slider
              value={[fontSize]}
              onValueChange={(value) => onFontSizeChange?.(value[0])}
              min={12}
              max={72}
              step={1}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Peso</label>
            <select 
              value={fontWeight}
              onChange={(e) => onWeightChange?.(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="100">100 - Thin</option>
              <option value="300">300 - Light</option>
              <option value="400">400 - Regular</option>
              <option value="500">500 - Medium</option>
              <option value="600">600 - SemiBold</option>
              <option value="700">700 - Bold</option>
              <option value="800">800 - ExtraBold</option>
              <option value="900">900 - Black</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Filtri per categoria */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Stile</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {categoryFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className="text-xs"
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Filtri per tipo di cucina */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Tipo di Ristorante</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {cuisineFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={cuisineFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setCuisineFilter(filter.id)}
              className="text-xs"
            >
              <span className="mr-1">{filter.emoji}</span>
              {filter.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Input per preview personalizzata */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">Testo di Preview</label>
        <Input
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Inserisci il nome del tuo ristorante..."
          className="text-center"
        />
      </div>

      {/* Grid dei font */}
      <AnimatePresence>
        {filteredFonts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredFonts.map((font) => (
              <FontPreview
                key={font.family}
                font={{ ...font, preview: previewText || font.preview }}
                isSelected={selectedFont === font.family}
                isHovered={hoveredFont === font.family}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nessun font trovato con i filtri selezionati</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveFilter('all');
                  setCuisineFilter('all');
                  setSearchTerm('');
                }}
                className="mt-4"
              >
                Rimuovi filtri
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sezione combinazioni suggerite */}
      {cuisineFilter !== 'all' && FONT_COMBINATIONS[cuisineFilter as keyof typeof FONT_COMBINATIONS] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
        >
          <h3 className="font-semibold mb-3 text-center">✨ Combinazione Consigliata per {cuisineFilter}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
            {Object.entries(FONT_COMBINATIONS[cuisineFilter as keyof typeof FONT_COMBINATIONS]).map(([role, fontFamily]) => (
              <div key={role} className="p-2 bg-white rounded border">
                <div className="text-xs font-medium text-muted-foreground mb-1 capitalize">{role}</div>
                <div 
                  className="font-semibold"
                  style={{ fontFamily }}
                >
                  {fontFamily}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};