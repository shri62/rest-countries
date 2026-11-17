import { useEffect, useState } from 'react';

// Waits until the value stops changing, then gives it back
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value); // the delayed value

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay); // wait, then update
    return () => clearTimeout(timer); // user typed again → cancel old timer
  }, [value, delay]);

  return debounced;
}
