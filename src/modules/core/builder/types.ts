import { z } from 'zod';

// --- Core Configuration Types ---

export interface SiteConfig {
    id: string;
    name: string;
    theme: SiteTheme;
    sections: SectionConfig[];
    metadata: SiteMetadata;
    // Legacy support for other builders
    logo?: any;
    menu?: any;
    business?: any;
}

export interface SiteTheme {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        text: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    borderRadius: string;
}

export interface SiteMetadata {
    title: string;
    description: string;
    favicon?: string;
}

export interface SectionConfig {
    id: string;
    type: string; // e.g., 'hero', 'features', 'gallery'
    variant?: string; // e.g., 'minimal', 'cinematic'
    isEnabled: boolean;
    data: Record<string, any>; // The actual content (title, images, etc.)
}

// --- Component Schema Types (for Auto-Editor) ---

export type FieldType =
    | 'text'
    | 'textarea'
    | 'rich-text'
    | 'image'
    | 'color'
    | 'select'
    | 'toggle'
    | 'number'
    | 'list';

export interface FieldSchema {
    type: FieldType;
    label: string;
    description?: string;
    defaultValue?: any;
    options?: { label: string; value: string }[]; // For select
    validation?: z.ZodType<any>; // Optional Zod validation
}

export interface ComponentSchema {
    id: string;
    name: string;
    description: string;
    category: 'hero' | 'content' | 'features' | 'gallery' | 'contact' | 'other';
    fields: Record<string, FieldSchema>;
    defaultData: Record<string, any>;
}

// --- Registry Interface ---

export interface ComponentDefinition {
    component: React.FC<any>;
    schema: ComponentSchema;
}
