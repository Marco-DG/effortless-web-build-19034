import { useState } from "react";
import { BuilderData } from "./InteractiveBuilder";
import {
  Home,
  Users,
  UtensilsCrossed,
  Calendar,
  Star,
  HelpCircle,
  Mail,
  Layout,
  X,
  Save,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BuilderStep0 } from "./builder-steps/BuilderStep0";
import { BuilderStep3 } from "./builder-steps/BuilderStep3";
import { BuilderStep4 } from "./builder-steps/BuilderStep4";
import { BuilderStep5 } from "./builder-steps/BuilderStep5";
import { BuilderStep6 } from "./builder-steps/BuilderStep6";
import { BuilderStep7Reviews } from "./builder-steps/BuilderStep7Reviews";
import { BuilderStep7FAQ } from "./builder-steps/BuilderStep7FAQ";
import { BuilderStep8 } from "./builder-steps/BuilderStep8";

interface PersonalizationSidebarProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onClose?: () => void;
  onSectionChange?: (section: string) => void;
}

type Section = "template" | "hero" | "about" | "menu" | "events" | "reviews" | "faq" | "contact" | "footer";

const sections: { id: Section; label: string; icon: any }[] = [
  { id: "template", label: "Template", icon: Home },
  { id: "hero", label: "Hero", icon: Home },
  { id: "about", label: "Chi Siamo", icon: Users },
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "events", label: "Eventi", icon: Calendar },
  { id: "reviews", label: "Recensioni", icon: Star },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "contact", label: "Contatti", icon: Mail },
  { id: "footer", label: "Footer", icon: Layout },
];

export const PersonalizationSidebar = ({
  data,
  onUpdate,
  onClose,
  onSectionChange,
}: PersonalizationSidebarProps) => {
  const [activeSection, setActiveSection] = useState<Section>(
    data.template ? "hero" : "template"
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "template":
        return (
          <BuilderStep0
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("hero")}
          />
        );
      case "hero":
        return (
          <BuilderStep3
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("about")}
            onBack={() => setActiveSection("template")}
          />
        );
      case "about":
        return (
          <BuilderStep5
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("menu")}
            onBack={() => setActiveSection("hero")}
          />
        );
      case "menu":
        return (
          <BuilderStep4
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("events")}
            onBack={() => setActiveSection("about")}
          />
        );
      case "events":
        return (
          <BuilderStep6
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("reviews")}
            onBack={() => setActiveSection("menu")}
          />
        );
      case "reviews":
        return (
          <BuilderStep7Reviews
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("faq")}
            onBack={() => setActiveSection("events")}
          />
        );
      case "faq":
        return (
          <BuilderStep7FAQ
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("contact")}
            onBack={() => setActiveSection("reviews")}
          />
        );
      case "contact":
        return (
          <BuilderStep8
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("footer")}
            onBack={() => setActiveSection("reviews")}
          />
        );
      case "footer":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Footer</h3>
            <p className="text-sm text-muted-foreground">
              Le impostazioni del footer sono gestite automaticamente in base ai dati inseriti.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-base sm:text-lg">Personalizza il tuo sito</h2>
            <p className="text-xs text-muted-foreground hidden sm:block">Modifica in tempo reale</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Icons Sidebar */}
        <div className="w-14 sm:w-16 border-r border-gray-200 bg-gray-50 flex flex-col py-2 sm:py-4 flex-shrink-0">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                // Trigger highlight in preview
                if (onSectionChange) {
                  onSectionChange(section.id);
                }
              }}
              className={`flex flex-col items-center justify-center gap-1 p-2 sm:p-3 transition-all ${
                isActive
                  ? "bg-white border-l-4 border-primary text-primary"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }`}
              title={section.label}
            >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs font-medium hidden sm:inline">{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <ScrollArea className="flex-1 min-w-0">
          <div className="p-4 sm:p-6">{renderSectionContent()}</div>
        </ScrollArea>
      </div>

      {/* Footer Actions */}
      <div className="p-4 sm:p-6 border-t border-gray-200 space-y-2 sm:space-y-3 flex-shrink-0">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base"
          size="lg"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Pubblica sito
        </Button>
        <Button variant="outline" className="w-full text-sm sm:text-base" size="lg">
          <Save className="w-4 h-4 mr-2" />
          Salva modifiche
        </Button>
      </div>
    </div>
  );
};

