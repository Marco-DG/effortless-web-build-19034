import React from 'react';

interface EditorProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const NewsletterEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const newsletter = project.data.site?.sections?.find((s: any) => s.type === 'newsletter')?.data || {};
  
  const updateNewsletterSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const newsletterSection = sections.find((s: any) => s.type === 'newsletter');
    if (newsletterSection) {
      newsletterSection.data = { ...newsletterSection.data, ...updates };
    } else {
      sections.push({
        id: 'newsletter_main',
        type: 'newsletter',
        enabled: true,
        order: 4,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Newsletter</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo</label>
            <input 
              type="text"
              value={newsletter.title || 'Rimani Aggiornato'}
              onChange={(e) => updateNewsletterSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Rimani Aggiornato"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Sottotitolo</label>
            <input 
              type="text"
              value={newsletter.subtitle || 'Iscriviti per ricevere le nostre novità e offerte speciali'}
              onChange={(e) => updateNewsletterSection({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Iscriviti per ricevere le nostre novità e offerte speciali"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Testo del Pulsante</label>
            <input 
              type="text"
              value={newsletter.buttonText || 'Iscriviti'}
              onChange={(e) => updateNewsletterSection({ buttonText: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Iscriviti"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeliveryEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const delivery = project.data.site?.sections?.find((s: any) => s.type === 'delivery')?.data || {};
  
  const updateDeliverySection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const deliverySection = sections.find((s: any) => s.type === 'delivery');
    if (deliverySection) {
      deliverySection.data = { ...deliverySection.data, ...updates };
    } else {
      sections.push({
        id: 'delivery_main',
        type: 'delivery',
        enabled: true,
        order: 7,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Servizio Delivery</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Sezione</label>
            <input 
              type="text"
              value={delivery.title || 'Ordina a Domicilio'}
              onChange={(e) => updateDeliverySection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ordina a Domicilio"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrizione</label>
            <textarea 
              value={delivery.description || ''}
              onChange={(e) => updateDeliverySection({ description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Descrivi il tuo servizio di delivery..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Zona di Consegna</label>
              <input 
                type="text"
                value={delivery.deliveryZone || ''}
                onChange={(e) => updateDeliverySection({ deliveryZone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="es. Entro 5km dal centro"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Costo Consegna</label>
              <input 
                type="text"
                value={delivery.deliveryFee || ''}
                onChange={(e) => updateDeliverySection({ deliveryFee: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="es. €3.50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ordine Minimo</label>
              <input 
                type="text"
                value={delivery.minimumOrder || ''}
                onChange={(e) => updateDeliverySection({ minimumOrder: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="es. €15.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tempo di Consegna</label>
              <input 
                type="text"
                value={delivery.deliveryTime || ''}
                onChange={(e) => updateDeliverySection({ deliveryTime: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="es. 30-45 min"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link per Ordinare</label>
            <input 
              type="url"
              value={delivery.orderLink || ''}
              onChange={(e) => updateDeliverySection({ orderLink: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://esempio.com/ordina"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const contact = project.data.site?.sections?.find((s: any) => s.type === 'contact')?.data || {};
  
  const updateContactSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const contactSection = sections.find((s: any) => s.type === 'contact');
    if (contactSection) {
      contactSection.data = { ...contactSection.data, ...updates };
    } else {
      sections.push({
        id: 'contact_main',
        type: 'contact',
        enabled: true,
        order: 8,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

  const updateContactData = (field: string, value: string) => {
    const contactData = { ...project.data.contact, [field]: value };
    onUpdate({ contact: contactData });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Informazioni di Contatto</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Sezione</label>
            <input 
              type="text"
              value={contact.title || 'Contattaci'}
              onChange={(e) => updateContactSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Contattaci"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Indirizzo</label>
            <textarea 
              value={project.data.contact?.address || ''}
              onChange={(e) => updateContactData('address', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Via Example 123, 00100 Roma RM"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Telefono</label>
              <input 
                type="tel"
                value={project.data.contact?.phone || ''}
                onChange={(e) => updateContactData('phone', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="+39 06 123 4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email"
                value={project.data.contact?.email || ''}
                onChange={(e) => updateContactData('email', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="info@ristorante.it"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp</label>
              <input 
                type="tel"
                value={project.data.contact?.whatsapp || ''}
                onChange={(e) => updateContactData('whatsapp', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="+39 328 123 4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input 
                type="text"
                value={project.data.contact?.instagram || ''}
                onChange={(e) => updateContactData('instagram', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="@ristorante"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HoursEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const hours = project.data.site?.sections?.find((s: any) => s.type === 'hours')?.data || {};
  const hoursData = project.data.hours || {
    lunedì: { open: '12:00', close: '23:00', closed: false },
    martedì: { open: '12:00', close: '23:00', closed: false },
    mercoledì: { open: '12:00', close: '23:00', closed: false },
    giovedì: { open: '12:00', close: '23:00', closed: false },
    venerdì: { open: '12:00', close: '23:00', closed: false },
    sabato: { open: '12:00', close: '23:30', closed: false },
    domenica: { open: '12:00', close: '22:00', closed: false },
  };
  
  const updateHoursSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const hoursSection = sections.find((s: any) => s.type === 'hours');
    if (hoursSection) {
      hoursSection.data = { ...hoursSection.data, ...updates };
    } else {
      sections.push({
        id: 'hours_main',
        type: 'hours',
        enabled: true,
        order: 9,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

  const updateDayHours = (day: string, field: string, value: string | boolean) => {
    const newHours = { 
      ...hoursData, 
      [day]: { ...hoursData[day], [field]: value } 
    };
    onUpdate({ hours: newHours });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Orari di Apertura</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Sezione</label>
            <input 
              type="text"
              value={hours.title || 'Orari di Apertura'}
              onChange={(e) => updateHoursSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Orari di Apertura"
            />
          </div>

          <div className="space-y-3">
            {Object.entries(hoursData).map(([day, dayHours]: [string, any]) => (
              <div key={day} className="grid grid-cols-4 gap-3 items-center">
                <div className="font-medium capitalize">{day}</div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!dayHours.closed}
                    onChange={(e) => updateDayHours(day, 'closed', !e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Aperto</span>
                </div>
                <input
                  type="time"
                  value={dayHours.open}
                  onChange={(e) => updateDayHours(day, 'open', e.target.value)}
                  disabled={dayHours.closed}
                  className="px-2 py-1 border rounded text-sm disabled:bg-gray-100"
                />
                <input
                  type="time"
                  value={dayHours.close}
                  onChange={(e) => updateDayHours(day, 'close', e.target.value)}
                  disabled={dayHours.closed}
                  className="px-2 py-1 border rounded text-sm disabled:bg-gray-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LocationEditor: React.FC<EditorProps> = ({ project, onUpdate }) => {
  const location = project.data.site?.sections?.find((s: any) => s.type === 'location')?.data || {};
  
  const updateLocationSection = (updates: any) => {
    const sections = project.data.site?.sections || [];
    const locationSection = sections.find((s: any) => s.type === 'location');
    if (locationSection) {
      locationSection.data = { ...locationSection.data, ...updates };
    } else {
      sections.push({
        id: 'location_main',
        type: 'location',
        enabled: true,
        order: 10,
        data: updates
      });
    }
    onUpdate({ site: { ...project.data.site, sections } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-4">Posizione e Mappa</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titolo Sezione</label>
            <input 
              type="text"
              value={location.title || 'Dove Siamo'}
              onChange={(e) => updateLocationSection({ title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Dove Siamo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrizione</label>
            <textarea 
              value={location.description || ''}
              onChange={(e) => updateLocationSection({ description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Siamo nel cuore del centro storico, facilmente raggiungibili..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Link Google Maps</label>
            <input 
              type="url"
              value={location.mapLink || ''}
              onChange={(e) => updateLocationSection({ mapLink: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Iframe Google Maps</label>
            <textarea 
              value={location.mapEmbed || ''}
              onChange={(e) => updateLocationSection({ mapEmbed: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
              placeholder='<iframe src="..." width="600" height="450"...></iframe>'
            />
            <p className="text-xs text-muted-foreground mt-1">
              Copia il codice iframe da Google Maps per mostrare la mappa interattiva
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Parcheggio</label>
              <select 
                value={location.parking || 'available'}
                onChange={(e) => updateLocationSection({ parking: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="available">Disponibile</option>
                <option value="limited">Limitato</option>
                <option value="none">Non disponibile</option>
                <option value="paid">A pagamento</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Trasporti Pubblici</label>
              <input 
                type="text"
                value={location.publicTransport || ''}
                onChange={(e) => updateLocationSection({ publicTransport: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Metro A, Bus 123"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};