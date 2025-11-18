import React from 'react';
import { CleanSectionHeader, CleanFormField, CleanTextInput, CleanInfoBox } from './index';
import { getTemplateDefaults } from '../../modules/site-builder/template-defaults';
import { createNestedUpdater } from '../../modules/site-builder/utils';

interface EditorProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const CleanBusinessInfoEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data?.site?.template?.style || 'michelin_star';
  const defaults = getTemplateDefaults(currentTemplate);
  const updateBusiness = createNestedUpdater(project, onUpdate, 'business');
  
  const businessData = project.data?.business || {};
  
  const name = React.useMemo(() => 
    businessData.name !== undefined ? businessData.name : (defaults.business?.name || ''), 
    [businessData.name, defaults.business?.name]
  );
  
  const tagline = React.useMemo(() => 
    businessData.tagline !== undefined ? businessData.tagline : (defaults.business?.tagline || ''), 
    [businessData.tagline, defaults.business?.tagline]
  );
  
  const description = React.useMemo(() => 
    businessData.description !== undefined ? businessData.description : (defaults.business?.description || ''), 
    [businessData.description, defaults.business?.description]
  );
  
  return (
    <div className="space-y-6">
      <CleanSectionHeader
        title="Informazioni Base del Ristorante"
        description="Dettagli principali che definiscono la vostra identità culinaria"
      />
      
      <div className="space-y-5">
        <CleanFormField
          label="Nome Ristorante"
          description="Il nome del vostro ristorante (massima eleganza)"
          required
        >
          <CleanTextInput
            value={name}
            onChange={(value) => updateBusiness('name', value)}
            placeholder="Es. Le Bernardin, Osteria Francescana..."
          />
        </CleanFormField>
        
        <CleanFormField
          label="Sottotitolo/Riconoscimenti"
          description="Stelle Michelin, location, o breve tagline di prestigio"
        >
          <CleanTextInput
            value={tagline}
            onChange={(value) => updateBusiness('tagline', value)}
            placeholder="Es. ★★★ Michelin • Milano, Tres estrellas Michelin..."
          />
        </CleanFormField>
        
        <CleanFormField
          label="Descrizione Principale"
          description="Una frase evocativa che descrive la vostra esperienza culinaria"
        >
          <CleanTextInput
            value={description}
            onChange={(value) => updateBusiness('description', value)}
            placeholder="Es. Une expérience culinaire transcendante où chaque plat raconte une histoire..."
            multiline
            rows={3}
          />
          <p className="text-xs text-slate-500 mt-2">
            Pensa a parole evocative: transcendante, sublimazione, poetry, artistry...
          </p>
        </CleanFormField>
      </div>
      
      <CleanInfoBox type="tip" title="✨ Suggerimenti Premium">
        <ul className="space-y-1">
          <li>• Utilizza un linguaggio evocativo ed emotivo</li>
          <li>• Menziona riconoscimenti senza essere eccessivo</li>
          <li>• Pensa all'esperienza che vuoi trasmettere</li>
          <li>• Massimo 150 caratteri per la descrizione</li>
        </ul>
      </CleanInfoBox>
    </div>
  );
};