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
  primary: "#2d5016",
  secondary: "#6b8e23",
  accent: "#daa520",
};

export const CraftPubTemplate = ({ data, activeSection, fontFamily = "Inter" }: TemplateProps) => {
  const getSectionHighlight = (sectionId: string) => {
    if (activeSection === sectionId) {
      return "ring-4 ring-primary ring-opacity-50 transition-all duration-500";
    }
    return "";
  };

  const components: Record<string, React.ReactNode> = {
    hero: (
      <div className={getSectionHighlight("hero")}>
        <SiteHeader data={data} templateColors={templateColors} />
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
      <div className={getSectionHighlight("contact")}>
        <SiteContact data={data} templateColors={templateColors} />
      </div>
    ),
  };

  const orderedSections = data.sectionsOrder || Object.keys(components);
  const enabledSections = data.sectionsEnabled || { hero: true, about: true, menu: true, gallery: true, contact: true };

  return (
    <div 
      className="w-full bg-[#1a120a] text-[#f5deb3] overflow-y-auto h-full"
      style={{ fontFamily: fontFamily }}
    >
      <PromoBanner data={data} templateColors={templateColors} />
      
      {orderedSections.map(sectionId =>
        enabledSections[sectionId as keyof typeof enabledSections]
          ? components[sectionId]
          : null
      )}

      <SiteNewsletter data={data} templateColors={templateColors} />
      <div className={getSectionHighlight("footer")}>
        <SiteFooter data={data} templateColors={templateColors} />
      </div>
    </div>
  );
};
