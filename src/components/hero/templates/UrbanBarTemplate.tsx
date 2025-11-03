import { BuilderData } from "../InteractiveBuilder";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

interface TemplateProps {
  data: BuilderData;
}

export const UrbanBarTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="w-full bg-[#0a0a0a] text-white overflow-y-auto max-h-[800px] shadow-2xl rounded-lg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.logoUrl && (
              <div className="w-12 h-12 bg-[#00d9ff] rounded-full flex items-center justify-center text-2xl">
                🍸
              </div>
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00d9ff] to-white bg-clip-text text-transparent">
              {data.businessName || "Urban Bar"}
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#cocktails" className="hover:text-[#00d9ff] transition-colors">Cocktails</a>
            <a href="#eventi" className="hover:text-[#00d9ff] transition-colors">Eventi</a>
            <a href="#contatti" className="hover:text-[#00d9ff] transition-colors">Contatti</a>
          </nav>
          <button className="bg-[#00d9ff] text-black px-6 py-2 rounded-lg font-semibold hover:bg-white transition-all">
            Prenota Tavolo
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-96 bg-gradient-to-br from-[#1a1a1a] via-[#3d3d3d] to-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="relative text-center space-y-4 px-6">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d9ff] to-white bg-clip-text text-transparent">
            {data.tagline || "Experience the Night"}
          </h2>
          <p className="text-xl text-gray-300">
            Cocktails d'autore in un'atmosfera unica
          </p>
          <button className="mt-4 bg-[#00d9ff] text-black px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
            Esplora il Menu
          </button>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-6 bg-[#0f0f0f]">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h3 className="text-4xl font-bold text-[#00d9ff]">Urban Experience</h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Nel cuore della città, dove il design incontra la mixology d'eccellenza. 
            Ogni cocktail è un'opera d'arte, ogni serata un'esperienza indimenticabile.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-black/50 border border-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🍹</div>
              <h4 className="font-bold text-lg mb-2">Cocktail Signature</h4>
              <p className="text-sm text-gray-400">Creazioni esclusive dei nostri bartender</p>
            </div>
            <div className="bg-black/50 border border-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎵</div>
              <h4 className="font-bold text-lg mb-2">Live DJ Set</h4>
              <p className="text-sm text-gray-400">Ogni weekend musica dal vivo</p>
            </div>
            <div className="bg-black/50 border border-gray-800 p-6 rounded-lg">
              <div className="text-4xl mb-3">✨</div>
              <h4 className="font-bold text-lg mb-2">Design Unico</h4>
              <p className="text-sm text-gray-400">Ambiente moderno e ricercato</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Cocktails */}
      <section id="cocktails" className="py-16 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#00d9ff] mb-12">Signature Cocktails</h3>
          <div className="space-y-6">
            {data.menuItems.length > 0 ? (
              data.menuItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 border-b border-gray-800">
                  <div>
                    <h4 className="font-bold text-lg text-white">{item.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                  <span className="font-bold text-[#00d9ff] text-lg">{item.price}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-start p-4 border-b border-gray-800">
                  <div>
                    <h4 className="font-bold text-lg text-white">Neon Martini</h4>
                    <p className="text-gray-400 text-sm mt-1">Gin, vermouth dry, twist al pompelmo rosa</p>
                  </div>
                  <span className="font-bold text-[#00d9ff] text-lg">€14</span>
                </div>
                <div className="flex justify-between items-start p-4 border-b border-gray-800">
                  <div>
                    <h4 className="font-bold text-lg text-white">Dark Paradise</h4>
                    <p className="text-gray-400 text-sm mt-1">Rum invecchiato, amaretto, sciroppo di vaniglia</p>
                  </div>
                  <span className="font-bold text-[#00d9ff] text-lg">€16</span>
                </div>
                <div className="flex justify-between items-start p-4 border-b border-gray-800">
                  <div>
                    <h4 className="font-bold text-lg text-white">Urban Mojito</h4>
                    <p className="text-gray-400 text-sm mt-1">Rum bianco, menta fresca, lime, soda al tè verde</p>
                  </div>
                  <span className="font-bold text-[#00d9ff] text-lg">€12</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Recensioni */}
      <section className="py-16 px-6 bg-[#0f0f0f]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#00d9ff] mb-12">What People Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/50 border border-gray-800 p-6 rounded-lg">
              <div className="text-[#00d9ff] text-2xl mb-2">★★★★★</div>
              <p className="text-gray-300 italic mb-4">
                "Atmosfera incredibile e cocktail spettacolari. Il nostro posto preferito per il weekend!"
              </p>
              <p className="text-sm text-gray-500">- Alessandro P.</p>
            </div>
            <div className="bg-black/50 border border-gray-800 p-6 rounded-lg">
              <div className="text-[#00d9ff] text-2xl mb-2">★★★★★</div>
              <p className="text-gray-300 italic mb-4">
                "I bartender sono veri artisti. Ogni drink è una scoperta unica."
              </p>
              <p className="text-sm text-gray-500">- Chiara L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="py-16 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#00d9ff] mb-12">Get In Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {data.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#00d9ff]" />
                  <span className="text-gray-300">{data.address}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-[#00d9ff]" />
                  <span className="text-gray-300">{data.phone}</span>
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-[#00d9ff]" />
                  <span className="text-gray-300">{data.email}</span>
                </div>
              )}
              <div className="pt-4">
                <p className="font-semibold mb-2 text-white">Opening Hours:</p>
                <p className="text-sm text-gray-400">Mer-Dom: 18:00 - 02:00</p>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg h-64 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-gray-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 px-6">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6">
            {data.socialLinks.facebook && (
              <a href={data.socialLinks.facebook} className="hover:text-[#00d9ff] transition-colors">
                <Facebook />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a href={data.socialLinks.instagram} className="hover:text-[#00d9ff] transition-colors">
                <Instagram />
              </a>
            )}
          </div>
          <p className="text-sm text-gray-500">
            © 2025 {data.businessName || "Urban Bar"}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
