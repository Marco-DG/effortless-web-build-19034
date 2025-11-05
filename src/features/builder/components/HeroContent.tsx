import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const rotatingWords = [
  "ristoranti",
  "bar",
  "caffè",
  "pasticcerie",
  "pub",
  "locali",
];

export const HeroContent = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-7 sm:space-y-10">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } } }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-[1.05] tracking-tight">
          <motion.span variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="inline-block text-foreground">Online.</motion.span>{" "}
          <motion.span variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="inline-block text-foreground/80">Subito.</motion.span>{" "}
          <motion.span variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="inline-block text-primary whitespace-nowrap">Zero stress.</motion.span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl"
      >
        Crea e pubblica il tuo sito in pochi minuti. Perfetto per{" "}
        <span className="relative inline-block min-w-[110px]">
          <span
            className={`inline-block transition-all duration-300 ${
              isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {rotatingWords[currentWordIndex]}
          </span>
        </span>{" "}
        e piccoli business che vogliono farsi trovare {" "}
        <span className="text-secondary font-semibold">ora</span>.
      </motion.p>
    </div>
  );
};
