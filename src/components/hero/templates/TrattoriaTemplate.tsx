import { BuilderData } from "../InteractiveBuilder";
import { SiteHeader } from "../site-components/SiteHeader";
import { SiteHero } from "../site-components/SiteHero";
import { SiteAbout } from "../site-components/SiteAbout";
import { SiteMenu } from "../site-components/SiteMenu";
import { SiteEvents } from "../site-components/SiteEvents";
import { SiteGallery } from "../site-components/SiteGallery";
import { SiteReviews } from "../site-components/SiteReviews";
import { SiteFAQ } from "../site-components/SiteFAQ";
import { SiteReservation } from "../site-components/SiteReservation";
import { SiteContact } from "../site-components/SiteContact";
import { SiteBlog } from "../site-components/SiteBlog";
import { SiteNewsletter } from "../site-components/SiteNewsletter";
import { SiteFooter } from "../site-components/SiteFooter";
import { PromoBanner } from "../site-components/PromoBanner";

interface TemplateProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
}

const templateColors = {
  primary: "#8B4513",
  secondary: "#D2691E",
  accent: "#F4A460",
};

export const TrattoriaTemplate = ({ data, activeSection, fontFamily = "Inter" }: TemplateProps) => {
  const getSectionHighlight = (sectionId: string) => {
    if (activeSection === sectionId) {
      return "ring-4 ring-primary ring-opacity-50 transition-all duration-500";
    }
    return "";
  };

  return (
    <div 
      className="w-full bg-white text-gray-900 overflow-y-auto h-full"
      style={{ fontFamily: fontFamily }}
    >
      <PromoBanner data={data} templateColors={templateColors} />
      <div className={getSectionHighlight("hero")}>
        <SiteHeader data={data} templateColors={templateColors} />
        <SiteHero data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("about")}>
        <SiteAbout data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("menu")}>
        <SiteMenu data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("events")}>
        <SiteEvents data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("gallery")}>
        <SiteGallery data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("reviews")}>
        <SiteReviews data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("reservation")}>
        <SiteReservation data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("faq")}>
        <SiteFAQ data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("blog")}>
        <SiteBlog data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("contact")}>
        <SiteContact data={data} templateColors={templateColors} />
      </div>
      <SiteNewsletter data={data} templateColors={templateColors} />
      <div className={getSectionHighlight("footer")}>
        <SiteFooter data={data} templateColors={templateColors} />
      </div>
    </div>
  );
};
