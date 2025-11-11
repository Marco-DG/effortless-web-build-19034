import React from 'react';

interface EditorProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const ReviewsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const reviews = project.data.site?.sections?.find((s: any) => s.type === 'reviews')?.data || {};
  const reviewsList = reviews.reviews || [];
  
  const updateReviewsSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const reviewsSection = sections.find((s: any) => s.type === 'reviews');
    if (reviewsSection) {
      reviewsSection.data = { ...reviewsSection.data, ...updates };
    } else {
      sections.push({
        id: 'reviews_main',
        type: 'reviews',
        enabled: true,
        order: 4,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

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
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Recensioni</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Sezione</label>
            <input 
              type="text"
              value={reviews.title || 'Cosa Dicono di Noi'}
              onChange={(e) => updateReviewsSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Cosa Dicono di Noi"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sottotitolo</label>
            <input 
              type="text"
              value={reviews.subtitle || 'Le recensioni dei nostri clienti'}
              onChange={(e) => updateReviewsSection({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Le recensioni dei nostri clienti"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Recensioni ({reviewsList.length})</h4>
          <button 
            onClick={addReview}
            className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
          >
            Aggiungi Recensione
          </button>
        </div>

        <div className="space-y-4">
          {reviewsList.map((review: any, index: number) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Autore</label>
                    <input 
                      type="text"
                      value={review.author}
                      onChange={(e) => updateReview(index, 'author', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                      placeholder="Nome del cliente"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Valutazione</label>
                    <select 
                      value={review.rating}
                      onChange={(e) => updateReview(index, 'rating', parseInt(e.target.value))}
                      className="w-full px-2 py-1 border rounded text-sm"
                    >
                      <option value={5}>5 stelle</option>
                      <option value={4}>4 stelle</option>
                      <option value={3}>3 stelle</option>
                      <option value={2}>2 stelle</option>
                      <option value={1}>1 stella</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Recensione</label>
                  <textarea 
                    value={review.text}
                    onChange={(e) => updateReview(index, 'text', e.target.value)}
                    rows={3}
                    className="w-full px-2 py-1 border rounded text-sm"
                    placeholder="Testo della recensione..."
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => removeReview(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const EventsEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const events = project.data.site?.sections?.find((s: any) => s.type === 'events')?.data || {};
  const eventsList = events.events || [];
  
  const updateEventsSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const eventsSection = sections.find((s: any) => s.type === 'events');
    if (eventsSection) {
      eventsSection.data = { ...eventsSection.data, ...updates };
    } else {
      sections.push({
        id: 'events_main',
        type: 'events',
        enabled: true,
        order: 5,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

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
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Eventi</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Sezione</label>
            <input 
              type="text"
              value={events.title || 'I Nostri Eventi'}
              onChange={(e) => updateEventsSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="I Nostri Eventi"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sottotitolo</label>
            <input 
              type="text"
              value={events.subtitle || 'Non perdere le nostre serate speciali'}
              onChange={(e) => updateEventsSection({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Non perdere le nostre serate speciali"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Eventi ({eventsList.length})</h4>
          <button 
            onClick={addEvent}
            className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
          >
            Aggiungi Evento
          </button>
        </div>

        <div className="space-y-4">
          {eventsList.map((event: any, index: number) => (
            <div key={event.id} className="border rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Titolo Evento</label>
                  <input 
                    type="text"
                    value={event.title}
                    onChange={(e) => updateEvent(index, 'title', e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm"
                    placeholder="Nome dell'evento"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrizione</label>
                  <textarea 
                    value={event.description}
                    onChange={(e) => updateEvent(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-2 py-1 border rounded text-sm"
                    placeholder="Descrizione dell'evento..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Data</label>
                    <input 
                      type="date"
                      value={event.date}
                      onChange={(e) => updateEvent(index, 'date', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ora</label>
                    <input 
                      type="time"
                      value={event.time}
                      onChange={(e) => updateEvent(index, 'time', e.target.value)}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Immagine (URL)</label>
                  <input 
                    type="url"
                    value={event.image}
                    onChange={(e) => updateEvent(index, 'image', e.target.value)}
                    className="w-full px-2 py-1 border rounded text-sm"
                    placeholder="https://example.com/event-image.jpg"
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => removeEvent(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};