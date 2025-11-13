import React, { useState } from 'react';
import { MenuConfig, MenuItem } from '../../types';
import { PreviewLayout } from '../../ui/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '../../ui/Button';
import { cn } from '@/lib/utils';

interface MenuPreviewProps {
  config: MenuConfig & { items: MenuItem[] };
  themeColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const categoryLabels: Record<string, string> = {
  antipasti: 'Antipasti',
  primi: 'Primi Piatti',
  secondi: 'Secondi Piatti',
  dessert: 'Dessert',
  bevande: 'Bevande',
  cocktail: 'Cocktail',
  vini: 'Vini',
  altro: 'Altro'
};

export const MenuPreview: React.FC<MenuPreviewProps> = ({ 
  config, 
  themeColors = { primary: '#8B4513', secondary: '#D2691E', accent: '#F4E4C1' }
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('tutti');

  const categories = Array.from(new Set(config.items.map(item => item.category)));
  const filteredItems = selectedCategory === 'tutti' 
    ? config.items 
    : config.items.filter(item => item.category === selectedCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <PreviewLayout mode="menu">
      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ color: themeColors.primary }}
            >
              {config.title || 'Il Nostro Menu'}
            </h1>
            {config.subtitle && (
              <p className="text-lg text-muted-foreground">{config.subtitle}</p>
            )}
          </div>

          {/* Category Filters */}
          {config.categoriesAsFilter && categories.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <Button
                variant={selectedCategory === 'tutti' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('tutti')}
                style={selectedCategory === 'tutti' ? { 
                  backgroundColor: themeColors.primary,
                  color: 'white'
                } : {}}
              >
                Tutti
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  style={selectedCategory === category ? { 
                    backgroundColor: themeColors.primary,
                    color: 'white'
                  } : {}}
                >
                  {categoryLabels[category] || category}
                </Button>
              ))}
            </div>
          )}

          {/* Menu Items */}
          {config.items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nessun elemento nel menu. Aggiungi il primo piatto!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  {config.showCategories && (
                    <h2 
                      className="text-2xl font-semibold mb-4 pb-2 border-b-2"
                      style={{ 
                        color: themeColors.primary,
                        borderColor: themeColors.secondary
                      }}
                    >
                      {categoryLabels[category] || category}
                    </h2>
                  )}

                  {config.layout === 'list' ? (
                    <div className="space-y-4">
                      {items.map(item => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          config={config}
                          themeColors={themeColors}
                          layout="list"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className={cn(
                      'grid gap-4',
                      config.columns === 1 && 'grid-cols-1',
                      config.columns === 2 && 'grid-cols-1 md:grid-cols-2',
                      config.columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    )}>
                      {items.map(item => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          config={config}
                          themeColors={themeColors}
                          layout="card"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PreviewLayout>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  config: MenuConfig;
  themeColors: { primary: string; secondary: string; accent: string };
  layout: 'list' | 'card';
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  config,
  themeColors,
  layout
}) => {
  if (layout === 'list') {
    return (
      <div className="flex justify-between items-start gap-4 py-4 border-b border-border last:border-b-0">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-2">
            <h3 
              className="font-semibold text-lg"
              style={{ color: themeColors.primary }}
            >
              {item.name}
            </h3>
            {config.showBadges && item.badges?.map(badge => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
            {item.featured && (
              <Badge className="text-xs bg-amber-100 text-amber-800">
                In evidenza
              </Badge>
            )}
          </div>
          
          {config.showDescriptions && item.description && (
            <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
          )}
          
          {item.allergens && item.allergens.length > 0 && (
            <p className="text-xs text-orange-600">
              ⚠️ Allergeni: {item.allergens.join(', ')}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4 flex-shrink-0">
          {config.showImages && item.imageUrl && (
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          )}
          {config.showPrices && (
            <span 
              className="font-semibold text-lg"
              style={{ color: themeColors.secondary }}
            >
              {item.price}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      {config.showImages && item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-32 rounded-lg object-cover mb-3"
        />
      )}
      
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 
            className="font-semibold"
            style={{ color: themeColors.primary }}
          >
            {item.name}
          </h3>
          {config.showPrices && (
            <span 
              className="font-semibold"
              style={{ color: themeColors.secondary }}
            >
              {item.price}
            </span>
          )}
        </div>
        
        {config.showBadges && (
          <div className="flex flex-wrap gap-1">
            {item.badges?.map(badge => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
            {item.featured && (
              <Badge className="text-xs bg-amber-100 text-amber-800">
                In evidenza
              </Badge>
            )}
          </div>
        )}
        
        {config.showDescriptions && item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
        
        {item.allergens && item.allergens.length > 0 && (
          <p className="text-xs text-orange-600">
            ⚠️ Allergeni: {item.allergens.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};