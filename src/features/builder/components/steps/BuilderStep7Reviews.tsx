import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BuilderData, Review } from "@/types/builder";
import { ArrowLeft, ArrowRight, Plus, X, Star } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuilderStep7ReviewsProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const BuilderStep7Reviews = ({ data, onUpdate, onNext, onBack }: BuilderStep7ReviewsProps) => {
  const [newReview, setNewReview] = useState<Omit<Review, "id">>({
    name: "",
    text: "",
    rating: 5,
    date: new Date().toLocaleDateString("it-IT"),
  });

  const addReview = () => {
    if (newReview.name.trim() && newReview.text.trim()) {
      const review: Review = {
        ...newReview,
        id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      onUpdate({
        reviews: [...data.reviews, review],
      });
      setNewReview({ name: "", text: "", rating: 5, date: new Date().toLocaleDateString("it-IT") });
    }
  };

  const removeReview = (index: number) => {
    const updatedReviews = data.reviews.filter((_, i) => i !== index);
    onUpdate({ reviews: updatedReviews });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Recensioni */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recensioni e Testimonianze</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Aggiungi recensioni dei clienti per aumentare la fiducia
        </p>

        <div className="space-y-4">
          {data.reviews.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {data.reviews.map((review, idx) => (
                <div
                  key={review.id}
                  className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{review.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">{review.text}</p>
                    {review.date && (
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeReview(idx)}
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
                <Label htmlFor="reviewName" className="text-xs">
                  Nome cliente
                </Label>
                <Input
                  id="reviewName"
                  placeholder="Es: Marco R."
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="reviewRating" className="text-xs">
                  Valutazione
                </Label>
                <Select
                  value={newReview.rating.toString()}
                  onValueChange={(value) =>
                    setNewReview({ ...newReview, rating: parseInt(value) })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} stelle
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="reviewText" className="text-xs">
                Testo recensione
              </Label>
              <Textarea
                id="reviewText"
                placeholder="Es: La migliore carbonara che abbia mai mangiato!"
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                className="mt-1 min-h-20"
              />
            </div>
            <Button
              type="button"
              onClick={addReview}
              disabled={!newReview.name.trim() || !newReview.text.trim()}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi recensione
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

