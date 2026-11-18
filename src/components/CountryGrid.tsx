import type { CountrySummary } from '../types';
import { CountryCard } from './CountryCard';

export function CountryGrid({ countries }: { countries: CountrySummary[] }) {
  return (
    <ul className="grid">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </ul>
  );
}
