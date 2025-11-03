import { BuilderData } from "../InteractiveBuilder";
import { SiteHeader } from "../site-components/SiteHeader";
import { SiteHero } from "../site-components/SiteHero";
import { SiteAbout } from "../site-components/SiteAbout";
import { SiteMenu } from "../site-components/SiteMenu";
import { SiteEvents } from "../site-components/SiteEvents";
import { SiteReviews } from "../site-components/SiteReviews";
import { SiteFAQ } from "../site-components/SiteFAQ";
import { SiteContact } from "../site-components/SiteContact";
import { SiteNewsletter } from "../site-components/SiteNewsletter";
import { SiteFooter } from "../site-components/SiteFooter";
import { CookieBanner } from "../site-components/CookieBanner";

interface TemplateProps {
  data: BuilderData;
  activeSection?: string;
}

const templateColors = {
  primary: "#1a1a1a",
  secondary: "#3d3d3d",
  accent: "#00d9ff",
};

export const UrbanBarTemplate = ({ data, activeSection }: TemplateProps) => {
  const getSectionHighlight = (sectionId: string) => {
    if (activeSection === sectionId) {
      return "ring-4 ring-primary ring-opacity-50 transition-all duration-500";
    }
    return "";
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-white overflow-y-auto h-full">
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
      <div className={getSectionHighlight("reviews")}>
        <SiteReviews data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("faq")}>
        <SiteFAQ data={data} templateColors={templateColors} />
      </div>
      <div className={getSectionHighlight("contact")}>
        <SiteContact data={data} templateColors={templateColors} />
      </div>
      <SiteNewsletter data={data} templateColors={templateColors} />
      <div className={getSectionHighlight("footer")}>
        <SiteFooter data={data} templateColors={templateColors} />
      </div>
      <CookieBanner data={data} />
    </div>
  );
};
