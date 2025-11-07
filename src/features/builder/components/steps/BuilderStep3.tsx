import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BuilderData } from "@/types/builder";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageUploader } from "@/components/ui/image-uploader";

interface BuilderStep3Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep3 = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: BuilderStep3Props) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const handleNext = () => {
    const name = (data.businessName || "").trim();
    if (name) {
      onNext();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Label
          htmlFor="heroTitle"
          className="text-sm font-medium text-foreground mb-2 block"
        >
          Titolo (Hero)
        </Label>
        <Input
          id="heroTitle"
          type="text"
          placeholder="Es: Benvenuti nella nostra Enoteca"
          value={data.heroSlogan}
          onChange={(e) => onUpdate({ heroSlogan: e.target.value })}
          className="text-lg py-6"
        />
      </div>

      <div>
        <Label
          htmlFor="heroSubtitle"
          className="text-sm font-medium text-foreground mb-2 block"
        >
          Sottotitolo (Hero)
        </Label>
        <Input
          id="heroSubtitle"
          type="text"
          placeholder="Es: Vini d'autore. Atmosfera intima."
          value={data.heroDescription}
          onChange={(e) => onUpdate({ heroDescription: e.target.value })}
          className="text-lg py-6"
        />
      </div>

     {/* Background image uploader (drag & drop + URL) */}
     <ImageUploader
       label="Immagine di sfondo"
       value={data.heroImageUrl}
       onChange={(url)=> onUpdate({ heroImageUrl: url })}
       onRemove={() => onUpdate({ heroImageUrl: "" })}
       helpText="PNG, JPG o SVG"
       previewSize={64}
     />
   </div>
 );
};
