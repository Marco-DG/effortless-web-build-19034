import React from "react";
import { BuilderData } from "@/types/builder";
import { ensureGoogleFontLoaded } from "@/lib/fonts";

interface LogoPreviewProps {
  data: BuilderData;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ data }) => {
  const useText = data.logoMode === "text" || !data.logoUrl;
  const text = data.logoText || data.businessName || "Il Tuo Logo";
  const font = data.logoFont || data.fontSecondary || data.fontPrimary || "Inter";

  React.useEffect(() => {
    if (font) ensureGoogleFontLoaded(font);
  }, [font]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-50 via-white to-neutral-100">
      <div className="w-full h-full flex items-center justify-center">
        <div className="aspect-video w-full max-w-3xl rounded-2xl border border-border/60 bg-white shadow-lg overflow-hidden flex items-center justify-center">
          {/* Canvas area */}
          <div className="w-full h-full flex items-center justify-center p-8">
            {useText ? (
              <div className="text-center">
                <div
                  className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight heading"
                  style={{ fontFamily: font }}
                >
                  {text}
                </div>
                {data.tagline && (
                  <div className="mt-4 text-base sm:text-lg text-muted-foreground" style={{ fontFamily: data.fontPrimary || "Inter" }}>
                    {data.tagline}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.logoUrl}
                  alt="Logo"
                  className="max-h-48 sm:max-h-56 md:max-h-64 w-auto object-contain drop-shadow"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoPreview;
