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
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50/50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,1),transparent_50%)] pointer-events-none" />
      
      {/* Left Column - Hero or Sidebar */}
      <div className={`w-full lg:w-1/3 flex-shrink-0 transition-all duration-700 ease-out ${
        isSidebarOpen 
          ? "translate-x-0 opacity-100" 
          : "translate-x-0 opacity-100"
      } ${isSidebarOpen ? "lg:static fixed lg:relative z-50 lg:z-auto" : ""}`}>
        {!isSidebarOpen ? (
          // Hero Landing
          <div className="h-full flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-20 relative">
            {/* Subtle light effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-8 sm:space-y-12 max-w-lg w-full">
              <HeroContent />
              <button
                onClick={handleStartBuilding}
                className="group relative w-full text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">Crea il mio sito ora</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
          <WebsitePreview data={previewData} activeSection={activeSection} fontFamily={builderData?.fontFamily} />
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
