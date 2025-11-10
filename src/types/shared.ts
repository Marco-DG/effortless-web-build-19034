import { BuilderData } from "./builder";

export interface BaseComponentProps {
  data: BuilderData;
  onUpdate: (data: Partial<BuilderData>) => void;
}

export interface StepComponentProps extends BaseComponentProps {
  onNext: () => void;
  onBack: () => void;
}

export interface TemplateComponentProps {
  data: BuilderData;
  templateColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  variant?: string;
}

export interface MacroTabType {
  id: string;
  label: string;
}

export type MacroTabKeys = "logo" | "menu" | "site";