import { BuilderData, MenuItem, MenuCategory } from "@/types/builder";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";

interface SiteMenuProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  variant?: "default" | "wine";
}

const categoryLabels: Record<MenuCategory, string> = {
  antipasti: "Antipasti",
  primi: "Primi Piatti",
  secondi: "Secondi Piatti",
  dessert: "Dessert",
  cocktail: "Cocktail",
  birre: "Birre",
  vini: "Vini",
  bevande: "Bevande",
  altro: "Altro",
};

export const SiteMenu = ({ data, templateColors, variant = "default" }: SiteMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "tutti">("tutti");
  const cfg = data.menuConfig || { title: "Il Nostro Menu", subtitle: "", layout: "list" as const, columns: 2, showFilters: true, showImages: true, showBadges: true, showIngredients: false, showAllergens: false, highlightCategory: "none" };

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  const categories = useMemo(() => Array.from(new Set(data.menuItems.map((item) => item.category))) as MenuCategory[], [data.menuItems]);

  const filteredItems = selectedCategory === "tutti" ? data.menuItems : data.menuItems.filter((item) => item.category === selectedCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<MenuCategory, MenuItem[]>);

  if (data.menuItems.length === 0) {
    return (
      <section id="menu" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold mb-8" style={{ color: primaryColor }}>
            {cfg.title || "Il Nostro Menu"}
          </h3>
          {cfg.subtitle && <p className="text-gray-600">{cfg.subtitle}</p>}
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className={variant === 'wine' ? "py-20 px-6 bg-[#151212] text-white" : "py-20 px-6 bg-white"}>
      <div className={variant === 'wine' ? "mx-auto max-w-6xl" : "container mx-auto max-w-6xl"}>
        <h3 className={`text-4xl md:text-5xl font-bold text-center mb-2 ${variant === 'wine' ? 'text-white' : ''}`} style={variant === 'wine' ? { color: 'inherit' } : { color: primaryColor }}>
          {cfg.title || "Il Nostro Menu"}
        </h3>
        {cfg.subtitle && (
          <p className={`text-center mb-8 ${variant === 'wine' ? 'text-white/80' : 'text-gray-600'}`}>{cfg.subtitle}</p>
        )}

        {cfg.showFilters && categories.length > 1 && (
          <div className={`mb-12 ${variant === 'wine' ? 'flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4' : 'flex flex-wrap gap-2 justify-center'}`}>
            <button
              onClick={() => setSelectedCategory("tutti")}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === "tutti"
                  ? variant === 'wine' ? 'text-[#0f0d0d]' : 'text-white'
                  : variant === 'wine' ? 'bg-white/10 text-white/80 hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedCategory === "tutti" ? (variant === 'wine' ? { backgroundColor: templateColors?.accent || '#d9b99b' } : { backgroundColor: primaryColor }) : {}}
            >
              Tutti
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? variant === 'wine' ? 'text-[#0f0d0d]' : 'text-white'
                    : variant === 'wine' ? 'bg-white/10 text-white/80 hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedCategory === category ? (variant === 'wine' ? { backgroundColor: templateColors?.accent || '#d9b99b' } : { backgroundColor: primaryColor }) : {}}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-12">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className={`space-y-6 ${cfg.highlightCategory === category ? 'ring-1 ring-offset-2 ring-[var(--accent,_#D2691E)] rounded-lg p-2' : ''}`}>
              <h4 className="text-2xl font-bold border-b-2 pb-2" style={{ borderColor: secondaryColor, color: primaryColor }}>
                {categoryLabels[category as MenuCategory]}
              </h4>
              {cfg.layout === 'list' ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className={`flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-4 border-b transition-colors ${variant === 'wine' ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h5 className="font-bold text-lg" style={{ color: primaryColor }}>
                            {item.name}
                          </h5>
                          {cfg.showBadges && item.badges && item.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.badges.map((badge, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{badge}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        {item.description && (
                          <p className={`${variant === 'wine' ? 'text-white/70' : 'text-gray-600'} text-sm mb-2`}>{item.description}</p>
                        )}
                        {cfg.showIngredients && item.ingredients && item.ingredients.length > 0 && (
                          <p className={`text-xs mb-1 ${variant === 'wine' ? 'text-white/60' : 'text-gray-500'}`}>Ingredienti: {item.ingredients.join(", ")}</p>
                        )}
                        {cfg.showAllergens && item.allergens && item.allergens.length > 0 && (
                          <p className={`text-xs ${variant === 'wine' ? 'text-amber-400' : 'text-orange-600'}`}>⚠️ Allergeni: {item.allergens.join(", ")}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {cfg.showImages && item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                        )}
                        <span className={`font-bold text-lg ${variant === 'wine' ? 'text-[var(--accent,_#d9b99b)]' : ''} whitespace-nowrap`} style={variant === 'wine' ? {} : { color: secondaryColor }}>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`grid gap-4 ${cfg.columns === 3 ? 'md:grid-cols-3' : cfg.columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                  {items.map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg border hover:shadow-sm transition-shadow ${variant === 'wine' ? 'border-white/10 bg-white/5 hover:bg-white/10' : ''}`}>
                      {cfg.showImages && item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover rounded mb-3" />
                      )}
                      <div className="flex items-start justify-between">
                        <h5 className="font-bold text-lg" style={{ color: primaryColor }}>{item.name}</h5>
                        <span className="font-semibold" style={{ color: secondaryColor }}>{item.price}</span>
                      </div>
                      {cfg.showBadges && item.badges && item.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.badges.map((badge, idx) => <Badge key={idx} variant="secondary" className="text-xs">{badge}</Badge>)}
                        </div>
                      )}
                      {item.description && (<p className={`text-sm mt-2 ${variant === 'wine' ? 'text-white/70' : 'text-gray-600'}`}>{item.description}</p>)}
                      {cfg.showIngredients && item.ingredients && item.ingredients.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">Ingredienti: {item.ingredients.join(", ")}</p>
                      )}
                      {cfg.showAllergens && item.allergens && item.allergens.length > 0 && (
                        <p className="text-xs text-orange-600 mt-1">⚠️ Allergeni: {item.allergens.join(", ")}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
