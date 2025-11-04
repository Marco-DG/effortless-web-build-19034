import { useState } from "react";
import { BuilderData, TemplateType } from "./InteractiveBuilder";
import { X, Save, Rocket, Palette, Type, Monitor } from "lucide-react";
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
import { BuilderStepStyles } from "./builder-steps/BuilderStepStyles";

interface PersonalizationSidebarProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onClose?: () => void;
  onSectionChange?: (section: string) => void;
  onTemplateSelect?: (template: TemplateType) => void;
  onOpenPreview?: () => void;
}

type Section = "template" | "styles" | "typography" | "hero" | "about" | "menu" | "events" | "gallery" | "reviews" | "reservation" | "faq" | "blog" | "contact" | "footer";

const appearanceSections: { id: Section; label: string }[] = [
  { id: "template", label: "Template" },
  { id: "styles", label: "Stili" },
  { id: "typography", label: "Tipografia" },
  { id: "hero", label: "Hero" },
  { id: "gallery", label: "Galleria" },
  { id: "footer", label: "Footer" },
];

const dataSections: { id: Section; label: string }[] = [
  { id: "menu", label: "Menu" },
  { id: "events", label: "Eventi" },
  { id: "reviews", label: "Recensioni" },
  { id: "faq", label: "FAQ" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contatti" },
];

export const PersonalizationSidebar = ({
  data,
  onUpdate,
  onClose,
  onSectionChange,
  onTemplateSelect,
  onOpenPreview,
}: PersonalizationSidebarProps) => {
  const [activeSection, setActiveSection] = useState<Section>(
    data.template ? "hero" : "template"
  );
  const [tab, setTab] = useState<"appearance" | "data">("appearance");

  const order = data.sectionsOrder || ["hero","about","menu","gallery","contact"];
  const enabled = data.sectionsEnabled || { hero: true, about: true, menu: true, gallery: true, contact: true };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const newOrder = [...order];
    const target = idx + dir;
    if (target < 0 || target >= newOrder.length) return;
    const temp = newOrder[idx];
    newOrder[idx] = newOrder[target];
    newOrder[target] = temp;
    onUpdate({ sectionsOrder: newOrder });
  };

  const toggleSection = (key: string) => {
    onUpdate({ sectionsEnabled: { ...enabled, [key]: !enabled[key as keyof typeof enabled] } });
  };

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
            onNext={() => { /* non spostare automaticamente sezione */ }}
          />
        );
      case "typography":
        return (
          <BuilderStepTypography
            data={data}
            onUpdate={onUpdate}
          />
        );
      case "styles":
        return (
          <BuilderStepStyles
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
    <div className="h-full w-full lg:w-auto flex flex-col bg-white border-r border-gray-200 shadow-lg overflow-hidden transition-all duration-700 ease-out">
      {/* Header with mobile preview button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 bg-gray-50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-semibold text-gray-700 tracking-wide">Editor</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile only preview button */}
          {onOpenPreview && (
            <Button
              onClick={onOpenPreview}
              className="lg:hidden h-8 px-3 text-xs bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              size="sm"
            >
              <Monitor className="w-3.5 h-3.5" />
              Anteprima
            </Button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
              aria-label="Chiudi"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-white text-xs font-medium">
        <button onClick={()=>setTab("appearance")} className={`px-3 py-1.5 rounded ${tab==="appearance"?"bg-gray-100 text-gray-900":"text-gray-600 hover:text-gray-900"}`}>Aspetto</button>
        <button onClick={()=>setTab("data")} className={`px-3 py-1.5 rounded ${tab==="data"?"bg-gray-100 text-gray-900":"text-gray-600 hover:text-gray-900"}`}>Dati</button>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Subnavigation (no icon column) */}
        <div className="w-36 border-r border-gray-200 bg-gray-50 flex flex-col py-4 flex-shrink-0">
          {(tab === "appearance" ? appearanceSections : dataSections).map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  if (onSectionChange) onSectionChange(section.id);
                }}
                className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${isActive?"bg-white text-primary border-l-2 border-primary":"text-gray-600 hover:text-gray-900"}`}
              >
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <ScrollArea className="flex-1 min-w-0">
          <div className="p-6 sm:p-8">
            {tab === "appearance" ? (
              <>
                {/* Reorderable sections */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Sezioni del template</h4>
                  <div className="space-y-2">
                    {order.map((key, idx)=> (
                      <div key={key} className="flex items-center justify-between rounded border px-3 py-2 bg-white">
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={!!enabled[key as keyof typeof enabled]} onChange={()=>toggleSection(key)} />
                          <span className="text-sm font-medium capitalize">{key}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={()=>moveSection(idx,-1)} className="text-xs px-2 py-1 rounded bg-gray-100">↑</button>
                          <button onClick={()=>moveSection(idx,1)} className="text-xs px-2 py-1 rounded bg-gray-100">↓</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {renderSectionContent()}
              </>
            ) : (
              <>
                {/* Data-oriented sections shortcuts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 text-xs">
                  {dataSections.map((s)=> (
                    <button key={s.id} onClick={()=>setActiveSection(s.id)} className={`px-2 py-2 rounded border ${activeSection===s.id?"border-primary text-primary":"border-gray-200 text-gray-600 hover:text-gray-900"}`}>{s.label}</button>
                  ))}
                </div>
                {renderSectionContent()}
              </>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Compact Footer Actions */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs hover:bg-gray-100 transition-all duration-200"
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
          className="h-8 px-3 text-xs bg-primary hover:bg-primary/90 shadow-sm transition-all duration-200"
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
