import { BuilderData, TemplateType } from "../InteractiveBuilder";

interface BuilderStep0Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
}

const templates = [
  {
    id: "trattoria" as TemplateType,
    name: "La Trattoria",
    description: "Stile caldo, perfetto per cucina italiana tradizionale",
    image: "🍝",
    colors: ["#8B4513", "#D2691E", "#F4A460"],
  },
  {
    id: "urban-bar" as TemplateType,
    name: "Urban Bar",
    description: "Look moderno e scuro per cocktail bar contemporanei",
    image: "🍸",
    colors: ["#1a1a1a", "#3d3d3d", "#00d9ff"],
  },
  {
    id: "dolce-vita" as TemplateType,
    name: "Dolce Vita Café",
    description: "Design chiaro e accogliente per caffetterie",
    image: "☕",
    colors: ["#f5e6d3", "#d4a574", "#8b6f47"],
  },
  {
    id: "craft-pub" as TemplateType,
    name: "Craft Pub",
    description: "Rustico e vivace per pub e birrerie artigianali",
    image: "🍺",
    colors: ["#2d5016", "#6b8e23", "#daa520"],
  },
];

export const BuilderStep0 = ({ data, onUpdate, onNext }: BuilderStep0Props) => {
  const handleTemplateSelect = (template: TemplateType) => {
    onUpdate({ template });
    setTimeout(onNext, 300);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-heading font-bold text-foreground">
          Scegli il tuo template
        </h3>
        <p className="text-muted-foreground text-lg">
          Seleziona lo stile che rappresenta meglio la tua attività
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              data.template === template.id
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="text-6xl mb-4">{template.image}</div>
            <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
              {template.name}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {template.description}
            </p>
            <div className="flex gap-2 justify-center">
              {template.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {data.template === template.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
