import React, { useState } from 'react';
import { Template } from './types';
import { TEMPLATES } from './templates-data';
import { TemplateSelector } from './TemplateSelector';
import { TemplateCustomizer } from './TemplateCustomizer';
import { useAppStore } from '../../store/app-store';

type TemplateManagerMode = 'select' | 'customize';

export const TemplateManager: React.FC = () => {
  const { activeProject, updateProject } = useAppStore();
  const [mode, setMode] = useState<TemplateManagerMode>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  if (!activeProject) return null;

  const currentTemplate = TEMPLATES.find(t => t.id === activeProject.data.site.template) || TEMPLATES[0];

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setMode('customize');
  };

  const handleBackToSelector = () => {
    setMode('select');
    setSelectedTemplate(null);
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;

    // Aggiorna il progetto con il nuovo template
    updateProject({
      site: {
        ...activeProject.data.site,
        template: selectedTemplate.id,
        theme: selectedTemplate.theme,
        // Aggiorna anche le sezioni se necessario
        sections: selectedTemplate.sections.map(sectionConfig => {
          // Trova se la sezione esiste già
          const existingSection = activeProject.data.site.sections?.find(
            s => s.type === sectionConfig.type
          );
          
          return existingSection || {
            id: `${sectionConfig.type}_${Date.now()}`,
            type: sectionConfig.type,
            enabled: sectionConfig.defaultEnabled,
            order: selectedTemplate.sections.indexOf(sectionConfig),
            data: sectionConfig.data || {}
          };
        })
      }
    });

    // Torna alla selezione
    setMode('select');
    setSelectedTemplate(null);
  };

  const handleUpdateTemplate = (updates: Partial<Template>) => {
    if (!selectedTemplate) return;
    
    setSelectedTemplate({
      ...selectedTemplate,
      ...updates
    });
  };

  return (
    <div className="space-y-6">
      {mode === 'select' ? (
        <TemplateSelector
          onSelectTemplate={handleSelectTemplate}
          selectedTemplate={currentTemplate}
        />
      ) : (
        <TemplateCustomizer
          template={selectedTemplate!}
          onUpdateTemplate={handleUpdateTemplate}
          onBack={handleBackToSelector}
          onSave={handleSaveTemplate}
        />
      )}
    </div>
  );
};