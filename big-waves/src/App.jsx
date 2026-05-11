import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import SF3BlackAcePage from './pages/cards/SF3BlackAcePage';
import SF3RedJokerPage from './pages/cards/SF3RedJokerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/cards/sf3-black-ace" element={<SF3BlackAcePage />} />
          <Route path="/cards/sf3-red-joker" element={<SF3RedJokerPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}