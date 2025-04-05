import TextFormatter from './components/validator_feature/TextFormatter';
import CodeFormatter from './components/validator_feature/CodeFormatter';
import JsonFormatter from './components/validator_feature/JsonFormatter';
import FormatterApp from './components/validator_feature/FormatterApp';
import ApiDocsServicePage from './pages/api_feature/ApiDocsServicePage'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GraphicGenerator from './pages/ImgGraphicConverter/GraphicGenerator';
import ImageConverter from './components/ImgGraphicConverter/ImageConvertor';
import ColorFeature from './pages/ImgGraphicConverter/Color';
import ChatWithAI from './components/ImgGraphicConverter/ChatWithAI';
import ChatApp from './components/ImgGraphicConverter/ChatWithAI';

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
        <Route path="/api" element={<ApiDocsServicePage />} />
        <Route path="/code" element={<CodeFormatter />} />
        <Route path="/json" element={<JsonFormatter />} />
        <Route path="/format" element={<FormatterApp />} />
        <Route path="/chat" element={<ChatWithAI />} />
      </Routes>
    </Router>
  );
}

export default App;
