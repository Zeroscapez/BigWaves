import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import SF3BlackAcePage from './pages/cards/SF3/SF3BlackAcePage/SF3BlackAcePage';
import SF3RedJokerPage from './pages/cards/SF3/SF3RedJokerPage/SF3RedJokerPage';
import ComingSoonPage from './pages/ComingSoonPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/cards/sf3-black-ace" element={<SF3BlackAcePage />} />
            <Route path="/cards/sf3-red-joker" element={<SF3RedJokerPage />} />
            <Route path="/locations" element={<ComingSoonPage title="Locations" />} />
            <Route path="/progress" element={<ComingSoonPage title="Progress" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  );
}