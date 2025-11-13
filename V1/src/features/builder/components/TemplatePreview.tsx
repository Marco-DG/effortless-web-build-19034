import { BuilderData } from "@/types/builder";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { ensureGoogleFontLoaded } from "@/lib/fonts";
import { ViewportMode, getAvailableViewports } from "@/components/ui/viewport-selector";

const WineBarTemplate = lazy(() => import("@/features/templates/WineBarTemplate").then(m => ({ default: m.WineBarTemplate })));
const FineDiningTemplate = lazy(() => import("@/features/templates/FineDiningTemplate").then(m => ({ default: m.FineDiningTemplate })));
const TrattoriaTemplate = lazy(() => import("@/features/templates/TrattoriaTemplate").then(m => ({ default: m.TrattoriaTemplate })));

interface TemplatePreviewProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
  hideHeader?: boolean;
}

export const TemplatePreview = ({ data, activeSection, fontFamily = "Inter", hideHeader = false }: TemplatePreviewProps) => {
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
  const [availableViewports, setAvailableViewports] = useState<ViewportMode[]>(["desktop", "tablet", "mobile"]);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [wasManuallySet, setWasManuallySet] = useState(false);

  useEffect(() => {
    const updateViewportLogic = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileDevice(isMobile);
      
      if (isMobile) {
        // Su mobile: solo modalità responsive nativa
        setViewportMode("desktop"); // sempre 100% width su mobile
        setAvailableViewports([]);
      } else {
        // Su desktop: tutte le modalità disponibili
        const available = getAvailableViewports();
        setAvailableViewports(available);
        
        // Se passiamo da mobile a desktop E non è stato impostato manualmente, forza desktop
        if (window.innerWidth >= 1024 && viewportMode !== "desktop" && !wasManuallySet) {
          setViewportMode("desktop");
        } else if (!available.includes(viewportMode)) {
          setViewportMode(available[0]);
          setWasManuallySet(false);
        }
      }
    };

    updateViewportLogic();
    window.addEventListener("resize", updateViewportLogic);
    return () => window.removeEventListener("resize", updateViewportLogic);
  }, [viewportMode, wasManuallySet]);
  useEffect(() => {
    if (fontFamily) ensureGoogleFontLoaded(fontFamily);
  }, [fontFamily]);

  const headingFamily = (data as any)?.fontSecondary || fontFamily;
  useEffect(() => { if (headingFamily) ensureGoogleFontLoaded(headingFamily); }, [headingFamily]);

  const renderTemplate = () => {
    if (!data.template) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg">
          <div className="text-center text-gray-500">
            <p className="text-lg">Caricamento template...</p>
          </div>
        </div>
      );
    }

    switch (data.template) {
      case "wine-bar":
        return <WineBarTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} singlePage={data.singlePage ?? true} />;
      case "fine-dining":
        return <FineDiningTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} singlePage={data.singlePage ?? true} />;
      case "trattoria":
        return <TrattoriaTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} singlePage={data.singlePage ?? true} />;
      default:
        return (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg">
            <div className="text-center text-gray-500">
              <p className="text-lg">Template non trovato</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-full w-full flex flex-col bg-white ${hideHeader ? "" : "rounded-2xl elev-2 border border-border/50"} overflow-hidden`}>
      {/* Label Anteprima Live - Premium */}
      {!hideHeader && (
        <div className="flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur border-b border-border">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("builderData", JSON.stringify(data));
              window.open("/preview", "_blank");
            }}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Apri anteprima in nuova scheda"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="hidden sm:inline">Nuova scheda</span>
          </button>
          
          {!isMobileDevice && availableViewports.length > 0 && (
            <div className="flex items-center gap-0.5">
              {availableViewports.map((mode) => {
                const Icon = mode === "desktop" ? Monitor : mode === "tablet" ? Tablet : Smartphone;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setViewportMode(mode);
                      setWasManuallySet(true);
                    }}
                    className={`p-1 rounded text-xs transition-colors ${
                      viewportMode === mode 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={`Vista ${mode}`}
                  >
                    <Icon className="w-3 h-3" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Preview Content */}
      <div className="flex-1 overflow-hidden bg-muted/5">
        <div 
          className={`h-full mx-auto bg-white builder-preview-root ${
            isMobileDevice ? "viewport-mobile" :
            viewportMode === "mobile" ? "viewport-mobile" : 
            viewportMode === "tablet" ? "viewport-tablet" : "viewport-desktop"
          }`}
          style={{
            width: isMobileDevice ? "100%" :
                   viewportMode === "desktop" ? "100%" : 
                   viewportMode === "tablet" ? "768px" : "375px",
            maxWidth: "100%",
            fontFamily,
            containerType: "inline-size"
          }}
        >
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            <div style={{ width: "100%", overflowX: "hidden" }}>
              {/* Inject heading font if provided */}
              {headingFamily && (
                <style>{`.builder-preview-root :is(h1,h2,h3,h4,h5,h6,.heading){font-family:'${headingFamily}', ${fontFamily}, serif !important;}`}</style>
              )}
              <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Caricamento…</div>}>
                {renderTemplate()}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
