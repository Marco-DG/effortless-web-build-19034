import { Button } from "@/components/ui/button";
import { BuilderData, BusinessType } from "@/types/builder";
import { UtensilsCrossed, Coffee, Beer, Store, ArrowRight, ArrowLeft } from "lucide-react";

interface BuilderStep2Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const businessTypes: { type: BusinessType; label: string; icon: any }[] = [
  { type: "restaurant", label: "Ristorante", icon: UtensilsCrossed },
  { type: "bar", label: "Bar", icon: Coffee },
  { type: "pub", label: "Pub", icon: Beer },
  { type: "cafe", label: "Caffetteria", icon: Store },
];

export const BuilderStep2 = ({ data, onUpdate, onNext, onBack }: BuilderStep2Props) => {
  const handleSelect = (type: BusinessType) => {
    onUpdate({ businessType: type });
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-foreground mb-4">
          Che tipo di attività hai?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {businessTypes.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                data.businessType === type
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              <Icon className={`h-8 w-8 mb-3 ${
                data.businessType === type ? "text-primary" : "text-muted-foreground"
              }`} />
              <span className={`font-medium ${
                data.businessType === type ? "text-primary" : "text-foreground"
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        className="w-full text-lg py-6 transition-all duration-300 group"
      >
        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
        Indietro
      </Button>
    </div>
  );
};
