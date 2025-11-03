import { useState } from "react";
import { BuilderData, TemplateType } from "./InteractiveBuilder";
import {
  Home,
  Users,
  UtensilsCrossed,
  Calendar,
  Star,
  HelpCircle,
  Mail,
  Layout,
  Image,
  CalendarCheck,
  BookOpen,
  X,
  Save,
  Rocket,
  Palette,
  Type,
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
import { BuilderStepTypography } from "./builder-steps/BuilderStepTypography";

interface PersonalizationSidebarProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onClose?: () => void;
  onSectionChange?: (section: string) => void;
  onTemplateSelect?: (template: TemplateType) => void;
}

type Section = "template" | "typography" | "hero" | "about" | "menu" | "events" | "gallery" | "reviews" | "reservation" | "faq" | "blog" | "contact" | "footer";

const sections: { id: Section; label: string; icon: any }[] = [
  { id: "template", label: "Template", icon: Palette },
  { id: "typography", label: "Tipografia", icon: Type },
  { id: "hero", label: "Hero", icon: Home },
  { id: "about", label: "Chi Siamo", icon: Users },
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "events", label: "Eventi", icon: Calendar },
  { id: "gallery", label: "Galleria", icon: Image },
  { id: "reviews", label: "Recensioni", icon: Star },
  { id: "reservation", label: "Prenotazioni", icon: CalendarCheck },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "contact", label: "Contatti", icon: Mail },
  { id: "footer", label: "Footer", icon: Layout },
];

export const PersonalizationSidebar = ({
  data,
  onUpdate,
  onClose,
  onSectionChange,
  onTemplateSelect,
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
            onUpdate={(update) => {
              onUpdate(update);
              if (update.template && onTemplateSelect) {
                onTemplateSelect(update.template);
              }
            }}
            onNext={() => setActiveSection("hero")}
          />
        );
      case "typography":
        return (
          <BuilderStepTypography
            data={data}
            onUpdate={onUpdate}
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
            onNext={() => setActiveSection("gallery")}
            onBack={() => setActiveSection("menu")}
          />
        );
      case "gallery":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Galleria</h3>
            <p className="text-sm text-muted-foreground">
              La galleria viene popolata automaticamente con le immagini caricate. Aggiungi immagini nella sezione "Chi Siamo" o "Eventi".
            </p>
            {data.gallery.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Immagini nella galleria: {data.gallery.length}</p>
              </div>
            )}
          </div>
        );
      case "reviews":
        return (
          <BuilderStep7Reviews
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("reservation")}
            onBack={() => setActiveSection("gallery")}
          />
        );
      case "reservation":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Prenotazioni</h3>
            <p className="text-sm text-muted-foreground">
              Configura il modulo di prenotazione e i link esterni (TheFork, Quandoo, ecc.).
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Link esterno prenotazioni</label>
                <input
                  type="url"
                  value={data.reservationLink || ""}
                  onChange={(e) => onUpdate({ reservationLink: e.target.value })}
                  placeholder="https://thefork.it/..."
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      case "faq":
        return (
          <BuilderStep7FAQ
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("blog")}
            onBack={() => setActiveSection("reservation")}
          />
        );
      case "blog":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Blog</h3>
            <p className="text-sm text-muted-foreground">
              Il blog è attualmente popolato con articoli di default. Funzionalità di gestione completa in arrivo.
            </p>
            {data.blogPosts.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Articoli pubblicati: {data.blogPosts.length}</p>
              </div>
            )}
          </div>
        );
      case "contact":
        return (
          <BuilderStep8
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("footer")}
            onBack={() => setActiveSection("blog")}
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
    <div className="h-full flex flex-col bg-white/98 backdrop-blur-2xl border-r border-gray-200/60 shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-700 ease-out">
      {/* Minimal Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/60 flex-shrink-0 bg-gradient-to-r from-white/80 via-gray-50/30 to-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold text-gray-700 tracking-wide">Editor</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100/80 rounded-lg transition-all duration-200 hover:scale-105"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Icons Sidebar */}
        <div className="w-16 border-r border-gray-200/60 bg-gradient-to-b from-gray-50/40 via-white/20 to-white/40 backdrop-blur-sm flex flex-col py-4 flex-shrink-0">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  if (onSectionChange) {
                    onSectionChange(section.id);
                  }
                }}
                className={`group relative flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 ${
                  isActive
                    ? "bg-white/90 shadow-md text-primary"
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/70"
                }`}
                title={section.label}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`} />
                <span className={`text-[10px] font-medium hidden sm:block transition-colors ${isActive ? "text-primary font-semibold" : "text-gray-600"}`}>
                  {section.label}
                </span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-primary/80 rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <ScrollArea className="flex-1 min-w-0">
          <div className="p-6 sm:p-8">{renderSectionContent()}</div>
        </ScrollArea>
      </div>

      {/* Compact Footer Actions */}
      <div className="p-3 border-t border-gray-200/60 bg-gradient-to-r from-white/90 via-gray-50/50 to-white/90 backdrop-blur-sm flex items-center justify-between gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs hover:bg-gray-100/80 transition-all duration-200"
          onClick={() => {
            // Save functionality
            console.log("Save changes");
          }}
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Salva
        </Button>
        <Button
          size="sm"
          className="h-8 px-3 text-xs bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200"
          onClick={() => {
            // Publish functionality
            console.log("Publish site");
          }}
        >
          <Rocket className="w-3.5 h-3.5 mr-1.5" />
          Pubblica
        </Button>
      </div>
    </div>
  );
};
