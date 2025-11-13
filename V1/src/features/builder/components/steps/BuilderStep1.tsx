import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BuilderData } from "@/types/builder";
import { ArrowRight } from "lucide-react";

interface BuilderStep1Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
}

export const BuilderStep1 = ({ data, onUpdate, onNext }: BuilderStep1Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.businessName.trim()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-3">
          Come si chiama la tua attività?
        </label>
        <Input
          id="businessName"
          type="text"
          placeholder="Es. Trattoria da Mario"
          value={data.businessName}
          onChange={(e) => onUpdate({ businessName: e.target.value })}
          className="text-lg py-6 transition-all duration-300 focus:ring-2 focus:ring-primary"
          autoFocus
        />
      </div>

      <Button
        type="submit"
        className="w-full text-lg py-6 bg-primary hover:bg-primary/90 transition-all duration-300 group"
        disabled={!data.businessName.trim()}
      >
        Continua
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
    </form>
  );
};
