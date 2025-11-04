import { useState } from "react";
import { BuilderStep0 } from "./builder-steps/BuilderStep0";
import { BuilderStep1 } from "./builder-steps/BuilderStep1";
import { BuilderStep2 } from "./builder-steps/BuilderStep2";
import { BuilderStep3 } from "./builder-steps/BuilderStep3";
import { BuilderStep4 } from "./builder-steps/BuilderStep4";
import { BuilderStep5 } from "./builder-steps/BuilderStep5";
import { BuilderStep6 } from "./builder-steps/BuilderStep6";
import { BuilderStep7 } from "./builder-steps/BuilderStep7";
import { BuilderStep8 } from "./builder-steps/BuilderStep8";
import { WebsitePreview } from "./WebsitePreview";
import { Button } from "@/components/ui/button";

export type BusinessType = "restaurant" | "bar" | "cafe" | "pub" | "";
export type TemplateType = "trattoria" | "urban-bar" | "dolce-vita" | "craft-pub" | "wine-bar" | "fine-dining" | "";
export type MenuCategory = "antipasti" | "primi" | "secondi" | "dessert" | "cocktail" | "birre" | "vini" | "bevande" | "altro";
export type Allergen = "glutine" | "latte" | "uova" | "soia" | "frutta a guscio" | "pesce" | "crostacei" | "sedano" | "senape" | "sesamo" | "lupini" | "molluschi" | "anidride solforosa";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  imageUrl?: string;
  ingredients?: string[];
  allergens?: Allergen[];
  badges?: ("vegetariano" | "vegano" | "gluten-free" | "spicy" | "novità" | "popolare")[];
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  tripadvisor: string;
  tiktok?: string;
  google?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  imageUrl?: string;
  location?: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  date?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  type: "image" | "video";
  caption?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  date: string;
  category?: string;
}

export interface OpeningHours {
  monday: { open: string; close: string; closed?: boolean };
  tuesday: { open: string; close: string; closed?: boolean };
  wednesday: { open: string; close: string; closed?: boolean };
  thursday: { open: string; close: string; closed?: boolean };
  friday: { open: string; close: string; closed?: boolean };
  saturday: { open: string; close: string; closed?: boolean };
  sunday: { open: string; close: string; closed?: boolean };
}

export interface AboutSection {
  story: string;
  philosophy: string;
  values: Array<{ title: string; description: string; icon?: string }>;
  teamPhotos?: string[];
}

export interface BuilderData {
  // Base
  template: TemplateType;
  businessName: string;
  businessType: BusinessType;
  logoUrl: string;
  tagline: string;
  // Optional global theme overrides
  customTheme?: { primary: string; secondary: string; accent: string };
  
  // Hero
  heroImageUrl?: string;
  heroVideoUrl?: string;
  heroSlogan?: string;
  heroDescription?: string;
  
  // Sections (order/toggle shared across templates)
  sectionsOrder?: string[]; // e.g., ["hero","about","menu","gallery","contact"]
  sectionsEnabled?: Record<string, boolean>;
  
  // About
  about?: AboutSection;
  
  // Menu
  menuItems: MenuItem[];
  
  // Events
  events: Event[];
  
  // Gallery
  gallery: GalleryItem[];
  
  // Reviews
  reviews: Review[];
  
  // FAQ
  faqs: FAQ[];
  
  // Blog
  blogPosts: BlogPost[];
  
  // Contact
  address: string;
  phone: string;
  email: string;
  openingHours?: OpeningHours;
  mapLat?: number;
  mapLng?: number;
  
  // Social & Links
  socialLinks: SocialLinks;
  deliveryLinks?: {
    glovo?: string;
    uberEats?: string;
    deliveroo?: string;
    justEat?: string;
  };
  reservationLink?: string;
  
  // Newsletter
  newsletterEnabled?: boolean;
  newsletterTitle?: string;
  newsletterDescription?: string;
  
  // Extra
  promoBanner?: {
    enabled: boolean;
    title: string;
    description?: string;
    link?: string;
  };
  cookieBannerEnabled?: boolean;
  
  // Typography
  fontFamily?: string;
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
    events: [],
    gallery: [],
    reviews: [],
    faqs: [],
    blogPosts: [],
    socialLinks: {
      facebook: "",
      instagram: "",
      tripadvisor: "",
    },
    address: "",
    phone: "",
    email: "",
    newsletterEnabled: true,
  });

  const updateBuilderData = (data: Partial<BuilderData>) => {
    const updated = { ...builderData, ...data };
    setBuilderData(updated);
    onDataChange?.(updated);
  };

  const handleNext = () => {
    if (currentStep < 9) {
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
                Step {currentStep} di 9
              </span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
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
          <BuilderStep3
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <BuilderStep4
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <BuilderStep5
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 6 && (
          <BuilderStep6
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 7 && (
          <BuilderStep7
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 8 && (
          <BuilderStep8
            data={builderData}
            onUpdate={updateBuilderData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 9 && (
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
