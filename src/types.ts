// Flag images for a country (svg is sharp, png is a backup)
export interface Flags {
  svg: string;
  png: string;
  alt?: string; // optional text description of the flag
}

// Basic info shown on each country card on the home page
export interface CountrySummary {
  cca3: string; // 3-letter country code, like "USA" (unique)
  name: { common: string }; // everyday name, like "United States"
  flags: Flags;
  population: number;
  region: string; // like "Europe"
  capital?: string[]; // optional because some countries have none
}

// Full info shown on the detail page (everything in the summary plus more)
export interface CountryDetail extends CountrySummary {
  name: {
    common: string;
    official: string; // full official name
    // name in the country's own language, keyed by language code
    nativeName?: Record<string, { common: string; official: string }>;
  };
  subregion?: string;
  tld?: string[]; // top level domain, like ".fr"
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  borders?: string[]; // codes of neighbouring countries
}

// Small info used for the border country buttons
export interface BorderCountry {
  cca3: string;
  name: { common: string };
}

// The theme can only be one of these two words
export type Theme = 'light' | 'dark';
