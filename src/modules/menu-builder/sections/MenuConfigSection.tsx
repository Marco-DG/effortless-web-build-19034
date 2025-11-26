import React from 'react';
import { MenuConfig } from '../../../types';
import { CleanFormField, CleanTextInput, CleanToggle } from '../../../components/forms';

interface MenuConfigSectionProps {
  config: MenuConfig;
  onUpdate: (updates: Partial<MenuConfig>) => void;
}

export const MenuConfigSection: React.FC<MenuConfigSectionProps> = ({
  config,
  onUpdate
}) => {
  return (
    <div className="space-y-6">
      {/* Informazioni Base */}
      <div className="space-y-4 border border-slate-200 rounded-lg p-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-semibold text-lg text-slate-900">Informazioni Generali</h3>
          <p className="text-sm text-slate-600 mt-1">Configura le informazioni principali del menu</p>
        </div>
        
        <div className="space-y-4">
          <CleanFormField
            label="Titolo del Menu"
            description="Il titolo principale che apparirà in cima al menu"
          >
            <CleanTextInput
              value={config.title || 'La Nostra Carta'}
              onChange={(value) => onUpdate({ title: value })}
              placeholder="La Nostra Carta"
            />
          </CleanFormField>
          
          <CleanFormField
            label="Sottotitolo"
            description="Un sottotitolo opzionale per descrivere la vostra filosofia"
          >
            <CleanTextInput
              value={config.subtitle || ''}
              onChange={(value) => onUpdate({ subtitle: value })}
              placeholder="Sapori autentici della tradizione italiana"
            />
          </CleanFormField>

          <CleanFormField
            label="Descrizione"
            description="Presentate il vostro menu ai clienti"
          >
            <textarea
              value={config.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Una breve descrizione del vostro menu..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </CleanFormField>
        </div>
      </div>

      {/* Impostazioni Display */}
      <div className="space-y-4 border border-slate-200 rounded-lg p-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-semibold text-lg text-slate-900">Impostazioni Visualizzazione</h3>
          <p className="text-sm text-slate-600 mt-1">Controlla come vengono mostrati gli elementi del menu</p>
        </div>
        
        <div className="space-y-4">
          <CleanFormField
            label="Mostra prezzi"
            description="Visualizza i prezzi accanto ai piatti nel menu"
          >
            <CleanToggle
              checked={config.showPrices !== false}
              onChange={(checked) => onUpdate({ showPrices: checked })}
            />
          </CleanFormField>

          <CleanFormField
            label="Mostra descrizioni"
            description="Include le descrizioni dettagliate dei piatti"
          >
            <CleanToggle
              checked={config.showDescriptions !== false}
              onChange={(checked) => onUpdate({ showDescriptions: checked })}
            />
          </CleanFormField>

          <CleanFormField
            label="Raggruppa per categoria"
            description="Organizza automaticamente gli elementi per categoria (antipasti, primi, etc.)"
          >
            <CleanToggle
              checked={config.groupByCategory !== false}
              onChange={(checked) => onUpdate({ groupByCategory: checked })}
            />
          </CleanFormField>

          <CleanFormField
            label="Evidenzia piatti speciali"
            description="Metti in risalto visivamente i piatti della casa e le specialità"
          >
            <CleanToggle
              checked={config.highlightFeatured !== false}
              onChange={(checked) => onUpdate({ highlightFeatured: checked })}
            />
          </CleanFormField>
        </div>
      </div>

      {/* Note Aggiuntive */}
      <div className="space-y-4 border border-slate-200 rounded-lg p-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-semibold text-lg text-slate-900">Note e Avvertenze</h3>
          <p className="text-sm text-slate-600 mt-1">Informazioni aggiuntive e importanti per i clienti</p>
        </div>
        
        <div className="space-y-4">
          <CleanFormField
            label="Informazioni su allergeni"
            description="Note importanti su allergeni e intolleranze"
          >
            <textarea
              value={config.allergenInfo || ''}
              onChange={(e) => onUpdate({ allergenInfo: e.target.value })}
              placeholder="Es: Informate il personale di eventuali allergie o intolleranze alimentari..."
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </CleanFormField>

          <CleanFormField
            label="Note a piè di pagina"
            description="Informazioni sui prezzi, servizio e altre note generali"
          >
            <textarea
              value={config.footerNote || ''}
              onChange={(e) => onUpdate({ footerNote: e.target.value })}
              placeholder="Es: I prezzi sono comprensivi di IVA e servizio..."
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </CleanFormField>
        </div>
      </div>
    </div>
  );
};