import { Link } from 'react-router-dom';
import { fetchBorderCountries } from '../api';
import { useFetch } from '../hooks/useFetch';

// Shows buttons for the countries that share a border with this one.
// "codes" is a list of country codes, like ["CAN", "MEX"].
export function BorderCountries({ codes }: { codes: string[] }) {
  // Join the list into one string so useFetch only re-runs when the codes really change
  const key = codes.join(',');

  // Ask the API for the names of the border countries
  const { data, loading, error } = useFetch(
        () => fetchBorderCountries(codes),

    [key],
  );

  // Below: "None" if no borders, "Loading…" while waiting, an error message if the
  // request failed, and a list of buttons once the data arrives
  return (
    <div className="borders">
      <h2 className="borders-title">Border Countries:</h2>
      {codes.length === 0 && <p>None</p>}
      {codes.length > 0 && loading && <p>Loading…</p>}
      {codes.length > 0 && error && <p>Could not load border countries.</p>}
      {data && data.length > 0 && (
        <ul className="borders-list">
          {data.map((border) => {
            // key helps React track each item; cca3 is unique per country
            return (
              <li key={border.cca3}>
                {/* Clicking goes to that country's detail page */}
                <Link className="btn" to={`/country/${border.cca3}`}>
                  {border.name.common}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

