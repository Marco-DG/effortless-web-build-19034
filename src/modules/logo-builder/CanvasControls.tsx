import React from 'react';
import { LogoConfig } from '../../types';

interface CanvasControlsProps {
  logoConfig: LogoConfig;
  onUpdate: (updates: Partial<LogoConfig>) => void;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  logoConfig,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      {/* Mode Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">Tipo di Logo</label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { id: 'text', label: 'Solo Testo', desc: 'Logo basato su tipografia' },
            { id: 'image', label: 'Immagine', desc: 'Carica un file immagine' },
            { id: 'hybrid', label: 'Misto', desc: 'Combinazione di testo e immagine' }
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => onUpdate({ mode: option.id as 'text' | 'image' | 'hybrid' })}
              className={`text-left p-3 rounded-lg border transition-all ${
                logoConfig.mode === option.id
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload for image/hybrid modes */}
      {(logoConfig.mode === 'image' || logoConfig.mode === 'hybrid') && (
        <div>
          <label className="block text-sm font-medium mb-2">URL Immagine</label>
          <input
            type="url"
            value={logoConfig.imageUrl || ''}
            onChange={(e) => onUpdate({ imageUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://esempio.com/logo.png"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Incolla l'URL di un'immagine o carica su un servizio di hosting
          </p>
        </div>
      )}

      {/* Canvas Layout */}
      <div>
        <label className="block text-sm font-medium mb-3">Layout</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'horizontal', label: 'Orizzontale', icon: '⬌' },
            { id: 'vertical', label: 'Verticale', icon: '⬍' },
            { id: 'stacked', label: 'Sovrapposto', icon: '⬜' }
          ].map((layout) => (
            <button
              key={layout.id}
              onClick={() => onUpdate({ layout: layout.id as 'horizontal' | 'vertical' | 'stacked' })}
              className={`p-3 rounded-lg border text-center transition-all ${
                logoConfig.layout === layout.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="text-lg mb-1">{layout.icon}</div>
              <div className="text-xs font-medium">{layout.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Size */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Dimensione Canvas ({logoConfig.size || 48}px)
        </label>
        <input
          type="range"
          min="24"
          max="120"
          value={logoConfig.size || 48}
          onChange={(e) => onUpdate({ size: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Piccolo</span>
          <span>Grande</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t pt-4 space-y-2">
        <button
          onClick={() => onUpdate({ 
            mode: 'text', 
            font: 'Playfair Display', 
            color: '#2a1a1d',
            size: 42 
          })}
          className="w-full p-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          🍷 Preset Wine Bar
        </button>
        <button
          onClick={() => onUpdate({ 
            mode: 'text', 
            font: 'Inter', 
            color: '#2C3E50',
            size: 36 
          })}
          className="w-full p-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          🏢 Preset Moderno
        </button>
      </div>
    </div>
  );
};