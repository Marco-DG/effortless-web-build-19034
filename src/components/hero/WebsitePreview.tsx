import { BuilderData } from "./InteractiveBuilder";
import { Monitor } from "lucide-react";
import { TrattoriaTemplate } from "./templates/TrattoriaTemplate";
import { UrbanBarTemplate } from "./templates/UrbanBarTemplate";
import { DolceVitaTemplate } from "./templates/DolceVitaTemplate";
import { CraftPubTemplate } from "./templates/CraftPubTemplate";

interface WebsitePreviewProps {
  data: BuilderData;
}

export const WebsitePreview = ({ data }: WebsitePreviewProps) => {
  const renderTemplate = () => {
    if (!data.template) {
      return (
        <div className="h-[800px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <Monitor className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <h3 className="text-2xl font-heading font-semibold text-muted-foreground">
              Seleziona un template per iniziare
            </h3>
            <p className="text-muted-foreground/70">
              Il tuo sito apparirà qui in tempo reale
            </p>
          </div>
        </div>
      );
    }

    switch (data.template) {
      case "trattoria":
        return <TrattoriaTemplate data={data} />;
      case "urban-bar":
        return <UrbanBarTemplate data={data} />;
      case "dolce-vita":
        return <DolceVitaTemplate data={data} />;
      case "craft-pub":
        return <CraftPubTemplate data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in-up-delay-1 sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Anteprima Live
          </span>
        </div>
        {data.template && (
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        )}
      </div>

      <div className="relative">
        {renderTemplate()}
      </div>
    </div>
  );
};
