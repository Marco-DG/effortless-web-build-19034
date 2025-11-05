import { BuilderData } from "./InteractiveBuilder";
import React, { Suspense, lazy } from "react";

const TrattoriaTemplate = lazy(() => import("./templates/TrattoriaTemplate").then(m => ({ default: m.TrattoriaTemplate })));
const UrbanBarTemplate = lazy(() => import("./templates/UrbanBarTemplate").then(m => ({ default: m.UrbanBarTemplate })));
const DolceVitaTemplate = lazy(() => import("./templates/DolceVitaTemplate").then(m => ({ default: m.DolceVitaTemplate })));
const CraftPubTemplate = lazy(() => import("./templates/CraftPubTemplate").then(m => ({ default: m.CraftPubTemplate })));
const WineBarTemplate = lazy(() => import("./templates/WineBarTemplate").then(m => ({ default: m.WineBarTemplate })));
const FineDiningTemplate = lazy(() => import("./templates/FineDiningTemplate").then(m => ({ default: m.FineDiningTemplate })));

import { Monitor } from "lucide-react";

interface WebsitePreviewProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
  hideHeader?: boolean;
}

export const WebsitePreview = ({ data, activeSection, fontFamily = "Inter", hideHeader = false }: WebsitePreviewProps) => {
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
      case "trattoria":
        return <TrattoriaTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} />;
      case "urban-bar":
        return <UrbanBarTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} />;
      case "dolce-vita":
        return <DolceVitaTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} />;
      case "craft-pub":
        return <CraftPubTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} />;
      case "wine-bar":
        return <WineBarTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} />;
      case "fine-dining":
        return <FineDiningTemplate data={data} activeSection={activeSection} fontFamily={fontFamily} />;
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
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border-b border-border">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide">Anteprima Live</span>
        </div>
      )}
      
      {/* Preview Content */}
      <div 
        className="flex-1 overflow-y-auto bg-white"
        style={{ fontFamily: fontFamily }}
      >
        <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Caricamento…</div>}>{renderTemplate()}</Suspense>
      </div>
    </div>
  );
};
