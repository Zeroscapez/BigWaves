import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CardsPage from './pages/CardsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/locations" element={<div>Locations</div>} />
        <Route path="/progress" element={<div>Progress</div>} />
      </Routes>
    </BrowserRouter>
  );
}