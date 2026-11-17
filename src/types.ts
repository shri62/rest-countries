export interface Flags {
  svg: string;
  png: string;
  alt?: string;
}

export interface CountrySummary {
  cca3: string;
  name: { common: string };
  flags: Flags;
  population: number;
  region: string;
  capital?: string[];
}

export interface CountryDetail extends CountrySummary {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { common: string; official: string }>;
  };
  subregion?: string;
  tld?: string[];
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  borders?: string[];
}

export interface BorderCountry {
  cca3: string;
  name: { common: string };
}

export type Theme = 'light' | 'dark';
