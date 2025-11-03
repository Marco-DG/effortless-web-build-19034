import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BuilderData } from "../InteractiveBuilder";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BuilderStep3Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep3 = ({ data, onUpdate, onNext, onBack }: BuilderStep3Props) => {
  const handleNext = () => {
    if (data.businessName.trim()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label htmlFor="businessName" className="text-sm font-medium text-foreground mb-2 block">
          Nome della tua attività
        </Label>
        <Input
          id="businessName"
          type="text"
          placeholder="Es: La Trattoria del Centro"
          value={data.businessName}
          onChange={(e) => onUpdate({ businessName: e.target.value })}
          className="text-lg py-6"
        />
      </div>

      <div>
        <Label htmlFor="tagline" className="text-sm font-medium text-foreground mb-2 block">
          Slogan o descrizione (opzionale)
        </Label>
        <Input
          id="tagline"
          type="text"
          placeholder="Es: Sapori autentici dal 1985"
          value={data.tagline}
          onChange={(e) => onUpdate({ tagline: e.target.value })}
          className="text-lg py-6"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 text-lg py-6 transition-all duration-300 group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Indietro
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          disabled={!data.businessName.trim()}
          className="flex-1 text-lg py-6 bg-primary hover:bg-primary/90 transition-all duration-300 group"
        >
          Avanti
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};
