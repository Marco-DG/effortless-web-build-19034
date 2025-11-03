import { HeroContent } from "./hero/HeroContent";
import { InteractiveBuilder } from "./hero/InteractiveBuilder";
import { WebsitePreview } from "./hero/WebsitePreview";
import { useState } from "react";
import { BuilderData } from "./hero/InteractiveBuilder";

export const HeroSection = () => {
  const [builderData, setBuilderData] = useState<BuilderData>({
    template: "",
    businessName: "",
    businessType: "",
    logoUrl: "",
    tagline: "",
    menuItems: [],
    socialLinks: {
      facebook: "",
      instagram: "",
      tripadvisor: "",
    },
    address: "",
    phone: "",
    email: "",
  });

  return (
    <section className="min-h-screen px-6 lg:px-12 py-12 lg:py-20 max-w-[1800px] mx-auto">
      <div className="grid lg:grid-cols-[500px_1fr] gap-8 lg:gap-12 items-start">
        <div className="space-y-8">
          <HeroContent />
          <InteractiveBuilder onDataChange={setBuilderData} />
        </div>
        <div className="hidden lg:block sticky top-8">
          <WebsitePreview data={builderData} />
        </div>
      </div>
    </section>
  );
};
