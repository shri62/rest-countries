import { useTheme } from '../context/ThemeContext';

// Button that switches between light and dark mode
export function ThemeToggle() {
  // Get the current theme and the switch function from context
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // aria-pressed tells screen readers if dark mode is on.
  // The icon and the text change depending on the theme.
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={isDark}
    >
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
