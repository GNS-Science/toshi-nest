import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import HazardPage from './pages/HazardPage';
import UtilsPage from './pages/UtilsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Toshi Nest</p>
        <p>
          <a href="/Utils">Utils</a>
        </p>
        <p>
          <a href="/hazardcharts">Hazard Charts</a>
        </p>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/Utils" element={<UtilsPage />} />
          <Route path="/hazardcharts" element={<HazardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
