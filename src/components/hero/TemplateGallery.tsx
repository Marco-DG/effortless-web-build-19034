import { useState } from "react";
import { TemplateType } from "./InteractiveBuilder";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TemplateGalleryProps {
  onSelectTemplate: (template: TemplateType) => void;
}

const templates = [
  {
    id: "trattoria" as TemplateType,
    name: "La Trattoria",
    description: "Stile autentico e caldo, perfetto per ristoranti italiani tradizionali",
    image: "🍝",
    colors: ["#8B4513", "#D2691E", "#F4A460"],
    category: "Ristorante",
    features: ["Menu completo", "Chi siamo", "Eventi", "Recensioni"],
    preview: "Template classico con colori caldi e atmosfera familiare",
  },
  {
    id: "urban-bar" as TemplateType,
    name: "Urban Bar",
    description: "Look moderno e sofisticato per cocktail bar contemporanei",
    image: "🍸",
    colors: ["#1a1a1a", "#3d3d3d", "#00d9ff"],
    category: "Bar",
    features: ["Cocktail menu", "Eventi live", "Atmosfera urbana"],
    preview: "Design scuro con accenti neon, perfetto per la notte",
  },
  {
    id: "dolce-vita" as TemplateType,
    name: "Dolce Vita Café",
    description: "Design chiaro e accogliente per caffetterie e pasticcerie",
    image: "☕",
    colors: ["#f5e6d3", "#d4a574", "#8b6f47"],
    category: "Caffetteria",
    features: ["Menu dolci", "Atmosfera accogliente", "Eventi"],
    preview: "Palette pastello e stile elegante per un'esperienza raffinata",
  },
  {
    id: "craft-pub" as TemplateType,
    name: "Craft Pub",
    description: "Rustico e vivace per pub e birrerie artigianali",
    image: "🍺",
    colors: ["#2d5016", "#6b8e23", "#daa520"],
    category: "Pub",
    features: ["Birre artigianali", "Live music", "Cucina pub"],
    preview: "Stile autentico con colori caldi e atmosfera conviviale",
  },
];

export const TemplateGallery = ({ onSelectTemplate }: TemplateGalleryProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);

  const handleSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
    setTimeout(() => {
      onSelectTemplate(template);
    }, 300);
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-6 sm:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Scegli il tuo template
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Seleziona il design che meglio rappresenta la tua attività. 
            Potrai personalizzarlo completamente in seguito.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {templates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <div
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className={`group relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl ${
                  isSelected
                    ? "border-primary shadow-xl scale-[1.02]"
                    : "border-gray-200 hover:border-primary/50 shadow-lg"
                }`}
              >
                {/* Template Preview */}
                <div
                  className="aspect-[4/3] relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${template.colors[0]}, ${template.colors[1]})`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl sm:text-9xl opacity-90">{template.image}</div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-2 shadow-lg">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                    {template.category}
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="flex gap-2 mb-4">
                    {template.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Preview Text */}
                  <p className="text-xs text-muted-foreground italic mb-4">
                    {template.preview}
                  </p>

                  {/* CTA */}
                  <Button
                    className={`w-full ${
                      isSelected
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(template.id);
                    }}
                  >
                    {isSelected ? (
                      <>
                        Template selezionato
                        <Check className="ml-2 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Seleziona questo template
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Non ti preoccupare, potrai modificare tutto in seguito nella personalizzazione</p>
        </div>
      </div>
    </div>
  );
};

