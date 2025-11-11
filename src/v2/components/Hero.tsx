import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/app-store';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '@/components/ui/badge';
import { PenTool, UtensilsCrossed, LayoutDashboard, Sparkles, ArrowRight } from 'lucide-react';

const businessTypes = [
  { prefix: 'Il tuo', noun: 'ristorante', color: 'from-orange-500 to-red-600' },
  { prefix: 'Il tuo', noun: 'bar', color: 'from-blue-500 to-indigo-600' },
  { prefix: 'Il tuo', noun: 'caffè', color: 'from-amber-500 to-orange-600' },
  { prefix: 'La tua', noun: 'pizzeria', color: 'from-red-500 to-pink-600' },
  { prefix: 'La tua', noun: 'trattoria', color: 'from-green-500 to-emerald-600' },
  { prefix: 'La tua', noun: 'gelateria', color: 'from-pink-500 to-rose-600' },
  { prefix: 'La tua', noun: 'enoteca', color: 'from-purple-500 to-violet-600' },
  { prefix: 'Il tuo', noun: 'pub', color: 'from-amber-600 to-yellow-600' },
];

const features = [
  {
    icon: PenTool,
    title: 'Logo Builder',
    description: 'Crea loghi professionali con intelligenza artificiale',
    gradient: 'from-emerald-500 to-teal-600',
    action: 'logo' as const,
    badge: 'IA Powered'
  },
  {
    icon: UtensilsCrossed,
    title: 'Menu Builder', 
    description: 'Gestisci menu digitali eleganti e funzionali',
    gradient: 'from-rose-500 to-pink-600',
    action: 'menu' as const,
    badge: 'Drag & Drop'
  },
  {
    icon: LayoutDashboard,
    title: 'Site Builder',
    description: 'Costruisci il tuo sito web completo in minuti',
    gradient: 'from-violet-500 to-purple-600', 
    action: 'site' as const,
    badge: 'No Code'
  }
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { startBuilding, createProject } = useAppStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % businessTypes.length);
        setIsAnimating(false);
      }, 350);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = businessTypes[currentIndex];

  const handleStartBuilding = (mode: 'logo' | 'menu' | 'site') => {
    createProject('Nuovo Progetto', 'wine-bar');
    startBuilding(mode);
  };

  return (
    <div className="h-full flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [10, -10, 10],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-xl"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>La piattaforma completa per il tuo business</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-foreground">Fai </span>
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              crescere
            </span>
            <br />
            <span className="text-foreground/90">{current.prefix} </span>
            <span className="relative inline-block">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -10 : 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-r ${current.color} bg-clip-text text-transparent font-bold`}
              >
                {current.noun}
              </motion.span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/20 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Il tuo{' '}
            <span className="text-primary font-semibold">brand online</span>,{' '}
            subito e{' '}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              senza stress
            </span>
            .<br />
            <span className="text-lg">
              Per ristoranti, bar e locali che vogliono farsi trovare.
            </span>
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid gap-4 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card 
                className="group cursor-pointer border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                onClick={() => handleStartBuilding(feature.action)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {feature.badge}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center space-y-4"
        >
          <Button
            size="lg"
            variant="gradient"
            onClick={() => handleStartBuilding('site')}
            className="text-lg px-8 py-6 shadow-2xl hover:shadow-3xl"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Inizia Ora - È Gratis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Nessuna carta di credito richiesta • Setup in 5 minuti
          </p>
        </motion.div>
      </div>
    </div>
  );
};