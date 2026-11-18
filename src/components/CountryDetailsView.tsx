import type { CountryDetail } from '../types';
import { BorderCountries } from './BorderCountries';
import { InfoItem } from './InfoItem';

// Shows the full details of one country (used on the detail page)
export function CountryDetailsView({ country }: { country: CountryDetail }) {
  // Take the first native name from the object, if there is one
  const nativeName = Object.values(country.name.nativeName ?? {})[0]?.common;

  // Turn the currencies object into text, like "Euro, Dollar"
  const currencies = Object.values(country.currencies ?? {})
    .map((c) => c.name)
    .join(', ');

  // Turn the languages object into text, like "English, French"
  const languages = Object.values(country.languages ?? {}).join(', ');

  // Layout: flag on one side, info on the other.
  // Left list = name, population, region, sub region, capital.
  // Right list = domain, currencies, languages.
  // Border countries buttons go at the bottom ([] if the country has none).
  return (
    <article className="detail">
      <img
        className="detail-flag"
        src={country.flags.svg}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
      />
      <div className="detail-content">
        <h1 className="detail-title">{country.name.common}</h1>
        <div className="detail-columns">
          <dl className="info-list">
            <InfoItem label="Native Name" value={nativeName} />
            <InfoItem label="Population" value={country.population.toLocaleString()} />
            <InfoItem label="Region" value={country.region} />
            <InfoItem label="Sub Region" value={country.subregion} />
            <InfoItem label="Capital" value={country.capital?.join(', ')} />
          </dl>
          <dl className="info-list">
            <InfoItem label="Top Level Domain" value={country.tld?.join(', ')} />
            <InfoItem label="Currencies" value={currencies} />
            <InfoItem label="Languages" value={languages} />
          </dl>
        </div>
        <BorderCountries codes={country.borders ?? []} />
      </div>
    </article>
  );
}
