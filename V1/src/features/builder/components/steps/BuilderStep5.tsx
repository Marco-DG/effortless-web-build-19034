import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/image-uploader";
import { BuilderData } from "@/types/builder";

interface BuilderStep5Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep5 = ({ data, onUpdate }: BuilderStep5Props) => {
  const about = data.about || {};

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold mb-4">Sezione "Chi Siamo"</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configura la sezione Chi siamo del tuo sito: immagine, titolo del paragrafo e testo.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2 block">Foto</Label>
          <ImageUploader
            label="Immagine 'Chi siamo'"
            value={about.imageUrl || ""}
            onChange={(url) =>
              onUpdate({
                about: {
                  ...about,
                  imageUrl: url,
                },
              })
            }
            onRemove={() =>
              onUpdate({
                about: {
                  ...about,
                  imageUrl: "",
                },
              })
            }
            helpText="PNG, JPG o SVG"
            previewSize={64}
          />
        </div>

        <div>
          <Label htmlFor="aboutHeading" className="text-sm font-medium">
            Titolo del paragrafo
          </Label>
          <Input
            id="aboutHeading"
            placeholder="Es: La nostra enoteca"
            value={about.heading || ""}
            onChange={(e) =>
              onUpdate({
                about: {
                  ...about,
                  heading: e.target.value,
                },
              })
            }
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="aboutText" className="text-sm font-medium">
            Paragrafo
          </Label>
          <Textarea
            id="aboutText"
            placeholder="Racconta chi siete, l'atmosfera e cosa vi rende unici..."
            value={about.text || about.story || ""}
            onChange={(e) =>
              onUpdate({
                about: {
                  ...about,
                  text: e.target.value,
                },
              })
            }
            className="mt-2 min-h-24"
          />
        </div>
      </div>
    </div>
  );
};

