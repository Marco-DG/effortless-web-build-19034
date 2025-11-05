import { BuilderData } from "@/types/builder";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface BuilderStepTypographyProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
}

const fonts = [
  { id: "Inter", name: "Inter", description: "Moderno e pulito", category: "Sans-serif" },
  { id: "Poppins", name: "Poppins", description: "Geometrico e friendly", category: "Sans-serif" },
  { id: "Lato", name: "Lato", description: "Leggibile e professionale", category: "Sans-serif" },
  { id: "Playfair Display", name: "Playfair Display", description: "Elegante e classico", category: "Serif" },
  { id: "Montserrat", name: "Montserrat", description: "Minimalista e moderno", category: "Sans-serif" },
  { id: "Roboto", name: "Roboto", description: "Versatile e pulito", category: "Sans-serif" },
];

export const BuilderStepTypography = ({ data, onUpdate }: BuilderStepTypographyProps) => {
  const selectedFont = data.fontFamily || "Inter";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Tipografia</h3>
        <p className="text-sm text-muted-foreground">
          Scegli il font per il tuo sito. Il font verrà applicato a tutto il sito.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {fonts.map((font) => {
          const isSelected = selectedFont === font.id;
          return (
            <button
              key={font.id}
              onClick={() => onUpdate({ fontFamily: font.id })}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className="font-semibold text-lg"
                      style={{ fontFamily: font.id }}
                    >
                      {font.name}
                    </h4>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{font.description}</p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: font.id }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

