import { HeroContent } from "./hero/HeroContent";
import { PersonalizationSidebar } from "./hero/PersonalizationSidebar";
import { WebsitePreview } from "./hero/WebsitePreview";
import { useState } from "react";
import { BuilderData } from "./hero/InteractiveBuilder";
import { getDefaultData } from "./hero/getDefaultData";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | undefined>();
  const [builderData, setBuilderData] = useState<BuilderData>(() => getDefaultData("trattoria"));

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleUpdateData = (data: Partial<BuilderData>) => {
    setBuilderData((prev) => ({ ...prev, ...data }));
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Reset after animation
    setTimeout(() => setActiveSection(undefined), 2000);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-50 relative">
      {/* Left Column - Landing or Sidebar */}
      <div className={`w-full lg:w-1/3 flex-shrink-0 transition-all duration-300 ${
        isEditing ? "lg:w-96" : ""
      } ${isEditing ? "h-full absolute lg:relative z-50 lg:z-auto" : "h-full lg:h-auto"}`}>
        {!isEditing ? (
          <div className="h-full flex items-center justify-center p-6 sm:p-12">
            <div className="text-center space-y-6 sm:space-y-8 max-w-md w-full">
              <HeroContent />
              <button
                onClick={handleStartEditing}
                className="w-full text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Crea il mio sito ora
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <PersonalizationSidebar
            data={builderData}
            onUpdate={handleUpdateData}
            onSectionChange={handleSectionChange}
            onClose={() => setIsEditing(false)}
          />
        )}
      </div>

      {/* Right Column - Preview */}
      <div className={`flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0 lg:min-h-full transition-all duration-300 ${
        isEditing ? "lg:ml-0" : ""
      }`}>
        <div className="w-full h-full max-w-7xl">
          <WebsitePreview data={builderData} activeSection={activeSection} />
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isEditing && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsEditing(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
