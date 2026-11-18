import { useNavigate } from 'react-router-dom';

/** Goes back one history entry, so Home keeps its search and region filter. */
export function BackButton() {
  const navigate = useNavigate();
  return (
    <button type="button" className="btn back" onClick={() => navigate(-1)}>
      <span aria-hidden="true">←</span> Back
    </button>
  );
}
