import { BuilderData, MenuItem, MenuCategory } from "@/types/builder";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface SiteMenuProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
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

export const SiteMenu = ({ data, templateColors }: SiteMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "tutti">("tutti");

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  const categories = Array.from(
    new Set(data.menuItems.map((item) => item.category))
  ) as MenuCategory[];

  const filteredItems =
    selectedCategory === "tutti"
      ? data.menuItems
      : data.menuItems.filter((item) => item.category === selectedCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<MenuCategory, MenuItem[]>);

  if (data.menuItems.length === 0) {
    return (
      <section id="menu" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold mb-8" style={{ color: primaryColor }}>
            Il Nostro Menu
          </h3>
          <p className="text-gray-600">Menu in arrivo...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h3 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: primaryColor }}>
          Il Nostro Menu
        </h3>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory("tutti")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === "tutti"
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={
                selectedCategory === "tutti"
                  ? { backgroundColor: primaryColor }
                  : {}
              }
            >
              Tutti
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={
                  selectedCategory === category
                    ? { backgroundColor: primaryColor }
                    : {}
                }
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-12">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-6">
              <h4
                className="text-2xl font-bold border-b-2 pb-2"
                style={{ borderColor: secondaryColor, color: primaryColor }}
              >
                {categoryLabels[category as MenuCategory]}
              </h4>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <h5 className="font-bold text-lg" style={{ color: primaryColor }}>
                          {item.name}
                        </h5>
                        {item.badges && item.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.badges.map((badge, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {badge === "vegetariano" && "🌱"}
                                {badge === "vegano" && "🌿"}
                                {badge === "gluten-free" && "🌾"}
                                {badge === "spicy" && "🌶️"}
                                {badge === "novità" && "✨"}
                                {badge === "popolare" && "⭐"}
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      )}
                      {item.ingredients && item.ingredients.length > 0 && (
                        <p className="text-xs text-gray-500 mb-1">
                          Ingredienti: {item.ingredients.join(", ")}
                        </p>
                      )}
                      {item.allergens && item.allergens.length > 0 && (
                        <p className="text-xs text-orange-600">
                          ⚠️ Allergeni: {item.allergens.join(", ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      )}
                      <span className="font-bold text-lg whitespace-nowrap" style={{ color: secondaryColor }}>
                        {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

