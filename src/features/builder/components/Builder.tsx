import { HeroContent } from "./HeroContent";
import { BuilderSidebar } from "./BuilderSidebar";
import { TemplatePreview } from "./TemplatePreview";
import { ArrowRight, X, PenTool, LayoutDashboard, ScrollText, Sparkles } from "lucide-react";
import { useBuilderState } from "../hooks/useBuilderState";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { ParallaxOrbs } from "@/components/visual/ParallaxOrbs";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Reusable CTA button themed after the three badges (emerald, primary, fuchsia)
type Theme = "emerald" | "primary" | "fuchsia" | "amber";

const themeStyles: Record<Theme, {
  overlay: string;
  ring: string;
  iconText: string;
  iconBg: string;
  badgeRing: string;
  badgeDot: string;
  badgeText: string;
  badgeIcon: string;
}> = {
  emerald: {
    overlay: "from-emerald-100/50",
    ring: "ring-emerald-300 hover:ring-emerald-400/70",
    iconText: "text-emerald-700",
    iconBg: "bg-white/30",
    badgeRing: "",
    badgeDot: "bg-emerald-500",
    badgeText: "bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600",
    badgeIcon: "text-emerald-500",
  },
  primary: {
    overlay: "from-primary/20",
    ring: "ring-primary/30 hover:ring-primary/50",
    iconText: "text-primary",
    iconBg: "bg-white/30",
    badgeRing: "",
    badgeDot: "bg-primary",
    badgeText: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60",
    badgeIcon: "text-primary",
  },
  fuchsia: {
    overlay: "from-fuchsia-200/50",
    ring: "ring-fuchsia-300 hover:ring-fuchsia-400/70",
    iconText: "text-fuchsia-700",
    iconBg: "bg-white/30",
    badgeRing: "",
    badgeDot: "bg-fuchsia-500",
    badgeText: "bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-500",
    badgeIcon: "text-fuchsia-500",
  },
  amber: {
    overlay: "from-rose-100/60",
    ring: "ring-rose-300 hover:ring-rose-400/80",
    iconText: "text-rose-700",
    iconBg: "bg-white/30",
    badgeRing: "",
    badgeDot: "bg-rose-500",
    badgeText: "bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-orange-500",
    badgeIcon: "text-rose-500",
  },
};

interface CTAButtonProps {
  onClick: () => void;
  icon: ReactNode;
  title: string;
  subtitle: string;
  theme: Theme;
}

const CTAButton = ({ onClick, icon, title, subtitle, theme }: CTAButtonProps) => {
  const t = themeStyles[theme];
  return (
    <MagneticButton
      onClick={onClick}
      className={`group relative w-full text-left px-5 sm:px-6 py-4 bg-white/80 backdrop-blur text-foreground rounded-2xl transition-all duration-300 elev-1 hover:shadow-xl group-hover:shadow-xl flex items-center justify-between gap-4 overflow-hidden ring-1 ${t.ring} transform hover:-translate-y-0.5`}
    >
      <span className={`absolute inset-0 bg-gradient-to-l ${t.overlay} to-transparent opacity-100 transition-opacity duration-500`} />

      <span className={`relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-xl ${t.iconBg} ${t.iconText}`}>
        {icon}
      </span>

      <span className="relative z-10 flex-1 min-w-0">
        <span className="block text-base sm:text-lg font-semibold leading-snug inline-flex items-center gap-2 flex-wrap">
          <span>{title}</span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/70 ring-1 ring-white/60 text-[10px] font-medium">
            <Sparkles className={`w-3 h-3 ${t.badgeIcon}`} />
            <span className={`${t.badgeText}`}>IA</span>
          </span>
        </span>
        <span className="block text-xs sm:text-sm text-muted-foreground">{subtitle}</span>
      </span>

      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </MagneticButton>
  );
};

export const Builder = () => {
  const {
    isSidebarOpen,
    isPreviewOpen,
    activeSection,
    builderData,
    previewData,
    actions,
  } = useBuilderState();

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
              <HeroContent />
              <div className="[perspective:1000px]">
              <div className="[transform-style:preserve-3d] will-change-transform">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.22,1,0.36,1] }}>
                <div className="grid grid-cols-1 gap-3">
                  <CTAButton
                    onClick={() => {
                      actions.openSidebar();
                      actions.changeSection("typography");
                    }}
                    icon={<PenTool className="w-5 h-5" />}
                    title="Disegna il tuo logo"
                    subtitle="Genera proposte, palette e varianti tipografiche"
                    theme="emerald"
                  />

                  <CTAButton
                    onClick={() => {
                      actions.openSidebar();
                      actions.changeSection("menu");
                    }}
                    icon={<ScrollText className="w-5 h-5" />}
                    title="Scrivi il tuo menù"
                    subtitle="Crea sezioni, piatti e prezzi in pochi clic"
                    theme="amber"
                  />

                  <CTAButton
                    onClick={actions.startBuilding}
                    icon={<LayoutDashboard className="w-5 h-5" />}
                    title="Costruisci il tuo sito"
                    subtitle="Template, sezioni e tipografia in pochi clic"
                    theme="fuchsia"
                  />
                </div>

              </motion.div>
                </div>
                </div>
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
            />
          </>
        )}
      </div>

      {/* Right Column - Preview (desktop always visible, mobile in modal) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8 min-h-0 lg:min-h-full relative">
        <div className="w-full h-full max-w-7xl">
          <TemplatePreview
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
          <div className="lg:hidden fixed inset-0 z-[70] bg-white/70 backdrop-blur-sm overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-white/90 backdrop-blur border-b border-border">
              <button
                type="button"
                onClick={() => {
                  const builderData = localStorage.getItem("builderData");
                  if (builderData) {
                    localStorage.setItem("builderData", builderData);
                  } else {
                    localStorage.setItem("builderData", JSON.stringify(previewData));
                  }
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
              <TemplatePreview
                data={previewData}
                activeSection={activeSection}
                fontFamily={builderData?.fontPrimary || builderData?.fontFamily}
                hideHeader={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
