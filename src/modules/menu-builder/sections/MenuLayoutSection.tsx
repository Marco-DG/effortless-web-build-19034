import React from 'react';
import { MenuConfig } from '../../../types';
import { CleanFormField, CleanToggle } from '../../../components/forms';

interface MenuLayoutSectionProps {
  config: MenuConfig;
  onUpdate: (updates: Partial<MenuConfig>) => void;
}

export const MenuLayoutSection: React.FC<MenuLayoutSectionProps> = ({
  config,
  onUpdate
}) => {
  const layoutOptions = [
    { 
      value: 'single-column', 
      label: 'Colonna Singola', 
      description: 'Layout verticale tradizionale, facile da scorrere',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    },
    { 
      value: 'two-columns', 
      label: 'Due Colonne', 
      description: 'Layout a due colonne per desktop, più compatto',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      )
    },
    { 
      value: 'grid', 
      label: 'Griglia', 
      description: 'Layout a griglia responsive per menu moderni',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75A1.125 1.125 0 004.5 19.5m3-6.75h2.25m-2.25 0a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h2.25M7.5 12.75a.75.75 0 00.75.75v2.25a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-2.25a.75.75 0 00-.75-.75zm2.25-2.25h.008v.008H9.75V10.5zm1.5 0h.008v.008h-.008V10.5zm0 1.5h.008v.008h-.008V12zm1.5 0h.008v.008H12V12zm1.5 0h.008v.008h-.008V12zm0-1.5h.008v.008H12V10.5zm1.5 0h.008v.008h-.008V10.5zm0 1.5h.008v.008h-.008V12zm1.5 0h.008v.008H15V12zm1.5 0h.008v.008h-.008V12z" />
        </svg>
      )
    },
    { 
      value: 'list', 
      label: 'Lista', 
      description: 'Lista semplice e pulita, ideale per menu essenziali',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      )
    }
  ];

  const categoryStyles = [
    { 
      value: 'headers', 
      label: 'Header Grandi', 
      description: 'Titoli di categoria prominenti e ben visibili',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
        </svg>
      )
    },
    { 
      value: 'tabs', 
      label: 'Tab Orizzontali', 
      description: 'Navigazione a tab per categorie, stile moderno',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>
      )
    },
    { 
      value: 'minimal', 
      label: 'Minimale', 
      description: 'Separatori sottili per un look pulito',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      )
    },
    { 
      value: 'cards', 
      label: 'Card Separate', 
      description: 'Ogni categoria in una card distinta',
      icon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Layout Generale */}
      <CleanFormField
        label="Layout Generale"
        description="Scegli la struttura principale del tuo menu"
      >
        <div className="grid grid-cols-2 gap-4">
          {layoutOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onUpdate({ layout: option.value })}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                (config.layout || 'single-column') === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <option.icon />
                <span className="font-medium text-slate-900">{option.label}</span>
              </div>
              <p className="text-sm text-slate-600">{option.description}</p>
            </button>
          ))}
        </div>
      </CleanFormField>

      {/* Stile Categorie */}
      <CleanFormField
        label="Stile Categorie"
        description="Come visualizzare le sezioni del menu (Antipasti, Primi, etc.)"
      >
        <div className="grid grid-cols-2 gap-4">
          {categoryStyles.map((option) => (
            <button
              key={option.value}
              onClick={() => onUpdate({ categoryStyle: option.value })}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                (config.categoryStyle || 'headers') === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <option.icon />
                <span className="font-medium text-slate-900">{option.label}</span>
              </div>
              <p className="text-sm text-slate-600">{option.description}</p>
            </button>
          ))}
        </div>
      </CleanFormField>

      {/* Opzioni di Visualizzazione */}
      <div className="space-y-4 border border-slate-200 rounded-lg p-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-semibold text-lg text-slate-900">Opzioni di Visualizzazione</h3>
          <p className="text-sm text-slate-600 mt-1">Controlla elementi aggiuntivi e funzionalità del menu</p>
        </div>
        
        <div className="space-y-4">
          <CleanFormField
            label="Mostra indice categorie"
            description="Aggiungi un indice navigabile all'inizio del menu"
          >
            <CleanToggle
              checked={config.showCategoryIndex !== false}
              onChange={(checked) => onUpdate({ showCategoryIndex: checked })}
            />
          </CleanFormField>

          <CleanFormField
            label="Numerazione elementi"
            description="Aggiungi numeri progressivi agli elementi del menu"
          >
            <CleanToggle
              checked={config.showItemNumbers === true}
              onChange={(checked) => onUpdate({ showItemNumbers: checked })}
            />
          </CleanFormField>

          <CleanFormField
            label="Icone categoria"
            description="Mostra icone decorative accanto ai titoli delle categorie"
          >
            <CleanToggle
              checked={config.showCategoryIcons === true}
              onChange={(checked) => onUpdate({ showCategoryIcons: checked })}
            />
          </CleanFormField>

          <CleanFormField
            label="Separatori visuali"
            description="Aggiungi linee o separatori tra le sezioni"
          >
            <CleanToggle
              checked={config.showSeparators !== false}
              onChange={(checked) => onUpdate({ showSeparators: checked })}
            />
          </CleanFormField>

          <CleanFormField
            label="Layout responsive"
            description="Ottimizza automaticamente il layout per dispositivi mobili"
          >
            <CleanToggle
              checked={config.responsiveLayout !== false}
              onChange={(checked) => onUpdate({ responsiveLayout: checked })}
            />
          </CleanFormField>
        </div>
      </div>
    </div>
  );
};