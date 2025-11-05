import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BuilderData } from "@/types/builder";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useState } from "react";

interface BuilderStep5Props {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep5 = ({ data, onUpdate, onNext, onBack }: BuilderStep5Props) => {
  const [newValue, setNewValue] = useState({ title: "", description: "", icon: "" });

  const about = data.about || {
    story: "",
    philosophy: "",
    values: [],
  };

  const addValue = () => {
    if (newValue.title.trim()) {
      const updatedValues = [...(about.values || []), newValue];
      onUpdate({
        about: {
          ...about,
          values: updatedValues,
        },
      });
      setNewValue({ title: "", description: "", icon: "" });
    }
  };

  const removeValue = (index: number) => {
    const updatedValues = about.values?.filter((_, i) => i !== index) || [];
    onUpdate({
      about: {
        ...about,
        values: updatedValues,
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold mb-4">Sezione "Chi Siamo"</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Racconta la storia del tuo locale e i valori che lo contraddistinguono
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="story" className="text-sm font-medium">
            La storia del locale
          </Label>
          <Textarea
            id="story"
            placeholder="Racconta la storia del tuo locale, come è nato, la tradizione..."
            value={about.story}
            onChange={(e) =>
              onUpdate({
                about: {
                  ...about,
                  story: e.target.value,
                },
              })
            }
            className="mt-2 min-h-24"
          />
        </div>

        <div>
          <Label htmlFor="philosophy" className="text-sm font-medium">
            Filosofia e valori
          </Label>
          <Textarea
            id="philosophy"
            placeholder="Descrivi la filosofia del locale, cosa ti distingue (es. cucina locale, ingredienti freschi, sostenibilità...)"
            value={about.philosophy}
            onChange={(e) =>
              onUpdate({
                about: {
                  ...about,
                  philosophy: e.target.value,
                },
              })
            }
            className="mt-2 min-h-24"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Punti di forza (opzionale)</Label>
          {about.values && about.values.length > 0 && (
            <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
              {about.values.map((value, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {value.icon && <span className="text-xl">{value.icon}</span>}
                      <p className="font-medium">{value.title}</p>
                    </div>
                    {value.description && (
                      <p className="text-sm text-muted-foreground mt-1">{value.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeValue(idx)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors ml-2"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="valueIcon" className="text-xs">
                  Icona (emoji)
                </Label>
                <Input
                  id="valueIcon"
                  placeholder="🌾"
                  value={newValue.icon}
                  onChange={(e) => setNewValue({ ...newValue, icon: e.target.value })}
                  className="mt-1"
                  maxLength={2}
                />
              </div>
              <div>
                <Label htmlFor="valueTitle" className="text-xs">
                  Titolo
                </Label>
                <Input
                  id="valueTitle"
                  placeholder="Es: Ingredienti Freschi"
                  value={newValue.title}
                  onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="valueDesc" className="text-xs">
                Descrizione
              </Label>
              <Input
                id="valueDesc"
                placeholder="Es: Dal produttore alla tavola"
                value={newValue.description}
                onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button
              type="button"
              onClick={addValue}
              disabled={!newValue.title.trim()}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi punto di forza
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

