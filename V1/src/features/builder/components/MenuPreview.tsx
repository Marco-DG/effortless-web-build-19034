import React from "react";
import { BuilderData } from "@/types/builder";
import { SiteMenu } from "@/features/templates/components/SiteMenu";

interface MenuPreviewProps {
  data: BuilderData;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({ data }) => {
  // Focused canvas-like area for menu only, using the shared SiteMenu renderer
  return (
    <div className="h-full w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-50 via-white to-neutral-100">
      <div className="w-full h-full flex items-center justify-center">
        <div className="aspect-video w-full max-w-5xl rounded-2xl border border-border/60 bg-white shadow-lg overflow-hidden">
          <div className="h-full w-full overflow-y-auto">
            <section className="px-0">
              <SiteMenu data={data} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPreview;
