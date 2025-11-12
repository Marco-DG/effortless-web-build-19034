import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';
import { SiteSection, HeroSectionData, AboutSectionData, GallerySectionData, ReviewsSectionData, EventsSectionData, ContactSectionData } from './types';

interface SectionEditorProps {
  section: SiteSection;
  onUpdate: (updates: Partial<SiteSection>) => void;
  onClose: () => void;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  onUpdate,
  onClose
}) => {
  const handleUpdateData = (dataUpdates: any) => {
    onUpdate({
      data: { ...section.data, ...dataUpdates }
    });
  };

  const renderSectionEditor = () => {
    switch (section.type) {
      case 'hero':
        return <HeroEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'about':
        return <AboutEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'gallery':
        return <GalleryEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'reviews':
        return <ReviewsEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'events':
        return <EventsEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'contact':
        return <ContactEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'menu':
        return <MenuSectionEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'hours':
        return <HoursEditor data={section.data} onUpdate={handleUpdateData} />;
      case 'newsletter':
        return <NewsletterEditor data={section.data} onUpdate={handleUpdateData} />;
      default:
        return <DefaultEditor data={section.data} onUpdate={handleUpdateData} />;
    }
  };

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      hero: 'Sezione Hero',
      about: 'Chi Siamo',
      menu: 'Menu',
      gallery: 'Galleria',
      reviews: 'Recensioni', 
      events: 'Eventi',
      contact: 'Contatti',
      hours: 'Orari',
      newsletter: 'Newsletter'
    };
    return titles[section.type] || section.type;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h4 className="font-semibold">{getSectionTitle()}</h4>
            <p className="text-sm text-muted-foreground">
              Personalizza questa sezione
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Switch
            checked={section.enabled}
            onCheckedChange={(enabled) => onUpdate({ enabled })}
          />
          <Label className="text-sm">Visibile</Label>
        </div>
      </div>

      {renderSectionEditor()}
    </div>
  );
};

// Hero Section Editor
const HeroEditor: React.FC<{ data: HeroSectionData; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Configurazione Hero</CardTitle>
      <CardDescription>Personalizza la sezione principale del tuo sito</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="hero-title">Titolo Principale</Label>
        <Input
          id="hero-title"
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Benvenuti al nostro ristorante"
        />
      </div>

      <div>
        <Label htmlFor="hero-subtitle">Sottotitolo</Label>
        <Input
          id="hero-subtitle"
          value={data.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Un'esperienza culinaria indimenticabile"
        />
      </div>

      <div>
        <Label htmlFor="hero-description">Descrizione</Label>
        <Textarea
          id="hero-description"
          value={data.description || ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Scopri i sapori autentici della nostra cucina..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Stile</Label>
          <Select value={data.style || 'gradient'} onValueChange={(style) => onUpdate({ style })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimale</SelectItem>
              <SelectItem value="gradient">Gradient</SelectItem>
              <SelectItem value="image-background">Immagine di sfondo</SelectItem>
              <SelectItem value="video-background">Video di sfondo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Allineamento</Label>
          <Select value={data.alignment || 'center'} onValueChange={(alignment) => onUpdate({ alignment })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Sinistra</SelectItem>
              <SelectItem value="center">Centro</SelectItem>
              <SelectItem value="right">Destra</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(data.style === 'image-background' || data.style === 'video-background') && (
        <div>
          <Label htmlFor="hero-bg">URL {data.style === 'video-background' ? 'Video' : 'Immagine'}</Label>
          <Input
            id="hero-bg"
            value={data.backgroundImage || ''}
            onChange={(e) => onUpdate({ backgroundImage: e.target.value })}
            placeholder="https://esempio.com/image.jpg"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cta-text">Testo Call-to-Action</Label>
          <Input
            id="cta-text"
            value={data.ctaText || ''}
            onChange={(e) => onUpdate({ ctaText: e.target.value })}
            placeholder="Prenota ora"
          />
        </div>
        
        <div>
          <Label htmlFor="cta-link">Link Call-to-Action</Label>
          <Input
            id="cta-link"
            value={data.ctaLink || ''}
            onChange={(e) => onUpdate({ ctaLink: e.target.value })}
            placeholder="#contact"
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

// About Section Editor
const AboutEditor: React.FC<{ data: AboutSectionData; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Sezione Chi Siamo</CardTitle>
      <CardDescription>Racconta la storia del tuo ristorante</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="about-title">Titolo</Label>
        <Input
          id="about-title"
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="La nostra storia"
        />
      </div>

      <div>
        <Label htmlFor="about-content">Contenuto</Label>
        <Textarea
          id="about-content"
          value={data.content || ''}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Racconta la storia del tuo ristorante..."
          rows={6}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="about-image">URL Immagine</Label>
          <Input
            id="about-image"
            value={data.image || ''}
            onChange={(e) => onUpdate({ image: e.target.value })}
            placeholder="https://esempio.com/about.jpg"
          />
        </div>

        <div>
          <Label>Posizione Immagine</Label>
          <Select value={data.imagePosition || 'right'} onValueChange={(imagePosition) => onUpdate({ imagePosition })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Sinistra</SelectItem>
              <SelectItem value="right">Destra</SelectItem>
              <SelectItem value="top">Sopra</SelectItem>
              <SelectItem value="background">Sfondo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Caratteristiche (opzionale)</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Aggiungi punti salienti del tuo ristorante
        </p>
        
        {data.features?.map((feature: any, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={feature.title}
              onChange={(e) => {
                const newFeatures = [...(data.features || [])];
                newFeatures[index] = { ...feature, title: e.target.value };
                onUpdate({ features: newFeatures });
              }}
              placeholder="Titolo caratteristica"
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newFeatures = (data.features || []).filter((_, i) => i !== index);
                onUpdate({ features: newFeatures });
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const newFeatures = [...(data.features || []), { title: '', description: '', icon: '' }];
            onUpdate({ features: newFeatures });
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi caratteristica
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Gallery Section Editor
const GalleryEditor: React.FC<{ data: GallerySectionData; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Galleria Foto</CardTitle>
      <CardDescription>Mostra le foto del tuo locale e dei tuoi piatti</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="gallery-title">Titolo</Label>
        <Input
          id="gallery-title"
          value={data.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Galleria"
        />
      </div>

      <div>
        <Label htmlFor="gallery-subtitle">Sottotitolo (opzionale)</Label>
        <Input
          id="gallery-subtitle"
          value={data.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="I nostri piatti e il nostro locale"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Layout</Label>
          <Select value={data.layout || 'grid'} onValueChange={(layout) => onUpdate({ layout })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grid">Griglia</SelectItem>
              <SelectItem value="masonry">Masonry</SelectItem>
              <SelectItem value="carousel">Carousel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Colonne</Label>
          <Select value={data.columns?.toString() || '3'} onValueChange={(columns) => onUpdate({ columns: parseInt(columns) })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Immagini ({data.images?.length || 0})</Label>
        <div className="space-y-2 mt-2">
          {data.images?.map((image: any, index: number) => (
            <div key={image.id} className="flex gap-2 items-center p-2 border rounded">
              {image.url && (
                <img src={image.url} alt="" className="w-12 h-12 object-cover rounded" />
              )}
              <Input
                value={image.url}
                onChange={(e) => {
                  const newImages = [...(data.images || [])];
                  newImages[index] = { ...image, url: e.target.value };
                  onUpdate({ images: newImages });
                }}
                placeholder="URL immagine"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newImages = (data.images || []).filter((_, i) => i !== index);
                  onUpdate({ images: newImages });
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newImages = [...(data.images || []), { 
                id: `img_${Date.now()}`, 
                url: '', 
                caption: '' 
              }];
              onUpdate({ images: newImages });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi immagine
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Menu Section Editor (riferimento al menu esistente)
const MenuSectionEditor: React.FC<{ data: any; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">Sezione Menu</CardTitle>
      <CardDescription>Il menu utilizza i dati dal Menu Builder</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="text-center py-8">
        <Badge variant="secondary" className="mb-3">Menu Builder Integrato</Badge>
        <p className="text-sm text-muted-foreground">
          Questa sezione mostra automaticamente il menu creato nel Menu Builder.
          <br />
          Per modificare il menu, usa la modalità Menu Builder.
        </p>
      </div>

      <div>
        <Label>Stile di visualizzazione</Label>
        <Select value={data.displayStyle || 'full'} onValueChange={(displayStyle) => onUpdate({ displayStyle })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Menu completo</SelectItem>
            <SelectItem value="featured">Solo piatti in evidenza</SelectItem>
            <SelectItem value="categories">Solo categorie</SelectItem>
            <SelectItem value="preview">Anteprima (primi 6 piatti)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-prices">Mostra prezzi</Label>
        <Switch
          id="show-prices"
          checked={data.showPrices !== false}
          onCheckedChange={(showPrices) => onUpdate({ showPrices })}
        />
      </div>
    </CardContent>
  </Card>
);

// Placeholder editors per le altre sezioni
const ReviewsEditor: React.FC<{ data: any; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <p className="text-muted-foreground">Editor per recensioni in sviluppo...</p>
    </CardContent>
  </Card>
);

const EventsEditor: React.FC<{ data: any; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <p className="text-muted-foreground">Editor per eventi in sviluppo...</p>
    </CardContent>
  </Card>
);

const ContactEditor: React.FC<{ data: any; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <p className="text-muted-foreground">Editor per contatti in sviluppo...</p>
    </CardContent>
  </Card>
);

const HoursEditor: React.FC<{ data: any; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <p className="text-muted-foreground">Editor per orari in sviluppo...</p>
    </CardContent>
  </Card>
);

const NewsletterEditor: React.FC<{ data: any; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <p className="text-muted-foreground">Editor per newsletter in sviluppo...</p>
    </CardContent>
  </Card>
);

const DefaultEditor: React.FC<{ data: any; onUpdate: (updates: any) => void }> = ({ data, onUpdate }) => (
  <Card>
    <CardContent className="p-6 text-center">
      <p className="text-muted-foreground">Editor non implementato per questo tipo di sezione</p>
    </CardContent>
  </Card>
);