import { BuilderData } from "./InteractiveBuilder";
import { TrattoriaTemplate } from "./templates/TrattoriaTemplate";
import { UrbanBarTemplate } from "./templates/UrbanBarTemplate";
import { DolceVitaTemplate } from "./templates/DolceVitaTemplate";
import { CraftPubTemplate } from "./templates/CraftPubTemplate";
import { Monitor } from "lucide-react";

interface WebsitePreviewProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
}

export const WebsitePreview = ({ data, activeSection, fontFamily = "Inter" }: WebsitePreviewProps) => {
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
    <div className="h-full w-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50">
      {/* Label Anteprima Live - Premium */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <Monitor className="h-3.5 w-3.5 text-gray-500" />
        <span className="text-xs font-medium text-gray-600 tracking-wide">
          Anteprima Live
        </span>
      </div>
      
      {/* Preview Content */}
      <div 
        className="flex-1 overflow-y-auto bg-white"
        style={{ fontFamily: fontFamily }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
