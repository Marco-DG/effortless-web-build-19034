import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroContent = () => {
  return (
    <div className="space-y-8 lg:pr-12">
      <div className="space-y-6">
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
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
        
        <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed animate-fade-in-up-delay-3">
          Crea e pubblica il tuo sito in pochi minuti. Per ristoranti, bar e piccoli business che vogliono farsi trovare{" "}
          <span className="text-foreground font-semibold">ora</span>.
        </p>
      </div>
      
      <Button 
        size="lg" 
        className="text-lg px-8 py-6 animate-fade-in-up-delay-3 group bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Crea il mio sito ora
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
    </div>
  );
};
