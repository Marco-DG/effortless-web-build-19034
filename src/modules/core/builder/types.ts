import { z } from 'zod';

// --- Core Configuration Types ---

export interface SiteConfig {
    id: string;
    name: string;
    theme: SiteTheme;
    pages: PageConfig[];
    // sections: SectionConfig[]; // DEPRECATED: Moved to PageConfig
    metadata: SiteMetadata;
    // Legacy support for other builders
    logo?: any;
    menu?: any;
    business?: BusinessProfile;
}

export interface BusinessProfile {
    name: string;
    tagline?: string;
    description?: string;
    contact: {
        email: string;
        phone: string;
        address: string;
    };
    social: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    };
    hours?: {
        weekdays: string;
        weekends: string;
    };
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

export interface PageConfig {
    id: string;
    slug: string; // e.g., '/', '/menu', '/about'
    title: string; // e.g., 'Home', 'Our Menu'
    sections: SectionConfig[];
    seoTitle?: string;
    seoDesc?: string;
}

// --- Component Schema Types (for Auto-Editor) ---

export type FieldType =
    | 'text'
    | 'textarea'
    | 'rich-text'
    | 'image'
    | 'color'
    | 'select'
    | 'visual-select'
    | 'compact-visual-select'
    | 'toggle'
    | 'number'
    | 'list';

export interface FieldSchema {
    type: FieldType;
    label: string;
    description?: string;
    defaultValue?: any;
    options?: { label: string; value: string; icon?: string }[]; // For select & visual-select
    validation?: z.ZodType<any>; // Optional Zod validation
    category?: 'design' | 'content'; // For grouping fields in tabs
}

export interface ComponentSchema {
    id: string;
    name: string;
    description: string;
    category: 'hero' | 'content' | 'features' | 'gallery' | 'contact' | 'social-proof' | 'cta' | 'other';
    fields: Record<string, FieldSchema>;
    defaultData: Record<string, any>;
}

// --- Registry Interface ---

export interface ComponentDefinition {
    component: React.FC<any>;
    schema: ComponentSchema;
}
