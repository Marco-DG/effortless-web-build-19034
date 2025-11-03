import { BuilderData } from "../InteractiveBuilder";
import { Button } from "@/components/ui/button";

interface SiteHeroProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteHero = ({ data, templateColors }: SiteHeroProps) => {
  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";
  const accentColor = templateColors?.accent || "#F4A460";

  const heroSlogan = data.heroSlogan || data.tagline || "Benvenuti nel nostro locale";
  const heroDescription =
    data.heroDescription ||
    "Dove ogni esperienza è unica e ogni momento è speciale";

  return (
    <section
      className="relative h-[600px] flex items-center justify-center text-white overflow-hidden"
      style={{
        background: data.heroImageUrl
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${data.heroImageUrl})`
          : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {data.heroVideoUrl && (
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={data.heroVideoUrl} type="video/mp4" />
        </video>
      )}

      <div className="relative z-10 text-center space-y-6 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold drop-shadow-lg">{heroSlogan}</h2>
        <p className="text-xl md:text-2xl opacity-90 drop-shadow-md">{heroDescription}</p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <a href="#menu">
            <Button
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              style={{ backgroundColor: secondaryColor }}
            >
              Scopri il Menu
            </Button>
          </a>
          {data.reservationLink && (
            <a href={data.reservationLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 hover:bg-white/20 border-white text-white"
              >
                Prenota Ora
              </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

