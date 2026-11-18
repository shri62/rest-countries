import { Route, Routes } from 'react-router-dom';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { CountryPage } from './pages/CountryPage';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

// The main layout of the app. The header shows on every page,
// and the page content changes depending on the URL.
export default function App() {
  // Parts of the return below:
  // - skip-link: lets keyboard users jump past the header to the main content
  // - Header: logo and theme toggle
  // - Routes: "/" shows Home, "/country/:code" shows one country,
  //   anything else shows the NotFound page
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Container as="main" id="main" className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}
