import { TemplatePreview } from "@/features/builder";
import { getDefaultData } from "@/lib/defaultData";
import { BuilderData } from "@/types/builder";

export default function Preview() {
  // Recupera i dati dal localStorage o usa default
  const builderData = (() => {
    try {
      const stored = localStorage.getItem("builderData");
      if (stored) {
        return JSON.parse(stored) as BuilderData;
      }
    } catch (error) {
      console.warn("Error parsing stored builder data:", error);
    }
    return getDefaultData("wine-bar");
  })();

  return (
    <div className="min-h-screen bg-background">
      <TemplatePreview 
        data={builderData}
        hideHeader={true}
        fontFamily={builderData.fontFamily}
      />
    </div>
  );
}