import { BuilderData } from "@/types/builder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface SiteNewsletterProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteNewsletter = ({ data, templateColors }: SiteNewsletterProps) => {
  if (!data.newsletterEnabled) return null;

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  const title = data.newsletterTitle || "Resta Aggiornato";
  const description =
    data.newsletterDescription || "Iscriviti alla nostra newsletter per ricevere novità e promozioni esclusive";

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto max-w-2xl text-center">
        <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: primaryColor }} />
        <h3 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
          {title}
        </h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="La tua email"
            className="flex-1"
            required
          />
          <Button
            type="submit"
            style={{ backgroundColor: secondaryColor }}
            className="whitespace-nowrap"
          >
            Iscriviti
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-4">
          Iscrivendoti, accetti la nostra{" "}
          <a href="#privacy" className="underline hover:opacity-80">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
};

