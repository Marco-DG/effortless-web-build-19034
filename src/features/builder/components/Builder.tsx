import { HeroContent } from "./HeroContent";
import { BuilderSidebar } from "./BuilderSidebar";
import { TemplatePreview } from "./TemplatePreview";
import { LogoPreview } from "./LogoPreview";
import { X } from "lucide-react";

import { useBuilderState } from "../hooks/useBuilderState";
import { ParallaxOrbs } from "@/components/visual/ParallaxOrbs";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";


export const Builder = () => {
  const {
    isSidebarOpen,
    isPreviewOpen,
    activeSection,
    builderData,
    previewData,
    actions,
  } = useBuilderState();
  const [macroTab, setMacroTab] = useState<"logo" | "appearance" | "data">("appearance");

  return (
    <div className="min-h-screen h-full flex flex-col lg:flex-row overflow-hidden relative luxe-gradient-bg">
      <div className="pointer-events-none absolute inset-0 noise-bg" aria-hidden />
      {/* Left Column - Hero or Sidebar */}
      <div
        className={`w-full lg:w-[37.5%] flex-shrink-0 transition-all duration-700 ease-out ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-0 opacity-100"
        } ${isSidebarOpen ? "lg:static fixed lg:relative z-50 lg:z-auto h-full" : ""}`}
      >
        {!isSidebarOpen ? (
          // Hero Landing
          <div className="h-full flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-20 relative">
            <ParallaxOrbs />
            <div className="relative z-10 space-y-8 sm:space-y-12 max-w-2xl w-full">
              <HeroContent actions={actions} />

            </div>
          </div>
        ) : (
          // Sidebar
          <>
            <BuilderSidebar
              data={previewData}
              onUpdate={actions.updateData}
              onTemplateSelect={actions.selectTemplate}
              onSectionChange={actions.changeSection}
              onClose={actions.closeSidebar}
              onOpenPreview={actions.openPreview}
              macroTab={macroTab}
              onMacroTabChange={setMacroTab}
            />
          </>
        )}
      </div>

      {/* Right Column - Preview (desktop always visible, mobile in modal) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8 min-h-0 lg:min-h-full relative">
        <div className="w-full h-full max-w-7xl">
          {macroTab === "logo" ? (
            <LogoPreview data={previewData} />
          ) : (
            <TemplatePreview
              data={previewData}
              activeSection={activeSection}
              fontFamily={builderData?.fontFamily}
            />
          )}
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
          <div className="lg:hidden fixed inset-0 z-[70] bg-white/70 backdrop-blur-sm overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur border-b border-border">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("builderData", JSON.stringify(previewData));
                  window.open("/preview", "_blank");
                }}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Apri anteprima in nuova scheda"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Nuova scheda</span>
              </button>
              
              <button
                type="button"
                onClick={actions.closePreview}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Chiudi</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto bg-white">
              {macroTab === "logo" ? (
               <LogoPreview data={previewData} />
             ) : (
               <TemplatePreview
                 data={previewData}
                 activeSection={activeSection}
                 fontFamily={builderData?.fontPrimary || builderData?.fontFamily}
                 hideHeader={true}
               />
             )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
