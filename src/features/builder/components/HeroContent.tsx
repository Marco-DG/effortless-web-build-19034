import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const rotatingTargets = [
  { prefix: "Il tuo", noun: "ristorante" },
  { prefix: "Il tuo", noun: "bar" },
  { prefix: "Il tuo", noun: "caffè" },
  { prefix: "La tua", noun: "pizzeria" },
  { prefix: "La tua", noun: "trattoria" },
  { prefix: "La tua", noun: "gelateria" },
  { prefix: "La tua", noun: "enoteca" },
  { prefix: "Il tuo", noun: "pub" },
];

export const HeroContent = () => {
  const [idx, setIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIdx((p) => (p + 1) % rotatingTargets.length);
        setIsAnimating(false);
      }, 350);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const current = rotatingTargets[idx];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-2xl">
      {/* Title */}
      <motion.h1
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } } }}
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-[1.05] tracking-tight"
      >
        <motion.span variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="text-foreground">
          Fai <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">crescere</span>
        </motion.span>
        <motion.span variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} className="mt-1 block text-foreground">
          <span className="inline-flex items-baseline gap-3">
            <span className="text-foreground/90">{current.prefix}</span>
            <span className="relative inline-block align-baseline">
              <span
                className={`relative z-10 font-semibold transition-all duration-300 ${
                  isAnimating ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
                }`}
                style={{ fontFamily: "var(--font-heading, inherit)", hyphens: 'auto' }}
              >
                {current.noun}
              </span>
              <span className="absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-t from-primary/20 to-transparent rounded-md" aria-hidden />
            </span>
          </span>
        </motion.span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative">
        <div className="pointer-events-none absolute -inset-x-2 -top-2 -bottom-2 bg-gradient-to-r from-primary/10 via-secondary/10 to-emerald-100 blur-2xl rounded-3xl" aria-hidden />
        <div className="relative isolate flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur ring-1 ring-emerald-300 shadow-[0_1px_0_rgba(255,255,255,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 font-medium">Subito</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur ring-1 ring-rose-300 shadow-[0_1px_0_rgba(255,255,255,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-orange-500 font-medium">Online</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur ring-1 ring-fuchsia-300 shadow-[0_1px_0_rgba(255,255,255,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-500 font-medium">Senza stress</span>
          </span>
        </div>
      </motion.div>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed"
      >
        Dal menù alle prenotazioni: tutto pronto.
        <br />
        Crea il tuo <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 font-semibold">brand</span> in pochi minuti.
      </motion.p>
    </div>
  );
};
