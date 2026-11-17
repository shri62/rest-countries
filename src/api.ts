import type { BorderCountry, CountryDetail, CountrySummary } from './types';

const BASE_URL = 'https://restcountries.com/v3.1';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new ApiError(
      response.status === 404 ? 'Not found' : `Request failed (${response.status})`,
      response.status,
    );
  }
  return response.json() as Promise<T>;
}

export function fetchAllCountries(signal?: AbortSignal) {
  return getJson<CountrySummary[]>(
    '/all?fields=cca3,name,flags,population,region,capital',
    signal,
  );
}

export async function fetchCountry(code: string, signal?: AbortSignal) {
  const result = await getJson<CountryDetail | CountryDetail[]>(
    `/alpha/${encodeURIComponent(code)}`,
    signal,
  );
  return Array.isArray(result) ? result[0] : result;
}

export function fetchBorderCountries(codes: string[], signal?: AbortSignal) {
  if (codes.length === 0) return Promise.resolve<BorderCountry[]>([]);
  return getJson<BorderCountry[]>(
    `/alpha?codes=${codes.map(encodeURIComponent).join(',')}&fields=cca3,name`,
    signal,
  );
}
