import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShipmentsPage from './pages/ShipmentsPage';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <h1>Utkrusht Logistics Dashboard</h1>
        <nav>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/shipments">Shipments</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shipments" element={<ShipmentsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
