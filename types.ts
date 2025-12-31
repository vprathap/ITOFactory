
export interface SiteTheme {
  primary: string;
  secondary: string;
  accent: string;
  fontStyle: 'modern' | 'classic' | 'playful' | 'tech';
}

export type SectionType = 'hero' | 'features' | 'about' | 'pricing' | 'testimonials' | 'contact' | 'footer';

export interface SiteSection {
  type: SectionType;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
    price?: string;
    author?: string;
    role?: string;
  }>;
  ctaText?: string;
}

export interface SiteManifest {
  name: string;
  tagline: string;
  theme: SiteTheme;
  sections: SiteSection[];
}
