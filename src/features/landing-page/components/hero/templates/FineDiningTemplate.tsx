import { useEffect, useMemo, useState } from "react";
import { BuilderData } from "../InteractiveBuilder";
import { PromoBanner } from "../site-components/PromoBanner";
import { ArrowRight } from "lucide-react";

interface TemplateProps {
  data: BuilderData;
  activeSection?: string;
  fontFamily?: string;
}

const templateColors = {
  primary: "#0b0b0b", // near black
  secondary: "#e6dfd3", // warm cream
  accent: "#c7a559", // gold accent
};

export const FineDiningTemplate = ({ data, activeSection, fontFamily = "Inter" }: TemplateProps) => {
  const [page, setPage] = useState<"home" | "menu" | "about" | "gallery" | "contact">("home");
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const applyFromHash = () => {
      const m = window.location.hash.match(/page=(home|menu|about|gallery|contact)/);
      if (m) setPage(m[1] as any);
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const heroImage = useMemo(
    () =>
      data.heroImageUrl ||
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop",
    [data.heroImageUrl]
  );

  return (
    <div className="w-full bg-[#0b0b0b] text-[#f5f2ec] overflow-y-auto h-full" style={{ fontFamily }}>
      <PromoBanner data={data} templateColors={templateColors} />

      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${navSolid ? "bg-[#0b0b0b]/95" : "bg-transparent"}`}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="text-sm tracking-widest uppercase" style={{ color: templateColors.secondary }}>
            {data.businessName || "Fine Dining"}
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-[#f5f2ec]/80">
            {[
              ["Home", "home"],
              ["Menu", "menu"],
              ["About", "about"],
              ["Gallery", "gallery"],
              ["Contact", "contact"],
            ].map(([label, key]) => (
              <button key={key as string} onClick={() => setPage(key as any)} className={`hover:text-[#f5f2ec] transition-colors ${page===key?"text-[#f5f2ec]":""}`}>{label}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* HOME */}
      {page === "home" && (
        <main className="animate-fade-in">
          {/* HERO cinematico */}
          <section className="relative min-h-[82vh] flex items-end">
            <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="relative z-10 w-full mx-auto max-w-7xl px-6 pb-20">
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {data.heroSlogan || "Fine Dining Experience"}
              </h1>
              <p className="mt-4 text-lg md:text-2xl text-[#f5f2ec]/90 animate-fade-in-up">
                {data.heroDescription || "Cucina d'autore in uno spazio di quiete ed eleganza."}
              </p>
              <div className="mt-8">
                <a onClick={()=>setPage("menu")} className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold cursor-pointer" style={{ backgroundColor: templateColors.accent, color: "#0b0b0b" }}>
                  Prenota / Menu <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* ABOUT asimmetrico */}
          <section className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" className="w-full h-[520px] object-cover rounded-2xl" />
            </div>
            <div className="lg:col-span-7 flex items-center">
              <div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>La Nostra Cucina</h3>
                <p className="text-[#f5f2ec]/80 leading-relaxed max-w-2xl">{data.about?.philosophy || "Tecnica, materia prima e misura. Il nostro menu cambia con le stagioni e con quello che vale davvero la pena servire."}</p>
              </div>
            </div>
          </section>

          {/* PREVIEW MENU con divisori dorati */}
          <section className="bg-[#111] py-20">
            <div className="mx-auto max-w-5xl px-6">
              <h4 className="text-2xl md:text-3xl font-bold mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>Percorsi di gusto</h4>
              <div className="space-y-6">
                {(data.menuItems || []).slice(0,6).map((item, idx)=> (
                  <div key={item.id} className="grid grid-cols-12 items-baseline">
                    <div className="col-span-8">
                      <div className="text-lg font-semibold">{item.name}</div>
                      {item.description && <div className="text-sm text-[#f5f2ec]/70 max-w-xl">{item.description}</div>}
                    </div>
                    <div className="col-span-1 h-px bg-[#c7a559] mx-3" />
                    <div className="col-span-3 text-right font-medium">{item.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <button onClick={()=>setPage("menu")} className="text-sm tracking-widest uppercase text-[#f5f2ec]/80 hover:text-[#f5f2ec]">Vedi menu completo</button>
              </div>
            </div>
          </section>

          {/* FOOTER elegante */}
          <footer className="py-20 px-6">
            <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-12 text-sm">
              <div>
                <div className="text-xs tracking-widest uppercase mb-3" style={{ color: templateColors.secondary }}>{data.businessName || "Fine Dining"}</div>
                <div className="text-[#f5f2ec]/70">{data.address || "Via Elegantia 1, Milano"}</div>
              </div>
              <div>
                <div className="font-semibold mb-2" style={{ color: templateColors.accent }}>Orari</div>
                <div className="text-[#f5f2ec]/70">Mar–Dom 19:00–23:00</div>
              </div>
              <div>
                <div className="font-semibold mb-2" style={{ color: templateColors.accent }}>Contatti</div>
                <div className="text-[#f5f2ec]/70">{data.email || "info@finedining.it"}</div>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* MENU PAGE */}
      {page === "menu" && (
        <main className="animate-fade-in">
          <section className="min-h-[35vh] flex items-center justify-center bg-[#0b0b0b]">
            <h2 className="text-5xl font-extrabold" style={{ fontFamily: "'Playfair Display', serif" }}>Menu</h2>
          </section>
          <section className="mx-auto max-w-4xl px-6 py-20 space-y-8">
            {(data.menuItems || []).map((item)=> (
              <div key={item.id} className="grid grid-cols-12 items-baseline">
                <div className="col-span-8">
                  <div className="text-xl font-semibold">{item.name}</div>
                  {item.description && <div className="text-sm text-[#f5f2ec]/70 max-w-xl mt-1">{item.description}</div>}
                </div>
                <div className="col-span-1 h-px bg-[#c7a559] mx-3" />
                <div className="col-span-3 text-right font-medium">{item.price}</div>
              </div>
            ))}
          </section>
        </main>
      )}

      {/* ABOUT PAGE */}
      {page === "about" && (
        <main className="animate-fade-in">
          <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Racconto</h2>
              <p className="text-[#f5f2ec]/80 leading-relaxed">{data.about?.story || "Un laboratorio gastronomico dove l'equilibrio tra tecnica e sensibilità guida ogni piatto."}</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop" className="w-full h-[420px] object-cover rounded-2xl" />
            </div>
          </section>
        </main>
      )}

      {/* GALLERY PAGE */}
      {page === "gallery" && (
        <main className="animate-fade-in">
          <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-4">
            {(data.gallery || []).map((g)=> (
              <div key={g.id} className="relative group overflow-hidden rounded-2xl">
                <img src={g.url} className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </section>
        </main>
      )}

      {/* CONTACT PAGE */}
      {page === "contact" && (
        <main className="animate-fade-in">
          <section className="mx-auto max-w-4xl px-6 py-20 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Prenotazioni</h2>
              <p className="text-[#f5f2ec]/80 mb-6">{data.address || "Via Elegantia 1, Milano"}</p>
              <p className="text-[#f5f2ec]/80">{data.email || "info@finedining.it"}</p>
            </div>
            <div>
              <form className="space-y-3 text-sm">
                <input placeholder="Nome" className="w-full px-3 py-2 rounded bg-[#111] border border-white/10" />
                <input placeholder="Email" className="w-full px-3 py-2 rounded bg-[#111] border border-white/10" />
                <textarea placeholder="Messaggio" className="w-full px-3 py-2 rounded bg-[#111] border border-white/10 h-28" />
                <button className="px-5 py-3 rounded-xl font-semibold" style={{ backgroundColor: templateColors.accent, color: "#0b0b0b" }}>Invia</button>
              </form>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};


