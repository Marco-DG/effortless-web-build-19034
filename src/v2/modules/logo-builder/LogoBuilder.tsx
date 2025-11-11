import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { SidebarLayout } from '../../ui/Layout';
import { Download, Eye, Type, Image, Square, Palette, Layers, RotateCw } from 'lucide-react';

interface LogoBuilderProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

type ActiveTool = 'templates' | 'text' | 'style' | 'layout' | 'export';

export const LogoBuilder: React.FC<LogoBuilderProps> = ({ onSwitchBuilder }) => {
  const { activeProject, updateProject } = useAppStore();
  const [activeTool, setActiveTool] = useState<ActiveTool>('templates');
  
  if (!activeProject) return null;

  const logoConfig = activeProject.data.logo;

  const handleUpdateLogo = (updates: any) => {
    updateProject({
      logo: { ...logoConfig, ...updates }
    });
  };

  const handleExport = () => {
    console.log('Export logo:', logoConfig);
    // TODO: Implementare export PNG/SVG
  };

  // Header
  const renderHeader = () => (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onSwitchBuilder?.('logo')} 
          className="px-3 py-1.5 rounded text-xs font-medium bg-primary text-primary-foreground"
        >
          Logo
        </button>
        <button 
          onClick={() => onSwitchBuilder?.('menu')} 
          className="px-3 py-1.5 rounded text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Menù
        </button>
        <button 
          onClick={() => onSwitchBuilder?.('site')} 
          className="px-3 py-1.5 rounded text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Sito Web
        </button>
      </div>
      
      <div className="flex items-center gap-1">
        <button 
          className="lg:hidden inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs font-medium"
        >
          <Eye className="w-3.5 h-3.5" /> Anteprima
        </button>
        <button
          onClick={handleExport}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
          title="Esporta"
        >
          <Download className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  // Navigation
  const renderNavigation = () => (
    <div className="p-2 space-y-1">
      {[
        { id: 'templates' as ActiveTool, icon: Palette, label: 'Template' },
        { id: 'text' as ActiveTool, icon: Type, label: 'Testo' },
        { id: 'style' as ActiveTool, icon: Square, label: 'Stile' },
        { id: 'layout' as ActiveTool, icon: Layers, label: 'Layout' },
        { id: 'export' as ActiveTool, icon: Download, label: 'Export' }
      ].map((tool) => (
        <button
          key={tool.id}
          onClick={() => setActiveTool(tool.id)}
          className={`w-full flex items-center justify-center 2xl:justify-start px-2 py-2.5 2xl:px-3 text-sm transition-all duration-200 rounded-lg group ${
            activeTool === tool.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          title={tool.label}
        >
          <tool.icon className="w-4 h-4 flex-shrink-0" />
          <span className="hidden 2xl:block ml-2 text-left font-medium">
            {tool.label}
          </span>
        </button>
      ))}
    </div>
  );

  // Template Editor
  const renderTemplateEditor = () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Template Logo</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Scegli uno stile predefinito per il tuo logo
        </p>
      </div>

      <div className="space-y-3">
        {/* Template Wine Bar */}
        <button
          onClick={() => handleUpdateLogo({
            mode: 'text',
            text: activeProject.data.business.name,
            font: 'Playfair Display',
            size: 48,
            color: '#8B4513',
            tagline: 'Wine Bar',
            layout: 'vertical'
          })}
          className="w-full p-4 border rounded-lg text-left hover:border-primary transition-colors"
        >
          <div className="font-medium text-sm mb-1">🍷 Wine Bar Elegante</div>
          <div className="text-xs text-muted-foreground">Font serif elegante con colori caldi</div>
        </button>

        {/* Template Moderno */}
        <button
          onClick={() => handleUpdateLogo({
            mode: 'text',
            text: activeProject.data.business.name,
            font: 'Inter',
            size: 42,
            color: '#2C3E50',
            tagline: 'Restaurant',
            layout: 'horizontal'
          })}
          className="w-full p-4 border rounded-lg text-left hover:border-primary transition-colors"
        >
          <div className="font-medium text-sm mb-1">🏢 Moderno Minimal</div>
          <div className="text-xs text-muted-foreground">Design pulito e contemporaneo</div>
        </button>

        {/* Template Script */}
        <button
          onClick={() => handleUpdateLogo({
            mode: 'text',
            text: activeProject.data.business.name,
            font: 'Dancing Script',
            size: 52,
            color: '#C0392B',
            tagline: 'Autentica Cucina',
            layout: 'vertical'
          })}
          className="w-full p-4 border rounded-lg text-left hover:border-primary transition-colors"
        >
          <div className="font-medium text-sm mb-1">✨ Script Elegante</div>
          <div className="text-xs text-muted-foreground">Font corsivo per un tocco personale</div>
        </button>

        {/* Template Vintage */}
        <button
          onClick={() => handleUpdateLogo({
            mode: 'text',
            text: activeProject.data.business.name,
            font: 'Merriweather',
            size: 38,
            color: '#8B4513',
            tagline: 'EST. 1962',
            layout: 'stacked'
          })}
          className="w-full p-4 border rounded-lg text-left hover:border-primary transition-colors"
        >
          <div className="font-medium text-sm mb-1">📜 Vintage Classico</div>
          <div className="text-xs text-muted-foreground">Stile retrò con carattere tradizionale</div>
        </button>
      </div>
    </div>
  );

  // Text Editor
  const renderTextEditor = () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Testo e Contenuto</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Personalizza il testo del tuo logo
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Testo Principale</label>
          <input
            type="text"
            value={logoConfig.text || ''}
            onChange={(e) => handleUpdateLogo({ text: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Nome del ristorante"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sottotitolo (opzionale)</label>
          <input
            type="text"
            value={logoConfig.tagline || ''}
            onChange={(e) => handleUpdateLogo({ tagline: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Wine Bar, Restaurant, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Font</label>
          <select
            value={logoConfig.font || 'Inter'}
            onChange={(e) => handleUpdateLogo({ font: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="Playfair Display">Playfair Display (Elegante)</option>
            <option value="Inter">Inter (Moderno)</option>
            <option value="Merriweather">Merriweather (Classico)</option>
            <option value="Dancing Script">Dancing Script (Script)</option>
            <option value="Montserrat">Montserrat (Sans Serif)</option>
            <option value="Cormorant Garamond">Cormorant Garamond (Serif)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Dimensione ({logoConfig.size || 48}px)
          </label>
          <input
            type="range"
            min="24"
            max="80"
            value={logoConfig.size || 48}
            onChange={(e) => handleUpdateLogo({ size: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  // Style Editor
  const renderStyleEditor = () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Colori e Stile</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Personalizza i colori del logo
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3">Colore Principale</label>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="color"
              value={logoConfig.color || '#000000'}
              onChange={(e) => handleUpdateLogo({ color: e.target.value })}
              className="w-12 h-10 border rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={logoConfig.color || '#000000'}
              onChange={(e) => handleUpdateLogo({ color: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm"
            />
          </div>
          
          {/* Color presets */}
          <div className="grid grid-cols-5 gap-2">
            {['#8B4513', '#2C3E50', '#C0392B', '#27AE60', '#F39C12', '#9B59B6', '#34495E', '#E74C3C', '#3498DB', '#000000'].map((color) => (
              <button
                key={color}
                onClick={() => handleUpdateLogo({ color })}
                className="w-8 h-8 rounded border-2 border-white shadow-sm hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Layout Editor
  const renderLayoutEditor = () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Layout e Disposizione</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Configura la disposizione degli elementi
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3">Modalità</label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'text', label: 'Solo Testo', desc: 'Logo tipografico' },
              { id: 'image', label: 'Solo Immagine', desc: 'Logo con icona/simbolo' },
              { id: 'hybrid', label: 'Testo + Immagine', desc: 'Combinazione di entrambi' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleUpdateLogo({ mode: mode.id })}
                className={`text-left p-3 rounded-lg border transition-all ${
                  logoConfig.mode === mode.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{mode.label}</div>
                <div className="text-xs text-muted-foreground">{mode.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {logoConfig.tagline && (
          <div>
            <label className="block text-sm font-medium mb-3">Disposizione</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'vertical', label: 'Verticale', icon: '⬍' },
                { id: 'horizontal', label: 'Orizzontale', icon: '⬌' },
                { id: 'stacked', label: 'Compatto', icon: '⬜' }
              ].map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => handleUpdateLogo({ layout: layout.id })}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    logoConfig.layout === layout.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-lg mb-1">{layout.icon}</div>
                  <div className="text-xs font-medium">{layout.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {(logoConfig.mode === 'image' || logoConfig.mode === 'hybrid') && (
          <div>
            <label className="block text-sm font-medium mb-2">URL Immagine</label>
            <input
              type="url"
              value={logoConfig.imageUrl || ''}
              onChange={(e) => handleUpdateLogo({ imageUrl: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://example.com/logo.png"
            />
          </div>
        )}
      </div>
    </div>
  );

  // Export Options
  const renderExportEditor = () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Export e Download</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Esporta il tuo logo in diversi formati
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleExport}
          className="w-full p-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          📁 Download Configurazione JSON
        </button>
        
        <button
          disabled
          className="w-full p-3 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed"
        >
          🖼️ Export PNG (Prossimamente)
        </button>
        
        <button
          disabled
          className="w-full p-3 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed"
        >
          🎨 Export SVG (Prossimamente)
        </button>
      </div>

      <div className="border-t pt-4 space-y-2">
        <h4 className="font-medium text-sm">Anteprima Logo</h4>
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div
            style={{
              fontFamily: logoConfig.font || 'Inter',
              fontSize: `${Math.min(logoConfig.size || 48, 32)}px`,
              color: logoConfig.color || '#000000',
              fontWeight: logoConfig.font === 'Playfair Display' ? '600' : '500'
            }}
          >
            {logoConfig.text || activeProject.data.business.name}
          </div>
          {logoConfig.tagline && (
            <div
              className="mt-1 opacity-70"
              style={{
                fontSize: `${Math.min((logoConfig.size || 48) * 0.4, 16)}px`,
                color: logoConfig.color || '#000000'
              }}
            >
              {logoConfig.tagline}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Content router
  const renderContent = () => {
    switch (activeTool) {
      case 'templates': return renderTemplateEditor();
      case 'text': return renderTextEditor();
      case 'style': return renderStyleEditor();
      case 'layout': return renderLayoutEditor();
      case 'export': return renderExportEditor();
      default: return null;
    }
  };

  return (
    <SidebarLayout
      header={renderHeader()}
      navigation={renderNavigation()}
      content={renderContent()}
    />
  );
};