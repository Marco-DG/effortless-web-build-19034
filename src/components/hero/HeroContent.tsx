import { useState, useEffect } from "react";

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
    <div className="space-y-8 sm:space-y-12">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
        <span className="inline-block animate-fade-in-up bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Online.
        </span>{" "}
        <span className="inline-block animate-fade-in-up-delay-1 text-gray-900">
          Subito.
        </span>{" "}
        <span className="inline-block animate-fade-in-up-delay-2 bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent whitespace-nowrap">
          Zero stress.
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed animate-fade-in-up-delay-3 max-w-xl">
        Crea e pubblica il tuo sito in pochi minuti. Perfetto per{" "}
        <span className="relative inline-block min-w-[120px]">
          <span
            className={`inline-block transition-all duration-300 ${
              isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {rotatingWords[currentWordIndex]}
          </span>
        </span>
        {" "}e piccoli business che vogliono farsi trovare{" "}
        <span className="text-gray-900 font-semibold">ora</span>.
      </p>
    </div>
  );
};
