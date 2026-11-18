import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCountries } from '../api';
import { CountryGrid } from '../components/CountryGrid';
import { ErrorMessage } from '../components/ErrorMessage';
import { RegionFilter } from '../components/RegionFilter';
import { SearchBar } from '../components/SearchBar';
import { Spinner } from '../components/Spinner';
import { useDebounce } from '../hooks/useDebounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';

export function Home() {
  useDocumentTitle('Where in the world?');

  // Search and region live in the URL so they survive navigating to a detail page and back.
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const region = params.get('region') ?? '';

  const { data, loading, error, retry } = useFetch(fetchAllCountries, []);

  const updateParam = (key: 'q' | 'region', value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const debouncedQuery = useDebounce(query, 300);

  const visible = useMemo(() => {
    if (!data) return [];
    const term = debouncedQuery.trim().toLowerCase();
    return data
      .filter((c) => !region || c.region === region)
      .filter((c) => !term || c.name.common.toLowerCase().includes(term))
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [data, debouncedQuery, region]);

  return (
    <>
      <div className="controls">
        <SearchBar value={query} onChange={(v) => updateParam('q', v)} />
        <RegionFilter value={region} onChange={(v) => updateParam('region', v)} />
      </div>

      {loading && <Spinner label="Loading countries" />}
      {error && <ErrorMessage message="Could not load countries." onRetry={retry} />}
      {data && visible.length === 0 && (
        <p className="message" role="status">
          No countries match your search.
        </p>
      )}
      {data && visible.length > 0 && <CountryGrid countries={visible} />}
    </>
  );
}
