import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Template, TemplateCategory, TEMPLATE_CATEGORIES } from './types';
import { TEMPLATES } from './templates-data';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Crown, 
  Check, 
  Eye, 
  Filter,
  Grid3X3,
  List,
  Palette,
  Sparkles
} from 'lucide-react';

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
  selectedTemplate?: Template;
  onClose?: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
  selectedTemplate,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.features.some(feature => 
                           feature.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Palette className="w-7 h-7 text-primary" />
            Scegli Template
          </h3>
          <p className="text-muted-foreground mt-1">
            Seleziona uno stile per il tuo ristorante ({filteredTemplates.length} template disponibili)
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-primary/10' : ''}
          >
            <Filter className="w-4 h-4" />
          </Button>
          
          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-2"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-2"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Cerca template per nome, stile o caratteristiche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card>
                <CardContent className="p-4">
                  <div>
                    <h4 className="font-semibold mb-3">Categoria</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory('all')}
                      >
                        Tutti ({TEMPLATES.length})
                      </Button>
                      {TEMPLATE_CATEGORIES.map(category => {
                        const count = TEMPLATES.filter(t => t.category === category.id).length;
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(category.id as TemplateCategory)}
                          >
                            {category.label} ({count})
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Templates Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={() => onSelectTemplate(template)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTemplates.map(template => (
            <TemplateListItem
              key={template.id}
              template={template}
              isSelected={selectedTemplate?.id === template.id}
              onSelect={() => onSelectTemplate(template)}
            />
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nessun template trovato</h3>
          <p className="text-muted-foreground">
            Prova a cambiare i filtri di ricerca o la categoria
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-4"
          >
            Cancella filtri
          </Button>
        </div>
      )}
    </div>
  );
};

// Template Card Component
const TemplateCard: React.FC<{
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ template, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryInfo = TEMPLATE_CATEGORIES.find(c => c.id === template.category);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 relative overflow-hidden ${
          isSelected 
            ? 'ring-2 ring-primary ring-offset-2 shadow-xl' 
            : 'hover:shadow-lg'
        }`}
        onClick={onSelect}
      >
        {/* Preview Image */}
        <div className="relative h-48 bg-gradient-to-br overflow-hidden">
          <div 
            className="w-full h-full opacity-90"
            style={{
              background: `linear-gradient(135deg, ${template.theme.colors.primary}15, ${template.theme.colors.secondary}15)`
            }}
          />
          
          {/* Template Preview Mockup */}
          <div className="absolute inset-4 bg-white rounded-lg shadow-lg overflow-hidden">
            <div 
              className="h-8"
              style={{ backgroundColor: template.theme.colors.primary }}
            />
            <div className="p-3 space-y-2">
              <div 
                className="h-2 rounded"
                style={{ backgroundColor: template.theme.colors.text, opacity: 0.8 }}
              />
              <div 
                className="h-1 w-3/4 rounded"
                style={{ backgroundColor: template.theme.colors.textSecondary, opacity: 0.6 }}
              />
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div 
                  className="h-8 rounded"
                  style={{ backgroundColor: template.theme.colors.accent, opacity: 0.3 }}
                />
                <div 
                  className="h-8 rounded"
                  style={{ backgroundColor: template.theme.colors.secondary, opacity: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Premium Badge */}
          {template.isPremium && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          )}

          {/* Selected Check */}
          {isSelected && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Hover Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <Button variant="secondary" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Anteprima
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{template.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  {categoryInfo?.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Color Palette Preview */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground mr-2">Colori:</span>
              <div 
                className="w-4 h-4 rounded-full border border-border" 
                style={{ backgroundColor: template.theme.colors.primary }}
              />
              <div 
                className="w-4 h-4 rounded-full border border-border" 
                style={{ backgroundColor: template.theme.colors.secondary }}
              />
              <div 
                className="w-4 h-4 rounded-full border border-border" 
                style={{ backgroundColor: template.theme.colors.accent }}
              />
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {template.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {template.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{template.features.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Template List Item Component
const TemplateListItem: React.FC<{
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ template, isSelected, onSelect }) => {
  const categoryInfo = TEMPLATE_CATEGORIES.find(c => c.id === template.category);

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-primary ring-offset-2 shadow-lg' 
          : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Mini Preview */}
          <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden border">
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${template.theme.colors.primary}20, ${template.theme.colors.secondary}20)`
              }}
            />
            <div className="absolute inset-1 bg-white rounded overflow-hidden">
              <div 
                className="h-2"
                style={{ backgroundColor: template.theme.colors.primary }}
              />
            </div>
            
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-lg">{template.name}</h4>
              {template.isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {categoryInfo?.label}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {template.description}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {template.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <span className="text-xs text-muted-foreground">Palette</span>
            <div className="flex gap-1">
              <div 
                className="w-3 h-3 rounded-full border" 
                style={{ backgroundColor: template.theme.colors.primary }}
              />
              <div 
                className="w-3 h-3 rounded-full border" 
                style={{ backgroundColor: template.theme.colors.secondary }}
              />
              <div 
                className="w-3 h-3 rounded-full border" 
                style={{ backgroundColor: template.theme.colors.accent }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};