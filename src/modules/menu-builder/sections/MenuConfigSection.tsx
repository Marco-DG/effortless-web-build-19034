import React from 'react';
import { MenuConfig } from '../../../types';
import { PremiumCard, PremiumTextInput, PremiumToggle } from '../../../components/forms';

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
      <PremiumCard
        title="Informazioni Generali"
        description="Configura le informazioni principali del menu"
      >
        <div className="space-y-4">
          <PremiumTextInput
            label="Titolo del Menu"
            value={config.title || 'La Nostra Carta'}
            onChange={(value) => onUpdate({ title: value })}
            placeholder="La Nostra Carta"
            description="Il titolo principale che apparirà in cima al menu"
          />
          
          <PremiumTextInput
            label="Sottotitolo"
            value={config.subtitle || ''}
            onChange={(value) => onUpdate({ subtitle: value })}
            placeholder="Sapori autentici della tradizione italiana"
            description="Un sottotitolo opzionale per descrivere la vostra filosofia"
          />

          <PremiumTextInput
            label="Descrizione"
            value={config.description || ''}
            onChange={(value) => onUpdate({ description: value })}
            placeholder="Una breve descrizione del vostro menu..."
            description="Presentate il vostro menu ai clienti"
            multiline
            rows={3}
          />
        </div>
      </PremiumCard>

      {/* Impostazioni Display */}
      <PremiumCard
        title="Impostazioni Visualizzazione"
        description="Controlla come vengono mostrati gli elementi del menu"
      >
        <div className="space-y-4">
          <PremiumToggle
            label="Mostra prezzi"
            description="Visualizza i prezzi accanto ai piatti nel menu"
            checked={config.showPrices !== false}
            onChange={(checked) => onUpdate({ showPrices: checked })}
          />

          <PremiumToggle
            label="Mostra descrizioni"
            description="Include le descrizioni dettagliate dei piatti"
            checked={config.showDescriptions !== false}
            onChange={(checked) => onUpdate({ showDescriptions: checked })}
          />

          <PremiumToggle
            label="Raggruppa per categoria"
            description="Organizza automaticamente gli elementi per categoria (antipasti, primi, etc.)"
            checked={config.groupByCategory !== false}
            onChange={(checked) => onUpdate({ groupByCategory: checked })}
          />

          <PremiumToggle
            label="Evidenzia piatti speciali"
            description="Metti in risalto visivamente i piatti della casa e le specialità"
            checked={config.highlightFeatured !== false}
            onChange={(checked) => onUpdate({ highlightFeatured: checked })}
          />
        </div>
      </PremiumCard>

      {/* Note Aggiuntive */}
      <PremiumCard
        title="Note e Avvertenze"
        description="Informazioni aggiuntive e importanti per i clienti"
      >
        <div className="space-y-4">
          <PremiumTextInput
            label="Informazioni su allergeni"
            value={config.allergenInfo || ''}
            onChange={(value) => onUpdate({ allergenInfo: value })}
            placeholder="Es: Informate il personale di eventuali allergie o intolleranze alimentari..."
            description="Note importanti su allergeni e intolleranze"
            multiline
            rows={2}
          />

          <PremiumTextInput
            label="Note a piè di pagina"
            value={config.footerNote || ''}
            onChange={(value) => onUpdate({ footerNote: value })}
            placeholder="Es: I prezzi sono comprensivi di IVA e servizio..."
            description="Informazioni sui prezzi, servizio e altre note generali"
            multiline
            rows={2}
          />
        </div>
      </PremiumCard>
    </div>
  );
};