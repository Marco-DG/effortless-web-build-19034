export const fontOptions = [
  { value: "inter", label: "Inter", className: "font-sans" },
  { value: "roboto", label: "Roboto", className: "font-sans" },
  { value: "open-sans", label: "Open Sans", className: "font-sans" },
  { value: "lato", label: "Lato", className: "font-sans" },
  { value: "poppins", label: "Poppins", className: "font-sans" },
  { value: "montserrat", label: "Montserrat", className: "font-sans" },
  { value: "playfair", label: "Playfair Display", className: "font-serif" },
  { value: "merriweather", label: "Merriweather", className: "font-serif" },
  { value: "crimson", label: "Crimson Text", className: "font-serif" },
  { value: "libre-baskerville", label: "Libre Baskerville", className: "font-serif" }
];

export const getFontClassName = (fontValue: string) => {
  const font = fontOptions.find(f => f.value === fontValue);
  return font?.className || "font-sans";
};

export const getAllFonts = () => {
  return fontOptions;
};

// Track loaded fonts to avoid duplicates
const loadedFonts = new Set<string>();

export const ensureGoogleFontLoaded = (fontName: string) => {
  if (loadedFonts.has(fontName)) {
    return;
  }

  // Create and append Google Fonts link
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`;
  link.rel = 'stylesheet';
  
  document.head.appendChild(link);
  loadedFonts.add(fontName);
};