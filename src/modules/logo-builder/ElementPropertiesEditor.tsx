import React from 'react';
import { LogoConfig } from '../../types';

interface ElementPropertiesEditorProps {
  logoConfig: LogoConfig;
  onUpdate: (updates: Partial<LogoConfig>) => void;
}

const fontOptions = [
  'Playfair Display', 'Merriweather', 'Cormorant Garamond',
  'Inter', 'Poppins', 'Montserrat', 'Dancing Script', 'Great Vibes'
];

const colorPresets = [
  '#2a1a1d', '#6b3a2e', '#d9b99b', '#8B4513', '#D2691E',
  '#2C3E50', '#34495E', '#E74C3C', '#C0392B', '#27AE60',
  '#3498DB', '#9B59B6', '#F39C12', '#1ABC9C', '#000000'
];

export const ElementPropertiesEditor: React.FC<ElementPropertiesEditorProps> = ({
  logoConfig,
  onUpdate
}) => {
  // Se non è una modalità text, mostra placeholder
  if (logoConfig.mode !== 'text' && logoConfig.mode !== 'hybrid') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <h3 className="font-semibold mb-2">Proprietà Elemento</h3>
        <p className="text-sm text-muted-foreground">
          Seleziona un elemento per modificarne le proprietà
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Proprietà Testo</h3>
        
        {/* Testo Principale */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Testo Principale</label>
            <input
              type="text"
              value={logoConfig.text || ''}
              onChange={(e) => onUpdate({ text: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nome del locale"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-medium mb-2">Tagline (opzionale)</label>
            <input
              type="text"
              value={logoConfig.tagline || ''}
              onChange={(e) => onUpdate({ tagline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Sottotitolo o motto"
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium mb-2">Font</label>
            <select
              value={logoConfig.font || 'Inter'}
              onChange={(e) => onUpdate({ font: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {fontOptions.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Dimensione Font ({logoConfig.size || 48}px)
            </label>
            <input
              type="range"
              min="16"
              max="120"
              value={logoConfig.size || 48}
              onChange={(e) => onUpdate({ size: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>16px</span>
              <span>120px</span>
            </div>
          </div>

          {/* Colore */}
          <div>
            <label className="block text-sm font-medium mb-2">Colore</label>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="color"
                value={logoConfig.color || '#000000'}
                onChange={(e) => onUpdate({ color: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={logoConfig.color || '#000000'}
                onChange={(e) => onUpdate({ color: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                placeholder="#000000"
              />
            </div>
            
            {/* Color Presets */}
            <div className="grid grid-cols-5 gap-2">
              {colorPresets.map(color => (
                <button
                  key={color}
                  onClick={() => onUpdate({ color })}
                  className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-105 ${
                    logoConfig.color === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Layout (per testo + tagline) */}
          {logoConfig.tagline && (
            <div>
              <label className="block text-sm font-medium mb-2">Disposizione</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'vertical', label: 'Verticale', desc: 'Testo sopra, tagline sotto' },
                  { value: 'horizontal', label: 'Orizzontale', desc: 'Affiancati' },
                  { value: 'stacked', label: 'Compatto', desc: 'Ravvicinati' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onUpdate({ layout: option.value as any })}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      logoConfig.layout === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    title={option.desc}
                  >
                    <div className="text-xs font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Azioni Rapide */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-3 text-sm">Azioni Rapide</h4>
        <div className="space-y-2">
          <button
            onClick={() => onUpdate({ 
              font: 'Playfair Display', 
              color: '#2a1a1d',
              size: 42 
            })}
            className="w-full p-2 text-sm bg-gradient-to-r from-red-50 to-amber-50 border border-red-100 hover:border-red-200 rounded-lg transition-colors"
          >
            🍷 Stile Wine Bar
          </button>
          <button
            onClick={() => onUpdate({ 
              font: 'Inter', 
              color: '#2C3E50',
              size: 36 
            })}
            className="w-full p-2 text-sm bg-gradient-to-r from-blue-50 to-gray-50 border border-blue-100 hover:border-blue-200 rounded-lg transition-colors"
          >
            🏢 Stile Moderno
          </button>
          <button
            onClick={() => onUpdate({ 
              font: 'Dancing Script', 
              color: '#C0392B',
              size: 48 
            })}
            className="w-full p-2 text-sm bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 hover:border-pink-200 rounded-lg transition-colors"
          >
            ✨ Stile Elegante
          </button>
        </div>
      </div>

      {/* Reset */}
      <div className="border-t pt-4">
        <button
          onClick={() => onUpdate({ 
            font: 'Inter',
            color: '#000000',
            size: 48,
            text: '',
            tagline: '',
            layout: 'vertical'
          })}
          className="w-full p-2 text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors"
        >
          🔄 Reset Proprietà
        </button>
      </div>
    </div>
  );
};