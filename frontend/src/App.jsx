import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GraphicGenerator from './pages/ImgGraphicConverter/GraphicGenerator';
import ImageConverter from './pages/ImgGraphicConverter/ImageConvertor';
import ColorFeature from './pages/ImgGraphicConverter/Color';

function App() {
  return (
    <Router>
      <nav className="bg-black shadow-md p-4">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/graphic" className="text-blue-600 hover:underline">graphic Generator</Link>
          <Link to="/image" className="text-blue-600 hover:underline">Img converter</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<div className="text-center mt-10 text-xl">Welcome to the QR Code App</div>} />
        <Route path="/graphic" element={<GraphicGenerator />} />
        <Route path="/image" element={<ImageConverter />} />
        <Route path="/color" element={<ColorFeature />} />
      </Routes>
    </Router>
  );
}

export default App;
