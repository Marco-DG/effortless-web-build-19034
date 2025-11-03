import { BuilderData } from "../InteractiveBuilder";
import { X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const PromoBanner = ({ data, templateColors }: PromoBannerProps) => {
  const [isVisible, setIsVisible] = useState(
    data.promoBanner?.enabled && !sessionStorage.getItem("promoBannerDismissed")
  );

  if (!isVisible || !data.promoBanner?.enabled) return null;

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("promoBannerDismissed", "true");
  };

  const handleClick = () => {
    if (data.promoBanner?.link) {
      const element = document.querySelector(data.promoBanner.link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 shadow-lg animate-slide-down"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-bold text-white text-sm sm:text-base mb-1">
              {data.promoBanner.title}
            </h4>
            {data.promoBanner.description && (
              <p className="text-white/90 text-xs sm:text-sm">
                {data.promoBanner.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {data.promoBanner.link && (
              <Button
                size="sm"
                onClick={handleClick}
                className="text-xs sm:text-sm"
                style={{ backgroundColor: secondaryColor }}
              >
                Scopri di più
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            )}
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

