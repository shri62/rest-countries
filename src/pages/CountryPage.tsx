import { Link, useParams } from 'react-router-dom';
import { ApiError, fetchCountry } from '../api';
import { BackButton } from '../components/BackButton';
import { CountryDetailsView } from '../components/CountryDetailsView';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';

// Detail page for one country
export function CountryPage() {
  const { code = '' } = useParams(); // get "FRA" from the URL

  // Fetch this country. Fetch again when the code changes
  const { data, loading, error, retry } = useFetch((signal) => fetchCountry(code, signal), [code]);

  // Tab title: "France | Where in the world?"
  useDocumentTitle(data ? `${data.name.common} | Where in the world?` : 'Where in the world?');

  // Bad country code → API returns 404 or 400
  const notFound = error instanceof ApiError && (error.status === 404 || error.status === 400);

  return (
    <>
      <BackButton />

      {/* Still loading */}
      {loading && <Spinner label="Loading country" />}

      {/* Country doesn't exist */}
      {notFound && (
        <div className="message" role="alert">
          <p>We couldn't find that country.</p>
          <Link to="/" className="btn">
            Go home
          </Link>
        </div>
      )}

      {/* Other error (no internet, server down) */}
      {error && !notFound && <ErrorMessage message="Could not load this country." onRetry={retry} />}

      {/* Success → show details */}
      {data && <CountryDetailsView country={data} />}
    </>
  );
}
