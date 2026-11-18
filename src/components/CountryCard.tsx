import { Link } from 'react-router-dom';
import type { CountrySummary } from '../types';
import { InfoItem } from './InfoItem';

// One country card on the home page. Clicking it opens the detail page.
export function CountryCard({ country }: { country: CountrySummary }) {
  // alt uses the flag description, or "Flag of ..." if there is none.
  // loading="lazy" loads the image only when it is near the screen.
  // toLocaleString adds commas to the population, like 1,000,000.
  return (
    <li className="card">
      <Link to={`/country/${country.cca3}`} className="card-link">
        <img
          className="card-flag"
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          loading="lazy"
        />
        <div className="card-body">
          <h2 className="card-title">{country.name.common}</h2>
          <dl className="info-list">
            <InfoItem label="Population" value={country.population.toLocaleString()} />
            <InfoItem label="Region" value={country.region} />
            <InfoItem label="Capital" value={country.capital?.join(', ')} />
          </dl>
        </div>
      </Link>
    </li>
  );
}
