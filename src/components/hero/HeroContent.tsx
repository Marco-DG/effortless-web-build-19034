export const HeroContent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-center">
        <span className="animate-gradient-shimmer inline-block animate-fade-in-up">
          Online.
        </span>{" "}
        <span className="text-foreground inline-block animate-fade-in-up-delay-1">
          Subito.
        </span>{" "}
        <span className="animate-gradient-shimmer inline-block animate-fade-in-up-delay-2">
          Zero stress.
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed text-center animate-fade-in-up-delay-3 max-w-2xl mx-auto px-4">
        Crea e pubblica il tuo sito in pochi minuti. Per ristoranti, bar e piccoli business che vogliono farsi trovare{" "}
        <span className="text-foreground font-semibold">ora</span>.
      </p>
    </div>
  );
};
