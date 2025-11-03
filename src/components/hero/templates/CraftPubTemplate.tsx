import { BuilderData } from "../InteractiveBuilder";
import { Phone, Mail, MapPin, Facebook, Instagram, Beer } from "lucide-react";

interface TemplateProps {
  data: BuilderData;
}

export const CraftPubTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="w-full bg-[#1a120a] text-[#f5deb3] overflow-y-auto max-h-[800px] shadow-2xl rounded-lg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#2d5016]/95 backdrop-blur-sm border-b-2 border-[#daa520]">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.logoUrl && (
              <div className="w-12 h-12 bg-[#daa520] rounded-full flex items-center justify-center text-2xl">
                🍺
              </div>
            )}
            <h1 className="text-2xl font-bold text-[#daa520]">
              {data.businessName || "Craft Pub"}
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#birre" className="hover:text-[#daa520] transition-colors">Birre</a>
            <a href="#eventi" className="hover:text-[#daa520] transition-colors">Eventi</a>
            <a href="#contatti" className="hover:text-[#daa520] transition-colors">Contatti</a>
          </nav>
          <button className="bg-[#daa520] text-[#2d5016] px-6 py-2 rounded-lg font-bold hover:bg-[#f5deb3] transition-all">
            Prenota Tavolo
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-96 bg-gradient-to-br from-[#2d5016] via-[#3a6b1f] to-[#2d5016] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9Indvb2QiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSJyZ2JhKDIxOCwxNjUsMzIsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjd29vZCkiLz48L3N2Zz4=')] opacity-40"></div>
        <div className="relative text-center space-y-4 px-6">
          <Beer className="w-16 h-16 mx-auto text-[#daa520] animate-bounce" />
          <h2 className="text-5xl font-bold text-[#daa520]">
            {data.tagline || "Birre Artigianali. Vibes Autentiche."}
          </h2>
          <p className="text-xl text-[#f5deb3]">
            Dove la passione per la birra incontra la tradizione
          </p>
          <button className="mt-4 bg-[#daa520] text-[#2d5016] px-8 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
            Scopri le Nostre Birre
          </button>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-6 bg-[#0f0a05]">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h3 className="text-4xl font-bold text-[#daa520]">Il Nostro Pub</h3>
          <p className="text-lg text-[#f5deb3] leading-relaxed">
            Un luogo dove la tradizione della birra artigianale si fonde con l'atmosfera calda e accogliente 
            di un vero pub. Selezioniamo le migliori birre craft da microbirrifici italiani e internazionali.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#2d5016] p-6 rounded-lg border-2 border-[#6b8e23]">
              <div className="text-4xl mb-3">🍺</div>
              <h4 className="font-bold text-lg mb-2 text-[#daa520]">20+ Spine</h4>
              <p className="text-sm text-[#f5deb3]">Birre artigianali sempre fresche</p>
            </div>
            <div className="bg-[#2d5016] p-6 rounded-lg border-2 border-[#6b8e23]">
              <div className="text-4xl mb-3">🎵</div>
              <h4 className="font-bold text-lg mb-2 text-[#daa520]">Live Music</h4>
              <p className="text-sm text-[#f5deb3]">Ogni venerdì e sabato sera</p>
            </div>
            <div className="bg-[#2d5016] p-6 rounded-lg border-2 border-[#6b8e23]">
              <div className="text-4xl mb-3">🍖</div>
              <h4 className="font-bold text-lg mb-2 text-[#daa520]">Cucina Pub</h4>
              <p className="text-sm text-[#f5deb3]">Burger, alette e molto altro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Birre */}
      <section id="birre" className="py-16 px-6 bg-[#1a120a]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#daa520] mb-12">Le Nostre Birre</h3>
          <div className="space-y-6">
            {data.menuItems.length > 0 ? (
              data.menuItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 bg-[#2d5016]/30 border border-[#6b8e23] rounded-lg">
                  <div>
                    <h4 className="font-bold text-lg text-[#daa520]">{item.name}</h4>
                    <p className="text-[#f5deb3] text-sm mt-1">{item.description}</p>
                  </div>
                  <span className="font-bold text-[#daa520] text-lg">{item.price}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-start p-4 bg-[#2d5016]/30 border border-[#6b8e23] rounded-lg">
                  <div>
                    <h4 className="font-bold text-lg text-[#daa520]">IPA Americana</h4>
                    <p className="text-[#f5deb3] text-sm mt-1">Luppolata, fruttata, amara al punto giusto - 6.5% ABV</p>
                  </div>
                  <span className="font-bold text-[#daa520] text-lg">€7</span>
                </div>
                <div className="flex justify-between items-start p-4 bg-[#2d5016]/30 border border-[#6b8e23] rounded-lg">
                  <div>
                    <h4 className="font-bold text-lg text-[#daa520]">Stout Imperiale</h4>
                    <p className="text-[#f5deb3] text-sm mt-1">Scura, cremosa, note di caffè e cioccolato - 8% ABV</p>
                  </div>
                  <span className="font-bold text-[#daa520] text-lg">€8</span>
                </div>
                <div className="flex justify-between items-start p-4 bg-[#2d5016]/30 border border-[#6b8e23] rounded-lg">
                  <div>
                    <h4 className="font-bold text-lg text-[#daa520]">Weiss Bavarese</h4>
                    <p className="text-[#f5deb3] text-sm mt-1">Fresca, fruttata, perfetta per l'estate - 5.2% ABV</p>
                  </div>
                  <span className="font-bold text-[#daa520] text-lg">€6</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Eventi */}
      <section id="eventi" className="py-16 px-6 bg-[#0f0a05]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#daa520] mb-12">Prossimi Eventi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2d5016] p-6 rounded-lg border-2 border-[#daa520]">
              <span className="bg-[#daa520] text-[#2d5016] px-3 py-1 rounded-full text-sm font-bold">Venerdì 15/11</span>
              <h4 className="font-bold text-xl mt-4 mb-2 text-[#f5deb3]">Live Rock Night</h4>
              <p className="text-sm text-[#f5deb3]/80">I migliori classici rock con la band locale "The Hoppers"</p>
            </div>
            <div className="bg-[#2d5016] p-6 rounded-lg border-2 border-[#6b8e23]">
              <span className="bg-[#6b8e23] text-white px-3 py-1 rounded-full text-sm font-bold">Sabato 16/11</span>
              <h4 className="font-bold text-xl mt-4 mb-2 text-[#f5deb3]">Beer Tasting</h4>
              <p className="text-sm text-[#f5deb3]/80">Degustazione guidata di birre artigianali rare</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recensioni */}
      <section className="py-16 px-6 bg-[#1a120a]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#daa520] mb-12">Dicono di Noi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2d5016]/30 border border-[#6b8e23] p-6 rounded-lg">
              <div className="text-[#daa520] text-2xl mb-2">★★★★★</div>
              <p className="text-[#f5deb3] italic mb-4">
                "Selezione di birre incredibile e atmosfera super! Il posto perfetto per gli amanti della craft beer."
              </p>
              <p className="text-sm text-[#daa520]">- Matteo B.</p>
            </div>
            <div className="bg-[#2d5016]/30 border border-[#6b8e23] p-6 rounded-lg">
              <div className="text-[#daa520] text-2xl mb-2">★★★★★</div>
              <p className="text-[#f5deb3] italic mb-4">
                "Personale competente e appassionato. Ogni settimana c'è qualcosa di nuovo da provare!"
              </p>
              <p className="text-sm text-[#daa520]">- Laura S.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="py-16 px-6 bg-[#0f0a05]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#daa520] mb-12">Dove Siamo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {data.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#daa520]" />
                  <span className="text-[#f5deb3]">{data.address}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-[#daa520]" />
                  <span className="text-[#f5deb3]">{data.phone}</span>
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-[#daa520]" />
                  <span className="text-[#f5deb3]">{data.email}</span>
                </div>
              )}
              <div className="pt-4">
                <p className="font-semibold mb-2 text-[#daa520]">Orari:</p>
                <p className="text-sm text-[#f5deb3]">Mar-Gio: 18:00 - 01:00</p>
                <p className="text-sm text-[#f5deb3]">Ven-Sab: 18:00 - 02:00</p>
                <p className="text-sm text-[#f5deb3]">Domenica: 17:00 - 00:00</p>
              </div>
            </div>
            <div className="bg-[#2d5016] border-2 border-[#6b8e23] rounded-lg h-64 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-[#daa520]" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2d5016] border-t-2 border-[#daa520] py-8 px-6">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6">
            {data.socialLinks.facebook && (
              <a href={data.socialLinks.facebook} className="text-[#f5deb3] hover:text-[#daa520] transition-colors">
                <Facebook />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a href={data.socialLinks.instagram} className="text-[#f5deb3] hover:text-[#daa520] transition-colors">
                <Instagram />
              </a>
            )}
          </div>
          <p className="text-sm text-[#f5deb3]/75">
            © 2025 {data.businessName || "Craft Pub"}. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};
