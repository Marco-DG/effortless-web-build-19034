import { HeroContent } from "./hero/HeroContent";
import { PersonalizationSidebar } from "./hero/PersonalizationSidebar";
import { WebsitePreview } from "./hero/WebsitePreview";
import { ArrowRight, Monitor, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderState } from "../hooks/useBuilderState";

export const Hero = () => {
  const {
    isSidebarOpen,
    isPreviewOpen,
    activeSection,
    builderData,
    previewData,
    actions,
  } = useBuilderState();

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-50 relative">
      {/* Left Column - Hero or Sidebar */}
      <div
        className={`w-full lg:w-1/3 flex-shrink-0 transition-all duration-700 ease-out ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-0 opacity-100"
        } ${isSidebarOpen ? "lg:static fixed lg:relative z-50 lg:z-auto h-full" : ""}`}
      >
        {!isSidebarOpen ? (
          // Hero Landing
          <div className="h-full flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-20 relative">
            <div className="relative z-10 space-y-8 sm:space-y-12 max-w-lg w-full">
              <HeroContent />
              <button
                onClick={actions.startBuilding}
                className="group relative w-full text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">Crea il mio sito ora</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ) : (
          // Sidebar
          <>
            <PersonalizationSidebar
              data={previewData}
              onUpdate={actions.updateData}
              onTemplateSelect={actions.selectTemplate}
              onSectionChange={actions.changeSection}
              onClose={actions.closeSidebar}
              onOpenPreview={actions.openPreview}
            />
          </>
        )}
      </div>

      {/* Right Column - Preview (desktop always visible, mobile in modal) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8 min-h-0 lg:min-h-full relative">
        <div className="w-full h-full max-w-7xl">
          <WebsitePreview
            data={previewData}
            activeSection={activeSection}
            fontFamily={builderData?.fontFamily}
          />
        </div>
      </div>

      {/* Mobile Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={actions.closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile Preview Modal */}
      {isPreviewOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
            onClick={actions.closePreview}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed inset-0 z-[70] bg-white overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <Monitor className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Anteprima Live
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={actions.closePreview}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Chiudi
              </Button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              <WebsitePreview
                data={previewData}
                activeSection={activeSection}
                fontFamily={builderData?.fontFamily}
                hideHeader={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
