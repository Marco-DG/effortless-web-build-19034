import { useState } from "react";
import { BuilderData, TemplateType } from "./InteractiveBuilder";
import { X, Save, Rocket, Palette, Type, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BuilderStep0 } from "./builder-steps/BuilderStep0";
import { BuilderStep3 } from "./builder-steps/BuilderStep3";
import { BuilderStep4 } from "./builder-steps/BuilderStep4";
import { BuilderStep5 } from "./builder-steps/BuilderStep5";
import { BuilderStep6 } from "./builder-steps/BuilderStep6";
import { BuilderStep7Reviews } from "./builder-steps/BuilderStep7Reviews";
import { BuilderStep7FAQ } from "./builder-steps/BuilderStep7FAQ";
import { BuilderStep8 } from "./builder-steps/BuilderStep8";
import { BuilderStepTypography } from "./builder-steps/BuilderStepTypography";
// Styles step rimosso

interface PersonalizationSidebarProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onClose?: () => void;
  onSectionChange?: (section: string) => void;
  onTemplateSelect?: (template: TemplateType) => void;
  onOpenPreview?: () => void;
}

type Section = "template" | "typography" | "hero" | "about" | "menu" | "events" | "gallery" | "reviews" | "reservation" | "faq" | "contact" | "hours" | "delivery" | "layout";

const appearanceSections: { id: Section; label: string }[] = [
  { id: "template", label: "Template" },
  { id: "typography", label: "Tipografia" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "Chi siamo" },
  { id: "gallery", label: "Galleria" },
  { id: "layout", label: "Disposizione" },
];

const dataSections: { id: Section; label: string }[] = [
  { id: "menu", label: "Menù" },
  { id: "events", label: "Eventi" },
  { id: "reviews", label: "Recensioni" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contatti" },
  { id: "hours", label: "Orari" },
  { id: "delivery", label: "Delivery" },
];

export const PersonalizationSidebar = ({
  data,
  onUpdate,
  onClose,
  onSectionChange,
  onTemplateSelect,
  onOpenPreview,
}: PersonalizationSidebarProps) => {
  const [activeSection, setActiveSection] = useState<Section>("template");
  const [tab, setTab] = useState<"appearance" | "data">("appearance");

  const allSections = [...appearanceSections, ...dataSections];
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
      case "layout":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Disposizione</h3>
            <p className="text-sm text-muted-foreground">Attiva/disattiva e riordina le sezioni del template.</p>
            <div className="space-y-2">
              {order.map((key, idx)=> (
                <div key={key} className="flex items-center justify-between rounded border px-3 py-2 bg-white">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={!!enabled[key as keyof typeof enabled]} onChange={()=>toggleSection(key)} />
                    <span className="text-sm font-medium capitalize">{sectionLabels[key] || key}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={()=>moveSection(idx,-1)} className="text-xs px-2 py-1 rounded bg-gray-100">↑</button>
                    <button onClick={()=>moveSection(idx,1)} className="text-xs px-2 py-1 rounded bg-gray-100">↓</button>
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
            <div className="grid grid-cols-3 gap-3">
              {(data.gallery || []).map((g, idx)=> (
                <div key={g.id} className="relative group">
                  <img src={g.url} className="w-full h-24 object-cover rounded" />
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
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={async (e)=>{
                  const files = Array.from(e.target.files || []).slice(0,12);
                  const read = (f: File)=> new Promise<string>((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result as string); r.onerror=rej; r.readAsDataURL(f); });
                  const urls = await Promise.all(files.map(read));
                  const items = urls.map((u,i)=>({ id: `gal-${Date.now()}-${i}`, url: u, type: "image" as const }));
                  onUpdate({ gallery: [...(data.gallery||[]), ...items] });
                }}
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
      {/* Header rimosso su richiesta */}

      {/* Tabs */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white text-xs font-medium">
        <div className="flex items-center gap-2">
          <button onClick={()=>setTab("appearance")} className={`px-3 py-1.5 rounded ${tab==="appearance"?"bg-gray-100 text-gray-900":"text-gray-600 hover:text-gray-900"}`}>Aspetto</button>
          <button onClick={()=>setTab("data")} className={`px-3 py-1.5 rounded ${tab==="data"?"bg-gray-100 text-gray-900":"text-gray-600 hover:text-gray-900"}`}>Dati</button>
        </div>
        <div className="flex items-center gap-2">

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
              <>{renderSectionContent()}</>
            ) : (
              <>{renderSectionContent()}</>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer actions rimossi su richiesta */}
    </div>
  );
};
