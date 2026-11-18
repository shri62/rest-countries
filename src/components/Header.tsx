import { Link } from 'react-router-dom';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';

// Top bar shown on every page: the title (links home) and the theme button
export function Header() {
  return (
    <header className="header">
      <Container className="header-inner">
        <Link to="/" className="logo">
          Where in the world?
        </Link>
        <ThemeToggle />
      </Container>
    </header>
  );
}
