import { useState } from "react";
import { BuilderStep0 } from "./builder-steps/BuilderStep0";
import { BuilderStep1 } from "./builder-steps/BuilderStep1";
import { BuilderStep2 } from "./builder-steps/BuilderStep2";
import { BuilderStep3 } from "./builder-steps/BuilderStep3";
import { BuilderStep4 } from "./builder-steps/BuilderStep4";
import { WebsitePreview } from "./WebsitePreview";
import { Button } from "@/components/ui/button";

export type BusinessType = "restaurant" | "bar" | "cafe" | "pub" | "";
export type TemplateType = "trattoria" | "urban-bar" | "dolce-vita" | "craft-pub" | "";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  tripadvisor: string;
}

export interface BuilderData {
  template: TemplateType;
  businessName: string;
  businessType: BusinessType;
  logoUrl: string;
  tagline: string;
  menuItems: MenuItem[];
  socialLinks: SocialLinks;
  address: string;
  phone: string;
  email: string;
}

interface InteractiveBuilderProps {
  onDataChange?: (data: BuilderData) => void;
}

export const InteractiveBuilder = ({ onDataChange }: InteractiveBuilderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [builderData, setBuilderData] = useState<BuilderData>({
    template: "",
    businessName: "",
    businessType: "",
    logoUrl: "",
    tagline: "",
    menuItems: [],
    socialLinks: {
      facebook: "",
      instagram: "",
      tripadvisor: "",
    },
    address: "",
    phone: "",
    email: "",
  });

  const updateBuilderData = (data: Partial<BuilderData>) => {
    const updated = { ...builderData, ...data };
    setBuilderData(updated);
    onDataChange?.(updated);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-xl animate-fade-in-up">
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Crea il tuo sito
              </h2>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} di 4
              </span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                    step <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {currentStep === 0 && (
          <BuilderStep0
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
          />
        )}
        {currentStep === 1 && (
          <BuilderStep2
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 2 && (
          <BuilderStep3
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <BuilderStep4
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <div className="text-center space-y-6 py-8">
            <h3 className="text-2xl font-heading font-semibold text-foreground">
              🎉 Il tuo sito è pronto!
            </h3>
            <p className="text-muted-foreground">
              Puoi pubblicarlo subito o continuare a personalizzarlo.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleBack} variant="outline">
                Torna indietro
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                Pubblica ora
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
