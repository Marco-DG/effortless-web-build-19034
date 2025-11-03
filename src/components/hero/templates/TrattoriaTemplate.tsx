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
}

const templateColors = {
  primary: "#8B4513",
  secondary: "#D2691E",
  accent: "#F4A460",
};

export const TrattoriaTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="w-full bg-white text-gray-900 overflow-y-auto max-h-[800px] shadow-2xl rounded-lg">
      <SiteHeader data={data} templateColors={templateColors} />
      <SiteHero data={data} templateColors={templateColors} />
      <SiteAbout data={data} templateColors={templateColors} />
      <SiteMenu data={data} templateColors={templateColors} />
      <SiteEvents data={data} templateColors={templateColors} />
      <SiteReviews data={data} templateColors={templateColors} />
      <SiteFAQ data={data} templateColors={templateColors} />
      <SiteContact data={data} templateColors={templateColors} />
      <SiteNewsletter data={data} templateColors={templateColors} />
      <SiteFooter data={data} templateColors={templateColors} />
      <CookieBanner data={data} />
    </div>
  );
};
