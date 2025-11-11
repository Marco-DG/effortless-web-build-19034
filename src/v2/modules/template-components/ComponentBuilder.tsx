import React, { useState } from 'react';
import { TemplateComponent, ComponentType, ComponentCategory } from './types';
import { COMPONENT_REGISTRY, getComponentsByCategory } from './component-registry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PenTool, Type, Palette, LayoutTemplate, Navigation, Monitor, Info, 
  UtensilsCrossed, Star, Clock, Phone, Mail, MapPin, Camera, Calendar,
  Settings, Plus, Eye, EyeOff, GripVertical, Trash2
} from 'lucide-react';

interface ComponentBuilderProps {
  selectedComponents: ComponentType[];
  onUpdateComponents: (components: ComponentType[]) => void;
  onEditComponent?: (componentType: ComponentType) => void;
  templateType?: string;
}

const CATEGORY_CONFIG = {
  brand: { label: 'Brand & Identità', icon: PenTool, color: 'bg-purple-500' },
  structure: { label: 'Struttura & Layout', icon: LayoutTemplate, color: 'bg-blue-500' },
  content: { label: 'Contenuti', icon: Info, color: 'bg-green-500' },
  business: { label: 'Business', icon: UtensilsCrossed, color: 'bg-orange-500' },
  social: { label: 'Social Proof', icon: Star, color: 'bg-yellow-500' },
  media: { label: 'Media', icon: Camera, color: 'bg-pink-500' },
  interaction: { label: 'Interazione', icon: Phone, color: 'bg-indigo-500' },
  promotion: { label: 'Promozioni', icon: Calendar, color: 'bg-red-500' },
  technical: { label: 'Tecnico', icon: Settings, color: 'bg-gray-500' }
} as const;

export const ComponentBuilder: React.FC<ComponentBuilderProps> = ({
  selectedComponents,
  onUpdateComponents,
  onEditComponent,
  templateType = 'fine-dining'
}) => {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('brand');

  const handleToggleComponent = (componentId: ComponentType) => {
    const isSelected = selectedComponents.includes(componentId);
    const component = COMPONENT_REGISTRY[componentId];
    
    if (component.isRequired) return; // Non si possono disabilitare componenti required
    
    if (isSelected) {
      onUpdateComponents(selectedComponents.filter(id => id !== componentId));
    } else {
      onUpdateComponents([...selectedComponents, componentId]);
    }
  };

  const handleMoveComponent = (componentId: ComponentType, direction: 'up' | 'down') => {
    const currentIndex = selectedComponents.indexOf(componentId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= selectedComponents.length) return;
    
    const newOrder = [...selectedComponents];
    [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];
    onUpdateComponents(newOrder);
  };

  const categoryComponents = getComponentsByCategory(activeCategory);
  const selectedCategoryComponents = categoryComponents.filter(comp => 
    selectedComponents.includes(comp.type)
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-2">Componenti Template</h3>
        <p className="text-sm text-muted-foreground">
          Scegli e configura i componenti per il tuo template
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as ComponentCategory)}>
          {/* Tab List */}
          <div className="border-b bg-white sticky top-0 z-10">
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="w-full justify-start h-auto p-2 bg-transparent">
                {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
                  const count = getComponentsByCategory(key as ComponentCategory).filter(comp => 
                    selectedComponents.includes(comp.type)
                  ).length;
                  
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex items-center gap-2 px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <config.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{config.label}</span>
                      {count > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {count}
                        </Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </ScrollArea>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-h-0">
            {Object.keys(CATEGORY_CONFIG).map(category => (
              <TabsContent 
                key={category} 
                value={category}
                className="h-full m-0 p-0 data-[state=active]:flex data-[state=active]:flex-col"
              >
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    <CategoryComponentList
                      category={category as ComponentCategory}
                      selectedComponents={selectedComponents}
                      onToggleComponent={handleToggleComponent}
                      onEditComponent={onEditComponent || (() => {})}
                      onMoveComponent={handleMoveComponent}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

interface CategoryComponentListProps {
  category: ComponentCategory;
  selectedComponents: ComponentType[];
  onToggleComponent: (id: ComponentType) => void;
  onEditComponent: (id: ComponentType | null) => void;
  onMoveComponent: (id: ComponentType, direction: 'up' | 'down') => void;
}

const CategoryComponentList: React.FC<CategoryComponentListProps> = ({
  category,
  selectedComponents,
  onToggleComponent,
  onEditComponent,
  onMoveComponent
}) => {
  const components = getComponentsByCategory(category);
  const selectedCategoryComponents = components.filter(comp => 
    selectedComponents.includes(comp.type)
  );
  const availableComponents = components.filter(comp => 
    !selectedComponents.includes(comp.type) && !comp.isRequired
  );
  
  return (
    <div className="space-y-6">
      {/* Componenti Attivi */}
      {selectedCategoryComponents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="w-4 h-4 text-green-600" />
              Componenti Attivi
            </CardTitle>
            <CardDescription>
              Componenti attualmente utilizzati in questa categoria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedCategoryComponents
              .sort((a, b) => selectedComponents.indexOf(a.type) - selectedComponents.indexOf(b.type))
              .map(component => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  isActive={true}
                  isRequired={component.isRequired}
                  onToggle={() => onToggleComponent(component.type)}
                  onEdit={() => onEditComponent(component.type)}
                  onMove={(direction) => onMoveComponent(component.type, direction)}
                  showMoveControls={selectedCategoryComponents.length > 1}
                />
              ))
            }
          </CardContent>
        </Card>
      )}

      {/* Componenti Disponibili */}
      {availableComponents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              Componenti Disponibili
            </CardTitle>
            <CardDescription>
              Aggiungi componenti per arricchire il tuo template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableComponents.map(component => (
              <ComponentCard
                key={component.id}
                component={component}
                isActive={false}
                isRequired={false}
                onToggle={() => onToggleComponent(component.type)}
                onEdit={() => onEditComponent(component.type)}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Componenti Required (sempre visibili) */}
      {components.some(comp => comp.isRequired) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-600" />
              Componenti Obbligatori
            </CardTitle>
            <CardDescription>
              Questi componenti sono sempre presenti e non possono essere rimossi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {components.filter(comp => comp.isRequired).map(component => (
              <ComponentCard
                key={component.id}
                component={component}
                isActive={true}
                isRequired={true}
                onToggle={() => {}} // Non fa nulla per i required
                onEdit={() => onEditComponent(component.type)}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface ComponentCardProps {
  component: TemplateComponent;
  isActive: boolean;
  isRequired: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onMove?: (direction: 'up' | 'down') => void;
  showMoveControls?: boolean;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  isActive,
  isRequired,
  onToggle,
  onEdit,
  onMove,
  showMoveControls = false
}) => {
  const IconComponent = getIconComponent(component.icon);
  
  return (
    <div className={`flex items-center gap-3 p-3 border rounded-lg transition-colors ${
      isActive ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-muted/50'
    }`}>
      {/* Drag Handle */}
      {showMoveControls && (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onMove?.('up')}
            className="p-1 hover:bg-white rounded transition-colors"
          >
            <GripVertical className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Toggle Switch */}
      <Switch
        checked={isActive}
        onCheckedChange={onToggle}
        disabled={isRequired}
        className="flex-shrink-0"
      />

      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isActive ? 'bg-white shadow-sm' : 'bg-muted'
      }`}>
        <IconComponent className="w-5 h-5 text-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-sm">{component.name}</h4>
          {isRequired && (
            <Badge variant="outline" className="text-xs">
              Obbligatorio
            </Badge>
          )}
          {component.variants.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {component.variants.length} varianti
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {component.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0"
        >
          <Settings className="w-3 h-3" />
        </Button>
        
        {showMoveControls && onMove && (
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove('up')}
              className="h-4 w-4 p-0 text-xs"
            >
              ↑
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove('down')}
              className="h-4 w-4 p-0 text-xs"
            >
              ↓
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function per ottenere il componente icona
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    PenTool, Type, Palette, LayoutTemplate, Navigation, Monitor, Info,
    UtensilsCrossed, Star, Clock, Phone, Mail, MapPin, Camera, Calendar, Settings
  };
  return icons[iconName] || Settings;
};