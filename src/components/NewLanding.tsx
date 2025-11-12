import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles, Zap, Globe, Check, Star, PenTool, Menu, Layout, Crown, Users, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface NewLandingProps {
  onStartBuilding: (mode: 'logo' | 'menu' | 'site') => void;
}

export const NewLanding: React.FC<NewLandingProps> = ({ onStartBuilding }) => {
  const [playingDemo, setPlayingDemo] = useState(false);

  const primaryBuilders = [
    {
      id: 'logo' as const,
      title: 'Logo',
      description: 'Design professionale con IA',
      icon: PenTool,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    },
    {
      id: 'menu' as const,
      title: 'Menu',
      description: 'Carta digitale elegante',
      icon: Menu,
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      hoverColor: 'hover:from-emerald-600 hover:to-teal-700'
    },
    {
      id: 'site' as const,
      title: 'Sito Web',
      description: 'Presenza online completa',
      icon: Layout,
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
      hoverColor: 'hover:from-purple-600 hover:to-pink-700'
    }
  ];

  const stats = [
    { value: '15,000+', label: 'Ristoranti attivi' },
    { value: '98%', label: 'Soddisfazione clienti' },
    { value: '5 min', label: 'Setup medio' },
    { value: '24/7', label: 'Supporto dedicato' }
  ];

  const testimonials = [
    {
      text: "In 10 minuti avevo tutto: logo, menu e sito web. Incredibile!",
      author: "Marco Rossi",
      role: "La Tavola del Re, Roma",
      avatar: "🍝"
    },
    {
      text: "I nostri clienti adorano il nuovo menu digitale. Prenotazioni +40%",
      author: "Elena Bianchi", 
      role: "Osteria del Porto, Napoli",
      avatar: "🦐"
    },
    {
      text: "Finalmente un SaaS pensato per noi ristoratori. Tutto integrato.",
      author: "Giovanni Verdi",
      role: "Pizzeria La Margherita, Milano",
      avatar: "🍕"
    }
  ];

  const features = [
    { icon: Crown, title: 'Template Premium', desc: 'Design esclusivi per ogni tipo di locale' },
    { icon: Zap, title: 'Setup Istantaneo', desc: 'Online in 5 minuti, senza competenze tecniche' },
    { icon: Globe, title: 'Tutto Integrato', desc: 'Logo, menu e sito sincronizzati automaticamente' },
    { icon: Users, title: 'Più Clienti', desc: 'SEO ottimizzato e prenotazioni integrate' },
    { icon: Shield, title: 'Hosting Incluso', desc: 'Sicurezza enterprise e backup automatici' },
    { icon: Clock, title: 'Supporto 24/7', desc: 'Team dedicato al settore food & beverage' }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header Premium */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl text-gray-900">RestaurantSaaS</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Accedi
            </button>
            <Button className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Inizia Gratis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section Eccezionale */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent)] 
                        [background-size:50%_50%] [background-position:0%_0%,100%_100%]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          
          {/* Main Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-8"
            >
              Il tuo ristorante
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> online</span>
              <br />in 5 minuti
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed"
            >
              Logo professionale, menu digitale e sito web completo.
              <br />Tutto sincronizzato, tutto incluso.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              {primaryBuilders.map((builder, index) => (
                <Button
                  key={builder.id}
                  onClick={() => onStartBuilding(builder.id)}
                  className={`
                    group relative overflow-hidden px-8 py-6 text-white font-bold text-lg
                    ${builder.color} ${builder.hoverColor}
                    transform hover:scale-105 transition-all duration-300 
                    shadow-xl hover:shadow-2xl
                    min-w-[180px]
                  `}
                >
                  <builder.icon className="w-6 h-6 mr-3" />
                  {builder.title}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ))}
            </motion.div>

            {/* Demo Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-5xl mx-auto"
            >
              <div 
                className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden cursor-pointer group"
                onClick={() => setPlayingDemo(true)}
              >
                {!playingDemo ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                      <p className="text-white font-semibold text-lg">Guarda la demo (2 min)</p>
                      <p className="text-white/80 text-sm mt-2">Scopri quanto è semplice</p>
                    </div>
                  </div>
                ) : (
                  <video autoPlay muted loop className="w-full h-full object-cover">
                    <source src="/demos/complete-demo.mp4" type="video/mp4" />
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-xl font-medium">
                      🎬 Demo Video Placeholder
                    </div>
                  </video>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tutto quello che serve per crescere
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Una piattaforma completa progettata specificamente per il settore food & beverage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Storie di successo
            </h2>
            <p className="text-xl text-gray-700">
              Migliaia di ristoratori hanno trasformato il loro business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 relative"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Inizia oggi stesso
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Unisciti a migliaia di ristoratori che hanno trasformato la loro presenza online.
              <br />Setup gratuito in 5 minuti.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              {primaryBuilders.map((builder, index) => (
                <Button
                  key={builder.id}
                  onClick={() => onStartBuilding(builder.id)}
                  className="group bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-bold min-w-[200px] transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <builder.icon className="w-6 h-6 mr-3" />
                  Inizia con {builder.title}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-300" />
                <span className="font-medium">Gratis per sempre</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-300" />
                <span className="font-medium">Nessuna carta richiesta</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-300" />
                <span className="font-medium">Supporto italiano</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};