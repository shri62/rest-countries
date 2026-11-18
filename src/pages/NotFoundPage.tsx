import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFound() {
  useDocumentTitle('Page not found | Where in the world?');
  return (
    <div className="message">
      <h1>Page not found</h1>
      <Link to="/" className="btn">
        Go home
      </Link>
    </div>
  );
}
