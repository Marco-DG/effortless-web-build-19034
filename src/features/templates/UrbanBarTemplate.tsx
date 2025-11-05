import { BuilderData } from "@/types/builder";
import { SiteHeader } from "./components/SiteHeader";
import { SiteHero } from "./components/SiteHero";
import { SiteAbout } from "./components/SiteAbout";
import { SiteMenu } from "./components/SiteMenu";
import { SiteEvents } from "./components/SiteEvents";
import { SiteGallery } from "./components/SiteGallery";
import { SiteReviews } from "./components/SiteReviews";
import { SiteFAQ } from "./components/SiteFAQ";
import { SiteReservation } from "./components/SiteReservation";
import { SiteContact } from "./components/SiteContact";
import { SiteBlog } from "./components/SiteBlog";
import { SiteNewsletter } from "./components/SiteNewsletter";
import { SiteFooter } from "./components/SiteFooter";
import { PromoBanner } from "./components/PromoBanner";

interface TemplateProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
}

const templateColors = {
  primary: "#1a1a1a",
  secondary: "#3d3d3d",
  accent: "#00d9ff",
};

export const UrbanBarTemplate = ({ data, activeSection, fontFamily = "Inter" }: TemplateProps) => {
  const getSectionHighlight = (sectionId: string) => {
    if (activeSection === sectionId) {
      return "ring-4 ring-primary ring-opacity-50 transition-all duration-500";
    }
    return "";
  };

  const components: Record<string, React.ReactNode> = {
    hero: (
      <div className={getSectionHighlight("hero")}>
        <SiteHero data={data} templateColors={templateColors} />
      </div>
    ),
    about: (
      <div className={getSectionHighlight("about")}>
        <SiteAbout data={data} templateColors={templateColors} />
      </div>
    ),
    menu: (
      <div className={getSectionHighlight("menu")}>
        <SiteMenu data={data} templateColors={templateColors} />
      </div>
    ),
    events: (
      <div className={getSectionHighlight("events")}>
        <SiteEvents data={data} templateColors={templateColors} />
      </div>
    ),
    gallery: (
      <div className={getSectionHighlight("gallery")}>
        <SiteGallery data={data} templateColors={templateColors} />
      </div>
    ),
    reviews: (
      <div className={getSectionHighlight("reviews")}>
        <SiteReviews data={data} templateColors={templateColors} />
      </div>
    ),
    reservation: (
      <div className={getSectionHighlight("reservation")}>
        <SiteReservation data={data} templateColors={templateColors} />
      </div>
    ),
    faq: (
      <div className={getSectionHighlight("faq")}>
        <SiteFAQ data={data} templateColors={templateColors} />
      </div>
    ),
    blog: (
      <div className={getSectionHighlight("blog")}>
        <SiteBlog data={data} templateColors={templateColors} />
      </div>
    ),
    contact: (
      <div className="contact">
        <SiteContact data={data} templateColors={templateColors} />
      </div>
    ),
    newsletter: (
      <div className="newsletter">
        <SiteNewsletter data={data} templateColors={templateColors} />
      </div>
    ),
  };

  const orderedSections = data.sectionsOrder || ["hero","about","menu","gallery","contact","newsletter"];
  const enabledSections = data.sectionsEnabled || { hero: true, about: true, menu: true, gallery: true, contact: true, newsletter: true };

  return (
    <div 
      className="w-full bg-[#0a0a0a] text-white overflow-y-auto h-full"
      style={{ fontFamily: fontFamily }}
    >
      <PromoBanner data={data} templateColors={templateColors} />
      <SiteHeader data={data} templateColors={templateColors} />
      
      {orderedSections.map(sectionId =>
        enabledSections[sectionId as keyof typeof enabledSections]
          ? components[sectionId]
          : null
      )}

      <div className={getSectionHighlight("footer")}>
        <SiteFooter data={data} templateColors={templateColors} />
      </div>
    </div>
  );
};
