import { BuilderData } from "@/types/builder";

interface SiteAboutProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteAbout = ({ data, templateColors }: SiteAboutProps) => {
  if (!data.about) return null;

  const primaryColor = templateColors?.primary || "#8B4513";
  const about = data.about;

  const heading = about.heading || "Chi Siamo";
  const text = about.text || about.story || "";
  const imageUrl = about.imageUrl;

  return (
    <section id="chi-siamo" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {imageUrl && (
          <div className="order-2 md:order-1">
            <img src={imageUrl} alt={heading} className="w-full h-[420px] object-cover rounded-2xl" />
          </div>
        )}
        <div className={imageUrl ? "order-1 md:order-2" : "md:col-span-2"}>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            {heading}
          </h3>
          {text && (
            <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
          )}
        </div>
      </div>
    </section>
  );
};

