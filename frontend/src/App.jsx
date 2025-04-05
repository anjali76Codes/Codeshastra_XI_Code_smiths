import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Graphic/Image feature pages
import GraphicSuite from './pages/ImgGraphicConverter/GraphicGenerator';
import ImageConverter from './pages/ImgGraphicConverter/ImageConvertor';
import ColorFeature from './pages/ImgGraphicConverter/Color';
import FormatConverterPage from './pages/converter_feature/FormatConverterPage';
import randomnogeneratorpage from './pages/RandomGeneratorPage/randomgeneratorpage';

// Validator features
import TextFormatter from './components/validator_feature/TextFormatter';
import CodeFormatter from './components/validator_feature/CodeFormatter';
import JsonFormatter from './components/validator_feature/JsonFormatter';
import FormatterApp from './components/validator_feature/FormatterApp';

// API Docs
import ApiDocsServicePage from './pages/api_feature/ApiDocsServicePage';

// Auth and Payment
import Signup from './components/login/Signup';
import Signin from './components/login/Signin';
import Home from './components/login/Home';
import SubscriptionPage from './components/login/SubscriptionPage';
import PaymentPage from './components/login/PaymentPage';

// Chat Feature
import ChatWithAI from './components/ImgGraphicConverter/ChatWithAI';

// Landing Page
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <nav className="bg-black shadow-md p-4">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <Link to="/" className="text-purple-600 hover:underline">Home</Link>
          <Link to="/graphic" className="text-purple-600 hover:underline">Graphic Generator</Link>
          <Link to="/image" className="text-purple-600 hover:underline">Image Converter</Link>
          <Link to="/color" className="text-purple-600 hover:underline">Color Feature</Link>
          <Link to="/format" className="text-purple-600 hover:underline">Format Converter</Link>
          <Link to="/random" className="text-purple-600 hover:underline">Random Generator</Link>
          <Link to="/chat" className="text-purple-600 hover:underline">Chat with AI</Link>
          <Link to="/api" className="text-purple-600 hover:underline">API Docs</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/graphic" element={<GraphicSuite />} />
        <Route path="/image" element={<ImageConverter />} />
        <Route path="/color" element={<ColorFeature />} />
        <Route path="/format" element={<FormatConverterPage />} />
        <Route path="/random" element={<randomnogeneratorpage />} />
        <Route path="/code" element={<CodeFormatter />} />
        <Route path="/json" element={<JsonFormatter />} />
        <Route path="/formatter" element={<FormatterApp />} />
        <Route path="/api" element={<ApiDocsServicePage />} />
        <Route path="/chat" element={<ChatWithAI />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
