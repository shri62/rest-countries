// The text and the function to call when the user types
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// Search box. It is a "controlled input": the text comes from props,
// and typing calls onChange so the parent updates the value.
export function SearchBar({ value, onChange }: SearchBarProps) {
  // The label is hidden visually but screen readers can still read it
  return (
    <div className="search">
      <label htmlFor="search" className="visually-hidden">
        Search for a country
      </label>
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        id="search"
        type="search"
        placeholder="Search for a country…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
