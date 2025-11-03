import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BuilderData, FAQ } from "../InteractiveBuilder";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { useState } from "react";

interface BuilderStep7FAQProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep7FAQ = ({ data, onUpdate, onNext, onBack }: BuilderStep7FAQProps) => {
  const [newFAQ, setNewFAQ] = useState<Omit<FAQ, "id">>({
    question: "",
    answer: "",
  });

  const addFAQ = () => {
    if (newFAQ.question.trim() && newFAQ.answer.trim()) {
      const faq: FAQ = {
        ...newFAQ,
        id: `faq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      onUpdate({
        faqs: [...data.faqs, faq],
      });
      setNewFAQ({ question: "", answer: "" });
    }
  };

  const removeFAQ = (index: number) => {
    const updatedFAQs = data.faqs.filter((_, i) => i !== index);
    onUpdate({ faqs: updatedFAQs });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* FAQ */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Domande Frequenti</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Aggiungi FAQ per rispondere alle domande più comuni
        </p>

        <div className="space-y-4">
          {data.faqs.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {data.faqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{faq.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  <button
                    onClick={() => removeFAQ(idx)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors ml-2"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <div>
              <Label htmlFor="faqQuestion" className="text-xs">
                Domanda
              </Label>
              <Input
                id="faqQuestion"
                placeholder="Es: Fate consegne a domicilio?"
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="faqAnswer" className="text-xs">
                Risposta
              </Label>
              <Textarea
                id="faqAnswer"
                placeholder="Es: Sì, consegniamo tramite Glovo, UberEats e Deliveroo..."
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                className="mt-1 min-h-20"
              />
            </div>
            <Button
              type="button"
              onClick={addFAQ}
              disabled={!newFAQ.question.trim() || !newFAQ.answer.trim()}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi FAQ
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 text-lg py-6 transition-all duration-300 group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Indietro
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="flex-1 text-lg py-6 bg-primary hover:bg-primary/90 transition-all duration-300 group"
        >
          Avanti
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};

