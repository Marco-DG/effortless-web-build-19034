export type FontMeta = {
  id: string; // CSS font-family name
  google: string; // Google Fonts family param
  name: string;
  category: "Sans-serif" | "Serif" | "Monospace" | "Display";
  description?: string;
};

export const FONT_WEIGHTS = "400;500;600;700";

export const googleFonts: FontMeta[] = [
  { id: "Inter", google: "Inter", name: "Inter", category: "Sans-serif", description: "Moderno e pulito" },
  { id: "Poppins", google: "Poppins", name: "Poppins", category: "Sans-serif", description: "Geometrico e friendly" },
  { id: "Lato", google: "Lato", name: "Lato", category: "Sans-serif", description: "Leggibile e professionale" },
  { id: "Montserrat", google: "Montserrat", name: "Montserrat", category: "Sans-serif" },
  { id: "Roboto", google: "Roboto", name: "Roboto", category: "Sans-serif" },
  { id: "Open Sans", google: "Open+Sans", name: "Open Sans", category: "Sans-serif" },
  { id: "Source Sans 3", google: "Source+Sans+3", name: "Source Sans 3", category: "Sans-serif" },
  { id: "Nunito", google: "Nunito", name: "Nunito", category: "Sans-serif" },
  { id: "Raleway", google: "Raleway", name: "Raleway", category: "Sans-serif" },
  { id: "Manrope", google: "Manrope", name: "Manrope", category: "Sans-serif" },
  { id: "Outfit", google: "Outfit", name: "Outfit", category: "Sans-serif" },
  { id: "Plus Jakarta Sans", google: "Plus+Jakarta+Sans", name: "Plus Jakarta Sans", category: "Sans-serif" },
  { id: "Space Grotesk", google: "Space+Grotesk", name: "Space Grotesk", category: "Sans-serif" },

  { id: "Playfair Display", google: "Playfair+Display", name: "Playfair Display", category: "Serif" },
  { id: "Merriweather", google: "Merriweather", name: "Merriweather", category: "Serif" },
  { id: "Lora", google: "Lora", name: "Lora", category: "Serif" },
  { id: "Libre Baskerville", google: "Libre+Baskerville", name: "Libre Baskerville", category: "Serif" },
  { id: "Crimson Text", google: "Crimson+Text", name: "Crimson Text", category: "Serif" },

  { id: "Oswald", google: "Oswald", name: "Oswald", category: "Display" },
  { id: "Bebas Neue", google: "Bebas+Neue", name: "Bebas Neue", category: "Display" },
  { id: "Abril Fatface", google: "Abril+Fatface", name: "Abril Fatface", category: "Display" },

  { id: "JetBrains Mono", google: "JetBrains+Mono", name: "JetBrains Mono", category: "Monospace" },
  { id: "Fira Code", google: "Fira+Code", name: "Fira Code", category: "Monospace" },
  { id: "Source Code Pro", google: "Source+Code+Pro", name: "Source Code Pro", category: "Monospace" },
];

const loaded = new Set<string>();

export function ensureGoogleFontLoaded(familyId: string, googleName?: string, weights: string = FONT_WEIGHTS) {
  const fam = familyId.trim();
  if (!fam) return;
  if (loaded.has(fam)) return;
  const googleFamily = googleName || fam.replace(/\s+/g, "+");
  const id = `gf-${googleFamily}-${weights}`;
  if (document.getElementById(id)) {
    loaded.add(fam);
    return;
  }
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${googleFamily}:wght@${weights}&display=swap`;
  document.head.appendChild(link);
  loaded.add(fam);
}

export function getAllFonts(): FontMeta[] { return googleFonts; }
