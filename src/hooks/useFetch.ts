// Import tools from React:
// useEffect = run code after the page shows (like fetching data)
// useState  = remember a value and redraw when it changes
// DependencyList = TypeScript type for the [ ] list of "watch these values"
import { useEffect, useState, type DependencyList } from 'react';

// The shape of what we remember: the data, if it's loading, and any error
interface FetchState<T> {
  data: T | null;       // the data we got (null = nothing yet)
  loading: boolean;     // true = still waiting for the internet
  error: Error | null;  // the error if something failed (null = no error)
}

// Our custom hook. Any component can use it to fetch data.
// fetcher = the function that gets the data (from api.ts)
// deps    = when these values change, fetch again (example: [code])
export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList,
): FetchState<T> & { retry: () => void } {

  // Remember data, loading and error. Start as "loading, no data, no error"
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  // A counter. When it goes up, we fetch again (used by the "Try again" button)
  const [attempt, setAttempt] = useState(0);

  // useEffect runs AFTER the component shows on screen
  useEffect(() => {
    // A "cancel button" for this request
    const controller = new AbortController();

    // Before fetching: show loading, clear old data and old errors
    setState({ data: null, loading: true, error: null });

    // Call the fetcher (example: fetchAllCountries) and give it the cancel button
    fetcher(controller.signal)
      // SUCCESS: save the data, stop loading
      .then((data) => setState({ data, loading: false, error: null }))
      // FAILURE: something went wrong
      .catch((err: unknown) => {
        // If WE cancelled it on purpose, do nothing (not a real error)
        if (controller.signal.aborted) return;
        // Save the error, stop loading
        setState({
          data: null,
          loading: false,
          // If it's a real Error use it, otherwise make a simple one
          error: err instanceof Error ? err : new Error('Something went wrong'),
        });
      });

    // CLEANUP: runs when the component leaves the page or deps change.
    // It cancels the old request so old data never shows by mistake.
    return () => controller.abort();

    
  }, [...deps, attempt]); // fetch again when deps change OR "Try again" is clicked

  // Give back: data, loading, error, and a retry function
  // retry adds 1 to attempt, which makes useEffect run again
  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
