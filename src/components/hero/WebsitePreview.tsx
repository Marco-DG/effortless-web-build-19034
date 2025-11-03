import { BuilderData } from "./InteractiveBuilder";
import { TrattoriaTemplate } from "./templates/TrattoriaTemplate";
import { UrbanBarTemplate } from "./templates/UrbanBarTemplate";
import { DolceVitaTemplate } from "./templates/DolceVitaTemplate";
import { CraftPubTemplate } from "./templates/CraftPubTemplate";
import { Monitor } from "lucide-react";

interface WebsitePreviewProps {
  data: BuilderData;
  activeSection?: string;
}

export const WebsitePreview = ({ data, activeSection }: WebsitePreviewProps) => {
  const renderTemplate = () => {
    if (!data.template) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center text-gray-500">
            <p className="text-lg">Caricamento template...</p>
          </div>
        </div>
      );
    }

    switch (data.template) {
      case "trattoria":
        return <TrattoriaTemplate data={data} activeSection={activeSection} />;
      case "urban-bar":
        return <UrbanBarTemplate data={data} activeSection={activeSection} />;
      case "dolce-vita":
        return <DolceVitaTemplate data={data} activeSection={activeSection} />;
      case "craft-pub":
        return <CraftPubTemplate data={data} activeSection={activeSection} />;
      default:
        return (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center text-gray-500">
              <p className="text-lg">Template non trovato</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
      {/* Label Anteprima Live */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
        <Monitor className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Anteprima Live
        </span>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {renderTemplate()}
      </div>
    </div>
  );
};
