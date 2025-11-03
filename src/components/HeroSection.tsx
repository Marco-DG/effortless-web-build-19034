import { HeroContent } from "./hero/HeroContent";
import { PersonalizationSidebar } from "./hero/PersonalizationSidebar";
import { WebsitePreview } from "./hero/WebsitePreview";
import { useState } from "react";
import { BuilderData, TemplateType } from "./hero/InteractiveBuilder";
import { getDefaultData } from "./hero/getDefaultData";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | undefined>();
  const [builderData, setBuilderData] = useState<BuilderData | null>(null);

  const handleStartBuilding = () => {
    setIsSidebarOpen(true);
    // Se non c'è template selezionato, carica default "trattoria"
    if (!builderData) {
      const defaultData = getDefaultData("trattoria");
      setBuilderData(defaultData);
    }
  };

  const handleTemplateSelect = (template: TemplateType) => {
    const defaultData = getDefaultData(template);
    setBuilderData(defaultData);
    setIsSidebarOpen(true);
  };

  const handleUpdateData = (data: Partial<BuilderData>) => {
    if (builderData) {
      setBuilderData((prev) => prev ? ({ ...prev, ...data }) : null);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Reset after animation
    setTimeout(() => setActiveSection(undefined), 2000);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Preview data: usa builderData se disponibile, altrimenti template vuoto
  const previewData: BuilderData = builderData || {
    template: "",
    businessName: "",
    businessType: "",
    logoUrl: "",
    tagline: "",
    menuItems: [],
    events: [],
    gallery: [],
    reviews: [],
    faqs: [],
    blogPosts: [],
    address: "",
    phone: "",
    email: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      tripadvisor: "",
    },
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-50 relative">
      {/* Left Column - Hero or Sidebar */}
      <div className={`w-full lg:w-1/3 flex-shrink-0 transition-all duration-500 ease-in-out ${
        isSidebarOpen 
          ? "translate-x-0 opacity-100" 
          : "translate-x-0 opacity-100"
      } ${isSidebarOpen ? "lg:static fixed lg:relative z-50 lg:z-auto" : ""}`}>
        {!isSidebarOpen ? (
          // Hero Landing
          <div className="h-full flex items-center justify-center p-6 sm:p-12 lg:p-16">
            <div className="text-center space-y-8 sm:space-y-10 max-w-md w-full">
              <HeroContent />
              <button
                onClick={handleStartBuilding}
                className="w-full text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Crea il mio sito ora
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          // Sidebar
          <PersonalizationSidebar
            data={builderData || getDefaultData("trattoria")}
            onUpdate={handleUpdateData}
            onTemplateSelect={handleTemplateSelect}
            onSectionChange={handleSectionChange}
            onClose={handleCloseSidebar}
          />
        )}
      </div>

      {/* Right Column - Preview (always visible) */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 min-h-0 lg:min-h-full relative">
        <div className="w-full h-full max-w-7xl">
          <WebsitePreview data={previewData} activeSection={activeSection} />
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
