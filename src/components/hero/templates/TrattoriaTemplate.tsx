import { BuilderData } from "../InteractiveBuilder";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

interface TemplateProps {
  data: BuilderData;
}

export const TrattoriaTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="w-full bg-white text-gray-900 overflow-y-auto max-h-[800px] shadow-2xl rounded-lg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#8B4513] text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.logoUrl && (
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                🍝
              </div>
            )}
            <h1 className="text-2xl font-bold">
              {data.businessName || "La Trattoria"}
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#menu" className="hover:text-[#F4A460] transition-colors">Menu</a>
            <a href="#chi-siamo" className="hover:text-[#F4A460] transition-colors">Chi Siamo</a>
            <a href="#contatti" className="hover:text-[#F4A460] transition-colors">Contatti</a>
          </nav>
          <button className="bg-[#D2691E] px-6 py-2 rounded-lg font-semibold hover:bg-[#F4A460] transition-all">
            Prenota
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-96 bg-gradient-to-br from-[#D2691E] to-[#8B4513] flex items-center justify-center text-white">
        <div className="text-center space-y-4 px-6">
          <h2 className="text-5xl font-bold">
            {data.tagline || "Sapori Autentici della Tradizione Italiana"}
          </h2>
          <p className="text-xl opacity-90">
            Dove ogni piatto racconta una storia
          </p>
          <button className="mt-4 bg-white text-[#8B4513] px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
            Scopri il Menu
          </button>
        </div>
      </section>

      {/* Chi Siamo */}
      <section id="chi-siamo" className="py-16 px-6 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h3 className="text-4xl font-bold text-[#8B4513]">Chi Siamo</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Da tre generazioni portiamo in tavola i sapori autentici della cucina italiana. 
            Ogni ingrediente è selezionato con cura, ogni ricetta custodita gelosamente. 
            Benvenuti nella nostra famiglia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">🌾</div>
              <h4 className="font-bold text-lg mb-2">Ingredienti Freschi</h4>
              <p className="text-sm text-gray-600">Dal produttore alla tavola</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">👨‍🍳</div>
              <h4 className="font-bold text-lg mb-2">Ricette Tradizionali</h4>
              <p className="text-sm text-gray-600">Tramandate di generazione</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-3">❤️</div>
              <h4 className="font-bold text-lg mb-2">Passione</h4>
              <p className="text-sm text-gray-600">In ogni piatto che serviamo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#8B4513] mb-12">Il Nostro Menu</h3>
          <div className="space-y-6">
            {data.menuItems.length > 0 ? (
              data.menuItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 border-b border-gray-200">
                  <div>
                    <h4 className="font-bold text-lg text-[#8B4513]">{item.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                  <span className="font-bold text-[#D2691E] text-lg">{item.price}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-start p-4 border-b border-gray-200">
                  <div>
                    <h4 className="font-bold text-lg text-[#8B4513]">Pasta alla Carbonara</h4>
                    <p className="text-gray-600 text-sm mt-1">Guanciale, uova, pecorino romano</p>
                  </div>
                  <span className="font-bold text-[#D2691E] text-lg">€12</span>
                </div>
                <div className="flex justify-between items-start p-4 border-b border-gray-200">
                  <div>
                    <h4 className="font-bold text-lg text-[#8B4513]">Ossobuco alla Milanese</h4>
                    <p className="text-gray-600 text-sm mt-1">Con risotto allo zafferano</p>
                  </div>
                  <span className="font-bold text-[#D2691E] text-lg">€18</span>
                </div>
                <div className="flex justify-between items-start p-4 border-b border-gray-200">
                  <div>
                    <h4 className="font-bold text-lg text-[#8B4513]">Tiramisù della Nonna</h4>
                    <p className="text-gray-600 text-sm mt-1">Ricetta originale, fatto in casa</p>
                  </div>
                  <span className="font-bold text-[#D2691E] text-lg">€7</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Recensioni */}
      <section className="py-16 px-6 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#8B4513] mb-12">Dicono di Noi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-500 text-2xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic mb-4">
                "La migliore carbonara che abbia mai mangiato! Atmosfera familiare e accogliente."
              </p>
              <p className="text-sm text-gray-500">- Marco R.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-500 text-2xl mb-2">★★★★★</div>
              <p className="text-gray-700 italic mb-4">
                "Ingredienti freschi e sapori autentici. Ci torniamo sempre con piacere!"
              </p>
              <p className="text-sm text-gray-500">- Sofia M.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section id="contatti" className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center text-[#8B4513] mb-12">Contattaci</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {data.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#8B4513]" />
                  <span>{data.address}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="text-[#8B4513]" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-3">
                  <Mail className="text-[#8B4513]" />
                  <span>{data.email}</span>
                </div>
              )}
              <div className="pt-4">
                <p className="font-semibold mb-2">Orari:</p>
                <p className="text-sm text-gray-600">Lun-Dom: 12:00 - 15:00 | 19:00 - 23:00</p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#8B4513] text-white py-8 px-6">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex justify-center gap-6">
            {data.socialLinks.facebook && (
              <a href={data.socialLinks.facebook} className="hover:text-[#F4A460] transition-colors">
                <Facebook />
              </a>
            )}
            {data.socialLinks.instagram && (
              <a href={data.socialLinks.instagram} className="hover:text-[#F4A460] transition-colors">
                <Instagram />
              </a>
            )}
          </div>
          <p className="text-sm opacity-75">
            © 2025 {data.businessName || "La Trattoria"}. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};
