import React from 'react';
import { PremiumCard, PremiumTextInput, PremiumToggle, PremiumSelect, PremiumActionButton } from '../../components/forms';

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
    <PremiumCard
      title="Newsletter"
      description="Crea una sezione per raccogliere iscrizioni alla vostra newsletter"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Titolo"
          value={newsletter.title || 'Rimani Aggiornato'}
          onChange={(value) => updateNewsletterSection({ title: value })}
          placeholder="Rimani Aggiornato"
          description="Il titolo che introduce la newsletter"
        />
        
        <PremiumTextInput
          label="Sottotitolo"
          value={newsletter.subtitle || 'Iscriviti per ricevere le nostre novità e offerte speciali'}
          onChange={(value) => updateNewsletterSection({ subtitle: value })}
          placeholder="Iscriviti per ricevere le nostre novità e offerte speciali"
          description="Descrivi i vantaggi dell'iscrizione alla newsletter"
        />

        <PremiumTextInput
          label="Testo del Pulsante"
          value={newsletter.buttonText || 'Iscriviti Ora'}
          onChange={(value) => updateNewsletterSection({ buttonText: value })}
          placeholder="Iscriviti Ora"
          description="Il testo del pulsante di iscrizione"
        />
      </div>
    </PremiumCard>
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
    <PremiumCard
      title="Servizio Delivery"
      description="Configura il servizio di consegna a domicilio per i vostri clienti"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Titolo Sezione"
          value={delivery.title || 'Ordina a Domicilio'}
          onChange={(value) => updateDeliverySection({ title: value })}
          placeholder="Ordina a Domicilio"
          description="Il titolo che introduce il servizio delivery"
        />

        <PremiumTextInput
          label="Descrizione Servizio"
          value={delivery.description || ''}
          onChange={(value) => updateDeliverySection({ description: value })}
          placeholder="Descrivi il tuo servizio di delivery..."
          description="Spiega come funziona il vostro servizio di consegna"
          multiline
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PremiumTextInput
            label="Zona di Consegna"
            value={delivery.deliveryZone || ''}
            onChange={(value) => updateDeliverySection({ deliveryZone: value })}
            placeholder="Entro 5km dal centro"
            description="Area geografica coperta dal servizio"
          />
          
          <PremiumTextInput
            label="Costo Consegna"
            value={delivery.deliveryFee || ''}
            onChange={(value) => updateDeliverySection({ deliveryFee: value })}
            placeholder="€3.50"
            description="Tariffa per la consegna a domicilio"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PremiumTextInput
            label="Ordine Minimo"
            value={delivery.minimumOrder || ''}
            onChange={(value) => updateDeliverySection({ minimumOrder: value })}
            placeholder="€15.00"
            description="Importo minimo per attivare il delivery"
          />
          
          <PremiumTextInput
            label="Tempo di Consegna"
            value={delivery.deliveryTime || ''}
            onChange={(value) => updateDeliverySection({ deliveryTime: value })}
            placeholder="30-45 minuti"
            description="Tempi stimati per la consegna"
          />
        </div>

        <PremiumTextInput
          label="Link per Ordinare"
          value={delivery.orderLink || ''}
          onChange={(value) => updateDeliverySection({ orderLink: value })}
          placeholder="https://esempio.com/ordina"
          description="Link alla piattaforma per effettuare ordini online"
        />
      </div>
    </PremiumCard>
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
    <PremiumCard
      title="Informazioni di Contatto"
      description="Inserisci tutte le informazioni per permettere ai clienti di contattarvi facilmente"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Indirizzo Completo"
          value={project.data.contact?.address || ''}
          onChange={(value) => updateContactData('address', value)}
          placeholder="Via Example 123, 00100 Roma RM"
          description="L'indirizzo completo del ristorante con CAP e città"
          multiline
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PremiumTextInput
            label="Numero di Telefono"
            value={project.data.contact?.phone || ''}
            onChange={(value) => updateContactData('phone', value)}
            placeholder="+39 06 123 4567"
            description="Il numero principale per le prenotazioni"
          />
          
          <PremiumTextInput
            label="Email di Contatto"
            value={project.data.contact?.email || ''}
            onChange={(value) => updateContactData('email', value)}
            placeholder="info@ristorante.it"
            description="L'email principale del ristorante"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PremiumTextInput
            label="WhatsApp"
            value={project.data.contact?.whatsapp || ''}
            onChange={(value) => updateContactData('whatsapp', value)}
            placeholder="+39 328 123 4567"
            description="Numero WhatsApp per contatti rapidi"
          />
          
          <PremiumTextInput
            label="Instagram"
            value={project.data.contact?.instagram || ''}
            onChange={(value) => updateContactData('instagram', value)}
            placeholder="@ristorante"
            description="Username Instagram (senza @)"
          />

          <PremiumTextInput
            label="Facebook"
            value={project.data.contact?.facebook || ''}
            onChange={(value) => updateContactData('facebook', value)}
            placeholder="RistoranteNome"
            description="Nome pagina Facebook"
          />
        </div>
      </div>
    </PremiumCard>
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
    <PremiumCard
      title="Orari di Apertura"
      description="Configura gli orari di apertura del ristorante per ogni giorno della settimana"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Titolo Sezione"
          value={hours.title || 'Orari di Apertura'}
          onChange={(value) => updateHoursSection({ title: value })}
          placeholder="Orari di Apertura"
          description="Il titolo che introduce gli orari"
        />

        <div className="space-y-3">
          {Object.entries(hoursData).map(([day, dayHours]: [string, any]) => (
            <div key={day} className="relative rounded-[12px] border border-slate-200/50 bg-white/60 backdrop-blur-sm p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <div className="font-semibold text-slate-800 font-geist tracking-[-0.01em] capitalize">
                  {day}
                </div>
                <PremiumToggle
                  label="Aperto"
                  checked={!dayHours.closed}
                  onChange={(checked) => updateDayHours(day, 'closed', !checked)}
                />
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-medium font-geist">Apertura</label>
                  <input
                    type="time"
                    value={dayHours.open}
                    onChange={(e) => updateDayHours(day, 'open', e.target.value)}
                    disabled={dayHours.closed}
                    className="w-full px-3 py-2 border border-slate-200/50 rounded-[8px] text-sm bg-white/60 disabled:bg-slate-50/40 disabled:text-slate-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-medium font-geist">Chiusura</label>
                  <input
                    type="time"
                    value={dayHours.close}
                    onChange={(e) => updateDayHours(day, 'close', e.target.value)}
                    disabled={dayHours.closed}
                    className="w-full px-3 py-2 border border-slate-200/50 rounded-[8px] text-sm bg-white/60 disabled:bg-slate-50/40 disabled:text-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PremiumCard>
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
    <PremiumCard
      title="Posizione e Mappa"
      description="Aiuta i clienti a trovarvi facilmente con informazioni dettagliate sulla posizione"
    >
      <div className="space-y-4">
        <PremiumTextInput
          label="Titolo Sezione"
          value={location.title || 'Dove Siamo'}
          onChange={(value) => updateLocationSection({ title: value })}
          placeholder="Dove Siamo"
          description="Il titolo che introduce la posizione"
        />

        <PremiumTextInput
          label="Descrizione Posizione"
          value={location.description || ''}
          onChange={(value) => updateLocationSection({ description: value })}
          placeholder="Siamo nel cuore del centro storico, facilmente raggiungibili..."
          description="Descrivi la posizione e come raggiungervi"
          multiline
          rows={3}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PremiumTextInput
            label="Link Google Maps"
            value={location.mapLink || ''}
            onChange={(value) => updateLocationSection({ mapLink: value })}
            placeholder="https://maps.google.com/..."
            description="Link diretto a Google Maps per la navigazione"
          />

          <PremiumSelect
            label="Disponibilità Parcheggio"
            value={location.parking || 'available'}
            onChange={(value) => updateLocationSection({ parking: value })}
            options={[
              { value: 'available', label: 'Disponibile - Parcheggio facile' },
              { value: 'limited', label: 'Limitato - Pochi posti' },
              { value: 'none', label: 'Non disponibile - Solo trasporti' },
              { value: 'paid', label: 'A pagamento - Parcheggi nelle vicinanze' }
            ]}
            description="Informazioni sul parcheggio per i clienti"
          />
        </div>

        <PremiumTextInput
          label="Trasporti Pubblici"
          value={location.publicTransport || ''}
          onChange={(value) => updateLocationSection({ publicTransport: value })}
          placeholder="Metro A, Bus 123, Fermata Centro"
          description="Mezzi pubblici per raggiungere il ristorante"
        />

        <PremiumTextInput
          label="Iframe Google Maps"
          value={location.mapEmbed || ''}
          onChange={(value) => updateLocationSection({ mapEmbed: value })}
          placeholder='<iframe src="..." width="600" height="450"...></iframe>'
          description="Codice iframe da Google Maps per mostrare la mappa interattiva"
          multiline
          rows={4}
        />
      </div>
    </PremiumCard>
  );
};