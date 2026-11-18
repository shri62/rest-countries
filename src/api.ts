import type { BorderCountry, CountryDetail, CountrySummary } from './types';

// The main address of the REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1';

// A custom error that also remembers the HTTP status (like 404)
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Helper that every request uses: fetch a URL and return the JSON.
// "signal" lets us cancel the request if the user leaves the page.
async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  // If the server says something went wrong, throw an error
  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? 'Not found' : `Request failed (${response.status})`,
      response.status,
    );
  }

  // Otherwise turn the response into a JavaScript object
  return response.json() as Promise<T>;
}

// Get every country (only the fields the home page cards need)
export function fetchAllCountries(signal?: AbortSignal) {
  return getJson<CountrySummary[]>(
    '/all?fields=cca3,name,flags,population,region,capital',
    signal,
  );
}

// Get one country by its code, like "USA"
export async function fetchCountry(code: string, signal?: AbortSignal) {
  const result = await getJson<CountryDetail | CountryDetail[]>(
    `/alpha/${encodeURIComponent(code)}`, // encodeURIComponent keeps the URL safe
    signal,
  );
  // The API may send a list or a single object, so always return one country
  return Array.isArray(result) ? result[0] : result;
}

// Get the names of several countries at once (for the border buttons)
export function fetchBorderCountries(codes: string[], signal?: AbortSignal) {
  // No codes means no request is needed, so return an empty list right away
  if (codes.length === 0) return Promise.resolve<BorderCountry[]>([]);

  // Join the codes with commas, like "CAN,MEX"
  return getJson<BorderCountry[]>(
    `/alpha?codes=${codes.map(encodeURIComponent).join(',')}&fields=cca3,name`,
    signal,
  );
}
