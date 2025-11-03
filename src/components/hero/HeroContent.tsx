export const HeroContent = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
        <span className="block animate-fade-in-up">
          Online.
        </span>{" "}
        <span className="block animate-fade-in-up-delay-1">
          Subito.
        </span>{" "}
        <span className="block animate-fade-in-up-delay-2">
          Zero stress.
        </span>
      </h1>
      
      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-in-up-delay-3 max-w-xl">
        Crea e pubblica il tuo sito in pochi minuti. Per ristoranti, bar e piccoli business che vogliono farsi trovare{" "}
        <span className="text-foreground font-semibold">ora</span>.
      </p>
    </div>
  );
};
