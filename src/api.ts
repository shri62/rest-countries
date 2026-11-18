import type { BorderCountry, CountryDetail, CountrySummary } from './types';

// The new v5 address of the REST Countries API
const BASE_URL = 'https://api.restcountries.com/countries/v5';

// Your API key, read from the .env file
const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_KEY as string | undefined;

// The API gives at most 100 countries per request
const PAGE_SIZE = 100;

// A custom error that also remembers the HTTP status (like 404)
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// What one country looks like in the v5 API (only the parts we use)
interface V5Country {
  names: {
    common: string;
    official?: string;
    native?: Record<string, { common: string; official: string }>;
  };
  codes: { alpha_3: string };
  flag?: { url_svg?: string; url_png?: string; description?: string };
  population?: number;
  region?: string;
  subregion?: string;
  capitals?: { name: string }[];
  tlds?: string[];
  currencies?: { code?: string; name: string; symbol?: string }[];
  languages?: { name: string }[];
  borders?: string[];
}

// v5 wraps every answer like this: { data: { objects: [...], meta: {...} } }
interface V5Response {
  data: {
    objects: V5Country[];
    meta?: { more?: boolean }; // "more" is true when there is another page
  };
}

// Helper that every request uses: fetch a URL with the key and return the answer
async function getJson(path: string, signal?: AbortSignal): Promise<V5Response> {
  // Stop early with a clear message if the key is missing
  if (!API_KEY) throw new ApiError('Missing API key in .env', 401);

  const response = await fetch(`${BASE_URL}${path}`, {
    signal,
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  // If the server says something went wrong, throw an error
  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? 'Not found' : `Request failed (${response.status})`,
      response.status,
    );
  }

  return (await response.json()) as V5Response;
}

// Change a v5 country into the small shape our cards use
function toSummary(c: V5Country): CountrySummary {
  return {
    cca3: c.codes.alpha_3,
    name: { common: c.names.common },
    flags: {
      svg: c.flag?.url_svg || c.flag?.url_png || '',
      png: c.flag?.url_png || '',
      alt: c.flag?.description || undefined, // empty text becomes undefined
    },
    population: c.population ?? 0,
    region: c.region ?? '',
    capital: c.capitals?.map((cap) => cap.name),
  };
}

// Change a v5 country into the full shape the detail page uses
function toDetail(c: V5Country): CountryDetail {
  return {
    ...toSummary(c),
    name: {
      common: c.names.common,
      official: c.names.official ?? c.names.common,
      nativeName: c.names.native,
    },
    subregion: c.subregion,
    tld: c.tlds,
    // Our components expect objects, but v5 sends arrays, so we convert them
    currencies: Object.fromEntries(
      (c.currencies ?? []).map((cur) => [cur.code ?? cur.name, { name: cur.name, symbol: cur.symbol }]),
    ),
    languages: Object.fromEntries((c.languages ?? []).map((lang) => [lang.name, lang.name])),
    borders: c.borders,
  };
}

// Only ask for the fields the home page needs, so the answer is small and fast
const LIST_FIELDS = [
  'names.common',
  'codes.alpha_3',
  'flag.url_svg',
  'flag.url_png',
  'flag.description',
  'population',
  'region',
  'capitals',
].join(',');

// Load every page (100 at a time) until the API says there are no more
async function loadAllPages(): Promise<V5Country[]> {
  const all: V5Country[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const json = await getJson(
      `?response_fields=${LIST_FIELDS}&limit=${PAGE_SIZE}&offset=${offset}`,
    );
    const page = json.data?.objects ?? [];
    all.push(...page);
    more = Boolean(json.data?.meta?.more) && page.length > 0;
    offset += PAGE_SIZE;
  }

  // Skip places without a 3-letter code (like Abkhazia); they can't be linked to
  return all.filter((c) => c.codes?.alpha_3);
}

// Remember the country list after the first load.
// This saves requests (the free plan has a monthly limit).
let allCountriesCache: Promise<V5Country[]> | null = null;

function loadAllCountries(): Promise<V5Country[]> {
  if (!allCountriesCache) {
    allCountriesCache = loadAllPages().catch((err) => {
      allCountriesCache = null; // forget the failed try so "Try again" really retries
      throw err;
    });
  }
  return allCountriesCache;
}

// Get every country for the home page
export async function fetchAllCountries(): Promise<CountrySummary[]> {
  const countries = await loadAllCountries();
  return countries.map(toSummary);
}

// Get one country by its 3-letter code, like "FRA"
export async function fetchCountry(code: string, signal?: AbortSignal): Promise<CountryDetail> {
  const json = await getJson(`/codes.alpha_3/${encodeURIComponent(code)}`, signal);
  const result = json.data?.objects ?? [];
  // No match means the code is wrong
  if (result.length === 0) throw new ApiError('Not found', 404);
  return toDetail(result[0]);
}

// Get the names of the border countries.
// We reuse the saved country list instead of making a new request.
export async function fetchBorderCountries(codes: string[]): Promise<BorderCountry[]> {
  if (codes.length === 0) return [];
  const countries = await loadAllCountries();
  return countries
    .filter((c) => codes.includes(c.codes.alpha_3))
    .map((c) => ({ cca3: c.codes.alpha_3, name: { common: c.names.common } }));
}
