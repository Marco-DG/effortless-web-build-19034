import React from 'react';
import { useSectionUpdater } from '../../hooks/useSectionUpdater';
import { PremiumCard, PremiumTextInput, PremiumSelect, PremiumActionButton, PremiumNumberInput } from '../../components/forms';

interface EditorProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const ReviewsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const reviews = project.data.site?.sections?.find((s: any) => s.type === 'reviews')?.data || {};
  const reviewsList = reviews.reviews || [];
  
  const { createSectionUpdater } = useSectionUpdater({ project, onUpdate });
  const updateReviewsSection = createSectionUpdater('reviews', 'reviews_main', 4);

  const addReview = () => {
    const newReviews = [...reviewsList, {
      id: `review_${Date.now()}`,
      author: '',
      text: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0]
    }];
    updateReviewsSection({ reviews: newReviews });
  };

  const updateReview = (index: number, field: string, value: any) => {
    const newReviews = [...reviewsList];
    newReviews[index] = { ...newReviews[index], [field]: value };
    updateReviewsSection({ reviews: newReviews });
  };

  const removeReview = (index: number) => {
    const newReviews = reviewsList.filter((_: any, i: number) => i !== index);
    updateReviewsSection({ reviews: newReviews });
  };

  return (
    <PremiumCard
      title="Recensioni"
      description="Gestisci le testimonianze e recensioni dei tuoi clienti"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <PremiumTextInput
            label="Titolo Sezione"
            value={reviews.title || 'Cosa Dicono di Noi'}
            onChange={(value) => updateReviewsSection({ title: value })}
            placeholder="Cosa Dicono di Noi"
            description="Il titolo che introduce le recensioni"
          />
          
          <PremiumTextInput
            label="Sottotitolo"
            value={reviews.subtitle || 'Le recensioni dei nostri clienti'}
            onChange={(value) => updateReviewsSection({ subtitle: value })}
            placeholder="Le recensioni dei nostri clienti"
            description="Una descrizione opzionale per le recensioni"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-800 font-geist tracking-[-0.01em]">
              Recensioni ({reviewsList.length})
            </h4>
            <PremiumActionButton
              variant="primary"
              onClick={addReview}
              icon={() => (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            >
              Aggiungi Recensione
            </PremiumActionButton>
          </div>

          <div className="space-y-4">
            {reviewsList.map((review: any, index: number) => (
              <div key={review.id} className="relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm p-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <PremiumTextInput
                      label="Autore"
                      value={review.author}
                      onChange={(value) => updateReview(index, 'author', value)}
                      placeholder="Nome del cliente"
                    />
                    <PremiumSelect
                      label="Valutazione"
                      value={review.rating?.toString() || '5'}
                      onChange={(value) => updateReview(index, 'rating', parseInt(value))}
                      options={[
                        { value: '5', label: '5 stelle - Eccellente' },
                        { value: '4', label: '4 stelle - Molto buono' },
                        { value: '3', label: '3 stelle - Buono' },
                        { value: '2', label: '2 stelle - Discreto' },
                        { value: '1', label: '1 stella - Scarso' }
                      ]}
                    />
                  </div>
                  <PremiumTextInput
                    label="Recensione"
                    value={review.text}
                    onChange={(value) => updateReview(index, 'text', value)}
                    placeholder="Testo della recensione..."
                    multiline
                    rows={3}
                  />
                  <div className="flex justify-end pt-2">
                    <PremiumActionButton
                      variant="ghost"
                      onClick={() => removeReview(index)}
                      icon={() => (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      )}
                    >
                      Rimuovi
                    </PremiumActionButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PremiumCard>
  );
};

export const EventsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const events = project.data.site?.sections?.find((s: any) => s.type === 'events')?.data || {};
  const eventsList = events.events || [];
  
  const { createSectionUpdater } = useSectionUpdater({ project, onUpdate });
  const updateEventsSection = createSectionUpdater('events', 'events_main', 5);

  const addEvent = () => {
    const newEvents = [...eventsList, {
      id: `event_${Date.now()}`,
      title: '',
      description: '',
      date: '',
      time: '',
      image: ''
    }];
    updateEventsSection({ events: newEvents });
  };

  const updateEvent = (index: number, field: string, value: string) => {
    const newEvents = [...eventsList];
    newEvents[index] = { ...newEvents[index], [field]: value };
    updateEventsSection({ events: newEvents });
  };

  const removeEvent = (index: number) => {
    const newEvents = eventsList.filter((_: any, i: number) => i !== index);
    updateEventsSection({ events: newEvents });
  };

  return (
    <PremiumCard
      title="Eventi"
      description="Gestisci eventi, serate speciali e promozioni del ristorante"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <PremiumTextInput
            label="Titolo Sezione"
            value={events.title || 'I Nostri Eventi'}
            onChange={(value) => updateEventsSection({ title: value })}
            placeholder="I Nostri Eventi"
            description="Il titolo che introduce la sezione eventi"
          />
          
          <PremiumTextInput
            label="Sottotitolo"
            value={events.subtitle || 'Non perdere le nostre serate speciali'}
            onChange={(value) => updateEventsSection({ subtitle: value })}
            placeholder="Non perdere le nostre serate speciali"
            description="Una descrizione che invita a partecipare agli eventi"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-800 font-geist tracking-[-0.01em]">
              Eventi ({eventsList.length})
            </h4>
            <PremiumActionButton
              variant="primary"
              onClick={addEvent}
              icon={() => (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            >
              Aggiungi Evento
            </PremiumActionButton>
          </div>

          <div className="space-y-4">
            {eventsList.map((event: any, index: number) => (
              <div key={event.id} className="relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm p-4">
                <div className="space-y-3">
                  <PremiumTextInput
                    label="Titolo Evento"
                    value={event.title}
                    onChange={(value) => updateEvent(index, 'title', value)}
                    placeholder="Nome dell'evento"
                    description="Il titolo dell'evento o promozione"
                  />
                  <PremiumTextInput
                    label="Descrizione"
                    value={event.description}
                    onChange={(value) => updateEvent(index, 'description', value)}
                    placeholder="Descrizione dell'evento..."
                    description="Dettagli su cosa aspettarsi dall'evento"
                    multiline
                    rows={2}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-800 font-geist tracking-[-0.01em]">Data</label>
                      <input 
                        type="date"
                        value={event.date}
                        onChange={(e) => updateEvent(index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200/50 rounded-[8px] text-sm bg-white/60 font-geist tracking-[-0.01em]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-800 font-geist tracking-[-0.01em]">Ora</label>
                      <input 
                        type="time"
                        value={event.time}
                        onChange={(e) => updateEvent(index, 'time', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200/50 rounded-[8px] text-sm bg-white/60 font-geist tracking-[-0.01em]"
                      />
                    </div>
                  </div>
                  <PremiumTextInput
                    label="Immagine Evento"
                    value={event.image}
                    onChange={(value) => updateEvent(index, 'image', value)}
                    placeholder="https://images.unsplash.com/..."
                    description="URL dell'immagine che rappresenta l'evento"
                  />
                  <div className="flex justify-end pt-2">
                    <PremiumActionButton
                      variant="ghost"
                      onClick={() => removeEvent(index)}
                      icon={() => (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      )}
                    >
                      Rimuovi
                    </PremiumActionButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PremiumCard>
  );
};