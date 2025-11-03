export const HeroContent = () => {
  return (
    <div className="space-y-8 sm:space-y-12">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
        <span className="block animate-fade-in-up text-gray-900">
          Online.
        </span>{" "}
        <span className="block animate-fade-in-up-delay-1 text-gray-900">
          Subito.
        </span>{" "}
        <span className="block animate-fade-in-up-delay-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Zero stress.
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed animate-fade-in-up-delay-3 max-w-xl">
        Crea e pubblica il tuo sito in pochi minuti. Per ristoranti, bar e piccoli business che vogliono farsi trovare{" "}
        <span className="text-gray-900 font-semibold">ora</span>.
      </p>
    </div>
  );
};
