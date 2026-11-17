import { Route, Routes } from 'react-router-dom';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { CountryPage } from './pages/CountryPage';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

export default function App() {
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
