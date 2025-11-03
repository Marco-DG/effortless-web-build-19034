import { BuilderData } from "../InteractiveBuilder";
import { Phone, Mail, MapPin, Facebook, Instagram, Coffee } from "lucide-react";

interface TemplateProps {
  data: BuilderData;
}

export const DolceVitaTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="w-full bg-[#f5e6d3] text-[#4a3f35] overflow-y-auto max-h-[800px] shadow-2xl rounded-lg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.logoUrl && (
              <div className="w-12 h-12 bg-[#d4a574] rounded-full flex items-center justify-center text-2xl">
                ☕
              </div>
            )}
            <h1 className="text-2xl font-bold text-[#8b6f47]">
              {data.businessName || "Dolce Vita Café"}
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-[#6b5744]">
            <a href="#menu" className="hover:text-[#d4a574] transition-colors">Menu</a>
            <a href="#about" className="hover:text-[#d4a574] transition-colors">Su di Noi</a>
            <a href="#contatti" className="hover:text-[#d4a574] transition-colors">Contatti</a>
          </nav>
          <button className="bg-[#d4a574] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#8b6f47] transition-all shadow-md">
            Ordina Online
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-96 bg-gradient-to-br from-[#f5e6d3] to-[#e8d4b8] flex items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <Coffee className="w-16 h-16 mx-auto text-[#8b6f47] animate-pulse" />
          <h2 className="text-5xl font-bold text-[#6b5744]">
            {data.tagline || "Il Tuo Momento di Dolcezza"}
          </h2>
          <p className="text-xl text-[#8b6f47]">
            Caffè artigianale e dolci fatti in casa
          </p>
          <button className="mt-4 bg-[#8b6f47] text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
            Scopri il Menu
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h3 className="text-4xl font-bold text-[#8b6f47]">La Nostra Storia</h3>
          <p className="text-lg text-[#6b5744] leading-relaxed">
            Ogni tazza racconta una storia di passione e dedizione. Utilizziamo solo i migliori chicchi di caffè, 
            selezionati e tostati artigianalmente. I nostri dolci sono preparati ogni mattina con ingredienti freschi 
            e naturali.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#f5e6d3] p-6 rounded-2xl">
              <div className="text-4xl mb-3">☕</div>
              <h4 className="font-bold text-lg mb-2 text-[#6b5744]">Caffè Artigianale</h4>
              <p className="text-sm text-[#8b6f47]">Miscele selezionate e tostate da noi</p>
            </div>
            <div className="bg-[#f5e6d3] p-6 rounded-2xl">
              <div className="text-4xl mb-3">🥐</div>
              <h4 className="font-bold text-lg mb-2 text-[#6b5744]">Dolci Freschi</h4>
              <p className="text-sm text-[#8b6f47]">Preparati ogni mattina</p>
            </div>
            <div className="bg-[#f5e6d3] p-6 rounded-2xl">
              <div className="text-4xl mb-3">🌱</div>
              <h4 className="font-bold text-lg mb-2 text-[#6b5744]">Ingredienti Naturali</h4>
              <p className="text-sm text-[#8b6f47]">Senza conservanti né additivi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-16 px-6 bg-[#f5e6d3]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#8b6f47] mb-12">Il Nostro Menu</h3>
          <div className="space-y-6">
            {data.menuItems.length > 0 ? (
              data.menuItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 bg-white rounded-xl shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-[#6b5744]">{item.name}</h4>
                    <p className="text-[#8b6f47] text-sm mt-1">{item.description}</p>
                  </div>
                  <span className="font-bold text-[#d4a574] text-lg">{item.price}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-start p-4 bg-white rounded-xl shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-[#6b5744]">Cappuccino Classico</h4>
                    <p className="text-[#8b6f47] text-sm mt-1">Espresso con schiuma di latte vellutata</p>
                  </div>
                  <span className="font-bold text-[#d4a574] text-lg">€3.50</span>
                </div>
                <div className="flex justify-between items-start p-4 bg-white rounded-xl shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-[#6b5744]">Croissant Artigianale</h4>
                    <p className="text-[#8b6f47] text-sm mt-1">Sfogliato con burro, cotto al momento</p>
                  </div>
                  <span className="font-bold text-[#d4a574] text-lg">€2.50</span>
                </div>
                <div className="flex justify-between items-start p-4 bg-white rounded-xl shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-[#6b5744]">Cheesecake al Limone</h4>
                    <p className="text-[#8b6f47] text-sm mt-1">Base di biscotti, crema al mascarpone e limone</p>
                  </div>
                  <span className="font-bold text-[#d4a574] text-lg">€5.50</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Galleria */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#8b6f47] mb-12">Atmosfera</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-[#f5e6d3] rounded-xl flex items-center justify-center">
                <span className="text-4xl">☕</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recensioni */}
      <section className="py-16 px-6 bg-[#f5e6d3]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#8b6f47] mb-12">Dicono di Noi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="text-[#d4a574] text-2xl mb-2">★★★★★</div>
              <p className="text-[#6b5744] italic mb-4">
                "Il miglior cappuccino della città! Ambiente accogliente e personale gentilissimo."
              </p>
              <p className="text-sm text-[#8b6f47]">- Giulia F.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="text-[#d4a574] text-2xl mb-2">★★★★★</div>
              <p className="text-[#6b5744] italic mb-4">
                "I dolci sono spettacolari! Tornerò sicuramente per provare tutto il menu."
              </p>
              <p className="text-sm text-[#8b6f47]">- Roberto M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#8b6f47] mb-12">Vieni a Trovarci</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {data.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#d4a574]" />
                  <span className="text-[#6b5744]">{data.address}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-[#d4a574]" />
                  <span className="text-[#6b5744]">{data.phone}</span>
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-[#d4a574]" />
                  <span className="text-[#6b5744]">{data.email}</span>
                </div>
              )}
              <div className="pt-4">
                <p className="font-semibold mb-2 text-[#6b5744]">Orari:</p>
                <p className="text-sm text-[#8b6f47]">Lun-Sab: 7:00 - 20:00</p>
                <p className="text-sm text-[#8b6f47]">Domenica: 8:00 - 19:00</p>
              </div>
            </div>
            <div className="bg-[#f5e6d3] rounded-xl h-64 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-[#d4a574]" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8b6f47] text-white py-8 px-6">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6">
            {data.socialLinks.facebook && (
              <a href={data.socialLinks.facebook} className="hover:text-[#f5e6d3] transition-colors">
                <Facebook />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a href={data.socialLinks.instagram} className="hover:text-[#f5e6d3] transition-colors">
                <Instagram />
              </a>
            )}
          </div>
          <p className="text-sm opacity-75">
            © 2025 {data.businessName || "Dolce Vita Café"}. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};
