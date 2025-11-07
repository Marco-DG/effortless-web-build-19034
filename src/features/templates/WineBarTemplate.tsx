import { useEffect, useMemo, useState } from "react";
import { BuilderData } from "@/types/builder";
import { PromoBanner } from "./components/PromoBanner";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNewsletter } from "./components/SiteNewsletter";
import { ArrowRight } from "lucide-react";
import { ensureGoogleFontLoaded } from "@/lib/fonts";

interface TemplateProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
  singlePage?: boolean;
}

const templateColors = {
  primary: "#2a1a1d", // deep wine
  secondary: "#6b3a2e", // aged wood
  accent: "#d9b99b", // warm beige
};

export const WineBarTemplate = ({
  data,
  activeSection,
  fontFamily = "Inter",
  singlePage = true,
}: TemplateProps) => {
  const [page, setPage] = useState<
    "home" | "menu" | "about" | "gallery" | "contact"
  >("home");
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!singlePage) {
      const applyFromHash = () => {
        const m = window.location.hash.match(/page=(home|menu|about|gallery|contact)/);
        if (m) setPage(m[1] as any);
      };
      applyFromHash();
      window.addEventListener("hashchange", applyFromHash);
      return () => window.removeEventListener("hashchange", applyFromHash);
    }
  }, [singlePage]);

  const heroImage = useMemo(
    () =>
      data.heroImageUrl ||
      "https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop",
    [data.heroImageUrl],
  );

  const applied = data.customTheme || templateColors;

  const useTextLogo = (data.logoMode === "text") && (data.logoText || data.businessName);
  const logoText = data.logoText || data.businessName || "Il Tuo Locale";
  // Logo should only change font when user explicitly sets logoFont
  const logoFont = data.logoFont || fontFamily;

  useEffect(()=>{
    if (useTextLogo && data.logoFont) {
      ensureGoogleFontLoaded(data.logoFont);
    }
  }, [useTextLogo, data.logoFont]);
  return (
    <div
      className="w-full bg-[#0f0d0d] text-[#f4f2ef] overflow-y-auto h-full"
      style={{ fontFamily }}
    >
      <PromoBanner data={data} templateColors={templateColors} />

      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          navSolid ? "bg-[#0f0d0d]/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {data.logoUrl ? (
              <img
                src={data.logoUrl}
                alt={`${data.businessName || "Logo"}`}
                className="w-12 h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
              />
            ) : (
              <div
                className="text-lg md:text-xl font-bold truncate"
                style={{ fontFamily: logoFont, color: applied.accent }}
                title={logoText}
              >
                {logoText}
              </div>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {(() => {
              const enabled = data.sectionsEnabled || { hero:true, about:true, menu:true, gallery:true, contact:true };
              const items: Array<[string,string]> = [["Home","home"],["Menu","menu"],["About","about"],["Gallery","gallery"],["Contatti","contact"]].filter(([_,k])=> enabled[k as keyof typeof enabled]);
              return items.map(([label, key]) => (
              singlePage ? (
                <a
                  key={key as string}
                  href={`#${key}`}
                  onClick={(e)=>{
                    e.preventDefault();
                    document.getElementById(String(key))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`transition-colors hover:opacity-90 text-white/80`}
                  style={{ color: applied.accent }}
                >
                  {label}
                </a>
              ) : (
                <button
                  key={key as string}
                  onClick={() => setPage(key as any)}
                  className={`transition-colors hover:opacity-90 ${page === key ? "text-white" : "text-white/70"}`}
                >
                  {label}
                </button>
              )
              ));
            })()}
          </nav>
        </div>
      </header>

      {/* HOME PAGE */}
      {(singlePage || page === "home") && (
        <main id="home" className="animate-fade-in scroll-mt-24">
          {/* Dynamic Sections for Home Page */}
          {(() => {
            const components: Record<string, React.ReactNode> = {
              hero: (
                <section
                  id="home"
                  className="relative min-h-[80vh] grid grid-cols-1 lg:grid-cols-12 scroll-mt-24"
                  style={{ backgroundAttachment: "fixed" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.35)), url(${heroImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="relative lg:col-span-7 flex items-end lg:items-center p-8 md:p-16">
                    <div className="max-w-2xl">
                      <h1
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {data.heroSlogan || "Wine, Food & Atmosphere"}
                      </h1>
                      <p className="mt-4 text-lg md:text-2xl text-white/90">
                        {data.heroDescription ||
                          "Un luogo dedicato al gusto, tra calici e piccoli piatti."}
                      </p>
                      <div className="mt-8 flex gap-4">
                        <a
                          href="#menu"
                          onClick={(e) => {
                            e.preventDefault();
                            if (singlePage) {
                              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            } else {
                              setPage("menu");
                            }
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[#0f0d0d] font-semibold"
                          style={{ backgroundColor: applied.accent }}
                        >
                          Scopri il Menu <ArrowRight className="w-4 h-4" />
                        </a>
                        {data.reservationLink && (
                          <a
                            href={data.reservationLink}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/80 text-white hover:bg-white/10 transition-colors"
                          >
                            Prenota
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative lg:col-span-5 hidden lg:block" />
                </section>
              ),
              about: (
                <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1200&auto=format&fit=crop"
                      className="w-full h-[420px] object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex items-center">
                    <div>
                      <h3
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: templateColors.accent,
                        }}
                      >
                        La nostra enoteca
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        {data.about?.story ||
                          "Selezione curata di etichette e piccoli produttori. Calore, intimità e piatti pensati per accompagnare il calice."}
                      </p>
                    </div>
                  </div>
                </section>
              ),
              menu: (
                <section className="bg-[#151212] py-20">
                  <div className="mx-auto max-w-7xl px-6">
                    <div className="flex items-end justify-between mb-10">
                      <h4
                        className="text-2xl md:text-3xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Assaggi & Calici
                      </h4>
                      <button
                        onClick={() => setPage("menu")}
                        className="text-sm text-white/80 hover:text-white"
                      >
                        Vedi tutto
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(data.menuItems || []).slice(0, 6).map((item) => (
                        <div
                          key={item.id}
                          className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-lg">
                              {item.name}
                            </h5>
                            <span className="text-white/70 font-medium">
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-white/70">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ),
              gallery: (
                <main id="gallery" className="animate-fade-in scroll-mt-24">
                  <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-4">
                    {(data.gallery || []).map((g)=> (
                      <div key={g.id} className="relative group overflow-hidden rounded-2xl">
                        <img src={g.url} className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </section>
                </main>
              ),
              newsletter: (
               <section id="newsletter" className="animate-fade-in scroll-mt-24">
                 <SiteNewsletter data={data} templateColors={templateColors} />
               </section>
             ),
             contact: (
                <main id="contact" className="animate-fade-in scroll-mt-24">
                  <section className="mx-auto max-w-4xl px-6 py-16 grid md:grid-cols-2 gap-10">
                    <div>
                      <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Contatti</h2>
                      <p className="text-white/80">{data.address || "Via della Vite 12, Roma"}</p>
                      <p className="text-white/80">{data.phone || "+39 02 1234567"}</p>
                      <p className="text-white/80">{data.email || "info@winebar.it"}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <form className="space-y-3 text-sm">
                        <input placeholder="Nome" className="w-full px-3 py-2 rounded bg-black/30 border border-white/10" />
                        <input placeholder="Email" className="w-full px-3 py-2 rounded bg-black/30 border border-white/10" />
                        <textarea placeholder="Messaggio" className="w-full px-3 py-2 rounded bg-black/30 border border-white/10 h-28" />
                        <button className="px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: templateColors.accent, color: "#0f0d0d" }}>Invia</button>
                      </form>
                    </div>
                  </section>
                </main>
              ),
            };

            const orderedSections = data.sectionsOrder || ["hero","about","menu","gallery","newsletter","contact"];
            const enabledSections = data.sectionsEnabled || { hero: true, about: true, menu: true, gallery: true, newsletter: true, contact: true };

            return orderedSections.map((sectionId) =>
              enabledSections[sectionId as keyof typeof enabledSections]
                ? components[sectionId]
                : null,
            );
          })()}

          <SiteFooter data={data} templateColors={templateColors} variant="wine" />
        </main>
      )}

      {/* MENU */}
      {(!singlePage && page === "menu") && (
        <main id="menu" className="animate-fade-in scroll-mt-24">
          <section
            className="min-h-[40vh] flex items-center justify-center relative"
            style={{
              background: `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url(${heroImage}) center/cover`,
            }}
          >
            <h2
              className="text-5xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Menu
            </h2>
          </section>
          <section className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-10">
            {(data.menuItems || []).map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-white/80 font-medium">
                    {item.price}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-2 text-white/70 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </section>
         <SiteFooter data={data} templateColors={templateColors} variant="wine" />
        </main>
      )}

      {/* ABOUT */}
      {(!singlePage && page === "about") && (
        <main id="about" className="animate-fade-in scroll-mt-24">
          <section className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                La nostra storia
              </h2>
              <p className="text-white/80 leading-relaxed">
                {data.about?.story ||
                  "Una selezione curata di vini e piccoli piatti in un ambiente intimo."}
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </div>
          </section>
         <SiteFooter data={data} templateColors={templateColors} variant="wine" />
       </main>
      )}

      {/* GALLERY */}
      {(!singlePage && page === "gallery") && (
        <main id="gallery" className="animate-fade-in scroll-mt-24">
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
              <div className="break-inside-avoid">
                {(data.gallery || []).map((g) => (
                  <img
                    key={g.id}
                    src={g.url}
                    className="mb-4 w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          </section>
         <SiteFooter data={data} templateColors={templateColors} variant="wine" />
        </main>
      )}

      {/* CONTACT */}
      {(!singlePage && page === "contact") && (
        <main id="contact" className="animate-fade-in scroll-mt-24">
          <section className="mx-auto max-w-4xl px-6 py-16 grid md:grid-cols-2 gap-10">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contatti
              </h2>
              <p className="text-white/80">
                {data.address || "Via della Vite 12, Roma"}
              </p>
              <p className="text-white/80">{data.phone || "+39 02 1234567"}</p>
              <p className="text-white/80">{data.email || "info@winebar.it"}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <form className="space-y-3 text-sm">
                <input
                  placeholder="Nome"
                  className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
                />
                <input
                  placeholder="Email"
                  className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
                />
                <textarea
                  placeholder="Messaggio"
                  className="w-full px-3 py-2 rounded bg-black/30 border border-white/10 h-28"
                />
                <button
                  className="px-5 py-3 rounded-xl font-semibold"
                  style={{
                    backgroundColor: templateColors.accent,
                    color: "#0f0d0d",
                  }}
                >
                  Invia
                </button>
              </form>
            </div>
          </section>
         <SiteFooter data={data} templateColors={templateColors} variant="wine" />
        </main>
      )}
    </div>
  );
};
