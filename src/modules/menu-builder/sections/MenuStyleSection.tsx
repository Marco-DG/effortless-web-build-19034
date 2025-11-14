import React from 'react';
import { MenuConfig } from '../../../types';
import { PremiumCard, PremiumColorPicker, PremiumSelect } from '../../../components/forms';

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
    { id: 'classic', name: 'Classico', primary: '#2C3E50', secondary: '#8B4513', description: 'Eleganza tradizionale per ristoranti classici' },
    { id: 'elegant', name: 'Elegante', primary: '#1A1A1A', secondary: '#D4AF37', description: 'Nero e oro per un look sofisticato' },
    { id: 'rustic', name: 'Rustico', primary: '#8B4513', secondary: '#DEB887', description: 'Tonalità terrose per atmosfera calda' },
    { id: 'modern', name: 'Moderno', primary: '#34495E', secondary: '#3498DB', description: 'Stile contemporaneo e minimalista' },
    { id: 'warm', name: 'Caldo', primary: '#A0522D', secondary: '#F4A460', description: 'Colori avvolgenti e accoglienti' }
  ];

  const fontFamilies = [
    { value: 'Inter', label: 'Inter - Moderno e leggibile' },
    { value: 'Playfair Display', label: 'Playfair Display - Elegante e raffinato' },
    { value: 'Merriweather', label: 'Merriweather - Classico e tradizionale' },
    { value: 'Lato', label: 'Lato - Pulito e professionale' },
    { value: 'Crimson Text', label: 'Crimson Text - Tradizionale e caldo' }
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
      <PremiumColorPicker
        label="Tema Colore"
        description="Scegli una palette di colori che rispecchi l'identità del tuo ristorante"
        selectedThemeId={config.colorTheme}
        themes={colorThemes}
        onChange={handleColorThemeChange}
      />

      {/* Tipografia */}
      <PremiumCard
        title="Tipografia"
        description="Personalizza i font per creare l'atmosfera giusta"
      >
        <div className="space-y-4">
          <PremiumSelect
            label="Font principale"
            value={config.fontFamily || 'Inter'}
            onChange={(value) => onUpdate({ fontFamily: value })}
            options={fontFamilies}
            description="Il font principale utilizzato in tutto il menu"
          />

          <PremiumSelect
            label="Dimensione font base"
            value={config.fontSize || 'medium'}
            onChange={(value) => onUpdate({ fontSize: value })}
            options={[
              { value: 'small', label: 'Piccolo - Ideale per menu compatti' },
              { value: 'medium', label: 'Medio - Dimensione standard' },
              { value: 'large', label: 'Grande - Facile da leggere' }
            ]}
            description="Dimensione base del testo per il menu"
          />
        </div>
      </PremiumCard>

      {/* Spaziatura e Stile */}
      <PremiumCard
        title="Layout e Stile"
        description="Controlla l'aspetto generale e la spaziatura del menu"
      >
        <div className="space-y-4">
          <PremiumSelect
            label="Spaziatura"
            value={config.spacing || 'normal'}
            onChange={(value) => onUpdate({ spacing: value })}
            options={[
              { value: 'tight', label: 'Compatto - Più elementi per pagina' },
              { value: 'normal', label: 'Normale - Bilanciato e leggibile' },
              { value: 'loose', label: 'Ampio - Aspetto arioso ed elegante' }
            ]}
            description="Controllo dello spazio tra gli elementi"
          />

          <div className="grid grid-cols-2 gap-4">
            <PremiumSelect
              label="Stile bordi"
              value={config.borderStyle || 'none'}
              onChange={(value) => onUpdate({ borderStyle: value })}
              options={[
                { value: 'none', label: 'Nessun bordo' },
                { value: 'subtle', label: 'Bordi sottili' },
                { value: 'prominent', label: 'Bordi evidenti' },
                { value: 'rounded', label: 'Bordi arrotondati' }
              ]}
              description="Stile dei bordi per sezioni e elementi"
            />

            <PremiumSelect
              label="Ombreggiature"
              value={config.shadow || 'none'}
              onChange={(value) => onUpdate({ shadow: value })}
              options={[
                { value: 'none', label: 'Nessuna ombra' },
                { value: 'light', label: 'Ombra leggera' },
                { value: 'medium', label: 'Ombra media' },
                { value: 'strong', label: 'Ombra pronunciata' }
              ]}
              description="Intensità delle ombreggiature"
            />
          </div>
        </div>
      </PremiumCard>

      {/* Anteprima */}
      <PremiumCard
        title="Anteprima Stile"
        description="Visualizza come apparirà il tuo menu con le impostazioni attuali"
      >
        <div 
          className="p-6 rounded-[12px] border border-slate-200/50 bg-white/60 backdrop-blur-sm"
          style={{
            fontFamily: config.fontFamily || 'Inter'
          }}
        >
          <h3 
            className="text-xl font-bold mb-4 font-geist tracking-[-0.02em]"
            style={{ 
              color: colorThemes.find(t => t.id === config.colorTheme)?.primary || '#1f2937' 
            }}
          >
            Antipasti
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">Bruschetta alla Romana</h4>
                <p className="text-sm text-slate-600 font-medium">
                  Pomodori freschi, basilico e aglio su pane tostato croccante
                </p>
              </div>
              <span 
                className="font-bold text-lg ml-4"
                style={{ 
                  color: colorThemes.find(t => t.id === config.colorTheme)?.secondary || '#6b7280' 
                }}
              >
                €8,00
              </span>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">Antipasto della Casa</h4>
                <p className="text-sm text-slate-600 font-medium">
                  Selezione di salumi, formaggi e verdure grigliate
                </p>
              </div>
              <span 
                className="font-bold text-lg ml-4"
                style={{ 
                  color: colorThemes.find(t => t.id === config.colorTheme)?.secondary || '#6b7280' 
                }}
              >
                €12,00
              </span>
            </div>
          </div>
        </div>
      </PremiumCard>
    </div>
  );
};