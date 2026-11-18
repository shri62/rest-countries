// A label (like "Region") and its value (like "Europe")
interface InfoItemProps {
  label: string;
  value: string | number | undefined;
}

// One "Label: value" row. Use it inside a <dl>.
export function InfoItem({ label, value }: InfoItemProps) {
  // If there is no value, show "N/A" instead of leaving it empty
  return (
    <div className="info-row">
      <dt>{label}:</dt>
      <dd>{value === undefined || value === '' ? 'N/A' : value}</dd>
    </div>
  );
}
