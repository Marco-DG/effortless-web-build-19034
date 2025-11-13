import { BuilderData } from "@/types/builder";

interface PromoBannerProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const PromoBanner = (_props: PromoBannerProps) => {
  // Intentionally render nothing: banner disabled globally
  return null;
};

