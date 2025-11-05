// Centralized type definitions for the website builder

export type TemplateType = "trattoria" | "urban-bar" | "dolce-vita" | "craft-pub" | "wine-bar" | "fine-dining";

export type BusinessType = "restaurant" | "bar" | "cafe" | "pub";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  badges?: string[];
  ingredients?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
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
  story: string;
  philosophy: string;
  values: Array<{
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
  tagline: string;
  heroSlogan: string;
  heroDescription: string;
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
  fontFamily?: string;
}

export type BuilderSection = 
  | "template" 
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
  | "delivery" 
  | "layout";