// Centralized type definitions for the website builder

export type TemplateType = "wine-bar" | "fine-dining" | "trattoria";

export type BusinessType = "restaurant" | "bar" | "cafe" | "pub";

export type MenuCategory =
  | "antipasti"
  | "primi"
  | "secondi"
  | "dessert"
  | "cocktail"
  | "birre"
  | "vini"
  | "bevande"
  | "altro";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  badges?: string[];
  ingredients?: string[];
  allergens?: string[];
  imageUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  type: "image";
  caption?: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export interface OpeningHours {
  monday: { open: string; close: string; closed: boolean };
  tuesday: { open: string; close: string; closed: boolean };
  wednesday: { open: string; close: string; closed: boolean };
  thursday: { open: string; close: string; closed: boolean };
  friday: { open: string; close: string; closed: boolean };
  saturday: { open: string; close: string; closed: boolean };
  sunday: { open: string; close: string; closed: boolean };
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  tripadvisor: string;
}

export interface AboutSection {
  // New model (preferred)
  imageUrl?: string; // Foto della sezione
  heading?: string;  // Titolo del paragrafo
  text?: string;     // Paragrafo di testo
  
  // Legacy fields (still optional for backward compatibility with older templates)
  story?: string;
  philosophy?: string;
  values?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export interface PromoBanner {
  enabled: boolean;
  title: string;
  description: string;
  link: string;
}

export interface DeliveryLinks {
  glovo?: string;
  uberEats?: string;
  deliveroo?: string;
  justEat?: string;
}

export interface BuilderData {
  template: TemplateType;
  businessName: string;
  businessType: BusinessType;
  logoUrl: string;
  logoMode?: "image" | "text";
  logoText?: string;
  logoFont?: string;
  tagline: string;
  heroSlogan: string;
  heroDescription: string;
  heroTitleFont?: string;
  heroSubtitleFont?: string;
  heroTitleStyle?: TextStyle;
  heroSubtitleStyle?: TextStyle;
  menuItems: MenuItem[];
  events: Event[];
  gallery: GalleryItem[];
  reviews: Review[];
  faqs: FAQ[];
  blogPosts: BlogPost[];
  address: string;
  phone: string;
  email: string;
  openingHours: OpeningHours;
  socialLinks: SocialLinks;
  about: AboutSection;
  newsletterEnabled: boolean;
  newsletterTitle: string;
  newsletterDescription: string;
  promoBanner: PromoBanner;
  cookieBannerEnabled: boolean;
  deliveryLinks: DeliveryLinks;
  reservationLink?: string;
  sectionsOrder: string[];
  sectionsEnabled: Record<string, boolean>;
  fontFamily?: string; // legacy/global
  fontPrimary?: string;   // corpo testo
  fontSecondary?: string; // titoli
 singlePage?: boolean;
}

export type BuilderSection = 
  | "logo"
  | "template" 
  | "pages"
  | "typography" 
  | "hero" 
  | "about" 
  | "menu" 
  | "events" 
  | "gallery" 
  | "reviews" 
  | "reservation" 
  | "faq" 
  | "contact" 
  | "hours" 
  | "delivery";