import { useState } from "react";
import { BuilderData, TemplateType, BuilderSection } from "@/types/builder";
import { X, Monitor, FileText, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ImageUploader } from "@/components/ui/image-uploader";
import { BuilderStep0 } from "./steps/BuilderStep0";
import { BuilderStep3 } from "./steps/BuilderStep3";
import { BuilderStepLogo } from "./steps/BuilderStepLogo";
import { BuilderStep4 } from "./steps/BuilderStep4";
import { BuilderStep5 } from "./steps/BuilderStep5";
import { BuilderStep6 } from "./steps/BuilderStep6";
import { BuilderStep7Reviews } from "./steps/BuilderStep7Reviews";
import { BuilderStep7FAQ } from "./steps/BuilderStep7FAQ";
import { BuilderStep8 } from "./steps/BuilderStep8";
import { BuilderStepTypography } from "./steps/BuilderStepTypography";
// Styles step rimosso

interface BuilderSidebarProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onClose?: () => void;
  onSectionChange?: (section: string) => void;
  onTemplateSelect?: (template: TemplateType) => void;
  onOpenPreview?: () => void;
  macroTab?: "logo" | "appearance" | "data";
  onMacroTabChange?: (tab: "logo" | "appearance" | "data") => void;

}

import { SECTION_ICONS, APPEARANCE_SECTIONS, DATA_SECTIONS } from "@/constants/sections";

type Section = BuilderSection;

export const BuilderSidebar = ({
  data,
  onUpdate,
  onClose,
  onSectionChange,
  onTemplateSelect,
  onOpenPreview,
  macroTab = "appearance",
  onMacroTabChange,
}: BuilderSidebarProps) => {
  const [activeSection, setActiveSection] = useState<Section>("template");
  

  const allSections = [...APPEARANCE_SECTIONS, ...DATA_SECTIONS];
  const sectionLabels = allSections.reduce((acc, section) => {
    acc[section.id] = section.label;
    return acc;
  }, {} as Record<string, string>);

  const order = data.sectionsOrder || ["hero","about","menu","gallery","contact","newsletter"];
  const enabled = data.sectionsEnabled || { hero: true, about: true, menu: true, gallery: true, contact: true, newsletter: true };

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
      case "logo":
        return (
          <BuilderStepLogo
            data={data}
            onUpdate={onUpdate}
            onGoDesignLogo={() => {
              // usa la stessa azione della Hero per aprire il flusso tipografia o design
              if (onSectionChange) onSectionChange("typography");
              setActiveSection("typography");
            }}
          />
        );
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
      case "pages":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Pagine</h3>
            <p className="text-sm text-muted-foreground">Scegli Pagina singola o Pagine multiple. In modalità multiple, i componenti vengono distribuiti tra le pagine standard e puoi attivarle/disattivarle e riordinarle.</p>

            {/* Segmented toggle: mutually exclusive with explicit labels */}
            <div className="rounded-md border border-border p-1 bg-white/70">
              <ToggleGroup
                type="single"
                value={data.singlePage ? 'single' : 'multi'}
                onValueChange={(v)=> v && onUpdate({ singlePage: v === 'single' })}
                className="grid grid-cols-2 gap-1"
              >
                <ToggleGroupItem
                  value="single"
                  aria-label="Pagina singola"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
                >
                  <FileText className="h-4 w-4" />
                  <span>Pagina singola</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="multi"
                  aria-label="Pagine multiple"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:bg-muted"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>Pagine multiple</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              {/* Reorder and toggle sections */}
              {order.map((key, idx)=> (
                <div key={key} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={!!enabled[key as keyof typeof enabled]} onChange={()=>toggleSection(key)} />
                    <span className="text-sm font-medium capitalize">{sectionLabels[key] || key}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={()=>moveSection(idx,-1)} className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors" aria-label="Sposta su">↑</button>
                    <button onClick={()=>moveSection(idx,1)} className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors" aria-label="Sposta giù">↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {(data.gallery || []).map((g, idx)=> (
                <div key={g.id} className="relative group">
                  <img src={g.url} className="w-full h-20 sm:h-24 object-cover rounded" />
                  <button
                    onClick={()=> onUpdate({ gallery: data.gallery.filter((_,i)=> i!==idx) })}
                    className="absolute top-1 right-1 text-xs bg-white/80 hover:bg-white text-red-600 rounded px-1"
                    aria-label="Rimuovi"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div>
              {/* Riutilizzo componente condiviso per singola immagine; aggiunge subito alla galleria */}
              <ImageUploader
                label="Aggiungi immagine"
                value={""}
                onChange={(url)=> {
                  const item = { id: `gal-${Date.now()}`, url, type: "image" as const };
                  onUpdate({ gallery: [...(data.gallery||[]), item] });
                }}
                helpText="PNG, JPG o SVG"
                previewSize={64}
              />
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contatti</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="address" className="text-xs">Indirizzo</Label>
                <Input id="address" placeholder="Via Roma 1, Milano" value={data.address} onChange={(e)=>onUpdate({ address: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs">Telefono</Label>
                <Input id="phone" placeholder="+39 02 1234567" value={data.phone} onChange={(e)=>onUpdate({ phone: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input id="email" type="email" placeholder="info@esempio.it" value={data.email} onChange={(e)=>onUpdate({ email: e.target.value })} className="mt-1" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Social Media (opzionale)</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Facebook URL" value={data.socialLinks.facebook} onChange={(e)=>onUpdate({ socialLinks: { ...data.socialLinks, facebook: e.target.value } })} />
                <Input placeholder="Instagram URL" value={data.socialLinks.instagram} onChange={(e)=>onUpdate({ socialLinks: { ...data.socialLinks, instagram: e.target.value } })} />
              </div>
            </div>
          </div>
        );
      case "hours":
        return (
          <BuilderStep8
            data={data}
            onUpdate={onUpdate}
            onNext={() => setActiveSection("delivery")}
            onBack={() => setActiveSection("contact")}
          />
        );
      case "delivery":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Delivery & Prenotazioni</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reservationLink" className="text-sm font-medium">Link prenotazioni (opzionale)</Label>
                <Input id="reservationLink" placeholder="https://thefork.com/..." value={data.reservationLink || ""} onChange={(e)=>onUpdate({ reservationLink: e.target.value })} className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Glovo</Label>
                  <Input value={data.deliveryLinks?.glovo || ""} onChange={(e)=>onUpdate({ deliveryLinks: { ...data.deliveryLinks, glovo: e.target.value } })} />
                </div>
                <div>
                  <Label className="text-xs">UberEats</Label>
                  <Input value={data.deliveryLinks?.uberEats || ""} onChange={(e)=>onUpdate({ deliveryLinks: { ...data.deliveryLinks, uberEats: e.target.value } })} />
                </div>
                <div>
                  <Label className="text-xs">Deliveroo</Label>
                  <Input value={data.deliveryLinks?.deliveroo || ""} onChange={(e)=>onUpdate({ deliveryLinks: { ...data.deliveryLinks, deliveroo: e.target.value } })} />
                </div>
                <div>
                  <Label className="text-xs">Just Eat</Label>
                  <Input value={data.deliveryLinks?.justEat || ""} onChange={(e)=>onUpdate({ deliveryLinks: { ...data.deliveryLinks, justEat: e.target.value } })} />
                </div>
              </div>
            </div>
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
    <div className="h-full w-full lg:w-auto flex flex-col bg-white lg:rounded-l-2xl border-r border-border shadow-lg overflow-hidden transition-all duration-700 ease-out">
      {/* Header rimosso su richiesta */}

      {/* Single Header - Mobile/Desktop */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-white/80 backdrop-blur text-xs font-medium">
        <div className="flex items-center gap-2">
          <button type="button" role="tab" aria-selected={macroTab === "logo"} onClick={() => { onMacroTabChange?.("logo"); setActiveSection("logo"); onSectionChange?.("logo"); }} className={`px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${macroTab === "logo" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Logo</button>
          <button type="button" role="tab" aria-selected={macroTab === "appearance"} onClick={() => { onMacroTabChange?.("appearance"); }} className={`px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${macroTab === "appearance" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Aspetto</button>
          <button type="button" role="tab" aria-selected={macroTab === "data"} onClick={() => { onMacroTabChange?.("data"); }} className={`px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${macroTab === "data" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Dati</button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onOpenPreview} className="lg:hidden inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs font-medium" aria-label="Apri anteprima">
            <Monitor className="w-3.5 h-3.5" /> Anteprima
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Chiudi"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Subnavigation (no icon column) */}
        <div className="w-10 2xl:w-36 border-r border-border bg-white/50 backdrop-blur flex flex-col py-2 2xl:py-4 flex-shrink-0" role="navigation" aria-label="Sezioni">
          {(macroTab === "logo" ? [{ id: "logo", label: "Logo" }] : (macroTab === "appearance" ? APPEARANCE_SECTIONS : DATA_SECTIONS)).map((section: any) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  if (onSectionChange) onSectionChange(section.id);
                }}
                className={`flex items-center justify-center 2xl:justify-between px-1 2xl:px-4 py-2 2xl:py-2 text-base 2xl:text-sm transition-colors hover-raise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive?"bg-white/80 text-primary 2xl:border-l-2 2xl:border-primary":"text-muted-foreground hover:text-foreground"}` }
              >
                {(() => { const Icon = SECTION_ICONS[section.id]; return <Icon className="w-4 h-4 2xl:w-5 2xl:h-5" />; })()}
                <span className="hidden 2xl:inline">{section.label}</span><span className="sr-only"> {isActive ? "(attivo)" : ""}</span>
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <ScrollArea className="flex-1 min-w-0">
          <div className="p-4 2xl:p-6">
            {/* Animated section content */}
            <div>
              {renderSectionContent()}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Footer actions rimossi su richiesta */}
    </div>
  );
};
