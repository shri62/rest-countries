import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Theme } from '../types';

// What the theme context gives to other components
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context (starts empty until the provider fills it)
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// First visit: use the theme the user's computer prefers
function getPreferredTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Wrap the app with this so every component can use the theme
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Theme is saved in localStorage so it is remembered next visit
  const [theme, setTheme] = useLocalStorage<Theme>('theme', getPreferredTheme);

  // Put the theme on the <html> tag so the CSS can change colors
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Switch between light and dark
  const toggleTheme = useCallback(
    () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    [setTheme],
  );

  // useMemo stops the value from being recreated on every render
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom hook: components call useTheme() to get theme and toggleTheme
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  // Error if used outside of ThemeProvider
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}
