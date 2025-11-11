import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../../../ui/Button';
import { Plus, Trash2, Star } from 'lucide-react';

interface BuilderStep7ReviewsProps {
  data: any;
  onUpdate: (updates: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep7Reviews: React.FC<BuilderStep7ReviewsProps> = ({ data, onUpdate, onNext, onBack }) => {
  const reviews = data.reviews || [];

  const handleAddReview = () => {
    const newReview = {
      id: `review_${Date.now()}`,
      author: '',
      text: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0]
    };
    onUpdate({ reviews: [...reviews, newReview] });
  };

  const handleUpdateReview = (id: string, updates: any) => {
    const updatedReviews = reviews.map((review: any) => 
      review.id === id ? { ...review, ...updates } : review
    );
    onUpdate({ reviews: updatedReviews });
  };

  const handleDeleteReview = (id: string) => {
    const updatedReviews = reviews.filter((review: any) => review.id !== id);
    onUpdate({ reviews: updatedReviews });
  };

  const renderStars = (rating: number, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange?.(star)}
            className={`${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            disabled={!onRatingChange}
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Recensioni</h3>
        <p className="text-sm text-muted-foreground">
          Aggiungi recensioni positive dei tuoi clienti
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Recensioni ({reviews.length})
          </span>
          <Button onClick={handleAddReview} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi recensione
          </Button>
        </div>

        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review.id} className="border rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Nome cliente</Label>
                  <Input
                    value={review.author}
                    onChange={(e) => handleUpdateReview(review.id, { author: e.target.value })}
                    placeholder="Marco R."
                  />
                </div>
                <div>
                  <Label>Data</Label>
                  <Input
                    type="date"
                    value={review.date}
                    onChange={(e) => handleUpdateReview(review.id, { date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Valutazione</Label>
                <div className="mt-1">
                  {renderStars(review.rating, (rating) => handleUpdateReview(review.id, { rating }))}
                </div>
              </div>

              <div>
                <Label>Testo recensione</Label>
                <Textarea
                  value={review.text}
                  onChange={(e) => handleUpdateReview(review.id, { text: e.target.value })}
                  placeholder="Ottimo ristorante, servizio eccellente..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteReview(review.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Rimuovi
                </Button>
              </div>
            </div>
          ))}
          
          {reviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nessuna recensione aggiunta</p>
              <Button onClick={handleAddReview} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi prima recensione
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};