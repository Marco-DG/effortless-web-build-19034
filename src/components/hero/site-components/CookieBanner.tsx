import { BuilderData } from "../InteractiveBuilder";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { useState } from "react";

interface CookieBannerProps {
  data: BuilderData;
}

export const CookieBanner = ({ data }: CookieBannerProps) => {
  const [isVisible, setIsVisible] = useState(
    data.cookieBannerEnabled && !localStorage.getItem("cookieConsent")
  );

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible || !data.cookieBannerEnabled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando a navigare,
                accetti il nostro uso dei cookie.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="#cookie" className="text-gray-600 hover:underline">
                  Cookie Policy
                </a>
                <span className="text-gray-400">•</span>
                <a href="#privacy" className="text-gray-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectCookies}
              className="text-xs"
            >
              Rifiuta
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="text-xs"
            >
              Accetta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

