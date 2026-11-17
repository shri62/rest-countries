import { Route, Routes } from 'react-router-dom';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { CountryPage } from './pages/CountryPage';
import { HomePage } from './pages/HomePage'; // your file is HomePage.tsx
import { NotFoundPage } from './pages/NotFoundPage'; // your file is NotFoundPage.tsx

// Main layout: header on every page + one page in the middle
export default function App() {
  return (
    <>
      {/* Hidden link, shows on Tab, jumps to main content */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <Container as="main" id="main" className="main">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />} />
          {/* One country, e.g. /country/FRA */}
          <Route path="/country/:code" element={<CountryPage />} />
          {/* Any wrong URL */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}
