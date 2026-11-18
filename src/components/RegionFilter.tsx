// The regions shown in the dropdown
export const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;

// The selected region and the function to call when it changes
interface RegionFilterProps {
  value: string;
  onChange: (value: string) => void;
}

// Dropdown to filter countries by region (also a controlled input)
export function RegionFilter({ value, onChange }: RegionFilterProps) {
  // The first option has an empty value, which means "no filter".
  // The other options come from the REGIONS list.
  return (
    <div className="filter">
      <label htmlFor="region" className="visually-hidden">
        Filter by region
      </label>
      <select id="region" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Filter by Region</option>
        {REGIONS.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
