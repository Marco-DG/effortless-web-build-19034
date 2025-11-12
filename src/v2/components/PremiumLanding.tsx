import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ChevronRight, Play, Check, Star, Zap, Crown, 
  Shield, TrendingUp, Users, Globe, BarChart3, Sparkles,
  PenTool, Menu, Layout, Server, Headphones, MapPin
} from 'lucide-react';
import { Button } from '../ui/Button';

interface PremiumLandingProps {
  onStartBuilding: (mode: 'logo' | 'menu' | 'site') => void;
}

export const PremiumLanding: React.FC<PremiumLandingProps> = ({ onStartBuilding }) => {
  const [playingDemo, setPlayingDemo] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation Premium */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900">RestaurantPro</div>
                <div className="text-xs text-gray-500 -mt-1">Enterprise Solution</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Funzionalità</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Casi Studio</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Supporto</a>
              <Button variant="outline" className="border-gray-300 hover:border-gray-400">
                Accedi
              </Button>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 shadow-lg">
                Inizia Ora
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Enterprise */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        {/* Background elegante */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-purple-50/30"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-violet-100/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-purple-100/20 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:pr-8"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full mb-8">
                <Shield className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="text-sm font-semibold text-emerald-800">Piattaforma Enterprise • ISO27001 Certified</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-8">
                Il tuo brand
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
                  cresce da solo
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                <strong className="text-gray-900">La piattaforma completa</strong> che trasforma bar e ristoranti in <strong className="text-violet-600">brand di successo</strong>. Logo, menu, sito web, hosting, analytics e gestionale. <span className="text-gray-600">Tutto integrato, tutto automatico.</span>
              </p>

              {/* Value Props */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: Zap, text: "Setup completo in 8 minuti", color: "text-amber-600" },
                  { icon: TrendingUp, text: "ROI medio +180% nei primi 3 mesi", color: "text-emerald-600" },
                  { icon: Crown, text: "Supporto white-glove incluso", color: "text-purple-600" }
                ].map((prop, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mr-4">
                      <prop.icon className={`w-6 h-6 ${prop.color}`} />
                    </div>
                    <span className="text-lg font-semibold text-gray-800">{prop.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Principale */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <Button
                  onClick={() => onStartBuilding('site')}
                  className="group bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white px-8 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Trasforma il tuo business ora
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className="font-medium">Gratuito per 30 giorni • Nessuna carta di credito • Setup assistito</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              {/* Dashboard Mock */}
              <div className="relative">
                <div 
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setPlayingDemo(true)}
                >
                  <div className="aspect-[4/3] flex items-center justify-center">
                    {!playingDemo ? (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:bg-white/20 transition-all">
                          <Play className="w-10 h-10 text-white ml-1" />
                        </div>
                        <p className="text-white font-semibold text-lg">Demo Live Platform</p>
                        <p className="text-white/70 text-sm">3 minuti • Vedi la magia</p>
                      </div>
                    ) : (
                      <video autoPlay muted loop className="w-full h-full object-cover">
                        <source src="/platform-demo.mp4" type="video/mp4" />
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                          🚀 Platform Demo
                        </div>
                      </video>
                    )}
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                >
                  🎯 +180% ROI
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-xl border"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg mr-3"></div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Brand Completo</div>
                      <div className="text-xs text-gray-500">in 8 minuti</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Builders Section - I 3 Pilastri */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                I 3 pilastri del tuo successo
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Ogni elemento si sincronizza automaticamente. <strong>Un cambiamento, ovunque applicato.</strong>
              </p>
            </motion.div>
          </div>

          {/* Builders Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                id: 'logo' as const,
                icon: PenTool,
                title: 'Brand Identity',
                subtitle: 'Logo professionale con IA',
                description: 'Template enterprise, font premium, elementi vettoriali. Il tuo logo si applica automaticamente ovunque.',
                gradient: 'from-blue-500 to-indigo-600',
                features: ['1000+ template premium', 'Font Adobe integrati', 'Export vettoriale', 'Brand kit automatico']
              },
              {
                id: 'menu' as const,
                icon: Menu,
                title: 'Menu Digitale',
                subtitle: 'Carta intelligente che vende',
                description: 'Menu che si aggiornano in real-time su tutti i canali. Analytics su ogni piatto, suggerimenti IA.',
                gradient: 'from-emerald-500 to-teal-600',
                features: ['Menu dinamici', 'Analytics vendite', 'QR code infiniti', 'Traduzioni auto']
              },
              {
                id: 'site' as const,
                icon: Layout,
                title: 'Web Platform',
                subtitle: 'Sito enterprise automatico',
                description: 'Sito web completo che si aggiorna da solo. Prenotazioni, recensioni, SEO, tutto integrato.',
                gradient: 'from-purple-500 to-pink-600',
                features: ['SEO enterprise', 'Prenotazioni live', 'Google Business sync', 'Analytics avanzati']
              }
            ].map((builder, index) => (
              <motion.div
                key={builder.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 h-full">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${builder.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <builder.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {builder.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-600 mb-4">
                    {builder.subtitle}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {builder.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {builder.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => onStartBuilding(builder.id)}
                    className={`w-full bg-gradient-to-r ${builder.gradient} hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group text-white font-bold py-4`}
                  >
                    Inizia con {builder.title}
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features - Il Valore Aggiunto */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Tutto incluso. Tutto Enterprise.
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
                Non solo tools. Una <strong className="text-purple-600">piattaforma completa</strong> che fa crescere il tuo business mentre tu ti concentri sui clienti.
              </p>
            </motion.div>
          </div>

          {/* Enterprise Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Server,
                title: 'Hosting Enterprise',
                description: 'CDN globale, SSL incluso, backup automatici. Il tuo sito sempre online, sempre veloce.',
                metric: '99.9% uptime'
              },
              {
                icon: BarChart3,
                title: 'Analytics Avanzati',
                description: 'Dashboard completa con insights IA. Scopri cosa funziona e ottimizza automaticamente.',
                metric: '+40% conversioni'
              },
              {
                icon: MapPin,
                title: 'Google Business Pro',
                description: 'Sincronizzazione automatica con Google My Business. Recensioni, orari, menu sempre aggiornati.',
                metric: '3x visibilità local'
              },
              {
                icon: Users,
                title: 'CRM & Gestionale',
                description: 'Cliente unico, dati unificati. Prenotazioni, ordini, pagamenti, tutto sotto controllo.',
                metric: 'ROI +180%'
              },
              {
                icon: Headphones,
                title: 'Supporto White-Glove',
                description: 'Team dedicato H24. Setup assistito, formazione inclusa, success manager personale.',
                metric: '< 30sec risposta'
              },
              {
                icon: Shield,
                title: 'Sicurezza Enterprise',
                description: 'Conformità GDPR, backup cifrati, monitoraggio H24. I tuoi dati sono al sicuro.',
                metric: 'ISO 27001'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {feature.metric}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ROI Guarantee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 lg:p-12 border border-emerald-200 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                Garanzia ROI o rimborso totale
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                Se non vedi un <strong className="text-emerald-600">ROI del +100%</strong> nei primi 90 giorni, ti rimborsiamo tutto. 
                <br />Nessuna domanda, nessuna clausola nascosta.
              </p>
              <div className="flex items-center justify-center text-emerald-600">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-semibold">Garantito • 4.127 ristoranti lo confermano</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
                Storie di trasformazione
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ristoratori che hanno trasformato il loro business in <strong className="text-white">brand di successo</strong>
              </p>
            </motion.div>
          </div>

          {/* Testimonials Premium */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: "In 3 mesi abbiamo triplicato le prenotazioni online. Il ROI è stato del +280%. RestaurantPro ci ha trasformato.",
                author: "Marco Benedetti",
                role: "Proprietario • Il Convivio Roma",
                results: ["+280% ROI", "3x prenotazioni", "5★ Google"],
                avatar: "👨‍🍳"
              },
              {
                quote: "La piattaforma gestisce tutto automaticamente. Io mi concentro sui clienti, loro fanno il resto. Magico.",
                author: "Elena Rossi",
                role: "Chef • Osteria Luna Napoli",
                results: ["+150% fatturato", "Zero stress tech", "4.9★ rating"],
                avatar: "👩‍🍳"
              },
              {
                quote: "Siamo passati da locale di quartiere a brand riconosciuto. Il supporto è incredibile, sempre presenti.",
                author: "Giuseppe Verdi",
                role: "Titolare • Trattoria Milano 1962",
                results: ["+400% online", "Brand famoso", "Espansione"],
                avatar: "🍝"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg leading-relaxed mb-6 font-medium">
                  "{testimonial.quote}"
                </blockquote>

                {/* Results */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {testimonial.results.map((result, i) => (
                    <span key={i} className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {result}
                    </span>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-gray-300 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Enterprise */}
      <section className="py-32 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Il tuo momento è
              <span className="block">adesso</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              <strong>4.127 ristoratori</strong> hanno già trasformato il loro business. 
              <br />Unisciti alla rivoluzione digitale del food & beverage.
            </p>

            {/* Primary CTA */}
            <div className="space-y-6 mb-12">
              <Button
                onClick={() => onStartBuilding('site')}
                className="group bg-white text-gray-900 hover:bg-gray-100 px-12 py-8 text-2xl font-black rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Crown className="w-8 h-8 mr-4" />
                Trasforma il tuo ristorante
                <ArrowRight className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <div className="text-white/80 font-medium">
                Setup gratuito • ROI garantito • Supporto white-glove incluso
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-4 gap-8 text-white/80">
              <div>
                <div className="text-3xl font-black text-white">4,127</div>
                <div className="text-sm">Ristoranti attivi</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">+180%</div>
                <div className="text-sm">ROI medio</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">8min</div>
                <div className="text-sm">Setup completo</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">4.9★</div>
                <div className="text-sm">Soddisfazione clienti</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};