import { BuilderData } from "@/types/builder";
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

  const background = data.heroImageUrl
    ? `linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.40)), url(${data.heroImageUrl})`
    : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;

  return (
    <section
      className="relative min-h-[70vh] md:min-h-[78vh] flex items-center text-white overflow-hidden"
      style={{ background, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {data.heroVideoUrl && (
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={data.heroVideoUrl} type="video/mp4" />
        </video>
      )}

      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="max-w-5xl">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] drop-shadow-sm"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {heroSlogan}
          </h2>
          <p className="mt-5 text-lg md:text-2xl opacity-95 drop-shadow" style={{ maxWidth: "52ch" }}>
            {heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#menu">
              <Button
                size="lg"
                className="text-base md:text-lg px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
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
                  className="text-base md:text-lg px-8 py-6 rounded-xl border-white/90 text-white hover:bg-white/10"
                >
                  Prenota Ora
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

