import { BuilderSection } from "@/types/builder";
import { 
  LayoutTemplate, Type, Monitor, Info, UtensilsCrossed, 
  Calendar, Images, Star, Rocket, HelpCircle, Phone, 
  Clock, Truck, FileStack, PenTool
} from "lucide-react";

import type { ComponentType } from "react";

export const SECTION_ICONS: Record<BuilderSection, ComponentType<{ className?: string }>> = {
  logo: PenTool,
  template: LayoutTemplate,
  typography: Type,
  hero: Monitor,
  about: Info,
  menu: UtensilsCrossed,
  events: Calendar,
  gallery: Images,
  reviews: Star,
  reservation: Rocket,
  faq: HelpCircle,
  contact: Phone,
  hours: Clock,
  delivery: Truck,
  pages: FileStack,
};

export const APPEARANCE_SECTIONS: Array<{ id: BuilderSection; label: string }> = [
  { id: "template", label: "Template" },
  { id: "logo", label: "Logo" },
  { id: "pages", label: "Pagine" },
  { id: "typography", label: "Tipografia" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "Chi siamo" },
  { id: "gallery", label: "Galleria" },
];

export const DATA_SECTIONS: Array<{ id: BuilderSection; label: string }> = [
  { id: "menu", label: "Menù" },
  { id: "events", label: "Eventi" },
  { id: "reviews", label: "Recensioni" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contatti" },
  { id: "hours", label: "Orari" },
  { id: "delivery", label: "Delivery" },
];