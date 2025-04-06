import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/login/Navbar';

// Graphic/Image feature pages
import GraphicSuite from './pages/ImgGraphicConverter/GraphicGenerator';
import ImageConverter from './pages/ImgGraphicConverter/ImageConvertor';
import ColorFeature from './pages/ImgGraphicConverter/Color';
import ChatWithAI from './components/ImgGraphicConverter/ChatWithAI';

// Format Converter
import FormatConverterPage from './pages/Format and Convert/FormatConverterPage';
import FormatterApp from './components/validator_feature/FormatterApp';
import CodeFormatter from './components/validator_feature/CodeFormatter';

// API Docs
import ApiDocsServicePage from './pages/api_feature/ApiDocsServicePage';

// Auth and Payment
import Signup from './components/login/Signup';
import Signin from './components/login/Signin';
import Home from './components/login/Home';
import SubscriptionPage from './components/login/SubscriptionPage';
import PaymentPage from './components/login/PaymentPage';

// Others
import LandingPage from './pages/LandingPage';
import PasswordGenerator from './pages/password_generator/PasswordGenerator';

// AES Encryption Page
import EncryptPage from './pages/EncryptPage';  // Import the new encryption page

// Multiplayer Typing Test Pages
import RoomSelector from './pages/RoomSelector'; // Import RoomSelector component
import TypingTestPage from './pages/TypingTest'; // Import TypingTestPage component

import MainApp from './components/MainApp';
import FeaturePage from './pages/FeaturePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/graphic" element={<GraphicSuite />} />
        <Route path="/image" element={<ImageConverter />} />
        <Route path="/color" element={<ColorFeature />} />
        <Route path="/chat" element={<ChatWithAI />} />
        <Route path="/format" element={<FormatConverterPage />} />
        <Route path="/formatter" element={<FormatterApp />} />
        <Route path="/code" element={<CodeFormatter />} />
        <Route path="/api" element={<ApiDocsServicePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/password" element={<PasswordGenerator />} />
        <Route path="/encrypt" element={<EncryptPage />} /> {/* AES Encryption Page */}
        
        {/* Multiplayer Typing Test Routes */}
        <Route path="/room" element={<RoomSelector />} /> {/* RoomSelector Page */}
        <Route path="/test/:code" element={<TypingTestPage />} /> {/* TypingTestPage Page */}
        
        <Route path="/seo" element={<MainApp />} />
        <Route path="/dashboard" element={<FeaturePage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
