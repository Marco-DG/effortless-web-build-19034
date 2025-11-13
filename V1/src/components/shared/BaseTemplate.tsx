import React from "react";
import { BuilderData } from "@/types/builder";
import { PromoBanner } from "@/features/templates/components/PromoBanner";
import { SiteFooter } from "@/features/templates/components/SiteFooter";
import { SiteHeader } from "@/features/templates/components/SiteHeader";

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
}

export interface TemplateProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
  templateColors: TemplateColors;
  components: Record<string, React.ReactNode>;
  singlePage?: boolean;
}

export const BaseTemplate: React.FC<TemplateProps> = ({
  data,
  activeSection,
  fontFamily = "Inter",
  templateColors,
  components,
  singlePage = true
}) => {
  const getSectionHighlight = (sectionId: string) => {
    if (activeSection === sectionId) {
      return "ring-4 ring-primary ring-opacity-50 transition-all duration-500";
    }
    return "";
  };

  const orderedSections = data.sectionsOrder || ["hero", "about", "menu", "gallery", "contact", "newsletter"];
  const enabledSections = data.sectionsEnabled || { 
    hero: true, about: true, menu: true, gallery: true, contact: true, newsletter: true 
  };

  return (
    <div 
      className="w-full bg-white text-gray-900 overflow-y-auto h-full"
      style={{ fontFamily }}
    >
      <PromoBanner data={data} templateColors={templateColors} />
      <SiteHeader data={data} templateColors={templateColors} />
      
      {singlePage ? (
        <>
          {orderedSections.map(sectionId =>
            enabledSections[sectionId as keyof typeof enabledSections]
              ? (
                <section id={sectionId} key={sectionId} className="scroll-mt-24">
                  {components[sectionId]}
                </section>
              )
              : null
          )}
          <div className={getSectionHighlight("footer")}>
            <SiteFooter data={data} templateColors={templateColors} />
          </div>
        </>
      ) : (
        <>
          {orderedSections.map(sectionId => (
            <main key={sectionId} id={sectionId} className="scroll-mt-24">
              {enabledSections[sectionId as keyof typeof enabledSections] && components[sectionId]}
              <SiteFooter data={data} templateColors={templateColors} />
            </main>
          ))}
        </>
      )}
    </div>
  );
};