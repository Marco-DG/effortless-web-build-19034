import React from 'react';
import { Wine, Star } from 'lucide-react';
import { PremiumCard } from '../../components/forms';
import { getTemplateDefaults } from '../site-builder/template-defaults';

interface TemplateSelectorProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ project, onUpdate }) => {
  const currentTemplate = project.data.site?.template?.style || 'wine_bar';
  
  // Inizializza automaticamente i defaults se template premium sono selezionati ma mancano dati
  React.useEffect(() => {
    if (currentTemplate === 'michelin_star' || currentTemplate === 'atelier_sarah_chen' || currentTemplate === 'aegean_pearl') {
      const defaults = getTemplateDefaults(currentTemplate);
      const needsInitialization = 
        !project.data.reviews?.testimonials ||
        !project.data.events?.events ||
        !project.data.newsletter?.title ||
        !project.data.hours?.schedule ||
        !project.data.location?.address;
        
      if (needsInitialization) {
        onUpdate({
          // Non sovrascrivere i dati esistenti, aggiungi solo quelli mancanti
          reviews: project.data.reviews?.testimonials ? project.data.reviews : defaults.reviews,
          events: project.data.events?.events ? project.data.events : defaults.events,
          newsletter: project.data.newsletter?.title ? project.data.newsletter : defaults.newsletter,
          hours: project.data.hours?.schedule ? project.data.hours : defaults.hours,
          location: project.data.location?.address ? project.data.location : defaults.location,
        });
      }
    }
  }, [currentTemplate, project.data, onUpdate]);
  
  const selectTemplate = (templateStyle: string) => {
    // Ottieni i defaults per il template selezionato
    const defaults = getTemplateDefaults(templateStyle);
    
    // Se si sta selezionando template premium, inizializza tutti i dati con i defaults
    if (templateStyle === 'michelin_star' || templateStyle === 'atelier_sarah_chen' || templateStyle === 'aegean_pearl') {
      onUpdate({
        site: {
          ...project.data.site,
          template: { 
            ...project.data.site?.template,
            style: templateStyle 
          }
        },
        // Inizializza tutti i dati con i defaults solo se non esistono già
        business: project.data.business?.name ? project.data.business : defaults.business,
        story: project.data.story?.section_title ? project.data.story : defaults.story,
        hero: project.data.hero?.images ? project.data.hero : defaults.hero,
        awards: project.data.awards?.awards_list ? project.data.awards : defaults.awards,
        menu: project.data.menu?.menu_sections ? project.data.menu : defaults.menu,
        gallery: project.data.gallery?.gallery_images ? project.data.gallery : defaults.gallery,
        contact: project.data.contact?.address ? project.data.contact : defaults.contact,
        // Nuove sezioni con defaults
        reviews: project.data.reviews?.testimonials ? project.data.reviews : defaults.reviews,
        events: project.data.events?.events ? project.data.events : defaults.events,
        newsletter: project.data.newsletter?.title ? project.data.newsletter : defaults.newsletter,
        hours: project.data.hours?.schedule ? project.data.hours : defaults.hours,
        location: project.data.location?.address ? project.data.location : defaults.location,
      });
    } else {
      // Per altri template, aggiorna solo il template style
      onUpdate({
        site: {
          ...project.data.site,
          template: { 
            ...project.data.site?.template,
            style: templateStyle 
          }
        }
      });
    }
  };

  const templates = [
    {
      id: 'wine_bar',
      name: 'Wine Bar',
      description: 'Template elegante e raffinato per wine bar, enotece e ristoranti di alta gamma',
      icon: Wine,
      colors: ['#2a1a1d', '#6b3a2e', '#d9b99b'],
      colorNames: ['Nero elegante', 'Marrone caldo', 'Beige dorato']
    },
    {
      id: 'michelin_star',
      name: 'Michelin Star',
      description: 'Template premium per ristoranti stellati con design elegante e raffinato',
      icon: Star,
      colors: ['#0a0a0a', '#1a1a1a', '#fbbf24'],
      colorNames: ['Nero profondo', 'Grigio antracite', 'Oro luxury']
    },
    {
      id: 'aegean_pearl',
      name: 'Aegean Pearl',
      description: 'Ristorante greco luxury con design mediterraneo autentico. Atmosfera delle isole greche con colori del mare e tradizione culinaria.',
      icon: Star,
      colors: ['#1e40af', '#f59e0b', '#f8fafc'],
      colorNames: ['Blu Egeo', 'Oro Olimpico', 'Marmo Bianco']
    }
  ];
  
  return (
    <PremiumCard
      title="Template Design"
      description="Scegli il template base per il design del tuo sito web"
    >
      <div className="space-y-4">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`relative rounded-[16px] border cursor-pointer transition-all duration-300 overflow-hidden ${
              currentTemplate === template.id
                ? 'border-blue-300 bg-gradient-to-br from-blue-50/80 via-blue-50/40 to-blue-50/60 shadow-md'
                : 'border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 shadow-sm hover:border-slate-300/60 hover:shadow-md'
            }`}
            onClick={() => selectTemplate(template.id)}
          >

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-slate-100/80 to-slate-200/60 border border-slate-200/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <template.icon className="w-6 h-6 text-slate-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg text-slate-800 font-geist tracking-[-0.02em]">
                      {template.name}
                    </h3>
                    {currentTemplate === template.id && (
                      <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        Attivo
                      </div>
                    )}
                    {template.id === 'michelin_star' && (
                      <div className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                        Nuovo
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 font-medium font-geist tracking-[-0.01em] leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium font-geist tracking-[-0.005em] mb-2 block">
                      Palette Colori:
                    </span>
                    <div className="flex gap-2">
                      {template.colors.map((color, index) => (
                        <div 
                          key={index}
                          className="w-6 h-6 rounded-[6px] border border-white/50 shadow-sm" 
                          style={{ backgroundColor: color }}
                          title={template.colorNames[index]}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {currentTemplate === template.id ? (
                      <div className="px-3 py-1.5 bg-blue-500 text-white text-xs font-semibold rounded-lg">
                        Selezionato
                      </div>
                    ) : (
                      <button 
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectTemplate(template.id);
                        }}
                      >
                        Seleziona
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PremiumCard>
  );
};