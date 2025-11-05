import { BuilderSection } from "@/types/builder";
import { 
  LayoutTemplate, Type, Monitor, Info, UtensilsCrossed, 
  Calendar, Images, Star, Rocket, HelpCircle, Phone, 
  Clock, Truck, PanelsTopLeft 
} from "lucide-react";

export const SECTION_ICONS: Record<BuilderSection, React.ComponentType<{ className?: string }>> = {
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
  layout: PanelsTopLeft,
};

export const APPEARANCE_SECTIONS: Array<{ id: BuilderSection; label: string }> = [
  { id: "template", label: "Template" },
  { id: "typography", label: "Tipografia" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "Chi siamo" },
  { id: "gallery", label: "Galleria" },
  { id: "layout", label: "Disposizione" },
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