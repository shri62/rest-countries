import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

// Like useState, but saves the value in the browser
export function useLocalStorage<T>(
  key: string,                  // name to save under
  initialValue: T | (() => T),  // starting value
): [T, Dispatch<SetStateAction<T>>] {

  // On first load, use the saved value if there is one
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key); // read saved value
      if (stored !== null) return JSON.parse(stored) as T; // text → value
    } catch {
      // storage broken, ignore
    }
    return initialValue instanceof Function ? initialValue() : initialValue; // nothing saved
  });

  // Save the value every time it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value)); // value → text
    } catch {
      // storage blocked, ignore
    }
  }, [key, value]);

  return [value, setValue]; // same as useState
}
