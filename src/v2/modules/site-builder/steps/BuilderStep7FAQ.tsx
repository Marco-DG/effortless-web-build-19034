import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../../../ui/Button';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

interface BuilderStep7FAQProps {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep7FAQ: React.FC<BuilderStep7FAQProps> = ({ data, onUpdate, onNext, onBack }) => {
  const faqs = data.faqs || [];

  const handleAddFAQ = () => {
    const newFAQ = {
      id: `faq_${Date.now()}`,
      question: '',
      answer: ''
    };
    onUpdate({ faqs: [...faqs, newFAQ] });
  };

  const handleUpdateFAQ = (id: string, updates: any) => {
    const updatedFAQs = faqs.map((faq: any) => 
      faq.id === id ? { ...faq, ...updates } : faq
    );
    onUpdate({ faqs: updatedFAQs });
  };

  const handleDeleteFAQ = (id: string) => {
    const updatedFAQs = faqs.filter((faq: any) => faq.id !== id);
    onUpdate({ faqs: updatedFAQs });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">FAQ</h3>
        <p className="text-sm text-muted-foreground">
          Rispondi alle domande più frequenti dei tuoi clienti
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Domande e Risposte ({faqs.length})
          </span>
          <Button onClick={handleAddFAQ} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi FAQ
          </Button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any) => (
            <div key={faq.id} className="border rounded-lg p-4 space-y-3">
              <div>
                <Label>Domanda</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => handleUpdateFAQ(faq.id, { question: e.target.value })}
                  placeholder="Es. Accettate prenotazioni?"
                />
              </div>

              <div>
                <Label>Risposta</Label>
                <Textarea
                  value={faq.answer}
                  onChange={(e) => handleUpdateFAQ(faq.id, { answer: e.target.value })}
                  placeholder="Sì, accettiamo prenotazioni telefoniche e online..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteFAQ(faq.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Rimuovi
                </Button>
              </div>
            </div>
          ))}
          
          {faqs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nessuna FAQ aggiunta</p>
              <Button onClick={handleAddFAQ} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi prima FAQ
              </Button>
            </div>
          )}
        </div>

        {faqs.length === 0 && (
          <div className="bg-muted/20 rounded-lg p-4">
            <h4 className="font-medium mb-2">Suggerimenti per FAQ utili:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Accettate prenotazioni?</li>
              <li>• Quali sono gli orari di apertura?</li>
              <li>• Avete opzioni vegetariane/vegane?</li>
              <li>• È possibile organizzare eventi privati?</li>
              <li>• Offrite servizio delivery?</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};