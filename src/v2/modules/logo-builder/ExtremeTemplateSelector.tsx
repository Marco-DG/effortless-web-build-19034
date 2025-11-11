import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  getAwardWinningTemplates, 
  getExtremeTemplates, 
  getBasicAdvancedTemplates 
} from './AdvancedLogoTemplates';
import { getTemplatesByComplexity } from './ExtremeDesignTemplates';
import { LogoTemplate } from './types';

interface ExtremeTemplateSelectorProps {
  onSelectTemplate: (template: LogoTemplate) => void;
  className?: string;
}

type TemplateCategory = 'basic' | 'award-winning' | 'extreme' | 'impossible';

export const ExtremeTemplateSelector: React.FC<ExtremeTemplateSelectorProps> = ({
  onSelectTemplate,
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('award-winning');
  const [selectedTemplate, setSelectedTemplate] = useState<LogoTemplate | null>(null);

  // Ottiene i template per categoria
  const getTemplatesByCategory = (category: TemplateCategory) => {
    switch (category) {
      case 'basic':
        return getBasicAdvancedTemplates();
      case 'award-winning':
        return getAwardWinningTemplates();
      case 'extreme':
        return getExtremeTemplates();
      case 'impossible':
        return getTemplatesByComplexity('legendary');
      default:
        return [];
    }
  };

  const templates = getTemplatesByCategory(activeCategory);

  const categories = [
    {
      id: 'basic' as TemplateCategory,
      name: 'Avanzati',
      description: 'Template professionali',
      icon: '⭐',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'award-winning' as TemplateCategory,
      name: 'Award-Winning',
      description: 'Design premiati',
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'extreme' as TemplateCategory,
      name: 'Estremi',
      description: 'Design impossibili',
      icon: '🚀',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'impossible' as TemplateCategory,
      name: 'Leggendari',
      description: 'Capolavori assoluti',
      icon: '💎',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const handleSelectTemplate = (template: LogoTemplate) => {
    setSelectedTemplate(template);
    onSelectTemplate(template);
  };

  // Genera preview SVG per ogni template
  const generatePreview = (template: LogoTemplate) => {
    const elements = template.elements
      .filter(el => el.type !== 'shape' || el.subtype !== 'rectangle' || el.style.fill?.includes('gradient'))
      .slice(0, 4); // Prendi solo alcuni elementi per la preview

    return (
      <svg 
        width="120" 
        height="80" 
        viewBox={`0 0 ${template.canvasSize.width} ${template.canvasSize.height}`}
        className="w-full h-full"
      >
        {elements.map((element, index) => {
          if (element.type === 'text') {
            return (
              <text
                key={element.id}
                x={element.x}
                y={element.y + ((element.style?.fontSize as number) || 16)}
                style={{
                  fontFamily: element.style?.fontFamily || 'Arial',
                  fontSize: Math.max(8, ((element.style?.fontSize as number) || 16) * 0.3),
                  fill: element.style?.color || '#000',
                  fontWeight: element.style?.fontWeight || 'normal'
                }}
              >
                {element.content?.substring(0, 8)}
              </text>
            );
          }
          
          if (element.type === 'shape' && element.subtype === 'circle') {
            return (
              <circle
                key={element.id}
                cx={element.x + element.width / 2}
                cy={element.y + element.height / 2}
                r={Math.min(element.width, element.height) / 2}
                style={{
                  fill: element.style?.fill || '#ccc',
                  stroke: element.style?.stroke || 'none',
                  strokeWidth: element.style?.strokeWidth || 0
                }}
              />
            );
          }
          
          if (element.type === 'shape' && element.subtype === 'rectangle') {
            return (
              <rect
                key={element.id}
                x={element.x}
                y={element.y}
                width={element.width}
                height={element.height}
                style={{
                  fill: element.style?.fill || '#ccc',
                  stroke: element.style?.stroke || 'none',
                  strokeWidth: element.style?.strokeWidth || 0
                }}
              />
            );
          }
          
          return null;
        })}
      </svg>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header con titolo estremo */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🎨 Template Estremi & Award-Winning
        </h2>
        <p className="text-sm text-muted-foreground">
          Design di altissimo valore stilistico per loghi professionali
        </p>
      </div>

      {/* Selettore di categoria */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveCategory(category.id)}
            className={`p-3 rounded-lg border transition-all ${
              activeCategory === category.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="text-center space-y-1">
              <div className="text-lg">{category.icon}</div>
              <div className="text-xs font-semibold">{category.name}</div>
              <div className="text-xs text-muted-foreground">{category.description}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Grid dei template */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <Card 
                className={`p-4 cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedTemplate?.id === template.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleSelectTemplate(template)}
              >
                {/* Preview del template */}
                <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                  {generatePreview(template)}
                </div>
                
                {/* Info del template */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">{template.name}</h3>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Indicatore di complessità */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Complessità:</span>
                    {activeCategory === 'impossible' && <span>💎💎💎</span>}
                    {activeCategory === 'extreme' && <span>🚀🚀</span>}
                    {activeCategory === 'award-winning' && <span>🏆</span>}
                    {activeCategory === 'basic' && <span>⭐</span>}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Info sul template selezionato */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-primary/20">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">{selectedTemplate.name}</h3>
              <p className="text-sm text-muted-foreground">
                Template selezionato con {selectedTemplate.elements.length} elementi
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button 
                onClick={() => handleSelectTemplate(selectedTemplate)} 
                className="w-full mt-3"
              >
                🎨 Usa questo Template
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};